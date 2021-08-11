import nock from 'nock';
import {
  expectAllMocksUsed,
  certificateMultipleResponse,
  certificateSingleResponse,
  mockInstanceDestinationsCall,
  mockServiceBindings,
  mockServiceToken,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  onlyIssuerServiceToken,
  onlyIssuerXsuaaUrl
} from '../../test/test-util';
import * as httpClient from '../http-client/http-client';
import { wrapJwtInHeader } from '../connectivity';
import { OpenApiRequestBuilder } from './openapi-request-builder';

const destination = {
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

  it('executeRaw executes a request without parameters', async () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test');
    const response = await requestBuilder.executeRaw(destination);
    expect(httpSpy).toHaveBeenCalledWith(
      destination,
      {
        method: 'get',
        url: '/test',
        headers: {},
        params: undefined,
        data: undefined
      },
      { fetchCsrfToken: false }
    );
    expect(response.data).toBe(dummyResponse);
  });

  it('executeRaw executes a request with query parameters', async () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test', {
      queryParameters: {
        limit: 100
      }
    });
    const response = await requestBuilder.executeRaw(destination);
    expect(httpClient.executeHttpRequest).toHaveBeenCalledWith(
      destination,
      {
        method: 'get',
        url: '/test',
        headers: {},
        params: {
          limit: 100
        },
        data: undefined
      },
      { fetchCsrfToken: false }
    );
    expect(response.data).toBe(dummyResponse);
  });

  it('executeRaw executes a request with body', async () => {
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        limit: 100
      }
    });
    await requestBuilder.executeRaw(destination);
    expect(httpClient.executeHttpRequest).toHaveBeenCalledWith(
      destination,
      {
        method: 'post',
        url: '/test',
        headers: {},
        params: undefined,
        data: {
          limit: 100
        }
      },
      { fetchCsrfToken: true }
    );
  });

  it('executes a request using the (iss) token instead of the whole jwt', async () => {
    mockServiceBindings();
    mockServiceToken();

    const nocks = [
      mockInstanceDestinationsCall(nock, [], 200, onlyIssuerServiceToken),
      mockSubaccountDestinationsCall(
        nock,
        certificateMultipleResponse,
        200,
        onlyIssuerServiceToken
      ),
      mockSingleDestinationCall(
        nock,
        certificateSingleResponse,
        200,
        'ERNIE-UND-CERT',
        wrapJwtInHeader(onlyIssuerServiceToken).headers
      ),
      nock(certificateSingleResponse.destinationConfiguration.URL)
        .get(/.*/)
        .reply(200, 'iss token used on the way')
    ];
    const requestBuilder = new OpenApiRequestBuilder('get', '/test', {
      body: {
        limit: 100
      }
    });
    const response = await requestBuilder.executeRaw(
      { destinationName: 'ERNIE-UND-CERT' },
      { iss: onlyIssuerXsuaaUrl }
    );
    expectAllMocksUsed(nocks);
    expect(httpSpy).toHaveBeenLastCalledWith(
      { destinationName: 'ERNIE-UND-CERT' },
      {
        method: 'get',
        url: '/test',
        headers: {},
        params: undefined,
        data: {
          limit: 100
        }
      },
      { fetchCsrfToken: false, iss: onlyIssuerXsuaaUrl }
    );
    expect(response.data).toBe('iss token used on the way');
  });

  it('addCustomHeaders', async () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test');
    const response = await requestBuilder
      .addCustomHeaders({ myCustomHeader: 'custom-header' })
      .executeRaw(destination);
    expect(httpSpy).toHaveBeenCalledWith(
      destination,
      {
        method: 'get',
        url: '/test',
        headers: { mycustomheader: 'custom-header' },
        params: undefined,
        data: undefined
      },
      { fetchCsrfToken: false }
    );
    expect(response.data).toBe(dummyResponse);
  });

  it('throws an error if the path parameters do not match the path pattern', async () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test/{id}', {
      pathParameters: { test: 'test' }
    });

    await expect(() =>
      requestBuilder.executeRaw(destination)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Cannot execute request, no path parameter provided for \'id\'."'
    );
  });

  it('encodes path parameters', async () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test/{id}', {
      pathParameters: { id: '#test' }
    });
    const response = await requestBuilder.executeRaw(destination);
    expect(httpSpy).toHaveBeenCalledWith(
      destination,
      {
        method: 'get',
        url: '/test/%23test',
        headers: {},
        params: undefined,
        data: undefined
      },
      { fetchCsrfToken: false }
    );
    expect(response.data).toBe(dummyResponse);
  });

  it('addCustomRequestConfig', async () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test');
    const response = await requestBuilder
      .addCustomRequestConfiguration({ responseType: 'arraybuffer' })
      .executeRaw(destination);
    expect(httpClient.executeHttpRequest).toHaveBeenCalledWith(
      destination,
      {
        method: 'get',
        url: '/test',
        headers: {},
        params: undefined,
        data: undefined,
        responseType: 'arraybuffer'
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
      destination,
      {
        method: 'post',
        url: '/test',
        headers: {},
        params: undefined,
        data: undefined
      },
      { fetchCsrfToken: false }
    );
  });
});
