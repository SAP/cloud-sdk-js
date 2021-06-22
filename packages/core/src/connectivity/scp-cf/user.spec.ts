import { JwtPayload } from 'jsonwebtoken';
import { mappingUserFields, userFromJwt } from './user';

function getSampleJwt(scopes?: string[]): JwtPayload {
  return {
    user_id: 'someID',
    user_name: 'Smith_John',
    given_name: 'John',
    family_name: 'Smith',
    email: 'John.Smith@sap.com',
    scope: scopes
  };
}

describe('user builder from decoded jwt', () => {
  it('should contain the fields in the provided jwt', () => {
    const decodedJwt: JwtPayload = getSampleJwt();

    expect(userFromJwt(decodedJwt).id).toEqual(decodedJwt.user_id);
    expect(userFromJwt(decodedJwt).givenName).toEqual(decodedJwt.given_name);
    expect(userFromJwt(decodedJwt).familyName).toEqual(decodedJwt.family_name);
    expect(userFromJwt(decodedJwt).userName).toEqual(decodedJwt.user_name);
    expect(userFromJwt(decodedJwt).scopes).toMatchObject([]);
  });

  it('should throw if `user_id` is missing', () => {
    expect(() =>
      userFromJwt({ user_name: 'USERNAME' })
    ).toThrowErrorMatchingInlineSnapshot(
      '"Property \'user_id\' is missing in JWT payload."'
    );
  });

  it('should throw if `user_name` is missing', () => {
    expect(() =>
      userFromJwt({ user_id: 'USERID' })
    ).toThrowErrorMatchingInlineSnapshot(
      '"Property \'user_name\' is missing in JWT payload."'
    );
  });

  it('should return a valid user when both `user_name` and `user_id` are given', () => {
    const id = 'USERID';
    const userName = 'USERNAME';

    expect(userFromJwt({ user_id: id, user_name: userName })).toEqual(
      expect.objectContaining({
        id,
        userName
      })
    );
  });

  describe('hasScope', () => {
    it('returns false for user without scopes', () => {
      const user = userFromJwt(getSampleJwt());

      expect(user.scopes.length).toBe(0);
      expect(user.hasScope({ name: 'someScope' })).toBe(false);
    });

    it('checks scopes for user with scopes', () => {
      const user = userFromJwt(getSampleJwt(['scope1', 'scope2']));

      expect(user.scopes.length).toBe(2);
      expect(user.hasScope({ name: 'scope1' })).toBe(true);
      expect(user.hasScope({ name: 'scope2' })).toBe(true);
      expect(user.hasScope({ name: 'nonExisting' })).toBe(false);
    });
  });

  it('should also parse custom attributes', () => {
    const user = userFromJwt(getSampleJwt());
    expect(user.customAttributes).toMatchObject(new Map<string, string[]>());

    const customAttributes = {
      customKey1: ['value1'],
      customKey2: ['value2.1', 'value2.2']
    };
    const userWithCustomFields = userFromJwt({
      user_name: 'someName',
      user_id: 'someId',
      [mappingUserFields.customAttributes.keyInJwt]: customAttributes
    });
    expect(userWithCustomFields.customAttributes).toMatchObject(
      customAttributes
    );
  });
});
