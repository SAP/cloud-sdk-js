import * as xssec from '@sap/xssec';
import { first } from '@sap-cloud-sdk/util';
import { DestinationOptions } from './destination';
import { getServiceCredentialsList } from './environment-accessor';

/**
 * Make a token exchange from IAS token to XSUAA token.
 * @param options - Configuration for how to retrieve destinations from the destination service.
 * @returns Exchanged token.
 */
export async function exchangeToken(
  options: DestinationOptions
): Promise<string> {
  const xsuaaServiceCredentials = first(getServiceCredentialsList('xsuaa'));
  return new Promise((resolve: (p: string) => void, reject) => {
    xssec.createSecurityContext(
      options.userJwt,
      xsuaaServiceCredentials,
      (err: Error, context, tokenInfo) =>
        err ? reject(err) : resolve(tokenInfo.getTokenValue())
    );
  });
}

/**
 * Checks whether the IAS token to XSUAA token exchange should be applied.
 * @param options - Configuration for how to retrieve destinations from the destination service.
 * @returns A boolean value, that indicates whether the token exchange should be applied.
 */
export function isTokenExchangeEnabled(options: DestinationOptions): boolean {
  // note: the option is optional and by default we enable the token exchange.
  return options.iasToXsuaaTokenExchange !== false && !!options.userJwt;
}
