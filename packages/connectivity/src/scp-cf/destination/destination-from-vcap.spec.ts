import { getDestination } from './destination-accessor';
import {
  destinationForServiceBinding,
  ServiceBinding
} from './destination-from-vcap';

describe('vcap-service-destination', () => {
  beforeEach(() => {
    mockServiceBindings();
  });

  afterEach(() => {
    delete process.env.VCAP_SERVICES;
  });

  it('creates a destination for the business logging service', () => {
    expect(
      destinationForServiceBinding('my-business-logging')
    ).resolves.toEqual({
      url: 'https://business-logging.my.system.com',
      authentication: 'OAuth2ClientCredentials',
      username: 'CLIENT_!_|_!_ID',
      password: 'PASSWORD'
    });
  });

  it('creates a destination for the XF s4 hana cloud service', () => {
    expect(destinationForServiceBinding('S4_SYSTEM')).resolves.toEqual({
      url: 'https://my.system.com',
      authentication: 'BasicAuthentication',
      username: 'USER_NAME',
      password: 'PASSWORD'
    });
  });

  it('creates a destination using a custom transformation function', () => {
    const serviceBindingTransformFn = async (
      serviceBinding: ServiceBinding
    ) => ({
      url: serviceBinding.credentials.sys
    });

    expect(
      destinationForServiceBinding('my-custom-service', {
        serviceBindingTransformFn
      })
    ).resolves.toEqual({
      url: 'https://custom-service.my.system.com'
    });
  });

  it('throws an error if the service type is not supported', () => {
    expect(() =>
      destinationForServiceBinding('my-custom-service')
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws an error if no service binding can be found for the given name', () => {
    expect(() =>
      destinationForServiceBinding('non-existent-service')
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('throws an error if there are no service bindings at all', () => {
    delete process.env.VCAP_SERVICES;
    expect(() =>
      destinationForServiceBinding('my-custom-service')
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('finds the destination when searching for service bindings', async () => {
    const serviceBindingTransformFn = async (
      serviceBinding: ServiceBinding
    ) => ({
      url: serviceBinding.credentials.sys
    });

    expect(
      getDestination({
        destinationName: 'my-custom-service',
        serviceBindingTransformFn
      })
    ).resolves.toEqual({
      url: 'https://custom-service.my.system.com'
    });
  });
});

function mockServiceBindings() {
  process.env.VCAP_SERVICES = JSON.stringify(serviceBindings);
}

const serviceBindings = {
  'business-logging': [
    {
      name: 'my-business-logging',
      credentials: {
        writeUrl: 'https://business-logging.my.system.com',
        uaa: {
          clientid: 'CLIENT_!_|_!_ID',
          clientsecret: 'PASSWORD'
        }
      }
    }
  ],
  'custom-service': [
    {
      credentials: {
        sys: 'https://custom-service.my.system.com'
      },
      name: 'my-custom-service'
    }
  ],
  's4-hana-cloud': [
    {
      name: 'S4_SYSTEM',
      credentials: {
        Password: 'PASSWORD',
        URL: 'https://my.system.com',
        User: 'USER_NAME'
      }
    }
  ]
};
