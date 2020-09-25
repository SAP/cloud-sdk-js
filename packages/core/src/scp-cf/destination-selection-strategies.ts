import { AllDestinations } from './destination-accessor-types';
import { Destination } from './destination-service-types';

export type DestinationSelectionStrategy = (
  allDestinations: AllDestinations,
  destinationName: string
) => Destination | null;

/**
 * Constraints the selection to provider destinations.
 *
 * @param allDestinations - Retrieved destinations
 * @param destinationName - Name of the destination to retrieve
 * @returns the destination to retrieve, returns null if no matched provider destination is found
 */
export function alwaysProvider(
  allDestinations: AllDestinations,
  destinationName: string
): Destination | null {
  const isRequestedDestination = (destination: Destination) =>
    destination.name === destinationName;

  return (
    allDestinations.provider.instance.find(isRequestedDestination) ||
    allDestinations.provider.subaccount.find(isRequestedDestination) ||
    null
  );
}

/**
 * Constraints the selection to subscriber destinations.
 *
 * @param allDestinations - Retrieved destinations
 * @param destinationName - Name of the destination to retrieve
 * @returns the destination to retrieve, returns null if no matched subscriber destination is found
 */
export function alwaysSubscriber(
  allDestinations: AllDestinations,
  destinationName: string
): Destination | null {
  const isRequestedDestination = (destination: Destination) =>
    destination.name === destinationName;

  return (
    allDestinations.subscriber.instance.find(isRequestedDestination) ||
    allDestinations.subscriber.subaccount.find(isRequestedDestination) ||
    null
  );
}

/**
 * Prioritizes the selection of subscriber destinations.
 *
 * @param allDestinations - Retrieved destinations
 * @param destinationName - Name of the destination to retrieve
 * @returns the destination to retrieve, returns null if no matched destination is found
 */
export function subscriberFirst(
  allDestinations: AllDestinations,
  destinationName: string
): Destination | null {
  const isRequestedDestination = (destination: Destination) =>
    destination.name === destinationName;

  return (
    allDestinations.subscriber.instance.find(isRequestedDestination) ||
    allDestinations.subscriber.subaccount.find(isRequestedDestination) ||
    allDestinations.provider.instance.find(isRequestedDestination) ||
    allDestinations.provider.subaccount.find(isRequestedDestination) ||
    null
  );
}

/**
 * Selector of destination selection strategies. See [[alwaysProvider]], [[alwaysSubscriber]] and [[subscriberFirst]] for more information available selection strategies.
 */
export const DestinationSelectionStrategies = {
  alwaysProvider,
  alwaysSubscriber,
  subscriberFirst
};
