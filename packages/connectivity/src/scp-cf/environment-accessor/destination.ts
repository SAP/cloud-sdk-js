import { getServiceCredentials } from './service-credentials';
import type { DestinationServiceCredentials } from './environment-accessor-types';

/**
 * Utility function to get destination service credentials, including error handling.
 * @internal
 */
export function getDestinationServiceCredentials(): DestinationServiceCredentials {
  const credentials =
    getServiceCredentials<DestinationServiceCredentials>('destination');
  if (!credentials) {
    throw new Error('Could not find binding to the destination service.');
  }
  return credentials;
}
