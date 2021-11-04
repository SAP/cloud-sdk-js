import { sanitizeDestination } from './destination';
import { Destination } from './destination-service-types';
import { searchEnvVariablesForDestination } from './destination-from-env';
import { searchServiceBindingForDestination } from './destination-from-vcap';
import { getDestinationFromDestinationService } from './destination-from-service';
import {
  DestinationFetchOptions,
  isDestinationFetchOptions
} from './destination-accessor-types';

/**
 * Returns the parameter if it is a destination, calls [[getDestination]] otherwise (which will try to fetch the destination
 * from the Cloud Foundry destination service).
 *
 * Fetching a destination requires:
 * - a binding to exactly one XSUAA service instance with service plan "application"
 * - a binding to a destination service instance
 *
 * If either of the prerequisites is not met or one of the services returns an error, this function will either throw an error or return a promise that rejects.
 * @param destination - A destination or the necessary parameters to fetch one.
 * @returns A promise resolving to the requested destination on success.
 */
export async function useOrFetchDestination(
  destination: Destination | DestinationFetchOptions
): Promise<Destination | null> {
  return isDestinationFetchOptions(destination)
    ? getDestination(destination)
    : sanitizeDestination(destination);
}

/**
 * Builds a destination from one of three sources (in the given order):
 * - from the environment variable "destinations"
 * - from service bindings
 * - from the destination service
 *
 * If you want to get a destination only from a specific source, use the corresponding function directly
 *  (`getDestinationFromEnvByName`, `destinationForServiceBinding`, `getDestinationFromDestinationService`).
 * @param destinationFetchOptions - The DestinationFetchOptions to retrieve the destination.
 * @returns A promise returning the requested destination on success.
 * @internal
 */
export async function getDestination(
  destinationFetchOptions: DestinationFetchOptions
): Promise<Destination | null> {
  destinationFetchOptions = destinationFetchOptions.jwt
    ? { userJwt: destinationFetchOptions.jwt, ...destinationFetchOptions }
    : destinationFetchOptions;
  return (
    searchEnvVariablesForDestination(
      destinationFetchOptions.destinationName,
      destinationFetchOptions
    ) ||
    searchServiceBindingForDestination(
      destinationFetchOptions.destinationName
    ) ||
    getDestinationFromDestinationService(
      destinationFetchOptions.destinationName,
      destinationFetchOptions
    )
  );
}
