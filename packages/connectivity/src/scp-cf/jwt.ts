import { IncomingMessage } from 'http';
import * as xssec from '@sap/xssec';
import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import { decode } from 'jsonwebtoken';
import { Jwt, JwtPayload, JwtWithPayloadObject } from './jsonwebtoken-type';
import { getXsuaaServiceCredentials } from './environment-accessor';
import { TokenKey } from './xsuaa-service-types';
import { Cache } from './cache';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'jwt'
});

/**
 * Decode JWT.
 * @param token - JWT to be decoded.
 * @returns Decoded payload.
 */
export function decodeJwt(token: string): JwtPayload {
  return decodeJwtComplete(token).payload;
}

/**
 * Decode JWT and return the complete decoded token.
 * @param token - JWT to be decoded.
 * @returns Decoded token containing payload, header and signature.
 *  @internal
 */
export function decodeJwtComplete(token: string): JwtWithPayloadObject {
  const decodedToken = decode(token, { complete: true, json: true });
  if (decodedToken !== null && isJwtWithPayloadObject(decodedToken)) {
    return decodedToken;
  }
  throw new Error(
    'JwtError: The given jwt payload does not encode valid JSON.'
  );
}

/**
 * Retrieve JWT from a request that is based on the node `IncomingMessage`. Fails if no authorization header is given or has the wrong format. Expected format is 'Bearer <TOKEN>'.
 * @param req - Request to retrieve the JWT from.
 * @returns JWT found in header.
 */
export function retrieveJwt(req: IncomingMessage): string | undefined {
  const header = authHeader(req);
  if (validateAuthHeader(header)) {
    return header!.split(' ')[1];
  }
}

function authHeader(req: IncomingMessage): string | undefined {
  const entries = Object.entries(req.headers).find(
    ([key]) => key.toLowerCase() === 'authorization'
  );
  if (entries) {
    const header = entries[1];

    // Header could be a list of headers
    return Array.isArray(header) ? header[0] : header;
  }
  return undefined;
}

function validateAuthHeader(header: string | undefined): boolean {
  if (typeof header === 'undefined') {
    logger.warn('Authorization header not set.');
    return false;
  }

  const [authType, token] = header.split(' ');

  if (typeof token === 'undefined') {
    logger.warn('Token in auth header missing.');
    return false;
  }

  if (authType.toLowerCase() !== 'bearer') {
    logger.warn('Authorization type is not Bearer.');
    return false;
  }

  return true;
}

/**
 * Verifies the given JWT and returns the decoded payload.
 * @param token - JWT to be verified
 * @param options - Options to control certain aspects of JWT verification behavior.
 * @returns A Promise to the decoded and verified JWT.
 *  @internal
 */
export async function verifyJwt(
  token: string,
  options?: VerifyJwtOptions
): Promise<JwtPayload> {
  const disableCache = { ...defaultVerifyJwtOptions, ...options }
    .cacheVerificationKeys
    ? false
    : true;
  const credentials = getXsuaaServiceCredentials(token);

  const promise = new Promise<JwtPayload>((resolve, reject) => {
    xssec.createSecurityContext(
      token,
      { disableCache, credentials },
      function (error, securityContext, tokenInfo) {
        if (error) {
          return reject(error);
        }
        return resolve(tokenInfo.getPayload());
      }
    );
  });
  return promise
    .then(data => data)
    .catch(e => {
      throw new ErrorWithCause('Failed to verify JWT.', e);
    });
}

/**
 * Options to control certain aspects of JWT verification behavior.
 */
export interface VerifyJwtOptions {
  cacheVerificationKeys?: boolean;
}

const defaultVerifyJwtOptions: VerifyJwtOptions = {
  cacheVerificationKeys: true
};

/**
 * 15 minutes is the default value used by the xssec lib
 *  @internal
 */
export const verificationKeyCache = new Cache<TokenKey>({ minutes: 15 });

/**
 * Get the issuer URL of a decoded JWT.
 * @param decodedToken - Token to read the issuer URL from.
 * @returns The issuer URL if available.
 *  @internal
 */
export function issuerUrl(decodedToken: JwtPayload): string | undefined {
  return readPropertyWithWarn(decodedToken, 'iss');
}

