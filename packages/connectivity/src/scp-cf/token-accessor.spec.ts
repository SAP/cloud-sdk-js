import nock from 'nock';
import * as resilience from '@sap-cloud-sdk/resilience';
import { createLogger } from '@sap-cloud-sdk/util';
import {
  destinationBindingClientSecretMock,
  destinationBindingCertMock,
  mockServiceBindings,
  providerXsuaaCertUrl,
  providerXsuaaUrl,
  subscriberXsuaaUrl,
  testTenants,
  uaaDomain
} from '../../../../test-resources/test/test-util/environment-mocks';
import {
  signedJwt,
  signedXsuaaJwt
} from '../../../../test-resources/test/test-util/keys';
import {
  providerServiceToken,
  providerUserPayload,
  providerUserToken,
  subscriberServiceToken,
  subscriberUserPayload,
  subscriberUserToken
} from '../../../../test-resources/test/test-util/mocked-access-tokens';
import {
  mockClientCredentialsGrantCall,
  mockClientCredentialsGrantWithCertCall,
  mockUserTokenGrantCall
} from '../../../../test-resources/test/test-util/xsuaa-service-mocks';
import { clientCredentialsTokenCache } from './client-credentials-token-cache';
import { jwtBearerToken, serviceToken } from './token-accessor';
import { clearXsuaaServices } from './environment-accessor';
import * as identityService from './identity-service';
import type { ClientCredentialsResponse } from './xsuaa-service-types';

