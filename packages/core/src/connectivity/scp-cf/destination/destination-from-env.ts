import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import {
  proxyStrategy,
  ProxyStrategy,
  addProxyConfigurationInternet
} from '../../../http-agent/proxy-util';
import { decodeJwt } from '../jwt';
import {
  sanitizeDestination,
  isDestinationConfiguration,
  parseDestination
} from './destination';
import type {
  Destination,
  DestinationAuthToken
} from './destination-service-types';
import type { DestinationOptions } from './destination-accessor';

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
 * Get a destination from the environment variables by name. If there are multiple destinations with the same name the first one will be used.
 * This is discouraged for productive use! Use destination-accessor/useOrFetchDestination for fetching destinations
 * from the Cloud Foundry destination service.
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

/**
 * @hidden
 */
export function searchEnvVariablesForDestination(
  name: string,
  options: DestinationOptions = {}
): Destination | undefined {
  logger.info('Attempting to retrieve destination from environment variable.');

  if (getDestinationsEnvVariable()) {
    try {
      const destination = getDestinationFromEnvByName(name);
      if (destination) {
        if (destination.forwardAuthToken) {
          destination.authTokens = destinationAuthToken(options.userJwt);
          logger.info(
            `Successfully retrieved destination '${name}' from environment variable.`
          );
        } else {
          logger.warn(
            `Successfully retrieved destination '${name}' from environment variable.` +
              'This is discouraged for productive applications. ' +
              'Unset the variable to read destinations from the destination service on SAP Business Technology Platform.'
          );
        }
        return destination;
      }
    } catch (error) {
      logger.error(
        `Error in reading the given destinations from the environment variable ${error.message}.`
      );
    }
  }

  logger.info('No environment variable set.');
}

function destinationAuthToken(
  token?: string
): [DestinationAuthToken] | undefined {
  if (token) {
    const decoded = decodeJwt(token);
    logger.info(
      "Option 'forwardAuthToken' enabled on destination. Using the initial token for the destination."
    );
    return [
      {
        value: token,
        expiresIn: decoded.exp!.toString(),
        error: null,
        http_header: { key: 'Authorization', value: `Bearer ${token}` },
        type: 'Bearer'
      }
    ];
  }
  logger.warn(
    "Option 'forwardAuthToken' was set on destination but no token was provided to forward. This is most likely unintended and will lead to a authorization error on request execution."
  );
}
