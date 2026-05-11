import { Cache, hashCacheKey } from './cache';
import { clientCredentialsTokenCache } from './client-credentials-token-cache';
import { destinationCache } from './destination';
import type { AuthenticationType, Destination } from './destination';
import type { ClientCredentialsResponse } from './xsuaa-service-types';

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

const dummyToken = {
  access_token: '1234567890'
} as ClientCredentialsResponse;

// Cache with expiration time
const cacheOne = new Cache<Destination>(300000);

// Never expiring cache
const cacheTwo = new Cache<ClientCredentialsResponse>(0);

describe('Cache', () => {
  afterEach(async () => {
    cacheOne.clear();
    cacheTwo.clear();
    await destinationCache.clear();
    clientCredentialsTokenCache.clear();
  });

  it('non-existing item in cache should return undefined', async () => {
    expect(cacheOne.get('notExistingDest')).toBeUndefined();
  });

  it('item should be retrieved correctly', () => {
    cacheOne.set('one', { entry: destinationOne });
    const actual = cacheOne.get('one');
    expect(actual).toEqual(destinationOne);
  });

  it('retrieving expired item should return undefined', () => {
    jest.useFakeTimers();
    cacheOne.set('one', { entry: destinationOne });

    expect(cacheOne.get('one')).toBeDefined();

    const minutesToExpire = 5;
    jest.advanceTimersByTime(minutesToExpire * 60 * 1000 + 1);
    expect(cacheOne.get('one')).toBeUndefined();
  });

  it('retrieving expired item with custom expire time should return undefined', () => {
    jest.useFakeTimers();
    const timeToExpire = 5000;

    cacheOne.set('expireTest', {
      entry: destinationOne,
      expires: Date.now() + timeToExpire
    });

    expect(cacheOne.get('expireTest')).toBeDefined();

    jest.advanceTimersByTime(timeToExpire + 1);
    expect(cacheOne.get('expireTest')).toBeUndefined();
  });

  it('clear() should remove all entries in cache', () => {
    cacheOne.set('one', { entry: destinationOne });
    cacheOne.clear();
    expect(cacheOne.hasKey('one')).toBeFalsy();
  });

  it('should return the item when its expiration time is undefined', () => {
    cacheTwo.set('someToken', { entry: dummyToken });
    expect(cacheTwo.get('someToken')).toEqual(dummyToken);
  });

  it('custom expiration time should be set correctly', () => {
    cacheTwo.set('expiredToken', { entry: dummyToken, expires: 10 });
    cacheTwo.set('validToken', {
      entry: dummyToken,
      expires: Date.now() + 5000
    });
    expect(cacheTwo.get('expiredToken')).toBeUndefined();
    expect(cacheTwo.get('validToken')).toBe(dummyToken);
  });

  it('should not hit cache for undefined key', () => {
    cacheOne.set(undefined, { entry: {} as Destination });
    const actual = cacheOne.get(undefined);
    expect(actual).toBeUndefined();
  });

  it('item should be retrievable multiple times (non-LRU cache)', () => {
    cacheOne.set('multi', { entry: destinationOne });
    expect(cacheOne.get('multi')).toEqual(destinationOne);
    expect(cacheOne.get('multi')).toEqual(destinationOne);
  });

  describe('LRU eviction (maxSize)', () => {
    it('evicts the least recently used entry when maxSize is exceeded', () => {
      const lruCache = new Cache<string>(0, 2);
      lruCache.set('a', { entry: 'A' });
      lruCache.set('b', { entry: 'B' });
      lruCache.set('c', { entry: 'C' }); // should evict 'a'
      expect(lruCache.get('a')).toBeUndefined();
      expect(lruCache.get('b')).toEqual('B');
      expect(lruCache.get('c')).toEqual('C');
    });

    it('updates LRU order on get, so recently accessed entry is not evicted', () => {
      const lruCache = new Cache<string>(0, 2);
      lruCache.set('a', { entry: 'A' });
      lruCache.set('b', { entry: 'B' });
      lruCache.get('a'); // 'a' is now most recently used; 'b' becomes LRU
      lruCache.set('c', { entry: 'C' }); // should evict 'b'
      expect(lruCache.get('b')).toBeUndefined();
      expect(lruCache.get('a')).toEqual('A');
      expect(lruCache.get('c')).toEqual('C');
    });

    it('repeated get keeps the accessed key as most recently used', () => {
      const lruCache = new Cache<string>(0, 2);
      lruCache.set('a', { entry: 'A' });
      lruCache.set('b', { entry: 'B' });

      lruCache.get('a');
      lruCache.get('a');
      lruCache.set('c', { entry: 'C' });

      expect(lruCache.get('a')).toEqual('A');
      expect(lruCache.get('b')).toBeUndefined();
      expect(lruCache.get('c')).toEqual('C');
    });

    it('does not evict another entry when updating an existing key', () => {
      const lruCache = new Cache<string>(0, 2);
      lruCache.set('a', { entry: 'A' });
      lruCache.set('b', { entry: 'B' });

      lruCache.set('b', { entry: 'B updated' });

      expect(lruCache.get('a')).toEqual('A');
      expect(lruCache.get('b')).toEqual('B updated');
    });
  });

  describe('hashCacheKey', () => {
    it('produces the same hash for plain objects with different key insertion order', () => {
      expect(hashCacheKey({ a: 1, b: 2 })).toEqual(
        hashCacheKey({ b: 2, a: 1 })
      );
    });

    it('produces different hashes for plain objects with different values', () => {
      expect(hashCacheKey({ a: 1 })).not.toEqual(hashCacheKey({ a: 2 }));
    });

    it('produces the same hash for Maps with different insertion order', () => {
      const m1 = new Map([
        ['x', 1],
        ['y', 2]
      ]);
      const m2 = new Map([
        ['y', 2],
        ['x', 1]
      ]);
      expect(hashCacheKey({ m: m1 })).toEqual(hashCacheKey({ m: m2 }));
    });

    it('produces the same hash for Sets with different insertion order', () => {
      const s1 = new Set([1, 2, 3]);
      const s2 = new Set([3, 1, 2]);
      expect(hashCacheKey({ s: s1 })).toEqual(hashCacheKey({ s: s2 }));
    });

    it('produces the same hash for class instances regardless of property insertion order', () => {
      class Point {
        [key: string]: number;
      }
      const p1 = new Point();
      p1.y = 2;
      p1.x = 1;
      const p2 = new Point();
      p2.x = 1;
      p2.y = 2;
      expect(hashCacheKey({ p: p1 })).toEqual(hashCacheKey({ p: p2 }));
    });
    it('preserves arrays as arrays (does not coerce to object)', () => {
      expect(hashCacheKey({ arr: [1, 2, 3] })).not.toEqual(
        hashCacheKey({ arr: { 0: 1, 1: 2, 2: 3 } })
      );
    });
  });

  describe('getOrInsertComputed', () => {
    it('returns cached value on subsequent calls without calling computeFn again', () => {
      const compute = jest.fn().mockReturnValue({ entry: destinationOne });
      cacheOne.getOrInsertComputed('cached', compute);
      const result = cacheOne.getOrInsertComputed('cached', compute);
      expect(result).toEqual(destinationOne);
      expect(compute).toHaveBeenCalledTimes(1);
      const result2 = cacheOne.get('cached');
      expect(result2).toEqual(destinationOne);
    });

    it('stores a custom expiration returned by computeFn', () => {
      jest.useFakeTimers();
      const timeToExpire = 5000;
      const compute = jest.fn().mockReturnValue({
        entry: destinationOne,
        expires: Date.now() + timeToExpire
      });

      cacheOne.getOrInsertComputed('custom-expire', compute);
      jest.advanceTimersByTime(timeToExpire + 1);

      expect(cacheOne.get('custom-expire')).toBeUndefined();
      expect(compute).toHaveBeenCalledTimes(1);
    });
  });
});
