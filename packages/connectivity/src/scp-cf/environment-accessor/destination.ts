import { JwtPayload } from '../jsonwebtoken-type';
import { DestinationServiceCredentials } from './environment-accessor-types';
import { getServiceCredentials } from './service-credentials';

/**
 * Utility function to get destination service credentials, including error handling.
 * @internal
 */
export function getDestinationServiceCredentials(
  token?: JwtPayload | string
): DestinationServiceCredentials {
  return getServiceCredentials('destination', token);
}
