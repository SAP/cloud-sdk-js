import { createLogger } from '@sap-cloud-sdk/util';
import { getServiceCredentials } from './environment-accessor';
import { JwtPayload } from './jsonwebtoken-type';
import {
  checkMandatoryValue,
  decodeJwt,
  JwtKeyMapping,
  readPropertyWithWarn
} from './jwt';
import { parseSubdomain } from './subdomain-replacer';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'tenant'
});
/**
 * Mapping between key name in the Tenant and key name in decoded JWT.
 * @internal
 */
export const mappingTenantFields: JwtKeyMapping<Tenant, 'zid' | 'zdn'> = {
  id: { keyInJwt: 'zid', extractorFunction: tenantId },
  name: { keyInJwt: 'zdn', extractorFunction: tenantName }
};

/**
 * Get the tenant id of a decoded JWT.
 * @param jwtPayload - Token payload to read the tenant id from.
 * @returns The tenant id, if available.
 * @internal
 */
export function tenantId(jwtPayload: JwtPayload): string | undefined {
  return readPropertyWithWarn(jwtPayload, mappingTenantFields.id.keyInJwt);
}

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
 * Creates a tenant object from the JWT payload.
 * Throws an error if the property `id` is not present in the payload.
 * @param jwtPayload - Token payload to get the tenant information from.
 * @returns Representation of the tenant.
 * @internal
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

const placeholderTenantId = 'tenant_id';

/**
 * @internal
 * Return the tenantid based on the given conditions:
 * - If a JWT is provided and contains `zid`, return the value of zid.
 * - If a JWT is provided and contains `iss`, return its subdomain.
 * - If a binding to the XSUAA service exists, return the `subaccountid` from its credentials.
 * - Return a default string value.
 * @param jwt - JWT.
 * @returns String with tenantid information.
 */
export function getTenantIdWithFallback(jwt?: string): string {
  // TODO: Why is this the only place where subaccount matters (why is it not used when caching, e.g.?)
  return (
    getTenantIdFromJwt(jwt) || getSubaccountIdFromXsuaa() || placeholderTenantId
  );
}

function getTenantIdFromJwt(jwt?: string): string | undefined {
  if (jwt) {
    const decodedJwt = decodeJwt(jwt);

    return (
      tenantId(decodedJwt) ||
      (decodedJwt.iss ? parseSubdomain(decodedJwt.iss) : undefined)
    );
  }
}

function getSubaccountIdFromXsuaa(): string | undefined {
  return getServiceCredentials('xsuaa')?.subaccountid;
}
