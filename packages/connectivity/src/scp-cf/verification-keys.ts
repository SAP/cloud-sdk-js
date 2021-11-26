import { renameKeys, ErrorWithCause } from '@sap-cloud-sdk/util';
import axios, { AxiosRequestConfig } from 'axios';
import { TokenKey } from './xsuaa-service-types';

/**
 * Fetches verification keys from the XSUAA service for the given URL.
 * @param url - URL of the XSUAA service instance.
 * @returns An array of token keys.
 * @internal
 */
export function fetchVerificationKeys(url: string): Promise<TokenKey[]> {
  if (typeof url !== 'string') {
    throw Error('No URL of the XUSAA service instance was provided');
  }

  const config: AxiosRequestConfig = {
    url,
    method: 'GET'
  };

  return axios
    .request<{ keys: Record<string, any> }>(config)
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
