import { createLogger } from '@sap-cloud-sdk/util';
import nock from 'nock';
import { defaultResilienceBTPServices } from '@sap-cloud-sdk/connectivity/internal';
import { createRequestBuilder } from '@sap-cloud-sdk/test-services-odata-common/common-request-config';
import {
  CommonEntity,
  commonEntityApi
} from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import {
  defaultBasicCredentials,
  defaultDestination,
  defaultHost,
  mockHeaderRequest
} from '../../../test-resources/test/test-util';
import { buildCsrfFetchHeaders, buildCsrfHeaders } from './csrf-token-header';
import * as csrfHeaders from './csrf-token-header';
import { executeHttpRequest } from './http-client';

const standardHeaders = {
  accept: 'application/json',
  authorization: defaultBasicCredentials,
  'content-type': 'application/json'
};

describe('buildCsrfHeaders', () => {
  const logger = createLogger('csrf-token-header');

  it('should build "cookie" and "x-csrf-token" properties.', async () => {
    const request = await createRequestBuilder({
      payload: new CommonEntity(commonEntityApi)
    })['build'](defaultDestination);
    const mockedHeaders = {
      'x-csrf-token': 'mocked-x-csrf-token',
      'set-cookie': ['mocked-cookie-0;mocked-cookie-1', 'mocked-cookie-2']
    };

    mockHeaderRequest({ request });

    const expected = {
      cookie: 'mocked-cookie-0;mocked-cookie-2',
      'x-csrf-token': mockedHeaders['x-csrf-token']
    };
    const headers = await buildCsrfHeaders(request.destination!, {
      headers: standardHeaders,
      url: request.relativeServiceUrl()
    });
    expect(headers).toEqual(expected);
  });

  it('"x-csrf-token" should not be defined in header when not defined in CSRF headers response.', async () => {
    const request = await createRequestBuilder({
      payload: new CommonEntity(commonEntityApi)
    })['build'](defaultDestination);
    const warnSpy = jest.spyOn(logger, 'warn');

    mockHeaderRequest({
      request,
      responseHeaders: {
        'set-cookie': ['mocked-cookie-0;mocked-cookie-1', 'mocked-cookie-2']
      }
    });

    const headers = await buildCsrfHeaders(request.destination!, {
      headers: standardHeaders,
      url: request.relativeServiceUrl()
    });
    expect('x-csrf-token' in headers).toBeFalsy();
    expect(warnSpy).toBeCalledWith(
      'Destination did not return a CSRF token. This may cause a failure when sending the OData request.'
    );
  });

  it('considers custom timeout on csrf token fetching', async () => {
    jest.spyOn(csrfHeaders, 'buildCsrfHeaders');
    await expect(
      executeHttpRequest(
        { url: 'http://foo.bar' },
        { method: 'post', timeout: 123 }
      )
    ).rejects.toThrow();

    expect(csrfHeaders.buildCsrfHeaders).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ timeout: 123 })
    );
    jest.restoreAllMocks();
  });

  it('considers default timeout on csrf token fetching', async () => {
    jest.spyOn(csrfHeaders, 'buildCsrfHeaders');
    await expect(
      executeHttpRequest({ url: 'http://foo.bar' }, { method: 'post' })
    ).rejects.toThrow();

    expect(csrfHeaders.buildCsrfHeaders).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ timeout: defaultResilienceBTPServices.timeout })
    );
    jest.restoreAllMocks();
  });

  it('"cookie" should not be defined in header when not defined in CSRF headers response.', async () => {
    const request = await createRequestBuilder({
      payload: new CommonEntity(commonEntityApi)
    })['build'](defaultDestination);
    const warnSpy = jest.spyOn(logger, 'warn');

    mockHeaderRequest({
      request,
      responseHeaders: { 'x-csrf-token': 'mocked-x-csrf-token' }
    });

    const headers = await buildCsrfHeaders(request.destination!, {
      headers: standardHeaders,
      url: request.relativeServiceUrl()
    });

    expect('cookie' in headers).toBeFalsy();
    expect(warnSpy).toBeCalledWith(
      'CSRF header response does not include cookies.'
    );
  });

  it('should try csrf request with / in the end first', async () => {
    const request = await createRequestBuilder({
      payload: new CommonEntity(commonEntityApi)
    })['build'](defaultDestination);
    const mockedHeaders = {
      'x-csrf-token': 'mocked-x-csrf-token',
      'set-cookie': ['mocked-cookie-0;mocked-cookie-1', 'mocked-cookie-2']
    };

    nock(defaultHost)
      .head(request.serviceUrl() + '/')
      .reply(200, undefined, mockedHeaders);

    const expected = {
      cookie: 'mocked-cookie-0;mocked-cookie-2',
      'x-csrf-token': mockedHeaders['x-csrf-token']
    };
    const headers = await buildCsrfHeaders(request.destination!, {
      headers: standardHeaders,
      url: request.relativeServiceUrl()
    });
    expect(headers).toEqual(expected);
  });

  it('tries csrf request without / if the first one fails', async () => {
    const request = await createRequestBuilder({
      payload: new CommonEntity(commonEntityApi)
    })['build'](defaultDestination);
    const mockedHeaders = {
      'x-csrf-token': 'mocked-x-csrf-token',
      'set-cookie': ['mocked-cookie-0;mocked-cookie-1', 'mocked-cookie-2']
    };

    nock(defaultHost)
      .head(request.serviceUrl() + '/')
      .reply(500, undefined, mockedHeaders);

    nock(defaultHost)
      .get(request.serviceUrl())
      .reply(200, undefined, mockedHeaders);

    const expected = {
      cookie: 'mocked-cookie-0;mocked-cookie-2',
      'x-csrf-token': mockedHeaders['x-csrf-token']
    };
    const headers = await buildCsrfHeaders(request.destination!, {
      headers: standardHeaders,
      url: request.relativeServiceUrl()
    });
    expect(headers).toEqual(expected);
  });
});

describe('buildCsrfFetchHeaders', () => {
  it('builds default csrf header when no headers are passed', () => {
    expect(buildCsrfFetchHeaders({})).toEqual({
      'x-csrf-token': 'Fetch',
      'content-length': 0
    });
  });

  it('builds custom csrf header when x-csrf-token is passed', () => {
    expect(
      buildCsrfFetchHeaders({ 'X-CSRF-TOKEN': 'TOKEN', 'content-length': 0 })
    ).toEqual({
      'X-CSRF-TOKEN': 'TOKEN',
      'content-length': 0
    });
  });

  it('overwrites existing content length header', () => {
    expect(buildCsrfFetchHeaders({ 'Content-Length': 22 })).toEqual({
      'x-csrf-token': 'Fetch',
      'Content-Length': 0
    });
  });
});
