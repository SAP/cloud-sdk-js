import nock from 'nock';
import { Protocol } from '../../src/request-builder';
import {
  alwaysProvider,
  alwaysSubscriber,
  clientCredentialsTokenCache,
  destinationCache,
  IsolationStrategy,
  parseDestination,
  sanitizeDestination,
  subscriberFirst
} from '../../src/scp-cf';
import { getDestination, getDestinationFromDestinationService, useOrFetchDestination } from '../../src/scp-cf/destination-accessor';
import { AuthenticationType } from '../../src/scp-cf/destination-service-types';
import * as sdkJwt from '../../src/util/jwt';
// if I combined them, tslint would also complain
// tslint:disable-next-line: no-duplicate-imports
import { decodeJwt } from '../../src/util/jwt';
import { mockInstanceDestinationsCall, mockSingleDestinationCall, mockSubaccountDestinationsCall } from '../test-util/destination-service-mocks';
import { mockedConnectivityServiceProxyConfig, mockServiceBindings, mockXsuaaBinding } from '../test-util/environment-mocks';
import {
  basicMultipleResponse,
  certificateMultipleResponse,
  certificateSingleResponse,
  oauthMultipleResponse,
  oauthSingleResponse,
  onPremiseMultipleResponse
} from '../test-util/example-destination-service-responses';
import {
  providerServiceToken,
  providerUserJwt,
  subscriberServiceToken,
  subscriberUserJwt,
  userApprovedProviderServiceToken,
  userApprovedSubscriberServiceToken
} from '../test-util/mocked-access-tokens';
import { muteLoggers } from '../test-util/mute-logger';
import { mockServiceToken, mockUserApprovedServiceToken } from '../test-util/token-accessor-mocks';

const destinationName = 'FINAL-DESTINATION';

function mockEnvDestinations() {
  process.env['destinations'] = JSON.stringify(environmentDestinations);
}

const environmentDestinations = [
  {
    name: 'ErpQueryEndpoint',
    url: 'https://my.system.com',
    username: 'myuser',
    password: 'mypw'
  }
];

function mockVerifyJwt() {
  return jest.spyOn(sdkJwt, 'verifyJwt').mockImplementation(token => {
    return Promise.resolve(decodeJwt(token));
  });
}

afterEach(() => {
  delete process.env['VCAP_SERVICES'];
  delete process.env['destinations'];
  jest.restoreAllMocks();
  nock.cleanAll();
  clientCredentialsTokenCache.clear();
  destinationCache.clear();
});

