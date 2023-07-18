import { JwtPayload } from './jsonwebtoken-type';
import { decodeJwt, JwtKeyMapping, readPropertyWithWarn } from './jwt';
import { getIssuerSubdomain } from './subdomain-replacer';

/**
 * Mapping between key name in the tenant and key name in decoded JWT.
 * @internal
 */
export const mappingTenantFields: JwtKeyMapping<Tenant, 'zid' | 'zdn'> = {
  id: { keyInJwt: 'zid', extractorFunction: tenantId },
  name: { keyInJwt: 'zdn', extractorFunction: tenantName }
};

/**
 * Get the tenant name of a decoded JWT.
 * @param jwtPayload - Token payload to read the tenant name from.
 * @returns The tenant name, if available.
 * @internal
 */
export function tenantName(jwtPayload: JwtPayload): string | undefined {
  const extAttr = readPropertyWithWarn(jwtPayload, 'ext_attr');
  if (extAttr) {
    return readPropertyWithWarn(extAttr, 'zdn');
  }
}

/**
 * Get the tenant id of a decoded JWT, based on its `zid` property.
 * @param jwtPayload - Token payload to read the tenant id from.
 * @returns The tenant id, if available.
 * @internal
 */
export function tenantId(jwtPayload: JwtPayload): string | undefined {
  return readPropertyWithWarn(jwtPayload, mappingTenantFields.id.keyInJwt);
}

/**
 * Get the tenant id of a decoded JWT, based on its `zid` property or, if not available, the `iss` subdomain.
 * @param token - Token to read the tenant id from.
 * @returns The tenant id, if available.
 * @internal
 */
export function getTenantIdWithFallback(
  token: string | undefined
): string | undefined {
  const decodedJwt = token ? decodeJwt(token) : {};
  return tenantId(decodedJwt) || getIssuerSubdomain(decodedJwt) || undefined;
}

/**
 * Representation of the tenant. A tenant represents the customer account on Cloud Foundry.
 * @internal
 */
export interface Tenant {
  /**
   * @internal
   */
  id: string;
  /**
   * @internal
   */
  name?: string;
}

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
  return (
    readPropertyWithWarn(userTokenPayload, mappingTenantFields.id.keyInJwt) ===
    readPropertyWithWarn(providerTokenPayload, mappingTenantFields.id.keyInJwt)
  );
}
