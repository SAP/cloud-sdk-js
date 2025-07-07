import { decodeJwt } from '../jwt';
import {
  mockServiceBindings,
  onlyIssuerXsuaaUrl,
  testTenants
} from '../../../../../test-resources/test/test-util/environment-mocks';
import {
  expectAllMocksUsed,
  mockJwtBearerToken,
  mockServiceToken
} from '../../../../../test-resources/test/test-util/token-accessor-mocks';
import {
  mockFetchDestinationCalls,
  mockFetchDestinationCallsNotFound
} from '../../../../../test-resources/test/test-util/destination-service-mocks';
import {
  onlyIssuerServiceToken,
  providerUserToken,
  subscriberServiceToken,
  subscriberUserToken
} from '../../../../../test-resources/test/test-util/mocked-access-tokens';
import {
  basicMultipleResponse,
  certificateSingleResponse,
  destinationName,
  oauthClientCredentialsSingleResponse,
  oauthJwtBearerSingleResponse,
  oauthPasswordSingleResponse,
  oauthRefreshTokenMultipleResponse,
  oauthRefreshTokenSingleResponse,
  oauthSingleResponse,
  oauthUserTokenExchangeSingleResponse,
  onPremiseBasicMultipleResponse,
  onPremiseBasicSingleResponse,
  onPremisePrincipalPropagationMultipleResponse,
  samlAssertionSingleResponse
} from '../../../../../test-resources/test/test-util/example-destination-service-responses';
import { clientCredentialsTokenCache } from '../client-credentials-token-cache';
import { parseDestination } from './destination';
import { getDestination } from './destination-accessor';
import { destinationCache } from './destination-cache';
import {
  alwaysProvider,
  alwaysSubscriber
} from './destination-selection-strategies';