describe('destination-accessor', () => {
  beforeAll(() => {
    muteLoggers('destination-accessor', 'proxy-util', 'jwt', 'environment-accessor');
  });

  describe('authentication type OAuth2SAMLBearerFlow', () => {
    it('returns a destination with authTokens if its authenticationType is OAuth2SAMLBearerFlow, subscriber tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockUserApprovedServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall([], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(oauthMultipleResponse, 200, subscriberServiceToken),
        mockInstanceDestinationsCall([], 200, providerServiceToken),
        mockSubaccountDestinationsCall([], 200, providerServiceToken),
        mockSingleDestinationCall(oauthSingleResponse, 200, destinationName, userApprovedSubscriberServiceToken)
      ];

      const expected = parseDestination(oauthSingleResponse);
      const actual = await getDestination(destinationName, { userJwt: subscriberUserJwt });
      expect(actual).toMatchObject(expected);
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(false));
    });

    it('returns a destination with authTokens if its authenticationType is OAuth2SAMLBearerFlow, provider tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockUserApprovedServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall(oauthMultipleResponse, 200, providerServiceToken),
        mockSubaccountDestinationsCall([], 200, providerServiceToken),
        mockSingleDestinationCall(oauthSingleResponse, 200, destinationName, userApprovedProviderServiceToken)
      ];

      const expected = parseDestination(oauthSingleResponse);
      const actual = await getDestination(destinationName, { userJwt: providerUserJwt, cacheVerificationKeys: false });

      expect(actual).toMatchObject(expected);
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });

    it('should use provider token first instead of the userJwt when SystemUser exists in destination', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const samlDestinationsWithSystemUser = { ...oauthMultipleResponse[0] };
      // insert SystemUser in the retrieved OAuth2SAMLBearer destination to trigger principle propagation workflow
      samlDestinationsWithSystemUser['SystemUser'] = 'defined';

      const httpMocks = [
        mockInstanceDestinationsCall([samlDestinationsWithSystemUser], 200, providerServiceToken),
        mockSubaccountDestinationsCall([], 200, providerServiceToken),
        mockSingleDestinationCall(oauthSingleResponse, 200, destinationName, providerServiceToken)
      ];

      const expected = parseDestination(oauthSingleResponse);
      const actual = await getDestination(destinationName, { cacheVerificationKeys: false });
      expect(actual).toMatchObject(expected);
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });
  });

  describe('authentication type ClientCertificateAuthentication', () => {
    it('returns a destination with certificates if the authentication type is ClientCertificateAuthentication, subscriber tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockUserApprovedServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall([], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(certificateMultipleResponse, 200, subscriberServiceToken),
        mockInstanceDestinationsCall([], 200, providerServiceToken),
        mockSubaccountDestinationsCall([], 200, providerServiceToken),
        mockSingleDestinationCall(certificateSingleResponse, 200, 'ERNIE-UND-CERT', subscriberServiceToken)
      ];

      const actual = await getDestination('ERNIE-UND-CERT', { userJwt: subscriberUserJwt, cacheVerificationKeys: false });
      expect(actual!.certificates!.length).toBe(1);
      expect(actual!.keyStoreName).toBe('key.p12');
      expect(actual!.keyStorePassword).toBe('password');
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });

    it('returns a destination with certificates if the authentication type is ClientCertificateAuthentication, provider tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockUserApprovedServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall([], 200, providerServiceToken),
        mockSubaccountDestinationsCall(certificateMultipleResponse, 200, providerServiceToken),
        mockSingleDestinationCall(certificateSingleResponse, 200, 'ERNIE-UND-CERT', providerServiceToken)
      ];

      const actual = await getDestination('ERNIE-UND-CERT', { cacheVerificationKeys: false });
      expect(actual!.certificates!.length).toBe(1);
      expect(actual!.keyStoreName).toBe('key.p12');
      expect(actual!.keyStorePassword).toBe('password');
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });
  });

  describe('BasicAuthentication', () => {
    beforeEach(() => {
      clientCredentialsTokenCache.clear();
    });

    it('returns a destination without authTokens if its authenticationType is Basic', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      const serviceTokenSpy = mockServiceToken();

      mockInstanceDestinationsCall([], 200, subscriberServiceToken);
      mockSubaccountDestinationsCall(basicMultipleResponse, 200, subscriberServiceToken);
      mockInstanceDestinationsCall([], 200, providerServiceToken);
      mockSubaccountDestinationsCall([], 200, providerServiceToken);

      const expected = parseDestination(basicMultipleResponse[0]);
      const actual = await getDestination(destinationName, { userJwt: subscriberServiceToken, cacheVerificationKeys: false });
      expect(actual).toMatchObject(expected);
      expect(serviceTokenSpy).toHaveBeenCalled();
    });

    it('retrieves destination without specifying userJwt', async () => {
      mockServiceBindings();
      mockServiceToken();

      mockInstanceDestinationsCall([], 200, providerServiceToken);
      mockSubaccountDestinationsCall(basicMultipleResponse, 200, providerServiceToken);

      const actual = await getDestination(destinationName, { cacheVerificationKeys: false });
      const expected = parseDestination(basicMultipleResponse[0]);
      expect(actual).toMatchObject(expected);
    });

    // test for ONEmds specific feature
    it('is possible to get a non-principal propagation destination by only providing the subdomain (iss) instead of the whole jwt', async () => {
      mockServiceBindings();
      mockServiceToken();

      mockInstanceDestinationsCall([], 200, subscriberServiceToken);
      mockSubaccountDestinationsCall(certificateMultipleResponse, 200, subscriberServiceToken);
      mockInstanceDestinationsCall([], 200, providerServiceToken);
      mockSubaccountDestinationsCall([], 200, providerServiceToken);

      mockSingleDestinationCall(certificateSingleResponse, 200, 'ERNIE-UND-CERT', subscriberServiceToken);

      const expected = parseDestination(certificateSingleResponse);
      const actual = await getDestinationFromDestinationService('ERNIE-UND-CERT', {
        iss: 'https://subscriber.example.com',
        cacheVerificationKeys: false
      });
      expect(actual).toMatchObject(expected);
    });
  });

  describe('Failure cases', () => {
    beforeEach(() => {
      clientCredentialsTokenCache.clear();
    });

    it('fails if no destination service is bound', async () => {
      process.env['VCAP_SERVICES'] = JSON.stringify({
        xsuaa: [mockXsuaaBinding]
      });

      try {
        await getDestination(destinationName, { userJwt: subscriberServiceToken, cacheVerificationKeys: false });
        fail();
      } catch (error) {
        expect(error.message).toBeDefined();
      }
    });

    it('throws an error when the provide userJwt is invalid', async () => {
      mockServiceBindings();
      mockVerifyJwt();

      try {
        await getDestination(destinationName, { userJwt: 'fails', cacheVerificationKeys: false });
        fail();
      } catch (error) {
        expect(error.message).toBe('JwtError: The given jwt payload does not encode valid JSON.');
      }
    });

    it('throws an error if the subaccount/instance destinations call fails', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall(
          {
            ErrorMessage: 'Unable to parse the JWT in Authorization Header.'
          },
          400,
          subscriberServiceToken
        ),
        mockSubaccountDestinationsCall(basicMultipleResponse, 200, subscriberServiceToken)
      ];

      try {
        await getDestination(destinationName, { userJwt: subscriberServiceToken, enableCircuitBreaker: false, cacheVerificationKeys: false });
        fail();
      } catch (error) {
        expect(error.message).toContain('Failed to fetch instance destinations');
        expect(error.stack).toContain('status code 400');
        httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
      }
    });

    it('returns an error if the single destination call fails for OAuth2SAMLBearerAssertion destinations', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockUserApprovedServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall([], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(oauthMultipleResponse, 200, subscriberServiceToken),
        mockInstanceDestinationsCall([], 200, providerServiceToken),
        mockSubaccountDestinationsCall([], 200, providerServiceToken),
        mockSingleDestinationCall(
          {
            ErrorMessage: 'Unable to parse the JWT in Authorization Header.'
          },
          401,
          destinationName,
          userApprovedSubscriberServiceToken
        )
      ];

      try {
        await getDestination(destinationName, { userJwt: subscriberUserJwt, enableCircuitBreaker: false, cacheVerificationKeys: false });
        fail();
      } catch (error) {
        expect(error instanceof Error).toBeTruthy();
        expect(error.message).toContain('Failed to fetch destination FINAL-DESTINATION');
        expect(error.stack).toContain('status code 401');
        httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
      }
    });

    it('returns null if no destinations are found', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall([], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall([], 200, subscriberServiceToken),
        mockInstanceDestinationsCall([], 200, providerServiceToken),
        mockSubaccountDestinationsCall([], 200, providerServiceToken)
      ];

      const expected = null;
      const actual = await getDestination(destinationName, { userJwt: subscriberUserJwt, cacheVerificationKeys: false });
      expect(actual).toEqual(expected);
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });

    it('should throw an error when neither userJwt nor SystemUser are defined', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall(oauthMultipleResponse, 200, providerServiceToken),
        mockSubaccountDestinationsCall([], 200, providerServiceToken)
      ];

      try {
        await getDestination(destinationName, { cacheVerificationKeys: false });
        fail();
      } catch (error) {
        expect(error.message).toEqual('The user jwt is undefined.');
        httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
      }
    });
  });

  describe('proxy configuration', () => {
    afterEach(() => {
      delete process.env['https_proxy'];
    });

    it('should take the enviorment varaible.', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockUserApprovedServiceToken();

      mockInstanceDestinationsCall([], 200, subscriberServiceToken);
      mockInstanceDestinationsCall([], 200, providerServiceToken);
      mockSubaccountDestinationsCall([], 200, providerServiceToken);

      mockSubaccountDestinationsCall(basicMultipleResponse, 200, subscriberServiceToken);
      mockSingleDestinationCall(basicMultipleResponse[0], 200, destinationName, subscriberServiceToken);
      process.env['https_proxy'] = 'some.proxy.com:1234';

      const actual = await getDestination(destinationName, { userJwt: subscriberServiceToken, cacheVerificationKeys: false });
      expect(actual?.proxyConfiguration).toEqual({ host: 'some.proxy.com', protocol: Protocol.HTTP, port: 1234 });
    });

    it('should ignore the proxy if the destination is onPrem type.', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockUserApprovedServiceToken();

      mockInstanceDestinationsCall(onPremiseMultipleResponse, 200, subscriberServiceToken);
      mockInstanceDestinationsCall([], 200, providerServiceToken);
      mockSubaccountDestinationsCall([], 200, providerServiceToken);
      mockSubaccountDestinationsCall([], 200, subscriberServiceToken);

      process.env['https_proxy'] = 'some.proxy.com:1234';
      const expected = {
        ...mockedConnectivityServiceProxyConfig,
        headers: {
          'Proxy-Authorization': `Bearer ${subscriberServiceToken}`,
          'SAP-Connectivity-Authentication': `Bearer ${subscriberServiceToken}`
        }
      };

      const actual = await getDestination('OnPremise', { userJwt: subscriberServiceToken, cacheVerificationKeys: false });
      expect(actual?.proxyConfiguration).toEqual(expected);
    });
  });

  describe('caching destination', () => {
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

        mockInstanceDestinationsCall([], 200, subscriberServiceToken);
        mockSubaccountDestinationsCall([subscriberDest], 200, subscriberServiceToken);
        mockInstanceDestinationsCall([], 200, providerServiceToken);
        mockSubaccountDestinationsCall([providerDest], 200, providerServiceToken);
      });

      it('retrieved provider and subscriber destinations are cached with tenant id using "Tenant" isolation type by default ', async () => {
        mockVerifyJwt();

        await getDestination('ANY', {
          userJwt: subscriberUserJwt,
          useCache: true,
          cacheVerificationKeys: false
        });

        const c1 = destinationCache.retrieveDestinationFromCache(decodedSubscriberJwt, 'SubscriberDest', IsolationStrategy.Tenant);
        const c2 = destinationCache.retrieveDestinationFromCache(decodedProviderJwt, 'ProviderDest', IsolationStrategy.Tenant);
        const c3 = destinationCache.retrieveDestinationFromCache(decodedSubscriberJwt, 'SubscriberDest', IsolationStrategy.User);
        const c4 = destinationCache.retrieveDestinationFromCache(decodedSubscriberJwt, 'SubscriberDest', IsolationStrategy.No_Isolation);
        const c5 = destinationCache.retrieveDestinationFromCache(decodedSubscriberJwt, 'SubscriberDest', IsolationStrategy.Tenant_User);

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

        const c1 = destinationCache.retrieveDestinationFromCache(decodedSubscriberJwt, 'SubscriberDest', IsolationStrategy.No_Isolation);
        const c2 = destinationCache.retrieveDestinationFromCache(decodedProviderJwt, 'ProviderDest', IsolationStrategy.No_Isolation);
        const c3 = destinationCache.retrieveDestinationFromCache(decodedSubscriberJwt, 'SubscriberDest', IsolationStrategy.User);
        const c4 = destinationCache.retrieveDestinationFromCache(decodedSubscriberJwt, 'SubscriberDest', IsolationStrategy.Tenant);
        const c5 = destinationCache.retrieveDestinationFromCache(decodedSubscriberJwt, 'SubscriberDest', IsolationStrategy.Tenant_User);

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
          mockInstanceDestinationsCall([], 200, providerServiceToken),
          mockSubaccountDestinationsCall(certificateMultipleResponse, 200, providerServiceToken),
          mockSingleDestinationCall(certificateSingleResponse, 200, 'ERNIE-UND-CERT', providerServiceToken)
        ];

        const retrieveFromCacheSpy = jest.spyOn(destinationCache, 'retrieveDestinationFromCache');

        const destinationFromService = await getDestinationFromDestinationService('ERNIE-UND-CERT', { useCache: true, userJwt: providerUserJwt });
        const destinationFromCache = await getDestinationFromDestinationService('ERNIE-UND-CERT', { useCache: true, userJwt: providerUserJwt });

        expect(destinationFromService).toEqual(parseDestination(certificateSingleResponse));
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
          mockInstanceDestinationsCall(oauthMultipleResponse, 200, providerServiceToken),
          mockSubaccountDestinationsCall([], 200, providerServiceToken),
          mockSingleDestinationCall(oauthSingleResponse, 200, destinationName, userApprovedProviderServiceToken)
        ];

        const expected = parseDestination(oauthSingleResponse);
        const destinationFromService = await getDestination(destinationName, { userJwt: providerUserJwt, useCache: true });
        expect(destinationFromService).toMatchObject(expected);

        const retrieveFromCacheSpy = jest.spyOn(destinationCache, 'retrieveDestinationFromCache');

        const destinationFromCache = await getDestination(destinationName, { userJwt: providerUserJwt, useCache: true });

        expect(destinationFromService).toEqual(parseDestination(oauthSingleResponse));
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
          mockInstanceDestinationsCall([], 200, providerServiceToken),
          mockSubaccountDestinationsCall(onPremiseMultipleResponse, 200, providerServiceToken)
        ];

        const retrieveFromCacheSpy = jest.spyOn(destinationCache, 'retrieveDestinationFromCache');

        const destinationFromFirstCall = await getDestinationFromDestinationService('OnPremise', { useCache: true, userJwt: providerUserJwt });
        const destinationFromCache = await getDestinationFromDestinationService('OnPremise', { useCache: true, userJwt: providerUserJwt });

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
        const subscriberDest = { URL: 'https://subscriber.example', Name: 'SubscriberDest', ProxyType: 'any', Authentication: authType };
        const parsedDestination = parseDestination(subscriberDest);
        // cache destination to retrieve
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
        const providerDest = { URL: 'https://provider.example', Name: 'ProviderDest', ProxyType: 'any', Authentication: authType };
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
        const providerDest = { URL: 'https://provider.example', Name: 'ProviderDest', ProxyType: 'any', Authentication: authType };
        const parsedDestination = parseDestination(providerDest);
        destinationCache.cacheRetrievedDestinations(
          decodeJwt(providerUserJwt),
          { instance: [parsedDestination], subaccount: [] },
          IsolationStrategy.Tenant
        );

        const httpMocks = [
          mockInstanceDestinationsCall([], 200, subscriberServiceToken),
          mockSubaccountDestinationsCall([], 200, subscriberServiceToken)
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

    describe('On-Premise destinations', () => {
      it('returns a destination with a proxy configuration when ProxyType equals "OnPremise"', async () => {
        mockServiceBindings();
        mockVerifyJwt();
        mockServiceToken();

        const httpMocks = [
          mockSubaccountDestinationsCall(onPremiseMultipleResponse, 200, subscriberServiceToken),
          mockInstanceDestinationsCall([], 200, providerServiceToken),
          mockSubaccountDestinationsCall([], 200, providerServiceToken),
          mockInstanceDestinationsCall([], 200, subscriberServiceToken)
        ];

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
              'Proxy-Authorization': `Bearer ${subscriberServiceToken}`,
              'SAP-Connectivity-Authentication': `Bearer ${subscriberUserJwt}`
            }
          }
        };
        const actual = await getDestination('OnPremise', { userJwt: subscriberUserJwt });
        expect(actual).toEqual(expected);
        httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
      });
    });

    describe('destination loading precedence', () => {
      it('reads from env when only destinationName specified', async () => {
        mockEnvDestinations();

        const expected = sanitizeDestination(environmentDestinations[0]);
        const actual = await useOrFetchDestination({ destinationName: 'ErpQueryEndpoint' }, { cacheVerificationKeys: false });
        expect(actual).toMatchObject(expected);
      });
    });

    describe('selection strategies', () => {
      it('should not send a request to retrieve remote provider destination when alwaysSubscriber applies', async () => {
        mockServiceBindings();
        mockVerifyJwt();
        mockServiceToken();

        const httpMocks = [
          mockInstanceDestinationsCall([], 200, subscriberServiceToken),
          mockSubaccountDestinationsCall(basicMultipleResponse, 200, subscriberServiceToken)
        ];

        const expected = parseDestination(basicMultipleResponse[0]);
        const actual = await getDestination(destinationName, {
          userJwt: subscriberUserJwt,
          selectionStrategy: alwaysSubscriber,
          cacheVerificationKeys: false
        });
        expect(actual).toMatchObject(expected);
        httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
      });

      it('should not send a request to retrieve remote subscriber destination when alwaysProvider applies', async () => {
        mockServiceBindings();
        mockVerifyJwt();
        mockServiceToken();

        const httpMocks = [
          mockInstanceDestinationsCall([], 200, providerServiceToken),
          mockSubaccountDestinationsCall(basicMultipleResponse, 200, providerServiceToken)
        ];

        const expected = parseDestination(basicMultipleResponse[0]);
        const actual = await getDestination(destinationName, {
          userJwt: providerUserJwt,
          selectionStrategy: alwaysProvider,
          cacheVerificationKeys: false
        });
        expect(actual).toMatchObject(expected);
        httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
      });
    });

    it('tries to build a destination from service bindings when there are no destinations mocked', async () => {
      const serviceBindings = {
        's4-hana-cloud': [
          {
            binding_name: null,
            credentials: {
              Authentication: 'BasicAuthentication',
              Password: '<redacted>',
              URL: 'https://my.system.com',
              User: 'adaa579f-3583-4812-a172-52a44194cb6f'
            },
            instance_name: 'instance-name',
            label: 'label',
            name: 'destination-name',
            plan: 'some-plan',
            provider: null,
            syslog_drain_url: null,
            tags: ['s4-hana-cloud'],
            volume_mounts: []
          }
        ]
      };

      process.env.VCAP_SERVICES = JSON.stringify(serviceBindings);

      const expectedXFS4cloud = {
        url: 'https://my.system.com',
        authentication: 'BasicAuthentication',
        username: 'adaa579f-3583-4812-a172-52a44194cb6f',
        password: '<redacted>'
      };

      expect(await useOrFetchDestination({ destinationName: 'destination-name' })).toEqual(expectedXFS4cloud);

      delete process.env.VCAP_SERVICES;
    });

    it('tries to fetch destinations normally when neither the destinations env variables is there nor a service binding exists for a given name', async () => {
      await expect(
        useOrFetchDestination({ destinationName: 'non-existent' }, { cacheVerificationKeys: false })
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });
});
