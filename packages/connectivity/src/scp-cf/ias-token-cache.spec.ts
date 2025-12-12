import { createLogger } from '@sap-cloud-sdk/util';
import { signedJwt } from '../../../../test-resources/test/test-util';
import { iasTokenCache, getCacheKey } from './ias-token-cache';
import type { ClientCredentialsResponse } from './xsuaa-service-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'ias-token-cache'
});

describe('ias-token-cache', () => {
  const mockToken: ClientCredentialsResponse = {
    access_token: 'mock-access-token',
    token_type: 'Bearer',
    expires_in: 3600,
    scope: 'openid',
    jti: 'mock-jti'
  };

  afterEach(() => {
    iasTokenCache.clear();
    jest.restoreAllMocks();
  });

  describe('getToken', () => {
    it('returns cached token if valid', () => {
      iasTokenCache.cacheToken('test-client-id', {}, mockToken);

      const cachedToken = iasTokenCache.getToken('test-client-id', {});
      expect(cachedToken).toEqual(mockToken);
    });

    it('returns undefined for expired token', () => {
      const expiredToken = {
        ...mockToken,
        expires_in: -1
      };
      iasTokenCache.cacheToken('test-client-id', {}, expiredToken);

      // Wait for token to expire
      jest.useFakeTimers();
      jest.advanceTimersByTime(2000);

      const cachedToken = iasTokenCache.getToken('test-client-id', {});
      expect(cachedToken).toBeUndefined();

      jest.useRealTimers();
    });

    it('returns undefined if cache key cannot be created', () => {
      jest.spyOn(logger, 'warn');

      const cachedToken = iasTokenCache.getToken('', {});
      expect(cachedToken).toBeUndefined();
      expect(logger.warn).toHaveBeenCalledWith(
        'Cannot create cache key for IAS token cache. The given client ID is undefined.'
      );
    });
  });

  describe('cacheToken', () => {
    it('caches token with expiration', () => {
      iasTokenCache.cacheToken('test-client-id', {}, mockToken);

      const cachedToken = iasTokenCache.getToken('test-client-id', {});
      expect(cachedToken).toEqual(mockToken);
    });

    it('does not cache if cache key cannot be created', () => {
      jest.spyOn(logger, 'warn');

      iasTokenCache.cacheToken('', {}, mockToken);

      expect(logger.warn).toHaveBeenCalledWith(
        'Cannot create cache key for IAS token cache. The given client ID is undefined.'
      );
    });
  });

  describe('getCacheKey', () => {
    describe('technical-user flow', () => {
      it('generates cache key with default tenant (provider-tenant)', () => {
        const cacheKey = getCacheKey('test-client-id', {});
        expect(cacheKey).toBe('provider-tenant:test-client-id:');
      });

      it('generates cache key with appTenantId', () => {
        const cacheKey = getCacheKey('test-client-id', {
          appTenantId: 'tenant-123'
        });
        expect(cacheKey).toBe('tenant-123:test-client-id:');
      });

      it('includes resource name in cache key', () => {
        const cacheKey = getCacheKey('test-client-id', {
          resource: { name: 'my-app' }
        });
        expect(cacheKey).toBe('provider-tenant:test-client-id:name=my-app');
      });

      it('includes resource clientId in cache key', () => {
        const cacheKey = getCacheKey('test-client-id', {
          resource: { clientId: 'resource-client-123' }
        });
        expect(cacheKey).toBe(
          'provider-tenant:test-client-id:clientid=resource-client-123'
        );
      });

      it('includes resource clientId and tenantId in cache key', () => {
        const cacheKey = getCacheKey('test-client-id', {
          resource: { clientId: 'resource-client-123', tenantId: 'tenant-456' }
        });
        expect(cacheKey).toBe(
          'provider-tenant:test-client-id:clientid=resource-client-123:tenantid=tenant-456'
        );
      });

      it('returns undefined if clientId is missing', () => {
        jest.spyOn(logger, 'warn');

        const cacheKey = getCacheKey('', {});
        expect(cacheKey).toBeUndefined();
        expect(logger.warn).toHaveBeenCalledWith(
          'Cannot create cache key for IAS token cache. The given client ID is undefined.'
        );
      });
    });

    describe('business-user flow', () => {
      it('generates cache key with user and tenant from assertion', () => {
        const assertion = signedJwt({
          user_uuid: 'user-123',
          app_tid: 'tenant-456'
        });

        const cacheKey = getCacheKey('test-client-id', {
          actAs: 'business-user',
          assertion
        });
        expect(cacheKey).toBe('user-123:tenant-456:test-client-id:');
      });

      it('generates cache key with resource', () => {
        const assertion = signedJwt({
          user_uuid: 'user-123',
          app_tid: 'tenant-456'
        });

        const cacheKey = getCacheKey('test-client-id', {
          actAs: 'business-user',
          assertion,
          resource: { name: 'my-app' }
        });
        expect(cacheKey).toBe('user-123:tenant-456:test-client-id:name=my-app');
      });

      it('returns undefined if assertion is missing', () => {
        jest.spyOn(logger, 'warn');

        const cacheKey = getCacheKey('test-client-id', {
          actAs: 'business-user'
        } as any);
        expect(cacheKey).toBeUndefined();
        expect(logger.warn).toHaveBeenCalledWith(
          'Cannot create cache key for IAS token cache. Business-user flow requires assertion JWT.'
        );
      });

      it('returns undefined if user ID cannot be extracted', () => {
        jest.spyOn(logger, 'warn');
        const assertion = signedJwt({
          app_tid: 'tenant-456'
          // Missing user_uuid
        });

        const cacheKey = getCacheKey('test-client-id', {
          actAs: 'business-user',
          assertion
        });
        expect(cacheKey).toBeUndefined();
        expect(logger.warn).toHaveBeenCalledWith(
          'Cannot create cache key for IAS token cache. User ID could not be extracted from assertion JWT.'
        );
      });

      it('returns undefined if tenant ID cannot be extracted', () => {
        jest.spyOn(logger, 'warn');
        const assertion = signedJwt({
          user_uuid: 'user-123'
          // Missing app_tid or zid
        });

        const cacheKey = getCacheKey('test-client-id', {
          actAs: 'business-user',
          assertion
        });
        expect(cacheKey).toBeUndefined();
        expect(logger.warn).toHaveBeenCalledWith(
          'Cannot create cache key for IAS token cache. Tenant ID could not be extracted from assertion JWT.'
        );
      });
    });

    describe('cache isolation', () => {
      it('isolates cache by tenant for technical-user', () => {
        const key1 = getCacheKey('test-client-id', {
          appTenantId: 'tenant-1'
        });
        const key2 = getCacheKey('test-client-id', {
          appTenantId: 'tenant-2'
        });

        expect(key1).not.toBe(key2);
        expect(key1).toBe('tenant-1:test-client-id:');
        expect(key2).toBe('tenant-2:test-client-id:');
      });

      it('isolates cache by resource', () => {
        const key1 = getCacheKey('test-client-id', {
          resource: { name: 'app-1' }
        });
        const key2 = getCacheKey('test-client-id', {
          resource: { name: 'app-2' }
        });

        expect(key1).not.toBe(key2);
      });

      it('isolates cache by user for business-user', () => {
        const assertion1 = signedJwt({
          user_uuid: 'user-1',
          app_tid: 'tenant-123'
        });
        const assertion2 = signedJwt({
          user_uuid: 'user-2',
          app_tid: 'tenant-123'
        });

        const key1 = getCacheKey('test-client-id', {
          actAs: 'business-user',
          assertion: assertion1
        });
        const key2 = getCacheKey('test-client-id', {
          actAs: 'business-user',
          assertion: assertion2
        });

        expect(key1).not.toBe(key2);
        expect(key1).toBe('user-1:tenant-123:test-client-id:');
        expect(key2).toBe('user-2:tenant-123:test-client-id:');
      });
    });
  });

  describe('clear', () => {
    it('clears all cached tokens', () => {
      iasTokenCache.cacheToken('test-client-id', {}, mockToken);
      expect(iasTokenCache.getToken('test-client-id', {})).toEqual(mockToken);

      iasTokenCache.clear();
      expect(iasTokenCache.getToken('test-client-id', {})).toBeUndefined();
    });
  });
});
