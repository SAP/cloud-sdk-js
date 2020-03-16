/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
/* eslint-disable valid-jsdoc */

import { URL } from 'url';

/**
 * @hidden
 */
export function replaceSubdomain(issuerUrl: string, xsuaaUrl: string): string {
  if (!isValidURL(issuerUrl)) {
    throw new Error('Jwt issuer url is not valid "' + issuerUrl + '".');
  }
  if (!isValidURL(xsuaaUrl)) {
    throw new Error('Xsuaa url is not valid "' + xsuaaUrl + '".');
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

function parseSubdomain(stringUrl: string): string {
  const url = new URL(stringUrl);
  const host = url.host;
  if (!host || host.indexOf('.') === -1) {
    throw new Error('Failed to determine sub-domain: invalid host in "' + stringUrl + '".');
  }
  return host.split('.')[0];
}

function isValidURL(url: string): boolean {
  try {
    const valid = new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}
