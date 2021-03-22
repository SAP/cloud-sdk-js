jest.mock('../http-client');

import * as httpClient from '../http-client';
import { OpenApiRequestBuilder } from './openapi-request-builder';

const destination = {
  url: 'http://example.com'
};

describe('openapi-request-builder', () => {
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
});
