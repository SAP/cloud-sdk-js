import nock from 'nock';
import { createLogger } from '@sap-cloud-sdk/util';
import {
  providerJwtBearerToken,
  providerServiceToken,
  providerUserJwt,
  providerUserPayload,
  subscriberServiceToken,
  subscriberUserJwt
} from '../../../../../test-resources/test/test-util/mocked-access-tokens';
import {
  connectivityProxyConfigMock,
  mockServiceBindings
} from '../../../../../test-resources/test/test-util/environment-mocks';
import {
  mockJwtBearerToken,
  mockServiceToken
} from '../../../../../test-resources/test/test-util/token-accessor-mocks';
import {
  mockInstanceDestinationsCall,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../../../../../test-resources/test/test-util/destination-service-mocks';
import {
  certificateMultipleResponse,
  certificateSingleResponse,
  destinationName,
  oauthMultipleResponse,
  oauthSingleResponse,
  onPremisePrincipalPropagationMultipleResponse
} from '../../../../../test-resources/test/test-util/example-destination-service-responses';
import { decodeJwt, wrapJwtInHeader } from '../jwt';
import { destinationServiceCache } from './destination-service-cache';
import { getDestination } from './destination-accessor';
import {
  alwaysProvider,
  alwaysSubscriber,
  subscriberFirst
} from './destination-selection-strategies';
import {
  destinationCache,
  getDestinationCacheKey,
  IsolationStrategy
} from './destination-cache';
import {
  AuthenticationType,
  Destination,
  DestinationAuthToken
} from './destination-service-types';
import { getDestinationFromDestinationService } from './destination-from-service';
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

function getSubscriberCache(
  isolationStrategy: IsolationStrategy,
  destName = 'SubscriberDest'
) {
  const decodedSubscriberJwt = decodeJwt(subscriberUserJwt);
  return destinationCache.retrieveDestinationFromCache(
    decodedSubscriberJwt,
    destName,
    isolationStrategy
  );
}
function getProviderCache(isolationStrategy: IsolationStrategy) {
  const decodedProviderJwt = decodeJwt(providerUserJwt);
  return destinationCache.retrieveDestinationFromCache(
    decodedProviderJwt,
    'ProviderDest',
    isolationStrategy
  );
}

function mockDestinationsWithSameName() {
  nock.cleanAll();

  mockServiceBindings();
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
  afterAll(() => {
    destinationCache.clear();
    destinationServiceCache.clear();
    nock.cleanAll();
  });

  beforeEach(() => {
    destinationCache.clear();
    destinationServiceCache.clear();
    nock.cleanAll();
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
        jwt: providerUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant_User,
        iasToXsuaaTokenExchange: false
      });
      const cacheKeys = Object.keys(
        (destinationCache.getCacheInstance() as any).cache
      );
      expect(cacheKeys[0]).toBe(
        getDestinationCacheKey(
          providerUserPayload,
          'ProviderDest',
          IsolationStrategy.Tenant_User
        )
      );
    });

    it('retrieved subscriber destinations are cached with tenant id using "Tenant_User" isolation type by default ', async () => {
      await getDestination({
        destinationName: 'SubscriberDest',
        jwt: subscriberUserJwt,
        useCache: true,
        cacheVerificationKeys: false,
        iasToXsuaaTokenExchange: false
      });

      const c1 = getSubscriberCache(IsolationStrategy.Tenant);
      const c2 = getProviderCache(IsolationStrategy.Tenant);
      const c5 = getSubscriberCache(IsolationStrategy.Tenant_User);
      const c6 = getProviderCache(IsolationStrategy.Tenant_User);

      expect(c1).toBeUndefined();
      expect(c2).toBeUndefined();
      expect(c5!.url).toBe('https://subscriber.example');
      expect(c6).toBeUndefined();
    });

    it('caches only subscriber if the destination names are the same and subscriber first', async () => {
      mockDestinationsWithSameName();
      await getDestination({
        destinationName: 'SubscriberDest',
        jwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant,
        cacheVerificationKeys: false,
        iasToXsuaaTokenExchange: false
      });

      const c1 = getSubscriberCache(IsolationStrategy.Tenant);
      const c2 = getProviderCache(IsolationStrategy.Tenant);

      expect(c1!.url).toBe('https://subscriber.example');
      expect(c2).toBeUndefined();
    });

    it('caches only provider if selection strategy always provider', async () => {
      await getDestination({
        destinationName: 'ProviderDest',
        jwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysProvider,
        iasToXsuaaTokenExchange: false
      });

      const c1 = getSubscriberCache(IsolationStrategy.Tenant);
      const c2 = getProviderCache(IsolationStrategy.Tenant);

      expect(c1).toBeUndefined();
      expect(c2!.url).toBe('https://provider.example');
    });

    it('caches only subscriber if selection strategy always subscriber', async () => {
      mockVerifyJwt();
      await getDestination({
        destinationName: 'SubscriberDest',
        jwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber,
        iasToXsuaaTokenExchange: false
      });

      const c1 = getSubscriberCache(IsolationStrategy.Tenant);
      const c2 = getProviderCache(IsolationStrategy.Tenant);

      expect(c1!.url).toBe('https://subscriber.example');
      expect(c2).toBeUndefined();
    });

    it('caches nothing if the destination is not found', async () => {
      mockVerifyJwt();
      await getDestination({
        destinationName: 'ANY',
        jwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber,
        iasToXsuaaTokenExchange: false
      });

      const c1 = getSubscriberCache(IsolationStrategy.Tenant);
      const c2 = getProviderCache(IsolationStrategy.Tenant);

      expect(c1).toBeUndefined();
      expect(c2).toBeUndefined();
    });

    it('caches only the found destination not other ones received from the service', async () => {
      mockVerifyJwt();
      await getDestination({
        destinationName: 'SubscriberDest2',
        jwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber,
        iasToXsuaaTokenExchange: false
      });

      const c1 = getSubscriberCache(IsolationStrategy.Tenant, 'SubscriberDest');
      const c2 = getSubscriberCache(
        IsolationStrategy.Tenant,
        'SubscriberDest2'
      );

      expect(c1).toBeUndefined();
      expect(c2!.url).toBe('https://subscriber2.example');
    });
  });

  describe('caching options', () => {
    beforeEach(() => {
      mockServiceBindings();
      mockServiceToken();
      mockVerifyJwt();
    });

    const destName = destinationOne.name!;

    it('disables the cache per default', async () => {
      destinationCache.cacheRetrievedDestination(
        { user_id: 'user', zid: 'tenant' },
        destinationOne,
        IsolationStrategy.Tenant
      );
      await expect(
        getDestination({ destinationName: destName })
      ).rejects.toThrowError(/Failed to fetch \w+ destinations./);
    });

    it('uses cache with isolation strategy Tenant if not JWT is provided', async () => {
      destinationCache.cacheRetrievedDestination(
        decodeJwt(providerServiceToken),
        destinationOne,
        IsolationStrategy.Tenant
      );
      const actual = await getDestination({
        destinationName: destName,
        useCache: true
      });
      expect(actual).toEqual(destinationOne);
    });

    it('uses cache with isolation strategy UserTenant if JWT is provided', async () => {
      destinationCache.cacheRetrievedDestination(
        decodeJwt(subscriberUserJwt),
        destinationOne,
        IsolationStrategy.Tenant_User
      );
      const actual = await getDestination({
        destinationName: destName,
        useCache: true,
        jwt: subscriberUserJwt,
        iasToXsuaaTokenExchange: false
      });
      expect(actual).toEqual(destinationOne);
    });

    it('enables cache if isolation strategy Tenant is provided', async () => {
      destinationCache.cacheRetrievedDestination(
        decodeJwt(providerServiceToken),
        destinationOne,
        IsolationStrategy.Tenant
      );
      const actual = await getDestination({
        destinationName: destName,
        isolationStrategy: IsolationStrategy.Tenant,
        iasToXsuaaTokenExchange: false
      });
      expect(actual).toEqual(destinationOne);
    });
    it('enables cache if isolation strategy TenantUser is provided', async () => {
      destinationCache.cacheRetrievedDestination(
        decodeJwt(subscriberUserJwt),
        destinationOne,
        IsolationStrategy.Tenant_User
      );
      const actual = await getDestination({
        destinationName: destName,
        isolationStrategy: IsolationStrategy.Tenant_User,
        jwt: subscriberUserJwt,
        iasToXsuaaTokenExchange: false
      });
      expect(actual).toEqual(destinationOne);
    });

    it('ignores cache if isolation requires user JWT but the JWT is not provided', async () => {
      const logger = createLogger('destination-cache');
      const warn = jest.spyOn(logger, 'warn');

      destinationCache.cacheRetrievedDestination(
        decodeJwt(subscriberUserJwt),
        destinationOne,
        IsolationStrategy.Tenant_User
      );
      await expect(
        getDestination({
          destinationName: destName,
          isolationStrategy: IsolationStrategy.Tenant_User,
          jwt: subscriberServiceToken,
          iasToXsuaaTokenExchange: false
        })
      ).rejects.toThrowError(/Failed to fetch instance destinations./);
      expect(warn).toBeCalledWith(
        'Cannot get cache key. Isolation strategy TenantUser is used, but tenant id or user id is undefined.'
      );
    });
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
          jwt: providerUserJwt,
          iasToXsuaaTokenExchange: false
        }
      );
      const destinationFromCache = await getDestinationFromDestinationService({
        destinationName: 'ERNIE-UND-CERT',
        useCache: true,
        jwt: providerUserJwt,
        iasToXsuaaTokenExchange: false
      });

      expect(destinationFromService).toEqual(
        parseDestination(certificateSingleResponse)
      );
      expect(destinationFromCache).toEqual(destinationFromService);
      expect(retrieveFromCacheSpy).toHaveReturnedWith(destinationFromCache);
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
          wrapJwtInHeader(providerJwtBearerToken).headers
        )
      ];

      const expected = parseDestination(oauthSingleResponse);
      const destinationFromService = await getDestination({
        destinationName,
        jwt: providerUserJwt,
        useCache: true,
        iasToXsuaaTokenExchange: false
      });
      expect(destinationFromService).toMatchObject(expected);

      const retrieveFromCacheSpy = jest.spyOn(
        destinationCache,
        'retrieveDestinationFromCache'
      );

      const destinationFromCache = await getDestination({
        destinationName,
        jwt: providerUserJwt,
        useCache: true,
        iasToXsuaaTokenExchange: false
      });

      expect(destinationFromService).toEqual(
        parseDestination(oauthSingleResponse)
      );
      expect(destinationFromCache).toEqual(destinationFromService);
      expect(retrieveFromCacheSpy).toHaveReturnedWith(destinationFromCache);
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });

    it('destinations with proxy configuration are cached correctly', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          onPremisePrincipalPropagationMultipleResponse,
          200,
          providerServiceToken
        )
      ];

      const retrieveFromCacheSpy = jest.spyOn(
        destinationCache,
        'retrieveDestinationFromCache'
      );

      const destinationFromFirstCall =
        await getDestinationFromDestinationService({
          destinationName: 'OnPremise',
          useCache: true,
          jwt: providerUserJwt,
          iasToXsuaaTokenExchange: false
        });
      const destinationFromCache = await getDestinationFromDestinationService({
        destinationName: 'OnPremise',
        useCache: true,
        jwt: providerUserJwt,
        iasToXsuaaTokenExchange: false
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
            'SAP-Connectivity-Authentication': `Bearer ${providerUserJwt}`
          }
        }
      };

      expect(destinationFromFirstCall).toEqual(expected);
      expect(destinationFromCache).toEqual(destinationFromFirstCall);
      expect(retrieveFromCacheSpy).toHaveReturnedWith(destinationFromCache);
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });

    it('retrieves subscriber cached destination', async () => {
      mockServiceBindings();
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
      destinationCache.cacheRetrievedDestination(
        decodeJwt(subscriberUserJwt),
        parsedDestination,
        IsolationStrategy.Tenant_User
      );

      const actual = await getDestination({
        destinationName: 'SubscriberDest',
        jwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant_User,
        cacheVerificationKeys: false,
        iasToXsuaaTokenExchange: false
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
      destinationCache.cacheRetrievedDestination(
        decodeJwt(providerServiceToken),
        parsedDestination,
        IsolationStrategy.Tenant
      );

      const actual = await getDestination({
        destinationName: 'ProviderDest',
        jwt: providerUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant,
        selectionStrategy: alwaysProvider,
        cacheVerificationKeys: false,
        iasToXsuaaTokenExchange: false
      });

      expect(actual).toEqual(parsedDestination);
    });

    it('should return cached provider destination from cache after checking for remote subscriber destination when subscriberFirst is specified and destinations are Tenant isolated', async () => {
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
      destinationCache.cacheRetrievedDestination(
        decodeJwt(providerUserJwt),
        parsedDestination,
        IsolationStrategy.Tenant
      );

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(nock, [], 200, subscriberServiceToken)
      ];

      const actual = await getDestination({
        destinationName: 'ProviderDest',
        jwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant,
        selectionStrategy: subscriberFirst,
        cacheVerificationKeys: false,
        iasToXsuaaTokenExchange: false
      });

      expect(actual).toEqual(parsedDestination);
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });
  });

  describe('caching without mocs', () => {
    it('should cache the destination correctly', () => {
      const dummyJwt = { user_id: 'user', zid: 'tenant' };
      destinationCache.cacheRetrievedDestination(
        dummyJwt,
        destinationOne,
        IsolationStrategy.Tenant_User
      );

      const actual1 = destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        IsolationStrategy.Tenant_User
      );
      const actual2 = destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        IsolationStrategy.Tenant
      );

      const expected = [destinationOne, undefined];

      expect([actual1, actual2]).toEqual(expected);
    });

    it('should not hit cache when Tenant_User is chosen but user id is missing', () => {
      const dummyJwt = { zid: 'tenant' };
      destinationCache.cacheRetrievedDestination(
        dummyJwt,
        destinationOne,
        IsolationStrategy.Tenant_User
      );

      const actual1 = destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        IsolationStrategy.Tenant
      );
      const actual2 = destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        IsolationStrategy.Tenant_User
      );

      const expected = [undefined, undefined];

      expect([actual1, actual2]).toEqual(expected);
    });

    it('should not hit cache when Tenant is chosen but tenant id is missing', () => {
      const dummyJwt = { user_id: 'user' };
      destinationCache.cacheRetrievedDestination(
        dummyJwt,
        destinationOne,
        IsolationStrategy.Tenant
      );
      const actual1 = destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        IsolationStrategy.Tenant
      );
      const actual2 = destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        IsolationStrategy.Tenant_User
      );

      const expected = [undefined, undefined];

      expect([actual1, actual2]).toEqual(expected);
    });

    it('should return undefined when the destination is not valid', () => {
      jest.useFakeTimers('modern');
      const dummyJwt = { user_id: 'user', zid: 'tenant' };
      destinationCache.cacheRetrievedDestination(
        dummyJwt,
        destinationOne,
        IsolationStrategy.Tenant_User
      );
      const minutesToExpire = 6;
      jest.advanceTimersByTime(60000 * minutesToExpire);

      const actual = destinationCache.retrieveDestinationFromCache(
        dummyJwt,
        'destToCache1',
        IsolationStrategy.Tenant_User
      );

      expect(actual).toBeUndefined();
    });

    it('should return undefined when the destination is not valid and has an auth token expiration time', () => {
      jest.useFakeTimers('modern');
      const dummyJwt = { user_id: 'user', zid: 'tenant' };
      const destination = {
        ...destinationOne,
        authTokens: [{ expiresIn: '60' } as DestinationAuthToken]
      };
      destinationCache.cacheRetrievedDestination(
        dummyJwt,
        destination,
        IsolationStrategy.Tenant_User
      );
      const retrieveDestination = () =>
        destinationCache.retrieveDestinationFromCache(
          dummyJwt,
          destination.name!,
          IsolationStrategy.Tenant_User
        );

      expect(retrieveDestination()).toEqual(destination);

      const minutesToExpire = 2;
      jest.advanceTimersByTime(60000 * minutesToExpire);

      expect(retrieveDestination()).toBeUndefined();
    });
  });
});

describe('get destination cache key', () => {
  it('should shown warning, when Tenant_User is chosen, but user id is missing', () => {
    const logger = createLogger('destination-cache');
    const warn = jest.spyOn(logger, 'warn');

    getDestinationCacheKey({ zid: 'tenant' }, 'dest');
    expect(warn).toBeCalledWith(
      'Cannot get cache key. Isolation strategy TenantUser is used, but tenant id or user id is undefined.'
    );
  });
});
