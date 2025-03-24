import nock from 'nock';
import * as httpClient from '@sap-cloud-sdk/http-client';
import {
  parseDestination,
  sanitizeDestination
} from '@sap-cloud-sdk/connectivity';
import { retry, timeout } from '@sap-cloud-sdk/resilience';
import * as resilienceInternal from '@sap-cloud-sdk/resilience/internal';
import {
  expectAllMocksUsed,
  certificateSingleResponse,
  mockServiceBindings,
  onlyIssuerServiceToken,
  onlyIssuerXsuaaUrl,
  providerXsuaaUrl,
  providerServiceToken,
  mockFetchDestinationCalls
} from '../../../test-resources/test/test-util';
import { OpenApiRequestBuilder } from './openapi-request-builder';
import type { HttpDestination } from '@sap-cloud-sdk/connectivity';

const destination: HttpDestination = {
  url: 'http://example.com'
};

const httpSpy = jest.spyOn(httpClient, 'executeHttpRequest');
const dummyResponse = 'dummy response';

describe('openapi-request-builder', () => {
  beforeEach(() => {
    nock(destination.url).get(/.*/).reply(200, dummyResponse);
    nock(destination.url).post(/.*/).reply(200);
  });

  afterEach(() => {
    httpSpy.mockClear();
  });

  it('executes a request without parameters using executeRaw', async () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test');
    const response = await requestBuilder.executeRaw(destination);
    expect(httpSpy).toHaveBeenCalledWith(
      sanitizeDestination(destination),
      {
        method: 'get',
        middleware: [],
        url: '/test',
        headers: { requestConfig: {} },
        params: { requestConfig: {} },
        data: undefined
      },
      { fetchCsrfToken: false }
    );
    expect(response.data).toBe(dummyResponse);
  });

  it('executes a request with query parameters using executeRaw', async () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test', {
      queryParameters: {
        limit: 100
      }
    });
    const response = await requestBuilder.executeRaw(destination);
    expect(httpClient.executeHttpRequest).toHaveBeenCalledWith(
      sanitizeDestination(destination),
      {
        method: 'get',
        middleware: [],
        url: '/test',
        headers: { requestConfig: {} },
        params: { requestConfig: { limit: 100 } },
        data: undefined
      },
      { fetchCsrfToken: false }
    );
    expect(response.data).toBe(dummyResponse);
  });

  it('executes a request without parameters and basePath explicitly set using executeRaw', async () => {
    const requestBuilder = new OpenApiRequestBuilder(
      'get',
      '/test'
    ).setBasePath('/base/path/to/service');
    const response = await requestBuilder.executeRaw(destination);
    expect(httpClient.executeHttpRequest).toHaveBeenCalledWith(
      sanitizeDestination(destination),
      {
        method: 'get',
        middleware: [],
        url: 'base/path/to/service/test',
        headers: { requestConfig: {} },
        params: { requestConfig: {} },
        data: undefined
      },
      { fetchCsrfToken: false }
    );
    expect(response.data).toBe(dummyResponse);
  });

  it('executes a request with header parameters using executeRaw', async () => {
    const destinationWithAuth = {
      ...destination,
      headers: { authorization: 'destAuth' }
    };
    const requestBuilder = new OpenApiRequestBuilder('get', '/test', {
      headerParameters: { authorization: 'auth-header' }
    });
    const response = await requestBuilder.executeRaw(destinationWithAuth);
    expect(httpSpy).toHaveBeenCalledWith(
      sanitizeDestination(destinationWithAuth),
      {
        method: 'get',
        middleware: [],
        url: '/test',
        headers: {
          requestConfig: {
            authorization: 'auth-header'
          }
        },
        params: { requestConfig: {} },
        data: undefined
      },
      { fetchCsrfToken: false }
    );
    expect(response.data).toBe(dummyResponse);
  });

  it('executes a request with body using executeRaw', async () => {
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        limit: 100
      }
    });
    await requestBuilder.executeRaw(destination);
    expect(httpClient.executeHttpRequest).toHaveBeenCalledWith(
      sanitizeDestination(destination),
      {
        method: 'post',
        middleware: [expect.any(Function)], // this is the csrf token middleware
        url: '/test',
        headers: { requestConfig: {} },
        params: { requestConfig: {} },
        data: {
          limit: 100
        }
      },
      { fetchCsrfToken: true }
    );
  });

  it('executes a request using the timeout', async () => {
    const delayInResponse = 2000;
    const slowDestination = { url: 'https://example.com' };
    nock(slowDestination.url, {})
      .get('/with-delay')
      .times(2)
      .delay(delayInResponse)
      .reply(200);

    const timeoutBelowDelay = () =>
      new OpenApiRequestBuilder('get', '/with-delay')
        .middleware([timeout(delayInResponse * 0.5)])
        .execute(slowDestination);

    await expect(timeoutBelowDelay()).rejects.toThrow(
      'Request to URL: https://example.com ran into a timeout after 1000ms.'
    );

    const timeoutAboveDelay = () =>
      new OpenApiRequestBuilder('get', '/with-delay')
        .middleware(timeout(delayInResponse * 2))
        .execute(slowDestination);
    await expect(timeoutAboveDelay()).resolves.not.toThrow();
  });

  it('executes a request using retry and timeout (using spread middleware overload)', async () => {
    const delayInResponse = 2000;
    const slowDestination = { url: 'https://example.com' };
    nock(slowDestination.url, {})
      .get('/with-delay')
      .delay(delayInResponse)
      .reply(503)
      .get('/with-delay')
      .delay(delayInResponse)
      .reply(200);

    const timeoutAboveDelay = () =>
      new OpenApiRequestBuilder('get', '/with-delay')
        .middleware(retry(2), timeout(3000))
        .execute(slowDestination);
    await expect(timeoutAboveDelay()).resolves.not.toThrow();
  }, 10000);

  it('executes a request using retry and timeout (using array middleware overload)', async () => {
    const delayInResponse = 2000;
    const slowDestination = { url: 'https://example.com' };
    nock(slowDestination.url, {})
      .get('/with-delay')
      .delay(delayInResponse)
      .reply(503)
      .get('/with-delay')
      .delay(delayInResponse)
      .reply(200);

    const timeoutAboveDelay = () =>
      new OpenApiRequestBuilder('get', '/with-delay')
        .middleware([retry(2), timeout(3000)])
        .execute(slowDestination);
    await expect(timeoutAboveDelay()).resolves.not.toThrow();
  }, 10000);

  it('executes a request using the (iss) to build a token instead of a user JWT', async () => {
    mockServiceBindings();

    const httpMocks = [
      nock(onlyIssuerXsuaaUrl)
        .post('/oauth/token')
        .times(1)
        .reply(200, { access_token: onlyIssuerServiceToken }),

      nock(providerXsuaaUrl)
        .post('/oauth/token')
        .times(1)
        .reply(200, { access_token: providerServiceToken }),

      ...mockFetchDestinationCalls(certificateSingleResponse, {
        serviceToken: onlyIssuerServiceToken
      }),

      nock(certificateSingleResponse.destinationConfiguration.URL!)
        .get(/.*/)
        .reply(200, 'iss token used on the way')
    ];
    const requestBuilder = new OpenApiRequestBuilder('get', '/test');
    const response = await requestBuilder.executeRaw({
      destinationName: 'ERNIE-UND-CERT',
      iss: onlyIssuerXsuaaUrl
    });
    expectAllMocksUsed(httpMocks);
    expect(httpSpy).toHaveBeenLastCalledWith(
      sanitizeDestination(parseDestination(certificateSingleResponse)),
      {
        method: 'get',
        middleware: [],
        url: '/test',
        headers: { requestConfig: {} },
        params: { requestConfig: {} }
      },
      { fetchCsrfToken: false }
    );
    expect(response.data).toBe('iss token used on the way');
  });

  it('should add custom headers', async () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test');
    const destinationWithAuth = {
      ...destination,
      headers: { authorization: 'destAuth' }
    };
    const response = await requestBuilder
      .addCustomHeaders({ authorization: 'custom-header' })
      .executeRaw(destinationWithAuth);
    expect(httpSpy).toHaveBeenCalledWith(
      sanitizeDestination(destinationWithAuth),
      {
        method: 'get',
        middleware: [],
        url: '/test',
        headers: {
          custom: { authorization: 'custom-header' },
          requestConfig: {}
        },
        params: { requestConfig: {} },
        data: undefined
      },
      { fetchCsrfToken: false }
    );
    expect(response.data).toBe(dummyResponse);
  });

  it('encodes path parameters', async () => {
    const requestBuilder = new OpenApiRequestBuilder(
      'get',
      "/test('{someId}')/{id}",
      {
        pathParameters: { someId: 'value', id: '^test' }
      }
    );
    const response = await requestBuilder.executeRaw(destination);
    expect(httpSpy).toHaveBeenCalledWith(
      sanitizeDestination(destination),
      {
        method: 'get',
        middleware: [],
        url: "/test('value')/%5Etest",
        headers: { requestConfig: {} },
        params: { requestConfig: {} },
        data: undefined
      },
      { fetchCsrfToken: false }
    );
    expect(response.data).toBe(dummyResponse);
  });

  it('encodes query parameters', async () => {
    jest.spyOn(resilienceInternal, 'executeWithMiddleware');
    const requestBuilder = new OpenApiRequestBuilder('get', '/test', {
      queryParameters: { 'id^': '^test' }
    });

    await requestBuilder.executeRaw(destination);

    expect(resilienceInternal.executeWithMiddleware).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        fnArgument: expect.objectContaining({ params: { 'id%5E': '%5Etest' } })
      })
    );
  });

  it('should add custom request config', async () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test');
    const response = await requestBuilder
      .addCustomRequestConfiguration({
        responseType: 'arraybuffer',
        timeout: 1000
      })
      .executeRaw(destination);
    expect(httpClient.executeHttpRequest).toHaveBeenCalledWith(
      sanitizeDestination(destination),
      {
        method: 'get',
        middleware: [],
        url: '/test',
        headers: { requestConfig: {} },
        params: { requestConfig: {} },
        data: undefined,
        responseType: 'arraybuffer',
        timeout: 1000
      },
      { fetchCsrfToken: false }
    );
    expect(response.data).toEqual(Buffer.from(dummyResponse, 'utf-8'));
  });

  it('will not fetch csrf token when skipping the csrf token request', async () => {
    const requestBuilder = new OpenApiRequestBuilder(
      'post',
      '/test'
    ).skipCsrfTokenFetching();
    await requestBuilder.executeRaw(destination);
    expect(httpSpy).toHaveBeenCalledWith(
      sanitizeDestination(destination),
      {
        method: 'post',
        middleware: [],
        url: '/test',
        headers: { requestConfig: {} },
        params: { requestConfig: {} },
        data: undefined
      },
      { fetchCsrfToken: false }
    );
  });

  describe('requestConfig', () => {
    it('should overwrite default request config with filtered custom request config', async () => {
      const requestBuilder = new OpenApiRequestBuilder('get', '/test');
      requestBuilder.addCustomRequestConfiguration({
        method: 'merge'
      });
      const requestConfig = await requestBuilder['requestConfig']();
      expect(requestConfig['method']).toBe('merge');
    });
  });
});
