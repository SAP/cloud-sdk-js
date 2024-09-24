import type { JwtPayload } from './jsonwebtoken-type';
import { getTenantId } from './jwt';

/**
 * Compare two decoded JWTs based on their `tenantId`s.
 * @param userTokenPayload - User JWT payload.
 * @param providerTokenPayload - Provider JWT payload.
 * @returns Whether the tenant is identical.
 * @internal
 */
export function isIdenticalTenant(
  userTokenPayload: JwtPayload,
  providerTokenPayload: JwtPayload
): boolean {
  return getTenantId(userTokenPayload) === getTenantId(providerTokenPayload);
}
