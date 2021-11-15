import * as http from 'http';
/**
 * @internal
 */
export interface DestinationHttpRequestConfig {
  baseURL: string;
  headers: Record<string, string>;
  params?: Record<string, string>;
  httpAgent?: http.Agent;
  httpsAgent?: http.Agent;
}

/**
 * HTTP Methods supported by the http-client.
 * @internal
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

/**
 * @internal
 */
export type HttpRequest = DestinationHttpRequestConfig & HttpRequestConfig;
/**
 * @internal
 */
export type ExecuteHttpRequestFn<ReturnT> = (
  request: HttpRequest
) => Promise<ReturnT>;

interface KnownHttpResponseFields {
  data: any;
  status: number;
  headers: any;
  request: any;
}
/**
 * @internal
 */
export interface HttpResponse extends KnownHttpResponseFields {
  [otherKey: string]: any;
}
/**
 * @internal
 */
export interface HttpRequestOptions {
  // TODO: 2.0 update docs when default value is changed to true.
  /**
   * A boolean value that indicates whether to fetch the csrf token for a non-get request.
   * For a get request, the csrf token is not fetched and this option is ignored.
   * By default, the value is `false`.
   */
  fetchCsrfToken?: boolean;
}
