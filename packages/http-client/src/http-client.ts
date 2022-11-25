import * as http from 'http';
import * as https from 'https';
import {
  createLogger,
  ErrorWithCause,
  pickIgnoreCase,
  sanitizeRecord,
  unixEOL
} from '@sap-cloud-sdk/util';
import axios from 'axios';
import {
  buildHeadersForDestination,
  Destination,
  DestinationOrFetchOptions,
  getAgentConfig,
  toDestinationNameUrl
} from '@sap-cloud-sdk/connectivity';
import {
  resolveDestination,
  defaultResilienceBTPServices,
  DestinationConfiguration,
  getAdditionalHeaders,
  getAdditionalQueryParameters,
  getAuthHeader
} from '@sap-cloud-sdk/connectivity/internal';
import {
  DestinationHttpRequestConfig,
  ExecuteHttpRequestFn,
  HttpRequest,
  HttpRequestConfig,
  HttpRequestConfigBase,
  HttpRequestConfigWithOrigin,
  HttpRequestOptions,
  HttpResponse,
  isHttpRequestConfigWithOrigin,
  OriginOptions,
  OriginOptionsInternal,
  ParameterEncoder
} from './http-client-types';
import { mergeOptionsWithPriority } from './http-request-config';
import { buildCsrfHeaders } from './csrf-token-header';

const logger = createLogger({
  package: 'http-client',
  messageContext: 'http-client'
});

/**
 * Builds a {@link DestinationHttpRequestConfig} for the given destination.
 * If a destination name (and a JWT) are provided, it will try to resolve the destination.
 * @param destination - A destination or a destination name and a JWT.
 * @returns A {@link DestinationHttpRequestConfig}.
 */
export async function buildHttpRequest(
  destination: DestinationOrFetchOptions
): Promise<DestinationHttpRequestConfig> {
  const resolvedDestination = await resolveDestination(destination);
  if (!!resolvedDestination.type && resolvedDestination.type !== 'HTTP') {
    throw Error(
      `The type of the destination '${toDestinationNameUrl(
        destination
      )}' has to be 'HTTP', but is '${destination.type}'.`
    );
  }

  const headers = await buildHeaders(resolvedDestination);

  return buildDestinationHttpRequestConfig(resolvedDestination, headers);
}

/**
 * Builds a {@link DestinationHttpRequestConfig} for the given destination
 * and then merges it into the given request configuration.
 * Setting of the given request configuration take precedence over any destination related configuration.
 * @param destination - A destination or a destination name and a JWT.
 * @param requestConfig - Any object representing an HTTP request.
 * @returns The given request config merged with the config built for the given destination.
 * @internal
 */
export async function addDestinationToRequestConfig<
  T extends HttpRequestConfig
>(
  destination: DestinationOrFetchOptions,
  requestConfig: T
): Promise<T & DestinationHttpRequestConfig> {
  const destinationConfig = await buildHttpRequest(destination);
  return merge(destinationConfig, requestConfig);
}

/**
 * Takes as parameter a function that expects an {@link HttpRequest} and returns a Promise of {@link HttpResponse}.
 * Returns a function that takes a destination and a request-config (extends {@link HttpRequestConfig}), builds an {@link HttpRequest} from them, and calls
 * the provided execute function.
 *
 * NOTE: If you simply want to execute a request without passing your own execute function, use {@link executeHttpRequest} instead.
 * @param executeFn - A function that can execute an {@link HttpRequestConfig}.
 * @returns A function expecting destination and a request.
 * @internal
 */
