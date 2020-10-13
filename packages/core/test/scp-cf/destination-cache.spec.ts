import { install } from '@sinonjs/fake-timers';
import {
  AuthenticationType,
  Destination,
  destinationCache,
  IsolationStrategy
} from '../../src/scp-cf';

const destinationOne: Destination = {
  url: 'https://destination1.example',
  name: 'destToCache1',
  proxyType: 'Internet',
  username: 'name',
  password: 'pwd',
  authentication: 'BasicAuthentication' as AuthenticationType,
  authTokens: [],
  sapClient: null,
  originalProperties: {},
  isTrustingAllCertificates: false
};

describe('DestinationCache', () => {
  it('should cache the destination correctly', () => {
    const dummyJwt = { user_id: 'user', zid: 'tenant' };
    destinationCache.cacheRetrievedDestination(
      dummyJwt,
      destinationOne,
      IsolationStrategy.User
    );
    const actual1 = destinationCache.retrieveDestinationFromCache(
      dummyJwt,
      'destToCache1',
      IsolationStrategy.User
    );
    const actual2 = destinationCache.retrieveDestinationFromCache(
      dummyJwt,
      'destToCache1',
      IsolationStrategy.Tenant
    );
    const actual3 = destinationCache.retrieveDestinationFromCache(
      dummyJwt,
      'destToCache1',
      IsolationStrategy.Tenant_User
    );
    const actual4 = destinationCache.retrieveDestinationFromCache(
      dummyJwt,
      'destToCache1',
      IsolationStrategy.No_Isolation
    );

    const expected = [destinationOne, undefined, undefined, undefined];

    expect([actual1, actual2, actual3, actual4]).toEqual(expected);
  });

  it('should return undefined when the destination is not valid', () => {
    const clock = install();
    const dummyJwt = { user_id: 'user', zid: 'tenant' };
    destinationCache.cacheRetrievedDestination(
      dummyJwt,
      destinationOne,
      IsolationStrategy.User
    );
    const minutesToExpire = 6;
    clock.tick(60000 * minutesToExpire);

    const actual = destinationCache.retrieveDestinationFromCache(
      dummyJwt,
      'destToCache1',
      IsolationStrategy.User
    );

    expect(actual).toBeUndefined();
    clock.uninstall();
  });
});