describe('token accessor', () => {
  describe('serviceToken()', () => {
    beforeEach(() => {
      mockServiceBindings();
    });

    afterEach(() => {
      nock.cleanAll();
      clientCredentialsTokenCache.clear();
      jest.restoreAllMocks();
      clearXsuaaServices();
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

      const jwt = signedXsuaaJwt({
        iss: 'https://testeroni.example.com'
      });

      mockClientCredentialsGrantCall(
        `https://testeroni.${uaaDomain}`,
        { access_token: 'testValue' },
        200,
        destinationBindingClientSecretMock.credentials
      );

      await serviceToken('destination', { jwt });

      // no argument is default timeout
      expect(spy).toHaveBeenCalledWith();
    });

    it('uses the subdomain of the JWT as tenant', async () => {
      const accessToken = signedJwt({ dummy: 'content' });
      const jwt = signedXsuaaJwt({
        ext_attr: { zdn: 'testeroni' }
      });

      mockClientCredentialsGrantCall(
        `https://testeroni.${uaaDomain}`,
        { access_token: accessToken },
        200,
        destinationBindingClientSecretMock.credentials
      );

      const actual = await serviceToken('destination', { jwt });
      expect(actual).toBe(accessToken);
    });

    it('uses the issuer of the XSUAA JWT as tenant', async () => {
      const accessToken = signedJwt({ dummy: 'content' });
      const jwt = signedXsuaaJwt({
        iss: 'https://testeroni.example.com'
      });

      mockClientCredentialsGrantCall(
        `https://testeroni.${uaaDomain}`,
        { access_token: accessToken },
        200,
        destinationBindingClientSecretMock.credentials
      );

      const actual = await serviceToken('destination', { jwt });
      expect(actual).toBe(accessToken);
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
        destinationBindingClientSecretMock.credentials,
        testTenants.provider
      );

      mockClientCredentialsGrantCall(
        providerXsuaaUrl,
        { access_token: subscriberServiceToken },
        200,
        destinationBindingClientSecretMock.credentials,
        testTenants.subscriber
      );

      const providerToken = await serviceToken('destination', {
        jwt: providerUserToken
      });
      const subscriberToken = await serviceToken('destination', {
        jwt: subscriberUserToken
      });

      const providerTokenFromCache = clientCredentialsTokenCache.getToken(
        providerUserPayload.zid,
        destinationBindingClientSecretMock.credentials.clientid,
        undefined
      );
      const subscriberTokenFromCache = clientCredentialsTokenCache.getToken(
        subscriberUserPayload.zid,
        destinationBindingClientSecretMock.credentials.clientid,
        undefined
      );

      expect(providerTokenFromCache?.access_token).toEqual(providerToken);
      expect(subscriberTokenFromCache?.access_token).toEqual(subscriberToken);

      expect(
        clientCredentialsTokenCache.getToken(
          'https://doesnotexist.example.com',
          destinationBindingClientSecretMock.credentials.clientid,
          undefined
        )
      ).toBeUndefined();

      expect(
        clientCredentialsTokenCache.getToken(
          'https://doesnotexist.example.com',
          'schmusername',
          undefined
        )
      ).toBeUndefined();

      expect(
        clientCredentialsTokenCache.getToken(
          providerXsuaaUrl,
          'schmusername',
          undefined
        )
      ).toBeUndefined();

      expect(
        clientCredentialsTokenCache.getToken(
          subscriberXsuaaUrl,
          'schmusername',
          undefined
        )
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

      await expect(serviceToken('destination')).rejects.toThrow(
        'Could not fetch client credentials token for service of type "destination".'
      );
    });

    it('uses given service to retrieve token from cache', async () => {
      process.env.VCAP_SERVICES = JSON.stringify({
        destination: [destinationBindingClientSecretMock]
      });
      const token = signedJwt({ dummy: 'content' });

      clientCredentialsTokenCache.cacheToken(
        destinationBindingClientSecretMock.credentials.tenantid,
        destinationBindingClientSecretMock.credentials.clientid,
        undefined,
        { access_token: token } as ClientCredentialsResponse
      );

      await expect(serviceToken('destination')).resolves.toEqual(token);
    });

    it('uses given service to cache token', async () => {
      process.env.VCAP_SERVICES = JSON.stringify({
        destination: [destinationBindingClientSecretMock]
      });
      const token = { access_token: signedJwt({ dummy: 'content' }) };

      mockClientCredentialsGrantCall(
        destinationBindingClientSecretMock.credentials.url,
        token,
        200,
        destinationBindingClientSecretMock.credentials
      );

      clientCredentialsTokenCache.clear();

      await expect(serviceToken('destination')).resolves.toEqual(
        token.access_token
      );

      expect(
        clientCredentialsTokenCache.getToken(
          destinationBindingClientSecretMock.credentials.tenantid,
          destinationBindingClientSecretMock.credentials.clientid,
          undefined
        )
      ).toEqual(token);
    });

    it('throws an error if no target service is bound', async () => {
      process.env.VCAP_SERVICES = JSON.stringify({});

      await expect(
        serviceToken('destination')
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Could not find service binding of type \'destination\'."'
      );
    });

    describe('IAS/identity service handling', () => {
      const mockIasService = {
        name: 'my-identity',
        label: 'identity',
        tags: ['identity'],
        credentials: {
          url: 'https://tenant.accounts.ondemand.com',
          clientid: 'ias-client-id',
          clientsecret: 'ias-secret',
          app_tid: 'ias-tenant-id'
        }
      };

      const mockIasToken = {
        access_token: signedJwt({ jti: 'ias-jti', ias_apis: ['test'] }),
        token_type: 'Bearer',
        expires_in: 3600,
        scope: '' as const,
        jti: 'ias-jti',
        aud: [],
        ias_apis: ['test']
      };

      beforeEach(() => {
        process.env.VCAP_SERVICES = JSON.stringify({
          identity: [mockIasService]
        });
      });

      afterEach(() => {
        jest.restoreAllMocks();
      });

      it('uses getIasClientCredentialsToken for identity service', async () => {
        const getIasTokenSpy = jest
          .spyOn(identityService, 'getIasClientCredentialsToken')
          .mockResolvedValue(mockIasToken);

        const token = await serviceToken('identity');

        expect(token).toBe(mockIasToken.access_token);
        expect(getIasTokenSpy).toHaveBeenCalledWith(mockIasService, {
          authenticationType: 'OAuth2ClientCredentials',
          appTid: mockIasService.credentials.app_tid
        });
      });

      it('forwards iasOptions (resource and extraParams) to getIasClientCredentialsToken', async () => {
        const getIasTokenSpy = jest
          .spyOn(identityService, 'getIasClientCredentialsToken')
          .mockResolvedValue(mockIasToken);

        const iasOptions = {
          resource: { providerClientId: 'target-app-client-id' },
          extraParams: { custom_param: 'custom_value' }
        };

        await serviceToken('identity', { iasOptions });

        expect(getIasTokenSpy).toHaveBeenCalledWith(
          mockIasService,
          expect.objectContaining({
            resource: iasOptions.resource,
            extraParams: iasOptions.extraParams,
            authenticationType: 'OAuth2ClientCredentials',
            appTid: mockIasService.credentials.app_tid
          })
        );
      });

      it('uses tenant from JWT as appTid when JWT is provided', async () => {
        const getIasTokenSpy = jest
          .spyOn(identityService, 'getIasClientCredentialsToken')
          .mockResolvedValue(mockIasToken);

        const jwt = signedXsuaaJwt({
          zid: 'subscriber-tenant-id'
        });

        await serviceToken('identity', { jwt });

        expect(getIasTokenSpy).toHaveBeenCalledWith(
          mockIasService,
          expect.objectContaining({
            appTid: 'subscriber-tenant-id'
          })
        );
      });

      it('logs warning when using IAS service with XSUAA JWT', async () => {
        const logger = createLogger({
          package: 'connectivity',
          messageContext: 'token-accessor'
        });
        const warnSpy = jest.spyOn(logger, 'warn');

        jest
          .spyOn(identityService, 'getIasClientCredentialsToken')
          .mockResolvedValue(mockIasToken);

        const xsuaaJwt = signedXsuaaJwt({
          zid: 'unique-subscriber-tenant-id',
          ext_attr: { enhancer: 'XSUAA' }
        });

        await serviceToken('identity', { jwt: xsuaaJwt, useCache: false });

        expect(warnSpy).toHaveBeenCalledWith(
          expect.stringContaining(
            'Requesting token for IAS service with a XSUAA JWT'
          )
        );

        warnSpy.mockRestore();
      });

      it('uses explicitly provided appTid over automatically determined tenant', async () => {
        const getIasTokenSpy = jest
          .spyOn(identityService, 'getIasClientCredentialsToken')
          .mockResolvedValue(mockIasToken);

        const explicitAppTid = 'explicit-tenant-id';
        const jwt = signedXsuaaJwt({
          zid: 'jwt-tenant-id'
        });

        await serviceToken('identity', {
          jwt,
          iasOptions: { appTid: explicitAppTid }
        });

        expect(getIasTokenSpy).toHaveBeenCalledWith(
          mockIasService,
          expect.objectContaining({
            appTid: explicitAppTid // Should use explicit value, not jwt-tenant-id
          })
        );
      });

      it('caches IAS tokens with resource parameter', async () => {
        jest
          .spyOn(identityService, 'getIasClientCredentialsToken')
          .mockResolvedValue(mockIasToken);

        const iasOptions = {
          resource: { providerClientId: 'target-app-client-id' }
        };

        const first = await serviceToken('identity', { iasOptions });
        const second = await serviceToken('identity', { iasOptions });

        expect(first).toBe(mockIasToken.access_token);
        expect(second).toBe(mockIasToken.access_token);

        const cached = clientCredentialsTokenCache.getToken(
          mockIasService.credentials.app_tid,
          mockIasService.credentials.clientid,
          iasOptions.resource
        );

        expect(cached?.access_token).toBe(mockIasToken.access_token);
      });

      it('isolates cache by IAS resource parameter', async () => {
        jest
          .spyOn(identityService, 'getIasClientCredentialsToken')
          .mockResolvedValue(mockIasToken);

        const resource1 = { providerClientId: 'app-1' };
        const resource2 = { providerClientId: 'app-2' };

        await serviceToken('identity', { iasOptions: { resource: resource1 } });

        const cached1 = clientCredentialsTokenCache.getToken(
          mockIasService.credentials.app_tid,
          mockIasService.credentials.clientid,
          resource1
        );
        const cached2 = clientCredentialsTokenCache.getToken(
          mockIasService.credentials.app_tid,
          mockIasService.credentials.clientid,
          resource2
        );

        expect(cached1).toBeDefined();
        expect(cached2).toBeUndefined();
      });
    });
  });
});
