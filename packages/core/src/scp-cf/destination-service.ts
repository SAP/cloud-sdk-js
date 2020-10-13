import {
  createLogger,
  errorWithCause,
  propertyExists
} from '@sap-cloud-sdk/util';
import axios, { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import { decodeJwt, wrapJwtInHeader } from '../util';
import { getAxiosConfigWithDefaults } from '../http-client';
import { parseDestination } from './destination';
import { Destination } from './destination-service-types';
import {
  circuitBreakerDefaultOptions,
  ResilienceOptions
} from './resilience-options';
import { destinationServiceCache } from './destination-service-cache';
import { CachingOptions } from './cache';

// For some reason, the equivalent import statement does not work
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const CircuitBreaker = require('opossum');

const logger = createLogger({
  package: 'core',
  messageContext: 'destination-service'
});
/**
 * Fetches all instance destinations from the given URI.
 *
 * @param destinationServiceUri - The URI of the destination service
 * @param jwt - The access token
 * @param options - Options to use by retrieving destinations
 * @returns A promise resolving to a list of instance destinations
 */
export function fetchInstanceDestinations(
  destinationServiceUri: string,
  jwt: string,
  options?: ResilienceOptions & CachingOptions
): Promise<Destination[]> {
  return fetchDestinations(
    destinationServiceUri,
    jwt,
    DestinationType.Instance,
    options
  );
}

/**
 * Fetches all subaccount destinations from the given URI.
 *
 * @param destinationServiceUri - The URI of the destination service
 * @param jwt - The access token
 * @param options - Options to use by retrieving destinations
 * @returns A promise resolving to a list of subaccount destinations
 */
export function fetchSubaccountDestinations(
  destinationServiceUri: string,
  jwt: string,
  options?: ResilienceOptions & CachingOptions
): Promise<Destination[]> {
  return fetchDestinations(
    destinationServiceUri,
    jwt,
    DestinationType.Subaccount,
    options
  );
}

export enum DestinationType {
  Instance = 'instance',
  Subaccount = 'subaccount'
}

async function fetchDestinations(
  destinationServiceUri: string,
  jwt: string,
  type: DestinationType,
  options?: ResilienceOptions & CachingOptions
): Promise<Destination[]> {
  const targetUri = `${destinationServiceUri.replace(
    /\/$/,
    ''
  )}/destination-configuration/v1/${type}Destinations`;

  if (options?.useCache) {
    const destinationsFromCache = destinationServiceCache.retrieveDestinationsFromCache(
      targetUri,
      decodeJwt(jwt),
      options.isolationStrategy
    );
    if (destinationsFromCache) {
      return destinationsFromCache;
    }
  }

  return callDestinationService(targetUri, jwt, options)
    .then(response => {
      const destinations: Destination[] = response.data.map(d =>
        parseDestination(d)
      );
      if (options?.useCache) {
        destinationServiceCache.cacheRetrievedDestinations(
          targetUri,
          decodeJwt(jwt),
          destinations,
          options.isolationStrategy
        );
      }
      return destinations;
    })
    .catch(error =>
      Promise.reject(
        errorWithCause(
          `Failed to fetch ${type} destinations.${errorMessageFromResponse(
            error
          )}`,
          error
        )
      )
    );
}

/**
 * Fetches a specific destination by name from the given URI, including authorization tokens.
 * For destinations with authenticationType OAuth2SAMLBearerAssertion, this call will trigger the OAuth2SAMLBearerFlow against the target destination.
 *
 * @param destinationServiceUri - The URI of the destination service
 * @param jwt - The access token
 * @param destinationName - The name of the desired destination
 * @param options - Options to use by retrieving destinations
 * @returns A Promise resolving to the destination
 */
export async function fetchDestination(
  destinationServiceUri: string,
  jwt: string,
  destinationName: string,
  options?: ResilienceOptions & CachingOptions
): Promise<Destination> {
  const targetUri = `${destinationServiceUri.replace(
    /\/$/,
    ''
  )}/destination-configuration/v1/destinations/${destinationName}`;

  if (options?.useCache) {
    const destinationsFromCache = destinationServiceCache.retrieveDestinationsFromCache(
      targetUri,
      decodeJwt(jwt),
      options.isolationStrategy
    );
    if (destinationsFromCache) {
      if (destinationsFromCache.length > 1) {
        logger.warn(
          'More than one destination found in the cache. This should not happen. First element used.'
        );
      }
      return destinationsFromCache[0];
    }
  }

  return callDestinationService(targetUri, jwt, options)
    .then(response => {
      const destination: Destination = parseDestination(response.data);
      if (options?.useCache) {
        destinationServiceCache.cacheRetrievedDestinations(
          targetUri,
          decodeJwt(jwt),
          [destination],
          options.isolationStrategy
        );
      }
      return destination;
    })
    .catch(error =>
      Promise.reject(
        errorWithCause(
          `Failed to fetch destination ${destinationName}.${errorMessageFromResponse(
            error
          )}`,
          error
        )
      )
    );
}

function errorMessageFromResponse(error: AxiosError): string {
  return propertyExists(error, 'response', 'data', 'ErrorMessage')
    ? ` ${error.response!.data.ErrorMessage}`
    : '';
}

function callDestinationService(
  uri: string,
  jwt: string,
  options: ResilienceOptions = { enableCircuitBreaker: true }
): AxiosPromise {
  const config: AxiosRequestConfig = {
    ...getAxiosConfigWithDefaults(),
    url: uri,
    headers: wrapJwtInHeader(jwt).headers
  };

  if (
    options.enableCircuitBreaker ||
    options.enableCircuitBreaker === undefined
  ) {
    return getInstanceCircuitBreaker().fire(uri, config);
  }
  return axios.request(config);
}

function getInstanceCircuitBreaker(breaker?: any): any {
  return typeof breaker === 'undefined'
    ? new CircuitBreaker(axios.get, circuitBreakerDefaultOptions)
    : breaker;
}
