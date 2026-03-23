import { decodeJwt } from '../jwt';
import type { Service } from '../environment-accessor';
import type {
  AuthenticationType,
  Destination
} from './destination-service-types';
import type { IasOptions } from './ias-types';

/**
 * Builds destination based on supplied IAS options.
 * Uses `targetUrl` as the destination URL if supplied and adds `mtlsKeyPair` if available.
 * @param accessToken - The JWT token to access the service.
 * @param service - Service binding for identity service.
 * @param iasOptions - IAS options to build the destination.
 * @returns A destination object.
 * @internal
 */
export function buildIasDestination(
  accessToken: string,
  service: Service,
  iasOptions: IasOptions
): Destination {
  const destination = buildDestination(
    accessToken,
    iasOptions?.targetUrl ?? service.credentials.url,
    service.name,
    iasOptions.authenticationType || 'OAuth2ClientCredentials'
  );

  // Add mTLS key pair if available
  if (service.credentials.certificate && service.credentials.key) {
    destination.mtlsKeyPair = {
      cert: service.credentials.certificate,
      key: service.credentials.key
    };
  }
  return destination;
}

/**
 * Builds a destination object with a token, name, and url.
 * If no authentication type is provided, 'OAuth2ClientCredentials' is used by default.
 * @internal
 * @param token - The access token for the destination.
 * @param url - The URL of the destination.
 * @param name - The name of the destination.
 * @param authentication - The authentication type for the destination. Defaults to 'OAuth2ClientCredentials'.
 * @returns A destination object.
 */
export function buildDestination(
  token: string,
  url: string,
  name: string,
  authentication: Extract<
    AuthenticationType,
    'OAuth2ClientCredentials' | 'OAuth2JWTBearer'
  > = 'OAuth2ClientCredentials'
): Destination {
  const expirationTime = decodeJwt(token).exp;
  const expiresIn = expirationTime
    ? Math.floor((expirationTime * 1000 - Date.now()) / 1000).toString(10)
    : undefined;
  return {
    url,
    name,
    authentication,
    authTokens: [
      {
        value: token,
        type: 'bearer',
        expiresIn,
        http_header: { key: 'Authorization', value: `Bearer ${token}` },
        error: null
      }
    ]
  };
}
