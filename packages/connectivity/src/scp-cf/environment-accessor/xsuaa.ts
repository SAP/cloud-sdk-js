import { XsuaaService } from '@sap/xssec';
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
    throw new Error(
      token
        ? 'Could not find XSUAA service binding matching the token.'
        : 'Could not find XSUAA service binding.'
    );
  }
  return credentials;
}

const xsuaaServices: Record<string, XsuaaService> = {};

/**
 * @internal
 * @param disableCache - Value to enable or disable JWKS cache in xssec library.
 * @param token - Either a JWT payload or an encoded JWT.
 * @returns An instance of the xsuaa service that the application is bound to.
 */
export function getXsuaaService(
  disableCache: boolean,
  jwt?: JwtPayload | string
): XsuaaService {
  const credentials = getXsuaaServiceCredentials(jwt);
  if (!xsuaaServices[credentials.serviceInstanceId]) {
    xsuaaServices[credentials.serviceInstanceId] = new XsuaaService(
      credentials,
      {
        // when disabling set the expiration time to 0 otherwise use the default 30 mins of xssec
        validation: {
          jwks: {
            expirationTime: disableCache ? 0 : 1800000,
            refreshPeriod: disableCache ? 0 : 900000
          }
        }
      }
    );
  }
  return xsuaaServices[credentials.serviceInstanceId];
}
