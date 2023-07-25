import { createLogger } from '@sap-cloud-sdk/util';
import { decodeJwt } from '../jwt';
import { Destination, DestinationAuthToken } from './destination-service-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'forward-auth-token'
});

/**
 * Transform a token to the format given by the destination service.
 * @param token - Token to transform.
 * @returns The transformed token.
 */
function buildDestinationAuthToken(
  token?: string
): [DestinationAuthToken] | undefined {
  if (token) {
    const decoded = decodeJwt(token);
    logger.debug(
      "Option 'forwardAuthToken' enabled on destination. Using the given token for the destination."
    );
    return [
      {
        value: token,
        expiresIn: decoded.exp?.toString(),
        error: null,
        http_header: { key: 'Authorization', value: `Bearer ${token}` },
        type: 'Bearer'
      }
    ];
  }
  logger.warn(
    "Option 'forwardAuthToken' was set on destination but no token was provided to forward. This is most likely unintended and will lead to an authorization error on request execution."
  );
}

/**
 * @internal
 * Set forwarded auth token, if needed.
 * @param destination - Destination to set the token on, if needed.
 * @param token - Token to forward, if needed.
 */
export function setForwardedAuthTokenIfNeeded(
  destination: Destination,
  token?: string
): Destination {
  if (destination.forwardAuthToken) {
    destination.authTokens = buildDestinationAuthToken(token);
  }
  return destination;
}
