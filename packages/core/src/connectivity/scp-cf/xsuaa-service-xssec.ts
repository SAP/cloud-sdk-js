import * as xssec from '@sap/xssec';
import CircuitBreaker from 'opossum';
import { parseSubdomain } from './subdomain-replacer';
import { decodeJwt } from './jwt';
import { ServiceCredentials } from './environment-accessor-types';
import {
  circuitBreakerDefaultOptions,
  ResilienceOptions
} from './resilience-options';

type XsuaaServiceXssecCircuitBreaker = CircuitBreaker<
  [requestUserTokenParam: RequestUserTokenParam],
  string
>;
let circuitBreaker: XsuaaServiceXssecCircuitBreaker;
function getCircuitBreaker(): XsuaaServiceXssecCircuitBreaker {
  if (!circuitBreaker) {
    circuitBreaker = new CircuitBreaker(
      xssec.requests.requestUserToken,
      circuitBreakerDefaultOptions
    );
  }
  return circuitBreaker;
}

// `@sap/xssec` uses/checks `null` in general without considering `undefined`.
interface SubdomainAndZoneId {
  subdomain: string | null;
  zoneId: string | null;
}

/**
 * Get subdomain and zoneId value from a given JWT.
 * @param jwt - A JWT from the current user.
 * @returns subdomain and zoneId from the JWT
 * @hidden
 */
export function getSubdomainAndZoneId(jwt?: string): SubdomainAndZoneId {
  let subdomain: string | null = null;
  let zoneId: string | null = null;
  if (!jwt) {
    return { subdomain, zoneId };
  }

  const decodedJwt = decodeJwt(jwt);
  if (decodedJwt.iss) {
    subdomain = parseSubdomain(decodedJwt.iss);
  }
  zoneId = decodedJwt.zid || zoneId;
  return { subdomain, zoneId };
}

export interface RequestUserTokenParam {
  userJwt: string;
  serviceCredentials: ServiceCredentials;
  subdomainAndZoneId: SubdomainAndZoneId;
}

/**
 * Make a user token request against the XSUAA service
 * @param param - The parameters for make the request.
 * @param options - Options to influence resilience behavior (see [[ResilienceOptions]]). By default, usage of a circuit breaker is enabled.
 * @returns User token.
 * @hidden
 */
export function requestUserToken(
  param: RequestUserTokenParam,
  options: ResilienceOptions = { enableCircuitBreaker: true }
): Promise<string> {
  if (options.enableCircuitBreaker) {
    return getCircuitBreaker().fire(param);
  }

  return new Promise((resolve: (token: string) => void, reject) => {
    xssec.requests.requestUserToken(
      param.userJwt,
      param.serviceCredentials,
      null,
      null,
      param.subdomainAndZoneId.subdomain,
      param.subdomainAndZoneId.zoneId,
      (err: Error, token: string) => (err ? reject(err) : resolve(token))
    );
  });
}
