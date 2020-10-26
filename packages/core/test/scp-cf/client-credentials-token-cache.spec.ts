import { install } from '@sinonjs/fake-timers';
import moment from 'moment';
import { clientCredentialsTokenCache } from '../../src/scp-cf';

describe('ClientCredentialsTokenCache', () => {
  it('should return token when valid, return undefined otherwise', () => {
    const clock = install();
    const now = Date.now();
    const validToken = {
      access_token: '1234567890',
      token_type: 'UserToken',
      // x second later
      expires_in: 100000,
      jti: '',
      scope: ''
    };
    const expiredToken = {
      access_token: '1234567890',
      token_type: 'UserToken',
      expires_in: 50000,
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
    // millisecond
    clock.tick(75000 * 1000);

    const valid = clientCredentialsTokenCache.getGrantTokenFromCache(
      'https://url_valid',
      credentials
    );
    const expired = clientCredentialsTokenCache.getGrantTokenFromCache(
      'https://url_expired',
      credentials
    );

    expect([valid, expired]).toEqual([validToken, undefined]);
    clock.uninstall();
  });
});
