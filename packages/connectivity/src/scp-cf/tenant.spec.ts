import assert from 'assert';
import { JwtPayload } from 'jsonwebtoken';
import {
  mockServiceBindings,
  signedJwt,
  xsuaaBindingMock
} from '../../../../test-resources/test/test-util';
import {
  getTenantIdWithFallback,
  mappingTenantFields,
  tenantFromJwt
} from './tenant';

describe('tenant builder from jwt', () => {
  it('should contain the fields from decodedJwt', () => {
    const decodedJwt: JwtPayload = {
      zid: 'tenantUUID',
      ext_attr: {
        zdn: 'tenantName'
      }
    };

    expect(tenantFromJwt(decodedJwt).id).toBe(decodedJwt.zid);
    expect(tenantFromJwt(decodedJwt).name).toBe(decodedJwt.ext_attr.zdn);
  });

  it('should handle missing ext_attr with undefined value', () => {
    const decodedJwtMissingName: JwtPayload = {
      zid: 'tenantUUID'
    };
    expect(tenantFromJwt(decodedJwtMissingName).id).toBe(
      decodedJwtMissingName.zid
    );
    expect(tenantFromJwt(decodedJwtMissingName).name).toBe(undefined);

    decodedJwtMissingName.ext_attr = {};
    expect(tenantFromJwt(decodedJwtMissingName).id).toBe(
      decodedJwtMissingName.zid
    );
    expect(tenantFromJwt(decodedJwtMissingName).name).toBe(undefined);
  });

  it('should throw exceptions if mandatory fields are missing', () => {
    try {
      tenantFromJwt({});
      assert.fail('No exception while building from jwt without id.');
    } catch (e) {
      expect(e.message).toContain(mappingTenantFields.id.keyInJwt);
    }
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
