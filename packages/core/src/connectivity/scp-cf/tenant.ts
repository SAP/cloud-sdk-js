import { JwtPayload } from 'jsonwebtoken';
import {
  checkMandatoryValue,
  JwtKeyMapping,
  readPropertyWithWarn
} from './jwt';

/**
 * Mapping between key name in the Tenant and key name in decoded JWT.
 */
export const mappingTenantFields: JwtKeyMapping<Tenant, 'zid' | 'zdn'> = {
  id: { keyInJwt: 'zid', extractorFunction: tenantId },
  name: { keyInJwt: 'zdn', extractorFunction: tenantName }
};

/**
 * Get the tenant id of a decoded JWT.
 * @param jwtPayload Token payload to read the tenant id from.
 * @returns The tenant id, if available.
 */
export function tenantId(jwtPayload: JwtPayload): string | undefined {
  return readPropertyWithWarn(jwtPayload, mappingTenantFields.id.keyInJwt);
}

/**
 * Get the tenant name of a decoded JWT.
 * @param jwtPayload Token payload to read the tenant name from.
 * @returns The tenant name, if available.
 */
export function tenantName(jwtPayload: JwtPayload): string | undefined {
  const extAttr = readPropertyWithWarn(jwtPayload, 'ext_attr');
  if (extAttr) {
    return readPropertyWithWarn(extAttr, 'zdn');
  }
}

/**
 * @deprecated Since v1.46.0. This interface will not be replaced. Use the higher level JWT types directly.
 * Keys in the JWT related to the tenant.
 */
export interface RegisteredJWTClaimsTenant {
  zid?: string;
  zdn?: string;
}

/**
 * Representation of the tenant. A tenant represents the customer account on Cloud Foundry.
 */
export interface Tenant {
  id: string;
  name?: string;
}

/**
 * Creates a tenant object from the JWT payload.
 * Throws an error if the property `id` is not present in the payload.
 * @param jwtPayload Token payload to get the tenant information from.
 * @returns Representation of the tenant.
 */
export function tenantFromJwt(jwtPayload: JwtPayload): Tenant {
  checkMandatoryValue('id', mappingTenantFields, jwtPayload);
  return {
    id: tenantId(jwtPayload)!,
    name: tenantName(jwtPayload)
  };
}

/**
 * Compare two decoded JWTs based on their `tenantId`s.
 * @param userTokenPayload - User JWT payload.
 * @param providerTokenPayload - Provider JWT payload.
 * @returns Whether the tenant is identical.
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
