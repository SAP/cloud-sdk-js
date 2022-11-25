import * as http from 'http';

/**
 * Represents the request configuration, that was inferred from a destination.
 */
export interface DestinationHttpRequestConfig {
  /**
   * `baseURL` will be prepended to {@link HttpRequestConfigBase#url} unless `url` is absolute.
   */
  baseURL: string;
  /**
   * `headers` are custom headers to be sent.
   */
  headers: Record<string, string>;
  /**
   * `params` are the URL parameters to be sent with the request.
   */
  params?: Record<string, string>;
  /**
   * `httpAgent` defines a custom agent to be used when performing http requests.
   */
  httpAgent?: http.Agent;
  /**
   * `httpsAgent` defines a custom agent to be used when performing https requests.
   */
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
  /**
   * Server URL that will be used for the request.
   * Relative `url` can be used together with {@link DestinationHttpRequestConfig#baseURL}.
   */
  url?: string;
  /**
   * The request method used when making the request.
   */
  method: Method;
  /**
   * Data sent in the request body.
   */
  data?: any;
  /**
   * The number of milliseconds before the request times out.
   */
  timeout?: number;
  /**
   * The max size of the http response content in bytes.
   */
  maxContentLength?: number;
  /**
   * `proxy` of axios is disabled in http-client.
   * Proxy can be set with {@link @sap-cloud-sdk/connectivity!ProxyConfiguration}.
   */
  proxy?: false;
  /**
   * The custom agent used when performing http requests.
   */
  httpAgent?: any;
  /**
   * The custom agent used when performing https requests.
   */
  httpsAgent?: any;
  /**
   * Encoder for the query parameters key and values. Per default parameters and keys are percent encoded.
   */
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
 * Options defined in `custom` take precedence over `requestConfig`.
 */
export interface OriginOptions {
  /**
   * Header or parameter properties originating from the request config.
   */
  requestConfig?: Record<string, any>;
  /**
   * Header or parameters properties set explicitly, which take precedence over `requestConfig`.
   */
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
  /**
   * @internal
   */
  requestConfig?: Record<string, any>;
  /**
   * @internal
   */
  destination?: Record<string, any>;
  /**
   * @internal
   */
  destinationProperty?: Record<string, any>;
  /**
   * @internal
   */
  custom?: Record<string, any>;
}
