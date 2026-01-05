import { IdentityService, IdentityServiceToken } from '@sap/xssec';
import { createLogger } from '@sap-cloud-sdk/util';
import { getIssuerSubdomain, replaceSubdomain } from '../subdomain-replacer';
import type { IdentityServiceCredentials } from './environment-accessor-types';
import type { JwtPayload } from '../jsonwebtoken-type';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'ias'
});

/**
 * @internal
 * A cache for IdentityService instances.
 * Should only be used for testing purposes.
 */
export const identityServicesCache: Map<string, IdentityService> = new Map();

/**
 * @internal
 * @param credentials - Identity service credentials extracted from a service binding or re-use service. Required to create the xssec `IdentityService` instance.
 * @param assertion - Optional JWT assertion to extract the issuer URL for bearer assertion flows.
 * @param disableCache - Value to enable or disable JWKS cache in the xssec library. Defaults to false.
 * @returns An instance of {@link @sap/xssec/IdentityService} for the provided credentials.
 */
export function getIdentityServiceInstanceFromCredentials(
  credentials: IdentityServiceCredentials,
  assertion?: string,
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

  let subdomain: string | undefined;
  if (assertion) {
    // Use `IdentityServiceToken` to take advantage of xssec JWT-decoding cache
    const decodedJwt = new IdentityServiceToken(assertion);
    const payload = decodedJwt.payload satisfies JwtPayload;
    // For IAS tokens, prefer ias_iss claim over standard iss claim
    subdomain = getIssuerSubdomain(payload, true);
    if (subdomain) {
      // Replace subdomain in the URL from the service binding
      // Reason: We don't want to blindly trust the URL in the assertion
      credentials = {
        ...credentials,
        url: replaceSubdomain(credentials.url, subdomain)
      };
    } else {
      logger.warn(
        'Could not extract subdomain from JWT assertion issuer. Falling back to service binding URL.'
      );
    }
  }

  subdomain = subdomain ?? getIssuerSubdomain({ iss: credentials.url });

  const cacheKey = `${credentials.clientid}:${subdomain}:${disableCache}`;
  // TODO: Use Map.prototype.getOrInsertComputed() when available
  let identityService = identityServicesCache.get(cacheKey);
  if (identityService === undefined) {
    identityService = new IdentityService(credentials, serviceConfig);
    identityServicesCache.set(cacheKey, identityService);
  }
  return identityService;
}
