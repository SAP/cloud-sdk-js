import nock from 'nock';
import * as httpClient from '@sap-cloud-sdk/http-client';
import { sanitizeDestination } from '@sap-cloud-sdk/connectivity';
import { parseDestination } from '@sap-cloud-sdk/connectivity/internal';
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

  it('executes a request with multipart body using executeRaw', async () => {
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        limit: 100
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        limit: {
          contentType: 'text/plain',
          isImplicit: true,
          parsedContentTypes: [{ type: 'text/plain', parameters: {} }]
        }
      }
    });
    await requestBuilder.executeRaw(destination);
    const data = new FormData();
    data.append('limit', '100');
    expect(httpClient.executeHttpRequest).toHaveBeenCalledWith(
      sanitizeDestination(destination),
      {
        method: 'post',
        middleware: [expect.any(Function)], // this is the csrf token middleware
        url: '/test',
        headers: { requestConfig: { 'content-type': 'multipart/form-data' } },
        params: { requestConfig: {} },
        data
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

  it('executes a request with multipart body and charset encoding', async () => {
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        textData: 'Hello World'
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        textData: {
          contentType: 'text/plain; charset=utf-8',
          isImplicit: false,
          parsedContentTypes: [
            { type: 'text/plain', parameters: { charset: 'utf-8' } }
          ]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    // Verify that the form data was built correctly with charset handling
    const callArgs = httpClient.executeHttpRequest['mock'].calls[0];
    const formData = callArgs[1].data;
    expect(formData).toBeInstanceOf(FormData);
  });

  it('executes a request with multipart body containing Blob without type', async () => {
    const blob = new Blob(['test content']);
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        file: blob
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        file: {
          contentType: 'application/pdf',
          isImplicit: false,
          parsedContentTypes: [{ type: 'application/pdf', parameters: {} }]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    const callArgs = httpClient.executeHttpRequest['mock'].calls[0];
    const formData = callArgs[1].data;
    expect(formData).toBeInstanceOf(FormData);
  });

  it('executes a request with multipart body containing multiple content types', async () => {
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        document: new Blob(['doc'], { type: 'application/pdf' })
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        document: {
          contentType: 'application/pdf, application/msword',
          isImplicit: false,
          parsedContentTypes: [
            { type: 'application/pdf', parameters: {} },
            { type: 'application/msword', parameters: {} }
          ]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    const callArgs = httpClient.executeHttpRequest['mock'].calls[0];
    const formData = callArgs[1].data;
    expect(formData).toBeInstanceOf(FormData);
  });

  it('handles Blob content type that differs from encoding specification', async () => {
    // Test that a blob with a different content type than expected still gets processed
    const blob = new Blob(['test'], { type: 'image/jpeg' });
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        image: blob
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        image: {
          contentType: 'image/png',
          isImplicit: false,
          parsedContentTypes: [{ type: 'image/png', parameters: {} }]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    const callArgs = httpClient.executeHttpRequest['mock'].calls[0];
    const formData = callArgs[1].data;
    expect(formData).toBeInstanceOf(FormData);
  });

  it('does not warn for implicit encoding mismatches', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const blob = new Blob(['test'], { type: 'image/jpeg' });
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        image: blob
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        image: {
          contentType: 'image/png',
          isImplicit: true,
          parsedContentTypes: [{ type: 'image/png', parameters: {} }]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('Content type mismatch')
    );
    consoleSpy.mockRestore();
  });

  it('should preserve null and undefined values in multipart body', async () => {
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        field1: null,
        field2: undefined
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        field1: {
          contentType: 'text/plain',
          isImplicit: true,
          parsedContentTypes: [{ type: 'text/plain', parameters: {} }]
        },
        field2: {
          contentType: 'application/json',
          isImplicit: true,
          parsedContentTypes: [{ type: 'application/json', parameters: {} }]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    const callArgs = httpClient.executeHttpRequest['mock'].calls[0];
    const formData = callArgs[1].data;
    expect(formData).toBeInstanceOf(FormData);
    const entries = Array.from(formData.entries()) as [string, string | Blob][];
    expect(entries).toContainEqual(['field1', 'null']);
    expect(entries).toContainEqual(['field2', 'undefined']);
    expect(entries.length).toBe(2);
  });

  it('handles wildcard content types without warnings', async () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    const blob = new Blob(['test'], { type: 'image/jpeg' });
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        file: blob
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        file: {
          contentType: 'image/*',
          isImplicit: false,
          parsedContentTypes: [{ type: 'image/*', parameters: {} }]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('Content type mismatch')
    );
    consoleSpy.mockRestore();
  });

  it('skips null and undefined values in multipart body', async () => {
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        field1: 'value1',
        field2: null,
        field3: undefined,
        field4: 'value4'
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        field1: {
          contentType: 'text/plain',
          isImplicit: true,
          parsedContentTypes: [{ type: 'text/plain', parameters: {} }]
        },
        field2: {
          contentType: 'text/plain',
          isImplicit: true,
          parsedContentTypes: [{ type: 'text/plain', parameters: {} }]
        },
        field3: {
          contentType: 'text/plain',
          isImplicit: true,
          parsedContentTypes: [{ type: 'text/plain', parameters: {} }]
        },
        field4: {
          contentType: 'text/plain',
          isImplicit: true,
          parsedContentTypes: [{ type: 'text/plain', parameters: {} }]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    const callArgs = httpClient.executeHttpRequest['mock'].calls[0];
    const formData = callArgs[1].data;
    expect(formData).toBeInstanceOf(FormData);
  });

  it('uses JSON.stringify for application/json content type in multipart', async () => {
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        jsonData: { key: 'value', nested: { prop: 123 } }
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        jsonData: {
          contentType: 'application/json',
          isImplicit: true,
          parsedContentTypes: [{ type: 'application/json', parameters: {} }]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    const callArgs = httpClient.executeHttpRequest['mock'].calls[0];
    const formData = callArgs[1].data;
    expect(formData).toBeInstanceOf(FormData);
  });

  it('uses String() for non-JSON content types in multipart', async () => {
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        textData: 12345
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        textData: {
          contentType: 'text/plain',
          isImplicit: true,
          parsedContentTypes: [{ type: 'text/plain', parameters: {} }]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    const callArgs = httpClient.executeHttpRequest['mock'].calls[0];
    const formData = callArgs[1].data;
    expect(formData).toBeInstanceOf(FormData);
  });

  it('handles content type with semicolon in complex type checking', async () => {
    const blob = new Blob(['test'], { type: 'application/json' });
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        data: blob
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        data: {
          contentType: 'application/json; charset=utf-8',
          isImplicit: false,
          parsedContentTypes: [
            { type: 'application/json', parameters: { charset: 'utf-8' } }
          ]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    const callArgs = httpClient.executeHttpRequest['mock'].calls[0];
    const formData = callArgs[1].data;
    expect(formData).toBeInstanceOf(FormData);
  });

  it('applies content type from encoding to Blob without type', async () => {
    const blob = new Blob(['file content']);
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        fileField: blob
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        fileField: {
          contentType: 'image/png',
          isImplicit: false,
          parsedContentTypes: [{ type: 'image/png', parameters: {} }]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    const formData = httpSpy.mock.calls[0]![1].data!;
    const entries = Array.from(formData.entries()) as [string, string | Blob][];

    expect(entries).toHaveLength(1);
    expect(entries[0][0]).toBe('fileField');
    expect(entries[0][1]).toBeInstanceOf(Blob);
    expect((entries[0][1] as Blob).type).toBe('image/png');
  });

  it('creates Blob for charset-encoded text in FormData', async () => {
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        textData: 'Hello \u4e2d\u6587'
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        textData: {
          contentType: 'text/plain; charset=utf-8',
          isImplicit: false,
          parsedContentTypes: [
            { type: 'text/plain', parameters: { charset: 'utf-8' } }
          ]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    const formData = httpSpy.mock.calls[0]![1].data!;
    const entries = Array.from(formData.entries()) as [string, string | Blob][];

    expect(entries).toHaveLength(1);
    expect(entries[0][0]).toBe('textData');
    expect(entries[0][1]).toBeInstanceOf(Blob);
    expect((entries[0][1] as Blob).type).toBe('text/plain; charset=utf-8');
  });

  it('stringifies JSON content type in FormData entries', async () => {
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        jsonData: { key: 'value', nested: { prop: 123 } }
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        jsonData: {
          contentType: 'application/json',
          isImplicit: true,
          parsedContentTypes: [{ type: 'application/json', parameters: {} }]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    const formData = httpSpy.mock.calls[0]![1].data!;
    const entries = Array.from(formData.entries()) as [string, string | Blob][];

    expect(entries).toHaveLength(1);
    expect(entries[0][0]).toBe('jsonData');
    expect(entries[0][1]).toBe('{"key":"value","nested":{"prop":123}}');
  });

  it('handles multiple fields with different types in FormData', async () => {
    const blob = new Blob(['file'], { type: 'application/pdf' });
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        textField: 'text value',
        numberField: 42,
        fileField: blob
      },
      headerParameters: { 'content-type': 'multipart/form-data' },
      _encoding: {
        textField: {
          contentType: 'text/plain',
          isImplicit: true,
          parsedContentTypes: [{ type: 'text/plain', parameters: {} }]
        },
        numberField: {
          contentType: 'text/plain',
          isImplicit: true,
          parsedContentTypes: [{ type: 'text/plain', parameters: {} }]
        },
        fileField: {
          contentType: 'application/pdf',
          isImplicit: false,
          parsedContentTypes: [{ type: 'application/pdf', parameters: {} }]
        }
      }
    });
    await requestBuilder.executeRaw(destination);

    const formData = httpSpy.mock.calls[0]![1].data!;
    const entries = Array.from(formData.entries()) as [string, string | Blob][];
    const entryMap = new Map<string, string | Blob>(entries);

    expect(entries).toHaveLength(3);
    expect(entryMap.get('textField')).toBe('text value');
    expect(entryMap.get('numberField')).toBe('42');
    expect(entryMap.get('fileField')).toBeInstanceOf(Blob);
    expect((entryMap.get('fileField') as Blob).type).toBe('application/pdf');
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
