import { URL } from 'url';
import { isValidUrl, removeTrailingSlashes } from '@sap-cloud-sdk/util';
import type { JwtPayload } from './jsonwebtoken-type';

/**
 * @internal
 */
export function getIssuerSubdomain(
  decodedJwt: JwtPayload | undefined,
  isIasToken: boolean = false
): string | undefined {
  // For IAS tokens, prefer ias_iss claim over standard iss claim
  const issuer =
    isIasToken && decodedJwt?.ias_iss ? decodedJwt.ias_iss : decodedJwt?.iss;

  if (issuer) {
    // Identity providers can be configured to issue tokens with a schemeless `iss` claim,
    // e.g. `tenant.accounts.ondemand.com` instead of `https://tenant.accounts.ondemand.com`.
    const issWithScheme = URL.canParse(issuer) ? issuer : `https://${issuer}`;
    if (!URL.canParse(issWithScheme)) {
      throw new Error(`Issuer URL in JWT is not a valid URL: "${issuer}".`);
    }
    return getHost(new URL(issWithScheme)).split('.')[0];
  }
}

function getHost(url: URL): string {
  const { host } = url;
  if (!host || host.indexOf('.') === -1) {
    throw new Error(`Failed to determine hostname: invalid host in "${url}".`);
  }
  return host;
}

// A single RFC 1123 DNS label: ASCII letters, digits and hyphens, not starting
// or ending with a hyphen, at most 63 characters long. Mirrors the validation
// used by the SAP Cloud SDK for Python (GHSA-4mv3-jxxm-9cx2 / CVE-2026-89111).
const tenantSubdomainRegex = /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?$/;

/**
 * @internal
 * Validates that a tenant subdomain is a single RFC 1123 DNS label before it is
 * used to build an OAuth2 token endpoint host. A crafted subdomain (e.g. one
 * containing `.`, `:` or `/`) could otherwise redirect the token request to an
 * attacker-controlled host and leak the service binding's client credentials
 * (SSRF, CWE-918).
 *
 * An `undefined` subdomain is a no-op (no subdomain is used). Any defined value
 * that is not a valid DNS label throws.
 * @param subdomain - The tenant subdomain to validate.
 * @throws If `subdomain` is defined but not a valid RFC 1123 DNS label.
 */
export function validateTenantSubdomain(subdomain: string | undefined): void {
  if (subdomain === undefined) {
    return;
  }
  if (!tenantSubdomainRegex.test(subdomain)) {
    throw new Error(
      `Invalid tenant subdomain: "${subdomain}". Expected a single RFC 1123 DNS label (ASCII letters, digits and hyphens, not starting or ending with a hyphen, at most 63 characters).`
    );
  }
}

/**
 * @internal
 * Replaces the first part of the hostname (subdomain) in a URL.
 * @param baseUrl - The URL whose subdomain should be replaced.
 * @param newSubdomain - The new subdomain to use or a falsy value to remove the subdomain.
 * @returns The URL with replaced subdomain, with trailing slash removed if present.
 */
export function replaceSubdomain(
  baseUrl: string,
  newSubdomain: string | undefined
): string {
  if (!isValidUrl(baseUrl)) {
    throw new Error(`Base URL is not a valid URL: "${baseUrl}".`);
  }

  const url = new URL(baseUrl);
  const hostParts = getHost(url).split('.');
  const subdomainReplacment = newSubdomain ? [newSubdomain] : [];
  url.hostname = [...subdomainReplacment, ...hostParts.slice(1)].join('.');

  let result = url.toString();
  // Remove trailing slash for consistency
  result = removeTrailingSlashes(result);

  return result;
}
