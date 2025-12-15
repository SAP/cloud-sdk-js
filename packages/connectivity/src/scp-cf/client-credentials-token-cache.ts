import { createLogger } from '@sap-cloud-sdk/util';
import { Cache } from './cache';
import type { ClientCredentialsResponse } from './xsuaa-service-types';
import type { IasResource } from './destination';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'client-credentials-token-cache'
});

const ClientCredentialsTokenCache = (
  cache: Cache<ClientCredentialsResponse>
) => ({
  getToken: (
    tenantId: string | undefined,
    clientId: string,
    resource?: IasResource
  ): ClientCredentialsResponse | undefined =>
    cache.get(getCacheKey(tenantId, clientId, resource)),

  cacheToken: (
    tenantId: string | undefined,
    clientId: string,
    resource: IasResource | undefined,
    token: ClientCredentialsResponse
  ): void => {
    cache.set(getCacheKey(tenantId, clientId, resource), {
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

/**
 * Normalizes the IAS resource parameter to a consistent string format for cache key.
 * @param resource - The resource parameter from iasOptions.
 * @returns Normalized resource string or empty string if not provided.
 * @internal
 */
function normalizeResource(resource?: IasResource): string | undefined {
  if (!resource) {
    return undefined;
  }

  if ('name' in resource) {
    return `name=${resource.name}`;
  }

  let normalized = `clientid=${resource.clientId}`;
  if (resource.tenantId) {
    normalized += `:tenantid=${resource.tenantId}`;
  }
  return normalized;
}

/** *
 * @internal
 * @param tenantId - The ID of the tenant to cache the token for.
 * @param clientId - ClientId to fetch the token.
 * @param resource - Optional resource parameter (for IAS app2app scenarios).
 * @returns The cache key.
 */
export function getCacheKey(
  tenantId: string | undefined,
  clientId: string,
  resource?: IasResource
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
  const parts = [tenantId, clientId];
  const resourceStr = normalizeResource(resource);
  if (resourceStr) {
    parts.push(resourceStr);
  }
  return parts.join(':');
}

/**
 * @internal
 */
export const clientCredentialsTokenCache = ClientCredentialsTokenCache(
  new Cache<ClientCredentialsResponse>(5 * 60 * 1000 /* 5 minutes in ms */)
);
