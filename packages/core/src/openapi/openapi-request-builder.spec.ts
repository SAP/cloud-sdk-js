jest.mock('../http-client');

import * as httpClient from '../http-client';
import { OpenApiRequestBuilder } from './openapi-request-builder';

const destination = {
  url: 'http://example.com'
};

describe('openapi-request-builder', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('executeRaw executes a request without parameters', () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test');
    requestBuilder.executeRaw(destination);
    expect(httpClient.executeHttpRequest).toHaveBeenCalledWith(destination, {
      method: 'get',
      url: '/test',
      headers: {},
      params: undefined,
      data: undefined
    });
  });

  it('executeRaw executes a request with query parameters', () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test', {
      queryParameters: {
        limit: 100
      }
    });
    requestBuilder.executeRaw(destination);
    expect(httpClient.executeHttpRequest).toHaveBeenCalledWith(destination, {
      method: 'get',
      url: '/test',
      headers: {},
      params: {
        limit: 100
      },
      data: undefined
    });
  });

  it('executeRaw executes a request with body', () => {
    const requestBuilder = new OpenApiRequestBuilder('post', '/test', {
      body: {
        limit: 100
      }
    });
    requestBuilder.executeRaw(destination);
    expect(httpClient.executeHttpRequest).toHaveBeenCalledWith(destination, {
      method: 'post',
      url: '/test',
      headers: {},
      params: undefined,
      data: {
        limit: 100
      }
    });
  });

  it('addCustomHeaders', () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test');
    requestBuilder
      .addCustomHeaders({ myCustomHeader: 'custom-header' })
      .executeRaw(destination);
    expect(httpClient.executeHttpRequest).toHaveBeenCalledWith(destination, {
      method: 'get',
      url: '/test',
      headers: { mycustomheader: 'custom-header' },
      params: undefined,
      data: undefined
    });
  });

  it('throws an error if the path parameters do not match the path pattern', async () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test/{id}', {
      pathParameters: { test: 'test' }
    });

    await expect(() =>
      requestBuilder.executeRaw(destination)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      `"Cannot execute request, no path parameter provided for 'id'."`
    );
  });

  it('encodes path parameters', () => {
    const requestBuilder = new OpenApiRequestBuilder('get', '/test/{id}', {
      pathParameters: { id: '#test' }
    });
    requestBuilder.executeRaw(destination);
    expect(httpClient.executeHttpRequest).toHaveBeenCalledWith(destination, {
      method: 'get',
      url: '/test/%23test',
      headers: {},
      params: undefined,
      data: undefined
    });
  });
});
