import { createLogger } from '@sap-cloud-sdk/util';
import { clientCredentialsTokenCache } from './client-credentials-token-cache';

const oneHourInSeconds = 60 * 60;

describe('ClientCredentialsTokenCache', () => {
  it('should return token if a valid token is cached', async () => {
    jest.useFakeTimers('modern');

    const validToken = {
      access_token: '1234567890',
      token_type: 'UserToken',
      expires_in: oneHourInSeconds * 3,
      jti: '',
      scope: ''
    };

    await clientCredentialsTokenCache.cacheToken(
      'https://url_valid',
      'clientid',
      validToken
    );

    jest.advanceTimersByTime(oneHourInSeconds * 2 * 1000);

    const valid = clientCredentialsTokenCache.getToken(
      'https://url_valid',
      'clientid'
    );

    await expect(valid).resolves.toEqual(validToken);
  });

  it('should return undefined if expired token is cached', async () => {
    jest.useFakeTimers('modern');

    const expiredToken = {
      access_token: '1234567890',
      token_type: 'UserToken',
      expires_in: oneHourInSeconds,
      jti: '',
      scope: ''
    };

    await clientCredentialsTokenCache.cacheToken(
      'https://url_expired',
      'clientid',
      expiredToken
    );
    jest.advanceTimersByTime(oneHourInSeconds * 2 * 1000);

    const expired = clientCredentialsTokenCache.getToken(
      'https://url_expired',
      'clientid'
    );

    await expect(expired).resolves.toBeUndefined();
  });

  it('should return undefined if the cache key is at least partly undefined', async () => {
    const logger = createLogger('client-credentials-token-cache');
    const warn = jest.spyOn(logger, 'warn');

    const validToken = {
      access_token: '1234567890',
      token_type: 'UserToken',
      expires_in: oneHourInSeconds * 3,
      jti: '',
      scope: ''
    };

    await clientCredentialsTokenCache.cacheToken(
      'https://url_valid',
      'clientid',
      validToken
    );

    jest.advanceTimersByTime(oneHourInSeconds * 2 * 1000);

    const invalid = clientCredentialsTokenCache.getToken(
      'https://url_valid',
      undefined as any
    );

    await expect(invalid).resolves.toBeUndefined();
    expect(warn).toBeCalledWith(
      'Cannot get cache key. The ClientId was undefined.'
    );
  });
});
