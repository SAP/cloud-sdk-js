import moment from 'moment';
import { Cache } from './cache';
import { headerForClientCredentials } from './xsuaa-service';
import {
  ClientCredentials,
  ClientCredentialsResponse
} from './xsuaa-service-types';

const ClientCredentialsTokenCache = (
  cache: Cache<ClientCredentialsResponse>
) => ({
  // TODO: this method name can be shortened
  getGrantTokenFromCache: (
    url,
    credentials: ClientCredentials
  ): ClientCredentialsResponse | undefined =>
    cache.get(getGrantTokenCacheKey(url, credentials)),

  // TODO: this method name can be shortened
  cacheRetrievedToken: (
    url,
    credentials: ClientCredentials,
    token: ClientCredentialsResponse
  ): void => {
    cache.set(
      getGrantTokenCacheKey(url, credentials),
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

export function getGrantTokenCacheKey(
  url: string,
  credentials: ClientCredentials
): string {
  return [url, headerForClientCredentials(credentials).substring(6)].join(':');
}

export const clientCredentialsTokenCache = ClientCredentialsTokenCache(
  new Cache<ClientCredentialsResponse>()
);
