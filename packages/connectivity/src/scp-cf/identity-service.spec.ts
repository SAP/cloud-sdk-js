import { signedJwt } from '../../../../test-resources/test/test-util';
import {
  getIasClientCredentialsToken,
  shouldExchangeToken,
  clearIdentityServices
} from './identity-service';
import type { Service } from './environment-accessor';

const mockFetchClientCredentialsToken = jest.fn();
const mockFetchJwtBearerToken = jest.fn();

jest.mock('@sap/xssec', () => ({
  IdentityService: jest.fn().mockImplementation(() => ({
    fetchClientCredentialsToken: mockFetchClientCredentialsToken,
    fetchJwtBearerToken: mockFetchJwtBearerToken
  }))
}));

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
      ias_apis: ['dummy']
    }),
    token_type: 'Bearer',
    expires_in: 3600
  };

  beforeEach(() => {
    jest.clearAllMocks();
    clearIdentityServices();
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
      ias_apis: ['dummy']
    });
    expect(mockFetchClientCredentialsToken).toHaveBeenCalledWith({});
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
      ias_apis: ['dummy']
    });
    expect(mockFetchClientCredentialsToken).toHaveBeenCalledWith({});
  });

  it('includes resource parameter for app2app flow', async () => {
    mockFetchClientCredentialsToken.mockResolvedValue(mockTokenResponse);

    await getIasClientCredentialsToken(mockIasService, {
      resource: { name: 'my-app' }
    });

    expect(mockFetchClientCredentialsToken).toHaveBeenCalledWith({
      resource: 'urn:sap:identity:application:provider:name:my-app'
    });
  });

  it('includes appTid parameter for multi-tenant scenarios', async () => {
    mockFetchClientCredentialsToken.mockResolvedValue(mockTokenResponse);

    await getIasClientCredentialsToken(mockIasService, {
      appTid: 'tenant-123'
    });

    expect(mockFetchClientCredentialsToken).toHaveBeenCalledWith({
      app_tid: 'tenant-123'
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
      app_tid: 'tenant-123'
    });
  });

  it('includes extraParams for additional OAuth2 parameters', async () => {
    mockFetchClientCredentialsToken.mockResolvedValue(mockTokenResponse);

    await getIasClientCredentialsToken(mockIasService, {
      extraParams: { custom_param: 'custom_value' }
    });

    expect(mockFetchClientCredentialsToken).toHaveBeenCalledWith({
      custom_param: 'custom_value'
    });
  });

  it('handles token fetch errors gracefully', async () => {
    mockFetchClientCredentialsToken.mockRejectedValue(
      new Error('Network error')
    );

    await expect(getIasClientCredentialsToken(mockIasService)).rejects.toThrow(
      'Could not fetch IAS client credentials token for service of type identity'
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
        user_uuid: 'user-123',
        app_tid: 'tenant-456'
      });

      await getIasClientCredentialsToken(mockIasService, {
        authenticationType: 'OAuth2JWTBearer',
        assertion: userAssertion
      });

      expect(mockFetchJwtBearerToken).toHaveBeenCalledWith(userAssertion, {});
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
        refresh_token: '0'
      });
    });
  });
});
