import nock from 'nock';
import * as resilience from '@sap-cloud-sdk/resilience';
import {
  destinationBindingClientSecretMock,
  destinationBindingCertMock,
  mockServiceBindings,
  providerXsuaaCertUrl,
  providerXsuaaUrl,
  subscriberXsuaaUrl,
  testTenants,
  uaaDomain
} from '@sap-cloud-sdk/test-util-internal/environment-mocks';
import {
  signedJwt,
  signedXsuaaJwt
} from '@sap-cloud-sdk/test-util-internal/keys';
import {
  providerServiceToken,
  providerUserPayload,
  providerUserToken,
  subscriberServiceToken,
  subscriberUserPayload,
  subscriberUserToken
} from '@sap-cloud-sdk/test-util-internal/mocked-access-tokens';
import {
  mockClientCredentialsGrantCall,
  mockClientCredentialsGrantWithCertCall,
  mockUserTokenGrantCall
} from '@sap-cloud-sdk/test-util-internal/xsuaa-service-mocks';
import { clientCredentialsTokenCache } from './client-credentials-token-cache';
import {
  jwtBearerToken,
  serviceToken,
  getIasToken,
  getIasDestination
} from './token-accessor';
import { clearXsuaaServices } from './environment-accessor';
import type { Service } from './environment-accessor';
import type { ClientCredentialsResponse } from './xsuaa-service-types';

// Mock fetchIasToken so getIasToken tests don't need to set up xssec internals
jest.mock('./identity-service', () => ({
  ...jest.requireActual('./identity-service'),
  fetchIasToken: jest.fn(),
  getIasAppTid: jest.fn()
}));

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
        destinationBindingClientSecretMock.credentials.clientid
      );
      const subscriberTokenFromCache = clientCredentialsTokenCache.getToken(
        subscriberUserPayload.zid,
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
          destinationBindingClientSecretMock.credentials.clientid
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

    // This test is placed last because it can cause flaky behavior in subsequent tests
    // due to async cleanup timing issues with nock 14 and @mswjs/interceptors
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
  });
});

