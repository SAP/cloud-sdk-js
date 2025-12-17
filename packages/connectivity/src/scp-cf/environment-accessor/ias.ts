import { IdentityService } from '@sap/xssec';
import type {
  ServiceCredentials,
  IdentityServiceCredentials
} from './environment-accessor-types';

const identityServices: Record<string, IdentityService> = {};

/**
 * @internal
 * Clears the cache of Identity services.
 * Should only be used for testing purposes.
 */
export function clearIdentityServices(): void {
  Object.keys(identityServices).forEach(key => delete identityServices[key]);
}

/**
 * @internal
 * @param credentials - Identity service credentials extracted from a service binding or re-use service. Required to create the xssec IdentityService instance.
 * @param disableCache - Value to enable or disable JWKS cache in xssec library. Defaults to false.
 * @returns An instance of {@code @sap/xssec/IdentityService} for the provided credentials.
 */
export function getIdentityServiceInstanceFromCredentials(
  credentials: ServiceCredentials,
  disableCache: boolean = false
): IdentityService {
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

  if (!identityServices[cacheKey]) {
    identityServices[cacheKey] = new IdentityService(
      credentials as IdentityServiceCredentials,
      serviceConfig
    );
  }
  return identityServices[cacheKey];
}
