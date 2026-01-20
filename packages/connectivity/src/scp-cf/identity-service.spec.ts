import { signedJwt } from '../../../../test-resources/test/test-util';
import {
  getIasClientCredentialsToken,
  shouldExchangeToken,
  identityServicesCache
} from './identity-service';
import type { Service } from './environment-accessor';

const mockFetchClientCredentialsToken = jest.fn();
const mockFetchJwtBearerToken = jest.fn();

jest.mock('@sap/xssec', () => {
  const mockGetSafeUrlFromTokenIssuer = jest.fn();
  const mockIdentityService: any = jest.fn().mockImplementation(() => ({
    fetchClientCredentialsToken: mockFetchClientCredentialsToken,
    fetchJwtBearerToken: mockFetchJwtBearerToken
  }));
  mockIdentityService.getSafeUrlFromTokenIssuer = mockGetSafeUrlFromTokenIssuer;

  return {
    ...jest.requireActual<object>('@sap/xssec'),
    IdentityService: mockIdentityService,
    IdentityServiceToken: jest.fn().mockImplementation((jwt: string) => {
      const payload = JSON.parse(
        Buffer.from(jwt.split('.')[1], 'base64').toString()
      );
      return {
        payload,
        appTid: payload.app_tid ?? payload.zone_uuid,
        scimId: payload.scim_id,
        consumedApis: payload.ias_apis,
        customIssuer: payload.iss,
        issuer: payload.iss
      };
    })
  };
});

describe('shouldExchangeToken', () => {
  it('should not exchange token from XSUAA', async () => {
    expect(
      shouldExchangeToken({
        jwt: signedJwt({ ext_attr: { enhancer: 'XSUAA' } })
      })
    ).toBe(false);
  });

  it('should exchange IAS token', async () => {
    expect(
      shouldExchangeToken({
        iasToXsuaaTokenExchange: true,
        jwt: signedJwt({ iss: 'https://tenant.accounts.ondemand.com' })
      })
    ).toBe(true);
  });

  it('should not exchange token, if there is no JWT given', async () => {
    expect(shouldExchangeToken({ iasToXsuaaTokenExchange: true })).toBe(false);
  });

  it('should not exchange token, if `iasToXsuaaTokenExchange` is disabled', async () => {
    expect(
      shouldExchangeToken({
        iasToXsuaaTokenExchange: false,
        jwt: signedJwt({})
      })
    ).toBe(false);
  });

  it('should not exchange token, if `iasToXsuaaTokenExchange` is undefined', async () => {
    expect(
      shouldExchangeToken({
        jwt: signedJwt({})
      })
    ).toBe(false);
  });
});

