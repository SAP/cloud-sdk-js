import nock from 'nock';
import {
  mockServiceBindings,
  onlyIssuerXsuaaUrl
} from '../../../../test/test-util/environment-mocks';
import {
  expectAllMocksUsed,
  mockJwtBearerToken,
  mockServiceToken
} from '../../../../test/test-util/token-accessor-mocks';
import {
  mockInstanceDestinationsCall,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  mockVerifyJwt
} from '../../../../test/test-util/destination-service-mocks';
import {
  onlyIssuerServiceToken,
  providerJwtBearerToken,
  providerServiceToken,
  providerUserJwt,
  subscriberJwtBearerToken,
  subscriberServiceToken,
  subscriberUserJwt
} from '../../../../test/test-util/mocked-access-tokens';
import {
  basicMultipleResponse,
  certificateMultipleResponse,
  certificateSingleResponse,
  destinationName,
  oauthClientCredentialsMultipleResponse,
  oauthClientCredentialsSingleResponse,
  oauthMultipleResponse,
  oauthPasswordMultipleResponse,
  oauthPasswordSingleResponse,
  oauthSingleResponse,
  oauthUserTokenExchangeMultipleResponse,
  oauthUserTokenExchangeSingleResponse,
  onPremiseBasicMultipleResponse,
  onPremiseBasicSingleResponse,
  onPremisePrincipalPropagationMultipleResponse
} from '../../../../test/test-util/example-destination-service-responses';
import { clientCredentialsTokenCache } from '../client-credentials-token-cache';
import { wrapJwtInHeader } from '../jwt';
import { parseDestination } from './destination';
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
    it('returns a destination with authTokens if its authenticationType is OAuth2SAMLBearerFlow, subscriber tenant', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthMultipleResponse,
          200,
          subscriberServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          oauthSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(subscriberJwtBearerToken).headers
        )
      ];

      const expected = parseDestination(oauthSingleResponse);
      const actual = await getDestination(destinationName, {
        userJwt: subscriberUserJwt
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('returns a destination with authTokens if its authenticationType is OAuth2SAMLBearerFlow, provider tenant', async () => {
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
      const actual = await getDestination(destinationName, {
        userJwt: providerUserJwt,
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
        mockInstanceDestinationsCall(
          nock,
          [samlDestinationsWithSystemUser],
          200,
          providerServiceToken
        ),
        mockSubaccountDestinationsCall(nock, [], 200, providerServiceToken),
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
      const actual = await getDestination(destinationName, {
        cacheVerificationKeys: false
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('should use subscriber client credentials token for SystemUser exists in subscriber destination', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const samlDestinationsWithSystemUser = { ...oauthMultipleResponse[0] };
      // Insert SystemUser in the retrieved OAuth2SAMLBearer destination to trigger principle propagation workflow
      samlDestinationsWithSystemUser['SystemUser'] = 'defined';

      const httpMocks = [
        mockInstanceDestinationsCall(
          nock,
          [samlDestinationsWithSystemUser],
          200,
          subscriberServiceToken
        ),
        mockSubaccountDestinationsCall(nock, [], 200, subscriberServiceToken),
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
      const actual = await getDestination(destinationName, {
        cacheVerificationKeys: false,
        userJwt: subscriberUserJwt
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

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthClientCredentialsMultipleResponse,
          200,
          subscriberServiceToken
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
      const actual = await getDestination(destinationName, {
        userJwt: subscriberUserJwt
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
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthClientCredentialsMultipleResponse,
          200,
          providerServiceToken
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
      const actual = await getDestination(destinationName);
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

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthUserTokenExchangeMultipleResponse,
          200,
          providerServiceToken
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
      const actual = await getDestination(destinationName, {
        userJwt: providerUserJwt
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('should use the provider access token as auth header and subscriber jwt as exchange header for provider destination and provider jwt', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthUserTokenExchangeMultipleResponse,
          200,
          providerServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          oauthUserTokenExchangeSingleResponse,
          200,
          destinationName,
          {
            ...wrapJwtInHeader(providerServiceToken).headers,
            'X-user-token': subscriberUserJwt
          }
        )
      ];

      const expected = parseDestination(oauthUserTokenExchangeSingleResponse);
      const actual = await getDestination(destinationName, {
        selectionStrategy: alwaysProvider,
        userJwt: subscriberUserJwt
      });
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });

    it('should use the subscriber access token as auth header and subscriber jwt as exchange header for provider destination and provider jwt', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();
      mockJwtBearerToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthUserTokenExchangeMultipleResponse,
          200,
          subscriberServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          oauthUserTokenExchangeSingleResponse,
          200,
          destinationName,
          {
            ...wrapJwtInHeader(subscriberServiceToken).headers,
            'X-user-token': subscriberUserJwt
          }
        )
      ];

      const expected = parseDestination(oauthUserTokenExchangeSingleResponse);
      const actual = await getDestination(destinationName, {
        selectionStrategy: alwaysSubscriber,
        userJwt: subscriberUserJwt
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

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          certificateMultipleResponse,
          200,
          subscriberServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          certificateSingleResponse,
          200,
          'ERNIE-UND-CERT',
          wrapJwtInHeader(subscriberServiceToken).headers
        )
      ];

      const actual = await getDestination('ERNIE-UND-CERT', {
        userJwt: subscriberUserJwt,
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

      const actual = await getDestination('ERNIE-UND-CERT', {
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
      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          onPremiseBasicMultipleResponse,
          200,
          subscriberServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          onPremiseBasicSingleResponse,
          200,
          destinationName,
          wrapJwtInHeader(subscriberServiceToken).headers
        )
      ];

      const actual = await getDestination('OnPremise', {
        userJwt: subscriberServiceToken,
        cacheVerificationKeys: false,
        selectionStrategy: alwaysSubscriber
      });
      expect(actual?.proxyConfiguration).toMatchObject({
        host: 'proxy.example.com',
        port: 12345,
        protocol: 'http',
        headers: { 'Proxy-Authorization': expect.stringMatching(/Bearer.*/) }
      });
    });

    it('returns a destination without authTokens if its authenticationType is Basic', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      const serviceTokenSpy = mockServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          basicMultipleResponse,
          200,
          subscriberServiceToken
        )
      ];

      const expected = parseDestination(basicMultipleResponse[0]);
      const actual = await getDestination(destinationName, {
        userJwt: subscriberServiceToken,
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

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          onPremisePrincipalPropagationMultipleResponse,
          200,
          subscriberServiceToken
        )
      ];

      const actual = await getDestination('OnPremise', {
        userJwt: subscriberServiceToken,
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
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          onPremisePrincipalPropagationMultipleResponse,
          200,
          providerServiceToken
        )
      ];

      await expect(getDestination('OnPremise')).rejects.toThrowError(
        'For principal propagation a user JWT is needed.'
      );
      expectAllMocksUsed(httpMocks);
    });

    it('fails for Principal Propagation and issuer JWT', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      mockServiceToken();

      const httpMocks = [
        mockInstanceDestinationsCall(nock, [], 200, onlyIssuerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          onPremisePrincipalPropagationMultipleResponse,
          200,
          onlyIssuerServiceToken
        )
      ];

      await expect(
        getDestination('OnPremise', { iss: onlyIssuerXsuaaUrl })
      ).rejects.toThrowError('For principal propagation a user JWT is needed.');
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
        mockInstanceDestinationsCall(nock, [], 200, providerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          oauthPasswordMultipleResponse,
          200,
          providerServiceToken
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
      const actual = await getDestination(destinationName, {});
      expect(actual).toMatchObject(expected);
      expectAllMocksUsed(httpMocks);
    });
  });
});
