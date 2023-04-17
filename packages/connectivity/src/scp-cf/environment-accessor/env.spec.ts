import { createLogger } from '@sap-cloud-sdk/util';
import {
  getService,
  getServiceByInstanceName,
  getServiceCredentialsList,
  getServiceList,
  resolveService
} from './env';

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

describe('env', () => {
  beforeEach(() => {
    process.env.VCAP_SERVICES = JSON.stringify(services);
  });

  afterEach(() => {
    jest.resetAllMocks();
    delete process.env.VCAP_SERVICES;
  });

  describe('getServiceList()', () => {
    it('gets a list of services for the given label', () => {
      expect(getServiceList('destination')).toEqual(services.destination);
    });

    it('is empty for unknown label', () => {
      expect(getServiceList('unknown')).toEqual([]);
    });
  });

  describe('getServiceCredentialsList()', () => {
    it('gets a list of credentials', () => {
      const serviceCredentials = getServiceCredentialsList('destination');
      expect(serviceCredentials).toEqual(
        services.destination.map(({ credentials }) => credentials)
      );
    });

    it('filters bindings without credentials and logs warning', () => {
      const warnSpy = jest.spyOn(logger, 'warn');
      const serviceCredentials = getServiceCredentialsList('xsuaa');
      expect(serviceCredentials).toEqual([]);
      expect(warnSpy).toHaveBeenCalledWith(
        "Ignoring 2 service bindings of service type 'xsuaa' because of missing credentials."
      );
    });
  });

  describe('getService()', () => {
    it('gets service and warns if multiple bindings are found', () => {
      const warnSpy = jest.spyOn(logger, 'warn');
      const service = getService('destination');
      expect(service).toEqual(services.destination[0]);
      expect(warnSpy).toBeCalledWith(
        `Found more than one service binding for service type 'destination':
\t- my-destination-service1
\t- my-destination-service2
Selecting the first one.`
      );
    });

    it('warns if service does not exist', () => {
      const warnSpy = jest.spyOn(logger, 'warn');
      const service = getService('unknown');
      expect(service).toBeUndefined();
      expect(warnSpy).toBeCalledWith(
        "Could not find service binding of type 'unknown'. This might cause errors in other parts of the application."
      );
    });
  });

  describe('resolveService()', () => {
    it('returns the service if it is a service instance already', () => {
      const service = services.destination[0];
      expect(resolveService(service)).toEqual(service);
    });

    it('retrieves the service if it is a service label', () => {
      expect(resolveService('destination')).toEqual(services.destination[0]);
    });

    it('throws an error if the service does not exist', () => {
      expect(() =>
        resolveService('unknown')
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not find service binding for type \'unknown\'."'
      );
    });
  });

  describe('getServiceByInstanceName()', () => {
    it('resolves service by instance name', () => {
      expect(getServiceByInstanceName('my-destination-service2')).toEqual(
        services.destination[1]
      );
    });

    it('throws an error if instance name does not exist', () => {
      expect(() =>
        getServiceByInstanceName('unknown')
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
      expect(getServiceByInstanceName('duplicate')).toEqual(
        duplicateServices.xsuaa[0]
      );
    });
  });
});
