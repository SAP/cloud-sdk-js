import { JwtPayload } from './jsonwebtoken-type';
import {
  checkMandatoryValue,
  JwtKeyMapping,
  readPropertyWithWarn
} from './jwt';

/**
 * Representation of the user i.e. authenticated persona. The authentication is done by the XSUAA.
 * @internal
 */
export interface UserData {
  /**
   * @internal
   */
  id: string;
  /**
   * @internal
   */
  userName: string;
  /**
   * @internal
   */
  givenName?: string;
  /**
   * @internal
   */
  familyName?: string;
  /**
   * @internal
   */
  email?: string;
  /**
   * @internal
   */
  scopes: Scope[];
  /**
   * @internal
   */
  customAttributes: Map<string, string[]>;
}

/**
 * Representation of the user i.e. authenticated persona. The authentication is done by the XSUAA.
 * @internal
 */
export interface User extends UserData {
  /**
   * @internal
   */
  hasScope: (scope: Scope) => boolean;
}

/**
 * Extracts the custom attributes from the JWT.
 * @param jwtPayload - Token payload to read the custom attributes from.
 * @returns Custom attributes added by the XSUAA service to the issued JWT.
 * @internal
 */
export function customAttributes(
  jwtPayload: JwtPayload
): Map<string, string[]> {
  if (jwtPayload[mappingUserFields.customAttributes.keyInJwt]) {
    return readPropertyWithWarn(
      jwtPayload,
      mappingUserFields.customAttributes.keyInJwt
    ) as Map<string, string[]>;
  }
  return new Map<string, string[]>();
}

/**
 * Mapping between key name in the User and key name in decoded JWT and the
 * @internal
 */
export const mappingUserFields: JwtKeyMapping<
  UserData,
  | 'user_id'
  | 'user_name'
  | 'given_name'
  | 'family_name'
  | 'email'
  | 'scope'
  | 'xs.user.attributes'
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
 * Get the user's given name from the JWT payload.
 * @param jwtPayload - Token payload to read the user's given name from.
 * @returns The user's given name if available.
 * @internal
 */
export function userGivenName(jwtPayload: JwtPayload): string | undefined {
  if (mappingUserFields.givenName) {
    return readPropertyWithWarn(
      jwtPayload,
      mappingUserFields.givenName.keyInJwt
    );
  }
}

/**
 * Get the user's family name from the JWT payload.
 * @param jwtPayload - Token payload to read the user's family from.
 * @returns The user's family name if available.
 * @internal
 */
export function userFamilyName(jwtPayload: JwtPayload): string | undefined {
  if (mappingUserFields.familyName) {
    return readPropertyWithWarn(
      jwtPayload,
      mappingUserFields.familyName.keyInJwt
    );
  }
}

/**
 * Get the user name from the JWT payload.
 * @param jwtPayload - Token payload to read the user name from.
 * @returns The user name if available.
 * @internal
 */
export function userName(jwtPayload: JwtPayload): string | undefined {
  return readPropertyWithWarn(jwtPayload, mappingUserFields.userName.keyInJwt);
}

/**
 * Get the user's e-mail address from the JWT payload.
 * @param jwtPayload - Token payload to read the user e-mail address from.
 * @returns The user's e-mail address if available.
 * @internal
 */
export function userEmail(jwtPayload: JwtPayload): string | undefined {
  if (mappingUserFields.email) {
    return readPropertyWithWarn(jwtPayload, mappingUserFields.email.keyInJwt);
  }
}

/**
 * Get the user's scopes from the JWT payload.
 * @param jwtPayload - Token payload to read the user's scopes from.
 * @returns The user's scopes if available.
 * @internal
 */
export function userScopes(jwtPayload: JwtPayload): Scope[] {
  if (!(jwtPayload.scope instanceof Array && jwtPayload.scope.length)) {
    return [];
  }
  return jwtPayload.scope
    .map(s => (s.includes('.') ? s.substr(s.indexOf('.') + 1, s.length) : s))
    .map(s => ({ name: s }));
}

/**
 * Get the user id from the JWT payload.
 * @param jwtPayload - Token payload to read the user id from.
 * @returns The user id if available.
 * @internal
 */
export function userId(jwtPayload: JwtPayload): string | undefined {
  return readPropertyWithWarn(jwtPayload, mappingUserFields.id.keyInJwt);
}

/**
 * Representation of the scope. A scope is assigned to a user via role-collection in cloud foundry.
 * @internal
 */
export interface Scope {
  /**
   * @internal
   */
  name: string;
}

type hasScopeType = (s: Scope) => boolean;

function hasScopeWrapper(scopes: Scope[]): hasScopeType {
  return (scope: Scope): boolean =>
    scopes.find(scopeFromList => scopeFromList.name === scope.name) !==
    undefined;
}

/**
 * Creates a user object from the decoded JWT.
 * Throws an error if no `id` or `userName` property is present on the JWT payload.
 * @param jwtPayload - Token payload to get the user from.
 * @returns Representation of the user.
 * @internal
 */
export function userFromJwt(jwtPayload: JwtPayload): User {
  checkMandatoryValue('id', mappingUserFields, jwtPayload);
  checkMandatoryValue('userName', mappingUserFields, jwtPayload);
  return {
    id: userId(jwtPayload)!,
    givenName: userGivenName(jwtPayload),
    familyName: userFamilyName(jwtPayload),
    email: userEmail(jwtPayload),
    userName: userName(jwtPayload)!,
    scopes: userScopes(jwtPayload),
    customAttributes: customAttributes(jwtPayload),
    hasScope: hasScopeWrapper(userScopes(jwtPayload))
  };
}
