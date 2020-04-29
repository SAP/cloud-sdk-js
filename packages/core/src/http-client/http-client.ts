/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import * as http from 'http';
import * as https from 'https';
import { errorWithCause, MapType } from '@sap-cloud-sdk/util';
import axios from 'axios';
import { buildHeadersForDestination } from '../request-builder/header-builder/header-builder';
import {
  Destination,
  DestinationNameAndJwt,
  toDestinationNameUrl,
  useOrFetchDestination
} from '../scp-cf';
import { getAgentConfig } from '../request-builder';
import {
  DestinationHttpRequestConfig,
  ExecuteHttpRequestFn,
  HttpRequest,
  HttpRequestConfig,
  HttpResponse
} from './http-client-types';

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
  customHeaders?: MapType<any>
): Promise<DestinationHttpRequestConfig> {
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
 * Returns a function that takes a destination and a request, builds an [[HttpRequest]] from them, and calls
 * the provided execute function.
 *
 * NOTE: If you simply want to execute a request without passing your own execute function, use [[executeHttpRequest]] instead!
 *
 * @param executeFn - A function that can execute an [[HttpRequestConfig]].
 * @returns A function expecting destination and a request.
 */
export function execute(executeFn: ExecuteHttpRequestFn) {
  return async function <T extends HttpRequestConfig>(
    destination: Destination | DestinationNameAndJwt,
    requestConfig: T
  ): Promise<HttpResponse> {
    const destinationRequestConfig = await buildHttpRequest(
      destination,
      requestConfig.headers
    );
    const request = merge(destinationRequestConfig, requestConfig);
    return executeFn(request);
  };
}

/**
 * Builds a [[DestinationHttpRequestConfig]] for the given destination, merges it into the given requestConfig
 * and executes it (using Axios).
 *
 * @param destination - A destination or a destination name and a JWT.
 * @param requestConfig - Any object representing an HTTP request.
 * @returns An [[HttpResponse]].
 */
export const executeHttpRequest = execute(executeWithAxios);

function buildDestinationHttpRequestConfig(
  destination: Destination,
  headers: MapType<string>
): DestinationHttpRequestConfig {
  return {
    baseURL: destination.url,
    headers,
    ...getAgentConfig(destination)
  };
}

function buildHeaders(
  destination: Destination,
  customHeaders?: MapType<any>
): Promise<MapType<string>> {
  return buildHeadersForDestination(destination, customHeaders).catch(error =>
    Promise.reject(
      errorWithCause(
        'Failed to build HTTP request for destination: failed to build headers!',
        error
      )
    )
  );
}

function resolveDestination(
  destination: Destination | DestinationNameAndJwt
): Promise<Destination | null> {
  return useOrFetchDestination(destination).catch(error =>
    Promise.reject(
      errorWithCause(
        'Failed to build HTTP request for destination: failed to load destination!',
        error
      )
    )
  );
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

function executeWithAxios(request: HttpRequest): Promise<HttpResponse> {
  return axios.request({ ...getAxiosConfigWithDefaults(), ...request });
}

/**
 * Builds an Axios config with default configuration i.e. no_proxy, default http and https agent and GET as request method.
 *
 * @returns AxiosRequestConfig with default parameters
 */
export function getAxiosConfigWithDefaults(): HttpRequestConfig {
  return {
    method: 'get',
    proxy: false,
    httpAgent: new http.Agent(),
    httpsAgent: new https.Agent()
  };
}
