import * as http from 'http';
import * as https from 'https';
import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import axios, { AxiosRequestConfig } from 'axios';
import {
  buildHeadersForDestination,
  Destination,
  DestinationNameAndJwt,
  toDestinationNameUrl,
  useOrFetchDestination
} from '../connectivity/scp-cf';
import { getAgentConfig } from './http-agent';
import {
  DefaultHttpResponse,
  DestinationHttpRequestConfig,
  ExecuteHttpRequestFn,
  HttpRequest,
  HttpRequestConfig,
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
      `The custom headers are provided with the keys: ${Object.keys(
        customHeaders
      )}. These keys will overwrite the headers created by the SDK.`
    );
  }
  const resolvedDestination = await resolveDestination(destination);
  if (!resolvedDestination) {
    throw Error(
      `Failed to resolve the destination: ${toDestinationNameUrl(destination)}.`
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
 * Takes as paramter a function that expects an [[HttpRequest]] and returns a Promise of [[HttpResponse]].
 * Returns a function that takes a destination and a request-config (extends [[HttpRequestConfig]]), builds an [[HttpRequest]] from them, and calls
 * the provided execute function.
 *
 * NOTE: If you simply want to execute a request without passing your own execute function, use [[executeHttpRequest]] instead!
 *
 * @param executeFn - A function that can execute an [[HttpRequestConfig]].
 * @returns A function expecting destination and a request.
 */
export function execute<ReturnT>(executeFn: ExecuteHttpRequestFn<ReturnT>) {
  return async function <T extends HttpRequestConfig>(
    destination: Destination | DestinationNameAndJwt,
    requestConfig: T
  ): Promise<ReturnT> {
    const destinationRequestConfig = await buildHttpRequest(
      destination,
      requestConfig.headers
    );
    const request = merge(destinationRequestConfig, requestConfig);
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
 * @returns Promise resolving to an [[HttpResponse]].
 */
export const executeHttpRequest = execute(executeWithAxios);

/**
 * Builds a [[DestinationHttpRequestConfig]] for the given destination, merges it into the given requestConfig
 * and executes it (using Axios). It returns a [[DefaultHttpResponse]].
 *
 * @param destination - A destination or a destination name and a JWT.
 * @param requestConfig - Any object representing an HTTP request.
 * @returns Promise resolving to a [[DefaultHttpResponse]].
 */
export const executeHttpRequestReturnDefaultResponse = execute(executeWithAxiosReturnDefaultResponse);

function buildDestinationHttpRequestConfig(
  destination: Destination,
  headers: Record<string, string>
): DestinationHttpRequestConfig {
  return {
    baseURL: destination.url,
    headers,
    ...getAgentConfig(destination)
  };
}

function buildHeaders(
  destination: Destination,
  customHeaders?: Record<string, any>
): Promise<Record<string, string>> {
  return buildHeadersForDestination(destination, customHeaders).catch(error => {
    throw new ErrorWithCause(
      'Failed to build HTTP request for destination: failed to build headers!',
      error
    );
  });
}

function resolveDestination(
  destination: Destination | DestinationNameAndJwt
): Promise<Destination | null> {
  return useOrFetchDestination(destination).catch(error => {
    throw new ErrorWithCause(
      'Failed to build HTTP request for destination: failed to load destination!',
      error
    );
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

function mergeRequestWithAxiosDefaults(request: HttpRequest): HttpRequest{
  return { ...getAxiosConfigWithDefaults(), ...request };
}

function executeWithAxios(request: HttpRequest): Promise<HttpResponse> {
  return axios.request(mergeRequestWithAxiosDefaults(request));
}

function executeWithAxiosReturnDefaultResponse(request: HttpRequest): Promise<DefaultHttpResponse> {
  return axios.request(mergeRequestWithAxiosDefaults(request));
}

/**
 * Builds an Axios config with default configuration i.e. no_proxy, default http and https agent and GET as request method.
 *
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
    httpsAgent: new https.Agent()
  };
}
