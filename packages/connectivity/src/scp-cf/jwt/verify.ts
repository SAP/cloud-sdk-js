import { createSecurityContext } from '@sap/xssec';
import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { getXsuaaService } from '../environment-accessor';
import type { JwtPayload } from '../jsonwebtoken-type';

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
