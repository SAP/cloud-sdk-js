import { install } from '@sinonjs/fake-timers';
import { clientCredentialsTokenCache } from '../../src/connectivity/scp-cf';

describe('ClientCredentialsTokenCache', () => {
  it('should return token when valid, return undefined otherwise', () => {
    const clock = install();
    const expires_in_one_hour_with_unit_second = 60 * 60;
    const expires_in_three_hours_with_unit_second = 60 * 60 * 3;
    const two_hours_later_with_unit_millisecond = 60 * 60 * 2 * 1000;
    const validToken = {
      access_token: '1234567890',
      token_type: 'UserToken',
      expires_in: expires_in_three_hours_with_unit_second,
      jti: '',
      scope: ''
    };
    const expiredToken = {
      access_token: '1234567890',
      token_type: 'UserToken',
      expires_in: expires_in_one_hour_with_unit_second,
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
    clock.tick(two_hours_later_with_unit_millisecond);

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
