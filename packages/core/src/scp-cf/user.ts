/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { pipe } from 'rambda';
import {
  checkMandatoryValue,
  customAttributes,
  DecodedJWT,
  JwtKeyMapping,
  userEmail,
  userFamilyName,
  userGivenName,
  userId,
  userName,
  userScopes
} from '../util';

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
 * Mapping between key name in the User and key name in decoded JWT and the
 */
export const mapping: JwtKeyMapping<UserData, RegisteredJWTClaimsUser> = {
  id: { keyInJwt: 'user_id', extractorFunction: userId },
  userName: { keyInJwt: 'user_name', extractorFunction: userName },
  givenName: { keyInJwt: 'given_name', extractorFunction: userGivenName },
  familyName: { keyInJwt: 'family_name', extractorFunction: userFamilyName },
  email: { keyInJwt: 'email', extractorFunction: userEmail },
  scopes: { keyInJwt: 'scope', extractorFunction: userScopes },
  customAttributes: { keyInJwt: 'xs.user.attributes', extractorFunction: customAttributes }
};

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
  return (scope: Scope): boolean => scopes.find(scopeFromList => scopeFromList.name === scope.name) !== undefined;
}

/**
 * Creates a user object from the decoded JWT.
 *
 * @param decodedJWT - Decoded JWT toeken
 * @returns Representation of the user
 * @exception Error Raised if no id is found in the decoded JWT.
 */
export function userFromJwt(decodedJWT: DecodedJWT): User {
  checkMandatoryValue('id', mapping, decodedJWT);
  checkMandatoryValue('userName', mapping, decodedJWT);
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
