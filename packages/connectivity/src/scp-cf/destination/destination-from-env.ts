import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import {
  sanitizeDestination,
  isDestinationConfiguration,
  parseDestination
} from './destination';
import { DestinationFetchOptions } from './destination-accessor-types';
import type { Destination } from './destination-service-types';
import {
  addProxyConfigurationInternet,
  ProxyStrategy,
  proxyStrategy
} from './http-proxy-util';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'env-destination-accessor'
});

/**
 * Get all destinations from the environment variable "destinations".
 * This is discouraged for productive use! Use {@link useOrFetchDestination} for fetching destinations from the Cloud Foundry destination service.
 *
 * @returns A list of destinations
 * @internal
 */
export function getDestinationsFromEnv(): Destination[] {
  const destinationsEnv = getDestinationsEnvVariable();
  logger.debug(
    `The value for the destination environment variable is: ${destinationsEnv}`
  );
  if (destinationsEnv) {
    let destinations;
    try {
      destinations = JSON.parse(destinationsEnv);
    } catch (err) {
      throw new ErrorWithCause(
        'Error in parsing the destinations from the environment variable.',
        err
      );
    }
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
 * Get a destination from the environment variables by name. If there are multiple destinations with the same name the first one will be used.
 * This is discouraged for productive use! Use destination-accessor/useOrFetchDestination for fetching destinations
 * from the Cloud Foundry destination service.
 * @param name - Name of the destination
 * @returns The requested destination if existent, otherwise `null`
 * @internal
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
  return proxyStrategy(destination) === ProxyStrategy.INTERNET_PROXY ||
    proxyStrategy(destination) === ProxyStrategy.PRIVATELINK_PROXY
    ? addProxyConfigurationInternet(destination)
    : destination;
}

/**
 * @internal
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

/**
 * @internal
 */
export function searchEnvVariablesForDestination(
  options: DestinationFetchOptions
): Destination | null {
  logger.debug('Attempting to retrieve destination from environment variable.');

  if (getDestinationsEnvVariable()) {
    try {
      const destination = getDestinationFromEnvByName(options.destinationName);
      if (destination) {
        logger.info(
          `Successfully retrieved destination '${options.destinationName}' from environment variable.`
        );
        return destination;
      }
    } catch (error) {
      logger.error(
        `Error in reading the given destinations from the environment variable ${error.message}.`
      );
    }
  }

  logger.debug('No environment variable set.');
  return null;
}

/**
 * @internal
 */
export function validateNameAvailable(
  destinationName: string,
  existingNames: Set<string>
): void {
  if (existingNames.has(destinationName)) {
    throw new Error(
      `Parsing destinations failed, destination with name "${destinationName}" already exists in the "destinations" environment variables.`
    );
  }
}

/**
 * @internal
 */
export function setDestinationsInEnv(destinations: Destination[]): void {
  process.env.destinations = JSON.stringify(destinations);
}
