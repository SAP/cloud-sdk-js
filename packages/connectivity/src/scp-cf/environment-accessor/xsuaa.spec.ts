import { createLogger } from '@sap-cloud-sdk/util';
import {
  clearXsuaaServices,
  getXsuaaInstanceFromSuppliedCredentials,
  getXsuaaServiceCredentials
} from './xsuaa';
import type { ServiceCredentials } from './environment-accessor-types';

const clientId = 'sb-jwt-app';

const services = {
  xsuaa: [
    {
      credentials: {
        clientid: clientId,
        url: 'https://tenant-id.authentication.sap.hana.ondemand.com'
      },
      plan: 'application',
      label: 'xsuaa',
      name: 'my-xsuaa'
    }
  ]
};

describe('xsuaa', () => {
  describe('getXsuaaServiceCredentials()', () => {
    beforeEach(() => {
      process.env.VCAP_SERVICES = JSON.stringify(services);
    });

    afterEach(() => {
      jest.resetAllMocks();
      delete process.env.VCAP_SERVICES;
    });

    it('throws an error if no match can be found', () => {
      process.env.VCAP_SERVICES = JSON.stringify({
        xsuaa: [
          { name: 'xsuaa1', label: 'xsuaa' },
          { name: 'xsuaa2', label: 'xsuaa' }
        ]
      });

      expect(() =>
        getXsuaaServiceCredentials()
      ).toThrowErrorMatchingInlineSnapshot(
        '"Could not find XSUAA service binding."'
      );
    });

    it('logs a message if multiple credentials were found', () => {
      const logger = createLogger('environment-accessor');
      const warnSpy = jest.spyOn(logger, 'warn');

      process.env.VCAP_SERVICES = JSON.stringify({
        xsuaa: [
          {
            name: 'xsuaa1',
            label: 'xsuaa',
            credentials: { xsappname: 'app1' }
          },
          { name: 'xsuaa2', label: 'xsuaa', credentials: { xsappname: 'app2' } }
        ]
      });

      getXsuaaServiceCredentials();
      expect(warnSpy).toHaveBeenCalledWith(
        "Found multiple bindings for service 'xsuaa'. App names:\n\t- app1\n\t- app2\nChoosing first one ('app1')."
      );
    });
  });

  describe('getXsuaaInstanceFromSuppliedCredentials()', () => {
    afterEach(() => {
      clearXsuaaServices();
    });

    it('creates a new service instance', () => {
      expect(
        getXsuaaInstanceFromSuppliedCredentials({
          credentials: createServiceCredentials()
        })
      ).toBeDefined();
    });

    it('retrieves the same service instance for the same credentials', () => {
      expect(
        getXsuaaInstanceFromSuppliedCredentials({
          credentials: createServiceCredentials()
        })
      ).toBe(
        getXsuaaInstanceFromSuppliedCredentials({
          credentials: createServiceCredentials()
        })
      );
    });

    it('retrieves different service instances for the different credentials', () => {
      expect(
        getXsuaaInstanceFromSuppliedCredentials({
          credentials: createServiceCredentials()
        })
      ).not.toBe(
        getXsuaaInstanceFromSuppliedCredentials({
          credentials: createServiceCredentials('another-clientid')
        })
      );
    });

    it('retrieves different service instances for the same credentials, but different caching behavior', () => {
      expect(
        getXsuaaInstanceFromSuppliedCredentials({
          credentials: createServiceCredentials()
        })
      ).not.toBe(
        getXsuaaInstanceFromSuppliedCredentials({
          credentials: createServiceCredentials(),
          disableCache: true
        })
      );
    });
  });
});

function createServiceCredentials(clientid = 'clientid'): ServiceCredentials {
  return {
    clientid,
    xsappname: 'xsappname',
    uaadomain: 'uaadomain',
    url: 'https://tenant.authentication.sap.hana.ondemand.com'
  } as unknown as ServiceCredentials;
}
