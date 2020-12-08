import { install } from '@sinonjs/fake-timers';
import nock from 'nock';
import { IsolationStrategy } from '../cache';
import { decodeJwt, wrapJwtInHeader } from '../jwt';
import {
  providerServiceToken,
  providerUserJwt,
  subscriberServiceToken,
  subscriberUserJwt,
  userApprovedProviderServiceToken
} from '../../../../test/test-util/mocked-access-tokens';
import {
  mockedConnectivityServiceProxyConfig,
  mockServiceBindings
} from '../../../../test/test-util/environment-mocks';
import {
  mockServiceToken,
  mockUserApprovedServiceToken
} from '../../../../test/test-util/token-accessor-mocks';
import {
  mockInstanceDestinationsCall,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../../../../test/test-util/destination-service-mocks';
import {
  certificateMultipleResponse,
  certificateSingleResponse,
  destinationName,
  oauthMultipleResponse,
  oauthSingleResponse,
  onPremiseMultipleResponse
} from '../../../../test/test-util/example-destination-service-responses';
import { destinationServiceCache } from './destination-service-cache';
import { getDestination } from './destination-accessor';
import {
  alwaysProvider,
  alwaysSubscriber,
  subscriberFirst
} from './destination-selection-strategies';
import { destinationCache } from './destination-cache';
import { AuthenticationType, Destination } from './destination-service-types';
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
    Authentication: 'NoAuthentification'
  };
  mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken);
  mockSubaccountDestinationsCall(nock, [dest], 200, subscriberServiceToken);
  mockInstanceDestinationsCall(nock, [], 200, providerServiceToken);
  mockSubaccountDestinationsCall(nock, [dest], 200, providerServiceToken);
}

