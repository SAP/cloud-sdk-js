import * as xssec from '@sap/xssec';
import CircuitBreaker from 'opossum';
import { executeWithMiddleWare } from '../resilience/resilience';
import { JwtPayload } from './jsonwebtoken-type';
import { parseSubdomain } from './subdomain-replacer';
import { decodeJwt } from './jwt';
import {Service, ServiceCredentials} from './environment-accessor-types';
import {
  circuitBreakerDefaultOptions,
  defaultResilienceBTPServices,
  ResilienceOptions,
  timeoutPromise
} from './resilience-options';
import { ClientCredentialsResponse } from './xsuaa-service-types';
import { resolveService } from './environment-accessor';

let circuitBreaker: any;

async function wrapInTimeout<T>(
  promise: Promise<T>,
  timeout: number
): Promise<T> {
  return Promise.race([promise, timeoutPromise<T>(timeout)]);
}

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
 * Wrap a function in a circuit breaker. Important if you trigger this recursively you have to adjust the parameters to avoid an infinite stack.
 * @param fn - Function to wrap.
 * @returns A function to be called with the original parameters.
 */
function wrapInCircuitBreaker<T extends (...args: any[]) => any>(
  fn: T
): (...parameters: Parameters<T>) => ReturnType<T> {
  return (...parameters: Parameters<T>) =>
    getCircuitBreaker().fire(fn, ...parameters);
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
 * @param options - Options to influence resilience behavior (see {@link ResilienceOptions}). By default, usage of a circuit breaker is enabled.
 * @returns Client credentials token.
 */
export async function getClientCredentialsToken(
  service: string | Service,
  userJwt?: string | JwtPayload,
  options?: ResilienceOptions
): Promise<ClientCredentialsResponse> {
  // const { enableCircuitBreaker, timeout } = {
  //   ...defaultResilienceBTPServices,
  //   ...options
  // };
  // if (enableCircuitBreaker) {
  //   return wrapInCircuitBreaker(getClientCredentialsToken)(service, userJwt, {
  //     enableCircuitBreaker: false,
  //     timeout
  //   });
  // }


  const xssecPromise= <ClientCredentialsResponse>(creds:ServiceCredentials,subAndZone:SubdomainAndZoneId): Promise<ClientCredentialsResponse> => new Promise(
    (resolve, reject) => {
      xssec.requests.requestClientCredentialsToken(
        subAndZone.subdomain,
        creds,
        null,
          subAndZone.zoneId,
        (err: Error, token: string, tokenResponse: ClientCredentialsResponse) =>
          err ? reject(err) : resolve(tokenResponse)
      );
    });

  const serviceCredentials = resolveService(service).credentials;
  const subdomainAndZoneId = getSubdomainAndZoneId(userJwt);

  const wrapped = await executeWithMiddleWare<ClientCredentialsResponse>(xssecPromise,[serviceCredentials,subdomainAndZoneId],options?.middleWare,{ ...options?.middleWareContext,category:'xsuaa',jwt:userJwt });
  return wrapped;
  // return wrapInTimeout(xssecPromise, timeout);
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
  options?: ResilienceOptions
): Promise<string> {
  const { enableCircuitBreaker, timeout } = {
    ...defaultResilienceBTPServices,
    ...options
  };
  if (enableCircuitBreaker) {
    return wrapInCircuitBreaker(getUserToken)(service, userJwt, {
      enableCircuitBreaker: false,
      timeout
    });
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
  return wrapInTimeout(xssecPromise, timeout);
}
