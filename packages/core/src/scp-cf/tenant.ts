/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { checkMandatoryValue, DecodedJWT, JwtKeyMapping, tenantId, tenantName } from '../util';

/**
 * Mapping between key name in the Tenant and key name in decoded JWT and the
 */
export const mapping: JwtKeyMapping<Tenant, RegisteredJWTClaimsTenant> = {
  id: { keyInJwt: 'zid', extractorFunction: tenantId },
  name: { keyInJwt: 'zdn', extractorFunction: tenantName }
};

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
  checkMandatoryValue('id', mapping, decodedJWT);
  return {
    id: tenantId(decodedJWT)!,
    name: tenantName(decodedJWT)
  };
}
