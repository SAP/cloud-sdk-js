import { XsuaaService } from '@sap/xssec';
import type {
  ServiceCredentials,
  XsuaaServiceCredentials
} from './environment-accessor-types';

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
  disableCache: boolean = false
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
    // XsuaaService is a representation of XSUAA credentials extracted from a reuse service, e.g., destination
    xsuaaServices[cacheKey] = new XsuaaService(
      credentials as XsuaaServiceCredentials,
      serviceConfig as any
    );
  }
  return xsuaaServices[cacheKey];
}
