import { createLogger } from '@sap-cloud-sdk/util';
import {
  decodeJwt,
  getTenantId,
  userId,
  getTenantIdFromBinding,
  getDefaultTenantId
} from './jwt';
import { Cache } from './cache';
import type { ClientCredentialsResponse } from './xsuaa-service-types';
import type { IasOptions, ServiceBindingTransformOptions } from './destination';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'ias-token-cache'
});

const IasTokenCache = (cache: Cache<ClientCredentialsResponse>) => ({
  getToken: (
    clientId: string,
    options: IasOptions = {}
  ): ClientCredentialsResponse | undefined => {
    const cacheKey = getCacheKey(clientId, options);
    return cacheKey ? cache.get(cacheKey) : undefined;
  },

  cacheToken: (
    clientId: string,
    options: IasOptions = {},
    token: ClientCredentialsResponse
  ): void => {
    const cacheKey = getCacheKey(clientId, options);
    if (cacheKey) {
      cache.set(cacheKey, {
        entry: token,
        expires: token.expires_in
          ? Date.now() + token.expires_in * 1000
          : undefined
      });
    }
  },

  clear: (): void => {
    cache.clear();
  },

  getCacheInstance: () => cache
});

/**
 * Normalizes the resource parameter to a consistent string format for cache key.
 * @param resource - The resource parameter from iasOptions.
 * @returns Normalized resource string or empty string if not provided.
 * @internal
 */
function normalizeResource(resource?: IasOptions['resource']): string {
  if (!resource) {
    return '';
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

/**
 * Generates a cache key for IAS tokens based on actAs mode, user/tenant context, and resource.
 * @param clientId - The client ID from service credentials.
 * @param options - IAS options containing actAs, assertion, resource, and appTenantId.
 * @returns Cache key string or undefined if required components are missing.
 * @internal
 */
export function getCacheKey(
  clientId: string,
  options: ServiceBindingTransformOptions['iasOptions'] = {}
): string | undefined {
  const actAs = options.actAs || 'technical-user';
  const resourceStr = normalizeResource(options.resource);

  if (!clientId) {
    logger.warn(
      'Cannot create cache key for IAS token cache. The given client ID is undefined.'
    );
    return undefined;
  }

  if (actAs === 'business-user') {
    if (!options.assertion) {
      logger.warn(
        'Cannot create cache key for IAS token cache. Business-user flow requires assertion JWT.'
      );
      return undefined;
    }

    const decodedAssertion = decodeJwt(options.assertion);
    const user = userId(decodedAssertion);

    if (!user) {
      logger.warn(
        'Cannot create cache key for IAS token cache. User ID could not be extracted from assertion JWT.'
      );
      return undefined;
    }

    const assertionTenant = getTenantId(decodedAssertion);

    if (!assertionTenant) {
      logger.warn(
        'Cannot create cache key for IAS token cache. Tenant ID could not be extracted from assertion JWT.'
      );
      return undefined;
    }

    return [user, assertionTenant, clientId, resourceStr].join(':');
  }

  const tenant =
    options.appTenantId || getTenantIdFromBinding() || getDefaultTenantId();

  return [tenant, clientId, resourceStr].join(':');
}

/**
 * @internal
 */
export const iasTokenCache = IasTokenCache(
  new Cache<ClientCredentialsResponse>(5 * 60 * 1000 /* 5 minutes in ms */)
);
