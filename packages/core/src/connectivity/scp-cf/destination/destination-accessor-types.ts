import { Destination } from './destination-service-types';
import { DestinationSelectionStrategy } from './destination-selection-strategies';

/**
 * @hidden
 */
export interface AllDestinations {
  subscriber: DestinationsByType;
  provider: DestinationsByType;
}

/**
 * @hidden
 */
export interface DestinationsByType {
  instance: Destination[];
  subaccount: Destination[];
}

export interface DestinationAccessorOptions {
  /**
   * Method that implements the selection strategy of the retrieved destination. Uses [[subscriberFirst]] per default. Use the selector helper [[DestinationSelectionStrategies]] to select the appropriate selection strategy.
   */
  selectionStrategy?: DestinationSelectionStrategy;

  /**
   * The user token of the current request.
   */
  userJwt?: string;

  /**
   * @hidden
   */
  iss?: string;
  // FIXME This is used to put a subscriber domain in without having a JWT like for background processes.
  // We will create a seperate method for this on the destination accessor wit proper JS doc. This will be deprecated.
}
