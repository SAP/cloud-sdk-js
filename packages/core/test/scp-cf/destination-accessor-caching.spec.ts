/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock from 'nock';
import { decodeJwt } from '../../src/util';
import {
  providerServiceToken,
  providerUserJwt,
  subscriberServiceToken,
  subscriberUserJwt,
  userApprovedProviderServiceToken
} from '../test-util/mocked-access-tokens';
import {
  mockedConnectivityServiceProxyConfig,
  mockServiceBindings
} from '../test-util/environment-mocks';
import {
  mockServiceToken,
  mockUserApprovedServiceToken
} from '../test-util/token-accessor-mocks';
import {
  mockInstanceDestinationsCall,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../test-util/destination-service-mocks';
import {
  alwaysProvider,
  AuthenticationType,
  destinationCache,
  getDestination,
  getDestinationFromDestinationService,
  IsolationStrategy,
  parseDestination,
  subscriberFirst
} from '../../src/scp-cf';
import {
  certificateMultipleResponse,
  certificateSingleResponse,
  destinationName,
  oauthMultipleResponse,
  oauthSingleResponse,
  onPremiseMultipleResponse
} from '../test-util/example-destination-service-responses';
import { muteLoggers } from '../test-util/mute-logger';

describe('caching destination', () => {
  beforeAll(() => {
    muteLoggers('destination-accessor', 'proxy-util');
  });

  afterEach(() => {
    destinationCache.clear();
  });
  describe('test caching of retrieved entries', () => {
    const decodedSubscriberJwt = decodeJwt(subscriberUserJwt);
    const decodedProviderJwt = decodeJwt(providerUserJwt);

    beforeEach(() => {
      mockServiceBindings();
      mockServiceToken();

      const subscriberDest = {
        URL: 'https://subscriber.example',
        Name: 'SubscriberDest',
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
        [subscriberDest],
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

    it('retrieved provider and subscriber destinations are cached with tenant id using "Tenant" isolation type by default ', async () => {
      mockVerifyJwt();

      await getDestination('ANY', {
        userJwt: subscriberUserJwt,
        useCache: true,
        cacheVerificationKeys: false
      });

      const c1 = destinationCache.retrieveDestinationFromCache(
        decodedSubscriberJwt,
        'SubscriberDest',
        IsolationStrategy.Tenant
      );
      const c2 = destinationCache.retrieveDestinationFromCache(
        decodedProviderJwt,
        'ProviderDest',
        IsolationStrategy.Tenant
      );
      const c3 = destinationCache.retrieveDestinationFromCache(
        decodedSubscriberJwt,
        'SubscriberDest',
        IsolationStrategy.User
      );
      const c4 = destinationCache.retrieveDestinationFromCache(
        decodedSubscriberJwt,
        'SubscriberDest',
        IsolationStrategy.No_Isolation
      );
      const c5 = destinationCache.retrieveDestinationFromCache(
        decodedSubscriberJwt,
        'SubscriberDest',
        IsolationStrategy.Tenant_User
      );

      expect(c1!.url).toBe('https://subscriber.example');
      expect(c2!.url).toBe('https://provider.example');

      expect(c3).toBeUndefined();
      expect(c4).toBeUndefined();
      expect(c5).toBeUndefined();
    });

    it('retrieved provider and subscriber destinations are cached using only destination name in "NoIsolation" type', async () => {
      mockVerifyJwt();

      await getDestination('ANY', {
        userJwt: subscriberUserJwt,
        useCache: true,
        isolationStrategy: IsolationStrategy.No_Isolation,
        cacheVerificationKeys: false
      });

      const c1 = destinationCache.retrieveDestinationFromCache(
        decodedSubscriberJwt,
        'SubscriberDest',
        IsolationStrategy.No_Isolation
      );
      const c2 = destinationCache.retrieveDestinationFromCache(
        decodedProviderJwt,
        'ProviderDest',
        IsolationStrategy.No_Isolation
      );
      const c3 = destinationCache.retrieveDestinationFromCache(
        decodedSubscriberJwt,
        'SubscriberDest',
        IsolationStrategy.User
      );
      const c4 = destinationCache.retrieveDestinationFromCache(
        decodedSubscriberJwt,
        'SubscriberDest',
        IsolationStrategy.Tenant
      );
      const c5 = destinationCache.retrieveDestinationFromCache(
        decodedSubscriberJwt,
        'SubscriberDest',
        IsolationStrategy.Tenant_User
      );

      expect(c1!.url).toBe('https://subscriber.example');
      expect(c2!.url).toBe('https://provider.example');

      expect(c3).toBeUndefined();
      expect(c4).toBeUndefined();
      expect(c5).toBeUndefined();
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
          providerServiceToken
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
          userApprovedProviderServiceToken
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
      destinationCache.cacheRetrievedDestinations(
        decodeJwt(subscriberUserJwt),
        { instance: [parsedDestination], subaccount: [] },
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
      destinationCache.cacheRetrievedDestinations(
        decodeJwt(providerServiceToken),
        { instance: [parsedDestination], subaccount: [] },
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
      destinationCache.cacheRetrievedDestinations(
        decodeJwt(providerUserJwt),
        { instance: [parsedDestination], subaccount: [] },
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
