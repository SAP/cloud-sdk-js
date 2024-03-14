import { createLogger } from '@sap-cloud-sdk/util';
import {
  getServiceBinding,
  getServiceBindingByInstanceName,
  getServiceBindings,
  resolveServiceBinding
} from './service-bindings';

const logger = createLogger('environment-accessor');

const services = {
  destination: [
    {
      name: 'my-destination-service1',
      label: 'destination',
      tags: ['destination1'],
      credentials: {
        clientid: 'clientid1',
        clientsecret: 'clientsecret1',
        uri: 'uri1'
      }
    },
    {
      name: 'my-destination-service2',
      label: 'destination',
      tags: ['destination2'],
      credentials: {
        clientid: 'clientid2',
        clientsecret: 'clientsecret2',
        uri: 'uri2'
      }
    }
  ],
  xsuaa: [
    {
      name: 'my-xsuaa-service1',
      label: 'xsuaa',
      tags: ['xsuaa1']
    },
    {
      name: 'my-xsuaa-service2',
      label: 'xsuaa',
      tags: ['xsuaa2']
    }
  ]
};
const userProvidedServices = {
  'user-provided': [
    {
      credentials: {
        blerg: true,
        key: 'value',
        otherkey: 5
      },
      label: 'user-provided',
      name: 'demo-user-provided-service',
      tags: ['destination', 'other-tag']
    }
  ]
};

describe('service bindings', () => {
  afterEach(() => {
    jest.resetAllMocks();
    delete process.env.VCAP_SERVICES;
  });

  describe('getServiceBindings()', () => {
    it('gets a list of services for the given label', () => {
      process.env.VCAP_SERVICES = JSON.stringify(services);

      expect(getServiceBindings('destination')).toEqual(services.destination);
    });

    it('is empty for unknown label', () => {
      process.env.VCAP_SERVICES = JSON.stringify(services);

      expect(getServiceBindings('unknown')).toEqual([]);
    });

    it('returns a list of services by matching tags if no match is found by label', () => {
      process.env.VCAP_SERVICES = JSON.stringify(userProvidedServices);

      expect(getServiceBindings('destination')).toEqual(
        userProvidedServices['user-provided']
      );
    });

    it('matching by label has precedence over matching by tag', () => {
      process.env.VCAP_SERVICES = JSON.stringify({
        ...services,
        ...userProvidedServices
      });

      const actualServices = getServiceBindings('destination');
      expect(actualServices).toEqual(services.destination);
    });
  });

  describe('getServiceBinding()', () => {
    it('gets service and warns if multiple bindings are found', () => {
      process.env.VCAP_SERVICES = JSON.stringify(services);

      const warnSpy = jest.spyOn(logger, 'warn');
      const service = getServiceBinding('destination');
      expect(service).toEqual(services.destination[0]);
      expect(warnSpy).toBeCalledWith(
        `Found more than one service binding for service type 'destination':
\t- my-destination-service1
\t- my-destination-service2
Selecting the first one.`
      );
    });

    it('warns if service does not exist', () => {
      process.env.VCAP_SERVICES = JSON.stringify(services);

      const warnSpy = jest.spyOn(logger, 'warn');
      const service = getServiceBinding('unknown');
      expect(service).toBeUndefined();
      expect(warnSpy).toBeCalledWith(
        "Could not find service binding of type 'unknown'. This might cause errors in other parts of the application."
      );
    });

    it('return a service by matching tags if no match is found by label', () => {
      process.env.VCAP_SERVICES = JSON.stringify(userProvidedServices);

      const service = getServiceBinding('destination');
      expect(service).toEqual(userProvidedServices['user-provided'][0]);
    });

    it('matching by label has precedence over matching by tag', () => {
      process.env.VCAP_SERVICES = JSON.stringify({
        ...services,
        ...userProvidedServices
      });

      const service = getServiceBinding('destination');
      expect(service).toEqual(services.destination[0]);
    });
  });

  describe('resolveServiceBinding()', () => {
    beforeEach(() => {
      process.env.VCAP_SERVICES = JSON.stringify(services);
    });

    it('returns the service if it is a service instance already', () => {
      const service = services.destination[0];
      expect(resolveServiceBinding(service)).toEqual(service);
    });

    it('retrieves the service if it is a service label', () => {
      expect(resolveServiceBinding('destination')).toEqual(
        services.destination[0]
      );
    });

    it('throws an error if the service does not exist', () => {
      expect(() =>
        resolveServiceBinding('unknown')
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not find service binding of type \'unknown\'."'
      );
    });
  });

  describe('getServiceBindingByInstanceName()', () => {
    beforeEach(() => {
      process.env.VCAP_SERVICES = JSON.stringify(services);
    });

    it('resolves service by instance name', () => {
      expect(
        getServiceBindingByInstanceName('my-destination-service2')
      ).toEqual(services.destination[1]);
    });

    it('throws an error if instance name does not exist', () => {
      expect(() =>
        getServiceBindingByInstanceName('unknown')
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not find service with name: \'unknown\'."'
      );
    });

    it('does NOT throw an error if instance name exists multiple times', () => {
      // Originally this test was intended to fail, but xsenv behaves differently than expected:
      // xsenv takes the last matching binding.
      // This test should fail if xsenv changes this behavior.
      const duplicateServices = {
        destination: [{ name: 'duplicate', label: 'destination' }],
        xsuaa: [{ name: 'duplicate', label: 'xsuaa' }]
      };
      process.env.VCAP_SERVICES = JSON.stringify(duplicateServices);
      expect(getServiceBindingByInstanceName('duplicate')).toEqual(
        duplicateServices.xsuaa[0]
      );
    });
  });
});
