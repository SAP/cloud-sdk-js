import { createLogger, pickValueIgnoreCase } from '@sap-cloud-sdk/util';
import { decode } from 'jsonwebtoken';
import { Cache } from '../cache';
import { getIssuerSubdomain } from '../subdomain-replacer';
import type {
  Jwt,
  JwtPayload,
  JwtWithPayloadObject
} from '../jsonwebtoken-type';
import type { TokenKey } from '../xsuaa-service-types';
import type { IncomingMessage } from 'http';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'jwt'
});

/**
 * @internal
 */
export const defaultTenantId = 'provider-tenant';

function makeArray(val: string | string[] | undefined): string[] {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}

/**
 * @internal
 * Get the user ID from the JWT payload.
 * @param jwtPayload - Token payload to read the user ID from.
 * @returns The user ID, if available.
 */
export function userId({ user_id }: JwtPayload): string {
  logger.debug(`JWT user_id is: ${user_id}.`);
  return user_id;
}

/**
 * @internal
 * Get the default tenant ID.
 * @returns The default tenant ID.
 */
export function getDefaultTenantId(): string {
  logger.debug(
    'Could not determine tenant from JWT nor XSUAA, identity or destination service binding. Client Credentials token is cached without tenant information.'
  );
  return defaultTenantId;
}

/**
 * Get the tenant ID of a decoded JWT, based on its `zid` or if not available `app_tid` property.
 * @param jwt - Token to read the tenant ID from.
 * @returns The tenant ID, if available.
 */
export function getTenantId(
  jwt: JwtPayload | string | undefined
): string | undefined {
  const decodedJwt = jwt ? decodeJwt(jwt) : {};
  logger.debug(
    `JWT zid is: ${decodedJwt.zid}, app_tid is: ${decodedJwt.app_tid}.`
  );
  return decodedJwt.zid || decodedJwt.app_tid || undefined;
}

function isNotIasToken(decodedJwt: JwtPayload): boolean {
  return (
    !decodedJwt.iss?.includes('accounts.ondemand.com') &&
    !decodedJwt.iss?.includes('accounts400.ondemand.com')
  );
}

/**
 * @internal
 * Retrieve the subdomain from the decoded XSUAA JWT. If the JWT is not in XSUAA format, returns `undefined`.
 * @param jwt - JWT to retrieve the subdomain from.
 * @returns The subdomain, if available.
 */
export function getSubdomain(
  jwt: JwtPayload | string | undefined
): string | undefined {
  const decodedJwt = jwt ? decodeJwt(jwt) : {};
  return (
    decodedJwt?.ext_attr?.zdn ||
    (isNotIasToken(decodedJwt) ? getIssuerSubdomain(decodedJwt) : undefined)
  );
}

/**
 * @internal
 * Retrieve the audiences of a decoded JWT based on the audiences and scopes in the token.
 * @param decodedToken - Token to retrieve the audiences from.
 * @returns A set of audiences.
 */
// Comments taken from the Java SDK implementation
// Currently, scopes containing dots are allowed.
// Since the UAA builds audiences by taking the substring of scopes up to the last dot,
// scopes with dots will lead to an incorrect audience which is worked around here.
// If a JWT contains no audience, infer audiences based on the scope names in the JWT.
// This is currently necessary as the UAA does not correctly fill the audience in the user token flow.
export function audiences(decodedToken: JwtPayload): string[] {
  const parsedAudiences = audiencesFromAud(decodedToken);
  return parsedAudiences.length
    ? parsedAudiences
    : audiencesFromScope(decodedToken);
}

function audiencesFromAud({ aud }: JwtPayload): string[] {
  return makeArray(aud).map(audience => audience.split('.')[0]);
}

function audiencesFromScope({ scope }: JwtPayload): string[] {
  return makeArray(scope).reduce(
    (aud, s) => (s.includes('.') ? [...aud, s.split('.')[0]] : aud),
    []
  );
}

/**
 * Decode JWT.
 * @param token - JWT to be decoded.
 * @returns Decoded payload.
 */
export function decodeJwt(token: string | JwtPayload): JwtPayload {
  return typeof token === 'string' ? decodeJwtComplete(token).payload : token;
}

/**
 * Decode JWT and return the complete decoded token.
 * @param token - JWT to be decoded.
 * @returns Decoded token containing payload, header and signature.
 * @internal
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
  const authHeader = getAuthHeader(req);
  if (validateAuthHeader(authHeader)) {
    return authHeader?.split(' ')[1];
  }
}

function getAuthHeader(req: IncomingMessage): string | undefined {
  const authHeader = pickValueIgnoreCase(req.headers, 'authorization');
  if (authHeader) {
    return Array.isArray(authHeader) ? authHeader[0] : authHeader;
  }
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
 * 15 minutes is the default value used by the xssec lib.
 * @internal
 */
export const verificationKeyCache = new Cache<TokenKey>(900000);

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
 * Checks if the given JWT was issued by XSUAA based on the `iss` property and the UAA domain of the XSUAA.
 * @param decodedJwt - JWT to be checked.
 * @returns Whether the JWT was issued by XSUAA.
 * @internal
 */
export function isXsuaaToken(decodedJwt: JwtPayload | undefined): boolean {
  return decodedJwt?.ext_attr?.enhancer === 'XSUAA';
}

/**
 * Object holding a decoded JWT payload received by decoding the encoded string also in this object.
 * @internal
 */
export interface JwtPair {
  /**
   * @internal
   */
  decoded: JwtPayload;
  /**
   * @internal
   */
  encoded: string;
}

/**
 * Build JwtPair from an encoded JWT.
 * @internal
 */
export function getJwtPair(encodedJwt: string): JwtPair {
  return { encoded: encodedJwt, decoded: decodeJwt(encodedJwt) };
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
