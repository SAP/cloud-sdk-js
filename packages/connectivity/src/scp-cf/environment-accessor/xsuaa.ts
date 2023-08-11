import { JwtPayload } from '../jsonwebtoken-type';
import { XsuaaServiceCredentials } from './environment-accessor-types';
import { getServiceCredentials } from './service-credentials';

/**
 * @internal
 * Takes a decoded JWT and uses the client_id and audience claims to determine the XSUAA service instance
 * that issued the JWT. Returns the credentials if a match is found, otherwise throws an error.
 * If no decoded JWT is specified, then returns the first existing XSUAA credential service plan "application".
 * @param token - Either an encoded or decoded JWT.
 * @returns The credentials for a match, otherwise `null`.
 */
export function getXsuaaServiceCredentials(
  token?: JwtPayload | string
): XsuaaServiceCredentials {
  const credentials = getServiceCredentials<XsuaaServiceCredentials>(
    'xsuaa',
    token
  );
  if (!credentials) {
    throw new Error(token ? 'Could not find a XSUAA service binding matching the token.' : 'Could not find a XSUAA service binding.');
  }
  return credentials;
}
