import * as http from 'http';

export interface DestinationHttpRequestConfig {
  baseURL: string;
  headers: Record<string, string>;
  params?: Record<string, string>;
  httpAgent?: http.Agent;
  httpsAgent?: http.Agent;
}

/**
 * HTTP Methods supported by the http-client.
 */
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

/**
 * @deprecated Since v1.20.0. Use method string directly, e. g. 'get' or 'GET'.
 */
export enum HttpMethod {
  GET = 'GET',
  DELETE = 'DELETE',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH'
}

/**
 * This interface is compatible with AxiosRequestConfig.
 */
export interface HttpRequestConfig {
  [key: string]: any;
  url?: string;
  method: Method;
  data?: any;
  params?: Record<string, string>;
  timeout?: number;
  maxContentLength?: number;
  headers?: any;
  proxy?: false;
  httpAgent?: any;
  httpsAgent?: any;
}

export type HttpRequest = DestinationHttpRequestConfig & HttpRequestConfig;

export type ExecuteHttpRequestFn<ReturnT> = (
  request: HttpRequest
) => Promise<ReturnT>;

interface KnownHttpResponseFields {
  data: any;
  status: number;
  headers: any;
  request: any;
}

export interface HttpResponse extends KnownHttpResponseFields {
  [otherKey: string]: any;
}

/**
 * @deprecated Since v1.6.4. Use [[HttpResponse]] instead.
 */
export interface HttpReponse extends KnownHttpResponseFields {
  [otherKey: string]: any;
}

export interface HttpRequestOptions {
  // TODO: 2.0 update docs when default value is changed to true.
  /**
   * A boolean value that indicates whether to fetch the csrf token for a non-get request.
   * For a get request, the csrf token is not fetched and this option is ignored.
   * By default, the value is false.
   */
  fetchCsrfToken?: boolean;
}
