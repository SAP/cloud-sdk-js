import { createLogger } from '@sap-cloud-sdk/util';
import nock from 'nock';
import { decodeJwt, wrapJwtInHeader } from '../jwt';
import {
  mockInstanceDestinationsCall,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../../../../../test-resources/test/test-util/destination-service-mocks';
import {
  connectivityProxyConfigMock,
  mockServiceBindings,
  onlyIssuerXsuaaUrl,
  testTenants
} from '../../../../../test-resources/test/test-util/environment-mocks';
import {
  certificateMultipleResponse,
  certificateSingleResponse,
  destinationName,
  oauthMultipleResponse,
  oauthSingleResponse,
  onPremisePrincipalPropagationMultipleResponse
} from '../../../../../test-resources/test/test-util/example-destination-service-responses';
import {
  providerServiceToken,
  providerUserToken,
  providerUserPayload,
  subscriberServiceToken,
  subscriberUserToken
} from '../../../../../test-resources/test/test-util/mocked-access-tokens';
import { TestCache } from '../../../../../test-resources/test/test-util/test-cache';
import {
  mockJwtBearerToken,
  mockServiceToken
} from '../../../../../test-resources/test/test-util/token-accessor-mocks';
import {
  AuthenticationType,
  Destination,
  DestinationAuthToken
} from './destination-service-types';
import { destinationServiceCache } from './destination-service-cache';
import {
  alwaysProvider,
  alwaysSubscriber,
  subscriberFirst
} from './destination-selection-strategies';
import { getDestinationFromDestinationService } from './destination-from-service';
import {
  destinationCache,
  getDestinationCacheKey,
  IsolationStrategy,
  setDestinationCache
} from './destination-cache';
import { getDestination } from './destination-accessor';
import { parseDestination } from './destination';

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

async function getSubscriberCache(
  isolationStrategy: IsolationStrategy,
  destName = 'SubscriberDest'
) {
  const decodedSubscriberJwt = decodeJwt(subscriberUserToken);
  return destinationCache.retrieveDestinationFromCache(
    decodedSubscriberJwt,
    destName,
    isolationStrategy
  );
}
async function getProviderCache(isolationStrategy: IsolationStrategy) {
  const decodedProviderJwt = decodeJwt(providerUserToken);
  return destinationCache.retrieveDestinationFromCache(
    decodedProviderJwt,
    'ProviderDest',
    isolationStrategy
  );
}

function mockDestinationsWithSameName() {
  nock.cleanAll();
  mockServiceToken();

  const dest = {
    URL: 'https://subscriber.example',
    Name: 'SubscriberDest',
    ProxyType: 'any',
    Authentication: 'NoAuthentication'
  };
  mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken);
  mockSubaccountDestinationsCall(nock, [dest], 200, subscriberServiceToken);
  mockInstanceDestinationsCall(nock, [], 200, providerServiceToken);
  mockSubaccountDestinationsCall(nock, [dest], 200, providerServiceToken);
}

