import { XsuaaService } from '@sap/xssec';
import { JwtPayload } from '../jsonwebtoken-type';
import {
  ServiceCredentials,
  XsuaaServiceCredentials
} from './environment-accessor-types';
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
  if (!xsuaaServices[credentials.serviceInstanceId]) {
    const serviceConfig = {
      validation: {
        jwks: {
          expirationTime: disableCache ? 0 : 1800000,
          refreshPeriod: disableCache ? 0 : 900000
        }
      }
    };
    xsuaaServices[credentials.serviceInstanceId] = new XsuaaService(
      credentials,
      serviceConfig
    );
  }
  return xsuaaServices[credentials.serviceInstanceId];
}
