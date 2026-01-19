import { createLogger } from '@sap-cloud-sdk/util';
import {
  clientCredentialsTokenCache,
  getCacheKeyIas
} from './client-credentials-token-cache';

const oneHourInSeconds = 60 * 60;

describe('ClientCredentialsTokenCache', () => {
  it('should return token if a valid token is cached', () => {
    jest.useFakeTimers();

    const validToken = {
      access_token: '1234567890',
      token_type: 'UserToken',
      expires_in: oneHourInSeconds * 3,
      jti: '',
      scope: ''
    };

    clientCredentialsTokenCache.cacheToken(
      'subscriber-tenant',
      'clientid',
      validToken
    );

    jest.advanceTimersByTime(oneHourInSeconds * 2 * 1000);

    const valid = clientCredentialsTokenCache.getToken(
      'subscriber-tenant',
      'clientid'
    );

    expect(valid).toEqual(validToken);
  });

  it('should return undefined if expired token is cached', () => {
    jest.useFakeTimers();

    const expiredToken = {
      access_token: '1234567890',
      token_type: 'UserToken',
      expires_in: oneHourInSeconds,
      jti: '',
      scope: ''
    };

    clientCredentialsTokenCache.cacheToken(
      'subscriber-tenant',
      'clientid',
      expiredToken
    );
    jest.advanceTimersByTime(oneHourInSeconds * 2 * 1000);

    const expired = clientCredentialsTokenCache.getToken(
      'subscriber-tenant',
      'clientid'
    );

    expect(expired).toBeUndefined();
  });

  it('should return undefined if the cache key is at least partly undefined', () => {
    const logger = createLogger('client-credentials-token-cache');
    const warn = jest.spyOn(logger, 'warn');

    const validToken = {
      access_token: '1234567890',
      token_type: 'UserToken',
      expires_in: oneHourInSeconds * 3,
      jti: '',
      scope: ''
    };

    clientCredentialsTokenCache.cacheToken(
      'subscriber-tenant',
      'clientid',
      validToken
    );

    jest.advanceTimersByTime(oneHourInSeconds * 2 * 1000);

    const invalid = clientCredentialsTokenCache.getToken(
      'subscriber-tenant',
      undefined as any
    );

    expect(invalid).toBeUndefined();
    expect(warn).toHaveBeenCalledWith(
      'Cannot create cache key for client credentials token cache. The given client ID is undefined.'
    );
  });

  describe('IAS resource parameter support', () => {
    const validToken = {
      access_token: '1234567890',
      token_type: 'Bearer',
      expires_in: oneHourInSeconds * 3,
      jti: '',
      scope: ''
    };
    const iasTokenCacheData = {
      iasInstance: 'subscriber-tenant',
      clientId: 'clientid',
      resource: { name: 'my-app' }
    };

    beforeEach(() => {
      clientCredentialsTokenCache.clear();
    });

    it('should cache and retrieve token with resource name', () => {
      clientCredentialsTokenCache.cacheTokenIas(iasTokenCacheData, validToken);

      const cached = clientCredentialsTokenCache.getTokenIas(iasTokenCacheData);

      expect(cached).toEqual(validToken);
    });

    it('should cache and retrieve token with resource clientId', () => {
      const resource = { providerClientId: 'resource-client-123' };

      clientCredentialsTokenCache.cacheTokenIas(
        {
          ...iasTokenCacheData,
          resource
        },
        validToken
      );

      const cached = clientCredentialsTokenCache.getTokenIas({
        ...iasTokenCacheData,
        resource
      });

      expect(cached).toEqual(validToken);
    });

    it('should cache and retrieve token with resource clientId and tenantId', () => {
      const resource = {
        providerClientId: 'resource-client-123',
        providerTenantId: 'tenant-456'
      };

      clientCredentialsTokenCache.cacheTokenIas(
        {
          ...iasTokenCacheData,
          resource
        },
        validToken
      );

      const cached = clientCredentialsTokenCache.getTokenIas({
        ...iasTokenCacheData,
        resource
      });

      expect(cached).toEqual(validToken);
    });

    it('should isolate cache by resource name', () => {
      const resource1 = { name: 'app-1' };
      const resource2 = { name: 'app-2' };

      clientCredentialsTokenCache.cacheTokenIas(
        {
          ...iasTokenCacheData,
          resource: resource1
        },
        validToken
      );

      const cached1 = clientCredentialsTokenCache.getTokenIas({
        ...iasTokenCacheData,
        resource: resource1
      });
      const cached2 = clientCredentialsTokenCache.getTokenIas({
        ...iasTokenCacheData,
        resource: resource2
      });

      expect(cached1).toEqual(validToken);
      expect(cached2).toBeUndefined();
    });

    it('should isolate cache by resource providerClientId', () => {
      const resource1 = { providerClientId: 'client-1' };
      const resource2 = { providerClientId: 'client-2' };

      clientCredentialsTokenCache.cacheTokenIas(
        {
          ...iasTokenCacheData,
          resource: resource1
        },
        validToken
      );

      const cached1 = clientCredentialsTokenCache.getTokenIas({
        ...iasTokenCacheData,
        resource: resource1
      });
      const cached2 = clientCredentialsTokenCache.getTokenIas({
        ...iasTokenCacheData,
        resource: resource2
      });

      expect(cached1).toEqual(validToken);
      expect(cached2).toBeUndefined();
    });

    it('should generate correct cache key with resource name', () => {
      const key = getCacheKeyIas({
        iasInstance: 'tenant-123',
        clientId: 'client-id',
        resource: { name: 'my-app' }
      });
      expect(key).toBe('tenant-123::client-id:name=my-app');
    });

    it('should generate correct cache key with resource clientId only', () => {
      const key = getCacheKeyIas({
        iasInstance: 'tenant-123',
        clientId: 'client-id',
        resource: {
          providerClientId: 'resource-client-123'
        }
      });
      expect(key).toBe(
        'tenant-123::client-id:provider-clientId=resource-client-123'
      );
    });

    it('should generate correct cache key with resource clientId and tenantId', () => {
      const key = getCacheKeyIas({
        iasInstance: 'tenant-123',
        clientId: 'client-id',
        resource: {
          providerClientId: 'resource-client-123',
          providerTenantId: 'tenant-456'
        }
      });
      expect(key).toBe(
        'tenant-123::client-id:provider-clientId=resource-client-123:provider-tenantId=tenant-456'
      );
    });

    it('should generate cache key without resource when not provided', () => {
      const key = getCacheKeyIas({
        iasInstance: 'tenant-123',
        clientId: 'client-id'
      });
      expect(key).toBe('tenant-123::client-id');
    });

    it('should isolate cache by appTid', () => {
      clientCredentialsTokenCache.cacheTokenIas(
        {
          ...iasTokenCacheData,
          appTid: 'tenant-123'
        },
        validToken
      );

      const cached1 = clientCredentialsTokenCache.getTokenIas({
        ...iasTokenCacheData,
        appTid: 'tenant-123'
      });
      const cached2 = clientCredentialsTokenCache.getTokenIas({
        ...iasTokenCacheData,
        appTid: 'tenant-456'
      });
      const cached3 = clientCredentialsTokenCache.getTokenIas({
        ...iasTokenCacheData
        // No appTid
      });

      expect(cached1).toEqual(validToken);
      expect(cached2).toBeUndefined();
      expect(cached3).toBeUndefined();
    });

    it('should generate correct cache key with appTid', () => {
      const key = getCacheKeyIas({
        iasInstance: 'tenant-123',
        clientId: 'client-id',
        appTid: 'app-tenant-456'
      });
      expect(key).toBe('tenant-123:app-tenant-456:client-id');
    });

    it('should generate cache key with double colon when appTid is undefined', () => {
      const key1 = getCacheKeyIas({
        iasInstance: 'tenant-123',
        clientId: 'client-id',
        appTid: undefined
      });
      const key2 = getCacheKeyIas({
        iasInstance: 'tenant-123',
        clientId: 'client-id'
      });
      // Both should produce the same key with double colon
      expect(key1).toBe('tenant-123::client-id');
      expect(key2).toBe('tenant-123::client-id');
    });
  });
});
