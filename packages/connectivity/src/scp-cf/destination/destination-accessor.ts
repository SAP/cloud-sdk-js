import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import { shouldExchangeToken } from '../identity-service';
import { getDestinationServiceCredentials } from '../environment-accessor';
import { getSubdomain } from '../jwt';
import { jwtBearerToken } from '../token-accessor';
import { sanitizeDestination, toDestinationNameUrl } from './destination';
import { searchEnvVariablesForDestination } from './destination-from-env';
import { searchServiceBindingForDestination } from './destination-from-vcap';
import { getDestinationFromDestinationService } from './destination-from-service';
import { isDestinationFetchOptions } from './destination-accessor-types';
import { searchRegisteredDestination } from './destination-from-registration';
import { getSubscriberToken } from './get-subscriber-token';
import { getProviderServiceToken } from './get-provider-token';
import { fetchDestinations } from './destination-service';
import type {
  DestinationFetchOptions,
  AllDestinationOptions,
  DestinationWithoutToken
} from './destination-accessor-types';
import type { DestinationFromServiceBindingOptions } from './destination-from-vcap';
import type { Destination } from './destination-service-types';
import type { DestinationOrFetchOptions } from './destination';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'destination-accessor'
});

/**
 * Returns the parameter if it is a destination, calls {@link getDestination} otherwise (which will try to fetch the destination
 * from the Cloud Foundry destination service).
 *
 * Fetching a destination requires:
 * - A binding to exactly one XSUAA service instance with service plan "application".
 * - A binding to a destination service instance.
 *
 * If either of the prerequisites is not met or one of the services returns an error, this function will either throw an error or return a promise that rejects.
 * @param destination - A destination or the necessary parameters to fetch one.
 * @returns A promise resolving to the requested destination on success.
 */
export async function useOrFetchDestination(
  destination: DestinationOrFetchOptions
): Promise<Destination | null> {
  return isDestinationFetchOptions(destination)
    ? getDestination(destination)
    : sanitizeDestination(destination);
}

/**
 * Resolve a destination by the following steps:
 * 1. Call [[useOrFetchDestination]]
 * 2. Throw an error, when the resulting destination from the previous step is falsy
 * 3. Return the checked destination.
 * @param destination - A destination or the necessary parameters to fetch one.
 * @returns A promise resolving to the requested destination on success.
 * @internal
 */
export async function resolveDestination(
  destination: DestinationOrFetchOptions
): Promise<Destination> {
  const resolvedDestination = await useOrFetchDestination(destination).catch(
    error => {
      throw new ErrorWithCause('Failed to load destination.', error);
    }
  );
  if (!resolvedDestination) {
    throw Error(
      `Failed to resolve the destination '${toDestinationNameUrl(
        destination
      )}'.`
    );
  }
  return resolvedDestination;
}

/**
 * Builds a destination from one of three sources (in the given order):
 * - from the environment variable "destinations".
 * - from service bindings.
 * - from the destination service.
 *
 * If you want to get a destination only from a specific source, use the corresponding function directly
 * (`getDestinationFromEnvByName`, `getDestinationFromServiceBinding`, `getDestinationFromDestinationService`).
 * @param options - The options to retrieve the destination.
 * @returns A promise returning the requested destination on success.
 */
export async function getDestination(
  options: DestinationFetchOptions & DestinationFromServiceBindingOptions
): Promise<Destination | null> {
  const destination =
    searchEnvVariablesForDestination(options) ||
    (await searchRegisteredDestination(options)) ||
    (await searchServiceBindingForDestination(options)) ||
    (await getDestinationFromDestinationService(options));
  return destination;
}

/**
 * Creates comprehensive log messages from a destinations array and their origin.
 * @param origin - Origin of the destination.
 * @param destinations - Array of destinations.
 * @returns Logs of the retrieval of destinations.
 */
function createDestinationFetchLogs(
  origin: string,
  destinations: Destination[]
): string {
  return destinations.reduce(
    (prevLogMessages, currentDestination) =>
      prevLogMessages +
      `Retrieving ${origin} destination: ${currentDestination.name}.\n`,
    ''
  );
}

/**
 * Fetches all destinations from the destination service which match the token.
 * With a subscriber token it fetches all subscriber destinations, otherwise all provider destinations.
 * @param options - The {@link AllDestinationOptions | options} to fetch all destinations.
 * @returns A promise of an array of all destinations without authTokens from the destination service, on success.
 */
export async function getAllDestinationsFromDestinationService(
  options: AllDestinationOptions = {}
): Promise<DestinationWithoutToken[]> {
  options = {
    ...options,
    // Enable caching by default
    useCache: options.useCache ?? true
  };
  logger.debug(
    'Attempting to retrieve all destinations from destination service.'
  );
  if (shouldExchangeToken(options) && options.jwt) {
    // Exchange the IAS token to a XSUAA token using the destination service credentials
    options.jwt = await jwtBearerToken(options.jwt, 'destination');
  }

  const token =
    (await getSubscriberToken(options))?.serviceJwt ||
    (await getProviderServiceToken(options));

  const destinationServiceUri = getDestinationServiceCredentials().uri;
  const subdomain = getSubdomain(token.decoded);
  logger.debug(
    `Retrieving all destinations for account: "${subdomain}" from destination service.`
  );

  const [instance, subaccount] = await Promise.all([
    fetchDestinations(
      destinationServiceUri,
      token.encoded,
      'instance',
      options
    ),
    fetchDestinations(
      destinationServiceUri,
      token.encoded,
      'subaccount',
      options
    )
  ]);

  const loggerMessage =
    createDestinationFetchLogs('instance', instance) +
    createDestinationFetchLogs('subaccount', subaccount);

  logger.debug(loggerMessage);

  const allDestinations = [...instance, ...subaccount];

  if (allDestinations?.length) {
    logger.debug(
      `Successfully retrieved all destinations for account: "${subdomain}" from destination service.`
    );
  } else {
    logger.debug("Didn't receive any destinations from destination service.");
    return [];
  }

  const allDestinationsWithoutToken: DestinationWithoutToken[] =
    allDestinations.map(destination => {
      delete destination.authTokens;
      return destination;
    });

  return allDestinationsWithoutToken;
}
