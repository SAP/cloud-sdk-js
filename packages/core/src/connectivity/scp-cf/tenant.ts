import {
  checkMandatoryValue,
  DecodedJWT,
  JwtKeyMapping,
  readPropertyWithWarn
} from './jwt';

/**
 * Mapping between key name in the Tenant and key name in decoded JWT and the
 */
export const mappingTenantFields: JwtKeyMapping<
  Tenant,
  RegisteredJWTClaimsTenant
> = {
  id: { keyInJwt: 'zid', extractorFunction: tenantId },
  name: { keyInJwt: 'zdn', extractorFunction: tenantName }
};
/**
 * Get the tenant id of a decoded JWT.
 * @param decodedToken - Token to read the tenant id from.
 * @returns The tenant id if available.
 */
export function tenantId(decodedToken: DecodedJWT): string | undefined {
  return readPropertyWithWarn(decodedToken, mappingTenantFields.id.keyInJwt);
}

/**
 * Get the tenant name of a decoded JWT.
 * @param decodedToken - Token to read the tenant id from.
 * @returns The tenant id if available.
 */
export function tenantName(decodedToken: DecodedJWT): string | undefined {
  const extAttr = readPropertyWithWarn(decodedToken, 'ext_attr');
  if (extAttr) {
    return readPropertyWithWarn(extAttr, 'zdn');
  }
  return undefined;
}

/**
 * Keys in the JWT related to the user
 */
export interface RegisteredJWTClaimsTenant {
  zid?: string;
  zdn?: string;
}

/**
 * Representation of the tenant. A tenant represents the customer account on cloud foundry.
 */
export interface Tenant {
  id: string;
  name?: string;
}

/**
 * Creates a tenant object from the decoded JWT.
 *
 * @param decodedJWT - Decoded JWT token
 * @returns Representation of the tenant.
 * @exception Error Raised if no id is found in the decoded JWT.
 */
export function tenantFromJwt(decodedJWT: DecodedJWT): Tenant {
  checkMandatoryValue('id', mappingTenantFields, decodedJWT);
  return {
    id: tenantId(decodedJWT)!,
    name: tenantName(decodedJWT)
  };
}

/**
 * Compare two decoded JWTs based on their tenantIds.
 * @param decodedUserToken - User JWT
 * @param decodedProviderToken - Provider JWT
 * @returns Whether the tenant is identical.
 */
export function isIdenticalTenant(
  decodedUserToken: DecodedJWT,
  decodedProviderToken: DecodedJWT
): boolean {
  return (
    readPropertyWithWarn(decodedUserToken, mappingTenantFields.id.keyInJwt) ===
    readPropertyWithWarn(decodedProviderToken, mappingTenantFields.id.keyInJwt)
  );
}
