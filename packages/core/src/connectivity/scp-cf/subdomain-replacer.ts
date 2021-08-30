/* eslint-disable valid-jsdoc */

import { URL } from 'url';

/**
 * @hidden
 */
export function replaceSubdomain(issuerUrl: string, xsuaaUrl: string): string {
  if (!isValidURL(issuerUrl)) {
    throw new Error('JWT issuer URL is not valid "' + issuerUrl + '".');
  }
  if (!isValidURL(xsuaaUrl)) {
    throw new Error('XSUAA URL is not valid "' + xsuaaUrl + '".');
  }
  const subdomain = parseSubdomain(issuerUrl);
  return replace(xsuaaUrl, subdomain);
}

function replace(xsuaaUrl: string, subdomain: string): string {
  const parsedXsuaaUrl = new URL(xsuaaUrl);
  const scheme = parsedXsuaaUrl.protocol + '//';
  const xsuaaDomain = xsuaaUrl.slice(xsuaaUrl.indexOf('.'));
  return scheme + subdomain + xsuaaDomain;
}

/**
 * @hidden
 */
export function parseSubdomain(issuerUrl: string): string {
  const url = new URL(issuerUrl);
  const host = url.host;
  if (!host || host.indexOf('.') === -1) {
    throw new Error(
      'Failed to determine sub-domain: invalid host in "' + issuerUrl + '".'
    );
  }
  return host.split('.')[0];
}

function isValidURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}
