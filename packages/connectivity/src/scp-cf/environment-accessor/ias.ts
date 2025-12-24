import { IdentityService, IdentityServiceToken } from '@sap/xssec';
import { ErrorWithCause } from '@sap-cloud-sdk/util';
import type { IdentityServiceCredentials } from './environment-accessor-types';

const identityServices: Record<string, IdentityService> = {};

/**
 * @internal
 * Clears the cache of Identity services.
 * Should only be used for testing purposes.
 */
export function clearIdentityServices(): void {
  Object.keys(identityServices).forEach(key => delete identityServices[key]);
}

function tryParseUrl(url: string, name: string): URL {
  try {
    return new URL(url);
  } catch (err) {
    throw new ErrorWithCause(`Could not parse ${name} URL: ${url}`, err);
  }
}

/**
 * @internal
 * @param credentials - Identity service credentials extracted from a service binding or re-use service. Required to create the xssec IdentityService instance.
 * @param assertion - Optional JWT assertion to extract the issuer URL for bearer assertion flows.
 * @param disableCache - Value to enable or disable JWKS cache in xssec library. Defaults to false.
 * @returns An instance of {@code @sap/xssec/IdentityService} for the provided credentials.
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
    const decodedJwt = new IdentityServiceToken(assertion);
    const issuer = decodedJwt.issuer;
    const issuerUrl = tryParseUrl(issuer, 'JWT assertion issuer');
    subdomain = issuerUrl.hostname.split('.')[0];
    // Replace subdomain in the URL from the service binding
    // Reason: We don't want to blindly trust the URL in the assertion
    const credentialsUrl = tryParseUrl(credentials.url, 'Identity Service');
    const credentialsSplit = credentialsUrl.hostname.split('.');
    credentialsUrl.hostname = [subdomain, ...credentialsSplit.slice(1)].join(
      '.'
    );
    let normalizedUrl = credentialsUrl.toString();
    if (normalizedUrl.endsWith('/')) {
      normalizedUrl = normalizedUrl.slice(0, -1);
    }
    credentials = {
      ...credentials,
      url: normalizedUrl
    };
  }

  subdomain =
    subdomain ??
    tryParseUrl(credentials.url, 'Identity Service').hostname.split('.')[0];

  const cacheKey = `${credentials.clientid}:${subdomain}:${disableCache}`;
  if (!identityServices[cacheKey]) {
    identityServices[cacheKey] = new IdentityService(
      credentials,
      serviceConfig
    );
  }
  return identityServices[cacheKey];
}