describe('destination cache', () => {
  afterAll(async () => {
    await destinationCache.clear();
    destinationServiceCache.clear();
    nock.cleanAll();
  });

  beforeEach(async () => {
    await destinationCache.clear();
    destinationServiceCache.clear();
    nock.cleanAll();
    jest.resetAllMocks();
  });

  describe('caching', () => {
    beforeEach(() => {
      mockVerifyJwt();
      mockServiceBindings();
      mockServiceToken();

      const subscriberDest = {
        URL: 'https://subscriber.example',
        Name: 'SubscriberDest',
        ProxyType: 'any',
        Authentication: 'NoAuthentication'
      };
      const subscriberDest2 = {
        URL: 'https://subscriber2.example',
        Name: 'SubscriberDest2',
        ProxyType: 'any',
        Authentication: 'NoAuthentication'
      };
      const providerDest = {
        URL: 'https://provider.example',
        Name: 'ProviderDest',
        ProxyType: 'any',
        Authentication: 'NoAuthentication'
      };

      mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken);
      mockSubaccountDestinationsCall(
        nock,
        [subscriberDest, subscriberDest2],
        200,
        subscriberServiceToken
      );
      mockInstanceDestinationsCall(nock, [], 200, providerServiceToken);
      mockSubaccountDestinationsCall(
        nock,
        [providerDest],
        200,
        providerServiceToken
      );
    });

    it('cache key contains user also for provider tokens', async () => {
      await getDestination({
        destinationName: 'ProviderDest',
        jwt: providerUserToken,
        useCache: true,
        isolationStrategy: 'tenant-user'
      });
      const cacheKeys = Object.keys(
        await (destinationCache.getCacheInstance() as any).cache.cache
      );
      expect(cacheKeys[0]).toBe(
        getDestinationCacheKey(
          providerUserPayload,
          'ProviderDest',
          'tenant-user'
        )
      );
    });

    it("retrieved subscriber destinations are cached with tenant id using 'tenant-user' isolation type by default", async () => {
      await getDestination({
        destinationName: 'SubscriberDest',
        jwt: subscriberUserToken,
        useCache: true,
        cacheVerificationKeys: false
      });

      const c1 = await getSubscriberCache('tenant');
      const c2 = await getProviderCache('tenant');
      const c5 = await getSubscriberCache('tenant-user');
      const c6 = await getProviderCache('tenant-user');

      expect(c1).toBeUndefined();
      expect(c2).toBeUndefined();
      expect(c5!.url).toBe('https://subscriber.example');
      expect(c6).toBeUndefined();
    });

    it('caches only subscriber if the destination names are the same and subscriber first', async () => {
      mockDestinationsWithSameName();
      await getDestination({
        destinationName: 'SubscriberDest',
        jwt: subscriberUserToken,
        useCache: true,
        isolationStrategy: 'tenant',
        cacheVerificationKeys: false
      });

      const c1 = await getSubscriberCache('tenant');
      const c2 = await getProviderCache('tenant');

      expect(c1!.url).toBe('https://subscriber.example');
      expect(c2).toBeUndefined();
    });

    it('caches only provider if selection strategy always provider', async () => {
      await getDestination({
        destinationName: 'ProviderDest',
        jwt: subscriberUserToken,
        useCache: true,
        isolationStrategy: 'tenant',
        cacheVerificationKeys: false,
        selectionStrategy: alwaysProvider
      });

      const c1 = await getSubscriberCache('tenant');
      const c2 = await getProviderCache('tenant');

      expect(c1).toBeUndefined();
      expect(c2!.url).toBe('https://provider.example');
    });

    it('caches only subscriber if selection strategy always subscriber', async () => {
      mockVerifyJwt();
      await getDestination({
        destinationName: 'SubscriberDest',
        jwt: subscriberUserToken,
        useCache: true,
        isolationStrategy: 'tenant',
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber
      });

      const c1 = await getSubscriberCache('tenant');
      const c2 = await getProviderCache('tenant');

      expect(c1!.url).toBe('https://subscriber.example');
      expect(c2).toBeUndefined();
    });

    it('caches nothing if the destination is not found', async () => {
      mockVerifyJwt();
      await getDestination({
        destinationName: 'ANY',
        jwt: subscriberUserToken,
        useCache: true,
        isolationStrategy: 'tenant',
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber
      });

      const c1 = await getSubscriberCache('tenant');
      const c2 = await getProviderCache('tenant');

      expect(c1).toBeUndefined();
      expect(c2).toBeUndefined();
    });

    it('caches only the found destination not other ones received from the service', async () => {
      mockVerifyJwt();
      await getDestination({
        destinationName: 'SubscriberDest2',
        jwt: subscriberUserToken,
        useCache: true,
        isolationStrategy: 'tenant',
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber
      });

      const c1 = await getSubscriberCache('tenant', 'SubscriberDest');
      const c2 = await getSubscriberCache('tenant', 'SubscriberDest2');

      expect(c1).toBeUndefined();
      expect(c2!.url).toBe('https://subscriber2.example');
    });
  });

  describe('caching options', () => {
    beforeEach(() => {
      mockServiceBindings({ xsuaaBinding: false });
      mockServiceToken();
      mockVerifyJwt();
    });

    const destName = destinationOne.name!;

    it('disables the cache by default', async () => {
      await destinationCache.cacheRetrievedDestination(
        { user_id: 'user', zid: 'tenant' },
        destinationOne,
        'tenant'
      );
      await expect(
        getDestination({ destinationName: destName })
      ).rejects.toThrowError(/Failed to fetch \w+ destinations./);
    }, 15000);

    it("uses cache with isolation strategy 'tenant' if no JWT is provided", async () => {
      await destinationCache.cacheRetrievedDestination(
        decodeJwt(providerServiceToken),
        destinationOne,
        'tenant'
      );
      const actual = await getDestination({
        destinationName: destName,
        useCache: true
      });
      expect(actual).toEqual(destinationOne);
    });

    it("uses cache with isolation strategy 'tenant' and 'iss' set", async () => {
      await destinationCache
        .getCacheInstance()
        .set(`${testTenants.subscriberOnlyIss}::${destinationOne.name}`, {
          entry: destinationOne
        });

      const actual = await getDestination({
        destinationName: destName,
        iss: onlyIssuerXsuaaUrl,
        useCache: true
      });
      expect(actual).toEqual(destinationOne);
    });

    it('uses cache with isolation strategy TenantUser if JWT is provided', async () => {
      await destinationCache.cacheRetrievedDestination(
        decodeJwt(subscriberUserToken),
        destinationOne,
        'tenant-user'
      );
      const actual = await getDestination({
        destinationName: destName,
        useCache: true,
        jwt: subscriberUserToken
      });
      expect(actual).toEqual(destinationOne);
    });

    it("enables cache if isolation strategy 'tenant' is provided", async () => {
      await destinationCache.cacheRetrievedDestination(
        decodeJwt(providerServiceToken),
        destinationOne,
        'tenant'
      );
      const actual = await getDestination({
        destinationName: destName,
        isolationStrategy: 'tenant'
      });
      expect(actual).toEqual(destinationOne);
    });

    it('enables cache if isolation strategy TenantUser is provided', async () => {
      await destinationCache.cacheRetrievedDestination(
        decodeJwt(subscriberUserToken),
        destinationOne,
        'tenant-user'
      );
      const actual = await getDestination({
        destinationName: destName,
        isolationStrategy: 'tenant-user',
        jwt: subscriberUserToken
      });
      expect(actual).toEqual(destinationOne);
    });

    it('ignores cache if isolation requires tenant but tenant info is not provided', async () => {
      const logger = createLogger('destination-cache');
      const warn = jest.spyOn(logger, 'warn');

      destinationCache.cacheRetrievedDestination(
        { user_id: 'onlyUserInJwt' },
        { url: 'some-destination', name: 'TESTINATION' },
        'tenant'
      );

      expect(warn).toBeCalledWith(
        "Could not build destination cache key. Isolation strategy 'tenant' is used, but tenant id is undefined in JWT."
      );
      expect(
        Object.keys(destinationCache.getCacheInstance()['cache'].cache).length
      ).toBe(0);
    });

    it('ignores cache if isolation requires user JWT but the JWT is not provided', async () => {
      const logger = createLogger('destination-cache');
      const warn = jest.spyOn(logger, 'warn');

      await expect(
        getDestination({
          destinationName: destName,
          isolationStrategy: 'tenant-user',
          jwt: subscriberServiceToken
        })
      ).rejects.toThrowError(/Failed to fetch \w+ destinations./);
      expect(warn).toBeCalledWith(
        "Could not build destination cache key. Isolation strategy 'tenant-user' is used, but tenant id or user id is undefined in JWT."
      );
    }, 15000);
  });

  describe('caching of destinations with special information (e.g. authTokens, certificates)', () => {
    it('destinations with certificates are cached ', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          certificateMultipleResponse,
          200,
          providerServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          certificateSingleResponse,
          200,
          'ERNIE-UND-CERT',
          wrapJwtInHeader(providerServiceToken).headers
        )
      ];

      const retrieveFromCacheSpy = jest.spyOn(
        destinationCache,
        'retrieveDestinationFromCache'
      );

      const destinationFromService = await getDestinationFromDestinationService(
        {
          destinationName: 'ERNIE-UND-CERT',
          useCache: true,
          jwt: providerUserToken
        }
      );
      const destinationFromCache = await getDestinationFromDestinationService({
        destinationName: 'ERNIE-UND-CERT',
        useCache: true,
        jwt: providerUserToken
      });

      expect(destinationFromService).toEqual(
        parseDestination(certificateSingleResponse)
      );
      expect(destinationFromCache).toEqual(destinationFromService);
      expect(retrieveFromCacheSpy).toHaveBeenCalled();
      expect(retrieveFromCacheSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          userJwt: expect.objectContaining({
            decoded: expect.objectContaining({
              iss: 'https://provider.example.com',
              user_id: 'user-prov',
              zid: 'provider'
            })
          })
        }),
        destinationFromCache?.name,
        'tenant-user'
      );
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });

    it('destinations with authTokens are cached correctly', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(
          nock,
          oauthMultipleResponse,
          200,
          providerServiceToken
        ),
        mockSubaccountDestinationsCall(nock, [], 200, providerServiceToken),
        mockSingleDestinationCall(
          nock,
          oauthSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(providerUserToken).headers
        )
      ];

      const expected = parseDestination(oauthSingleResponse);
      const destinationFromService = await getDestination({
        destinationName,
        jwt: providerUserToken,
        useCache: true
      });
      expect(destinationFromService).toMatchObject(expected);

      const retrieveFromCacheSpy = jest.spyOn(
        destinationCache,
        'retrieveDestinationFromCache'
      );

      const destinationFromCache = await getDestination({
        destinationName,
        jwt: providerUserToken,
        useCache: true
      });

      expect(destinationFromService).toEqual(
        parseDestination(oauthSingleResponse)
      );
      expect(destinationFromCache).toEqual(destinationFromService);
      expect(retrieveFromCacheSpy).toHaveBeenCalled();
      expect(retrieveFromCacheSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          userJwt: expect.objectContaining({
            decoded: expect.objectContaining({
              iss: 'https://provider.example.com',
              user_id: 'user-prov',
              zid: 'provider'
            })
          })
        }),
        expected.name,
        'tenant-user'
      );
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });

    it('destinations with proxy configuration are cached correctly', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      mockInstanceDestinationsCall(nock, [], 200, providerServiceToken);
      mockSubaccountDestinationsCall(
        nock,
        onPremisePrincipalPropagationMultipleResponse,
        200,
        providerServiceToken
      );

      const retrieveFromCacheSpy = jest.spyOn(
        destinationCache,
        'retrieveDestinationFromCache'
      );

      const destinationFromFirstCall =
        await getDestinationFromDestinationService({
          destinationName: 'OnPremise',
          useCache: true,
          jwt: providerUserToken
        });
      const destinationFromCache = await getDestinationFromDestinationService({
        destinationName: 'OnPremise',
        useCache: true,
        jwt: providerUserToken
      });

      const expected = {
        ...parseDestination({
          Name: 'OnPremise',
          URL: 'my.on.premise.system:54321',
          ProxyType: 'OnPremise',
          Authentication: 'PrincipalPropagation'
        }),
        proxyConfiguration: {
          ...connectivityProxyConfigMock,
          headers: {
            'Proxy-Authorization': `Bearer ${providerServiceToken}`,
            'SAP-Connectivity-Authentication': `Bearer ${providerUserToken}`
          }
        }
      };

      expect(destinationFromFirstCall).toEqual(expected);
      expect(destinationFromCache).toEqual(destinationFromFirstCall);
      expect(retrieveFromCacheSpy).toHaveBeenCalled();
      expect(retrieveFromCacheSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          userJwt: expect.objectContaining({
            decoded: expect.objectContaining({
              iss: 'https://provider.example.com',
              user_id: 'user-prov',
              zid: 'provider'
            })
          })
        }),
        expected.name,
        'tenant-user'
      );
    });

    it('retrieves subscriber cached destination', async () => {
      mockServiceBindings();
      mockServiceToken();
      mockVerifyJwt();

      const authType = 'NoAuthentication' as AuthenticationType;
      const subscriberDest = {
        URL: 'https://subscriber.example',
        Name: 'SubscriberDest',
        ProxyType: 'any',
        Authentication: authType
      };
      const parsedDestination = parseDestination(subscriberDest);
      // Cache destination to retrieve
      await destinationCache.cacheRetrievedDestination(
        decodeJwt(subscriberUserToken),
        parsedDestination,
        'tenant-user'
      );

      const actual = await getDestination({
        destinationName: 'SubscriberDest',
        jwt: subscriberUserToken,
        useCache: true,
        isolationStrategy: 'tenant-user',
        cacheVerificationKeys: false
      });

      expect(actual).toEqual(parsedDestination);
    });

    it('retrieves provider cached destination', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const authType = 'NoAuthentication' as AuthenticationType;
      const providerDest = {
        URL: 'https://provider.example',
        Name: 'ProviderDest',
        ProxyType: 'any',
        Authentication: authType
      };
      const parsedDestination = parseDestination(providerDest);
      await destinationCache.cacheRetrievedDestination(
        decodeJwt(providerServiceToken),
        parsedDestination,
        'tenant'
      );

      const actual = await getDestination({
        destinationName: 'ProviderDest',
        jwt: providerUserToken,
        useCache: true,
        isolationStrategy: 'tenant',
        selectionStrategy: alwaysProvider,
        cacheVerificationKeys: false
      });

      expect(actual).toEqual(parsedDestination);
    });

    it('should return cached provider destination from cache after checking for remote subscriber destination when subscriberFirst is specified and destinations are tenant isolated', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const authType = 'NoAuthentication' as AuthenticationType;
      const providerDest = {
        URL: 'https://provider.example',
        Name: 'ProviderDest',
        ProxyType: 'any',
        Authentication: authType
      };
      const parsedDestination = parseDestination(providerDest);
      await destinationCache.cacheRetrievedDestination(
        decodeJwt(providerUserToken),
        parsedDestination,
        'tenant'
      );

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(nock, [], 200, subscriberServiceToken)
      ];

      const actual = await getDestination({
        destinationName: 'ProviderDest',
        jwt: subscriberUserToken,
        useCache: true,
        isolationStrategy: 'tenant',
        selectionStrategy: subscriberFirst,
        cacheVerificationKeys: false
      });

      expect(actual).toEqual(parsedDestination);
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });
  });

  describe('caching without mocks', () => {
    it('should cache the destination correctly', async () => {
      const dummyJwt = { user_id: 'user', zid: 'tenant' };
      await destinationCache.cacheRetrievedDestination(
        dummyJwt,
        destinationOne,
        'tenant-user'
      );

      const actual1 = await destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        'tenant-user'
      );
      const actual2 = await destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        'tenant'
      );

      const expected = [destinationOne, undefined];

      expect([actual1, actual2]).toEqual(expected);
    });

    it("should not hit cache when 'tenant-user' is chosen but user id is missing", async () => {
      const dummyJwt = { zid: 'tenant' };
      await destinationCache.cacheRetrievedDestination(
        dummyJwt,
        destinationOne,
        'tenant-user'
      );

      const actual1 = await destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        'tenant'
      );
      const actual2 = await destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        'tenant-user'
      );

      const expected = [undefined, undefined];

      expect([actual1, actual2]).toEqual(expected);
    });

    it("should not hit cache when 'tenant' is chosen but tenant id is missing", async () => {
      const dummyJwt = { user_id: 'user' };
      await destinationCache.cacheRetrievedDestination(
        dummyJwt,
        destinationOne,
        'tenant'
      );
      const actual1 = await destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        'tenant'
      );
      const actual2 = await destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        'tenant-user'
      );

      const expected = [undefined, undefined];

      expect([actual1, actual2]).toEqual(expected);
    });

    it('should return undefined when the destination is expired with default expiration time', async () => {
      jest.useFakeTimers();
      const dummyJwt = { user_id: 'user', zid: 'tenant' };
      await destinationCache.cacheRetrievedDestination(
        dummyJwt,
        destinationOne,
        'tenant-user'
      );
      const minutesToExpire = 6;
      const actualBefore = await destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        'tenant-user'
      );
      expect(actualBefore).toBeDefined();

      jest.advanceTimersByTime(60000 * minutesToExpire);

      const actualAfter = await destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        'tenant-user'
      );

      expect(actualAfter).toBeUndefined();
    });

    it('should return undefined when the destination is expired with token defined expiration time', async () => {
      jest.useFakeTimers();
      const sixMinutesTokenLifetime = 6 * 60;
      const dummyJwt = { user_id: 'user', zid: 'tenant' };
      const destination = {
        ...destinationOne,
        authTokens: [
          {
            expiresIn: sixMinutesTokenLifetime.toString()
          } as DestinationAuthToken
        ]
      };
      await destinationCache.cacheRetrievedDestination(
        dummyJwt,
        destination,
        'tenant-user'
      );
      const retrieveDestination = () =>
        destinationCache.retrieveDestinationFromCache(
          dummyJwt,
          destination.name!,
          'tenant-user'
        );

      await expect(retrieveDestination()).resolves.toEqual(destination);

      jest.advanceTimersByTime(sixMinutesTokenLifetime * 1000 + 1);

      await expect(retrieveDestination()).resolves.toBeUndefined();
    });
  });

  describe('custom destination cache', () => {
    // Cache with expiration time
    const testCacheOne = new TestCache();
    // Setting the destinationCache with custom class instance
    it('custom cache overrides the default implementation', async () => {
      setDestinationCache(testCacheOne);

      const setSpy = jest.spyOn(testCacheOne, 'set');
      const getSpy = jest.spyOn(testCacheOne, 'get');
      const clearSpy = jest.spyOn(testCacheOne, 'clear');

      await destinationCache.cacheRetrievedDestination(
        { user_id: 'user', zid: 'tenant' },
        destinationOne,
        'tenant-user'
      );

      expect(setSpy).toHaveBeenCalled();

      const retrieveDestination = () =>
        destinationCache.retrieveDestinationFromCache(
          { user_id: 'user', zid: 'tenant' },
          'destToCache1',
          'tenant-user'
        );

      await expect(retrieveDestination()).resolves.toEqual(destinationOne);
      expect(getSpy).toHaveBeenCalled();

      await destinationCache.clear();
      expect(clearSpy).toHaveBeenCalled();
      await expect(retrieveDestination()).resolves.toBeUndefined();
    });
  });
});

describe('get destination cache key', () => {
  it("should shown warning, when 'tenant-user' is chosen, but user id is missing", () => {
    const logger = createLogger('destination-cache');
    const warn = jest.spyOn(logger, 'warn');

    getDestinationCacheKey({ zid: 'tenant' }, 'dest');
    expect(warn).toBeCalledWith(
      "Could not build destination cache key. Isolation strategy 'tenant-user' is used, but tenant id or user id is undefined in JWT."
    );
  });
});
