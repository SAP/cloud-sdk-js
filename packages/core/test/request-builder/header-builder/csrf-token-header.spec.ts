import { createLogger } from '@sap-cloud-sdk/util';
import nock = require('nock');
import { buildCsrfHeaders } from '../../../src/connectivity/scp-cf';
import {
  createCreateRequest,
  createGetAllRequest,
  createUpdateRequest
} from '../../test-util/create-requests';
import {
  defaultBasicCredentials,
  defaultDestination,
  defaultHost,
  mockHeaderRequest
} from '../../test-util/request-mocker';
import { addCsrfTokenAndCookies } from '../../../src/connectivity/scp-cf/legacy-csrf-token-header';
import { Destination } from '../../../src';

const standardHeaders = {
  accept: 'application/json',
  authorization: defaultBasicCredentials,
  'content-type': 'application/json'
};

describe('csrf-token-header', () => {
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

  describe('[deprecated]', () => {
    it('should return back header, when headers include csrf token', async () => {
      const createRequest = createUpdateRequest(defaultDestination);
      const headerWithCsrf = { params: 'any', 'x-csrf-token': 'defined' };
      const actual = await addCsrfTokenAndCookies(
        createRequest,
        headerWithCsrf
      );
      expect(actual).toEqual(headerWithCsrf);
    });

    it('should return back header, on GET request', async () => {
      const createRequest = createGetAllRequest(defaultDestination);
      const getHeaders = { params: 'any' };
      const actual = await addCsrfTokenAndCookies(createRequest, getHeaders);
      expect(actual).toEqual(getHeaders);
    });

    it('should call getCsrfToken() to define "cookie" and "x-csrf-token" properties.', async () => {
      const request = createCreateRequest(defaultDestination);
      const mockedHeaders = {
        'x-csrf-token': 'mocked-x-csrf-token',
        'set-cookie': ['mocked-cookie-0;mocked-cookie-1', 'mocked-cookie-2']
      };

      mockHeaderRequest({ request });

      const expected = {
        cookie: 'mocked-cookie-0;mocked-cookie-2',
        'x-csrf-token': mockedHeaders['x-csrf-token'],
        ...standardHeaders
      };
      const headers = await addCsrfTokenAndCookies(request, standardHeaders);
      expect(headers).toEqual(expected);
    });

    it('"x-csrf-token" should not be defined in header when not defined in CSRF headers response.', async () => {
      const request = createCreateRequest(defaultDestination);

      mockHeaderRequest({
        request,
        responseHeaders: {
          'set-cookie': ['mocked-cookie-0;mocked-cookie-1', 'mocked-cookie-2']
        }
      });

      const actual = await addCsrfTokenAndCookies(request, standardHeaders);

      expect('x-csrf-token' in actual).toBeFalsy();
    });

    it('"cookie" should not be defined in header when not defined in CSRF headers response.', async () => {
      const request = createCreateRequest(defaultDestination);

      mockHeaderRequest({
        request,
        responseHeaders: { 'x-csrf-token': 'mocked-x-csrf-token' }
      });

      const actual = await addCsrfTokenAndCookies(request, standardHeaders);

      expect('cookie' in actual).toBeFalsy();
    });
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
