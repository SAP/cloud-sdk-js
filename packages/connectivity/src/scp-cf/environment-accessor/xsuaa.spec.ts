import {
  clearXsuaaServices,
  getXsuaaInstanceFromServiceCredentials
} from './xsuaa';
import type { ServiceCredentials } from './environment-accessor-types';
describe('xsuaa', () => {
  describe('getXsuaaInstanceFromSuppliedCredentials()', () => {
    afterEach(() => {
      clearXsuaaServices();
    });

    it('creates a new service instance', () => {
      expect(
        getXsuaaInstanceFromServiceCredentials({
          credentials: createServiceCredentials()
        })
      ).toBeDefined();
    });

    it('retrieves the same service instance for the same credentials', () => {
      expect(
        getXsuaaInstanceFromServiceCredentials({
          credentials: createServiceCredentials()
        })
      ).toBe(
        getXsuaaInstanceFromServiceCredentials({
          credentials: createServiceCredentials()
        })
      );
    });

    it('retrieves different service instances for the different credentials', () => {
      expect(
        getXsuaaInstanceFromServiceCredentials({
          credentials: createServiceCredentials()
        })
      ).not.toBe(
        getXsuaaInstanceFromServiceCredentials({
          credentials: createServiceCredentials('another-clientid')
        })
      );
    });

    it('retrieves different service instances for the same credentials, but different caching behavior', () => {
      expect(
        getXsuaaInstanceFromServiceCredentials({
          credentials: createServiceCredentials()
        })
      ).not.toBe(
        getXsuaaInstanceFromServiceCredentials({
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
