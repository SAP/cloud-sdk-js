import { XsuaaService } from '@sap/xssec';
import { getServiceCredentials } from './service-credentials';
import type { JwtPayload } from '../jsonwebtoken-type';
import type {
  ServiceCredentials,
  XsuaaServiceCredentials
} from './environment-accessor-types';

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
 * Clears the cache of XSUAA services.
 * Should only be used for testing purposes.
 */
export function clearXsuaaServices(): void {
  Object.keys(xsuaaServices).forEach(key => delete xsuaaServices[key]);
}

/**
 * @internal
 * @param credentials - Xsuaa credentials extracted from a re-use service like destination service. Required to create the xssec XSUAA instance.
 * @param disableCache - Value to enable or disable JWKS cache in xssec library. Defaults to false.
 * @returns An instance of {@code @sap/xssec/XsuaaService} for the provided credentials.
 */
export function getXsuaaInstanceFromServiceCredentials(
  credentials: ServiceCredentials,
  disableCache = false
): any {
  const serviceConfig = disableCache
    ? {
        validation: {
          jwks: {
            expirationTime: 0,
            refreshPeriod: 0
          }
        }
      }
    : undefined;

  const cacheKey = `${credentials.clientid}:${disableCache}`;

  if (!xsuaaServices[cacheKey]) {
    // XsuaaService is a class that extends Service from @sap/xssec and is a representation of XSUAA credentials
    // extracted from a reuse service like for e.g destination service
    xsuaaServices[cacheKey] = new XsuaaService(
      credentials as XsuaaServiceCredentials,
      serviceConfig as any
    );
  }
  return xsuaaServices[cacheKey];
}