describe('authentication types', () => {
  beforeEach(() => {
    mockServiceBindings();
    mockServiceToken();
  });

  afterEach(() => {
    clientCredentialsTokenCache.clear();
    destinationCache.clear();
  });

  describe('authentication type OAuth2SAMLBearerFlow', () => {
    it('returns a destination with authTokens if its authenticationType is OAuth2SAMLBearerFlow, subscriber tenant', async () => {
      mockJwtBearerToken();

      const httpMocks = mockFetchDestinationCalls(oauthSingleResponse, {
        serviceToken: subscriberServiceToken,
        mockWithTokenRetrievalCall: {
          headers: { 'x-user-token': subscriberUserToken }
        }
      });

      const destination = await getDestination({
        destinationName,
        jwt: subscriberUserToken
      });
      expect(destination).toMatchObject(parseDestination(oauthSingleResponse));
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination with authTokens if its authenticationType is OAuth2SAMLBearerFlow, provider tenant', async () => {
      mockJwtBearerToken();

      const httpMocks = mockFetchDestinationCalls(oauthSingleResponse, {
        mockWithTokenRetrievalCall: {
          headers: { authorization: `Bearer ${providerUserToken}` }
        }
      });

      const destination = await getDestination({
        destinationName,
        jwt: providerUserToken,
        cacheVerificationKeys: false
      });

      expect(destination).toMatchObject(parseDestination(oauthSingleResponse));
      expectAllMocksUsed(httpMocks);
    });

    it('should use provider client credentials token for SystemUser exists in provider destination', async () => {
      // Insert SystemUser in the retrieved OAuth2SAMLBearer destination to trigger principle propagation workflow
      const samlDestinationWithSystemUser = {
        ...oauthSingleResponse,
        destinationConfiguration: {
          ...oauthSingleResponse.destinationConfiguration,
          SystemUser: 'defined'
        }
      };

      const httpMocks = mockFetchDestinationCalls(
        samlDestinationWithSystemUser
      );

      const destination = await getDestination({
        destinationName,
        cacheVerificationKeys: false
      });
      expect(destination).toMatchObject(parseDestination(oauthSingleResponse));
      expectAllMocksUsed(httpMocks);
    });

    it('should use subscriber client credentials token for SystemUser exists in subscriber destination', async () => {
      // Insert SystemUser in the retrieved OAuth2SAMLBearer destination to trigger principle propagation workflow
      const samlDestinationWithSystemUser = {
        ...oauthSingleResponse,
        destinationConfiguration: {
          ...oauthSingleResponse.destinationConfiguration,
          SystemUser: 'defined'
        }
      };

      const httpMocks = mockFetchDestinationCalls(
        samlDestinationWithSystemUser,
        {
          serviceToken: subscriberServiceToken
        }
      );

      const destination = await getDestination({
        destinationName,
        cacheVerificationKeys: false,
        jwt: subscriberUserToken
      });
      expect(destination).toMatchObject(parseDestination(oauthSingleResponse));
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type OAuth2ClientCredentials', () => {
    it('returns a destination with authTokens if its authenticationType is OAuth2ClientCredentials, subscriber tenant', async () => {
      mockJwtBearerToken();

      const httpMocks = mockFetchDestinationCalls(
        oauthClientCredentialsSingleResponse,
        { serviceToken: subscriberServiceToken }
      );

      const destination = await getDestination({
        destinationName,
        jwt: subscriberUserToken
      });
      expect(destination).toMatchObject(
        parseDestination(oauthClientCredentialsSingleResponse)
      );
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination with authTokens if its authenticationType is OAuth2ClientCredentials, provider tenant', async () => {
      mockJwtBearerToken();

      const httpMocks = mockFetchDestinationCalls(
        oauthClientCredentialsSingleResponse
      );

      const destination = await getDestination({ destinationName });
      expect(destination).toMatchObject(
        parseDestination(oauthClientCredentialsSingleResponse)
      );
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination with authTokens if its authenticationType is OAuth2ClientCredentials, tokenServiceUrlType common and sets x-tenant header.', async () => {
      mockJwtBearerToken();

      const destinationWithTokenServiceType = {
        ...oauthClientCredentialsSingleResponse,
        destinationConfiguration: {
          ...oauthClientCredentialsSingleResponse.destinationConfiguration,
          tokenServiceURLType: 'Common'
        }
      };

      const httpMocks = [
        ...mockFetchDestinationCalls(destinationWithTokenServiceType, {
          mockWithTokenRetrievalCall: {
            headers: { 'x-tenant': testTenants.subscriber }
          }
        }),
        ...mockFetchDestinationCallsNotFound(destinationName, {
          serviceToken: subscriberServiceToken
        })
      ];

      const destination = await getDestination({
        destinationName,
        jwt: subscriberUserToken
      });
      expect(destination).toMatchObject(
        parseDestination(oauthClientCredentialsSingleResponse)
      );
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type OAuth2JWTBearer', () => {
    it('should use provider service token subscriber x-user-token for provider destination and subscriber jwt', async () => {
      mockJwtBearerToken();

      const httpMocks = [
        ...mockFetchDestinationCalls(oauthJwtBearerSingleResponse, {
          mockWithTokenRetrievalCall: {
            headers: { 'x-user-token': subscriberUserToken }
          }
        }),
        ...mockFetchDestinationCallsNotFound(destinationName, {
          serviceToken: subscriberServiceToken
        })
      ];

      const destination = await getDestination({
        destinationName,
        jwt: subscriberUserToken
      });
      expect(destination).toMatchObject(
        parseDestination(oauthJwtBearerSingleResponse)
      );
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type OAuth2RefreshToken', () => {
    it('returns a destination with auth token if authentication type is OAuth2RefreshToken', async () => {
      const httpMocks = mockFetchDestinationCalls(
        oauthRefreshTokenSingleResponse,
        {
          serviceToken: subscriberServiceToken,
          mockWithTokenRetrievalCall: {
            headers: { 'x-refresh-token': 'dummy-refresh-token' }
          }
        }
      );

      const destination = await getDestination({
        destinationName,
        jwt: subscriberUserToken,
        refreshToken: 'dummy-refresh-token'
      });
      expect(destination).toMatchObject(
        parseDestination(oauthRefreshTokenSingleResponse)
      );
      expectAllMocksUsed(httpMocks);
    });

    it('fails if refresh token is not provided', async () => {
      const httpMocks = mockFetchDestinationCalls(
        oauthRefreshTokenMultipleResponse[0],
        {
          serviceToken: subscriberServiceToken,
          mockWithTokenRetrievalCall: false
        }
      );

      await expect(
        getDestination({
          destinationName,
          jwt: subscriberUserToken
        })
      ).rejects.toThrow(/No refresh token has been provided./);
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type OAuth2UserTokenExchange', () => {
    it('should use the user provider token as auth header and no exchange header for provider destination and provider jwt', async () => {
      mockJwtBearerToken();

      const httpMocks = mockFetchDestinationCalls(
        oauthUserTokenExchangeSingleResponse,
        {
          mockWithTokenRetrievalCall: {
            headers: { authorization: `Bearer ${providerUserToken}` }
          }
        }
      );

      const destination = await getDestination({
        destinationName,
        jwt: providerUserToken
      });
      expect(destination).toMatchObject(
        parseDestination(oauthUserTokenExchangeSingleResponse)
      );
      expectAllMocksUsed(httpMocks);
    });

    it('should use the provider access token as auth header and subscriber jwt as exchange header for provider destination and provider jwt', async () => {
      mockJwtBearerToken();

      const httpMocks = mockFetchDestinationCalls(
        oauthUserTokenExchangeSingleResponse,
        {
          mockWithTokenRetrievalCall: {
            headers: { 'x-user-token': subscriberUserToken }
          }
        }
      );

      const destination = await getDestination({
        destinationName,
        selectionStrategy: alwaysProvider,
        jwt: subscriberUserToken
      });
      expect(destination).toMatchObject(
        parseDestination(oauthUserTokenExchangeSingleResponse)
      );
      expectAllMocksUsed(httpMocks);
    });

    it('should use the subscriber access token as auth header and subscriber jwt as exchange header for provider destination and provider jwt', async () => {
      mockJwtBearerToken();

      const httpMocks = mockFetchDestinationCalls(
        oauthUserTokenExchangeSingleResponse,
        {
          serviceToken: subscriberServiceToken,
          mockWithTokenRetrievalCall: {
            headers: { 'x-user-token': subscriberUserToken }
          }
        }
      );

      const destination = await getDestination({
        destinationName,
        selectionStrategy: alwaysSubscriber,
        jwt: subscriberUserToken
      });
      expect(destination).toMatchObject(
        parseDestination(oauthUserTokenExchangeSingleResponse)
      );
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type ClientCertificateAuthentication', () => {
    it('returns a destination with certificates if the authentication type is ClientCertificateAuthentication, subscriber tenant', async () => {
      mockJwtBearerToken();

      const httpMocks = mockFetchDestinationCalls(certificateSingleResponse, {
        serviceToken: subscriberServiceToken
      });

      const destination = await getDestination({
        destinationName: 'ERNIE-UND-CERT',
        jwt: subscriberUserToken,
        cacheVerificationKeys: false
      });
      expect(destination?.certificates?.length).toBe(1);
      expect(destination?.keyStoreName).toBe('key.p12');
      expect(destination?.keyStorePassword).toBe('password');
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination with certificates if the authentication type is ClientCertificateAuthentication, provider tenant', async () => {
      mockJwtBearerToken();

      const httpMocks = mockFetchDestinationCalls(certificateSingleResponse);

      const destination = await getDestination({
        destinationName: 'ERNIE-UND-CERT',
        cacheVerificationKeys: false
      });
      expect(destination?.certificates!.length).toBe(1);
      expect(destination?.keyStoreName).toBe('key.p12');
      expect(destination?.keyStorePassword).toBe('password');
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type BasicAuthentication', () => {
    it('returns a destination with OnPrem connectivity and basic auth', async () => {
      const httpMocks = mockFetchDestinationCalls(
        onPremiseBasicSingleResponse,
        {
          serviceToken: subscriberServiceToken,
          mockWithTokenRetrievalCall: false
        }
      );

      const destination = await getDestination({
        destinationName: 'OnPremise',
        jwt: subscriberUserToken,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber
      });

      expect(destination?.proxyConfiguration).toMatchObject({
        host: 'proxy.example.com',
        port: 12345,
        protocol: 'http',
        headers: { 'Proxy-Authorization': expect.stringMatching(/Bearer.*/) }
      });
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination without authTokens if its authenticationType is Basic', async () => {
      mockServiceBindings();
      const serviceTokenSpy = mockServiceToken();

      const httpMocks = mockFetchDestinationCalls(basicMultipleResponse[0], {
        serviceToken: subscriberServiceToken,
        mockWithTokenRetrievalCall: false
      });

      const destination = await getDestination({
        destinationName,
        jwt: subscriberUserToken,
        cacheVerificationKeys: false
      });
      expect(destination).toMatchObject(
        parseDestination(basicMultipleResponse[0])
      );
      expect(serviceTokenSpy).toHaveBeenCalled();
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type Principal Propagation', () => {
    it('returns a destination with onPrem connectivity and principal propagation', async () => {
      const httpMocks = mockFetchDestinationCalls(
        onPremisePrincipalPropagationMultipleResponse[0],
        {
          serviceToken: subscriberServiceToken,
          mockWithTokenRetrievalCall: false
        }
      );

      const destination = await getDestination({
        destinationName: 'OnPremise',
        jwt: subscriberUserToken,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber
      });
      expect(destination?.proxyConfiguration).toMatchObject({
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
      const httpMocks = mockFetchDestinationCalls(
        onPremisePrincipalPropagationMultipleResponse[0],
        {
          mockWithTokenRetrievalCall: false
        }
      );

      await expect(
        getDestination({ destinationName: 'OnPremise' })
      ).rejects.toThrow(
        "No user token (JWT) has been provided. This is strictly necessary for 'PrincipalPropagation'."
      );
      expectAllMocksUsed(httpMocks);
    });

    it('fails for Principal Propagation and issuer JWT', async () => {
      const httpMocks = mockFetchDestinationCalls(
        onPremisePrincipalPropagationMultipleResponse[0],
        {
          serviceToken: onlyIssuerServiceToken,
          mockWithTokenRetrievalCall: false
        }
      );

      await expect(
        getDestination({
          destinationName: 'OnPremise',
          iss: onlyIssuerXsuaaUrl
        })
      ).rejects.toThrow(
        "No user token (JWT) has been provided. This is strictly necessary for 'PrincipalPropagation'."
      );
      expectAllMocksUsed(httpMocks);
    });
  });

  it('works for onPremise Basic and issuer JWT', async () => {
    mockServiceBindings();
    mockServiceToken();

    const httpMocks = mockFetchDestinationCalls(
      onPremiseBasicMultipleResponse[0],
      {
        serviceToken: onlyIssuerServiceToken,
        mockWithTokenRetrievalCall: false
      }
    );

    const destination = await getDestination({
      destinationName: 'OnPremise',
      iss: onlyIssuerXsuaaUrl
    });

    const proxyToken =
      destination?.proxyConfiguration!.headers!['Proxy-Authorization'].split(
        ' '
      )[1];
    expect(decodeJwt(proxyToken!).zid).toEqual(testTenants.subscriberOnlyIss);
    expectAllMocksUsed(httpMocks);
  });

  describe('authentication type SamlAssertion', () => {
    it('receives the SAML assertion in the destination', async () => {
      mockJwtBearerToken();

      const httpMocks = mockFetchDestinationCalls(samlAssertionSingleResponse, {
        serviceToken: subscriberServiceToken,
        mockWithTokenRetrievalCall: {
          headers: {
            'x-user-token': subscriberUserToken
          }
        }
      });

      const destination = await getDestination({
        destinationName,
        jwt: subscriberUserToken
      });
      expect(destination).toMatchObject(
        parseDestination(samlAssertionSingleResponse)
      );
      expectAllMocksUsed(httpMocks);
    });
  });

  describe('authentication type OAuth2Password', () => {
    it('returns a destination with auth token if authentication type is OAuth2Password', async () => {
      mockJwtBearerToken();

      const httpMocks = mockFetchDestinationCalls(oauthPasswordSingleResponse);

      const destination = await getDestination({ destinationName });
      expect(destination).toMatchObject(
        parseDestination(oauthPasswordSingleResponse)
      );
      expectAllMocksUsed(httpMocks);
    });
  });
});
