import nock from 'nock';
import {
  mockServiceBindings,
  onlyIssuerXsuaaUrl,
  TestTenants
} from '../../../../../test-resources/test/test-util/environment-mocks';
import {
  expectAllMocksUsed,
  mockJwtBearerToken,
  mockServiceToken
} from '../../../../../test-resources/test/test-util/token-accessor-mocks';
import {
  mockSingleDestinationCall,
  mockSingleDestinationCallSkipCredentials,
  mockVerifyJwt
} from '../../../../../test-resources/test/test-util/destination-service-mocks';
import {
  iasToken,
  onlyIssuerServiceToken,
  providerJwtBearerToken,
  providerServiceToken,
  providerUserJwt,
  subscriberServiceToken,
  subscriberUserJwt
} from '../../../../../test-resources/test/test-util/mocked-access-tokens';
import {
  basicMultipleResponse,
  certificateSingleResponse,
  destinationName,
  oauthClientCredentialsSingleResponse,
  oauthJwtBearerSingleResponse,
  oauthMultipleResponse,
  oauthPasswordSingleResponse,
  oauthSingleResponse,
  oauthUserTokenExchangeSingleResponse,
  onPremiseBasicSingleResponse,
  onPremisePrincipalPropagationSingleResponse
} from '../../../../../test-resources/test/test-util/example-destination-service-responses';
import { clientCredentialsTokenCache } from '../client-credentials-token-cache';
import { wrapJwtInHeader } from '../jwt';
import * as identityService from '../identity-service';
import { DestinationJson, parseDestination } from './destination';
import { getDestination } from './destination-accessor';
import { destinationCache } from './destination-cache';
import {
  alwaysProvider,
  alwaysSubscriber
} from './destination-selection-strategies';

