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
  getToken: (
    tenantId: string | undefined,
    clientId: string
  ): ClientCredentialsResponse | undefined =>
    cache.get(getCacheKey(tenantId, clientId)),

  cacheToken: (
    tenantId: string | undefined,
    clientId: string,
    token: ClientCredentialsResponse
  ): void => {
    cache.set(getCacheKey(tenantId, clientId), {
      entry: token,
      expires: token.expires_in
        ? Date.now() + token.expires_in * 1000
        : undefined
    });
  },
  clear: (): void => {
    cache.clear();
  },
  getCacheInstance: () => cache
});

/** *
 * @internal
 * @param tenantId - URL from where the token is fetched
 * @param clientId - ClientId to fetch the token
 * @returns the token
 */
export function getCacheKey(
  tenantId: string | undefined,
  clientId: string
): string | undefined {
  if (!tenantId) {
    logger.warn(
      'Cannot create cache key for client credentials token cache. The given tenant ID is undefined.'
    );
    return;
  }
  if (!clientId) {
    logger.warn(
      'Cannot create cache key for client credentials token cache. The given client ID is undefined.'
    );
    return;
  }
  return [tenantId, clientId].join(':');
}

/**
 * @internal
 */
export const clientCredentialsTokenCache = ClientCredentialsTokenCache(
  new Cache<ClientCredentialsResponse>(5 * 60 * 1000 /* 5 minutes in ms */)
);
