import assert = require('assert');
import { mapping, userFromJwt } from '../../src/scp-cf/user';
import { DecodedJWT } from '../../src/util';

function getSampleJwt(scopes?: string[]): DecodedJWT {
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
    const decodedJwt: DecodedJWT = getSampleJwt();

    expect(userFromJwt(decodedJwt).id).toBe(decodedJwt.user_id);
    expect(userFromJwt(decodedJwt).givenName).toBe(decodedJwt.given_name);
    expect(userFromJwt(decodedJwt).familyName).toBe(decodedJwt.family_name);
    expect(userFromJwt(decodedJwt).userName).toBe(decodedJwt.user_name);
    expect(userFromJwt(decodedJwt).scopes).toMatchObject([]);
  });

  it('should throw exceptions if  mandatory fields are missing', () => {
    try {
      userFromJwt({ user_name: 'userNameThere' });
      assert.fail('No exception while building from jwt without user id.');
    } catch (e) {
      expect(e.message).toContain(mapping.id.keyInJwt);
    }

    try {
      userFromJwt({ user_id: 'userIdThere' });
      assert.fail('No exception while building from jwt without user name.');
    } catch (e) {
      expect(e.message).toContain(mapping.userName.keyInJwt);
    }

    userFromJwt({ user_id: 'userIdThere', user_name: 'userNameThere' });
  });

  it('checks the scopes', () => {
    const userWithoutScopes = userFromJwt(getSampleJwt());
    expect(userWithoutScopes.hasScope({ name: 'someScope' })).toBe(false);

    const userWithScopes = userFromJwt(getSampleJwt(['scope1', 'scope2']));

    expect(userWithScopes.scopes.length).toBe(2);
    expect(userWithScopes.hasScope({ name: 'scope1' })).toBe(true);
    expect(userWithScopes.hasScope({ name: 'scope2' })).toBe(true);
    expect(userWithScopes.hasScope({ name: 'nonExisting' })).toBe(false);
  });

  it('should also parse custom attributes', () => {
    const userWithoutCustomAtributes = userFromJwt(getSampleJwt());
    expect(userWithoutCustomAtributes.customAttributes).toMatchObject(
      new Map<string, string[]>()
    );

    const customAttributes = {
      customKey1: ['value1'],
      customKey2: ['value2.1', 'value2.2']
    };
    const userWithCustomFields = userFromJwt({
      user_name: 'someName',
      user_id: 'someId',
      [mapping.customAttributes.keyInJwt]: customAttributes
    });
    expect(userWithCustomFields.customAttributes).toMatchObject(
      customAttributes
    );
  });
});
