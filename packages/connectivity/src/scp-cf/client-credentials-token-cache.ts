import { createLogger } from '@sap-cloud-sdk/util';
import moment from 'moment';
import { Cache } from './cache';
import { ClientCredentialsResponse } from './xsuaa-service-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'client-credentials-token-cache'
});

const ClientCredentialsTokenCache = (
  cache: Cache<ClientCredentialsResponse>
) => ({
  getToken: (url, clientId: string): ClientCredentialsResponse | undefined =>
    cache.get(getCacheKey(url, clientId)),

  cacheToken: (
    url,
    clientId: string,
    token: ClientCredentialsResponse
  ): void => {
    cache.set(
      getCacheKey(url, clientId),
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
