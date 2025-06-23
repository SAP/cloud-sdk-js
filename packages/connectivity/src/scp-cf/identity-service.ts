import { decodeJwt, isXsuaaToken } from './jwt';
import { jwtBearerToken } from './token-accessor';
import type { DestinationOptions } from './destination';

/**
 * @internal
 * Make a token exchange from IAS token to XSUAA token using credentials from destination service.
 * @param jwt - The IAS JWT to exchange.
 * @param service - The service used for the token exchange.
 * @returns Exchanged XSUAA token.
 */
export async function exchangeToken(
  jwt: string,
  service: string
): Promise<string> {
  return jwtBearerToken(jwt, service);
}

/**
 * @internal
 * Checks whether the IAS token to XSUAA token exchange should be applied.
 * @param options - Configuration for how to retrieve destinations from the destination service.
 * @returns A boolean value, that indicates whether the token exchange should be applied.
 */
export function shouldExchangeToken(options: DestinationOptions): boolean {
  // iasToXsuaaTokenExchange is optional, token exchange is disabled by default
  return (
    options.iasToXsuaaTokenExchange === true &&
    !!options.jwt &&
    !isXsuaaToken(decodeJwt(options.jwt))
  );
}
