import * as xssec from '@sap/xssec';
import { JwtPayload } from './jsonwebtoken-type';
import { parseSubdomain } from './subdomain-replacer';
import { decodeJwt } from './jwt';
import { Service } from './environment-accessor-types';
import {
  ResilienceMiddlewareOptions,
  ResilienceOptions
} from './resilience/resilience-options';
import { ClientCredentialsResponse } from './xsuaa-service-types';
import { resolveService } from './environment-accessor';
import { callWithResilience } from './resilience/resilience';

// `@sap/xssec` sometimes checks `null` without considering `undefined`.
interface SubdomainAndZoneId {
  subdomain: string | null;
  zoneId: string | null;
}

/**
 * Get subdomain and zoneId value from a given JWT.
 * @param jwt - A JWT from the current user.
 * @returns subdomain and zoneId from the JWT
 * @internal
 */
export function getSubdomainAndZoneId(
  jwt?: string | JwtPayload
): SubdomainAndZoneId {
  let subdomain: string | null = null;
  let zoneId: string | null = null;

  if (jwt) {
    const jwtPayload = typeof jwt === 'string' ? decodeJwt(jwt) : jwt;

    if (jwtPayload.iss) {
      subdomain = parseSubdomain(jwtPayload.iss);
    }
    if (jwtPayload.zid) {
      zoneId = jwtPayload.zid;
    }
  }

  return { subdomain, zoneId };
}

/**
 * Make a user token request against the XSUAA service.
 * @param service - Service as it is defined in the environment variable.
 * @param userJwt - User JWT.
 * @param options - Options to influence resilience behavior (see {@link ResilienceOptions}). By default, usage of a circuit breaker is enabled.
 * @returns Client credentials token.
 */
export async function getClientCredentialsToken(
  service: string | Service,
  userJwt?: string | JwtPayload,
  options?: ResilienceOptions & {
    resilience?: ResilienceMiddlewareOptions;
  }
): Promise<ClientCredentialsResponse> {
  if (
    options?.resilience ||
    options?.enableCircuitBreaker ||
    options?.timeout
  ) {
    return callWithResilience(
      () => getClientCredentialsToken(service, userJwt),
      options
    );
  }

  const serviceCredentials = resolveService(service).credentials;
  const subdomainAndZoneId = getSubdomainAndZoneId(userJwt);

  const xssecPromise: Promise<ClientCredentialsResponse> = new Promise(
    (resolve, reject) => {
      xssec.requests.requestClientCredentialsToken(
        subdomainAndZoneId.subdomain,
        serviceCredentials,
        null,
        subdomainAndZoneId.zoneId,
        (err: Error, token: string, tokenResponse: ClientCredentialsResponse) =>
          err ? reject(err) : resolve(tokenResponse)
      );
    }
  );

  return xssecPromise;
}

/**
 * Make a user token request against the XSUAA service.
 * @param service - Service as it is defined in the environment variable.
 * @param userJwt - User JWT.
 * @param options - Options to influence resilience behavior (see {@link ResilienceOptions}). By default, usage of a circuit breaker is enabled.
 * @returns User token.
 */
export function getUserToken(
  service: Service,
  userJwt: string,
  options?: ResilienceOptions & {
    resilience?: ResilienceMiddlewareOptions;
  }
): Promise<string> {
  if (
    options?.resilience ||
    options?.enableCircuitBreaker ||
    options?.timeout
  ) {
    return callWithResilience(() => getUserToken(service, userJwt), options);
  }
  const subdomainAndZoneId = getSubdomainAndZoneId(userJwt);

  const xssecPromise = new Promise((resolve: (token: string) => void, reject) =>
    xssec.requests.requestUserToken(
      userJwt,
      service.credentials,
      null,
      null,
      subdomainAndZoneId.subdomain,
      subdomainAndZoneId.zoneId,
      (err: Error, token: string) => (err ? reject(err) : resolve(token))
    )
  );
  return xssecPromise;
}
