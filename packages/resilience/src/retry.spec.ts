import axios from 'axios';
import nock from 'nock';
import { executeWithMiddleware } from './middleware';
import { retry } from './retry';

describe('retry', () => {
  const HTTP_STATUS = {
    OK: 200,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    SERVICE_UNAVAILABLE: 504,
    UNDEFINED: undefined
  };
  const request = config => axios.request(config);

  afterEach(() => {
    nock.cleanAll();
  });

  it('needs no retry', async () => {
    nock('https://example.com', {}).get('/retry').reply(HTTP_STATUS.OK);

    const requestConfig = {
      baseURL: 'https://example.com',
      method: 'get',
      url: '/retry'
    };

    await expect(
      executeWithMiddleware([retry(0)], {
        context: {
          uri: 'https://example.com',
          tenantId: 'dummy-tenant'
        },
        fnArgument: requestConfig,
        fn: request
      })
    ).resolves.not.toThrow();
  });

  it('rejects after retires', async () => {
    nock('https://example.com', {})
      .get('/retry')
      .reply(HTTP_STATUS.SERVICE_UNAVAILABLE)
      .get('/retry')
      .reply(HTTP_STATUS.SERVICE_UNAVAILABLE);

    const requestConfig = {
      baseURL: 'https://example.com',
      method: 'get',
      url: '/retry'
    };

    await expect(
      executeWithMiddleware([retry(1)], {
        context: { uri: 'https://example.com', tenantId: 'dummy-tenant' },
        fnArgument: requestConfig,
        fn: request
      })
    ).rejects.toThrow();
  });

  it('needs to retry twice', async () => {
    nock('https://example.com', {})
      .get('/retry')
      .reply(HTTP_STATUS.SERVICE_UNAVAILABLE)
      .get('/retry')
      .reply(HTTP_STATUS.SERVICE_UNAVAILABLE)
      .get('/retry')
      .reply(HTTP_STATUS.OK);

    const requestConfig = {
      baseURL: 'https://example.com',
      method: 'get',
      url: '/retry'
    };

    await expect(
      executeWithMiddleware([retry(2)], {
        context: { uri: 'https://example.com', tenantId: 'dummy-tenant' },
        fnArgument: requestConfig,
        fn: request
      })
    ).resolves.not.toThrow();
  }, 10000);

  it('must not retry on HTTP Status 401', async () => {
    nock('https://example.com', {})
      .get('/retry')
      .reply(HTTP_STATUS.UNAUTHORIZED)
      .get('/retry')
      .reply(HTTP_STATUS.OK);

    const requestConfig = {
      baseURL: 'https://example.com',
      method: 'get',
      url: '/retry'
    };

    await expect(
      executeWithMiddleware([retry(7)], {
        context: {
          uri: 'https://example.com',
          tenantId: 'dummy-tenant'
        },
        fn: request,
        fnArgument: requestConfig
      })
    ).rejects.toThrow('Request failed with status code 401');

    expect(nock.isDone()).toBeFalsy();
  });

  it('must not retry on HTTP Status 403', async () => {
    nock('https://example.com', {})
      .get('/retry')
      .reply(HTTP_STATUS.FORBIDDEN)
      .get('/retry')
      .reply(HTTP_STATUS.OK);

    const requestConfig = {
      baseURL: 'https://example.com',
      method: 'get',
      url: '/retry'
    };

    await expect(
      executeWithMiddleware([retry(7)], {
        context: {
          uri: 'https://example.com',
          tenantId: 'dummy-tenant'
        },
        fn: request,
        fnArgument: requestConfig
      })
    ).rejects.toThrow('Request failed with status code 403');

    expect(nock.isDone()).toBeFalsy();
  });

  it('needs to handle an undefined error status', async () => {
    nock('https://example.com', {})
      .get('/retry')
      .reply(HTTP_STATUS.SERVICE_UNAVAILABLE)
      .get('/retry')
      .replyWithError('My error status is undefined');

    const requestConfig = {
      baseURL: 'https://example.com',
      method: 'get',
      url: '/retry'
    };

    await expect(
      executeWithMiddleware([retry(1)], {
        context: { uri: 'https://example.com', tenantId: 'dummy-tenant' },
        fnArgument: requestConfig,
        fn: request
      })
    ).rejects.toThrow('My error status is undefined');
  });
});
