import { IncomingMessage } from 'http';
import * as url from 'url';
import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import { AxiosRequestConfig } from 'axios';
import jwt from 'jsonwebtoken';
import { getXsuaaServiceCredentials } from './environment-accessor';
import { TokenKey } from './xsuaa-service-types';
import { XsuaaServiceCredentials } from './environment-accessor-types';
import type { RegisteredJWTClaimsTenant } from './tenant';
import type { RegisteredJWTClaimsUser } from './user';
import { Cache } from './cache';
import { fetchVerificationKeys } from './xsuaa-service';

const logger = createLogger({
  package: 'core',
  messageContext: 'jwt'
});

/**
 * Decode JWT.
 * @param token - JWT to be decoded
 * @returns Decoded payload.
 */
export function decodeJwt(token: string): DecodedJWT {
  return decodeJwtComplete(token).payload;
}

/**
 * Decode JWT and return the complete decoded token.
 * @param token - JWT to be decoded
 * @returns Decoded token containing payload, header and signature.
 */
export function decodeJwtComplete(token: string): CompleteDecodedJWT {
  const decodedToken = jwt.decode(token, { complete: true });
  if (decodedToken === null || typeof decodedToken === 'string') {
    throw new Error(
      'JwtError: The given jwt payload does not encode valid JSON.'
    );
  }
  return {
    header: decodedToken.header,
    payload: decodedToken.payload,
    signature: decodedToken.signature
  };
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
      `The domains of the XSUAA and verification URL do not match - XSUUA domain is ${uaaDomain} and the URL provided in JWT (field jku) to receive validation certificate is ${jkuDomain}.`
    );
  }
}

/**
 * Verifies the given JWT and returns the decoded payload.
 *
 * @param token - JWT to be verified
 * @param options - Options to control certain aspects of JWT verification behavior.
 * @returns A Promise to the decoded and verified JWT.
 */
export async function verifyJwt(
  token: string,
  options?: VerifyJwtOptions
): Promise<DecodedJWT> {
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
        'Failed to verify JWT - unable to get verification key!',
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
        'No verification keys have been returned by the XSUAA service!'
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
 * @param token - JWT to be verified
 * @param key - Key to use for verification
 * @returns A Promise to the decoded and verified JWT.
 */
export function verifyJwtWithKey(
  token: string,
  key: string
): Promise<DecodedJWT> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, sanitizeVerificationKey(key), (err, decodedToken) => {
      if (err) {
        reject(new ErrorWithCause('JWT invalid', err));
      } else {
        resolve(decodedToken as DecodedJWT);
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
export function issuerUrl(decodedToken: DecodedJWT): string | undefined {
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
export function audiences(decodedToken: DecodedJWT): Set<string> {
  if (audiencesFromAud(decodedToken).length) {
    return new Set(audiencesFromAud(decodedToken));
  }
  return new Set(audiencesFromScope(decodedToken));
}

function audiencesFromAud(decodedToken: DecodedJWT): string[] {
  if (!(decodedToken.aud instanceof Array && decodedToken.aud.length)) {
    return [];
  }
  return decodedToken.aud.map(aud =>
    aud.includes('.') ? aud.substr(0, aud.indexOf('.')) : aud
  );
}

function audiencesFromScope(decodedToken: DecodedJWT): string[] {
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
  decodedJwt: DecodedJWT,
  property: string
): any {
  if (!decodedJwt[property]) {
    logger.warn(
      `WarningJWT: The provided JWT does not include "${property}" property.`
    );
  }

  return decodedJwt[property];
}

/**
 * Fetches the URL from the JWT header which exposes the verification key for that JWT.
 * @param token - Undecoded JWT as a string
 * @returns The value of jku property of the JWT header
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
 * Interface to represent the registered claims of a JWT.
 */
export type RegisteredJWTClaims = RegisteredJWTClaimsBasic &
  RegisteredJWTClaimsUser &
  RegisteredJWTClaimsTenant;

/**
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
 * Interface to represent the basic properties of a jwt header
 */
export interface JWTHeader {
  alg: string;
  typ: string;
  jku?: string;
}

/**
 * @Deprecated Since v1.20.0. Use [[JWTPayload]] if you want to represent the decoded JWT payload or [[CompleteDecodedJWT]] for the full decoded object.
 * Interface to represent the payload of a JWT.
 */
export interface DecodedJWT extends RegisteredJWTClaims {
  [otherKey: string]: any;
}

/**
 * Interface to represent the payload of a JWT.
 */
export interface JWTPayload extends RegisteredJWTClaims {
  [otherKey: string]: any;
}

/**
 * Interface to represent header and  payload of a JWT.
 */
export interface CompleteDecodedJWT extends RegisteredJWTClaims {
  header: JWTHeader;
  payload: JWTPayload;
  signature: string;
}

export type JwtKeyMapping<TypescriptKeys, JwtKeys> = {
  [key in keyof TypescriptKeys]: {
    keyInJwt: keyof JwtKeys;
    extractorFunction: (decodedJWT: DecodedJWT) => any;
  };
};

/**
 * Checks if a given key is in the decoded JWT. If not an error is raised
 * @param key - The key of the representation in typescript
 * @param mapping - The mapping between the typescript keys and the JWT key
 * @param decodedJWT - Decoded token on which the check is done
 * @exception Error is thrown if the key is not present.
 */
export function checkMandatoryValue<TypeScriptKeys, JwtKeys>(
  key: keyof TypeScriptKeys,
  mapping: JwtKeyMapping<TypeScriptKeys, JwtKeys>,
  decodedJWT: DecodedJWT
): void {
  const value = mapping[key].extractorFunction(decodedJWT);
  if (!value) {
    throw new Error(
      `Field ${mapping[key].keyInJwt} not provided in decoded jwt: ${decodedJWT}`
    );
  }
}
