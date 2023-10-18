import { JwtPayload } from './jsonwebtoken-type';
import {
  customAttributes,
  userEmail,
  userFamilyName,
  userGivenName,
  userId,
  userName,
  userScopes
} from './jwt';

/**
 * @deprecated Since v3.7.0. There will be no replacement. This functionality is currently marked as internal and will be removed in the next major version.
 * Representation of the user i.e. authenticated persona. The authentication is done by the XSUAA service.
 * @internal
 */
export interface User {
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
  scopes: string[];
  /**
   * @internal
   */
  customAttributes: Record<string, any>;
  /**
   * @internal
   */
  hasScope: (scope: string) => boolean;
}

function validateMandatoryParameter(
  value: string | undefined,
  key: string
): string {
  if (value === undefined) {
    throw new Error(`Property '${key}' is missing in JWT payload.`);
  }
  return value;
}

/**
 * @deprecated Since v3.7.0. There will be no replacement. This functionality is currently marked as internal and will be removed in the next major version.
 * Creates a user object from the decoded JWT.
 * Throws an error if no `id` or `userName` property is present on the JWT payload.
 * @param jwtPayload - Token payload to get the user from.
 * @returns Representation of the user.
 * @internal
 */
export function userFromJwt(jwtPayload: JwtPayload): User {
  const scopes = userScopes(jwtPayload);
  const mandatoryParameters = {
    id: validateMandatoryParameter(userId(jwtPayload), 'user_id'),
    userName: validateMandatoryParameter(userName(jwtPayload), 'user_name')
  };
  return {
    ...mandatoryParameters,
    givenName: userGivenName(jwtPayload),
    familyName: userFamilyName(jwtPayload),
    email: userEmail(jwtPayload),
    scopes,
    customAttributes: customAttributes(jwtPayload),
    hasScope: scope => scopes.some(scopeFromList => scopeFromList === scope)
  };
}
