import { IncomingMessage } from 'http';
import {
  createLogger,
  ErrorWithCause,
  pickValueIgnoreCase
} from '@sap-cloud-sdk/util';
import { createSecurityContext } from '@sap/xssec';
import { decode } from 'jsonwebtoken';
import { Cache } from './cache';
import { getServiceCredentials, getXsuaaService } from './environment-accessor';
import { Jwt, JwtPayload, JwtWithPayloadObject } from './jsonwebtoken-type';
import { TokenKey } from './xsuaa-service-types';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'jwt'
});

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
 * Get the tenant ID of a decoded JWT, based on its `zid` or if not available `app_tid` property.
 * @param jwtPayload - Token payload to read the tenant ID from.
 * @param jwtPayload.zid - The zone ID, representing the tenant in the XSUAA token.
 * @param jwtPayload.app_tid - The app tenant ID, representing the tenant in the IAS token.
 * @returns The tenant ID, if available.
 */
export function getgetTenantId({ zid, app_tid }: JwtPayload): string {
  logger.debug(`JWT zid is: ${zid}, app_tid is: ${app_tid}.`);
  return zid ?? app_tid;
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
 * Verifies the given JWT and returns the decoded payload.
 * @param jwt - JWT to be verified
 * @param options - Options to control certain aspects of JWT verification behavior.
 * @returns A Promise to the decoded and verified JWT.
 * @internal
 */
export async function verifyJwt(
  jwt: string,
  options?: VerifyJwtOptions
): Promise<JwtPayload> {
  const disableCache = !{ ...defaultVerifyJwtOptions, ...options }
    .cacheVerificationKeys;

  const xsuaaService = getXsuaaService({ disableCache, jwt });

  const { token } = await createSecurityContext(xsuaaService, {
    jwt
  }).catch(e => {
    throw new ErrorWithCause('Failed to verify JWT.', e);
  });

  return token.payload;
}

/**
 * Options to control certain aspects of JWT verification behavior.
 */
export interface VerifyJwtOptions {
  /**
   * The verification keys are cached if set to true.
   */
  cacheVerificationKeys?: boolean;
}

const defaultVerifyJwtOptions: VerifyJwtOptions = {
  cacheVerificationKeys: true
};

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
 * @param jwt - JWT to be checked.
 * @returns Whether the JWT was issued by XSUAA.
 * @internal
 */
export function isXsuaaToken(jwt: JwtWithPayloadObject): boolean {
  return jwt.payload.ext_attr?.enhancer === 'XSUAA';
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

/**
 * This method either decodes the given JWT or tries to retrieve the tenant from a service binding (XSUAA, IAS or destination) as `zid`.
 * @param options - Options passed to register the destination containing the JWT.
 * @returns The decoded JWT or a dummy JWT containing the tenant identifier (zid).
 * @internal
 */
export function decodeOrMakeJwt(
  jwt?: string | JwtPayload
): JwtPayload | undefined {
  if (jwt) {
    const decodedJwt = typeof jwt === 'string' ? decodeJwt(jwt) : jwt;
    if (getTenantId(decodedJwt)) {
      return decodedJwt;
    }
  }

  const providerTenantId = getTenantIdFromBinding();

  // This is returning a JWT with an XSUAA style zid.
  // It might make sense to check whether the binding was IAS and then rather return app_tid, as it would be in a IAS token.
  if (providerTenantId) {
    return { zid: providerTenantId };
  }
}
/**
 * @internal
 * @returns The tenant identifier from the XSUAA, identity or destination service binding.
 */
export function getTenantIdFromBinding(): string | undefined {
  return (
    getServiceCredentials('xsuaa')?.tenantid ||
    getServiceCredentials('identity')?.app_tid ||
    getServiceCredentials('destination')?.tenantid
  );
}