/**
 * Retrieve the audiences of a decoded JWT based on the audiences and scopes in the token.
 * @param decodedToken - Token to retrieve the audiences from.
 * @returns A set of audiences.
 *  @internal
 */
// Comments taken from the Java SDK implementation
// Currently, scopes containing dots are allowed.
// Since the UAA builds audiences by taking the substring of scopes up to the last dot,
// Scopes with dots will lead to an incorrect audience which is worked around here.
// If a JWT contains no audience, infer audiences based on the scope names in the JWT.
// This is currently necessary as the UAA does not correctly fill the audience in the user token flow.
export function audiences(decodedToken: JwtPayload): Set<string> {
  if (audiencesFromAud(decodedToken).length) {
    return new Set(audiencesFromAud(decodedToken));
  }
  return new Set(audiencesFromScope(decodedToken));
}

function audiencesFromAud(decodedToken: JwtPayload): string[] {
  if (!(decodedToken.aud instanceof Array && decodedToken.aud.length)) {
    return [];
  }
  return decodedToken.aud.map(aud =>
    aud.includes('.') ? aud.substr(0, aud.indexOf('.')) : aud
  );
}

function audiencesFromScope(decodedToken: JwtPayload): string[] {
  if (!decodedToken.scope) {
    return [];
  }

  const scopes =
    decodedToken.scope instanceof Array
      ? decodedToken.scope
      : [decodedToken.scope];
  return scopes.reduce((aud, scope) => {
    if (scope.includes('.')) {
      return [...aud, scope.substr(0, scope.indexOf('.'))];
    }
    return aud;
  }, []);
}

/**
 * Wraps the access token in header's authorization.
 * @param token - Token to attach in request header
 * @returns The request header that holds the access token
 * @internal
 */
export function wrapJwtInHeader(token: string): {
  headers: { Authorization: string; [key: string]: any };
} {
  return { headers: { Authorization: 'Bearer ' + token } };
}

/**
 * @internal
 * @param jwtPayload - The jwt payload.
 * @param property - The property to be read.
 * @returns the property if present.
 */
export function readPropertyWithWarn(
  jwtPayload: JwtPayload,
  property: string
): any {
  if (!jwtPayload[property]) {
    logger.warn(
      `WarningJWT: The provided JWT payload does not include a '${property}' property.`
    );
  }

  return jwtPayload[property];
}

/**
 * @internal
 */
export type JwtKeyMapping<InterfaceT, JwtKeysT> = {
  [key in keyof InterfaceT]: {
    // This second part of the conditional type is deprecated and should be removed in version 2.0.
    keyInJwt: JwtKeysT extends string ? JwtKeysT : keyof JwtKeysT;
    extractorFunction: (jwtPayload: JwtPayload) => any;
  };
};

/**
 * Checks if a given key is present in the decoded JWT. If not, an error is thrown.
 * @param key - The key of the representation in typescript
 * @param mapping - The mapping between the typescript keys and the JWT key
 * @param jwtPayload - JWT payload to check fo the given key.
 * @internal
 */
export function checkMandatoryValue<InterfaceT, JwtKeysT>(
  key: keyof InterfaceT,
  mapping: JwtKeyMapping<InterfaceT, JwtKeysT>,
  jwtPayload: JwtPayload
): void {
  const value = mapping[key].extractorFunction(jwtPayload);
  if (!value) {
    throw new Error(
      `Property '${mapping[key].keyInJwt}' is missing in JWT payload.`
    );
  }
}

/**
 * Object holding a decoded JWT payload received by decoding the encoded string also in this object.
 * @internal
 */
export interface JwtPair {
  decoded: JwtPayload;
  encoded: string;
}

/**
 * The user JWT can be a full JWT containing user information but also a reduced one setting only the iss value
 * This method divides the two cases.
 * @param token - Token to be investigated
 * @returns Boolean value with true if the input is a UserJwtPair
 * @internal
 */
export function isUserToken(token: JwtPair | undefined): token is JwtPair {
  if (!token) {
    return false;
  }
  // Check if it is an Issuer Payload
  const keys = Object.keys(token.decoded);
  return !(keys.length === 1 && keys[0] === 'iss');
}

function isJwtWithPayloadObject(decoded: Jwt): decoded is JwtWithPayloadObject {
  return typeof decoded.payload !== 'string';
}
