import * as http from 'http';
import * as https from 'https';
import {
  buildHeadersForDestination,
  getAgentConfig,
  getTenantId
} from '@sap-cloud-sdk/connectivity';
import {
  assertHttpDestination,
  getAdditionalHeaders,
  getAdditionalQueryParameters,
  getProxyConfig,
  resolveDestination
} from '@sap-cloud-sdk/connectivity/internal';
import { executeWithMiddleware } from '@sap-cloud-sdk/resilience/internal';
import {
  createLogger,
  ErrorWithCause,
  isNullish,
  sanitizeRecord,
  unixEOL
} from '@sap-cloud-sdk/util';
import axios from 'axios';
import { isHttpRequestConfigWithOrigin } from './http-client-types';
import { mergeOptionsWithPriority } from './http-request-config';
import { csrf } from './csrf-token-middleware';
import type {
  DestinationHttpRequestConfig,
  ExecuteHttpRequestFn,
  HttpRequest,
  HttpRequestConfig,
  HttpRequestConfigBase,
  HttpRequestConfigWithOrigin,
  HttpRequestOptions,
  HttpResponse,
  OriginOptions,
  OriginOptionsInternal,
  ParameterEncoder
} from './http-client-types';
import type {
  DestinationConfiguration,
  HttpDestination
} from '@sap-cloud-sdk/connectivity/internal';
import type {
  Destination,
  HttpDestinationOrFetchOptions
} from '@sap-cloud-sdk/connectivity';

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
  destination: HttpDestinationOrFetchOptions
): Promise<DestinationHttpRequestConfig> {
  const resolvedDestination = await resolveDestination(destination);
  assertHttpDestination(resolvedDestination);

  const headers = await buildHeaders(resolvedDestination);

  return buildDestinationHttpRequestConfig(resolvedDestination, headers);
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
export function execute(executeFn: ExecuteHttpRequestFn<HttpResponse>) {
  return async function <T extends HttpRequestConfigWithOrigin>(
    destination: HttpDestinationOrFetchOptions,
    requestConfig: T,
    options: HttpRequestOptions
  ): Promise<HttpResponse> {
    const resolvedDestination = await resolveDestination(destination);
    assertHttpDestination(resolvedDestination);

    const destinationRequestConfig =
      await buildHttpRequest(resolvedDestination);

    logCustomHeadersWarning(requestConfig.headers);
    const request = await buildRequestWithMergedHeadersAndQueryParameters(
      requestConfig,
      resolvedDestination,
      destinationRequestConfig,
      destination.jwt
    );

    if (options?.fetchCsrfToken) {
      requestConfig.middleware = [...(requestConfig.middleware || []), csrf()];
    }

    return executeWithMiddleware(requestConfig.middleware, {
      fnArgument: request,
      fn: (req: typeof request) => {
        logRequestInformation(request);
        return executeFn(req);
      },
      context: {
        jwt: destination.jwt,
        uri: resolvedDestination.url,
        destinationName: resolvedDestination.name ?? undefined,
        tenantId: getTenantId(destination.jwt)
      }
    });
  };
}

/**
 * Build an {@link HttpRequestConfigWithOrigin} from a given {@link HttpRequestConfigWithOrigin} or {@link HttpRequestConfig}
 * @param requestConfig - The given {@link HttpRequestConfigWithOrigin} or {@link HttpRequestConfig}
 * @returns The resulting {@link HttpRequestConfigWithOrigin}
 * @internal
 */
export function buildHttpRequestConfigWithOrigin(
  requestConfig: HttpRequestConfigWithOrigin | HttpRequestConfig | undefined
): HttpRequestConfigWithOrigin {
  if (!requestConfig) {
    return getDefaultHttpRequestConfigOptions();
  }
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
 * This method does nothing and is only there to indicate that the call was made by a typed OData client and encoding already happened in the client.
 * @param params - Parameters which are returned.
 * @returns The parameters as they are without encoding.
 * @internal
 */
export const oDataTypedClientParameterEncoder: ParameterEncoder = (
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

function isOdataTypedClientParameterEncoder(
  parameterEncoder: ParameterEncoder
): parameterEncoder is typeof oDataTypedClientParameterEncoder {
  return parameterEncoder.name === oDataTypedClientParameterEncoder.name;
}

function getEncodedParameters(
  parameters: OriginOptionsInternal,
  requestConfig: HttpRequestConfigWithOrigin
): OriginOptionsInternal {
  const { parameterEncoder } = requestConfig;
  if (isNullish(parameterEncoder)) {
    return encodeQueryParameters({
      parameters,
      parameterEncoder: encodeAllParameters,
      exclude: ['custom']
    });
  }

  if (isOdataTypedClientParameterEncoder(parameterEncoder)) {
    return encodeQueryParameters({
      parameters,
      parameterEncoder: encodeAllParameters,
      exclude: ['custom', 'requestConfig']
    });
  }

  // Custom encoder provided by user -> use it for all origins
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
  destinationRequestConfig: DestinationHttpRequestConfig,
  jwt?: string
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
    destinationRequestConfig.headers,
    headersOriginOptions,
    jwt
  );

  const request = merge(destinationRequestConfig, requestConfigBase);
  request.headers = mergedHeaders || {};
  request.params = mergedQueryParameter || {};
  return request;
}

async function getMergedHeaders(
  destination: Destination,
  headersDestination?: Record<string, string>,
  headersOriginOptions?: OriginOptions,
  jwt?: string
): Promise<Record<string, string> | undefined> {
  const queryParametersDestinationProperty = getAdditionalHeaders(
    (destination.originalProperties as DestinationConfiguration) || {}
  ).headers;

  headersDestination = destination.forwardAuthToken
    ? addForwardAuthTokenHeader(headersDestination, jwt)
    : headersDestination;

  return mergeOptionsWithPriority({
    requestConfig: headersOriginOptions?.requestConfig,
    custom: { ...headersOriginOptions?.custom },
    destinationProperty: queryParametersDestinationProperty,
    destination: headersDestination
  });
}

function addForwardAuthTokenHeader(
  headersDestination?: Record<string, string>,
  jwt?: string | undefined
) {
  if (jwt) {
    return { ...headersDestination, authorization: `Bearer ${jwt}` };
  }
  logger.debug(
    'The `forwardAuthToken` is set, but the JWT is missing. Please provide a valid JWT to enable token forwarding.'
  );
  return headersDestination;
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

/**
 * Builds a {@link DestinationHttpRequestConfig} for the given destination, merges it into the given `requestConfig` and executes it (using Axios).
 * @param destination - A destination or a destination name and a JWT.
 * @param requestConfig - Any object representing an HTTP request.
 * @param options - An {@link HttpRequestOptions} of the HTTP request for configuring e.g., CSRF token delegation. By default, the SDK will fetch the CSRF token.
 * @returns A promise resolving to an {@link HttpResponse}.
 */
export function executeHttpRequest<T extends HttpRequestConfig>(
  destination: HttpDestinationOrFetchOptions,
  requestConfig?: T,
  options?: HttpRequestOptions
): Promise<HttpResponse> {
  const requestConfigWithOrigin =
    buildHttpRequestConfigWithOrigin(requestConfig);
  return execute(executeWithAxios)(destination, requestConfigWithOrigin, {
    ...getDefaultHttpRequestOptions(),
    ...options
  });
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
  destination: HttpDestinationOrFetchOptions,
  requestConfig?: T,
  options?: HttpRequestOptions
): Promise<HttpResponse> {
  const requestConfigWithDefaults =
    requestConfig ?? getDefaultHttpRequestConfigOptions();
  return execute(executeWithAxios)(destination, requestConfigWithDefaults, {
    ...getDefaultHttpRequestOptions(),
    ...options
  });
}

async function buildDestinationHttpRequestConfig(
  destination: HttpDestination,
  headers: Record<string, string>
): Promise<DestinationHttpRequestConfig> {
  return {
    baseURL: destination.url,
    headers,
    params: destination.queryParameters,
    proxy: getProxyConfig(destination),
    ...(await getAgentConfig(destination))
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
 * Builds an Axios config with default configuration i.e. no_proxy, default http and https agent and GET as request method.
 * @returns RawAxiosRequestConfig with default parameters
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
    httpAgent: new http.Agent(),
    httpsAgent: new https.Agent(),
    timeout: 0, // zero means no timeout https://github.com/axios/axios/blob/main/README.md#request-config
    paramsSerializer: {
      serialize: (params = {}) =>
        Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('&')
    }
  };
}

/**
 * @internal
 */
export function getDefaultHttpRequestConfigOptions(): HttpRequestConfigWithOrigin {
  return {
    method: 'get'
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
