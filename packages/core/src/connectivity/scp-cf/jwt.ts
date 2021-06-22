import { IncomingMessage } from 'http';
import * as url from 'url';
import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import { AxiosRequestConfig } from 'axios';
import { decode, Jwt, JwtPayload, verify } from 'jsonwebtoken';
import { getXsuaaServiceCredentials } from './environment-accessor';
import { TokenKey } from './xsuaa-service-types';
import { XsuaaServiceCredentials } from './environment-accessor-types';
import { Cache } from './cache';
import { fetchVerificationKeys } from './xsuaa-service';
import type { RegisteredJWTClaimsTenant } from './tenant';
import type { RegisteredJWTClaimsUser } from './user';

const logger = createLogger({
  package: 'core',
  messageContext: 'jwt'
});

/**
 * Decode JWT.
 * @param token - JWT to be decoded
 * @returns Decoded payload.
 */
export function decodeJwt(token: string): JwtPayload {
  return decodeJwtComplete(token).payload;
}

/**
 * Decode JWT and return the complete decoded token.
 * @param token - JWT to be decoded.
 * @returns Decoded token containing payload, header and signature.
 */
export function decodeJwtComplete(token: string): Jwt {
  const decodedToken = decode(token, { complete: true });
  if (decodedToken === null || typeof decodedToken === 'string') {
    throw new Error(
      'JwtError: The given jwt payload does not encode valid JSON.'
    );
  }
  return decodedToken;
}

/**
 * Retrieve JWT from a request that is based on the node `IncomingMessage`. Fails if no authorization header is given or has the wrong format. Expected format is 'Bearer <TOKEN>'.
 * @param req - Request to retrieve the JWT from
 * @returns JWT found in header
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
 * The URL for fetching the verfication certificate should have the same domain as the XSUAA. So if the UUA domain is "authentication.sap.hana.ondemand.com" the URL should be like
 * http://something.authentication.sap.hana.ondemand.com/somePath so the host should end with the domain.
 * @param verificationKeyURL URL used for obtaining the verification key
 * @param uaaDomain domain given in the XSUAA credentials
 */
function checkDomainVerificationKeyURL(
  verificationKeyURL: string,
  uaaDomain: string
): void {
  const jkuDomain = url.parse(verificationKeyURL).hostname;
  if (!uaaDomain || !jkuDomain || !jkuDomain.endsWith(uaaDomain)) {
    throw new Error(
      `The domains of the XSUAA and verification URL do not match. The XSUUA domain is '${uaaDomain}' and the jku field provided in the JWT is '${jkuDomain}'.`
    );
  }
}

/**
 * Verifies the given JWT and returns the decoded payload.
 * @param token - JWT to be verified
 * @param options - Options to control certain aspects of JWT verification behavior.
 * @returns A Promise to the decoded and verified JWT.
 */
export async function verifyJwt(
  token: string,
  options?: VerifyJwtOptions
): Promise<JwtPayload> {
  options = { ...defaultVerifyJwtOptions, ...options };

  const creds = getXsuaaServiceCredentials(token);
  const verificationKeyURL = getVerificationKeyURL(token);
  if (verificationKeyURL) {
    checkDomainVerificationKeyURL(verificationKeyURL, creds.uaadomain);
  }

  if (
    options.cacheVerificationKeys &&
    verificationKeyCache.get(verificationKeyURL)
  ) {
    const key = verificationKeyCache.get(verificationKeyURL) as TokenKey;

    return verifyJwtWithKey(token, key.value).catch(error => {
      logger.warn(
        'Unable to verify JWT with cached key, fetching new verification key.'
      );
      logger.warn(`Original error: ${error.message}`);

      return fetchAndCacheKeyAndVerify(
        creds,
        verificationKeyURL,
        token,
        options
      );
    });
  }

  return fetchAndCacheKeyAndVerify(creds, verificationKeyURL, token, options); // Verify only here
}

