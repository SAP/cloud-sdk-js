import * as http from 'http';

/**
 * Represents the request configuration, that was inferred from a destination.
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
 * This interface is similar to {@link HttpRequestConfig}. In addition, the `headers` and `params` can be defined with "origin" information.
 * @see {@link OriginOptions}
 */
export type HttpRequestConfigWithOrigin = HttpRequestConfigBase & {
  params?: OriginOptions;
  headers?: OriginOptions;
};

/**
 * Type of the parameter encoder.
 */
export type ParameterEncoder = (
  parameter: Record<string, any>
) => Record<string, any>;

/**
 * Represents an HTTP request config. This is the basis for actual request configurations and request configurations with origins.
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
  parameterEncoder?: ParameterEncoder;
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
 * Represents an HTTP response, that contains response code, headers, payload and the original request.
 * This interface is compatible with AxiosResponse.
 */
export interface HttpResponse extends KnownHttpResponseFields {
  [otherKey: string]: any;
}

/**
 * Options to configure the behavior when sending HTTP requests.
 * For example, whether the CSRF token is fetched automatically.
 */
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
 * The priorities are defined in the {@link origins}.
 */
export interface OriginOptions {
  requestConfig?: Record<string, any>;
  custom?: Record<string, any>;
}

/**
 * Type guard to check whether an object is of type `OriginOptions`.
 * Warn: there can be an edge case that one can define a normal header like the example:
 * {
 *   custom: {
 *     key: 'value'
 *   }
 * }
 * However, this will be treated as `OriginOptions`, as it contains `custom` as a key and an object as the value of the key.
 * This known issue can be handled by switching from `executeHttpClient` to `executeHttpClientWithOrigin`.
 * @param obj - Object to check.
 * @returns `true` if the object is a `OriginOptions` object, `false` otherwise.
 * @internal
 */
export function isOriginOptions(obj: any): obj is OriginOptions {
  return (
    !!obj &&
    (typeof obj['requestConfig'] === 'object' ||
      typeof obj['custom'] === 'object')
  );
}

/**
 * @internal
 */
export function isHttpRequestConfigWithOrigin(
  requestConfig: HttpRequestConfig | HttpRequestConfigWithOrigin
): requestConfig is HttpRequestConfigWithOrigin {
  return (
    isOriginOptions(requestConfig.headers) ||
    isOriginOptions(requestConfig.params)
  );
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