export function execute<ReturnT>(executeFn: ExecuteHttpRequestFn<ReturnT>) {
  return async function <T extends HttpRequestConfigWithOrigin>(
    destination: DestinationOrFetchOptions,
    requestConfig: T,
    options?: HttpRequestOptions
  ): Promise<ReturnT> {
    const resolvedDestination = await resolveDestination(destination);
    if (!!resolvedDestination.type && resolvedDestination.type !== 'HTTP') {
      throw Error(
        `The type of the destination '${toDestinationNameUrl(
          destination
        )}' has to be 'HTTP', but is '${destination.type}'.`
      );
    }

    const destinationRequestConfig = await buildHttpRequest(destination);
    logCustomHeadersWarning(requestConfig.headers);
    const request = await buildRequestWithMergedHeadersAndQueryParameters(
      requestConfig,
      resolvedDestination,
      destinationRequestConfig
    );

    request.headers = await addCsrfTokenToHeader(destination, request, options);
    logRequestInformation(request);
    return executeFn(request);
  };
}

/**
 * Build an {@link HttpRequestConfigWithOrigin} from a given {@link HttpRequestConfigWithOrigin} or {@link HttpRequestConfig}
 * @param requestConfig - The given {@link HttpRequestConfigWithOrigin} or {@link HttpRequestConfig}
 * @returns The resulting {@link HttpRequestConfigWithOrigin}
 * @internal
 */
export function buildHttpRequestConfigWithOrigin(
  requestConfig: HttpRequestConfigWithOrigin | HttpRequestConfig
): HttpRequestConfigWithOrigin {
  if (isHttpRequestConfigWithOrigin(requestConfig)) {
    return requestConfig;
  }
  return {
    ...requestConfig,
    headers: {
      requestConfig: {},
      ...(requestConfig.headers && { custom: requestConfig.headers })
    },
    params: {
      requestConfig: {},
      ...(requestConfig.params && { custom: requestConfig.params })
    }
  };
}

/**
 * This method does nothing and is only there to indicated that the call was made by Odata or OpenApi client and encoding is already done on filter and key parameters.
 * @param params - Parameters which are returned
 * @returns The parameters as they are without encoding.
 * @internal
 */
export const encodeTypedClientRequest: ParameterEncoder = (
  params: Record<string, any>
) => params;

function encodeQueryParameters(options: {
  parameterEncoder: ParameterEncoder;
  parameters: OriginOptionsInternal;
  exclude: (keyof OriginOptionsInternal)[];
}): OriginOptionsInternal {
  const { parameterEncoder, parameters, exclude } = options;
  return Object.fromEntries(
    Object.entries(parameters).map(([key, value]) =>
      exclude.includes(key as keyof OriginOptionsInternal)
        ? [key, value]
        : [key, value ? parameterEncoder(value) : value]
    )
  );
}

function isGenericClientDefault(
  parameterEncoder: ParameterEncoder | undefined
): parameterEncoder is undefined {
  return !parameterEncoder;
}

function isTypedClient(
  parameterEncoder: ParameterEncoder
): parameterEncoder is typeof encodeTypedClientRequest {
  return parameterEncoder.name === encodeTypedClientRequest.name;
}

function getEncodedParameters(
  parameters: OriginOptionsInternal,
  requestConfig: HttpRequestConfigWithOrigin
): OriginOptionsInternal {
  const { parameterEncoder } = requestConfig;
  if (isGenericClientDefault(parameterEncoder)) {
    return encodeQueryParameters({
      parameters,
      parameterEncoder: encodeAllParameters,
      exclude: ['custom']
    });
  }

  if (isTypedClient(parameterEncoder)) {
    return encodeQueryParameters({
      parameters,
      parameterEncoder: encodeAllParameters,
      exclude: ['custom', 'requestConfig']
    });
  }

  // Custom encoder provided for generic client -> use it for all origins
  return encodeQueryParameters({ parameters, parameterEncoder, exclude: [] });
}

/**
 * @internal
 * Build a request config from a given request config and a destination.
 * In addition to merging the information from the request config and the destination, it also picks values with higher priority for headers and query parameters.
 * @param requestConfig - Any object representing an HTTP request.
 * @param destination - A resolved {@link Destination} object.
 * @param destinationRequestConfig - A {@link DestinationHttpRequestConfig} object, that is built from a {@link Destination}.
 * @see {@link mergeOptionsWithPriority}
 * @returns A resulting request config.
 */
