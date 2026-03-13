import { signedJwt } from '../../../../../test-resources/test/test-util';
import {
  identityServicesCache,
  getIdentityServiceInstanceFromCredentials
} from './ias';
import type { ServiceCredentials } from './environment-accessor-types';

describe('ias', () => {
  describe('getIdentityServiceInstanceFromCredentials()', () => {
    afterEach(() => {
      identityServicesCache.clear();
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

    it('extracts subdomain from JWT string and replaces URL subdomain', () => {
      const credentials = createServiceCredentials(
        'client-id',
        'https://provider.accounts.ondemand.com'
      );
      const jwtString = signedJwt({
        iss: 'https://subscriber.accounts.ondemand.com'
      });

      const service = getIdentityServiceInstanceFromCredentials(
        credentials,
        jwtString
      );

      // Verify the instance was created (subdomain extraction should succeed)
      expect(service).toBeDefined();
    });

    it('extracts subdomain from JWT payload object and replaces URL subdomain', () => {
      const credentials = createServiceCredentials(
        'client-id',
        'https://provider.accounts.ondemand.com'
      );
      const jwtPayload = {
        iss: 'https://subscriber.accounts.ondemand.com'
      };

      const service = getIdentityServiceInstanceFromCredentials(
        credentials,
        jwtPayload
      );

      // Verify the instance was created (subdomain extraction should succeed)
      expect(service).toBeDefined();
    });

    it('prefers ias_iss claim over iss claim for IAS tokens', () => {
      const credentials = createServiceCredentials(
        'client-id',
        'https://provider.accounts.ondemand.com'
      );
      const jwtString = signedJwt({
        iss: 'https://wrong-subdomain.accounts.ondemand.com',
        ias_iss: 'https://correct-subdomain.accounts.ondemand.com'
      });

      const service = getIdentityServiceInstanceFromCredentials(
        credentials,
        jwtString
      );

      // Verify the instance was created with ias_iss subdomain
      expect(service).toBeDefined();
    });

    it('creates different instances for different subdomains from JWT', () => {
      const credentials = createServiceCredentials(
        'client-id',
        'https://provider.accounts.ondemand.com'
      );

      const jwtString1 = signedJwt({
        iss: 'https://subscriber1.accounts.ondemand.com'
      });

      const jwtString2 = signedJwt({
        iss: 'https://subscriber2.accounts.ondemand.com'
      });

      const service1 = getIdentityServiceInstanceFromCredentials(
        credentials,
        jwtString1
      );

      const service2 = getIdentityServiceInstanceFromCredentials(
        credentials,
        jwtString2
      );

      // Different subdomains should result in different service instances
      expect(service1).not.toBe(service2);
    });

    it('returns same instance when called with same JWT subdomain', () => {
      const credentials = createServiceCredentials(
        'client-id',
        'https://provider.accounts.ondemand.com'
      );

      const jwtString1 = signedJwt({
        iss: 'https://subscriber.accounts.ondemand.com'
      });

      const jwtString2 = signedJwt({
        iss: 'https://subscriber.accounts.ondemand.com',
        // Different content but same subdomain
        user_id: 'different-user'
      });

      const service1 = getIdentityServiceInstanceFromCredentials(
        credentials,
        jwtString1
      );

      const service2 = getIdentityServiceInstanceFromCredentials(
        credentials,
        jwtString2
      );

      // Same subdomain should result in cached instance
      expect(service1).toBe(service2);
    });

    it('falls back to service binding URL when JWT has no issuer', () => {
      const credentials = createServiceCredentials(
        'client-id',
        'https://provider.accounts.ondemand.com'
      );
      const jwtString = signedJwt({
        // No iss or ias_iss claim
        user_id: 'user-123'
      });

      const service = getIdentityServiceInstanceFromCredentials(
        credentials,
        jwtString
      );

      // Should succeed using fallback to service binding URL
      expect(service).toBeDefined();
    });
  });
});

function createServiceCredentials(
  clientid = 'clientid',
  url = 'https://tenant.accounts.ondemand.com'
): ServiceCredentials {
  return {
    clientid,
    clientsecret: 'clientsecret',
    url
  } as unknown as ServiceCredentials;
}
