import { URL } from 'url';
import { removeTrailingSlashes } from '@sap-cloud-sdk/util';
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
    if (!isValidUrl(issuer)) {
      throw new Error(`Issuer URL in JWT is not a valid URL: "${issuer}".`);
    }
    return getHost(new URL(issuer)).split('.')[0];
  }
}

function getHost(url: URL): string {
  const { host } = url;
  if (!host || host.indexOf('.') === -1) {
    throw new Error(`Failed to determine hostname: invalid host in "${url}".`);
  }
  return host;
}

/**
 * @internal
 * This functions returns the host part of an URL, with URL validation.
 * @param url
 * @returns host
 */
export function parseUrlAndGetHost(url: string): string {
  if (!isValidUrl(url)) {
    throw new Error(`URL is not a valid URL: "${url}".`);
  }

  const parsed = new URL(url);
  return getHost(parsed);
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

/**
 * @internal
 * Replaces the first part of the hostname (subdomain) in a URL.
 * @param baseUrl - The URL whose subdomain should be replaced.
 * @param newSubdomain - The new subdomain to use.
 * @returns The URL with replaced subdomain, with trailing slash removed if present.
 */
export function replaceSubdomain(
  baseUrl: string,
  newSubdomain: string
): string {
  if (!isValidUrl(baseUrl)) {
    throw new Error(`Base URL is not a valid URL: "${baseUrl}".`);
  }

  const url = new URL(baseUrl);
  const hostParts = getHost(url).split('.');
  url.hostname = [newSubdomain, ...hostParts.slice(1)].join('.');

  let result = url.toString();
  // Remove trailing slash for consistency
  result = removeTrailingSlashes(result);

  return result;
}

/**
 * @internal
 * Removes the first part of the hostname (subdomain) from a URL.
 * @param baseUrl - The URL whose subdomain should be removed.
 * @returns The URL without the first subdomain, with trailing slash removed if present.
 */
export function removeSubdomain(baseUrl: string): string {
  if (!isValidUrl(baseUrl)) {
    throw new Error(`Base URL is not a valid URL: "${baseUrl}".`);
  }

  const url = new URL(baseUrl);
  const hostParts = getHost(url).split('.');
  // Remove first subdomain and keep the rest
  if (hostParts.length > 2) {
    url.hostname = hostParts.slice(1).join('.');
  }

  let result = url.toString();
  // Remove trailing slash for consistency
  result = removeTrailingSlashes(result);

  return result;
}