export async function buildRequestWithMergedHeadersAndQueryParameters(
  requestConfig: HttpRequestConfigWithOrigin,
  destination: Destination,
  destinationRequestConfig: DestinationHttpRequestConfig
): Promise<HttpRequestConfig & DestinationHttpRequestConfig> {
  const { paramsOriginOptions, headersOriginOptions, requestConfigBase } =
    splitRequestConfig(requestConfig);
  const parameters = collectParametersFromAllOrigins(
    destination,
    paramsOriginOptions
  );

  const encodedParameters = getEncodedParameters(parameters, requestConfig);

  const mergedQueryParameter = mergeOptionsWithPriority(encodedParameters);

  const mergedHeaders = await getMergedHeaders(
    destination,
    headersOriginOptions
  );

  const request = merge(destinationRequestConfig, requestConfigBase);
  request.headers = mergedHeaders || {};
  request.params = mergedQueryParameter || {};
  return request;
}

async function getMergedHeaders(
  destination: Destination,
  headersOriginOptions?: OriginOptions
): Promise<Record<string, string> | undefined> {
  const headersDestination = await buildHeaders(destination);
  const customAuthHeader = getAuthHeader(
    destination.authentication,
    headersOriginOptions?.custom
  );

  const queryParametersDestinationProperty = getAdditionalHeaders(
    (destination.originalProperties as DestinationConfiguration) || {}
  ).headers;

  return mergeOptionsWithPriority({
    requestConfig: headersOriginOptions?.requestConfig,
    custom: { ...headersOriginOptions?.custom, ...customAuthHeader },
    destinationProperty: queryParametersDestinationProperty,
    destination: headersDestination
  });
}

function collectParametersFromAllOrigins(
  destination: Destination,
  paramsOriginOptions?: OriginOptions
): OriginOptionsInternal {
  const queryParametersDestinationProperty = getAdditionalQueryParameters(
    (destination.originalProperties as DestinationConfiguration) || {}
  ).queryParameters;
  return {
    ...paramsOriginOptions,
    destinationProperty: queryParametersDestinationProperty,
    destination: destination.queryParameters
  };
}

function splitRequestConfig(requestConfig: HttpRequestConfigWithOrigin): {
  paramsOriginOptions?: OriginOptions;
  headersOriginOptions?: OriginOptions;
  requestConfigBase: HttpRequestConfigBase;
} {
  const paramsOriginOptions = requestConfig.params;
  const headersOriginOptions = requestConfig.headers;
  return {
    paramsOriginOptions,
    headersOriginOptions,
    requestConfigBase: requestConfig as HttpRequestConfigBase
  };
}

function logCustomHeadersWarning(headers?: OriginOptions) {
  if (!headers) {
    return;
  }
  const customHeaders = headers.custom;
  const requestConfigHeaders = headers.requestConfig;
  if (customHeaders && requestConfigHeaders) {
    const headerKeysToBeOverwritten = Object.keys(customHeaders).filter(
      customHeaderKey =>
        Object.keys(requestConfigHeaders).includes(customHeaderKey)
    );
    if (headerKeysToBeOverwritten.length) {
      logger.debug(
        `The following custom headers will overwrite headers created by the SDK, if they use the same key:\n${headerKeysToBeOverwritten
          .map(key => `  - "${key}"`)
          .join('\n')}
If the parameters from multiple origins use the same key, the priority is 1. Custom, 2. Destination, 3. Internal.`
      );
    }
  }
}

function logRequestInformation(request: HttpRequestConfig) {
  const basicRequestInfo = `Execute '${request.method}' request with target: ${request.url}.`;
  if (request.headers) {
    const headerText = Object.entries(sanitizeRecord(request.headers))
      .map(([key, value]) => `${key}:${value}`)
      .join(unixEOL);

    logger.debug(
      `${basicRequestInfo}${unixEOL}The headers of the request are:${unixEOL}${headerText}`
    );
  } else {
    logger.debug(basicRequestInfo);
  }
}

