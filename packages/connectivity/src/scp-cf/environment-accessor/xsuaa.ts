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
 * @param options.disableCache - Value to enable or disable JWKS cache in xssec library. Defaults to false.
 * @param options.credentials - Xsuaa service credentials. Required to create the XSUAA instance.
 * @returns An instance of the xsuaa xssec service for the provided credentials.
 */
export function getXsuaaInstanceFromSuppliedCredentials(options: {
  disableCache?: boolean;
  credentials: ServiceCredentials;
}): any {
  const { credentials } = options;
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
    // XsuaaService is a class that extends Service from @sap/xssec and is a representation of XSUAA credentials
    // extracted either from a reuse service like for e.g destination service
    // or is a representation of a bound XSUAA service
    xsuaaServices[cacheKey] = new XsuaaService(
      credentials as XsuaaServiceCredentials,
      serviceConfig as any
    );
  }
  return xsuaaServices[cacheKey];
}
