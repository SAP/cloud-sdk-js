/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { addProxyConfigurationInternet, ProxyStrategy, proxyStrategy } from '../util/proxy-util';
import { sanitizeDestination } from './destination';
import { Destination } from './destination-service-types';

/**
 * Get all destinations from the environment variable "destinations".
 * This is discouraged for productive use! Use destination-accessor/useOrFetchDestination for fetching destinations
 * from the Cloud Foundry destination service.
 *
 * @returns A list of destinations
 */
export function getDestinationsFromEnv(): Destination[] {
  if (getDestinationsEnvVariable()) {
    return (JSON.parse(getDestinationsEnvVariable()!) as any[]).map(entry => sanitizeDestination(entry));
  } else {
    return [];
  }
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
  if (getDestinationsEnvVariable()) {
    const destinations = getDestinationsFromEnv().filter(dest => dest.name === name);
    if (destinations.length > 1) {
      throw new Error(`There are multiple destinations with the name "${name}".`);
    }
    if (destinations[0] && proxyStrategy(destinations[0]) === ProxyStrategy.INTERNET_PROXY) {
      return addProxyConfigurationInternet(destinations[0]);
    }
    return destinations[0];
  } else {
    return null;
  }
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

// tslint:disable: valid-jsdoc

/**
 * @hidden
 */
export function getDestinationConfig(dest: string | Destination = 'ErpQueryEndpoint'): Destination | null {
  if (typeof dest === 'string') {
    return getDestinationFromEnvByName(dest);
  } else {
    return dest;
  }
}

/**
 * @hidden
 */
export function getDestinationsEnvVariable(): string | undefined {
  return process.env['destinations'];
}
