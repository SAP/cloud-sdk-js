import { createLogger } from '@sap-cloud-sdk/util';
import type {
  AllDestinations,
  DestinationsByType
} from './destination-accessor-types';
import type { Destination } from './destination-service-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'destination-selection-strategies'
});

/**
 * Function to implement the selection strategy of the retrieved destination.
 * Use the built in strategies defined in [[DestinationSelectionStrategies]] or make your own function.
 */
export type DestinationSelectionStrategy = (
  allDestinations: AllDestinations,
  destinationName: string
) => Destination | null;

/**
 * Constraints the selection to provider destinations.
 * @param allDestinations - Retrieved destinations.
 * @param destinationName - Name of the destination to retrieve.
 * @returns the destination to retrieve, returns `null`, if no matched provider destination is found.
 */
export function alwaysProvider(
  allDestinations: AllDestinations,
  destinationName: string
): Destination | null {
  return findDestination(allDestinations.provider, destinationName) || null;
}

/**
 * Constraints the selection to subscriber destinations.
 * @param allDestinations - Retrieved destinations.
 * @param destinationName - Name of the destination to retrieve.
 * @returns the destination to retrieve, returns `null`, if no matched subscriber destination is found.
 */
export function alwaysSubscriber(
  allDestinations: AllDestinations,
  destinationName: string
): Destination | null {
  return findDestination(allDestinations.subscriber, destinationName) || null;
}

/**
 * Prioritizes the selection of subscriber destinations.
 * @param allDestinations - Retrieved destinations.
 * @param destinationName - Name of the destination to retrieve.
 * @returns the destination to retrieve, returns `null` if no matched destination is found.
 */
export function subscriberFirst(
  allDestinations: AllDestinations,
  destinationName: string
): Destination | null {
  return (
    findDestination(allDestinations.subscriber, destinationName) ||
    findDestination(allDestinations.provider, destinationName) ||
    null
  );
}

/**
 * Selector of destination selection strategies. See [[alwaysProvider]], [[alwaysSubscriber]] and [[subscriberFirst]] for more information available selection strategies.
 * @internal
 */
export const DestinationSelectionStrategies = {
  alwaysProvider,
  alwaysSubscriber,
  subscriberFirst
};

function findDestination(
  destinations: DestinationsByType,
  destinationName: string
): Destination | undefined {
  const isRequestedDestination = (destination: Destination) =>
    destination.name === destinationName;
  const instanceDest = destinations.instance.find(isRequestedDestination);
  const subAccountDest = destinations.subaccount.find(isRequestedDestination);

  if (instanceDest && subAccountDest) {
    logger.warn(
      `Found destinations named '${destinationName}' for both, the destination service instance and subaccount. Using instance destination.`
    );
  }
  return instanceDest || subAccountDest;
}
