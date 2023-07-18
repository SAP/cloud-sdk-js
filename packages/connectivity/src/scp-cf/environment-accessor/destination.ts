import { DestinationServiceCredentials } from './environment-accessor-types';
import { getServiceCredentials } from './service-credentials';

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
