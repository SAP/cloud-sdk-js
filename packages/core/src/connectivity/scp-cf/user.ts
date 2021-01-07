import {
  checkMandatoryValue,
  DecodedJWT,
  JwtKeyMapping,
  readPropertyWithWarn
} from './jwt';

/**
 * Representation of the user i.e. authenticated persona. The authentication is done by the XSUAA.
 */
export interface UserData {
  id: string;
  userName: string;
  givenName?: string;
  familyName?: string;
  email?: string;
  scopes: Scope[];
  customAttributes: Map<string, string[]>;
}

export interface User extends UserData {
  hasScope: (scope: Scope) => boolean;
}

/**
 * Extracts the custom attributes in the JWT
 * @param decodedToken - Token to read the custom attributes
 * @returns custom attributes added by the xsuaa to the issued JWT.
 */
export function customAttributes(
  decodedToken: DecodedJWT
): Map<string, string[]> {
  if (decodedToken[mappingUserFields.customAttributes.keyInJwt]) {
    return readPropertyWithWarn(
      decodedToken,
      mappingUserFields.customAttributes.keyInJwt
    ) as Map<string, string[]>;
  }
  return new Map<string, string[]>();
}

/**
 * Mapping between key name in the User and key name in decoded JWT and the
 */
export const mappingUserFields: JwtKeyMapping<
  UserData,
  RegisteredJWTClaimsUser
> = {
  id: { keyInJwt: 'user_id', extractorFunction: userId },
  userName: { keyInJwt: 'user_name', extractorFunction: userName },
  givenName: { keyInJwt: 'given_name', extractorFunction: userGivenName },
  familyName: { keyInJwt: 'family_name', extractorFunction: userFamilyName },
  email: { keyInJwt: 'email', extractorFunction: userEmail },
  scopes: { keyInJwt: 'scope', extractorFunction: userScopes },
  customAttributes: {
    keyInJwt: 'xs.user.attributes',
    extractorFunction: customAttributes
  }
};

/**
 * Get the user's given name of a decoded JWT.
 * @param decodedToken - Token to read the user id from.
 * @returns The user id if available.
 */
export function userGivenName(decodedToken: DecodedJWT): string | undefined {
  if (mappingUserFields.givenName) {
    return readPropertyWithWarn(
      decodedToken,
      mappingUserFields.givenName.keyInJwt
    );
  }
}

/**
 * Get the user's family name of a decoded JWT.
 * @param decodedToken - Token to read the user id from.
 * @returns The user id if available.
 */
export function userFamilyName(decodedToken: DecodedJWT): string | undefined {
  if (mappingUserFields && mappingUserFields.familyName) {
    return readPropertyWithWarn(
      decodedToken,
      mappingUserFields!.familyName.keyInJwt
    );
  }
}

/**
 * Get the user name of a decoded JWT.
 * @param decodedToken - Token to read the user id from.
 * @returns The user id if available.
 */
export function userName(decodedToken: DecodedJWT): string | undefined {
  return readPropertyWithWarn(
    decodedToken,
    mappingUserFields.userName.keyInJwt
  );
}

/**
 * Get the user's email of a decoded JWT.
 * @param decodedToken - Token to read the user id from.
 * @returns The user id if available.
 */
export function userEmail(decodedToken: DecodedJWT): string | undefined {
  if (mappingUserFields && mappingUserFields.email) {
    return readPropertyWithWarn(decodedToken, mappingUserFields.email.keyInJwt);
  }
}

/**
 * Get the user's scopes of a decoded JWT.
 * @param decodedToken - Token to read the user id from.
 * @returns The user id if available.
 */
export function userScopes(decodedToken: DecodedJWT): Scope[] | [] {
  if (!(decodedToken.scope instanceof Array && decodedToken.scope.length)) {
    return [];
  }
  return decodedToken.scope
    .map(s => (s.includes('.') ? s.substr(s.indexOf('.') + 1, s.length) : s))
    .map(s => ({ name: s }));
}

/**
 * Get the user id of a decoded JWT.
 * @param decodedToken - Token to read the user id from.
 * @returns The user id if available.
 */
export function userId(decodedToken: DecodedJWT): string | undefined {
  return readPropertyWithWarn(decodedToken, mappingUserFields.id.keyInJwt);
}

/**
 * Keys in the JWT related to the user
 */
export interface RegisteredJWTClaimsUser {
  user_id?: string;
  user_name?: string;
  given_name?: string;
  family_name?: string;
  email?: string;
  scope?: string[];
  'xs.user.attributes'?: Map<string, string[]>;
}

/**
 * Representation of the scope. A scope is assigned to a user via role-collection in cloud foundry.
 */
export interface Scope {
  name: string;
}

// Type ExtractStringType = (decodedJwt: DecodedJWT) => string;
type hasScopeType = (s: Scope) => boolean;

function hasScopeWrapper(scopes: Scope[]): hasScopeType {
  return (scope: Scope): boolean =>
    scopes.find(scopeFromList => scopeFromList.name === scope.name) !==
    undefined;
}

/**
 * Creates a user object from the decoded JWT.
 *
 * @param decodedJWT - Decoded JWT toeken
 * @returns Representation of the user
 * @exception Error Raised if no id is found in the decoded JWT.
 */
export function userFromJwt(decodedJWT: DecodedJWT): User {
  checkMandatoryValue('id', mappingUserFields, decodedJWT);
  checkMandatoryValue('userName', mappingUserFields, decodedJWT);
  return {
    id: userId(decodedJWT)!,
    givenName: userGivenName(decodedJWT),
    familyName: userFamilyName(decodedJWT),
    email: userEmail(decodedJWT),
    userName: userName(decodedJWT)!,
    scopes: userScopes(decodedJWT),
    customAttributes: customAttributes(decodedJWT),
    hasScope: hasScopeWrapper(userScopes(decodedJWT))
  };
}
