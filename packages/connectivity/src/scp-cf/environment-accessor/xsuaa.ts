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
 * @param options - Options on how to configure the XSUAA service.
 * @param options.disableCache - Value to enable or disable JWKS cache in xssec library. Defaults to false.
 * @param options.jwt - Either a JWT payload or an encoded JWT. Will be ignored if `credentials` are provided. If not provided, the first XSUAA service binding is used.
 * @param options.credentials - Xsuaa service credentials. If not provided, the credentials are fetched based on the JWT
 * @returns An instance of the xsuaa service that the application is bound to.
 */
export function getXsuaaService(options?: {
  disableCache?: boolean;
  jwt?: JwtPayload | string;
  credentials?: ServiceCredentials;
}): any {
  const credentials =
    options?.credentials || getXsuaaServiceCredentials(options?.jwt);
  const disableCache = !!options?.disableCache;

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
    xsuaaServices[cacheKey] = new XsuaaService(
      credentials as XsuaaServiceCredentials,
      serviceConfig as any
    );
  }
  return xsuaaServices[cacheKey];
}
