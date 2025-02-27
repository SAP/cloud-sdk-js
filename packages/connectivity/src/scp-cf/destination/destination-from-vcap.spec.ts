import {
  mockServiceToken,
  providerUserPayload,
  providerUserToken,
  signedJwt,
  signedJwtForVerification,
  testTenants
} from '../../../../../test-resources/test/test-util';
import * as tokenAccessor from '../token-accessor';
import { decodeJwt } from '../jwt';
import { getDestination } from './destination-accessor';
import { getDestinationFromServiceBinding } from './destination-from-vcap';
import { destinationCache } from './destination-cache';
import SpyInstance = jest.SpyInstance;
import type { Service } from '../environment-accessor';

describe('vcap-service-destination', () => {
  const serviceTokenSpy = jest.spyOn(tokenAccessor, 'serviceToken');

  beforeAll(() => {
    mockServiceToken();
  });

  beforeEach(() => {
    mockServiceBindings();
  });

  afterEach(async () => {
    delete process.env.VCAP_SERVICES;
    jest.clearAllMocks();
    await destinationCache.clear();
  });

  function getActualClientId(spyInstance: SpyInstance): string {
    return spyInstance.mock.calls[0][0]['credentials']['clientid'];
  }

  it('creates a destination for the aicore service', async () => {
    await expect(
      getDestinationFromServiceBinding({
        destinationName: 'my-aicore',
        jwt: providerUserToken
      })
    ).resolves.toEqual({
      url: 'https://https://api.ai.internalprod.eu-central-1.aws.ml.hana.ondemand.com',
      authentication: 'OAuth2ClientCredentials',
      name: 'my-aicore',
      authTokens: [expect.objectContaining({ value: expect.any(String) })]
    });

    expect(getActualClientId(serviceTokenSpy)).toBe('clientIdAicore');
  });

  it('creates a destination for the business logging service', async () => {
    await expect(
      getDestinationFromServiceBinding({
        destinationName: 'my-business-logging',
        jwt: providerUserToken
      })
    ).resolves.toEqual({
      url: 'https://business-logging.my.example.com',
      authentication: 'OAuth2ClientCredentials',
      name: 'my-business-logging',
      authTokens: [expect.objectContaining({ value: expect.any(String) })]
    });

    expect(getActualClientId(serviceTokenSpy)).toBe('clientIdBusinessLogging');
  });

  it('creates ad destination for the xsuaa service', async () => {
    await expect(
      getDestinationFromServiceBinding({
        destinationName: 'my-xsuaa',
        jwt: providerUserToken
      })
    ).resolves.toEqual({
      url: 'https://api.authentication.sap.hana.ondemand.com',
      authentication: 'OAuth2ClientCredentials',
      name: 'my-xsuaa',
      authTokens: [expect.objectContaining({ value: expect.any(String) })]
    });

    expect(getActualClientId(serviceTokenSpy)).toBe('clientIdXsUaa');
  });

  it('creates a destination for the service manager service', async () => {
    await expect(
      getDestinationFromServiceBinding({
        destinationName: 'my-service-manager',
        jwt: providerUserToken
      })
    ).resolves.toEqual({
      url: 'https://service-manager.cfapps.sap.hana.ondemand.com',
      authentication: 'OAuth2ClientCredentials',
      name: 'my-service-manager',
      authTokens: [expect.objectContaining({ value: expect.any(String) })]
    });

    expect(getActualClientId(serviceTokenSpy)).toBe('clientIdServiceManager');
  });

  it('creates a destination for the destination service', async () => {
    await expect(
      getDestinationFromServiceBinding({
        destinationName: 'my-destination-service',
        jwt: providerUserToken
      })
    ).resolves.toEqual({
      url: 'https://destination-configuration.cfapps.sap.hana.ondemand.com',
      authentication: 'OAuth2ClientCredentials',
      name: 'my-destination-service',
      authTokens: [expect.objectContaining({ value: expect.any(String) })]
    });
    expect(getActualClientId(serviceTokenSpy)).toBe('clientIdDestination');
  });

  it('creates a destination for the saas registry', async () => {
    await expect(
      getDestinationFromServiceBinding({
        destinationName: 'my-saas-registry',
        jwt: providerUserToken
      })
    ).resolves.toEqual({
      url: 'https://saas-manager.mesh.cf.sap.hana.ondemand.com',
      authentication: 'OAuth2ClientCredentials',
      name: 'my-saas-registry',
      authTokens: [expect.objectContaining({ value: expect.any(String) })]
    });
    expect(getActualClientId(serviceTokenSpy)).toBe('clientIdSaasRegistry');
  });

  it('creates a destination for the workflow', async () => {
    await expect(
      getDestinationFromServiceBinding({
        destinationName: 'my-workflow',
        jwt: providerUserToken
      })
    ).resolves.toEqual({
      url: 'https://api.workflow-sap.cfapps.sap.hana.ondemand.com/workflow-service/odata',
      authentication: 'OAuth2ClientCredentials',
      name: 'my-workflow',
      authTokens: [expect.objectContaining({ value: expect.any(String) })]
    });
    expect(getActualClientId(serviceTokenSpy)).toBe('clientIdWorkFlow');
  });

  it('creates a destination for the XF s4 hana cloud service', async () => {
    await expect(
      getDestinationFromServiceBinding({ destinationName: 'my-s4-hana-cloud' })
    ).resolves.toEqual({
      url: 'https://my.example.com',
      authentication: 'BasicAuthentication',
      username: 'USER_NAME',
      password: 'PASSWORD',
      name: 'my-s4-hana-cloud'
    });
  });

  it('uses the cache if enabled', async () => {
    await getDestinationFromServiceBinding({
      destinationName: 'my-destination-service',
      useCache: true,
      jwt: providerUserToken
    });
    await getDestinationFromServiceBinding({
      destinationName: 'my-destination-service',
      useCache: true,
      jwt: providerUserToken
    });
    expect(serviceTokenSpy).toBeCalledTimes(1);
    expect(
      destinationCache
        .getCacheInstance()
        .get(`${providerUserPayload.zid}::my-destination`)
    ).toBeDefined();
  });

  it('returns undefined if cached destination JWT has expired', async () => {
    const jwtPayload = {
      iat: 1692273899,
      exp: 1692317098,
      zid: testTenants.provider,
      user_id: 'user-prov',
      ext_attr: { enhancer: 'XSUAA' }
    };
    const jwt = signedJwtForVerification(jwtPayload);
    jest.useFakeTimers();
    await getDestinationFromServiceBinding({
      destinationName: 'my-destination-service',
      useCache: true,
      jwt
    });
    jest.advanceTimersByTime(720 * 60 * 1000 + 1);
    await expect(
      destinationCache
        .getCacheInstance()
        .get(`${jwtPayload.zid}::my-destination-service`)
    ).resolves.toBeUndefined();
  });

  it('creates a destination using a custom transformation function', async () => {
    const serviceBindingTransformFn = jest.fn(async () => ({}));

    await getDestinationFromServiceBinding({
      destinationName: 'my-custom-service',
      serviceBindingTransformFn
    });

    expect(serviceBindingTransformFn).toBeCalledTimes(1);
  });

  it("adds a name to transformed destinations that don't have a name", async () => {
    await expect(
      getDestinationFromServiceBinding({
        destinationName: 'my-custom-service',
        serviceBindingTransformFn: async service => ({
          url: service.credentials.sys
        })
      })
    ).resolves.toEqual({
      url: 'https://custom-service.my.example.com',
      name: 'my-custom-service'
    });
  });

  it('does not overwrite transformed name', async () => {
    await expect(
      getDestinationFromServiceBinding({
        destinationName: 'my-custom-service',
        serviceBindingTransformFn: async service => ({
          url: service.credentials.sys,
          name: 'peter'
        })
      })
    ).resolves.toEqual({
      url: 'https://custom-service.my.example.com',
      name: 'peter'
    });
  });

  it('throws an error if the service type is not supported', async () => {
    await expect(() =>
      getDestinationFromServiceBinding({ destinationName: 'my-custom-service' })
    ).rejects.toThrowErrorMatchingInlineSnapshot(`
      "The service "my-custom-service" is of type "undefined" which is not supported! Consider providing your own transformation function when calling \`getDestinationFromServiceBinding()\`, like this:
        destinationServiceForBinding(yourServiceName, { serviceBindingToDestination: yourTransformationFunction });"
    `);
  });

  it('throws an error if no service binding can be found for the given name', async () => {
    await expect(() =>
      getDestinationFromServiceBinding({
        destinationName: 'non-existent-service'
      })
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Could not find service with name: \'non-existent-service\'."'
    );
  });

  it('finds the destination when searching for service bindings', async () => {
    const serviceBindingTransformFn = jest.fn(async (service: Service) => ({
      url: service.credentials.sys
    }));

    await expect(
      getDestination({
        destinationName: 'my-custom-service',
        serviceBindingTransformFn
      })
    ).resolves.toEqual({
      url: 'https://custom-service.my.example.com',
      name: 'my-custom-service'
    });
    expect(serviceBindingTransformFn).toBeCalledTimes(1);
  });

  it('sets forwarded auth token if needed (uncached)', async () => {
    const jwt = signedJwt({});

    const destination = await getDestinationFromServiceBinding({
      destinationName: 'my-custom-service',
      jwt,
      serviceBindingTransformFn: async ({ name }) => ({
        forwardAuthToken: true,
        name
      })
    });

    expect(destination?.authTokens?.[0]).toMatchObject({ value: jwt });
  });

  it('sets forwarded auth token if needed (cached)', async () => {
    const jwt = signedJwt({ zid: 'tenant' });

    destinationCache.cacheRetrievedDestination(
      decodeJwt(jwt),
      {
        name: 'my-custom-service',
        forwardAuthToken: true
      },
      'tenant'
    );

    const destination = await getDestinationFromServiceBinding({
      destinationName: 'my-custom-service',
      useCache: true,
      jwt
    });

    expect(destination?.authTokens?.[0]).toMatchObject({ value: jwt });
  });

  // TODO: fix in #1123
  it.skip('does not cache the forwarded token', async () => {
    const jwt = signedJwt({ zid: 'tenant' });

    await getDestinationFromServiceBinding({
      destinationName: 'my-custom-service',
      useCache: true,
      jwt,
      serviceBindingTransformFn: async ({ name }) => ({
        forwardAuthToken: true,
        name
      })
    });

    const destination = await destinationCache.retrieveDestinationFromCache(
      decodeJwt(jwt),
      'my-custom-service',
      'tenant'
    );

    expect(destination).toBeDefined();
    expect(destination?.authTokens).toBeUndefined();
  });
});

