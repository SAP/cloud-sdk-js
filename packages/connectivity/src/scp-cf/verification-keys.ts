import { renameKeys, ErrorWithCause, createLogger } from '@sap-cloud-sdk/util';
import axios, { AxiosRequestConfig } from 'axios';
import { XsuaaServiceCredentials } from './environment-accessor-types';
import { TokenKey } from './xsuaa-service-types';

const logger = createLogger({
  package: 'core',
  messageContext: 'xsuaa-service'
});

/**
 * Deprecated since v1.49.0. Use `fetchVerificationKeys(url: string)` instead. Credentials are ignored.
 * Fetches verification keys from the XSUAA service for the given credentials.
 * @param xsuaaCredentials - Credentials of the XSUAA service instance.
 * @param jku - Value of the jku property in the JWT header. If not provided the old legacy URL xsuaaCredentials.url/token_keys is used as a fallback which will not work for subscriber accounts created after 14th of April 2020.
 * @returns An array of TokenKeys.
 * @internal
 */
export function fetchVerificationKeys(
  xsuaaCredentials: XsuaaServiceCredentials,
  jku?: string
): Promise<TokenKey[]>;

/**
 * Deprecated since v1.49.0. Use `fetchVerificationKeys(url: string)` instead. Credentials are ignored.
 * Fetches verification keys from the XSUAA service for the given URL, with the given pair of credentials.
 * @param url - URL of the XSUAA service instance.
 * @param clientId - Client ID of the XSUAA service instance.
 * @param clientSecret - Client secret of the XSUAA service instance.
 * @returns An array of token keys.
 * @internal
 */
export function fetchVerificationKeys(
  url: string,
  clientId: string,
  clientSecret: string
): Promise<TokenKey[]>;

/**
 * Fetches verification keys from the XSUAA service for the given URL.
 * @param url - URL of the XSUAA service instance.
 * @returns An array of token keys.
 * @internal
 */
export function fetchVerificationKeys(url: string): Promise<TokenKey[]>;

export function fetchVerificationKeys(
  xsuaaUriOrCredentials: string | XsuaaServiceCredentials,
  clientIdOrJku?: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clientSecret?: string
): Promise<TokenKey[]> {
  // The case where the XsuaaServiceCredentials are given as object
  if (typeof xsuaaUriOrCredentials !== 'string') {
    if (!clientIdOrJku) {
      logger.warn(
        'JKU field from the JWT not provided. Use xsuaaClient.url/token_keys as fallback. ' +
          'This will not work for subscriber accounts created after 14th of April 2020.' +
          'Please provide the right URL given by the field `jku` in the JWT header.'
      );
      return executeFetchVerificationKeys(
        `${xsuaaUriOrCredentials.url}/token_keys`
      );
    }

    return executeFetchVerificationKeys(clientIdOrJku);
  }
  // The three strings case
  return executeFetchVerificationKeys(xsuaaUriOrCredentials);
}

// TODO: in v2 move this implementation to `fetchVerificationKeys`
function executeFetchVerificationKeys(url: string): Promise<TokenKey[]> {
  const config: AxiosRequestConfig = {
    url,
    method: 'GET'
  };

  return axios
    .request<Record<string, any>>(config)
    .then(resp => resp.data.keys.map(k => renameKeys(tokenKeyKeyMapping, k)))
    .catch(error => {
      throw new ErrorWithCause(
        `Failed to fetch verification keys from XSUAA service instance "${url}".`,
        error
      );
    });
}

const tokenKeyKeyMapping: { [key: string]: keyof TokenKey } = {
  kty: 'keyType',
  e: 'publicKeyExponent',
  use: 'use',
  kid: 'keyId',
  alg: 'algorithm',
  value: 'value',
  n: 'publicKeyModulus'
};
