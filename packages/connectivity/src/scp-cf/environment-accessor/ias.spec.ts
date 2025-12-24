import {
  clearIdentityServices,
  getIdentityServiceInstanceFromCredentials
} from './ias';
import type { ServiceCredentials } from './environment-accessor-types';

describe('ias', () => {
  describe('getIdentityServiceInstanceFromCredentials()', () => {
    afterEach(() => {
      clearIdentityServices();
    });

    it('creates a new service instance', () => {
      expect(
        getIdentityServiceInstanceFromCredentials(createServiceCredentials())
      ).toBeDefined();
    });

    it('retrieves the same service instance for the same credentials', () => {
      expect(
        getIdentityServiceInstanceFromCredentials(createServiceCredentials())
      ).toBe(
        getIdentityServiceInstanceFromCredentials(createServiceCredentials())
      );
    });

    it('retrieves different service instances for the different credentials', () => {
      expect(
        getIdentityServiceInstanceFromCredentials(createServiceCredentials())
      ).not.toBe(
        getIdentityServiceInstanceFromCredentials(
          createServiceCredentials('another-clientid')
        )
      );
    });

    it('retrieves different service instances for the same credentials, but different caching behavior', () => {
      expect(
        getIdentityServiceInstanceFromCredentials(createServiceCredentials())
      ).not.toBe(
        getIdentityServiceInstanceFromCredentials(
          createServiceCredentials(),
          undefined,
          true
        )
      );
    });
  });
});

function createServiceCredentials(clientid = 'clientid'): ServiceCredentials {
  return {
    clientid,
    clientsecret: 'clientsecret',
    url: 'https://tenant.accounts.ondemand.com'
  } as unknown as ServiceCredentials;
}
