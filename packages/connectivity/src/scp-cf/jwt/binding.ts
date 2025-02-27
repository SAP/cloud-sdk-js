import { getServiceCredentials } from '../environment-accessor';
import { decodeJwt, getTenantId } from './jwt';
import type { JwtPayload } from '../jsonwebtoken-type';

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