describe('authentication types', () => {
  afterEach(() => {
    clientCredentialsTokenCache.clear();
    destinationCache.clear();
  });

  describe('authentication type OAuth2SAMLBearerFlow', () => {
    it('returns a single destination', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const expected: DestinationJson = {
        owner: {
          SubaccountId: 'AF4E906A-2A16-4EB6-BD1E-4C420AC4C8EC',
          InstanceId: '467971F0-F4E5-4E6E-9436-2E705EEA5CA3'
        },
        destinationConfiguration: {
          Name: 'FINAL-DESTINATION',
          Type: 'HTTP',
          URL: 'http://example.com/foobar',
          Authentication: 'NoAuthentication',
          ProxyType: 'Internet'
        }
      };

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          expected,
          'FINAL-DESTINATION'
        )
      ];

      const actual = await getDestination({
        destinationName,
        jwt: iasToken,
        iasToXsuaaTokenExchange: false
      });

      expect(actual).toMatchObject(parseDestination(expected));
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination with authTokens if its authenticationType is OAuth2SAMLBearerFlow, subscriber tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      jest
        .spyOn(identityService, 'exchangeToken')
        .mockImplementationOnce(() => Promise.resolve(subscriberUserJwt));

      const httpMocks = [
        mockSingleDestinationCall(
          nock,
          oauthSingleResponse,
          200,
          destinationName,
          {
            ...wrapJwtInHeader(subscriberServiceToken).headers,
            'X-user-token': subscriberUserJwt
          },
          { badheaders: [] }
        ),
        mockSingleDestinationCallSkipCredentials(
          nock,
          oauthSingleResponse,
          destinationName
        )
      ];

      const expected = parseDestination(oauthSingleResponse);
      const actual = await getDestination({
        destinationName,
        jwt: iasToken
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination with authTokens if its authenticationType is OAuth2SAMLBearerFlow, provider tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      jest
        .spyOn(identityService, 'exchangeToken')
        .mockImplementationOnce(() => Promise.resolve(providerUserJwt));

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          oauthSingleResponse,
          destinationName
        ),
        mockSingleDestinationCall(
          nock,
          oauthSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(providerJwtBearerToken).headers
        )
      ];

      const expected = parseDestination(oauthSingleResponse);
      const actual = await getDestination({
        destinationName,
        jwt: iasToken,
        cacheVerificationKeys: false
      });

      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('should use provider client credentials token for SystemUser exists in provider destination', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const samlDestinationsWithSystemUser = { ...oauthMultipleResponse[0] };
      // Insert SystemUser in the retrieved OAuth2SAMLBearer destination to trigger principle propagation workflow
      samlDestinationsWithSystemUser['SystemUser'] = 'defined';

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          samlDestinationsWithSystemUser,
          'FINAL-DESTINATION'
        ),
        // This single destination call is the one triggered by the OAuth2SAMLBearerAssertion flow
        mockSingleDestinationCall(
          nock,
          oauthSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(providerServiceToken).headers
        )
      ];

      const expected = parseDestination(oauthSingleResponse);
      const actual = await getDestination({
        destinationName,
        cacheVerificationKeys: false
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('should use subscriber client credentials token for SystemUser exists in subscriber destination', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      jest
        .spyOn(identityService, 'exchangeToken')
        .mockImplementationOnce(() => Promise.resolve(subscriberUserJwt));

      const samlDestinationsWithSystemUser = { ...oauthMultipleResponse[0] };
      // Insert SystemUser in the retrieved OAuth2SAMLBearer destination to trigger principle propagation workflow
      samlDestinationsWithSystemUser['SystemUser'] = 'defined';

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          samlDestinationsWithSystemUser,
          destinationName
        ),
        // This single destination call is the one triggered by the OAuth2SAMLBearerAssertion flow
        mockSingleDestinationCall(
          nock,
          oauthSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(subscriberServiceToken).headers
        )
      ];

      const expected = parseDestination(oauthSingleResponse);
      const actual = await getDestination({
        destinationName,
        cacheVerificationKeys: false,
        jwt: iasToken
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type OAuth2ClientCredentials', () => {
    it('returns a destination with authTokens if its authenticationType is OAuth2ClientCredentials, subscriber tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      jest
        .spyOn(identityService, 'exchangeToken')
        .mockImplementationOnce(() => Promise.resolve(subscriberUserJwt));

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          oauthClientCredentialsSingleResponse,
          destinationName,
          wrapJwtInHeader(subscriberServiceToken)
        ),
        mockSingleDestinationCall(
          nock,
          oauthClientCredentialsSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(subscriberServiceToken).headers
        )
      ];

      const expected = parseDestination(oauthClientCredentialsSingleResponse);
      const actual = await getDestination({
        destinationName,
        jwt: iasToken
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination with authTokens if its authenticationType is OAuth2ClientCredentials, provider tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          oauthClientCredentialsSingleResponse,
          destinationName,
          wrapJwtInHeader(providerServiceToken)
        ),
        mockSingleDestinationCall(
          nock,
          oauthClientCredentialsSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(providerServiceToken).headers
        )
      ];
      const expected = parseDestination(oauthClientCredentialsSingleResponse);
      const actual = await getDestination({ destinationName });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination with authTokens if its authenticationType is OAuth2ClientCredentials, tokenServiceUrlType common and sets X-token header.', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const withTokenServiceType = {
        ...oauthClientCredentialsSingleResponse,
        tokenServiceURLType: 'Common'
      };

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          undefined,
          destinationName,
          { ...wrapJwtInHeader(subscriberServiceToken), responseCode: 404 }
        ),
        mockSingleDestinationCallSkipCredentials(
          nock,
          withTokenServiceType,
          destinationName,
          wrapJwtInHeader(providerServiceToken)
        ),
        mockSingleDestinationCall(
          nock,
          withTokenServiceType,
          200,
          destinationName,
          {
            ...wrapJwtInHeader(providerServiceToken).headers,
            'X-tenant': TestTenants.SUBSCRIBER
          },
          { badheaders: [] }
        )
      ];

      const expected = parseDestination(oauthClientCredentialsSingleResponse);
      const actual = await getDestination({
        destinationName,
        jwt: subscriberUserJwt,
        iasToXsuaaTokenExchange: false
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type OAuth2JWTBearer', () => {
    it('should use provider service token subscriber x-user-token for provider destination and subscriber jwt', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(nock, {}, destinationName, {
          ...wrapJwtInHeader(subscriberServiceToken),
          responseCode: 404
        }),
        mockSingleDestinationCallSkipCredentials(
          nock,
          oauthJwtBearerSingleResponse,
          destinationName,
          wrapJwtInHeader(providerServiceToken)
        ),
        mockSingleDestinationCall(
          nock,
          oauthJwtBearerSingleResponse,
          200,
          destinationName,
          {
            ...wrapJwtInHeader(providerServiceToken).headers,
            'x-user-token': subscriberUserJwt
          },
          { badheaders: [] }
        )
      ];

      const expected = parseDestination(oauthJwtBearerSingleResponse);
      const actual = await getDestination({
        destinationName,
        jwt: subscriberUserJwt,
        iasToXsuaaTokenExchange: false
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type OAuth2UserTokenExchange', () => {
    it('should use the userApprovedProviderServiceToken as auth header and no exchange header for provider destination and provider jwt', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      jest
        .spyOn(identityService, 'exchangeToken')
        .mockImplementationOnce(() => Promise.resolve(providerUserJwt));

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          oauthUserTokenExchangeSingleResponse,
          destinationName,
          wrapJwtInHeader(providerServiceToken)
        ),
        mockSingleDestinationCall(
          nock,
          oauthUserTokenExchangeSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(providerJwtBearerToken).headers
        )
      ];

      const expected = parseDestination(oauthUserTokenExchangeSingleResponse);
      const actual = await getDestination({
        destinationName,
        jwt: iasToken
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('should use the provider access token as auth header and subscriber jwt as exchange header for provider destination and provider jwt', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      jest
        .spyOn(identityService, 'exchangeToken')
        .mockImplementationOnce(() => Promise.resolve(subscriberUserJwt));

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          oauthUserTokenExchangeSingleResponse,
          destinationName,
          wrapJwtInHeader(providerServiceToken)
        ),
        mockSingleDestinationCall(
          nock,
          oauthUserTokenExchangeSingleResponse,
          200,
          destinationName,
          {
            ...wrapJwtInHeader(providerServiceToken).headers,
            'X-user-token': subscriberUserJwt
          },
          { badheaders: [] }
        )
      ];

      const expected = parseDestination(oauthUserTokenExchangeSingleResponse);
      const actual = await getDestination({
        destinationName,
        selectionStrategy: alwaysProvider,
        jwt: iasToken
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('should use the subscriber access token as auth header and subscriber jwt as exchange header for provider destination and provider jwt', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      jest
        .spyOn(identityService, 'exchangeToken')
        .mockImplementationOnce(() => Promise.resolve(subscriberUserJwt));

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          oauthUserTokenExchangeSingleResponse,
          destinationName,
          wrapJwtInHeader(subscriberServiceToken)
        ),
        mockSingleDestinationCall(
          nock,
          oauthUserTokenExchangeSingleResponse,
          200,
          destinationName,
          {
            ...wrapJwtInHeader(subscriberServiceToken).headers,
            'X-user-token': subscriberUserJwt
          },
          { badheaders: [] }
        )
      ];

      const expected = parseDestination(oauthUserTokenExchangeSingleResponse);
      const actual = await getDestination({
        destinationName,
        selectionStrategy: alwaysSubscriber,
        jwt: iasToken
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type ClientCertificateAuthentication', () => {
    it('returns a destination with certificates if the authentication type is ClientCertificateAuthentication, subscriber tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      jest
        .spyOn(identityService, 'exchangeToken')
        .mockImplementationOnce(() => Promise.resolve(subscriberUserJwt));

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          certificateSingleResponse,
          'ERNIE-UND-CERT',
          wrapJwtInHeader(subscriberServiceToken)
        ),
        mockSingleDestinationCall(
          nock,
          certificateSingleResponse,
          200,
          'ERNIE-UND-CERT',
          wrapJwtInHeader(subscriberServiceToken).headers
        )
      ];

      const actual = await getDestination({
        destinationName: 'ERNIE-UND-CERT',
        jwt: iasToken,
        cacheVerificationKeys: false
      });
      expect(actual!.certificates!.length).toBe(1);
      expect(actual!.keyStoreName).toBe('key.p12');
      expect(actual!.keyStorePassword).toBe('password');
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination with certificates if the authentication type is ClientCertificateAuthentication, provider tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          certificateSingleResponse,
          'ERNIE-UND-CERT',
          wrapJwtInHeader(providerServiceToken)
        ),
        mockSingleDestinationCall(
          nock,
          certificateSingleResponse,
          200,
          'ERNIE-UND-CERT',
          wrapJwtInHeader(providerServiceToken).headers
        )
      ];

      const actual = await getDestination({
        destinationName: 'ERNIE-UND-CERT',
        cacheVerificationKeys: false
      });
      expect(actual!.certificates!.length).toBe(1);
      expect(actual!.keyStoreName).toBe('key.p12');
      expect(actual!.keyStorePassword).toBe('password');
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type BasicAuthentication', () => {
    beforeEach(() => {
      clientCredentialsTokenCache.clear();
    });

    it('returns a destination with OnPrem connectivity and basic auth', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      jest
        .spyOn(identityService, 'exchangeToken')
        .mockImplementationOnce(() => Promise.resolve(subscriberUserJwt));

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          onPremiseBasicSingleResponse,
          'OnPremise',
          wrapJwtInHeader(subscriberServiceToken)
        )
      ];

      const actual = await getDestination({
        destinationName: 'OnPremise',
        jwt: iasToken,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber
      });
      expect(actual?.proxyConfiguration).toMatchObject({
        host: 'proxy.example.com',
        port: 12345,
        protocol: 'http',
        headers: { 'Proxy-Authorization': expect.stringMatching(/Bearer.*/) }
      });
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination without authTokens if its authenticationType is Basic', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      const serviceTokenSpy = mockServiceToken();

      jest
        .spyOn(identityService, 'exchangeToken')
        .mockImplementationOnce(() => Promise.resolve(subscriberUserJwt));

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          basicMultipleResponse[0],
          destinationName,
          { ...wrapJwtInHeader(subscriberServiceToken), responseCode: 404 }
        ),
        mockSingleDestinationCallSkipCredentials(
          nock,
          basicMultipleResponse[0],
          destinationName,
          wrapJwtInHeader(providerServiceToken)
        )
      ];

      const expected = parseDestination(basicMultipleResponse[0]);
      const actual = await getDestination({
        destinationName,
        jwt: iasToken,
        cacheVerificationKeys: false
      });
      expect(actual).toMatchObject(expected);
      expect(serviceTokenSpy).toHaveBeenCalled();
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type Principal Propagation', () => {
    it('returns a destination with onPrem connectivity and principal propagation', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      jest
        .spyOn(identityService, 'exchangeToken')
        .mockImplementationOnce(() => Promise.resolve(subscriberUserJwt));

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          onPremisePrincipalPropagationSingleResponse,
          'OnPremise',
          wrapJwtInHeader(subscriberServiceToken)
        )
      ];

      const actual = await getDestination({
        destinationName: 'OnPremise',
        jwt: iasToken,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber
      });
      expect(actual?.proxyConfiguration).toMatchObject({
        host: 'proxy.example.com',
        port: 12345,
        protocol: 'http',
        headers: {
          'Proxy-Authorization': expect.stringMatching(/Bearer.*/),
          'SAP-Connectivity-Authentication': expect.stringMatching(/Bearer.*/)
        }
      });
      expectAllMocksUsed(httpMocks);
    });

    it('fails for Principal Propagation and no user JWT', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          onPremisePrincipalPropagationSingleResponse,
          'OnPremise',
          wrapJwtInHeader(providerServiceToken)
        )
      ];

      await expect(
        getDestination({ destinationName: 'OnPremise' })
      ).rejects.toThrowError('For principal propagation a user JWT is needed.');
      expectAllMocksUsed(httpMocks);
    });

    it('fails for Principal Propagation and issuer JWT', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          onPremisePrincipalPropagationSingleResponse,
          'OnPremise',
          wrapJwtInHeader(onlyIssuerServiceToken)
        )
      ];

      await expect(
        getDestination({
          destinationName: 'OnPremise',
          iss: onlyIssuerXsuaaUrl
        })
      ).rejects.toThrowError('For principal propagation a user JWT is needed.');
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('autehntication type SamlAssertion', () => {
    it('receives the saml assertion in the destination', async () => {
      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          oauthPasswordSingleResponse,
          destinationName,
          wrapJwtInHeader(providerServiceToken)
        ),
        mockSingleDestinationCall(
          nock,
          oauthPasswordSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(providerServiceToken).headers
        )
      ];

      const expected = parseDestination(oauthPasswordSingleResponse);
      const actual = await getDestination({ destinationName });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type OAuth2Password', () => {
    beforeEach(() => {
      clientCredentialsTokenCache.clear();
    });

    it('returns a destination with auth token if authentication type is OAuth2Password', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockSingleDestinationCallSkipCredentials(
          nock,
          oauthPasswordSingleResponse,
          destinationName,
          wrapJwtInHeader(providerServiceToken)
        ),
        mockSingleDestinationCall(
          nock,
          oauthPasswordSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(providerServiceToken).headers
        )
      ];

      const expected = parseDestination(oauthPasswordSingleResponse);
      const actual = await getDestination({ destinationName });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });
  });
});
