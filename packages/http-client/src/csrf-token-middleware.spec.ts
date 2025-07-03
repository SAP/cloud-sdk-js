import nock from 'nock';
import axios from 'axios';
import { circuitBreaker, timeout } from '@sap-cloud-sdk/resilience';
import { circuitBreakers } from '@sap-cloud-sdk/resilience/internal';
import { csrf } from './csrf-token-middleware';
import { executeHttpRequest } from './http-client';

describe('CSRF middleware', () => {
  const host = 'http://example.com';
  const csrfResponseHeaders = {
    'x-csrf-token': 'xCsrfTokenValue'
  };
  const csrfFetchHeader = {
    'x-csrf-token': 'Fetch',
    'content-length': 0
  };
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does nothing for GET requests', async () => {
    nock(host).get('/some/path').reply(200, {});
    const spy = jest.spyOn(axios, 'request');
    await executeHttpRequest(
      { url: host },
      { method: 'GET', url: 'some/path' }
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does nothing if header is already present', async () => {
    nock(host).post('/some/path').reply(200, {});
    const spy = jest.spyOn(axios, 'request');
    await executeHttpRequest(
      { url: host },
      {
        method: 'POST',
        url: 'some/path',
        headers: { 'x-csrf-token': 'tokenAlreadyThere' }
      }
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not fail if header can not fetched from response', async () => {
    nock(host).head('/some/path').reply(500, {});
    nock(host).head('/some/path/').reply(500, {});
    nock(host).post('/some/path').reply(200, {});
    await expect(
      executeHttpRequest({ url: host }, { method: 'POST', url: 'some/path' })
    ).resolves.not.toThrow();
  });

  it('fetches and adds the csrf token without cookie', async () => {
    nock(host).head('/some/path/').reply(200, {}, csrfResponseHeaders);
    nock(host).post('/some/path').reply(200, {});
    const spy = jest.spyOn(axios, 'request');
    await executeHttpRequest(
      { url: host },
      { method: 'POST', url: 'some/path' }
    );
    expect(spy).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        method: 'POST',
        headers: csrfResponseHeaders,
        url: 'some/path'
      })
    );
  });

  it('fetches and adds the csrf token with cookie', async () => {
    nock(host)
      .head('/some/path/')
      .reply(200, {}, { ...csrfResponseHeaders, 'set-cookie': 'cookieValue' });
    nock(host).post('/some/path').reply(200, {});
    const spy = jest.spyOn(axios, 'request');
    await executeHttpRequest(
      { url: host },
      { method: 'POST', url: 'some/path' }
    );
    expect(spy).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        method: 'POST',
        headers: { ...csrfResponseHeaders, cookie: 'cookieValue' },
        url: 'some/path'
      })
    );
  });

  it('fetches and adds the csrf token with cookie and merge existing cookies', async () => {
    nock(host)
      .head('/some/path/')
      .reply(200, {}, { ...csrfResponseHeaders, 'set-cookie': 'cookieValue' });
    nock(host).post('/some/path').reply(200, {});
    const spy = jest.spyOn(axios, 'request');
    await executeHttpRequest(
      { url: host },
      {
        method: 'POST',
        url: 'some/path',
        headers: { cookie: 'existingCookie' }
      }
    );
    expect(spy).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        method: 'POST',
        headers: {
          ...csrfResponseHeaders,
          cookie: 'existingCookie;cookieValue'
        },
        url: 'some/path'
      })
    );
  });

  it('fetches headers from "/some/path/" first, without sending data', async () => {
    nock(host).head('/some/path/').reply(200, {}, csrfResponseHeaders);
    nock(host).post('/some/path').reply(200, {});
    const spy = jest.spyOn(axios, 'request');
    await executeHttpRequest(
      { url: host },
      { method: 'POST', url: 'some/path' }
    );

    expect(spy).toHaveBeenNthCalledWith(
      1,
      expect.not.objectContaining({
        data: expect.anything(),
        params: expect.anything(),
        parameterEncoder: expect.anything()
      })
    );
  });

  it('fetches header from "/some/path" if "/some/path/" fails', async () => {
    nock(host).head('/some/path/').reply(500, {}, {});
    nock(host).head('/some/path').reply(200, {}, csrfResponseHeaders);
    nock(host).post('/some/path').reply(200, {});
    const spy = jest.spyOn(axios, 'request');
    await executeHttpRequest(
      { url: host },
      { method: 'POST', url: 'some/path' }
    );
    expect(spy).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        method: 'head',
        headers: csrfFetchHeader,
        url: 'some/path'
      })
    );
  });

  it('fetches header from "/some/path" if "/some/path/" does not return a token', async () => {
    nock(host).head('/some/path/').reply(200, {}, {});
    nock(host).head('/some/path').reply(200, {}, csrfResponseHeaders);
    nock(host).post('/some/path').reply(200, {});
    const spy = jest.spyOn(axios, 'request');
    await executeHttpRequest(
      { url: host },
      { method: 'POST', url: 'some/path' }
    );
    expect(spy).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        method: 'head',
        headers: csrfFetchHeader,
        url: 'some/path'
      })
    );
  });

  it('is possible to add a timeout to the CSRF request', async () => {
    nock(host)
      .head('/some/path/')
      .delay(1000)
      .reply(200, {}, csrfResponseHeaders);
    nock(host)
      .head('/some/path')
      .delay(1000)
      .reply(200, {}, csrfResponseHeaders);
    nock(host).post('/some/path').reply(200, {});
    const spy = jest.spyOn(axios, 'request');
    await executeHttpRequest(
      { url: host },
      {
        method: 'POST',
        url: 'some/path',
        middleware: [csrf({ middleware: [timeout(500)] })]
      },
      { fetchCsrfToken: false }
    );
    expect(spy).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({ method: 'POST', headers: {}, url: 'some/path' })
    );
  });

  it('is possible to add CB to the CSRF request', async () => {
    nock(host).head('/some/path/').reply(200, {}, csrfResponseHeaders);
    nock(host).post('/some/path').reply(200, {});
    await executeHttpRequest(
      { url: host },
      {
        method: 'POST',
        url: 'some/path',
        middleware: [csrf({ middleware: [circuitBreaker()] })]
      },
      { fetchCsrfToken: false }
    );
    expect(Object.keys(circuitBreakers)).toEqual([
      'http://example.com::tenant_id'
    ]);
  });

  it('fetches headers without parameters at resource URL', async () => {
    nock(host).head('/some/path/').reply(200, {}, csrfResponseHeaders);
    nock(host).post('/some/path?paraKey=paraValue').reply(200, {});
    const spy = jest.spyOn(axios, 'request');
    await executeHttpRequest(
      { url: host },
      { method: 'POST', url: 'some/path', params: { paraKey: 'paraValue' } }
    );
    expect(spy).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        method: 'head',
        headers: csrfFetchHeader,
        url: 'some/path/'
      })
    );
  });

  it('fetches the token from custom URL', async () => {
    nock(host).head('/alternative/path').reply(200, {}, csrfResponseHeaders);
    nock(host).post('/some/path').reply(200, {});
    await expect(
      executeHttpRequest(
        { url: host },
        {
          method: 'POST',
          url: 'some/path',
          middleware: [csrf({ url: 'http://example.com/alternative/path' })]
        },
        { fetchCsrfToken: false }
      )
    ).resolves.not.toThrow();
  });

  it('fetches the token with custom method', async () => {
    nock(host).get('/some/path/').reply(200, {}, csrfResponseHeaders);
    nock(host).post('/some/path').reply(200, {});
    await expect(
      executeHttpRequest(
        { url: host },
        {
          method: 'POST',
          url: 'some/path',
          middleware: [csrf({ method: 'GET' })]
        },
        { fetchCsrfToken: false }
      )
    ).resolves.not.toThrow();
  });
});
