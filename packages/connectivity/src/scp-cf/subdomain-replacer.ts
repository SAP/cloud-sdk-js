import { URL } from 'url';
import type { JwtPayload } from './jsonwebtoken-type';

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

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
