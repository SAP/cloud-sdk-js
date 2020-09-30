import { createLogger } from '@sap-cloud-sdk/util';
import {
  proxyStrategy,
  ProxyStrategy,
  addProxyConfigurationInternet
} from '../util/proxy-util';
import {
  sanitizeDestination,
  isDestinationConfiguration,
  parseDestination
} from './destination';
import { Destination } from './destination-service-types';

const logger = createLogger({
  package: 'core',
  messageContext: 'env-destination-accessor'
});

/**
 * Get all destinations from the environment variable "destinations".
 * This is discouraged for productive use! Use [[useOrFetchDestination]] for fetching destinations from the Cloud Foundry destination service.
 *
 * @returns A list of destinations
 */
export function getDestinationsFromEnv(): Destination[] {
  const destinationsEnv = getDestinationsEnvVariable();
  if (destinationsEnv) {
    const destinations = JSON.parse(destinationsEnv);
    validateDestinations(destinations);
    return destinations.map(destination =>
      isDestinationConfiguration(destination)
        ? parseDestination(destination)
        : sanitizeDestination(destination)
    );
  }
  return [];
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
  const matchingDestinations = getDestinationsFromEnv().filter(
    dest => dest.name === name
  );
  if (!matchingDestinations.length) {
    return null;
  }
  if (matchingDestinations.length > 1) {
    logger.warn(
      `The 'destinations' env variable contains multiple destinations with the name '${name}'. Only the first entry will be respected.`
    );
  }
  const destination = matchingDestinations[0];
  return proxyStrategy(destination) === ProxyStrategy.INTERNET_PROXY
    ? addProxyConfigurationInternet(destination)
    : destination;
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
export function getDestinationConfig(
  dest: string | Destination = 'ErpQueryEndpoint'
): Destination | null {
  return typeof dest === 'string' ? getDestinationFromEnvByName(dest) : dest;
}

/**
 * @hidden
 */
export function getDestinationsEnvVariable(): string | undefined {
  return process.env['destinations'];
}

function validateDestinations(destinations: any[]) {
  destinations.forEach(destination => {
    if (
      typeof destination.name === 'undefined' &&
      typeof destination.Name === 'undefined'
    ) {
      logger.warn(
        "Destination from 'destinations' env variable is missing 'name' or 'Name' property."
      );
    }
  });
}
