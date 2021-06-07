import nock from 'nock';
import {
  mockDestinationServiceBinding,
  mockServiceBindings,
  providerXsuaaUrl,
  subscriberXsuaaUrl
} from '../../../test/test-util/environment-mocks';
import { signedJwt } from '../../../test/test-util/keys';
import {
  providerServiceToken,
  providerUserJwt,
  subscriberServiceToken,
  subscriberUserJwt
} from '../../../test/test-util/mocked-access-tokens';
import {
  mockClientCredentialsGrantCall,
  mockRefreshTokenGrantCall,
  mockUserTokenGrantCall
} from '../../../test/test-util/xsuaa-service-mocks';
import { clientCredentialsTokenCache } from './client-credentials-token-cache';
import { serviceToken, userApprovedServiceToken } from './token-accessor';

describe('token accessor', () => {
  describe('serviceToken', () => {
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
        mockDestinationServiceBinding.credentials.clientid,
        mockDestinationServiceBinding.credentials.clientsecret
      );

      const actual = await serviceToken('destination');
      expect(actual).toBe(expected);
    });

    it("uses the JWT's issuer as tenant", async () => {
      const expected = signedJwt({ dummy: 'content' });
      const userJwt = signedJwt({ iss: 'https://testeroni.example.com' });

      mockClientCredentialsGrantCall(
        'https://testeroni.example.com',
        { access_token: expected },
        200,
        mockDestinationServiceBinding.credentials.clientid,
        mockDestinationServiceBinding.credentials.clientsecret
      );

      const actual = await serviceToken('destination', { userJwt });
      expect(actual).toBe(expected);
    });

    it('caches tokens by default', async () => {
      const expected = signedJwt({ dummy: 'content' });

      mockClientCredentialsGrantCall(
        providerXsuaaUrl,
        { access_token: expected },
        200,
        mockDestinationServiceBinding.credentials.clientid,
        mockDestinationServiceBinding.credentials.clientsecret
      );

      const retrieveFromCacheSpy = jest.spyOn(
        clientCredentialsTokenCache,
        'getGrantTokenFromCache'
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
        mockDestinationServiceBinding.credentials.clientid,
        mockDestinationServiceBinding.credentials.clientsecret
      );

      mockClientCredentialsGrantCall(
        subscriberXsuaaUrl,
        { access_token: subscriberServiceToken },
        200,
        mockDestinationServiceBinding.credentials.clientid,
        mockDestinationServiceBinding.credentials.clientsecret
      );

      const providerToken = await serviceToken('destination', {
        userJwt: providerUserJwt
      });
      const subscriberToken = await serviceToken('destination', {
        userJwt: subscriberUserJwt
      });

      const providerTokenFromCache =
        clientCredentialsTokenCache.getGrantTokenFromCache(providerXsuaaUrl, {
          username: mockDestinationServiceBinding.credentials.clientid,
          password: mockDestinationServiceBinding.credentials.clientsecret
        });
      const subscriberTokenFromCache =
        clientCredentialsTokenCache.getGrantTokenFromCache(subscriberXsuaaUrl, {
          username: mockDestinationServiceBinding.credentials.clientid,
          password: mockDestinationServiceBinding.credentials.clientsecret
        });

      expect(providerTokenFromCache!.access_token).toEqual(providerToken);
      expect(subscriberTokenFromCache!.access_token).toEqual(subscriberToken);

      expect(
        clientCredentialsTokenCache.getGrantTokenFromCache(
          'https://doesnotexist.example.com',
          {
            username: mockDestinationServiceBinding.credentials.clientid,
            password: mockDestinationServiceBinding.credentials.clientsecret
          }
        )
      ).toBeUndefined();

      expect(
        clientCredentialsTokenCache.getGrantTokenFromCache(
          'https://doesnotexist.example.com',
          {
            username: 'schmusername',
            password: 'aligator3'
          }
        )
      ).toBeUndefined();

      expect(
        clientCredentialsTokenCache.getGrantTokenFromCache(providerXsuaaUrl, {
          username: 'schmusername',
          password: 'aligator3'
        })
      ).toBeUndefined();

      expect(
        clientCredentialsTokenCache.getGrantTokenFromCache(subscriberXsuaaUrl, {
          username: 'schmusername',
          password: 'aligator3'
        })
      ).toBeUndefined();
    });

    it("ignores the cache if it's disabled", async () => {
      const expected1 = signedJwt({ dummy: 'content' });
      const expected2 = signedJwt({ dummy: 'content2' });

      mockClientCredentialsGrantCall(
        providerXsuaaUrl,
        { access_token: expected1 },
        200,
        mockDestinationServiceBinding.credentials.clientid,
        mockDestinationServiceBinding.credentials.clientsecret
      );

      mockClientCredentialsGrantCall(
        providerXsuaaUrl,
        { access_token: expected2 },
        200,
        mockDestinationServiceBinding.credentials.clientid,
        mockDestinationServiceBinding.credentials.clientsecret
      );

      const retrieveFromCacheSpy = jest.spyOn(
        clientCredentialsTokenCache,
        'getGrantTokenFromCache'
      );

      const first = await serviceToken('destination', { useCache: false });
      const second = await serviceToken('destination', { useCache: false });
      expect(first).toBe(expected1);
      expect(second).toBe(expected2);
      expect(retrieveFromCacheSpy).toHaveBeenCalledTimes(0);
    });

    it('throws an error if the client credentials request fails', done => {
      mockClientCredentialsGrantCall(
        providerXsuaaUrl,
        {
          error: 'unauthorized',
          error_description: 'Bad credentials'
        },
        401,
        mockDestinationServiceBinding.credentials.clientid,
        mockDestinationServiceBinding.credentials.clientsecret
      );

      serviceToken('destination')
        .then(() => {
          done('Should have failed.');
        })
        .catch(error => {
          expect(error.message).toBe(
            'Fetching an access token for service "destination" failed!'
          );
          done();
        });
    });

    it('throws an error if no XSUAA service is bound', done => {
      process.env.VCAP_SERVICES = JSON.stringify({
        destination: [mockDestinationServiceBinding]
      });

      serviceToken('destination')
        .then(() => {
          done('Should have failed.');
        })
        .catch(error => {
          expect(error.message).toBe(
            'No binding to an XSUAA service instance found. Please make sure to bind an instance of the XSUAA service to your application!'
          );
          done();
        });
    });

    it('throws an error if no target service is bound', done => {
      process.env.VCAP_SERVICES = JSON.stringify({});

      serviceToken('destination')
        .then(() => {
          done('Should have failed.');
        })
        .catch(error => {
          expect(error.message).toBe(
            'Unable to get access token for "destination" service! No service instance of type "destination" found.'
          );
          done();
        });
    });

    it('throws an error if the issuer is missing in the JWT', done => {
      const userJwt = signedJwt({ NOiss: 'https://testeroni.example.com' });

      serviceToken('destination', { userJwt })
        .then(() => {
          done('Should have failed.');
        })
        .catch(error => {
          expect(error.message).toBe(
            'Property "iss" is missing from the provided user token! This shouldn\'t happen.'
          );
          done();
        });
    });
  });

  describe('userApprovedServiceToken', () => {
    beforeEach(() => {
      mockServiceBindings();
    });

    afterEach(() => {
      nock.cleanAll();
      clientCredentialsTokenCache.clear();
      jest.resetAllMocks();
    });

    it("uses the JWT's issuer as tenant", async () => {
      const userJwt = signedJwt({ iss: 'https://testeroni.example.com' });
      const expected = signedJwt({ some: 'thing' });
      const refreshToken = 'freshtoken';

      mockUserTokenGrantCall(
        'https://testeroni.example.com',
        {
          refresh_token: refreshToken
        },
        200,
        userJwt,
        mockDestinationServiceBinding.credentials.clientid
      );

      mockRefreshTokenGrantCall(
        'https://testeroni.example.com',
        {
          access_token: expected
        },
        200,
        refreshToken,
        mockDestinationServiceBinding.credentials.clientid,
        mockDestinationServiceBinding.credentials.clientsecret
      );

      const actual = await userApprovedServiceToken(userJwt, 'destination');
      expect(actual).toBe(expected);
    });

    it('throws an error if the user token request fails', done => {
      const userJwt = signedJwt({ iss: 'https://testeroni.example.com' });

      mockUserTokenGrantCall(
        'https://testeroni.example.com',
        {
          error: 'invalid_token',
          error_description:
            'Invalid access token: expired at Mon Jan 21 16:10:40 UTC 2019'
        },
        401,
        userJwt,
        mockDestinationServiceBinding.credentials.clientid
      );

      userApprovedServiceToken(userJwt, 'destination')
        .then(() => {
          done('Should have failed.');
        })
        .catch(error => {
          expect(error.message).toBe(
            'Fetching a user approved access token for service "destination" failed!'
          );
          expect(error.stack.toLowerCase()).toContain(
            'user token grant failed'
          );
          done();
        });
    });

    it('throws an error if the refresh token request fails', done => {
      const userJwt = signedJwt({ iss: 'https://testeroni.example.com' });
      const refreshToken = 'freshtoken';

      mockUserTokenGrantCall(
        'https://testeroni.example.com',
        {
          refresh_token: refreshToken
        },
        200,
        userJwt,
        mockDestinationServiceBinding.credentials.clientid
      );

      mockRefreshTokenGrantCall(
        'https://testeroni.example.com',
        {
          error: 'invalid_token',
          error_description:
            'Invalid access token: expired at Mon Jan 21 16:10:40 UTC 2019'
        },
        401,
        refreshToken,
        mockDestinationServiceBinding.credentials.clientid,
        mockDestinationServiceBinding.credentials.clientsecret
      );

      userApprovedServiceToken(userJwt, 'destination')
        .then(() => {
          done('Should have failed.');
        })
        .catch(error => {
          expect(error.message).toBe(
            'Fetching a user approved access token for service "destination" failed!'
          );
          expect(error.stack.toLowerCase()).toContain(
            'refresh token grant failed'
          );
          done();
        });
    });

    it('throws an error if no XSUAA service is bound', done => {
      const userJwt = signedJwt({ iss: 'https://testeroni.example.com' });
      process.env.VCAP_SERVICES = JSON.stringify({
        destination: [mockDestinationServiceBinding]
      });

      userApprovedServiceToken(userJwt, 'destination')
        .then(() => {
          done('Should have failed.');
        })
        .catch(error => {
          expect(error.message).toBe(
            'No binding to an XSUAA service instance found. Please make sure to bind an instance of the XSUAA service to your application!'
          );
          done();
        });
    });

    it('throws an error if no target service is bound', done => {
      const userJwt = signedJwt({ iss: 'https://testeroni.example.com' });
      process.env.VCAP_SERVICES = JSON.stringify({});

      userApprovedServiceToken(userJwt, 'destination')
        .then(() => {
          done('Should have failed.');
        })
        .catch(error => {
          expect(error.message).toBe(
            'Unable to get access token for "destination" service! No service instance of type "destination" found.'
          );
          done();
        });
    });

    it('throws an error if the issuer is missing in the JWT', done => {
      const userJwt = signedJwt({ NOiss: 'toni-testeroni' });

      userApprovedServiceToken(userJwt, 'destination')
        .then(() => {
          done('Should have failed.');
        })
        .catch(error => {
          expect(error.message).toBe(
            'Property "iss" is missing from the provided user token! This shouldn\'t happen.'
          );
          done();
        });
    });
  });
});
