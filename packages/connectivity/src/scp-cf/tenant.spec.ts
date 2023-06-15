import {
  mockServiceBindings,
  signedJwt,
  xsuaaBindingMock
} from '../../../../test-resources/test/test-util';
import { getSubdomainAndZoneId, getTenantIdWithFallback } from './tenant';
import * as jwt from './jwt';

describe('tenant builder from JWT', () => {
  describe('getSubdomainAndZoneId', () => {
    beforeEach(() => {
      jest.resetModules();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns null subdomain and zoneId for undefined JWT', () => {
      const actual = getSubdomainAndZoneId();
      const expected = { subdomain: null, zoneId: null };
      expect(actual).toEqual(expected);
    });

    it('returns subdomain and zoneId', () => {
      const iss = 'https://sub.example.com';
      const zid = 'zone';
      jest.spyOn(jwt, 'decodeJwt').mockImplementationOnce(() => ({ iss, zid }));

      const actual = getSubdomainAndZoneId('nonNullJWT');
      const expected = { subdomain: 'sub', zoneId: zid };
      expect(actual).toEqual(expected);
    });

    it('returns null zoneId, when the jwt does not contain zid', () => {
      const iss = 'https://sub.example.com';
      jest.spyOn(jwt, 'decodeJwt').mockImplementationOnce(() => ({ iss }));

      const actual = getSubdomainAndZoneId('nonNullJWT');
      const expected = { subdomain: 'sub', zoneId: null };
      expect(actual).toEqual(expected);
    });

    it('returns null subdomain, when the jwt does not contain iss', () => {
      const zid = 'zone';
      jest.spyOn(jwt, 'decodeJwt').mockImplementationOnce(() => ({ zid }));

      const actual = getSubdomainAndZoneId('nonNullJWT');
      const expected = { subdomain: null, zoneId: zid };
      expect(actual).toEqual(expected);
    });
  });

  describe('getTenantIdWithFallback', () => {
    afterEach(() => {
      delete process.env['VCAP_SERVICES'];
    });

    it('returns the `zid` from a JWT, if present', () => {
      expect(
        getTenantIdWithFallback(signedJwt({ user_id: 'user', zid: 'tenant' }))
      ).toEqual('tenant');
    });

    it('returns subdomain of `iss` from a JWT, if present', () => {
      expect(
        getTenantIdWithFallback(
          signedJwt({ user_id: 'user', iss: 'http://dummy-iss.com' })
        )
      ).toEqual('dummy-iss');
    });

    it("returns the xsuaa binding's subaccount if a binding is present", () => {
      mockServiceBindings({ xsuaaBinding: true });
      expect(getTenantIdWithFallback()).toEqual(
        xsuaaBindingMock.credentials.subaccountid
      );
    });

    it('returns a string constant for tenantid when there is no xsuaa binding and custom JWT contains neither `zid` nor `iss`', () => {
      expect(getTenantIdWithFallback(signedJwt({ user_id: 'user' }))).toEqual(
        'tenant_id'
      );
    });

    it('returns a string constant if neither JWT nor xsuaa binding is present', () => {
      expect(getTenantIdWithFallback()).toEqual('tenant_id');
    });
  });
});