describe('getIasClientCredentialsToken', () => {
  const mockIasService: Service = {
    name: 'my-identity-service',
    label: 'identity',
    tags: ['identity'],
    credentials: {
      url: 'https://tenant.accounts.ondemand.com',
      clientid: 'test-client-id',
      certificate:
        '-----BEGIN CERTIFICATE-----\ntest-cert\n-----END CERTIFICATE-----',
      key: '-----BEGIN RSA PRIVATE KEY-----\ntest-key\n-----END RSA PRIVATE KEY-----'
    }
  };

  const mockTokenResponse = {
    access_token: signedJwt({
      jti: 'mock-jti',
      aud: 'test-audience',
      ias_apis: ['dummy'],
      // Fallback value if app_tid missing (legacy)
      zone_uuid: 'custom-tenant-id',
      iss: 'https://tenant.accounts.ondemand.com',
      ias_iss: 'https://ias-tenant.accounts.ondemand.com'
    }),
    token_type: 'Bearer',
    expires_in: 3600
  };

  beforeEach(() => {
    jest.clearAllMocks();
    identityServicesCache.clear();
  });

  it('fetches IAS token with mTLS authentication', async () => {
    mockFetchClientCredentialsToken.mockResolvedValue(mockTokenResponse);

    const result = await getIasClientCredentialsToken(mockIasService);

    expect(result).toEqual({
      access_token: mockTokenResponse.access_token,
      token_type: mockTokenResponse.token_type,
      expires_in: mockTokenResponse.expires_in,
      scope: '',
      jti: 'mock-jti',
      aud: 'test-audience',
      app_tid: 'custom-tenant-id',
      custom_iss: 'https://tenant.accounts.ondemand.com',
      ias_apis: ['dummy'],
      scim_id: undefined
    });
    expect(mockFetchClientCredentialsToken).toHaveBeenCalledWith({
      token_format: 'jwt'
    });
  });

  it('fetches IAS token with client secret authentication', async () => {
    const serviceWithSecret: Service = {
      ...mockIasService,
      credentials: {
        url: 'https://tenant.accounts.ondemand.com',
        clientid: 'test-client-id',
        clientsecret: 'test-client-secret'
      }
    };

    mockFetchClientCredentialsToken.mockResolvedValue(mockTokenResponse);

    const result = await getIasClientCredentialsToken(serviceWithSecret);

    expect(result).toEqual({
      access_token: mockTokenResponse.access_token,
      token_type: mockTokenResponse.token_type,
      expires_in: mockTokenResponse.expires_in,
      scope: '',
      jti: 'mock-jti',
      aud: 'test-audience',
      app_tid: 'custom-tenant-id',
      custom_iss: 'https://tenant.accounts.ondemand.com',
      ias_apis: ['dummy'],
      scim_id: undefined
    });
    expect(mockFetchClientCredentialsToken).toHaveBeenCalledWith({
      token_format: 'jwt'
    });
  });

  it('includes resource parameter for app2app flow', async () => {
    mockFetchClientCredentialsToken.mockResolvedValue(mockTokenResponse);

    await getIasClientCredentialsToken(mockIasService, {
      resource: { name: 'my-app' }
    });

    expect(mockFetchClientCredentialsToken).toHaveBeenCalledWith({
      resource: 'urn:sap:identity:application:provider:name:my-app',
      token_format: 'jwt'
    });
  });

  it('includes appTid parameter for multi-tenant scenarios', async () => {
    mockFetchClientCredentialsToken.mockResolvedValue(mockTokenResponse);

    await getIasClientCredentialsToken(mockIasService, {
      appTid: 'tenant-123'
    });

    expect(mockFetchClientCredentialsToken).toHaveBeenCalledWith({
      app_tid: 'tenant-123',
      token_format: 'jwt'
    });
  });

  it('includes both appName and appTid parameters', async () => {
    mockFetchClientCredentialsToken.mockResolvedValue(mockTokenResponse);

    await getIasClientCredentialsToken(mockIasService, {
      resource: { name: 'my-app' },
      appTid: 'tenant-123'
    });

    expect(mockFetchClientCredentialsToken).toHaveBeenCalledWith({
      resource: 'urn:sap:identity:application:provider:name:my-app',
      app_tid: 'tenant-123',
      token_format: 'jwt'
    });
  });

  it('includes extraParams for additional OAuth2 parameters', async () => {
    mockFetchClientCredentialsToken.mockResolvedValue(mockTokenResponse);

    await getIasClientCredentialsToken(mockIasService, {
      extraParams: { custom_param: 'custom_value' } as any
    });

    expect(mockFetchClientCredentialsToken).toHaveBeenCalledWith({
      token_format: 'jwt',
      custom_param: 'custom_value'
    });
  });

  it('handles token fetch errors gracefully', async () => {
    mockFetchClientCredentialsToken.mockRejectedValue(
      new Error('Network error')
    );

    await expect(getIasClientCredentialsToken(mockIasService)).rejects.toThrow(
      'Could not fetch IAS client credentials token for service "my-identity-service" of type identity: Network error'
    );
  });

  it('adds multi-tenant hint for 401 errors', async () => {
    const error: any = new Error('Unauthorized');
    error.response = { status: 401 };
    mockFetchClientCredentialsToken.mockRejectedValue(error);

    await expect(getIasClientCredentialsToken(mockIasService)).rejects.toThrow(
      /ensure that the service instance is declared as dependency to SaaS Provisioning Service or Subscription Manager/
    );
  });

  describe('authenticationType parameter', () => {
    it('uses OAuth2ClientCredentials (technical-user) by default', async () => {
      mockFetchClientCredentialsToken.mockResolvedValue(mockTokenResponse);

      await getIasClientCredentialsToken(mockIasService, {});

      expect(mockFetchClientCredentialsToken).toHaveBeenCalled();
      expect(mockFetchJwtBearerToken).not.toHaveBeenCalled();
    });

    it('uses client credentials for OAuth2ClientCredentials', async () => {
      mockFetchClientCredentialsToken.mockResolvedValue(mockTokenResponse);

      await getIasClientCredentialsToken(mockIasService, {
        authenticationType: 'OAuth2ClientCredentials'
      });

      expect(mockFetchClientCredentialsToken).toHaveBeenCalled();
      expect(mockFetchJwtBearerToken).not.toHaveBeenCalled();
    });

    it('uses JWT bearer grant for OAuth2JWTBearer (business-user) with assertion', async () => {
      mockFetchJwtBearerToken.mockResolvedValue(mockTokenResponse);

      const userAssertion = signedJwt({
        iss: 'https://tenant.accounts.ondemand.com',
        user_uuid: 'user-123',
        app_tid: 'tenant-456'
      });

      await getIasClientCredentialsToken(mockIasService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion: userAssertion
      });

      expect(mockFetchJwtBearerToken).toHaveBeenCalledWith(userAssertion, {
        token_format: 'jwt',
        app_tid: 'tenant-456',
        refresh_expiry: 0
      });
      expect(mockFetchClientCredentialsToken).not.toHaveBeenCalled();
    });

    it('throws error for OAuth2JWTBearer (business-user) without assertion', async () => {
      await expect(
        getIasClientCredentialsToken(mockIasService, {
          authenticationType: 'OAuth2JWTBearer'
        } as any)
      ).rejects.toThrow(
        'JWT assertion required for authenticationType: "OAuth2JWTBearer"'
      );
    });

    it('supports OAuth2JWTBearer (business-user) with resource and appTid', async () => {
      mockFetchJwtBearerToken.mockResolvedValue(mockTokenResponse);

      const userAssertion = signedJwt({
        iss: 'https://tenant.accounts.ondemand.com',
        user_uuid: 'user-123',
        app_tid: 'tenant-456'
      });

      await getIasClientCredentialsToken(mockIasService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion: userAssertion,
        resource: { name: 'my-app' },
        appTid: 'tenant-123'
      });

      expect(mockFetchJwtBearerToken).toHaveBeenCalledWith(userAssertion, {
        resource: 'urn:sap:identity:application:provider:name:my-app',
        app_tid: 'tenant-123',
        refresh_expiry: 0,
        token_format: 'jwt'
      });
    });
  });

  describe('multi-tenant subscriber routing', () => {
    const providerUrl = 'https://provider.accounts.ondemand.com';
    const subscriberUrl = 'https://subscriber.accounts.ondemand.com';

    const providerService: Service = {
      name: 'provider-ias',
      label: 'identity',
      tags: ['identity'],
      credentials: {
        url: providerUrl,
        clientid: 'test-client-id',
        clientsecret: 'test-secret'
      }
    };

    beforeEach(() => {
      jest.clearAllMocks();
      identityServicesCache.clear();
      mockFetchJwtBearerToken.mockResolvedValue(mockTokenResponse);
    });

    it('uses provider IdentityService when JWT issuer matches provider URL', async () => {
      const assertion = signedJwt({
        iss: providerUrl,
        user_uuid: 'user-123'
      });

      await getIasClientCredentialsToken(providerService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion
      });

      expect(mockFetchJwtBearerToken).toHaveBeenCalledWith(assertion, {
        token_format: 'jwt',
        app_tid: null
      });
    });

    it('creates subscriber IdentityService when JWT issuer differs from provider', async () => {
      const assertion = signedJwt({
        iss: subscriberUrl,
        user_uuid: 'user-123'
      });

      const { IdentityService } = jest.requireMock('@sap/xssec');

      await getIasClientCredentialsToken(providerService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion
      });

      // Verify subscriber instance created with subscriber URL
      expect(IdentityService).toHaveBeenCalledWith(
        expect.objectContaining({
          url: subscriberUrl
        }),
        undefined
      );

      expect(mockFetchJwtBearerToken).toHaveBeenCalledWith(assertion, {
        token_format: 'jwt',
        app_tid: null
      });
    });

    it('does not route for client credentials flow', async () => {
      const { IdentityService } = jest.requireMock('@sap/xssec');

      mockFetchClientCredentialsToken.mockResolvedValue(mockTokenResponse);

      await getIasClientCredentialsToken(providerService, {
        authenticationType: 'OAuth2ClientCredentials'
      });

      // Should only create provider instance
      expect(IdentityService).toHaveBeenCalledTimes(1);
      expect(IdentityService).toHaveBeenCalledWith(
        expect.objectContaining({
          url: providerUrl
        }),
        undefined
      );
    });

    it('handles JWT without issuer gracefully with fallback', async () => {
      const assertion = signedJwt({
        // Missing issuer field - should fall back to provider URL
        user_uuid: 'user-123'
      });

      const result = await getIasClientCredentialsToken(providerService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion
      });

      // Should succeed with fallback to provider credentials
      expect(result.access_token).toBeDefined();
      expect(mockFetchJwtBearerToken).toHaveBeenCalled();
    });

    it('disables refresh tokens for JWT bearer exchanges with APP-to-APP flow', async () => {
      const assertion = signedJwt({
        iss: subscriberUrl,
        user_uuid: 'user-123'
      });

      await getIasClientCredentialsToken(providerService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion,
        resource: { name: 'my-app' }
      });

      expect(mockFetchJwtBearerToken).toHaveBeenCalledWith(assertion, {
        resource: 'urn:sap:identity:application:provider:name:my-app',
        refresh_expiry: 0,
        token_format: 'jwt',
        app_tid: null
      });
    });

    it('includes refresh_token when returned by fetchJwtBearerToken', async () => {
      const assertion = signedJwt({
        iss: subscriberUrl,
        user_uuid: 'user-123'
      });

      const responseWithRefreshToken = {
        ...mockTokenResponse,
        refresh_token: 'test-refresh-token'
      };
      mockFetchJwtBearerToken.mockResolvedValue(responseWithRefreshToken);

      const result = await getIasClientCredentialsToken(providerService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion
      });

      expect(result.refresh_token).toBe('test-refresh-token');
    });

    it('disables refresh tokens for JWT bearer exchanges if app_tid is set', async () => {
      const assertion = signedJwt({
        iss: subscriberUrl,
        user_uuid: 'user-123'
      });

      await getIasClientCredentialsToken(providerService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion,
        appTid: 'some-tenant-id'
      });

      expect(mockFetchJwtBearerToken).toHaveBeenCalledWith(assertion, {
        app_tid: 'some-tenant-id',
        refresh_expiry: 0,
        token_format: 'jwt'
      });
    });

    it('extracts app_tid from assertion when not explicitly provided', async () => {
      const assertion = signedJwt({
        iss: subscriberUrl,
        user_uuid: 'user-123',
        app_tid: 'extracted-tenant-id'
      });

      await getIasClientCredentialsToken(providerService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion
      });

      expect(mockFetchJwtBearerToken).toHaveBeenCalledWith(assertion, {
        app_tid: 'extracted-tenant-id',
        refresh_expiry: 0,
        token_format: 'jwt'
      });
    });

    it('sets app_tid to null when neither app_tid nor zone_uuid exist in assertion', async () => {
      const assertion = signedJwt({
        iss: subscriberUrl,
        user_uuid: 'user-123'
        // No app_tid or zone_uuid
      });

      await getIasClientCredentialsToken(providerService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion
      });

      expect(mockFetchJwtBearerToken).toHaveBeenCalledWith(assertion, {
        app_tid: null,
        token_format: 'jwt'
      });
    });

    it('does not override explicit app_tid with value from assertion', async () => {
      const assertion = signedJwt({
        iss: subscriberUrl,
        user_uuid: 'user-123',
        app_tid: 'assertion-tenant-id'
      });

      await getIasClientCredentialsToken(providerService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion,
        appTid: 'explicit-tenant-id'
      });

      expect(mockFetchJwtBearerToken).toHaveBeenCalledWith(assertion, {
        app_tid: 'explicit-tenant-id',
        refresh_expiry: 0,
        token_format: 'jwt'
      });
    });

    it('caches subscriber instances per URL', async () => {
      const subscriber1Url = 'https://subscriber1.accounts.ondemand.com';
      const subscriber2Url = 'https://subscriber2.accounts.ondemand.com';

      const assertion1 = signedJwt({
        iss: subscriber1Url,
        user_uuid: 'user-123'
      });

      const assertion2 = signedJwt({
        iss: subscriber2Url,
        user_uuid: 'user-456'
      });

      const { IdentityService } = jest.requireMock('@sap/xssec');

      // First call with subscriber1
      await getIasClientCredentialsToken(providerService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion: assertion1
      });

      const callsAfterFirst = IdentityService.mock.calls.length;

      // Second call with same subscriber1 - should use cached instance
      await getIasClientCredentialsToken(providerService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion: assertion1
      });

      // Should not create new instance (cached)
      expect(IdentityService.mock.calls.length).toBe(callsAfterFirst);

      // Third call with different subscriber2 - should create new instance
      await getIasClientCredentialsToken(providerService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion: assertion2
      });

      // Should create new instance for subscriber2
      expect(IdentityService.mock.calls.length).toBeGreaterThan(
        callsAfterFirst
      );
    });

    it('handles URLs with trailing slashes correctly', async () => {
      const providerWithSlash = 'https://provider.accounts.ondemand.com/';

      const serviceWithSlash: Service = {
        ...providerService,
        credentials: {
          ...providerService.credentials,
          url: providerWithSlash
        }
      };

      const assertion = signedJwt({
        iss: 'https://provider.accounts.ondemand.com',
        user_uuid: 'user-123'
      });

      const { IdentityService } = jest.requireMock('@sap/xssec');

      await getIasClientCredentialsToken(serviceWithSlash, {
        authenticationType: 'OAuth2JWTBearer',
        assertion
      });

      // Should handle URLs with and without trailing slashes
      expect(IdentityService).toHaveBeenCalled();
    });
  });
});