describe('getIasToken()', () => {
  const identityServiceMock = jest.requireMock('./identity-service');
  let mockFetchIasToken: jest.Mock;
  let mockGetIasAppTid: jest.Mock;

  const mockService: Service = {
    name: 'my-ias',
    label: 'identity',
    tags: ['identity'],
    credentials: {
      url: 'https://provider.accounts.ondemand.com',
      clientid: 'client-id',
      app_tid: 'provider-tenant-id',
      clientsecret: 'client-secret'
    }
  };

  const rawAccessToken = signedJwt({
    jti: 'token-jti',
    app_tid: 'token-app-tid',
    ias_apis: ['api1'],
    scim_id: 'user-scim-id'
  });

  const mockIasTokenResponse = {
    access_token: rawAccessToken,
    token_type: 'Bearer' as const,
    expires_in: 3600,
    scope: '' as const,
    jti: 'token-jti',
    aud: [],
    ias_apis: ['api1'],
    app_tid: 'token-app-tid',
    scim_id: 'user-scim-id'
  };

  beforeEach(() => {
    mockFetchIasToken = identityServiceMock.fetchIasToken as jest.Mock;
    mockGetIasAppTid = identityServiceMock.getIasAppTid as jest.Mock;
    mockFetchIasToken.mockResolvedValue(mockIasTokenResponse);
    mockGetIasAppTid.mockReturnValue(undefined);
    mockServiceBindings();
  });

  afterEach(() => {
    jest.clearAllMocks();
    clearXsuaaServices();
  });

  describe('input types', () => {
    it('accepts a Service object', async () => {
      const result = await getIasToken(mockService);

      expect(mockFetchIasToken).toHaveBeenCalledWith(
        mockService,
        expect.objectContaining({
          authenticationType: 'OAuth2ClientCredentials'
        })
      );
      expect(result).toBeDefined();
    });

    it('accepts raw ServiceCredentials and wraps them in a Service', async () => {
      await getIasToken(mockService.credentials);

      expect(mockFetchIasToken).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'identity',
          label: 'identity',
          tags: [],
          credentials: mockService.credentials
        }),
        expect.anything()
      );
    });

    it('accepts a service type string and resolves the binding', async () => {
      // 'destination' is bound via mockServiceBindings()
      await getIasToken('destination');

      expect(mockFetchIasToken).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'destination' }),
        expect.anything()
      );
    });
  });

  describe('return value', () => {
    it('returns an IasTokenResult with token, expiresIn, and no refreshToken by default', async () => {
      const result = await getIasToken(mockService);

      expect(result.token);
      expect(result.expiresIn).toBe(3600);
      expect(result.refreshToken).toBeUndefined();
    });

    it('returns refreshToken when present in the response', async () => {
      mockFetchIasToken.mockResolvedValue({
        ...mockIasTokenResponse,
        refresh_token: 'my-refresh-token'
      });

      const result = await getIasToken(mockService);

      expect(result.token).toBe(rawAccessToken);
      expect(result.expiresIn).toBe(3600);
      expect(result.refreshToken).toBe('my-refresh-token');
    });
  });

  describe('authenticationType', () => {
    it('defaults to OAuth2ClientCredentials', async () => {
      await getIasToken(mockService);

      expect(mockFetchIasToken).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          authenticationType: 'OAuth2ClientCredentials'
        })
      );
    });

    it('passes OAuth2JWTBearer with assertion', async () => {
      const assertion = signedJwt({ user_uuid: 'user-1', app_tid: 'tid' });

      await getIasToken(mockService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion
      });

      expect(mockFetchIasToken).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          authenticationType: 'OAuth2JWTBearer',
          assertion
        })
      );
    });

    it('does not resolve appTid for OAuth2JWTBearer', async () => {
      const assertion = signedJwt({ user_uuid: 'user-1', app_tid: 'tid' });

      await getIasToken(mockService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion
      });

      expect(mockGetIasAppTid).not.toHaveBeenCalled();
    });
  });

  describe('tenant resolution (requestAs)', () => {
    it('resolves appTid via getIasAppTid for client credentials when appTid not set', async () => {
      const jwt = { app_tid: 'subscriber-tid', iss: 'https://sub.example.com' };
      mockGetIasAppTid.mockReturnValue('subscriber-tid');

      await getIasToken(mockService, { jwt });

      expect(mockGetIasAppTid).toHaveBeenCalledWith(
        expect.objectContaining({
          authenticationType: 'OAuth2ClientCredentials'
        }),
        mockService,
        jwt
      );
      expect(mockFetchIasToken).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ appTid: 'subscriber-tid' })
      );
    });

    it('does not call getIasAppTid when appTid is explicitly provided', async () => {
      await getIasToken(mockService, { appTid: 'explicit-tid' });

      expect(mockGetIasAppTid).not.toHaveBeenCalled();
      expect(mockFetchIasToken).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ appTid: 'explicit-tid' })
      );
    });

    it('passes jwt to fetchIasToken for subdomain routing', async () => {
      const jwt = { app_tid: 'subscriber-tid', iss: 'https://sub.example.com' };

      await getIasToken(mockService, { jwt });

      expect(mockFetchIasToken).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ jwt })
      );
    });
  });

  describe('caching', () => {
    it('passes useCache: true by default', async () => {
      await getIasToken(mockService);

      expect(mockFetchIasToken).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ useCache: true })
      );
    });

    it('passes useCache: false when explicitly disabled', async () => {
      await getIasToken(mockService, { useCache: false });

      expect(mockFetchIasToken).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ useCache: false })
      );
    });
  });

  describe('resource parameter', () => {
    it('passes resource (by name) to fetchIasToken', async () => {
      await getIasToken(mockService, { resource: { name: 'my-app' } });

      expect(mockFetchIasToken).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({ resource: { name: 'my-app' } })
      );
    });

    it('passes resource (by providerClientId) to fetchIasToken', async () => {
      await getIasToken(mockService, {
        resource: {
          providerClientId: 'provider-client',
          providerTenantId: 'provider-tenant'
        }
      });

      expect(mockFetchIasToken).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          resource: {
            providerClientId: 'provider-client',
            providerTenantId: 'provider-tenant'
          }
        })
      );
    });
  });

  describe('error handling', () => {
    it('propagates errors from fetchIasToken', async () => {
      mockFetchIasToken.mockRejectedValue(
        new Error(
          'Could not fetch IAS client for service "my-ias": Network error'
        )
      );

      await expect(getIasToken(mockService)).rejects.toThrow(
        'Could not fetch IAS client for service "my-ias"'
      );
    });

    it('throws when service string cannot be resolved', async () => {
      await expect(getIasToken('nonexistent-service')).rejects.toThrow(
        "Could not find service binding of type 'nonexistent-service'."
      );
    });
  });
});