function fetchAndCacheKeyAndVerify(
  creds: XsuaaServiceCredentials,
  verificationKeyURL: string,
  token: string,
  options?: VerifyJwtOptions
) {
  return getVerificationKey(creds, verificationKeyURL)
    .catch(error => {
      throw new ErrorWithCause(
        'Failed to verify JWT. Could not retrieve verification key.',
        error
      );
    })
    .then(key =>
      options ? cacheVerificationKey(verificationKeyURL, key, options) : key
    )
    .then(key => verifyJwtWithKey(token, key.value));
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

function getVerificationKey(
  xsuaaCredentials: XsuaaServiceCredentials,
  jku: string
): Promise<TokenKey> {
  return fetchVerificationKeys(xsuaaCredentials, jku).then(verificationKeys => {
    if (!verificationKeys.length) {
      throw Error(
        'No verification keys have been returned by the XSUAA service.'
      );
    }
    return verificationKeys[0];
  });
}

// 15 minutes is the default value used by the xssec lib
export const verificationKeyCache = new Cache({ minutes: 15 });

function cacheVerificationKey(
  verificationKeyURL: string,
  key: TokenKey,
  options: VerifyJwtOptions
): TokenKey {
  if (options.cacheVerificationKeys) {
    verificationKeyCache.set(verificationKeyURL, key);
  }
  return key;
}

/**
 * Verifies the given JWT with the given key and returns the decoded payload.
 *
 * @param token - JWT to be verified.
 * @param key - Key to use for verification.
 * @returns A Promise to the decoded and verified JWT.
 */
export function verifyJwtWithKey(
  token: string,
  key: string
): Promise<JwtPayload> {
  return new Promise((resolve, reject) => {
    verify(token, sanitizeVerificationKey(key), (err, decodedToken) => {
      if (err) {
        reject(new ErrorWithCause('Invalid JWT.', err));
      } else if (!decodedToken) {
        reject('Invalid JWT. Token verification yielded `undefined`.');
      } else {
        resolve(decodedToken);
      }
    });
  });
}

function sanitizeVerificationKey(key: string) {
  // Add new line after -----BEGIN PUBLIC KEY----- and before -----END PUBLIC KEY----- because the lib won't work otherwise
  return key
    .replace(/\n/g, '')
    .replace(/(KEY\s*-+)([^\n-])/, '$1\n$2')
    .replace(/([^\n-])(-+\s*END)/, '$1\n$2');
}

/**
 * Get the issuer url of a decoded JWT.
 * @param decodedToken - Token to read the issuer url from.
 * @returns The issuer url if available.
 */
export function issuerUrl(decodedToken: JwtPayload): string | undefined {
  return readPropertyWithWarn(decodedToken, 'iss');
}

/**
 * Retrieve the audiences of a decoded JWT based on the audiences and scopes in the token.
 * @param decodedToken - Token to retrieve the audiences from.
 * @returns A set of audiences.
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
 */
export function wrapJwtInHeader(token: string): AxiosRequestConfig {
  return { headers: { Authorization: 'Bearer ' + token } };
}

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
 * Fetches the URL from the JWT header which exposes the verification key for that JWT.
 * @param token - Encoded JWT as a string.
 * @returns The value of the `jku` property of the JWT header.
 */
function getVerificationKeyURL(token: string): string {
  const decodedJwt = decodeJwtComplete(token);
  if (!decodedJwt.header.jku) {
    throw new Error(
      'Field jku containing the URL for JWT verification not part of header.'
    );
  }
  return decodedJwt.header.jku;
}

/**
 * @deprecated Since v1.46.0. This interface will not be replaced. Use the higher level JWT types directly.
 * Interface to represent the registered claims of a JWT.
 */
export type RegisteredJWTClaims = RegisteredJWTClaimsBasic &
  RegisteredJWTClaimsUser &
  RegisteredJWTClaimsTenant;

/**
 * @deprecated Since v1.46.0. This interface will not be replaced. Use the higher level JWT types directly.
 * Interface to represent the basic properties like issuer, audience etc.
 */
export interface RegisteredJWTClaimsBasic {
  iss?: string;
  exp?: number;
  sub?: string;
  aud?: string[];
  nbf?: string;
  iat?: number;
  jti?: string;
}

/**
 * @deprecated Since v1.46.0. Use `JwtHeader` instead.
 * Interface to represent the basic properties of a JWT header.
 */
export interface JWTHeader {
  alg: string;
  typ: string;
  jku?: string;
}

/**
 * @deprecated Since v1.20.0. Use [[JWTPayload]] if you want to represent the decoded JWT payload or [[CompleteDecodedJWT]] for the full decoded object.
 * Interface to represent the payload of a JWT.
 */
export interface DecodedJWT extends RegisteredJWTClaims {
  [otherKey: string]: any;
}

/**
 * @deprecated Since v1.46.0. Use `JwtPayload` instead.
 * Interface to represent the payload of a JWT.
 */
export interface JWTPayload extends RegisteredJWTClaims {
  [otherKey: string]: any;
}

/**
 * @deprecated Since v1.46.0. Use `Jwt` instead.
 * Interface to represent header and  payload of a JWT.
 */
export interface CompleteDecodedJWT extends RegisteredJWTClaims {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
}

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
