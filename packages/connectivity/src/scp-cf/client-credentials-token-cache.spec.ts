import { createLogger } from '@sap-cloud-sdk/util';
import { clientCredentialsTokenCache } from './client-credentials-token-cache';

const oneHourInSeconds = 60 * 60;

describe('ClientCredentialsTokenCache', () => {
  beforeEach(() => {
    jest.useFakeTimers({ doNotFake: ['performance'] } as any); // TODO Version jest v28 api has changed but @types/jest are not there yet hence as any workaround
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should return token if a valid token is cached', () => {
    const validToken = {
      access_token: '1234567890',
      token_type: 'UserToken',
      expires_in: oneHourInSeconds * 3,
      jti: '',
      scope: ''
    };

    clientCredentialsTokenCache.cacheToken(
      'https://url_valid',
      'clientid',
      validToken
    );

    jest.advanceTimersByTime(oneHourInSeconds * 2 * 1000);

    const valid = clientCredentialsTokenCache.getToken(
      'https://url_valid',
      'clientid'
    );

    expect(valid).toEqual(validToken);
  });

  it('should return undefined if expired token is cached', () => {
    const expiredToken = {
      access_token: '1234567890',
      token_type: 'UserToken',
      expires_in: oneHourInSeconds,
      jti: '',
      scope: ''
    };

    clientCredentialsTokenCache.cacheToken(
      'https://url_expired',
      'clientid',
      expiredToken
    );
    jest.advanceTimersByTime(oneHourInSeconds * 2 * 1000);

    const expired = clientCredentialsTokenCache.getToken(
      'https://url_expired',
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
      'https://url_valid',
      'clientid',
      validToken
    );

    jest.advanceTimersByTime(oneHourInSeconds * 2 * 1000);

    const invalid = clientCredentialsTokenCache.getToken(
      'https://url_valid',
      undefined as any
    );

    expect(invalid).toBeUndefined();
    expect(warn).toBeCalledWith(
      'Cannot get cache key. The ClientId was undefined.'
    );
  });
});
