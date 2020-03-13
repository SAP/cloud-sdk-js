/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { createLogger } from '@sap-cloud-sdk/util';
import { addProxyConfigurationInternet, ProxyStrategy, proxyStrategy } from '../util/proxy-util';
import { sanitizeDestination } from './destination';
import { Destination } from './destination-service-types';

const logger = createLogger({
  package: 'core',
  messageContext: 'env-destination-accessor'
});

/**
 * Get all destinations from the environment variable "destinations".
 * This is discouraged for productive use! Use destination-accessor/useOrFetchDestination for fetching destinations
 * from the Cloud Foundry destination service.
 *
 * @returns A list of destinations
 */
export function getDestinationsFromEnv(): Destination[] {
  return getDestinationsEnvVariable() ? JSON.parse(getDestinationsEnvVariable()!).map(entry => sanitizeDestination(entry)) : [];
}

/**
 * @deprecated Since v1.4.2. Use [[getDestinationsFromEnv]] instead.
 *
 * Get all destinations from the environment variable "destinations".
 * This is discouraged for productive use! Use destination-accessor/useOrFetchDestination for fetching destinations
 * from the Cloud Foundry destination service.
 *
 * @returns A list of destinations
 */
export function getDestinations(): Destination[] {
  return getDestinationsFromEnv();
}

/**
 * Get a destination from the environment variables by name. Throws an error if there are multiple destinations with the same name.
 * This is discouraged for productive use! Use destination-accessor/useOrFetchDestination for fetching destinations
 * from the Cloud Foundry destination service.
 *
 * @param name - Name of the destination
 * @returns The requested destination if existent, otherwise `null`
 */
export function getDestinationFromEnvByName(name: string): Destination | null {
  const destinations = getDestinationsFromEnv();
  if (destinations.length) {
    validateDestinations(destinations);
    const matchingDestinations = destinations.filter(dest => dest.name === name);
    if (matchingDestinations.length > 1) {
      logger.warn(`The 'destinations' env variable contains multiple destinations with the name '${name}'. Only the first entry will be respected.`);
    }
    const destination = matchingDestinations[0];
    if (destination) {
      return proxyStrategy(destination) === ProxyStrategy.INTERNET_PROXY ? addProxyConfigurationInternet(destination) : destination;
    }
  }
  return null;
}

/**
 * @deprecated Since v1.4.2. Use [[getDestinationFromEnvByName]] instead.
 *
 * Get a destination from the environment variables by name. Throws an error if there are multiple destinations with the same name.
 * This is discouraged for productive use! Use destination-accessor/useOrFetchDestination for fetching destinations
 * from the Cloud Foundry destination service.
 *
 * @param name - Name of the destination
 * @returns The requested destination if existent, otherwise `null`
 */
export function getDestinationByName(name: string): Destination | null {
  return getDestinationFromEnvByName(name);
}

/* eslint-disable valid-jsdoc */

/**
 * @hidden
 */
export function getDestinationConfig(dest: string | Destination = 'ErpQueryEndpoint'): Destination | null {
  return typeof dest === 'string' ? getDestinationFromEnvByName(dest) : dest;
}

/**
 * @hidden
 */
export function getDestinationsEnvVariable(): string | undefined {
  return process.env['destinations'];
}

function validateDestinations(destinations: Destination[]) {
  destinations.forEach(destination => {
    if (typeof destination.name === 'undefined') {
      logger.warn(`Destination from 'destinations' env variable is missing 'name' property. Make sure it exists: ${JSON.stringify(destination)}`);
    }
  });
}

