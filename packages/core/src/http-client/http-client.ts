import * as http from 'http';
import * as https from 'https';
import {
  createLogger,
  ErrorWithCause,
  pickIgnoreCase
} from '@sap-cloud-sdk/util';
import axios, { AxiosRequestConfig } from 'axios';
import {
  buildHeadersForDestination,
  Destination,
  DestinationNameAndJwt,
  toDestinationNameUrl,
  useOrFetchDestination
} from '../connectivity/scp-cf';
import { buildCsrfHeaders } from '../http-client';
import { getAgentConfig } from './http-agent';
import {
  DestinationHttpRequestConfig,
  ExecuteHttpRequestFn,
  HttpRequest,
  HttpRequestConfig,
  HttpRequestOptions,
  HttpResponse
} from './http-client-types';

const logger = createLogger({
  package: 'core',
  messageContext: 'http-client'
});

/**
 * Builds a [[DestinationHttpRequestConfig]] for the given destination.
 * If a destination name (and a JWT) are provided, it will try to resolve the destination.
 *
 * @param destination - A destination or a destination name and a JWT.
 * @param customHeaders - Custom default headers for the resulting HTTP request.
 * @returns A [[DestinationHttpRequestConfig]].
 */
export async function buildHttpRequest(
  destination: Destination | DestinationNameAndJwt,
  customHeaders?: Record<string, any>
): Promise<DestinationHttpRequestConfig> {
  if (customHeaders) {
    logger.warn(
      `The following custom headers will overwrite headers created by the SDK:\n${Object.keys(
        customHeaders
      )
        .map(key => `  - "${key}"`)
        .join('\n')}`
    );
  }
  const resolvedDestination = await resolveDestination(destination);
  if (!resolvedDestination) {
    throw Error(
      `Failed to resolve the destination '${toDestinationNameUrl(
        destination
      )}'.`
    );
  }
  const headers = await buildHeaders(resolvedDestination, customHeaders);

  return buildDestinationHttpRequestConfig(resolvedDestination, headers);
}

/**
 * Builds a [[DestinationHttpRequestConfig]] for the given destination
 * and then merges it into the given request configuration.
 * Setting of the given request configuration take precedence over any destination related configuration.
 *
 * @param destination - A destination or a destination name and a JWT.
 * @param requestConfig - Any object representing an HTTP request.
 * @returns The given request config merged with the config built for the given destination.
 */
export function addDestinationToRequestConfig<T extends HttpRequestConfig>(
  destination: Destination | DestinationNameAndJwt,
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
 *
 * @param executeFn - A function that can execute an [[HttpRequestConfig]].
 * @returns A function expecting destination and a request.
 */
export function execute<ReturnT>(executeFn: ExecuteHttpRequestFn<ReturnT>) {
  return async function <T extends HttpRequestConfig>(
    destination: Destination | DestinationNameAndJwt,
    requestConfig: T,
    httpRequestOptions?: HttpRequestOptions
  ): Promise<ReturnT> {
    const destinationRequestConfig = await buildHttpRequest(
      destination,
      requestConfig.headers
    );
    const request = merge(destinationRequestConfig, requestConfig);
    request.headers = await addCsrfTokenToHeader(
      destination,
      request,
      httpRequestOptions
    );
    return executeFn(request);
  };
}

/**
 *
 * @experimental This API is experimental and might change in newer versions. Use with caution.
 * @param destination - A destination or a destination name and a JWT.
 * @param requestConfig - Any object representing an HTTP request.
 */

export async function buildAxiosRequestConfig<T extends HttpRequestConfig>(
  destination: Destination | DestinationNameAndJwt,
  requestConfig?: Partial<T>
): Promise<AxiosRequestConfig> {
  const destinationRequestConfig = await buildHttpRequest(
    destination,
    requestConfig?.headers
  );
  const request = requestConfig
    ? merge(destinationRequestConfig, requestConfig)
    : destinationRequestConfig;
  return { ...getAxiosConfigWithDefaultsWithoutMethod(), ...request };
}

/**
 * Builds a [[DestinationHttpRequestConfig]] for the given destination, merges it into the given requestConfig
 * and executes it (using Axios).
 *
 * @param destination - A destination or a destination name and a JWT.
 * @param requestConfig - Any object representing an HTTP request.
 * @param options - An [[HttpRequestOptions]] of the http request for configuring e.g., csrf token delegation. By default, the SDK will not fetch the csrf token.
 * @returns A promise resolving to an [[HttpResponse]].
 */
export function executeHttpRequest<T extends HttpRequestConfig>(
  destination: Destination | DestinationNameAndJwt,
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
  destination: Destination,
  customHeaders?: Record<string, any>
): Promise<Record<string, string>> {
  return buildHeadersForDestination(destination, customHeaders).catch(error => {
    throw new ErrorWithCause('Failed to build headers.', error);
  });
}

function resolveDestination(
  destination: Destination | DestinationNameAndJwt
): Promise<Destination | null> {
  return useOrFetchDestination(destination).catch(error => {
    throw new ErrorWithCause('Failed to load destination.', error);
  });
}

function merge<T extends HttpRequestConfig>(
  destinationRequestConfig: DestinationHttpRequestConfig,
  customRequestConfig: T
): T & DestinationHttpRequestConfig;
function merge<T extends HttpRequestConfig>(
  destinationRequestConfig: DestinationHttpRequestConfig,
  customRequestConfig: Partial<T>
): Partial<T> & DestinationHttpRequestConfig;

function merge<T extends HttpRequestConfig>(
  destinationRequestConfig: DestinationHttpRequestConfig,
  customRequestConfig: T | Partial<T>
): (T | Partial<T>) & DestinationHttpRequestConfig {
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
 */
export function getAxiosConfigWithDefaults(): HttpRequestConfig {
  return {
    ...getAxiosConfigWithDefaultsWithoutMethod(),
    method: 'get'
  };
}

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
  destination: Destination | DestinationNameAndJwt,
  request: HttpRequestConfig & DestinationHttpRequestConfig
): Promise<Record<string, any>> {
  const csrfHeaders = pickIgnoreCase(request.headers, 'x-csrf-token');
  return Object.keys(csrfHeaders).length
    ? csrfHeaders
    : buildCsrfHeaders(destination, {
        params: request.params,
        headers: request.headers,
        url: request.url
      });
}

async function addCsrfTokenToHeader(
  destination: Destination | DestinationNameAndJwt,
  request: HttpRequestConfig & DestinationHttpRequestConfig,
  httpRequestOptions?: HttpRequestOptions
): Promise<Record<string, string>> {
  const options = buildHttpRequestOptions(httpRequestOptions);
  const csrfHeaders = shouldHandleCsrfToken(request, options)
    ? await getCsrfHeaders(destination, request)
    : {};
  return { ...request.headers, ...csrfHeaders };
}
