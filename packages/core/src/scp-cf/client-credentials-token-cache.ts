/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Cache } from './cache';
import { headerForClientCredentials } from './xsuaa-service';
import { ClientCredentials, ClientCredentialsResponse } from './xsuaa-service-types';

const ClientCredentialsTokenCache = (cache: Cache<ClientCredentialsResponse>) => ({
  // TODO: this method name can be shortened
  getGrantTokenFromCache: (url, credentials: ClientCredentials): ClientCredentialsResponse | undefined => {
    return cache.get(getGrantTokenCacheKey(url, credentials));
  },
  // TODO: this method name can be shortened
  cacheRetrievedToken: (url, credentials: ClientCredentials, token: ClientCredentialsResponse): void => {
    cache.set(getGrantTokenCacheKey(url, credentials), token, token.expires_in);
  },
  clear: (): void => {
    cache.clear();
  },
  getCacheInstance: () => {
    return cache;
  }
});

export function getGrantTokenCacheKey(url: string, credentials: ClientCredentials): string {
  return [url, headerForClientCredentials(credentials).substring(6)].join(':');
}

export const clientCredentialsTokenCache = ClientCredentialsTokenCache(new Cache<ClientCredentialsResponse>());
