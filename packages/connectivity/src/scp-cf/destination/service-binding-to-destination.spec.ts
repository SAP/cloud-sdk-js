import { resolveServiceBinding } from '../environment-accessor/service-bindings';
import { decodeJwt } from '../jwt';
import { serviceToken, getIasToken } from '../token-accessor';
import {
  transformServiceBindingToClientCredentialsDestination,
  transformServiceBindingToDestination
} from './service-binding-to-destination';

jest.mock('../token-accessor', () => ({
  serviceToken: jest.fn(),
  getIasToken: jest.fn()
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
    (getIasToken as jest.Mock).mockResolvedValue({
      token: 'ias-access-token',
      expiresIn: 3600
    });
    (decodeJwt as jest.Mock).mockReturnValue({ exp: 1596549600 });
    process.env.VCAP_SERVICES = JSON.stringify(services);
  });

  beforeEach(() => {
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
    expect(getIasToken).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'identity',
        name: 'my-identity-service'
      }),
      expect.objectContaining({})
    );
  });

  it('transforms identity (IAS) service binding for JWT bearer authentication', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('identity'),
      {
        iasOptions: {
          authenticationType: 'OAuth2JWTBearer',
          assertion: 'user-jwt-token'
        }
      }
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'https://tenant.accounts.ondemand.com',
        name: 'my-identity-service',
        authentication: 'OAuth2JWTBearer',
        authTokens: expect.arrayContaining([
          expect.objectContaining({
            value: 'ias-access-token',
            type: 'bearer'
          })
        ])
      })
    );
    expect(getIasToken).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'identity'
      }),
      expect.objectContaining({
        authenticationType: 'OAuth2JWTBearer',
        assertion: 'user-jwt-token'
      })
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
    expect(getIasToken).toHaveBeenCalledWith(
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

  it('transforms identity (IAS) service binding for JWT bearer with mTLS cert/key', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('identity'),
      {
        iasOptions: {
          authenticationType: 'OAuth2JWTBearer',
          assertion: 'user-jwt-token'
        }
      }
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'https://tenant.accounts.ondemand.com',
        name: 'my-identity-service',
        authentication: 'OAuth2JWTBearer',
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

  it('transforms identity (IAS) service binding for JWT bearer with custom targetUrl', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('identity'),
      {
        iasOptions: {
          authenticationType: 'OAuth2JWTBearer',
          assertion: 'user-jwt-token',
          targetUrl: 'https://custom-target.example.com'
        }
      }
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'https://custom-target.example.com',
        name: 'my-identity-service',
        authentication: 'OAuth2JWTBearer'
      })
    );
  });

  it('transforms identity (IAS) service binding for JWT bearer with resource parameter', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('identity'),
      {
        iasOptions: {
          authenticationType: 'OAuth2JWTBearer',
          assertion: 'user-jwt-token',
          resource: { name: 'my-target-app' }
        }
      }
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'https://tenant.accounts.ondemand.com',
        name: 'my-identity-service',
        authentication: 'OAuth2JWTBearer'
      })
    );
    expect(getIasToken).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'identity'
      }),
      expect.objectContaining({
        authenticationType: 'OAuth2JWTBearer',
        assertion: 'user-jwt-token',
        resource: { name: 'my-target-app' }
      })
    );
  });

  it('transforms identity (IAS) service binding for JWT bearer with resource providerClientId', async () => {
    const destination = await transformServiceBindingToDestination(
      resolveServiceBinding('identity'),
      {
        iasOptions: {
          authenticationType: 'OAuth2JWTBearer',
          assertion: 'user-jwt-token',
          resource: {
            providerClientId: 'target-client-id',
            providerTenantId: 'target-tenant-id'
          }
        }
      }
    );
    expect(destination).toEqual(
      expect.objectContaining({
        url: 'https://tenant.accounts.ondemand.com',
        name: 'my-identity-service',
        authentication: 'OAuth2JWTBearer'
      })
    );
    expect(getIasToken).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'identity'
      }),
      expect.objectContaining({
        authenticationType: 'OAuth2JWTBearer',
        assertion: 'user-jwt-token',
        resource: {
          providerClientId: 'target-client-id',
          providerTenantId: 'target-tenant-id'
        }
      })
    );
  });

  describe('transformIasBindingToDestination requestAs handling', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      // Re-apply mock after clearAllMocks
      (getIasToken as jest.Mock).mockResolvedValue({
        token: 'ias-access-token',
        expiresIn: 3600
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

      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({
          label: 'identity'
        }),
        expect.objectContaining({
          requestAs: 'provider-tenant'
        })
      );

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

      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({
          label: 'identity'
        }),
        expect.objectContaining({
          jwt: { app_tid: 'current-tenant-id' },
          requestAs: 'current-tenant'
        })
      );
    });

    it('defaults to current tenant when requestAs is not specified', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'current-tenant-id' }
        }
      );

      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({
          label: 'identity'
        }),
        expect.objectContaining({
          jwt: { app_tid: 'current-tenant-id' }
        })
      );
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

      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({
          label: 'identity'
        }),
        expect.objectContaining({
          appTid: 'explicit-tenant-789',
          requestAs: 'provider-tenant'
        })
      );

      // Restore original VCAP_SERVICES
      process.env.VCAP_SERVICES = JSON.stringify(services);
    });
  });

  describe('transformIasBindingToDestination cache functionality', () => {
    beforeEach(() => {
      jest.clearAllMocks();
      // Re-apply mock after clearAllMocks
      (getIasToken as jest.Mock).mockResolvedValue({
        token: 'ias-access-token',
        expiresIn: 3600
      });
    });

    it('passes useCache true by default to getIasToken', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        { jwt: { app_tid: 'tenant-123' } }
      );

      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'identity' }),
        expect.objectContaining({ useCache: true })
      );
    });

    it('passes useCache false when useCache is false', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        { jwt: { app_tid: 'tenant-123' }, useCache: false }
      );

      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'identity' }),
        expect.objectContaining({ useCache: false })
      );
    });

    it('passes useCache true when useCache is true', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        { jwt: { app_tid: 'tenant-123' }, useCache: true }
      );

      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'identity' }),
        expect.objectContaining({ useCache: true })
      );
    });

    it('passes resource parameter to getIasToken', async () => {
      const resource = { name: 'my-app' };

      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'tenant-123' },
          iasOptions: { resource }
        }
      );

      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'identity' }),
        expect.objectContaining({ resource })
      );
    });

    it('passes different resource parameters to getIasToken', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'tenant-123' },
          iasOptions: { resource: { name: 'app1' } }
        }
      );

      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'identity' }),
        expect.objectContaining({ resource: { name: 'app1' } })
      );

      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'tenant-123' },
          iasOptions: { resource: { name: 'app2' } }
        }
      );

      expect(getIasToken).toHaveBeenCalledTimes(2);
      expect(getIasToken).toHaveBeenLastCalledWith(
        expect.objectContaining({ label: 'identity' }),
        expect.objectContaining({ resource: { name: 'app2' } })
      );
    });

    it('passes jwt for tenant context to getIasToken', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        { jwt: { app_tid: 'tenant-123' } }
      );

      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'identity' }),
        expect.objectContaining({ jwt: { app_tid: 'tenant-123' } })
      );

      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        { jwt: { app_tid: 'tenant-456' } }
      );

      expect(getIasToken).toHaveBeenCalledTimes(2);
      expect(getIasToken).toHaveBeenLastCalledWith(
        expect.objectContaining({ label: 'identity' }),
        expect.objectContaining({ jwt: { app_tid: 'tenant-456' } })
      );
    });

    it('passes resource with providerClientId to getIasToken', async () => {
      const resource = { providerClientId: 'resource-client-123' };

      await transformServiceBindingToDestination(
        resolveServiceBinding('identity'),
        {
          jwt: { app_tid: 'tenant-123' },
          iasOptions: { resource }
        }
      );

      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'identity' }),
        expect.objectContaining({ resource })
      );
    });

    it('passes resource with providerClientId and providerTenantId to getIasToken', async () => {
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

      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'identity' }),
        expect.objectContaining({ resource })
      );
    });

    it('passes OAuth2JWTBearer authenticationType to getIasToken', async () => {
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

      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'identity' }),
        expect.objectContaining({
          authenticationType: 'OAuth2JWTBearer',
          assertion: 'user-jwt-token'
        })
      );
    });

    it('calls getIasToken without jwt when no jwt is provided', async () => {
      await transformServiceBindingToDestination(
        resolveServiceBinding('identity')
      );

      expect(getIasToken).toHaveBeenCalledTimes(1);
      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({ label: 'identity' }),
        expect.objectContaining({ useCache: true })
      );
    });

    it('passes different service bindings to getIasToken', async () => {
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

      await transformServiceBindingToDestination(iasService1, {
        jwt: { app_tid: 'tenant-123' }
      });

      expect(getIasToken).toHaveBeenCalledWith(
        expect.objectContaining({ name: 'ias-service-1' }),
        expect.objectContaining({ jwt: { app_tid: 'tenant-123' } })
      );

      await transformServiceBindingToDestination(iasService2, {
        jwt: { app_tid: 'tenant-123' }
      });

      expect(getIasToken).toHaveBeenCalledTimes(2);
      expect(getIasToken).toHaveBeenLastCalledWith(
        expect.objectContaining({ name: 'ias-service-2' }),
        expect.objectContaining({ jwt: { app_tid: 'tenant-123' } })
      );
    });
  });
});
