import {
  mockServiceToken,
  providerUserPayload
} from '../../../../../test-resources/test/test-util';
import * as tokenAccessor from '../token-accessor';
import { Service } from '../environment-accessor-types';
import { getDestination } from './destination-accessor';
import { destinationForServiceBinding } from './destination-from-vcap';
import { destinationCache } from './destination-cache';
import SpyInstance = jest.SpyInstance;

describe('vcap-service-destination', () => {
  const spy = jest.spyOn(tokenAccessor, 'serviceToken');

  beforeAll(() => {
    mockServiceToken();
  });

  beforeEach(() => {
    mockServiceBindings();
  });

  afterEach(() => {
    delete process.env.VCAP_SERVICES;
    jest.clearAllMocks();
  });

  function getActualClientId(spyInstance: SpyInstance): string {
    return spyInstance.mock.calls[0][0]['credentials']['clientid'];
  }

  it('creates a destination for the business logging service', async () => {
    await expect(
      destinationForServiceBinding('my-business-logging', {
        jwt: providerUserPayload
      })
    ).resolves.toEqual({
      url: 'https://business-logging.my.example.com',
      authentication: 'OAuth2ClientCredentials',
      name: 'my-business-logging',
      authTokens: [expect.objectContaining({ value: expect.any(String) })]
    });

    expect(getActualClientId(spy)).toBe('clientIdBusinessLogging');
  });

  it('creates ad destination for the xsuaa service', async () => {
    await expect(
      destinationForServiceBinding('my-xsuaa', {
        jwt: providerUserPayload
      })
    ).resolves.toEqual({
      url: 'https://api.authentication.sap.hana.ondemand.com',
      authentication: 'OAuth2ClientCredentials',
      name: 'my-xsuaa',
      authTokens: [expect.objectContaining({ value: expect.any(String) })]
    });

    expect(getActualClientId(spy)).toBe('clientIdXsUaa');
  });

  it('creates a destination for the service manager service', async () => {
    await expect(
      destinationForServiceBinding('my-service-manager', {
        jwt: providerUserPayload
      })
    ).resolves.toEqual({
      url: 'https://service-manager.cfapps.sap.hana.ondemand.com',
      authentication: 'OAuth2ClientCredentials',
      name: 'my-service-manager',
      authTokens: [expect.objectContaining({ value: expect.any(String) })]
    });

    expect(getActualClientId(spy)).toBe('clientIdServiceManager');
  });

  it('creates a destination for the destination service', async () => {
    await expect(
      destinationForServiceBinding('my-destination-service', {
        jwt: providerUserPayload
      })
    ).resolves.toEqual({
      url: 'https://destination-configuration.cfapps.sap.hana.ondemand.com',
      authentication: 'OAuth2ClientCredentials',
      name: 'my-destination-service',
      authTokens: [expect.objectContaining({ value: expect.any(String) })]
    });
    expect(getActualClientId(spy)).toBe('clientIdDestination');
  });

  it('creates a destination for the saas registry', async () => {
    await expect(
      destinationForServiceBinding('my-saas-registry', {
        jwt: providerUserPayload
      })
    ).resolves.toEqual({
      url: 'https://saas-manager.mesh.cf.sap.hana.ondemand.com',
      authentication: 'OAuth2ClientCredentials',
      name: 'my-saas-registry',
      authTokens: [expect.objectContaining({ value: expect.any(String) })]
    });
    expect(getActualClientId(spy)).toBe('clientIdSaasRegistry');
  });

  it('creates a destination for the workflow', async () => {
    await expect(
      destinationForServiceBinding('my-workflow', {
        jwt: providerUserPayload
      })
    ).resolves.toEqual({
      url: 'https://api.workflow-sap.cfapps.sap.hana.ondemand.com/workflow-service/odata',
      authentication: 'OAuth2ClientCredentials',
      name: 'my-workflow',
      authTokens: [expect.objectContaining({ value: expect.any(String) })]
    });
    expect(getActualClientId(spy)).toBe('clientIdWorkFlow');
  });

  it('creates a destination for the XF s4 hana cloud service', async () => {
    await expect(
      destinationForServiceBinding('my-s4-hana-cloud')
    ).resolves.toEqual({
      url: 'https://my.example.com',
      authentication: 'BasicAuthentication',
      username: 'USER_NAME',
      password: 'PASSWORD'
    });
  });

  it('uses the cache if enabled', async () => {
    await destinationCache.clear();

    await destinationForServiceBinding('my-destination-service', {
      useCache: true,
      jwt: providerUserPayload
    });
    await destinationForServiceBinding('my-destination-service', {
      useCache: true,
      jwt: providerUserPayload
    });

    expect(spy).toBeCalledTimes(1);
    expect(
      destinationCache
        .getCacheInstance()
        .get(`${providerUserPayload.zid}::my-destination`)
    ).toBeDefined();
  });

  it('creates a destination using a custom transformation function', async () => {
    const serviceBindingTransformFn = jest.fn(async (service: Service) => ({
      url: service.credentials.sys
    }));

    await expect(
      destinationForServiceBinding('my-custom-service', {
        serviceBindingTransformFn
      })
    ).resolves.toEqual({
      url: 'https://custom-service.my.example.com'
    });
    expect(serviceBindingTransformFn).toBeCalledTimes(1);
  });

  it('throws an error if the service type is not supported', async () => {
    await expect(() =>
      destinationForServiceBinding('my-custom-service')
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws an error if no service binding can be found for the given name', async () => {
    await expect(() =>
      destinationForServiceBinding('non-existent-service')
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"No service with the name: \\"non-existent-service\\" was found."'
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
      url: 'https://custom-service.my.example.com'
    });
    expect(serviceBindingTransformFn).toBeCalledTimes(1);
  });
});

function mockServiceBindings() {
  process.env.VCAP_SERVICES = JSON.stringify(serviceBindings);
}

const serviceBindings = {
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
