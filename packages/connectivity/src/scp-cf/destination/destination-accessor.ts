import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import { DestinationServiceCredentials } from '../environment-accessor-types';
import { getDestinationServiceCredentialsList } from '../environment-accessor';
import { exchangeToken, isTokenExchangeEnabled } from '../identity-service';
import {
  DestinationOrFetchOptions,
  sanitizeDestination,
  toDestinationNameUrl
} from './destination';
import { Destination } from './destination-service-types';
import { searchEnvVariablesForDestination } from './destination-from-env';
import {
  DestinationForServiceBindingOptions,
  searchServiceBindingForDestination
} from './destination-from-vcap';
import {
  getDestinationFromDestinationService,
  DestinationFromServiceRetriever
} from './destination-from-service';
import {
  DestinationFetchOptions,
  isDestinationFetchOptions,
  AllDestinationOptions,
  DestinationWithoutToken
} from './destination-accessor-types';
import { searchRegisteredDestination } from './destination-from-registration';
import {
  fetchInstanceDestinations,
  fetchSubaccountDestinations
} from './destination-service';

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
 * (`getDestinationFromEnvByName`, `destinationForServiceBinding`, `getDestinationFromDestinationService`).
 * @param options - The options to retrieve the destination.
 * @returns A promise returning the requested destination on success.
 */
export async function getDestination(
  options: DestinationFetchOptions & DestinationForServiceBindingOptions
): Promise<Destination | null> {
  const destination =
    searchEnvVariablesForDestination(options) ||
    (await searchRegisteredDestination(options)) ||
    (await searchServiceBindingForDestination(options)) ||
    (await getDestinationFromDestinationService(options));
  return destination;
}

/**
 * Utility function to get destination service credentails, including error handling.
 * @internal
 */
export function getDestinationServiceCredentials(): DestinationServiceCredentials {
  const credentials = getDestinationServiceCredentialsList();
  if (!credentials || credentials.length === 0) {
    throw Error(
      'No binding to a destination service instance found. Please bind a destination service instance to your application.'
    );
  }
  if (credentials.length > 1) {
    logger.warn(
      'Found more than one destination service instance. Using the first one.'
    );
  }

  return credentials[0];
}

/**
 * Fetches all destinations from the destination service which match the token.
 * With a subscriber token it fetches all subscriber destinations, otherwise all provider destinations.
 * @param options - The {@link AllDestinationOptions | options} to fetch all destinations.
 * @returns A promise of an array of all destinations without authTokens from the destination service on success.
 */
export async function getAllDestinationsFromDestinationService(
  options: AllDestinationOptions
): Promise<DestinationWithoutToken[] | null> {
  logger.debug(
    'Attempting to retrieve all destinations from destination service.'
  );
  if (isTokenExchangeEnabled(options)) {
    options.jwt = await exchangeToken(options);
  }

  const token =
    (await DestinationFromServiceRetriever.getSubscriberToken(options))
      ?.serviceJwt ||
    (await DestinationFromServiceRetriever.getProviderServiceToken(options));

  const destinationServiceUri = getDestinationServiceCredentials().uri;
  logger.debug(
    `Retrieving all destinations for account: "${
      new URL(token.decoded.iss!).hostname
    }" from destination service.`
  );

  const [instance, subaccount] = await Promise.all([
    fetchInstanceDestinations(destinationServiceUri, token.encoded, options),
    fetchSubaccountDestinations(destinationServiceUri, token.encoded, options)
  ]);

  let loggerMessage = '';
  instance.map(
    destination =>
      (loggerMessage += `Retrieving instance destination: ${destination.name}.\n`)
  );
  subaccount.map(
    destination =>
      (loggerMessage += `Retrieving subaccount destination: ${destination.name}.\n`)
  );
  logger.debug(loggerMessage);

  const allDestinations = instance.concat(subaccount);

  if (allDestinations) {
    logger.debug(
      `Successfully retrieved all destinations for account: "${
        new URL(token.decoded.iss!).hostname
      }" from destination service.`
    );
  }
  if (!allDestinations) {
    logger.debug('Could not retrieve destinations from destination service.');
  }

  if (!allDestinations) {
    return null;
  }

  return allDestinations;
}
