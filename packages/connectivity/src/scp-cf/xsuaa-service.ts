import * as xssec from '@sap/xssec';
import CircuitBreaker from 'opossum';
import { JwtPayload } from 'jsonwebtoken';
import { parseSubdomain } from './subdomain-replacer';
import { decodeJwt } from './jwt';
import { Service } from './environment-accessor-types';
import {
  circuitBreakerDefaultOptions,
  ResilienceOptions
} from './resilience-options';
import { ClientCredentialsResponse } from './xsuaa-service-types';
import { resolveService } from './environment-accessor';

let circuitBreaker: any;

function executeFunction<T extends (...args: any[]) => any>(
  fn: T,
  ...parameters: Parameters<T>
): ReturnType<T> {
  return fn(...parameters);
}

function getCircuitBreaker() {
  if (!circuitBreaker) {
    circuitBreaker = new CircuitBreaker(
      executeFunction,
      circuitBreakerDefaultOptions
    );
  }
  return circuitBreaker;
}

/**
 * Wrap a function in a circuit breaker. IMPORTANT: This assumes that the last parameter of the function is `ResilienceOptions` and you do not pass it to the execution of this function.
 * Example:
 * ```
 * function myFn(param: string, options: ResilienceOptions = { enableCircuitBreaker: true }) {
 * if (options.enableCircuitBreaker) {
 *   return wrapInCircuitBreaker(getClientCredentialsToken)(service, userJwt);
 * }
 * ```
 * @param fn - Function to wrap.
 * @returns A function to be called with the original parameters, by omitting the options parameter.
 */
function wrapInCircuitBreaker<T extends (...args: any[]) => any>(
  fn: T
): (...parameters: Parameters<T>) => ReturnType<T> {
  return (...parameters: Parameters<T>) =>
    getCircuitBreaker().fire(fn, ...parameters, {
      enableCircuitBreaker: false
    });
}

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
 * @param options - Options to influence resilience behavior (see [[ResilienceOptions]]). By default, usage of a circuit breaker is enabled.
 * @returns Client credentials token.
 */
export function getClientCredentialsToken(
  service: string | Service,
  userJwt?: string | JwtPayload,
  options: ResilienceOptions = { enableCircuitBreaker: true }
): Promise<ClientCredentialsResponse> {
  if (options.enableCircuitBreaker) {
    return wrapInCircuitBreaker(getClientCredentialsToken)(service, userJwt);
  }
  const serviceCredentials = resolveService(service).credentials;
  const subdomainAndZoneId = getSubdomainAndZoneId(userJwt);

  return new Promise((resolve, reject) => {
    xssec.requests.requestClientCredentialsToken(
      subdomainAndZoneId.subdomain,
      serviceCredentials,
      null,
      subdomainAndZoneId.zoneId,
      (err: Error, token: string, tokenResponse: ClientCredentialsResponse) =>
        err ? reject(err) : resolve(tokenResponse)
    );
  });
}

/**
 * Make a user token request against the XSUAA service.
 * @param service - Service as it is defined in the environment variable.
 * @param userJwt - User JWT.
 * @param options - Options to influence resilience behavior (see [[ResilienceOptions]]). By default, usage of a circuit breaker is enabled.
 * @returns User token.
 */
export function getUserToken(
  service: Service,
  userJwt: string,
  options: ResilienceOptions = { enableCircuitBreaker: true }
): Promise<string> {
  if (options.enableCircuitBreaker) {
    return wrapInCircuitBreaker(getUserToken)(service, userJwt);
  }
  const subdomainAndZoneId = getSubdomainAndZoneId(userJwt);

  return new Promise((resolve: (token: string) => void, reject) =>
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
}
