import nock from 'nock';
import { mockServiceBindings } from '../../../../test/test-util/environment-mocks';
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
  providerServiceToken,
  providerUserJwt,
  subscriberServiceToken,
  subscriberUserJwt,
  userApprovedProviderServiceToken,
  userApprovedSubscriberServiceToken
} from '../../../../test/test-util/mocked-access-tokens';
import {
  basicMultipleResponse,
  certificateMultipleResponse,
  certificateSingleResponse,
  destinationName,
  oauthMultipleResponse,
  oauthSingleResponse
} from '../../../../test/test-util/example-destination-service-responses';
import { clientCredentialsTokenCache } from '../client-credentials-token-cache';
import { parseDestination } from './destination';
import { getDestination } from './destination-accessor';
import { destinationCache } from './destination-cache';
import { getDestinationFromDestinationService } from './destination-from-service';

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
      mockUserApprovedServiceToken();

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
          userApprovedSubscriberServiceToken
        )
      ];

      const expected = parseDestination(oauthSingleResponse);
      const actual = await getDestination(destinationName, {
        userJwt: subscriberUserJwt
      });
      expect(actual).toMatchObject(expected);
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });

    it('returns a destination with authTokens if its authenticationType is OAuth2SAMLBearerFlow, provider tenant', async () => {
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
      const actual = await getDestination(destinationName, {
        userJwt: providerUserJwt,
        cacheVerificationKeys: false
      });

      expect(actual).toMatchObject(expected);
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });

    it('should use provider token first instead of the userJwt when SystemUser exists in destination', async () => {
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
        mockSingleDestinationCall(
          nock,
          oauthSingleResponse,
          200,
          destinationName,
          providerServiceToken
        )
      ];

      const expected = parseDestination(oauthSingleResponse);
      const actual = await getDestination(destinationName, {
        cacheVerificationKeys: false
      });
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
          subscriberServiceToken
        )
      ];

      const actual = await getDestination('ERNIE-UND-CERT', {
        userJwt: subscriberUserJwt,
        cacheVerificationKeys: false
      });
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

      const actual = await getDestination('ERNIE-UND-CERT', {
        cacheVerificationKeys: false
      });
      expect(actual!.certificates!.length).toBe(1);
      expect(actual!.keyStoreName).toBe('key.p12');
      expect(actual!.keyStorePassword).toBe('password');
      httpMocks.forEach(mock => expect(mock.isDone()).toBe(true));
    });
  });

  describe('authentication type BasicAuthentication', () => {
    beforeEach(() => {
      clientCredentialsTokenCache.clear();
    });

    it('returns a destination without authTokens if its authenticationType is Basic', async () => {
      mockServiceBindings();
      mockVerifyJwt();
      const serviceTokenSpy = mockServiceToken();

      mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken);
      mockSubaccountDestinationsCall(
        nock,
        basicMultipleResponse,
        200,
        subscriberServiceToken
      );

      const expected = parseDestination(basicMultipleResponse[0]);
      const actual = await getDestination(destinationName, {
        userJwt: subscriberServiceToken,
        cacheVerificationKeys: false
      });
      expect(actual).toMatchObject(expected);
      expect(serviceTokenSpy).toHaveBeenCalled();
    });

    it('retrieves destination without specifying userJwt', async () => {
      mockServiceBindings();
      mockServiceToken();

      mockInstanceDestinationsCall(nock, [], 200, providerServiceToken);
      mockSubaccountDestinationsCall(
        nock,
        basicMultipleResponse,
        200,
        providerServiceToken
      );

      const actual = await getDestination(destinationName, {
        cacheVerificationKeys: false
      });
      const expected = parseDestination(basicMultipleResponse[0]);
      expect(actual).toMatchObject(expected);
    });

    // Test for ONEmds specific feature
    it('is possible to get a non-principal propagation destination by only providing the subdomain (iss) instead of the whole jwt', async () => {
      mockServiceBindings();
      mockServiceToken();

      mockInstanceDestinationsCall(nock, [], 200, subscriberServiceToken);
      mockSubaccountDestinationsCall(
        nock,
        certificateMultipleResponse,
        200,
        subscriberServiceToken
      );
      mockInstanceDestinationsCall(nock, [], 200, providerServiceToken);
      mockSubaccountDestinationsCall(nock, [], 200, providerServiceToken);

      mockSingleDestinationCall(
        nock,
        certificateSingleResponse,
        200,
        'ERNIE-UND-CERT',
        subscriberServiceToken
      );

      const expected = parseDestination(certificateSingleResponse);
      const actual = await getDestinationFromDestinationService(
        'ERNIE-UND-CERT',
        {
          iss: 'https://subscriber.example.com',
          cacheVerificationKeys: false
        }
      );
      expect(actual).toMatchObject(expected);
    });
  });
});
