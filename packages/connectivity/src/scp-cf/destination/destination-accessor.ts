import { ErrorWithCause } from '@sap-cloud-sdk/util';
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
import { getDestinationFromDestinationService } from './destination-from-service';
import {
  DestinationFetchOptions,
  isDestinationFetchOptions
} from './destination-accessor-types';
import { searchRegisteredDestination } from './destination-from-registration';

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
