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
        data: 'grant_type=client_credentials&client_id=test-client-id&refresh_token=0&token_format=jwt',
        httpsAgent: expect.any(Object)
      })
    );
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
        }),
        data: 'grant_type=client_credentials&client_id=test-client-id&refresh_token=0&token_format=jwt&client_secret=test-client-secret'
      })
    );
  });

  it('includes resource parameter for app2app flow', async () => {
    mockedAxios.request.mockResolvedValue({ data: mockTokenResponse });

    await getIasClientCredentialsToken(mockIasService, {
      appName: 'my-app'
    });

    expect(mockedAxios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        data: 'grant_type=client_credentials&client_id=test-client-id&resource=urn%3Asap%3Aidentity%3Aapplication%3Aprovider%3Aname%3Amy-app&refresh_token=0&token_format=jwt'
      })
    );
  });

  it('includes appTenantId parameter for multi-tenant scenarios', async () => {
    mockedAxios.request.mockResolvedValue({ data: mockTokenResponse });

    await getIasClientCredentialsToken(mockIasService, {
      appTenantId: 'tenant-123'
    });

    expect(mockedAxios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        data: 'grant_type=client_credentials&client_id=test-client-id&app_tid=tenant-123&refresh_token=0&token_format=jwt'
      })
    );
  });

  it('includes both appName and appTenantId parameters', async () => {
    mockedAxios.request.mockResolvedValue({ data: mockTokenResponse });

    await getIasClientCredentialsToken(mockIasService, {
      appName: 'my-app',
      appTenantId: 'tenant-123'
    });

    expect(mockedAxios.request).toHaveBeenCalledWith(
      expect.objectContaining({
        data: 'grant_type=client_credentials&client_id=test-client-id&resource=urn%3Asap%3Aidentity%3Aapplication%3Aprovider%3Aname%3Amy-app&app_tid=tenant-123&refresh_token=0&token_format=jwt'
      })
    );
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
});
