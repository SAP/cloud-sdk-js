import { createLogger } from '@sap-cloud-sdk/util';
import { clientCredentialsTokenCache } from './client-credentials-token-cache';

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
});
