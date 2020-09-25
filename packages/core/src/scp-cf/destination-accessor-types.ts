import { Destination } from './destination-service-types';

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
