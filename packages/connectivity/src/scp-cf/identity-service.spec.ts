import axios from 'axios';
import { signedJwt } from '../../../../test-resources/test/test-util';
import {
  getIasClientCredentialsToken,
  shouldExchangeToken
} from './identity-service';
import type { Service } from './environment-accessor';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('shouldExchangeToken', () => {
  it('should not exchange token from XSUAA', async () => {
    expect(
      shouldExchangeToken({
        jwt: signedJwt({ ext_attr: { enhancer: 'XSUAA' } })
      })
    ).toBe(false);
  });

  it('should exchange non-XSUAA token', async () => {
    expect(
      shouldExchangeToken({ iasToXsuaaTokenExchange: true, jwt: signedJwt({}) })
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
    access_token: 'mock-ias-access-token',
    token_type: 'Bearer',
    expires_in: 3600,
    scope: 'openid',
    jti: 'mock-jti'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches IAS token with mTLS authentication', async () => {
    mockedAxios.request.mockResolvedValue({ data: mockTokenResponse });

    const result = await getIasClientCredentialsToken(mockIasService);

    expect(result).toEqual(mockTokenResponse);
    expect(mockedAxios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'post',
        url: 'https://tenant.accounts.ondemand.com/oauth2/token',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        httpsAgent: expect.any(Object)
      })
    );
    // Verify the data contains required parameters (order may vary)
    const callData = mockedAxios.request.mock.calls[0][0].data;
    expect(callData).toContain('grant_type=client_credentials');
    expect(callData).toContain('client_id=test-client-id');
    expect(callData).toContain('token_format=jwt');
    expect(callData).not.toContain('refresh_token=0'); // Should not appear for technical users
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

    mockedAxios.request.mockResolvedValue({ data: mockTokenResponse });

    const result = await getIasClientCredentialsToken(serviceWithSecret);

    expect(result).toEqual(mockTokenResponse);
    expect(mockedAxios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'post',
        url: 'https://tenant.accounts.ondemand.com/oauth2/token',
        headers: expect.objectContaining({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
    );
    // Verify the data contains required parameters (order may vary)
    const callData = mockedAxios.request.mock.calls[0][0].data;
    expect(callData).toContain('grant_type=client_credentials');
    expect(callData).toContain('client_id=test-client-id');
    expect(callData).toContain('token_format=jwt');
    expect(callData).toContain('client_secret=test-client-secret');
    expect(callData).not.toContain('refresh_token=0'); // Should not appear for technical users
  });

  it('includes resource parameter for app2app flow', async () => {
    mockedAxios.request.mockResolvedValue({ data: mockTokenResponse });

    await getIasClientCredentialsToken(mockIasService, {
      resource: { name: 'my-app' }
    });

    const callData = mockedAxios.request.mock.calls[0][0].data;
    expect(callData).toContain('grant_type=client_credentials');
    expect(callData).toContain(
      'resource=urn%3Asap%3Aidentity%3Aapplication%3Aprovider%3Aname%3Amy-app'
    );
    expect(callData).not.toContain('refresh_token=0');
  });

  it('includes appTenantId parameter for multi-tenant scenarios', async () => {
    mockedAxios.request.mockResolvedValue({ data: mockTokenResponse });

    await getIasClientCredentialsToken(mockIasService, {
      appTenantId: 'tenant-123'
    });

    const callData = mockedAxios.request.mock.calls[0][0].data;
    expect(callData).toContain('grant_type=client_credentials');
    expect(callData).toContain('app_tid=tenant-123');
    expect(callData).not.toContain('refresh_token=0');
  });

  it('includes both appName and appTenantId parameters', async () => {
    mockedAxios.request.mockResolvedValue({ data: mockTokenResponse });

    await getIasClientCredentialsToken(mockIasService, {
      resource: { name: 'my-app' },
      appTenantId: 'tenant-123'
    });

    const callData = mockedAxios.request.mock.calls[0][0].data;
    expect(callData).toContain('grant_type=client_credentials');
    expect(callData).toContain(
      'resource=urn%3Asap%3Aidentity%3Aapplication%3Aprovider%3Aname%3Amy-app'
    );
    expect(callData).toContain('app_tid=tenant-123');
    expect(callData).not.toContain('refresh_token=0');
  });

  it('includes extraParams for additional OAuth2 parameters', async () => {
    mockedAxios.request.mockResolvedValue({ data: mockTokenResponse });

    await getIasClientCredentialsToken(mockIasService, {
      extraParams: {
        custom_param: 'custom_value',
        another_param: 'another_value'
      }
    });

    expect(mockedAxios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.stringContaining('custom_param=custom_value')
      })
    );
    expect(mockedAxios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.stringContaining('another_param=another_value')
      })
    );
  });

  it('throws error when url is missing', async () => {
    const invalidService: Service = {
      ...mockIasService,
      credentials: {
        clientid: 'test-client-id',
        certificate: 'cert',
        key: 'key'
      } as any
    };

    await expect(getIasClientCredentialsToken(invalidService)).rejects.toThrow(
      'IAS credentials must contain "url" and "clientid"'
    );
  });

  it('throws error when clientid is missing', async () => {
    const invalidService: Service = {
      ...mockIasService,
      credentials: {
        url: 'https://tenant.accounts.ondemand.com',
        certificate: 'cert',
        key: 'key'
      } as any
    };

    await expect(getIasClientCredentialsToken(invalidService)).rejects.toThrow(
      'IAS credentials must contain "url" and "clientid"'
    );
  });

  it('throws error when neither certificate/key nor clientsecret is provided', async () => {
    const invalidService: Service = {
      ...mockIasService,
      credentials: {
        url: 'https://tenant.accounts.ondemand.com',
        clientid: 'test-client-id'
      } as any
    };

    await expect(getIasClientCredentialsToken(invalidService)).rejects.toThrow(
      'IAS credentials must contain either "certificate" and "key" for mTLS, or "clientsecret" for client secret authentication'
    );
  });

  it('handles token fetch errors gracefully', async () => {
    mockedAxios.request.mockRejectedValue(new Error('Network error'));

    await expect(getIasClientCredentialsToken(mockIasService)).rejects.toThrow(
      'Could not fetch IAS client credentials token for service of type identity'
    );
  });

  describe('actAs parameter', () => {
    it('uses technical-user by default', async () => {
      mockedAxios.request.mockResolvedValue({ data: mockTokenResponse });

      await getIasClientCredentialsToken(mockIasService, {});

      const callData = mockedAxios.request.mock.calls[0][0].data;
      expect(callData).toContain('grant_type=client_credentials');
      expect(callData).not.toContain('assertion=');
      expect(callData).not.toContain('refresh_token=0');
    });

    it('uses client credentials for technical-user', async () => {
      mockedAxios.request.mockResolvedValue({ data: mockTokenResponse });

      await getIasClientCredentialsToken(mockIasService, {
        actAs: 'technical-user'
      });

      const callData = mockedAxios.request.mock.calls[0][0].data;
      expect(callData).toContain('grant_type=client_credentials');
      expect(callData).not.toContain('assertion=');
      expect(callData).not.toContain('refresh_token=0');
    });

    it('uses JWT bearer grant for business-user with assertion', async () => {
      mockedAxios.request.mockResolvedValue({ data: mockTokenResponse });

      await getIasClientCredentialsToken(mockIasService, {
        actAs: 'business-user',
        assertion: 'user-jwt-token'
      });

      const callData = mockedAxios.request.mock.calls[0][0].data;
      expect(callData).toContain(
        'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer'
      );
      expect(callData).toContain('assertion=user-jwt-token');
      expect(callData).toContain('refresh_token=0'); // Workaround applied for business users
    });

    it('throws error for business-user without assertion', async () => {
      await expect(
        getIasClientCredentialsToken(mockIasService, {
          actAs: 'business-user'
        } as any)
      ).rejects.toThrow('JWT assertion required for actAs: "business-user"');
    });

    it('includes refresh_token workaround only for business-user', async () => {
      mockedAxios.request.mockResolvedValue({ data: mockTokenResponse });

      // Technical user - no refresh_token
      await getIasClientCredentialsToken(mockIasService, {
        actAs: 'technical-user'
      });
      let callData = mockedAxios.request.mock.calls[0][0].data;
      expect(callData).not.toContain('refresh_token=0');

      jest.clearAllMocks();

      // Business user - has refresh_token
      await getIasClientCredentialsToken(mockIasService, {
        actAs: 'business-user',
        assertion: 'user-jwt'
      });
      callData = mockedAxios.request.mock.calls[0][0].data;
      expect(callData).toContain('refresh_token=0');
    });

    it('supports business-user with resource and appTenantId', async () => {
      mockedAxios.request.mockResolvedValue({ data: mockTokenResponse });

      await getIasClientCredentialsToken(mockIasService, {
        actAs: 'business-user',
        assertion: 'user-jwt-token',
        resource: { name: 'my-app' },
        appTenantId: 'tenant-123'
      });

      const callData = mockedAxios.request.mock.calls[0][0].data;
      expect(callData).toContain(
        'grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer'
      );
      expect(callData).toContain('assertion=user-jwt-token');
      expect(callData).toContain(
        'resource=urn%3Asap%3Aidentity%3Aapplication%3Aprovider%3Aname%3Amy-app'
      );
      expect(callData).toContain('app_tid=tenant-123');
      expect(callData).toContain('refresh_token=0');
    });
  });
});
