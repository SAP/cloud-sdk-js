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

  getTokenIas: (
    data: IasClientCredentialsCacheKeyData
  ): ClientCredentialsResponse | undefined => cache.get(getIasCacheKey(data)),

  cacheIasToken: (
    data: IasClientCredentialsCacheKeyData,
    tokenResponse: ClientCredentialsResponse
  ): void => {
    cache.set(getIasCacheKey(data), {
      entry: tokenResponse,
      expires: tokenResponse.expires_in
        ? Date.now() + tokenResponse.expires_in * 1000
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
function normalizeResource(
  resource?: IasResource
): [] | [string] | [string, string] {
  if (!resource) {
    return [];
  }
  if ('name' in resource) {
    return [`name=${resource.name}`];
  }

  const normalized: [string] | [string, string] = [
    `provider-clientId=${resource.providerClientId}`
  ];
  if (resource.providerTenantId) {
    normalized.push(`provider-tenantId=${resource.providerTenantId}`);
  }
  return normalized;
}

/** *
 * @internal
 * @param tenantId - The ID of the tenant to cache the token for.
 * @param clientId - ClientId to fetch the token.
 * @returns The cache key.
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
 * An interface for data the is used for IAS client credentials cache keys
 * @internal
 */
interface IasClientCredentialsCacheKeyData {
  /**
   * The hostname of the IAS instance.
   * @example tenant.accounts400.ondemand.com
   */
  iasInstance: string;
  /**
   * The client credentials client ID.
   */
  clientId: string;
  /**
   * The BTP instanced ID supplied with the token request.
   */
  appTid?: string | undefined;
  resource?: IasResource | undefined;
}

/** *
 * @internal
 * @param data.iasInstance - The IAS instance (tenant) hostname the token is fetched from.
 * @param data.appTid - The BTP instance (tenant) id (App-Tid)
 * @param data.clientId - ClientId to fetch the token.
 * @param data.resource - The App-To-App resource the token is scoped for.
 * @returns The cache key.
 */
export function getIasCacheKey(
  data: IasClientCredentialsCacheKeyData
): string | undefined {
  const { iasInstance, appTid, clientId, resource } = data;
  if (!iasInstance) {
    logger.warn(
      'Cannot create cache key for client credentials token cache. The given IAS instance hostname is undefined.'
    );
    return;
  }

  if (!clientId) {
    logger.warn(
      'Cannot create cache key for client credentials token cache. The given client ID is undefined.'
    );
    return;
  }

  const output = [
    iasInstance,
    appTid || '',
    clientId,
    ...normalizeResource(resource)
  ];

  return output.join(':');
}

/**
 * @internal
 */
export const clientCredentialsTokenCache = ClientCredentialsTokenCache(
  new Cache<ClientCredentialsResponse>(5 * 60 * 1000 /* 5 minutes in ms */)
);
