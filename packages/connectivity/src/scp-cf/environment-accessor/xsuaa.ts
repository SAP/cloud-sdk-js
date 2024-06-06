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

// FIXME: this is just a poc to check that the cache is really hanging at one instance.
// xsuaa services need to be cached per service name or similar (property in binding)
let xsuaaService;

export function getXsuaaService(
  disableCache: boolean,
  jwt?: JwtPayload | string
) {
  if (!xsuaaService) {
    const credentials = getXsuaaServiceCredentials(jwt);
    xsuaaService = new XsuaaService(credentials, {
      // when disabling set the expiration time to 0 otherwise use the default 30 mins of xssec
      validation: { jwks: { expirationTime: disableCache ? 0 : 1800000 } }
    });
  }

  return xsuaaService;
}
