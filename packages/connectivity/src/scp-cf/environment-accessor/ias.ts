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
 * A cache for `IdentityService` instances.
 * Direct access from outside this module outside tests is discouraged.
 */
export const identityServicesCache: Map<string, IdentityService> = new Map();

/**
 * Extracts the subdomain from JWT and updates credentials if found.
 * @param credentials - Identity service credentials.
 * @param jwt - JWT string or payload to extract subdomain from.
 * @returns Updated credentials and extracted subdomain (if any).
 */
function extractSubdomainFromJwt(
  credentials: IdentityServiceCredentials,
  jwt: string | JwtPayload
): { credentials: IdentityServiceCredentials; subdomain: string | undefined } {
  const decodedJwt =
    typeof jwt === 'string' ? new IdentityServiceToken(jwt) : { payload: jwt };
  const payload = decodedJwt.payload satisfies JwtPayload;

  // For IAS tokens, prefer ias_iss claim over standard iss claim
  const subdomain = getIssuerSubdomain(payload, true);

  if (!subdomain) {
    logger.warn(
      'Could not extract subdomain from JWT assertion issuer. Falling back to service binding URL.'
    );
    return { credentials, subdomain };
  }

  // Replace subdomain in the URL from the service binding
  // Reason: We don't want to blindly trust the URL in the assertion
  const updatedCredentials = {
    ...credentials,
    url: replaceSubdomain(credentials.url, subdomain)
  };

  return { credentials: updatedCredentials, subdomain };
}

/**
 * @internal
 * @param credentials - Identity service credentials extracted from a service binding or re-use service. Required to create the xssec `IdentityService` instance.
 * @param jwt - Optional JWT string or payload to extract the issuer URL for bearer assertion flows.
 * @param disableCache - Value to enable or disable JWKS cache in the xssec library. Defaults to false.
 * @returns An instance of {@link @sap/xssec/IdentityService} for the provided credentials.
 */
export function getIdentityServiceInstanceFromCredentials(
  credentials: IdentityServiceCredentials,
  jwt?: string | JwtPayload,
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
  if (jwt) {
    const result = extractSubdomainFromJwt(credentials, jwt);
    credentials = result.credentials;
    subdomain = result.subdomain;
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
