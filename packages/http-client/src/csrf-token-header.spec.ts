import { createLogger } from '@sap-cloud-sdk/util';
import nock from 'nock';
import { Destination } from '@sap-cloud-sdk/connectivity';
import { ODataCreateRequestConfig, ODataRequest} from '@sap-cloud-sdk/odata-common';
import { oDataUri} from '@sap-cloud-sdk/odata-v2';
import {
  defaultBasicCredentials,
  defaultDestination,
  defaultHost,
  mockHeaderRequest
} from '../../core/test/test-util';
import { buildCsrfFetchHeaders, buildCsrfHeaders } from './csrf-token-header';
 import {TestEntity} from "@sap-cloud-sdk/test-services/v2/test-service";

const standardHeaders = {
  accept: 'application/json',
  authorization: defaultBasicCredentials,
  'content-type': 'application/json'
};

export function createCreateRequest(
    dest: Destination
): ODataRequest<ODataCreateRequestConfig<any>> {
  const requestConfig = new ODataCreateRequestConfig(TestEntity, oDataUri);
  return new ODataRequest(requestConfig, dest);
}

describe('buildCsrfHeaders', () => {
  const logger = createLogger('csrf-token-header');

  it('should build "cookie" and "x-csrf-token" properties.', async () => {
    const request = createCreateRequest(defaultDestination);
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
    const request = createCreateRequest(defaultDestination);
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

  it('"cookie" should not be defined in header when not defined in CSRF headers response.', async () => {
    const request = createCreateRequest(defaultDestination);
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
    const destination: Destination = {
      ...defaultDestination,
      proxyType: 'OnPremise'
    };
    const request = createCreateRequest(destination);
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
    const destination: Destination = {
      ...defaultDestination,
      proxyType: 'OnPremise'
    };
    const request = createCreateRequest(destination);
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
