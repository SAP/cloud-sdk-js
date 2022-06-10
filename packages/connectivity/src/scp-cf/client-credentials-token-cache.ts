import { createLogger } from '@sap-cloud-sdk/util';
import { Cache } from './cache';
import { ClientCredentialsResponse } from './xsuaa-service-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'client-credentials-token-cache'
});

const ClientCredentialsTokenCache = (
  cache: Cache<ClientCredentialsResponse>
) => ({
  getToken: async (
    url,
    clientId: string
  ): Promise<ClientCredentialsResponse | undefined> =>
    cache.get(getCacheKey(url, clientId)),

  cacheToken: async (
    url,
    clientId: string,
    token: ClientCredentialsResponse
  ): Promise<void> => {
    cache.set(getCacheKey(url, clientId), {
      entry: token,
      expires: token.expires_in
        ? Date.now() + token.expires_in * 1000
        : undefined
    });
  },
  clear: async (): Promise<void> => {
    cache.clear();
  },
  getCacheInstance: () => cache
});

/** *
 * @internal
 * @param url - URL from where the token is fetched
 * @param clientId - ClientId to fetch the token
 * @returns the token
 */
export function getCacheKey(url: string, clientId: string): string | undefined {
  if (!url) {
    logger.warn('Cannot get cache key. The url was undefined.');
    return;
  }
  if (!clientId) {
    logger.warn('Cannot get cache key. The ClientId was undefined.');
    return;
  }
  return [url, clientId].join(':');
}

/**
 * @internal
 */
export const clientCredentialsTokenCache = ClientCredentialsTokenCache(
  new Cache<ClientCredentialsResponse>()
);
