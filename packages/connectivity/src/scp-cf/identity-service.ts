import { createSecurityContext, XsuaaService } from '@sap/xssec';
import { DestinationOptions } from './destination';
import { getXsuaaServiceCredentials } from './environment-accessor';
import { decodeJwtComplete, isXsuaaToken } from './jwt';

/**
 * @internal
 * Make a token exchange from IAS token to XSUAA token.
 * @param options - Configuration for how to retrieve destinations from the destination service.
 * @returns Exchanged token.
 */
export async function exchangeToken(
  options: DestinationOptions
): Promise<string> {
  const xsuaaServiceCredentials = getXsuaaServiceCredentials();
  const xsuaaService = new XsuaaService(xsuaaServiceCredentials);
  const { token } = await createSecurityContext(xsuaaService, {
    jwt: options.jwt
  });
  return token.getTokenValue();
}

/**
 * @internal
 * Checks whether the IAS token to XSUAA token exchange should be applied.
 * @param options - Configuration for how to retrieve destinations from the destination service.
 * @returns A boolean value, that indicates whether the token exchange should be applied.
 */
export function shouldExchangeToken(options: DestinationOptions): boolean {
  // iasToXsuaaTokenExchange is optional, token exchange is enabled by default
  return (
    options.iasToXsuaaTokenExchange !== false &&
    !!options.jwt &&
    !isXsuaaToken(decodeJwtComplete(options.jwt))
  );
}
