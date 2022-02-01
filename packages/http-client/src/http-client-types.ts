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
export type HttpRequestConfig = HttpRequestConfigBase & {
  params?: Record<string, any>;
  headers?: Record<string, any>;
};

/**
 * This interface is similar to [[HttpRequestConfig]]. In addition, the `headers` and `params` can be defined with "origin" information.
 * @see [[OriginOptions]]
 */
export type HttpRequestConfigWithOrigin = HttpRequestConfigBase & {
  params?: OriginOptions;
  headers?: OriginOptions;
};

/**
 * @internal
 */
export interface HttpRequestConfigBase {
  [key: string]: any;
  url?: string;
  method: Method;
  data?: any;
  timeout?: number;
  maxContentLength?: number;
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

export interface HttpResponse extends KnownHttpResponseFields {
  [otherKey: string]: any;
}

export interface HttpRequestOptions {
  /**
   * A boolean value that indicates whether to fetch the csrf token for a non-get request.
   * For a get request, the csrf token is not fetched and this option is ignored.
   * By default, the value is `true`.
   */
  fetchCsrfToken?: boolean;
}

/**
 * This interface is used for defining e.g., headers and query parameters with origin information.
 * The priorities are defined in the [[origins]].
 */
export interface OriginOptions {
  requestConfig: Record<string, any>;
  custom?: Record<string, any>;
}

/**
 * @internal
 */
export interface OriginOptionsInternal {
  requestConfig?: Record<string, any>;
  destination?: Record<string, any>;
  destinationProperty?: Record<string, any>;
  custom?: Record<string, any>;
}
