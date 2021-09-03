import * as xssec from '@sap/xssec';
import CircuitBreaker from 'opossum';
import { JwtPayload } from 'jsonwebtoken';
import { renameKeys, ErrorWithCause, createLogger } from '@sap-cloud-sdk/util';
import axios, { AxiosRequestConfig } from 'axios';
import { parseSubdomain } from './subdomain-replacer';
import { decodeJwt } from './jwt';
import { Service, XsuaaServiceCredentials } from './environment-accessor-types';
import {
  circuitBreakerDefaultOptions,
  ResilienceOptions
} from './resilience-options';
import { ClientCredentialsResponse, TokenKey } from './xsuaa-service-types';
import { resolveService } from '.';

const logger = createLogger({
  package: 'core',
  messageContext: 'xsuaa-service'
});

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
 * @hidden
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
 * @hidden
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
 * @hidden
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

/**
 * Deprecated since v1.49.0. Use `fetchVerificationKeys(url: string)` instead. Credentials are ignored.
 * Fetches verification keys from the XSUAA service for the given credentials.
 * @param xsuaaCredentials - Credentials of the XSUAA service instance.
 * @param jku - Value of the jku property in the JWT header. If not provided the old legacy URL xsuaaCredentials.url/token_keys is used as a fallback which will not work for subscriber accounts created after 14th of April 2020.
 * @returns An array of TokenKeys.
 */
export function fetchVerificationKeys(
  xsuaaCredentials: XsuaaServiceCredentials,
  jku?: string
): Promise<TokenKey[]>;

/**
 * Deprecated since v1.49.0. Use `fetchVerificationKeys(url: string)` instead. Credentials are ignored.
 * Fetches verification keys from the XSUAA service for the given URL, with the given pair of credentials.
 * @param url - URL of the XSUAA service instance.
 * @param clientId - Client ID of the XSUAA service instance.
 * @param clientSecret - Client secret of the XSUAA service instance.
 * @returns An array of token keys.
 */
export function fetchVerificationKeys(
  url: string,
  clientId: string,
  clientSecret: string
): Promise<TokenKey[]>;

/**
 * Fetches verification keys from the XSUAA service for the given URL.
 * @param url - URL of the XSUAA service instance.
 * @returns An array of token keys.
 */
export function fetchVerificationKeys(url: string): Promise<TokenKey[]>;

export function fetchVerificationKeys(
  xsuaaUriOrCredentials: string | XsuaaServiceCredentials,
  clientIdOrJku?: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clientSecret?: string
): Promise<TokenKey[]> {
  // The case where the XsuaaServiceCredentials are given as object
  if (typeof xsuaaUriOrCredentials !== 'string') {
    if (!clientIdOrJku) {
      logger.warn(
        'JKU field from the JWT not provided. Use xsuaaClient.url/token_keys as fallback. ' +
          'This will not work for subscriber accounts created after 14th of April 2020.' +
          'Please provide the right URL given by the field `jku` in the JWT header.'
      );
      return executeFetchVerificationKeys(
        `${xsuaaUriOrCredentials.url}/token_keys`
      );
    }

    return executeFetchVerificationKeys(clientIdOrJku);
  }
  // The three strings case
  return executeFetchVerificationKeys(xsuaaUriOrCredentials);
}

// TODO: in v2 move this implementation to `fetchVerificationKeys`
function executeFetchVerificationKeys(url: string): Promise<TokenKey[]> {
  const config: AxiosRequestConfig = {
    url,
    method: 'GET'
  };

  return axios
    .request(config)
    .then(resp => resp.data.keys.map(k => renameKeys(tokenKeyKeyMapping, k)))
    .catch(error => {
      throw new ErrorWithCause(
        `Failed to fetch verification keys from XSUAA service instance "${url}".`,
        error
      );
    });
}

const tokenKeyKeyMapping: { [key: string]: keyof TokenKey } = {
  kty: 'keyType',
  e: 'publicKeyExponent',
  use: 'use',
  kid: 'keyId',
  alg: 'algorithm',
  value: 'value',
  n: 'publicKeyModulus'
};
