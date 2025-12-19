import { createLogger } from '@sap-cloud-sdk/util';
import {
  clientCredentialsTokenCache,
  getCacheKey
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
      undefined,
      validToken
    );

    jest.advanceTimersByTime(oneHourInSeconds * 2 * 1000);

    const valid = clientCredentialsTokenCache.getToken(
      'subscriber-tenant',
      'clientid',
      undefined
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
      undefined,
      expiredToken
    );
    jest.advanceTimersByTime(oneHourInSeconds * 2 * 1000);

    const expired = clientCredentialsTokenCache.getToken(
      'subscriber-tenant',
      'clientid',
      undefined
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
      undefined,
      validToken
    );

    jest.advanceTimersByTime(oneHourInSeconds * 2 * 1000);

    const invalid = clientCredentialsTokenCache.getToken(
      'subscriber-tenant',
      undefined as any,
      undefined
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

    beforeEach(() => {
      clientCredentialsTokenCache.clear();
    });

    it('should cache and retrieve token with resource name', () => {
      const resource = { name: 'my-app' };

      clientCredentialsTokenCache.cacheToken(
        'subscriber-tenant',
        'clientid',
        resource,
        validToken
      );

      const cached = clientCredentialsTokenCache.getToken(
        'subscriber-tenant',
        'clientid',
        resource
      );

      expect(cached).toEqual(validToken);
    });

    it('should cache and retrieve token with resource clientId', () => {
      const resource = { clientId: 'resource-client-123' };

      clientCredentialsTokenCache.cacheToken(
        'subscriber-tenant',
        'clientid',
        resource,
        validToken
      );

      const cached = clientCredentialsTokenCache.getToken(
        'subscriber-tenant',
        'clientid',
        resource
      );

      expect(cached).toEqual(validToken);
    });

    it('should cache and retrieve token with resource clientId and tenantId', () => {
      const resource = {
        clientId: 'resource-client-123',
        tenantId: 'tenant-456'
      };

      clientCredentialsTokenCache.cacheToken(
        'subscriber-tenant',
        'clientid',
        resource,
        validToken
      );

      const cached = clientCredentialsTokenCache.getToken(
        'subscriber-tenant',
        'clientid',
        resource
      );

      expect(cached).toEqual(validToken);
    });

    it('should isolate cache by resource name', () => {
      const resource1 = { name: 'app-1' };
      const resource2 = { name: 'app-2' };

      clientCredentialsTokenCache.cacheToken(
        'subscriber-tenant',
        'clientid',
        resource1,
        validToken
      );

      const cached1 = clientCredentialsTokenCache.getToken(
        'subscriber-tenant',
        'clientid',
        resource1
      );
      const cached2 = clientCredentialsTokenCache.getToken(
        'subscriber-tenant',
        'clientid',
        resource2
      );

      expect(cached1).toEqual(validToken);
      expect(cached2).toBeUndefined();
    });

    it('should isolate cache by resource clientId', () => {
      const resource1 = { clientId: 'client-1' };
      const resource2 = { clientId: 'client-2' };

      clientCredentialsTokenCache.cacheToken(
        'subscriber-tenant',
        'clientid',
        resource1,
        validToken
      );

      const cached1 = clientCredentialsTokenCache.getToken(
        'subscriber-tenant',
        'clientid',
        resource1
      );
      const cached2 = clientCredentialsTokenCache.getToken(
        'subscriber-tenant',
        'clientid',
        resource2
      );

      expect(cached1).toEqual(validToken);
      expect(cached2).toBeUndefined();
    });

    it('should generate correct cache key with resource name', () => {
      const key = getCacheKey('tenant-123', 'client-id', { name: 'my-app' });
      expect(key).toBe('tenant-123:client-id:name=my-app');
    });

    it('should generate correct cache key with resource clientId only', () => {
      const key = getCacheKey('tenant-123', 'client-id', {
        clientId: 'resource-client-123'
      });
      expect(key).toBe('tenant-123:client-id:clientid=resource-client-123');
    });

    it('should generate correct cache key with resource clientId and tenantId', () => {
      const key = getCacheKey('tenant-123', 'client-id', {
        clientId: 'resource-client-123',
        tenantId: 'tenant-456'
      });
      expect(key).toBe(
        'tenant-123:client-id:clientid=resource-client-123:tenantid=tenant-456'
      );
    });

    it('should generate cache key without resource when not provided', () => {
      const key = getCacheKey('tenant-123', 'client-id');
      expect(key).toBe('tenant-123:client-id');
    });
  });
});
