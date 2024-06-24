import { signedJwt } from '../../../../test-resources/test/test-util';
import { getTenantIdWithFallback } from './tenant';

describe('tenant builder from JWT', () => {
  describe('getTenantIdWithFallback', () => {
    afterEach(() => {
      delete process.env['VCAP_SERVICES'];
    });

    it('returns the `zid` from a JWT, if present', () => {
      expect(
        getTenantIdWithFallback({ user_id: 'user', zid: 'tenant' })
      ).toEqual('tenant');
    });

    it('returns subdomain of `iss` from a JWT, if present', () => {
      expect(
        getTenantIdWithFallback({
          user_id: 'user',
          iss: 'http://dummy-iss.com'
        })
      ).toEqual('dummy-iss');
    });

    it('returns undefined for tenantid when custom JWT contains neither `zid` nor `iss`', () => {
      expect(getTenantIdWithFallback({ user_id: 'user' })).toBeUndefined();
    });

    it('returns the `zid` from am encoded JWT', () => {
      expect(
        getTenantIdWithFallback(signedJwt({ user_id: 'user', zid: 'tenant' }))
      ).toEqual('tenant');
    });
  });
});
