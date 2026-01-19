import { resolveServiceBinding } from '../environment-accessor/service-bindings';
import { getIasClientCredentialsToken } from '../identity-service';
import { clientCredentialsTokenCache } from '../client-credentials-token-cache';
import { decodeJwt } from '../jwt';
import { serviceToken } from '../token-accessor';
import {
  transformServiceBindingToClientCredentialsDestination,
  transformServiceBindingToDestination
} from './service-binding-to-destination';

jest.mock('../identity-service', () => ({
  getIasClientCredentialsToken: jest.fn()
}));

jest.mock('../token-accessor', () => ({
  serviceToken: jest.fn()
}));

jest.mock('../jwt', () => ({
  decodeJwt: jest.fn()
}));

const services = {
  identity: [
    {
      name: 'my-identity-service',
      label: 'identity',
      tags: ['identity'],
      credentials: {
        url: 'https://tenant.accounts.ondemand.com',
        clientid: 'identity-clientid',
        certificate:
          '-----BEGIN CERTIFICATE-----\ntest\n-----END CERTIFICATE-----',
        key: '-----BEGIN RSA PRIVATE KEY-----\ntest\n-----END RSA PRIVATE KEY-----'
      }
    }
  ],
  destination: [
    {
      name: 'my-destination-service1',
      label: 'destination',
      tags: ['destination1'],
      credentials: {
        clientid: 'destination-clientid1',
        clientsecret: 'destination-clientsecret1',
        uri: 'destination-uri1'
      }
    },
    {
      name: 'my-destination-service2',
      label: 'destination',
      tags: ['destination2'],
      credentials: {
        clientid: 'destination-clientid2',
        clientsecret: 'destination-clientsecret2',
        uri: 'destination-uri2'
      }
    }
  ],
  xsuaa: [
    {
      name: 'my-xsuaa-service1',
      label: 'xsuaa',
      tags: ['xsuaa1'],
      credentials: {
        clientid: 'xsuaa-clientid',
        clientsecret: 'xsuaa-clientsecret',
        apiurl: 'xsuaa-url'
      }
    }
  ],
  aicore: [
    {
      name: 'my-aicore-service1',
      label: 'aicore',
      tags: ['aicore1'],
      credentials: {
        clientid: 'aicore-clientid',
        clientsecret: 'aicore-clientsecret',
        serviceurls: {
          AI_API_URL: 'aicore-url'
        }
      }
    }
  ],
  's4-hana-cloud': [
    {
      name: 's4-hana-cloud-service',
      label: 's4-hana-cloud',
      credentials: {
        User: 'username',
        Password: 'password',
        URL: 's4-hana-cloud-url'
      }
    }
  ],
  'some-service': [
    {
      name: 'some-service1',
      label: 'some-service',
      tags: ['some-service'],
      url: 'some-service-url',
      credentials: {
        clientid: 'some-service-clientid',
        clientsecret: 'some-service-clientsecret'
      }
    }
  ],
  workflow: [
    {
      label: 'workflow',
      name: 'my-workflow',
      tags: [],
      credentials: {
        endpoints: {
          workflow_odata_url: 'workflow-odata-url',
          workflow_rest_url: 'workflow-rest-url'
        },
        uaa: {
          clientid: 'workflow-clientid',
          clientsecret: 'workflow-client-secret'
        }
      }
    }
  ]
};

