import { URL } from 'url';
import { JwtPayload } from './jsonwebtoken-type';

/**
 * @internal
 */
export function replaceWithIssuerSubdomain(
  xsuaaUrl: string,
  decodedJwt: JwtPayload
): string {
  const subdomain = getIssuerSubdomain(decodedJwt);
  if (!subdomain) {
    throw new Error(
      `Could not retrieve issuer subdomain from: "${decodedJwt.iss}".`
    );
  }
  if (!isValidUrl(xsuaaUrl)) {
    throw new Error(`XSUAA URL is not a valid URL: "${xsuaaUrl}".`);
  }

  const xsuaaDomain = xsuaaUrl.slice(xsuaaUrl.indexOf('.'));
  return new URL(xsuaaUrl).protocol + '//' + subdomain + xsuaaDomain;
}

/**
 * @internal
 */
export function getIssuerSubdomain(
  decodedJwt: JwtPayload | undefined
): string | undefined {
  const iss = decodedJwt?.iss;
  if (iss) {
    if (!isValidUrl(iss)) {
      throw new Error(`Issuer URL in JWT is not a valid URL: "${iss}".`);
    }
    return getHost(new URL(iss)).split('.')[0];
  }
}

function getHost(url: URL): string {
  const { host } = url;
  if (!host || host.indexOf('.') === -1) {
    throw new Error(
      `Failed to determine sub-domain: invalid host in "${url}".`
    );
  }
  return host;
}

function isValidUrl(url: string): url is string {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}
