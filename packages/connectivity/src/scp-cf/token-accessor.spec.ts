import nock from 'nock';
import * as resilience from '@sap-cloud-sdk/resilience';
import {
  destinationBindingClientSecretMock,
  destinationBindingCertMock,
  mockServiceBindings,
  providerXsuaaCertUrl,
  providerXsuaaUrl,
  subscriberXsuaaUrl
} from '../../../../test-resources/test/test-util/environment-mocks';
import { signedJwt } from '../../../../test-resources/test/test-util/keys';
import {
  providerServiceToken,
  providerUserJwt,
  subscriberServiceToken,
  subscriberUserJwt
} from '../../../../test-resources/test/test-util/mocked-access-tokens';
import {
  mockClientCredentialsGrantCall,
  mockClientCredentialsGrantWithCertCall,
  mockUserTokenGrantCall
} from '../../../../test-resources/test/test-util/xsuaa-service-mocks';
import { clientCredentialsTokenCache } from './client-credentials-token-cache';
import { jwtBearerToken, serviceToken } from './token-accessor';

describe('token accessor', () => {
  describe('serviceToken()', () => {
    beforeEach(() => {
      mockServiceBindings();
    });

    afterEach(() => {
      nock.cleanAll();
      clientCredentialsTokenCache.clear();
      jest.restoreAllMocks();
    });

    it('uses the provider tenant if no JWT is provided', async () => {
      const expected = signedJwt({ dummy: 'content' });

      mockClientCredentialsGrantCall(
        providerXsuaaUrl,
        { access_token: expected },
        200,
        destinationBindingClientSecretMock.credentials
      );

      const actual = await serviceToken('destination');
      expect(actual).toBe(expected);
    });

    it('considers default resilience middlewares for client credentials token', async () => {
      const spy = jest.spyOn(resilience, 'resilience');

      const jwt = signedJwt({
        iss: 'https://testeroni.example.com'
      });
      mockClientCredentialsGrantCall(
        'https://testeroni.example.com',
        { access_token: 'testValue' },
        200,
        destinationBindingClientSecretMock.credentials
      );

      await serviceToken('destination', { jwt });

      // no argument is default timeout
      expect(spy).toHaveBeenCalledWith();
    });

    it("uses the JWT's issuer as tenant", async () => {
      const expected = signedJwt({ dummy: 'content' });
      const jwt = signedJwt({
        iss: 'https://testeroni.example.com'
      });

      mockClientCredentialsGrantCall(
        'https://testeroni.example.com',
        { access_token: expected },
        200,
        destinationBindingClientSecretMock.credentials
      );

      const actual = await serviceToken('destination', { jwt });
      expect(actual).toBe(expected);
    });

    it('authenticates with certificate', async () => {
      mockServiceBindings({ mockDestinationBindingWithCert: true });
      const expected = signedJwt({ dummy: 'content' });

      mockClientCredentialsGrantWithCertCall(
        providerXsuaaCertUrl,
        { access_token: expected },
        200,
        destinationBindingCertMock.credentials
      );

      const actual = await serviceToken('destination');
      expect(actual).toBe(expected);
    });

    it('caches tokens by default', async () => {
      const expected = signedJwt({ dummy: 'content' });

      mockClientCredentialsGrantCall(
        providerXsuaaUrl,
        { access_token: expected },
        200,
        destinationBindingClientSecretMock.credentials
      );

      const retrieveFromCacheSpy = jest.spyOn(
        clientCredentialsTokenCache,
        'getToken'
      );

      const first = await serviceToken('destination');
      const second = await serviceToken('destination');
      expect(first).toBe(expected);
      expect(second).toBe(first);
      expect(retrieveFromCacheSpy).toHaveBeenCalledTimes(2);
      expect(retrieveFromCacheSpy).toHaveNthReturnedWith(2, {
        access_token: expected
      });
    });

    it('caches tokens for certificate authentication', async () => {
      mockServiceBindings({ mockDestinationBindingWithCert: true });
      const expected = signedJwt({ dummy: 'content' });

      mockClientCredentialsGrantWithCertCall(
        providerXsuaaCertUrl,
        { access_token: expected },
        200,
        destinationBindingCertMock.credentials
      );

      const retrieveFromCacheSpy = jest.spyOn(
        clientCredentialsTokenCache,
        'getToken'
      );

      const first = await serviceToken('destination');
      const second = await serviceToken('destination');
      expect(first).toBe(expected);
      expect(second).toBe(first);
      expect(retrieveFromCacheSpy).toHaveBeenCalledTimes(2);
      expect(retrieveFromCacheSpy).toHaveNthReturnedWith(2, {
        access_token: expected
      });
    });

    it('cached tokens are isolated by tenant and by service credentials', async () => {
      mockClientCredentialsGrantCall(
        providerXsuaaUrl,
        { access_token: providerServiceToken },
        200,
        destinationBindingClientSecretMock.credentials
      );

      mockClientCredentialsGrantCall(
        subscriberXsuaaUrl,
        { access_token: subscriberServiceToken },
        200,
        destinationBindingClientSecretMock.credentials
      );

      const providerToken = await serviceToken('destination', {
        jwt: providerUserJwt
      });
      const subscriberToken = await serviceToken('destination', {
        jwt: subscriberUserJwt
      });

      const providerTokenFromCache = clientCredentialsTokenCache.getToken(
        providerXsuaaUrl,
        destinationBindingClientSecretMock.credentials.clientid
      );
      const subscriberTokenFromCache = clientCredentialsTokenCache.getToken(
        subscriberXsuaaUrl,
        destinationBindingClientSecretMock.credentials.clientid
      );

      expect(providerTokenFromCache?.access_token).toEqual(providerToken);
      expect(subscriberTokenFromCache?.access_token).toEqual(subscriberToken);

      expect(
        clientCredentialsTokenCache.getToken(
          'https://doesnotexist.example.com',
          destinationBindingClientSecretMock.credentials.clientid
        )
      ).toBeUndefined();

      expect(
        clientCredentialsTokenCache.getToken(
          'https://doesnotexist.example.com',
          'schmusername'
        )
      ).toBeUndefined();

      expect(
        clientCredentialsTokenCache.getToken(providerXsuaaUrl, 'schmusername')
      ).toBeUndefined();

      expect(
        clientCredentialsTokenCache.getToken(subscriberXsuaaUrl, 'schmusername')
      ).toBeUndefined();
    });

    it('ignores the cache if it is disabled', async () => {
      const expected1 = signedJwt({ dummy: 'content' });
      const expected2 = signedJwt({ dummy: 'content2' });

      mockClientCredentialsGrantCall(
        providerXsuaaUrl,
        { access_token: expected1 },
        200,
        destinationBindingClientSecretMock.credentials
      );

      mockClientCredentialsGrantCall(
        providerXsuaaUrl,
        { access_token: expected2 },
        200,
        destinationBindingClientSecretMock.credentials
      );

      const retrieveFromCacheSpy = jest.spyOn(
        clientCredentialsTokenCache,
        'getToken'
      );

      const first = await serviceToken('destination', { useCache: false });
      const second = await serviceToken('destination', { useCache: false });
      expect(first).toBe(expected1);
      expect(second).toBe(expected2);
      expect(retrieveFromCacheSpy).toHaveBeenCalledTimes(0);
    });

    it('serviceToken throws an error without cause.config property', async () => {
      mockClientCredentialsGrantCall(
        providerXsuaaUrl,
        { access_token: signedJwt({ dummy: 'content' }) },
        401,
        destinationBindingClientSecretMock.credentials
      );
      const promise = serviceToken('destination');
      await expect(promise).rejects.not.toHaveProperty('cause.config');
    });

    it('jwtBearerToken should throw an error without cause.config property', async () => {
      mockUserTokenGrantCall(
        providerXsuaaUrl,
        1,
        '',
        '',
        destinationBindingClientSecretMock.credentials,
        401
      );
      const promise = jwtBearerToken(
        signedJwt({ dummy: 'content' }),
        destinationBindingClientSecretMock
      );
      await expect(promise).rejects.not.toHaveProperty('cause.config');
    });

    it('throws an error if the client credentials request fails', async () => {
      mockClientCredentialsGrantCall(
        providerXsuaaUrl,
        {
          error: 'unauthorized',
          error_description: 'Bad credentials'
        },
        401,
        destinationBindingClientSecretMock.credentials
      );

      await expect(
        serviceToken('destination')
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Could not fetch client credentials token for service of type "destination"."'
      );
    });

    it('throws an error if no XSUAA service is bound', async () => {
      process.env.VCAP_SERVICES = JSON.stringify({
        destination: [destinationBindingClientSecretMock]
      });

      await expect(
        serviceToken('destination')
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Could not find binding to the XSUAA service."'
      );
    });

    it('throws an error if no target service is bound', async () => {
      process.env.VCAP_SERVICES = JSON.stringify({});

      await expect(
        serviceToken('destination')
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Could not find service binding for type \'destination\'."'
      );
    });

    it('throws an error if the issuer is missing in the JWT', async () => {
      const jwt = signedJwt({ NOiss: 'https://testeroni.example.com' });

      await expect(
        serviceToken('destination', { jwt })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Property `iss` is missing in the provided user token."'
      );
    });
  });
});