describe('caching destination integraion tests', () => {
  afterEach(() => {
    destinationCache.clear();
    destinationServiceCache.clear();
    nock.cleanAll();
  });
  describe('test caching of retrieved entries', () => {
    beforeEach(() => {
      mockVerifyJwt();
      mockServiceBindings();
      mockServiceToken();

      const subscriberDest = {
        URL: 'https://subscriber.example',
        Name: 'SubscriberDest',
        ProxyType: 'any',
        Authentication: 'NoAuthentification'
      };
      const subscriberDest2 = {
        URL: 'https://subscriber2.example',
        Name: 'SubscriberDest2',
        ProxyType: 'any',
        Authentication: 'NoAuthentification'
      };
      const providerDest = {
        URL: 'https://provider.example',
        Name: 'ProviderDest',
        ProxyType: 'any',
        Authentication: 'NoAuthentification'
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

    it('retrieved subscriber destinations are cached with tenant id using "Tenant" isolation type by default ', async () => {
      await getDestination('SubscriberDest', {
        userJwt: subscriberUserJwt,
        useCache: true,
        cacheVerificationKeys: false
      });

      const c1 = getSubscriberCache(IsolationStrategy.Tenant);
      const c2 = getProviderCache(IsolationStrategy.Tenant);
      const c3 = getSubscriberCache(IsolationStrategy.User);
      const c4 = getProviderCache(IsolationStrategy.No_Isolation);
      const c5 = getSubscriberCache(IsolationStrategy.Tenant_User);

      expect(c1!.url).toBe('https://subscriber.example');
      expect(c2).toBeUndefined();
      expect(c3).toBeUndefined();
      expect(c4).toBeUndefined();
      expect(c5).toBeUndefined();
    });

    it('retrieved  provider destinations are cached using only destination name in "NoIsolation" type', async () => {
      const result = await getDestination('ProviderDest', {
        userJwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.No_Isolation,
        cacheVerificationKeys: false
      });

      const c1 = getSubscriberCache(IsolationStrategy.No_Isolation);
      const c2 = getProviderCache(IsolationStrategy.No_Isolation);
      const c3 = getSubscriberCache(IsolationStrategy.User);
      const c4 = getSubscriberCache(IsolationStrategy.Tenant);
      const c5 = getSubscriberCache(IsolationStrategy.Tenant_User);

      expect(c1).toBeUndefined();
      expect(c2!.url).toBe('https://provider.example');
      expect(c3).toBeUndefined();
      expect(c4).toBeUndefined();
      expect(c5).toBeUndefined();
    });

    it('caches only subscriber if the destination names are the same and subscriber first', async () => {
      mockDestinationsWithSameName();
      await getDestination('SubscriberDest', {
        userJwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant,
        cacheVerificationKeys: false
      });

      const c1 = getSubscriberCache(IsolationStrategy.Tenant);
      const c2 = getProviderCache(IsolationStrategy.Tenant);

      expect(c1!.url).toBe('https://subscriber.example');
      expect(c2).toBeUndefined();
    });

    it('caches only provider if selection strategy always provider', async () => {
      await getDestination('ProviderDest', {
        userJwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysProvider
      });

      const c1 = getSubscriberCache(IsolationStrategy.Tenant);
      const c2 = getProviderCache(IsolationStrategy.Tenant);

      expect(c1).toBeUndefined();
      expect(c2!.url).toBe('https://provider.example');
    });

    it('caches only subscriber if selection strategy always subscriber', async () => {
      mockVerifyJwt();
      await getDestination('SubscriberDest', {
        userJwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber
      });

      const c1 = getSubscriberCache(IsolationStrategy.Tenant);
      const c2 = getProviderCache(IsolationStrategy.Tenant);

      expect(c1!.url).toBe('https://subscriber.example');
      expect(c2).toBeUndefined();
    });

    it('caches nothing if the destination is not found', async () => {
      mockVerifyJwt();
      await getDestination('ANY', {
        userJwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber
      });

      const c1 = getSubscriberCache(IsolationStrategy.Tenant);
      const c2 = getProviderCache(IsolationStrategy.Tenant);

      expect(c1).toBeUndefined();
      expect(c2).toBeUndefined();
    });

    it('caches only the found destination not other ones received from the servie', async () => {
      mockVerifyJwt();
      await getDestination('SubscriberDest2', {
        userJwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber
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

  describe('caching of destinations with special information (e.g. authTokens, certificates)', () => {
    it('destinations with certificates are cached correctly', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockUserApprovedServiceToken();

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
        'ERNIE-UND-CERT',
        { useCache: true, userJwt: providerUserJwt }
      );
      const destinationFromCache = await getDestinationFromDestinationService(
        'ERNIE-UND-CERT',
        { useCache: true, userJwt: providerUserJwt }
      );

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
      mockUserApprovedServiceToken();

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
          wrapJwtInHeader(userApprovedProviderServiceToken).headers
        )
      ];

      const expected = parseDestination(oauthSingleResponse);
      const destinationFromService = await getDestination(destinationName, {
        userJwt: providerUserJwt,
        useCache: true
      });
      expect(destinationFromService).toMatchObject(expected);

      const retrieveFromCacheSpy = jest.spyOn(
        destinationCache,
        'retrieveDestinationFromCache'
      );

      const destinationFromCache = await getDestination(destinationName, {
        userJwt: providerUserJwt,
        useCache: true
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
      mockUserApprovedServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          onPremiseMultipleResponse,
          200,
          providerServiceToken
        )
      ];

      const retrieveFromCacheSpy = jest.spyOn(
        destinationCache,
        'retrieveDestinationFromCache'
      );

      const destinationFromFirstCall = await getDestinationFromDestinationService(
        'OnPremise',
        { useCache: true, userJwt: providerUserJwt }
      );
      const destinationFromCache = await getDestinationFromDestinationService(
        'OnPremise',
        { useCache: true, userJwt: providerUserJwt }
      );

      const expected = {
        ...parseDestination({
          Name: 'OnPremise',
          URL: 'my.on.premise.system:54321',
          ProxyType: 'OnPremise',
          Authentication: 'NoAuthentication'
        }),
        proxyConfiguration: {
          ...mockedConnectivityServiceProxyConfig,
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

      const authType = 'NoAuthentification' as AuthenticationType;
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
        IsolationStrategy.User
      );

      const actual = await getDestination('SubscriberDest', {
        userJwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.User,
        cacheVerificationKeys: false
      });

      expect(actual).toEqual(parsedDestination);
    });

    it('retrieves provider cached destination', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const authType = 'NoAuthentification' as AuthenticationType;
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
        IsolationStrategy.User
      );

      const actual = await getDestination('ProviderDest', {
        userJwt: providerUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.User,
        selectionStrategy: alwaysProvider,
        cacheVerificationKeys: false
      });

      expect(actual).toEqual(parsedDestination);
    });

    it('should return cached provider destination from cache after checking for remote subscriber destination when subscriberFirst is specified and destinations are Tenant isolated', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const authType = 'NoAuthentification' as AuthenticationType;
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

      const actual = await getDestination('ProviderDest', {
        userJwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.Tenant,
        selectionStrategy: subscriberFirst,
        cacheVerificationKeys: false
      });

      expect(actual).toEqual(parsedDestination);
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });
  });
});

describe('caching destination unit tests', () => {
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
