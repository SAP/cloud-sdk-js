import {
  destinationBindingClientSecretMock,
  mockServiceBindings,
  signedJwt,
  xsuaaBindingMock
} from '../../../../../test-resources/test/test-util';
import { decodeOrMakeJwt } from './binding';

describe('decodeOrMakeJwt', () => {
  afterEach(() => {
    delete process.env.VCAP_SERVICES;
  });

  it('returns decoded JWT, if JWT has `zid` (XSUAA)', () => {
    const payload = { zid: 'test', iat: 123 };
    expect(decodeOrMakeJwt(signedJwt(payload))).toEqual(payload);
  });

  it('returns decoded JWT, if JWT has `app_tid` (IAS)', () => {
    const payload = { app_tid: 'test', iat: 123 };
    expect(decodeOrMakeJwt(signedJwt(payload))).toEqual(payload);
  });

  it('returns undefined, if JWT has no `zid` nor `app_tid`', () => {
    expect(decodeOrMakeJwt(signedJwt({ user_id: 'test' }))).toBeUndefined();
  });

  it('does not throw, if there is no XSUAA binding present', () => {
    expect(() => decodeOrMakeJwt(undefined)).not.toThrow();
  });

  it("returns the XSUAA service binding's tenant ID as `zid`, if JWT is not present and binding is present", () => {
    mockServiceBindings({ xsuaaBinding: true });
    expect(decodeOrMakeJwt(undefined)).toEqual({
      zid: xsuaaBindingMock.credentials.tenantid
    });
  });

  it("returns the destination service binding's tenant ID, if JWT, XSUAA and identity service bindings are missing", () => {
    mockServiceBindings({ xsuaaBinding: false });
    expect(decodeOrMakeJwt(undefined)).toEqual({
      zid: destinationBindingClientSecretMock.credentials.tenantid
    });
  });
});
