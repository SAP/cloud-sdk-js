import assert = require('assert');
import { JwtPayload } from 'jsonwebtoken';
import { mappingTenantFields, tenantFromJwt } from './tenant';

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
});
