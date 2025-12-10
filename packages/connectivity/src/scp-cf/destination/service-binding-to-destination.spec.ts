import { resolveServiceBinding } from '../environment-accessor/service-bindings';
import { getIasClientCredentialsToken } from '../identity-service';
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
      { iasOptions: { appName: 'my-app' } }
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
        appName: 'my-app'
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
});
