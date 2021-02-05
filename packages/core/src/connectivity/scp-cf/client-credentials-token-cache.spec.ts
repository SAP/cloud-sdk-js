import { clientCredentialsTokenCache } from './client-credentials-token-cache';

describe('ClientCredentialsTokenCache', () => {
  it('should return token when valid, return undefined otherwise', () => {
    jest.useFakeTimers('modern');
    const oneHourInSeconds = 60 * 60;
    const validToken = {
      access_token: '1234567890',
      token_type: 'UserToken',
      expires_in: oneHourInSeconds * 3,
      jti: '',
      scope: ''
    };
    const expiredToken = {
      access_token: '1234567890',
      token_type: 'UserToken',
      expires_in: oneHourInSeconds,
      jti: '',
      scope: ''
    };

    const credentials = { username: 'user', password: 'pwd' };
    clientCredentialsTokenCache.cacheRetrievedToken(
      'https://url_valid',
      credentials,
      validToken
    );
    clientCredentialsTokenCache.cacheRetrievedToken(
      'https://url_expired',
      credentials,
      expiredToken
    );
    jest.advanceTimersByTime(oneHourInSeconds * 2 * 1000);

    const valid = clientCredentialsTokenCache.getGrantTokenFromCache(
      'https://url_valid',
      credentials
    );
    const expired = clientCredentialsTokenCache.getGrantTokenFromCache(
      'https://url_expired',
      credentials
    );

    expect([valid, expired]).toEqual([validToken, undefined]);
  });
});
