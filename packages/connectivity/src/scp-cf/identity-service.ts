import { decodeJwt, isXsuaaToken } from './jwt';
import { resolveServiceBinding } from './environment-accessor';
import { getUserToken } from './xsuaa-service';
import type { DestinationOptions } from './destination';

/**
 * @internal
 * Make a token exchange from IAS token to XSUAA token using embedded XSUAA credentials from destination service.
 * @param jwt - The IAS JWT to exchange.
 * @returns Exchanged XSUAA token.
 */
export async function exchangeToken(jwt: string): Promise<string> {
  // Get XSUAA credentials from destination service binding
  const destinationServiceBinding = resolveServiceBinding('destination');
  return getUserToken(destinationServiceBinding, jwt);
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