describe('getIasDestination()', () => {
  const identityServiceMock = jest.requireMock('./identity-service');
  let mockFetchIasToken: jest.Mock;
  let mockGetIasAppTid: jest.Mock;

  const mockCredentials = {
    url: 'https://provider.accounts.ondemand.com',
    clientid: 'client-id',
    app_tid: 'provider-tenant-id',
    clientsecret: 'client-secret',
    certificate: '-----BEGIN CERTIFICATE-----\ntest\n-----END CERTIFICATE-----',
    key: '-----BEGIN RSA PRIVATE KEY-----\ntest\n-----END RSA PRIVATE KEY-----'
  };

  const rawAccessToken = signedJwt({
    jti: 'token-jti',
    app_tid: 'token-app-tid',
    exp: Math.floor(Date.now() / 1000) + 3600
  });

  const mockIasTokenResponse = {
    access_token: rawAccessToken,
    token_type: 'Bearer' as const,
    expires_in: 3600,
    scope: '' as const,
    jti: 'token-jti',
    aud: [],
    ias_apis: [],
    app_tid: 'token-app-tid'
  };

  beforeEach(() => {
    mockFetchIasToken = identityServiceMock.fetchIasToken as jest.Mock;
    mockGetIasAppTid = identityServiceMock.getIasAppTid as jest.Mock;
    mockFetchIasToken.mockResolvedValue(mockIasTokenResponse);
    mockGetIasAppTid.mockReturnValue(undefined);
    mockServiceBindings();
  });

  afterEach(() => {
    jest.clearAllMocks();
    clearXsuaaServices();
  });

  it('returns an HttpDestination with token and service URL', async () => {
    const destination = await getIasDestination(mockCredentials);

    expect(destination).toEqual(
      expect.objectContaining({
        url: 'https://provider.accounts.ondemand.com',
        name: 'identity',
        authentication: 'OAuth2ClientCredentials',
        authTokens: expect.arrayContaining([
          expect.objectContaining({
            value: rawAccessToken,
            type: 'bearer'
          })
        ])
      })
    );
  });

  it('includes mTLS key pair when certificate and key are present', async () => {
    const destination = await getIasDestination(mockCredentials);

    expect(destination.mtlsKeyPair).toEqual({
      cert: '-----BEGIN CERTIFICATE-----\ntest\n-----END CERTIFICATE-----',
      key: '-----BEGIN RSA PRIVATE KEY-----\ntest\n-----END RSA PRIVATE KEY-----'
    });
  });

  it('does not include mTLS key pair when certificate/key are absent', async () => {
    const { certificate: _c, key: _k, ...credsWithoutCert } = mockCredentials;

    const destination = await getIasDestination(credsWithoutCert);

    expect(destination.mtlsKeyPair).toBeUndefined();
  });

  it('uses targetUrl when provided', async () => {
    const destination = await getIasDestination(mockCredentials, {
      targetUrl: 'https://custom-target.example.com'
    });

    expect(destination.url).toBe('https://custom-target.example.com');
  });

  it('uses OAuth2JWTBearer authentication type when specified', async () => {
    const assertion = signedJwt({ user_uuid: 'user-1', app_tid: 'tid' });

    const destination = await getIasDestination(mockCredentials, {
      authenticationType: 'OAuth2JWTBearer',
      assertion
    });

    expect(destination.authentication).toBe('OAuth2JWTBearer');
  });

  it('delegates to getIasToken with the provided options', async () => {
    await getIasDestination(mockCredentials, {
      useCache: false,
      jwt: { app_tid: 'tenant-123' }
    });

    expect(mockFetchIasToken).toHaveBeenCalledWith(
      expect.objectContaining({
        credentials: mockCredentials
      }),
      expect.objectContaining({
        useCache: false,
        jwt: { app_tid: 'tenant-123' }
      })
    );
  });
});