function mockServiceBindings() {
  process.env.VCAP_SERVICES = JSON.stringify(serviceBindings);
}

const serviceBindings = {
  aicore: [
    {
      name: 'my-aicore',
      label: 'aicore',
      tags: ['aicore'],
      credentials: {
        serviceurls: {
          AI_API_URL:
            'https://https://api.ai.internalprod.eu-central-1.aws.ml.hana.ondemand.com'
        },
        clientid: 'clientIdAicore',
        clientsecret: 'secretAicore',
        url: 'https://subaccount.authentication.sap.hana.ondemand.com'
      }
    }
  ],
  'business-logging': [
    {
      name: 'my-business-logging',
      label: 'business-logging',
      tags: [
        'business-logging',
        'logging',
        'com.sap.appbasic.businesslogs',
        'comsapappbasicbusinesslogs'
      ],
      credentials: {
        writeUrl: 'https://business-logging.my.example.com',
        uaa: {
          clientid: 'clientIdBusinessLogging',
          clientsecret: 'PASSWORD'
        }
      }
    }
  ],
  workflow: [
    {
      name: 'my-workflow',
      label: 'workflow',
      tags: [],
      credentials: {
        endpoints: {
          workflow_odata_url:
            'https://api.workflow-sap.cfapps.sap.hana.ondemand.com/workflow-service/odata',
          workflow_rest_url:
            'https://api.workflow-sap.cfapps.sap.hana.ondemand.com/workflow-service/rest'
        },
        uaa: {
          clientid: 'clientIdWorkFlow',
          clientsecret: 'PASSWORD'
        }
      }
    }
  ],
  destination: [
    {
      name: 'my-destination-service',
      label: 'destination',
      credentials: {
        clientid: 'clientIdDestination',
        clientsecret: 'PASSWORD',
        uri: 'https://destination-configuration.cfapps.sap.hana.ondemand.com'
      }
    }
  ],
  'custom-service': [
    {
      credentials: {
        sys: 'https://custom-service.my.example.com'
      },
      name: 'my-custom-service'
    }
  ],
  's4-hana-cloud': [
    {
      name: 'my-s4-hana-cloud',
      label: 's4-hana-cloud',
      credentials: {
        Password: 'PASSWORD',
        URL: 'https://my.example.com',
        User: 'USER_NAME'
      }
    }
  ],
  'saas-registry': [
    {
      label: 'saas-registry',
      name: 'my-saas-registry',
      credentials: {
        clientid: 'clientIdSaasRegistry',
        clientsecret: 'PASSWORD',
        saas_registry_url: 'https://saas-manager.mesh.cf.sap.hana.ondemand.com'
      }
    }
  ],
  'service-manager': [
    {
      label: 'service-manager',
      name: 'my-service-manager',
      credentials: {
        sm_url: 'https://service-manager.cfapps.sap.hana.ondemand.com',
        clientid: 'clientIdServiceManager',
        clientsecret: 'PASSWORD'
      }
    }
  ],
  xsuaa: [
    {
      label: 'xsuaa',
      name: 'my-xsuaa',
      tags: ['xsuaa'],
      credentials: {
        clientid: 'clientIdXsUaa',
        clientsecret: 'PASSWORD',
        apiurl: 'https://api.authentication.sap.hana.ondemand.com'
      }
    }
  ]
};