describe('service binding to destination', () => {
  beforeAll(() => {
    (serviceToken as jest.Mock).mockResolvedValue('access-token');
    (getIasClientCredentialsToken as jest.Mock).mockResolvedValue({
      access_token: 'ias-access-token',
      token_type: 'Bearer',
      expires_in: 3600,
      scope: 'openid',
      jti: 'mock-jti'
    });
    (decodeJwt as jest.Mock).mockReturnValue({ exp: 1596549600 });
    process.env.VCAP_SERVICES = JSON.stringify(services);
  });

  beforeEach(() => {
    clientCredentialsTokenCache.clear();
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
    delete process.env.VCAP_SERVICES;
  });

  it('transforms aicore service binding', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('aicore')
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'aicore-url',
        name: 'my-aicore-service1',
        authentication: 'OAuth2ClientCredentials',
        authTokens: expect.arrayContaining([
          expect.objectContaining({
            value: 'access-token',
            type: 'bearer'
          })
        ])
      })
    );
  });

  it('transforms xsuaa service binding', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('xsuaa')
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'xsuaa-url',
        name: 'my-xsuaa-service1',
        authentication: 'OAuth2ClientCredentials',
        authTokens: expect.arrayContaining([
          expect.objectContaining({
            value: 'access-token',
            type: 'bearer'
          })
        ])
      })
    );
  });

  it('transforms workflow service binding', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('workflow')
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'workflow-odata-url',
        name: 'my-workflow',
        authentication: 'OAuth2ClientCredentials',
        authTokens: expect.arrayContaining([
          expect.objectContaining({
            value: 'access-token',
            type: 'bearer'
          })
        ])
      })
    );
  });

  it('transforms the first destination service binding from multiple ones available', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('destination')
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'destination-uri1',
        name: 'my-destination-service1',
        authentication: 'OAuth2ClientCredentials',
        authTokens: expect.arrayContaining([
          expect.objectContaining({
            value: 'access-token',
            type: 'bearer'
          })
        ])
      })
    );
  });

  it('transforms the s4-hana-cloud service binding into basic auth destination', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('s4-hana-cloud')
    );
    expect(destination).toEqual({
      url: 's4-hana-cloud-url',
      authentication: 'BasicAuthentication',
      username: 'username',
      password: 'password'
    });
  });

  it('transforming unsupported service type throws', async () => {
    await expect(() =>
      transformServiceBindingToDestination(
        resolveServiceBinding('some-service')
      )
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"The provided service binding of type some-service is not supported out of the box for destination transformation."'
    );
  });

  it('transforms a generic service binding to a client credentials destination', async () => {
    const destination =
      await transformServiceBindingToClientCredentialsDestination(
        resolveServiceBinding('some-service')
      );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'some-service-url',
        name: 'some-service1',
        authentication: 'OAuth2ClientCredentials',
        authTokens: expect.arrayContaining([
          expect.objectContaining({
            value: 'access-token',
            type: 'bearer'
          })
        ])
      })
    );
  });

  it('transforms a generic service binding to a client credentials destination with custom url', async () => {
    const destination =
      await transformServiceBindingToClientCredentialsDestination(
        resolveServiceBinding('some-service'),
        { url: 'some-custom-service-url' }
      );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'some-custom-service-url',
        name: 'some-service1',
        authentication: 'OAuth2ClientCredentials',
        authTokens: expect.arrayContaining([
          expect.objectContaining({
            value: 'access-token',
            type: 'bearer'
          })
        ])
      })
    );
  });

  it('transforms identity (IAS) service binding', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('identity')
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'https://tenant.accounts.ondemand.com',
        name: 'my-identity-service',
        authentication: 'OAuth2ClientCredentials',
        authTokens: expect.arrayContaining([
          expect.objectContaining({
            value: 'ias-access-token',
            type: 'bearer'
          })
        ])
      })
    );
    expect(getIasClientCredentialsToken).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'identity',
        name: 'my-identity-service'
      }),
      expect.objectContaining({})
    );
  });

  it('transforms identity (IAS) service binding with appName parameter', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('identity'),
      { iasOptions: { resource: { name: 'my-app' } } }
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'https://tenant.accounts.ondemand.com',
        name: 'my-identity-service',
        authentication: 'OAuth2ClientCredentials'
      })
    );
    expect(getIasClientCredentialsToken).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'identity'
      }),
      expect.objectContaining({
        resource: { name: 'my-app' }
      })
    );
  });

  it('transforms identity (IAS) service binding with custom targetUrl', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('identity'),
      { iasOptions: { targetUrl: 'https://custom-target.example.com' } }
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'https://custom-target.example.com',
        name: 'my-identity-service',
        authentication: 'OAuth2ClientCredentials'
      })
    );
  });

  it('transforms identity (IAS) service binding and includes mTLS cert/key in destination', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('identity')
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'https://tenant.accounts.ondemand.com',
        name: 'my-identity-service',
        authentication: 'OAuth2ClientCredentials',
        mtlsKeyPair: {
          cert: '-----BEGIN CERTIFICATE-----\ntest\n-----END CERTIFICATE-----',
          key: '-----BEGIN RSA PRIVATE KEY-----\ntest\n-----END RSA PRIVATE KEY-----'
        },
        authTokens: expect.arrayContaining([
          expect.objectContaining({
            value: 'ias-access-token',
            type: 'bearer'
          })
        ])
      })
    );
  });

  describe('iasBindingToDestination requestAs handling', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      clientCredentialsTokenCache.clear();
      // Re-apply mock after clearAllMocks
      (getIasClientCredentialsToken as jest.Mock).mockResolvedValue({
        access_token: 'ias-access-token',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'openid',
        jti: 'mock-jti'
      });
    });

    it('uses provider tenant when requestAs is provider-tenant', async () => {
      const identityServiceWithAppTid = {
        ...services.identity[0],
        app_tid: 'provider-tenant-id',
        credentials: {
          ...services.identity[0].credentials,
          app_tid: 'provider-tenant-id'
        }
      };

      process.env.VCAP_SERVICES = JSON.stringify({
        ...services,
        identity: [identityServiceWithAppTid]
      });

      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          iasOptions: { requestAs: 'provider-tenant' }
        }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledWith(
        expect.objectContaining({
          label: 'identity'
        }),
        expect.objectContaining({})
      );

      // Verify cache was populated with provider tenant
      const cached = clientCredentialsTokenCache.getTokenIas({
        iasInstance: 'tenant.accounts.ondemand.com',
        appTid: 'provider-tenant-id',
        clientId: 'identity-clientid'
      });
      expect(cached?.access_token).toBe('ias-access-token');

      // Restore original VCAP_SERVICES
      process.env.VCAP_SERVICES = JSON.stringify(services);
    });

    it('uses current tenant when requestAs is current-tenant', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'current-tenant-id' },
          iasOptions: { requestAs: 'current-tenant' }
        }
      );

      // Verify cache was populated with current tenant
      const cached = clientCredentialsTokenCache.getTokenIas({
        iasInstance: 'tenant.accounts.ondemand.com',
        appTid: 'current-tenant-id',
        clientId: 'identity-clientid'
      });
      expect(cached?.access_token).toBe('ias-access-token');
    });

    it('defaults to current tenant when requestAs is not specified', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'current-tenant-id' }
        }
      );

      // Verify cache was populated with current tenant (default behavior)
      const cached = clientCredentialsTokenCache.getTokenIas({
        iasInstance: 'tenant.accounts.ondemand.com',
        appTid: 'current-tenant-id',
        clientId: 'identity-clientid'
      });
      expect(cached?.access_token).toBe('ias-access-token');
    });

    it('prioritizes explicit appTid over requestAs', async () => {
      const identityServiceWithAppTid = {
        ...services.identity[0],
        app_tid: 'provider-tenant-id',
        credentials: {
          ...services.identity[0].credentials,
          app_tid: 'provider-tenant-id'
        }
      };

      process.env.VCAP_SERVICES = JSON.stringify({
        ...services,
        identity: [identityServiceWithAppTid]
      });

      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          iasOptions: {
            requestAs: 'provider-tenant',
            appTid: 'explicit-tenant-789'
          }
        }
      );

      // Verify cache was populated with explicit appTid, not provider tenant
      const cached = clientCredentialsTokenCache.getTokenIas({
        iasInstance: 'tenant.accounts.ondemand.com',
        appTid: 'explicit-tenant-789',
        clientId: 'identity-clientid'
      });
      expect(cached?.access_token).toBe('ias-access-token');

      // Restore original VCAP_SERVICES
      process.env.VCAP_SERVICES = JSON.stringify(services);
    });
  });

  describe('iasBindingToDestination cache functionality', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      clientCredentialsTokenCache.clear();
      // Re-apply mock after clearAllMocks
      (getIasClientCredentialsToken as jest.Mock).mockResolvedValue({
        access_token: 'ias-access-token',
        token_type: 'Bearer',
        expires_in: 3600,
        scope: 'openid',
        jti: 'mock-jti'
      });
    });

    it('caches IAS token after first request', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        { jwt: { app_tid: 'tenant-123' } }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);

      // Second call should use cached token
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        { jwt: { app_tid: 'tenant-123' } }
      );

      // Should still only be called once due to cache hit
      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);
    });

    it('does not cache IAS token if useCache is false', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        { jwt: { app_tid: 'tenant-123' }, useCache: false }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);

      // Second call should use cached token
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        { jwt: { app_tid: 'tenant-123' }, useCache: false }
      );

      // Should be called twice - no caching
      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(2);
    });

    it('does cache IAS token if useCache is true', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        { jwt: { app_tid: 'tenant-123' }, useCache: true }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);

      // Second call should use cached token
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        { jwt: { app_tid: 'tenant-123' }, useCache: true }
      );

      // Should still only be called once due to cache hit
      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);
    });

    it('uses cache key with resource parameter', async () => {
      const resource = { name: 'my-app' };

      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'tenant-123' },
          iasOptions: { resource }
        }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);

      // Second call with same resource should use cache
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'tenant-123' },
          iasOptions: { resource }
        }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);
    });

    it('does not use cache for different resource parameters', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'tenant-123' },
          iasOptions: { resource: { name: 'app1' } }
        }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);

      // Second call with different resource should NOT use cache
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'tenant-123' },
          iasOptions: { resource: { name: 'app2' } }
        }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(2);
    });

    it('isolates cache by tenant (appTid)', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        { jwt: { app_tid: 'tenant-123' } }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);

      // Different tenant should not use cache
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        { jwt: { app_tid: 'tenant-456' } }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(2);
    });

    it('supports resource with providerClientId', async () => {
      const resource = { providerClientId: 'resource-client-123' };

      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'tenant-123' },
          iasOptions: { resource }
        }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);

      // Second call with same resource should use cache
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'tenant-123' },
          iasOptions: { resource }
        }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);
    });

    it('supports resource with providerClientId and providerTenantId', async () => {
      const resource = {
        providerClientId: 'resource-client-123',
        providerTenantId: 'resource-tenant-456'
      };

      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'tenant-123' },
          iasOptions: { resource }
        }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);

      // Second call with same resource should use cache
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'tenant-123' },
          iasOptions: { resource }
        }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);
    });

    it('does not cache JWT bearer tokens (OAuth2JWTBearer)', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'tenant-123' },
          iasOptions: {
            authenticationType: 'OAuth2JWTBearer',
            assertion: 'user-jwt-token'
          }
        }
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);

      // Second call should NOT use cache for JWT bearer tokens
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'tenant-123' },
          iasOptions: {
            authenticationType: 'OAuth2JWTBearer',
            assertion: 'user-jwt-token'
          }
        }
      );

      // Should be called twice - no caching for JWT bearer
      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(2);
    });

    it('handles missing app_tid (no JWT, no provider tenant)', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity')
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);

      // Verify cache was populated with just IAS tenant (no app_tid)
      const cached = clientCredentialsTokenCache.getTokenIas({
        iasInstance: 'tenant.accounts.ondemand.com',
        clientId: 'identity-clientid'
      });
      expect(cached?.access_token).toBe('ias-access-token');

      // Second call without app_tid should use cache
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity')
      );

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);
    });

    it('isolates cache by IAS tenant (different service URLs)', async () => {
      const iasService1 = {
        ...services.identity[0],
        name: 'ias-service-1',
        credentials: {
          ...services.identity[0].credentials,
          url: 'https://tenant1.accounts.ondemand.com',
          clientid: 'client-1'
        }
      };

      const iasService2 = {
        ...services.identity[0],
        name: 'ias-service-2',
        credentials: {
          ...services.identity[0].credentials,
          url: 'https://tenant2.accounts.ondemand.com',
          clientid: 'client-2'
        }
      };

      // First call to IAS service 1
      await transformServiceBindingToDestination(iasService1, {
        jwt: { app_tid: 'tenant-123' }
      });

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(1);

      // Second call to IAS service 2 with same app_tid should NOT use cache
      // because IAS tenant is different
      await transformServiceBindingToDestination(iasService2, {
        jwt: { app_tid: 'tenant-123' }
      });

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(2);

      // Third call to IAS service 1 again with same app_tid should use cache
      await transformServiceBindingToDestination(iasService1, {
        jwt: { app_tid: 'tenant-123' }
      });

      expect(getIasClientCredentialsToken).toHaveBeenCalledTimes(2);
    });
  });
});