// eslint-disable-next-line jsdoc/require-returns-check
/**
 * Builds a {@link DestinationHttpRequestConfig} for the given destination, merges it into the given `requestConfig` and executes it (using Axios).
 * The overload, that accepts {@link HttpRequestConfigWithOrigin} as a parameter, is deprecated and replaced the function {@link executeHttpRequestWithOrigin}.
 * @param destination - A destination or a destination name and a JWT.
 * @param requestConfig - Any object representing an HTTP request.
 * @param options - An {@link HttpRequestOptions} of the HTTP request for configuring e.g., CSRF token delegation. By default, the SDK will fetch the CSRF token.
 * @returns A promise resolving to an {@link HttpResponse}.
 */
export function executeHttpRequest<T extends HttpRequestConfig>(
  destination: DestinationOrFetchOptions,
  requestConfig: T,
  options?: HttpRequestOptions
): Promise<HttpResponse>;
// eslint-disable-next-line jsdoc/require-returns-check
/**
 * Builds a {@link DestinationHttpRequestConfig} for the given destination, merges it into the given `requestConfig` and executes it (using Axios).
 * @deprecated This overload is replaced by the function {@link executeHttpRequestWithOrigin}.
 * @param destination - A destination or a destination name and a JWT.
 * @param requestConfig - Any object representing an HTTP request.
 * @param options - An {@link HttpRequestOptions} of the HTTP request for configuring e.g., CSRF token delegation. By default, the SDK will fetch the CSRF token.
 * @returns A promise resolving to an {@link HttpResponse}.
 */
export function executeHttpRequest<T extends HttpRequestConfigWithOrigin>(
  destination: DestinationOrFetchOptions,
  requestConfig: T,
  options?: HttpRequestOptions
): Promise<HttpResponse>;
// eslint-disable-next-line jsdoc/require-jsdoc
export function executeHttpRequest<
  T extends HttpRequestConfig | HttpRequestConfigWithOrigin
>(
  destination: DestinationOrFetchOptions,
  requestConfig: T,
  options?: HttpRequestOptions
): Promise<HttpResponse> {
  // eslint-disable-next-line jsdoc/require-jsdoc
  const requestConfigWithOrigin =
    buildHttpRequestConfigWithOrigin(requestConfig);
  return execute(executeWithAxios)(
    destination,
    requestConfigWithOrigin,
    options
  );
}

/**
 * Builds a {@link DestinationHttpRequestConfig} for the given destination, merges it into the given {@link HttpRequestConfigWithOrigin}
 * and executes it (using Axios).
 * The {@link HttpRequestConfigWithOrigin} supports defining header options and query parameter options with origins.
 * Equally named headers and query parameters are prioritized in the following order:
 * 1. `custom`
 * 2. Destination related headers/query parameters
 * 3. `requestConfig`.
 * @param destination - A destination or a destination name and a JWT.
 * @param requestConfig - Any object representing an HTTP request.
 * @param options - An {@link HttpRequestOptions} of the HTTP request for configuring e.g., CSRF token delegation. By default, the SDK will fetch the CSRF token.
 * @returns A promise resolving to an {@link HttpResponse}.
 * @see https://sap.github.io/cloud-sdk/docs/js/features/connectivity/query-parameters
 */
export function executeHttpRequestWithOrigin<
  T extends HttpRequestConfigWithOrigin
>(
  destination: DestinationOrFetchOptions,
  requestConfig: T,
  options?: HttpRequestOptions
): Promise<HttpResponse> {
  return execute(executeWithAxios)(destination, requestConfig, options);
}

function buildDestinationHttpRequestConfig(
  destination: Destination,
  headers: Record<string, string>
): DestinationHttpRequestConfig {
  return {
    baseURL: destination.url,
    headers,
    params: destination.queryParameters,
    ...getAgentConfig(destination)
  };
}

async function buildHeaders(
  destination: Destination
): Promise<Record<string, string>> {
  try {
    return await buildHeadersForDestination(destination);
  } catch (error) {
    throw new ErrorWithCause('Failed to build headers.', error);
  }
}

