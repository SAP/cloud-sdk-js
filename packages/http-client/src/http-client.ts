import * as http from 'http';
import * as https from 'https';
import {
  createLogger,
  ErrorWithCause,
  pickIgnoreCase,
  unixEOL
} from '@sap-cloud-sdk/util';
import axios from 'axios';
import {
  buildHeadersForDestination,
  Destination,
  DestinationOrFetchOptions,
  toDestinationNameUrl,
  useOrFetchDestination,
  getAgentConfig
} from '@sap-cloud-sdk/connectivity';
import {
  DestinationConfiguration,
  getAuthHeader,
  getAdditionalHeaders,
  getAdditionalQueryParameters
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
  OriginOptions
} from './http-client-types';
import { mergeOptionsWithPriority } from './http-request-config';
import { buildCsrfHeaders } from './csrf-token-header';

const logger = createLogger({
  package: 'http-client',
  messageContext: 'http-client'
});

/**
 * Builds a [[DestinationHttpRequestConfig]] for the given destination.
 * If a destination name (and a JWT) are provided, it will try to resolve the destination.
 * @param destination - A destination or a destination name and a JWT.
 * @returns A [[DestinationHttpRequestConfig]].
 */
export async function buildHttpRequest(
  destination: DestinationOrFetchOptions
): Promise<DestinationHttpRequestConfig> {
  const resolvedDestination = await resolveDestination(destination);
  if (!resolvedDestination) {
    throw Error(
      `Failed to resolve the destination '${toDestinationNameUrl(
        destination
      )}'.`
    );
  }
  const headers = await buildHeaders(resolvedDestination);

  return buildDestinationHttpRequestConfig(resolvedDestination, headers);
}

/**
 * Builds a [[DestinationHttpRequestConfig]] for the given destination
 * and then merges it into the given request configuration.
 * Setting of the given request configuration take precedence over any destination related configuration.
 * @param destination - A destination or a destination name and a JWT.
 * @param requestConfig - Any object representing an HTTP request.
 * @returns The given request config merged with the config built for the given destination.
 * @internal
 */
export function addDestinationToRequestConfig<T extends HttpRequestConfig>(
  destination: DestinationOrFetchOptions,
  requestConfig: T
): Promise<T & DestinationHttpRequestConfig> {
  return buildHttpRequest(destination).then(destinationConfig =>
    merge(destinationConfig, requestConfig)
  );
}

/**
 * Takes as parameter a function that expects an [[HttpRequest]] and returns a Promise of [[HttpResponse]].
 * Returns a function that takes a destination and a request-config (extends [[HttpRequestConfig]]), builds an [[HttpRequest]] from them, and calls
 * the provided execute function.
 *
 * NOTE: If you simply want to execute a request without passing your own execute function, use [[executeHttpRequest]] instead.
 * @param executeFn - A function that can execute an [[HttpRequestConfig]].
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
    if (!resolvedDestination) {
      throw Error(
        `Failed to resolve the destination '${toDestinationNameUrl(
          destination
        )}'.`
      );
    }
    const destinationRequestConfig = await buildHttpRequest(
      resolvedDestination
    );
    logCustomHeadersWarning(requestConfig.headers?.custom);
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
 * @internal
 * Build a request config from a given request config and a destination.
 * In addition to merging the information from the request config and the destination, it also picks values with higher priority for headers and query parameters.
 * @param requestConfig - Any object representing an HTTP request.
 * @param destination - A resolved [[Destination]] object.
 * @param destinationRequestConfig - A [[DestinationHttpRequestConfig]] object, that is built from a [[Destination]].
 * @see [[mergeOptionsWithPriority]]
 * @returns A resulting request config.
 */
export async function buildRequestWithMergedHeadersAndQueryParameters(
  requestConfig: HttpRequestConfigWithOrigin,
  destination: Destination,
  destinationRequestConfig: DestinationHttpRequestConfig
): Promise<HttpRequestConfig & DestinationHttpRequestConfig> {
  const { paramsOriginOptions, headersOriginOptions, requestConfigBase } =
    splitRequestConfig(requestConfig);

  const mergedQueryParameter = getMergedParameters(
    destination,
    paramsOriginOptions
  );
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

function getMergedParameters(
  destination: Destination,
  paramsOriginOptions?: OriginOptions
): Record<string, string> | undefined {
  const queryParametersDestinationProperty = getAdditionalQueryParameters(
    (destination.originalProperties as DestinationConfiguration) || {}
  ).queryParameters;
  return mergeOptionsWithPriority({
    ...paramsOriginOptions,
    destinationProperty: queryParametersDestinationProperty,
    destination: destination.queryParameters
  });
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

function logCustomHeadersWarning(customHeaders?: Record<string, string>) {
  if (customHeaders) {
    logger.info(
      `The following custom headers will overwrite headers created by the SDK:\n${Object.keys(
        customHeaders
      )
        .map(key => `  - "${key}"`)
        .join('\n')}`
    );
  }
}

function logRequestInformation(request: HttpRequestConfig) {
  const basicRequestInfo = `Execute '${request.method}' request with target: ${request.url}.`;
  if (request.headers) {
    const headerText = Object.keys(request.headers).reduce((previous, key) => {
      if (
        key.toLowerCase().includes('authentication') ||
        key.toLowerCase().includes('authorization')
      ) {
        return `${previous}${unixEOL}${key}:*******`;
      }
      return `${previous}${unixEOL}${key}:${request.headers![key]}`;
    }, 'The headers of the request are:');
    logger.debug(`${basicRequestInfo}${unixEOL}${headerText}`);
  }
}

/**
 * Builds a [[DestinationHttpRequestConfig]] for the given destination, merges it into the given [[HttpRequestConfigWithOrigin]]
 * and executes it (using Axios).
 * The [[HttpRequestConfigWithOrigin]] supports defining header options and query parameter options with origins.
 * When reaching conflicts, values with high priorities are chosen.
 * The priorities are defined in the [[origins]].
 * @param destination - A destination or a destination name and a JWT.
 * @param requestConfig - Any object representing an HTTP request.
 * @param options - An [[HttpRequestOptions]] of the http request for configuring e.g., CSRF token delegation. By default, the SDK will not fetch the CSRF token.
 * @returns A promise resolving to an [[HttpResponse]].
 */
export function executeHttpRequest<T extends HttpRequestConfigWithOrigin>(
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

function buildHeaders(
  destination: Destination
): Promise<Record<string, string>> {
  return buildHeadersForDestination(destination).catch(error => {
    throw new ErrorWithCause('Failed to build headers.', error);
  });
}

function resolveDestination(
  destination: DestinationOrFetchOptions
): Promise<Destination | null> {
  return useOrFetchDestination(destination).catch(error => {
    throw new ErrorWithCause('Failed to load destination.', error);
  });
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
 * @returns AxiosRequestConfig with default parameters
 * @internal
 */
export function getAxiosConfigWithDefaults(): HttpRequestConfig {
  return {
    ...getAxiosConfigWithDefaultsWithoutMethod(),
    method: 'get'
  };
}
// eslint-disable-next-line valid-jsdoc
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
    paramsSerializer: (params = {}) =>
      Object.entries(params)
        .map(([key, value]) => `${key}=${value}`)
        .join('&')
  };
}

function getDefaultHttpRequestOptions(): HttpRequestOptions {
  // TODO: 2.0 change to true
  return {
    fetchCsrfToken: false
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

// eslint-disable-next-line valid-jsdoc
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
