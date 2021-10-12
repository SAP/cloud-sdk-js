import moment from 'moment';
import { Cache } from './cache';
import {
  ClientCredentials,
  ClientCredentialsResponse
} from './xsuaa-service-types';

const ClientCredentialsTokenCache = (
  cache: Cache<ClientCredentialsResponse>
) => ({
  // TODO: this method name can be shortened
  // TODO: Remove client credentials in v2.0
  getGrantTokenFromCache: (
    url,
    credentialsOrClientId: ClientCredentials | string
  ): ClientCredentialsResponse | undefined =>
    cache.get(getGrantTokenCacheKey(url, credentialsOrClientId)),

  // TODO: this method name can be shortened
  cacheRetrievedToken: (
    url,
    credentialsOrClientId: ClientCredentials | string,
    token: ClientCredentialsResponse
  ): void => {
    cache.set(
      getGrantTokenCacheKey(url, credentialsOrClientId),
      token,
      token.expires_in
        ? moment().add(token.expires_in, 'second').unix() * 1000
        : undefined
    );
  },
  clear: (): void => {
    cache.clear();
  },
  getCacheInstance: () => cache
});

/** *
 * @internal
 * @param url - URL from where the token is fetched
 * @param credentialsOrClientId - Credentials to fetch the token
 * @returns the token
 */
export function getGrantTokenCacheKey(
  url: string,
  credentialsOrClientId: ClientCredentials | string
): string {
  const clientId =
    typeof credentialsOrClientId === 'string'
      ? credentialsOrClientId
      : credentialsOrClientId.username;
  return [url, clientId].join(':');
}

/**
 * @internal
 */
export const clientCredentialsTokenCache = ClientCredentialsTokenCache(
  new Cache<ClientCredentialsResponse>()
);