function merge<T extends HttpRequestConfig>(
  destinationRequestConfig: DestinationHttpRequestConfig,
  customRequestConfig: T
): T & DestinationHttpRequestConfig {
  return {
    ...destinationRequestConfig,
    ...customRequestConfig,
    headers: {
      ...destinationRequestConfig.headers,
      ...customRequestConfig.headers
    }
  };
}

function mergeRequestWithAxiosDefaults(request: HttpRequest): HttpRequest {
  return { ...getAxiosConfigWithDefaults(), ...request };
}

function executeWithAxios(request: HttpRequest): Promise<HttpResponse> {
  return axios.request(mergeRequestWithAxiosDefaults(request));
}

/**
 * @internal
 */
export const defaultTimeoutTarget = 10000;

/**
 * Builds an Axios config with default configuration i.e. no_proxy, default http and https agent and GET as request method.
 * @returns AxiosRequestConfig with default parameters
 * @internal
 */
export function getAxiosConfigWithDefaults(): HttpRequestConfig {
  return {
    ...getAxiosConfigWithDefaultsWithoutMethod(),
    method: 'get'
  };
}

/**
 * @internal
 */
export function getAxiosConfigWithDefaultsWithoutMethod(): Omit<
  HttpRequestConfig,
  'method'
> {
  return {
    proxy: false,
    httpAgent: new http.Agent(),
    httpsAgent: new https.Agent(),
    timeout: defaultTimeoutTarget,
    paramsSerializer: (params = {}) =>
      Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
  };
}

/**
 * @internal
 */
export function getDefaultHttpRequestOptions(): HttpRequestOptions {
  return {
    fetchCsrfToken: true
  };
}

function buildHttpRequestOptions(
  httpRequestOptions?: HttpRequestOptions
): HttpRequestOptions {
  return httpRequestOptions
    ? {
        ...getDefaultHttpRequestOptions(),
        ...httpRequestOptions
      }
    : getDefaultHttpRequestOptions();
}

/**
 * @internal
 */
export function shouldHandleCsrfToken(
  requestConfig: HttpRequestConfig,
  options: HttpRequestOptions
): boolean {
  return (
    !!options.fetchCsrfToken &&
    requestConfig.method !== 'get' &&
    requestConfig.method !== 'GET'
  );
}

async function getCsrfHeaders(
  destination: DestinationOrFetchOptions,
  request: HttpRequestConfig & DestinationHttpRequestConfig
): Promise<Record<string, any>> {
  const csrfHeaders = pickIgnoreCase(request.headers, 'x-csrf-token');
  return Object.keys(csrfHeaders).length
    ? csrfHeaders
    : buildCsrfHeaders(destination, {
        params: request.params,
        headers: request.headers,
        url: request.url,
        timeout: request.timeout || defaultResilienceBTPServices.timeout,
        proxy: request.proxy,
        httpAgent: request.httpAgent,
        httpsAgent: request.httpsAgent
      });
}

async function addCsrfTokenToHeader(
  destination: DestinationOrFetchOptions,
  request: HttpRequestConfig & DestinationHttpRequestConfig,
  httpRequestOptions?: HttpRequestOptions
): Promise<Record<string, string>> {
  const options = buildHttpRequestOptions(httpRequestOptions);
  const csrfHeaders = shouldHandleCsrfToken(request, options)
    ? await getCsrfHeaders(destination, request)
    : {};
  return { ...request.headers, ...csrfHeaders };
}

/**
 * Encoder for encoding all query parameters (key and value) using encodeURIComponent.
 * @param parameter - Parameter to be encoded using encodeURIComponent.
 * @returns Encoded parameter object.
 */
export const encodeAllParameters: ParameterEncoder = function (
  parameter: Record<string, any>
): Record<string, any> {
  return Object.fromEntries(
    Object.entries(parameter).map(([key, value]) => [
      encodeURIComponent(key),
      encodeURIComponent(value)
    ])
  );
};
