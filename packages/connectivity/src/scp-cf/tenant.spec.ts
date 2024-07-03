import { signedJwt } from '../../../../test-resources/test/test-util';
import { getgetTenantIdWithFallback } from './tenant';

describe('tenant builder from JWT', () => {
  describe('getgetTenantIdWithFallback', () => {
    afterEach(() => {
      delete process.env['VCAP_SERVICES'];
    });

    it('returns the `zid` from a JWT, if present', () => {
      expect(
        getgetTenantIdWithFallback({ user_id: 'user', zid: 'tenant' })
      ).toEqual('tenant');
    });

    it('returns subdomain of `iss` from a JWT, if present', () => {
      expect(
        getgetTenantIdWithFallback({
          user_id: 'user',
          iss: 'http://dummy-iss.com'
        })
      ).toEqual('dummy-iss');
    });

    it('returns undefined for getTenantId when custom JWT contains neither `zid` nor `iss`', () => {
      expect(getgetTenantIdWithFallback({ user_id: 'user' })).toBeUndefined();
    });

    it('returns the `zid` from am encoded JWT', () => {
      expect(
        getgetTenantIdWithFallback(signedJwt({ user_id: 'user', zid: 'tenant' }))
      ).toEqual('tenant');
    });
  });
});
