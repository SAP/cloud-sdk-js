import { createLogger } from '@sap-cloud-sdk/util';
import nock from 'nock';
import {
  defaultBasicCredentials,
  defaultDestination,
  defaultHost,
  mockHeaderRequest
} from '../../../test/test-util/request-mocker';
import { createCreateRequest } from '../../../test/test-util/create-requests';
import { buildCsrfHeaders } from './csrf-token-header';
import { Destination } from './destination';

const standardHeaders = {
  accept: 'application/json',
  authorization: defaultBasicCredentials,
  'content-type': 'application/json'
};

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

  it('should redirect csrf request when using proxy', async () => {
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
      .get(request.serviceUrl())
      .reply(307, undefined, {
        location: `${defaultHost}${request.serviceUrl()}/`
      });

    nock(defaultHost)
      .get(request.serviceUrl() + '/')
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
