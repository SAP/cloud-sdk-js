import {
  createLogger,
  encodeBase64,
  ErrorWithCause,
  renameKeys
} from '@sap-cloud-sdk/util';
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios';
import { XsuaaServiceCredentials } from './environment-accessor-types';
import {
  circuitBreakerDefaultOptions,
  ResilienceOptions
} from './resilience-options';
import {
  ClientCredentials,
  ClientCredentialsResponse,
  TokenKey,
  UserTokenResponse
} from './xsuaa-service-types';

// For some reason, the equivalent import statement does not work
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const CircuitBreaker = require('opossum');

const logger = createLogger({
  package: 'core',
  messageContext: 'xsuaa-service'
});

/**
 * Executes a client credentials grant request.
 * If the first parameter is an instance of [[XsuaaServiceCredentials]], the response's access_token will be verified.
 * If the first parameter is an URI, the response will not be verified.
 *
 * @param tokenServiceUrlOrXsuaaServiceCerednetials - The URL of the token service or the credentials of a XSUAA service instance.
 * @param clientCredentials - Client credentials for which to request a token
 * @param options - Options to use by retrieving access token
 * @param customBody - Object containing value required for the body request
 * @returns A promise resolving to the response
 */
export function clientCredentialsGrant(
  tokenServiceUrlOrXsuaaServiceCerednetials: string | XsuaaServiceCredentials,
  clientCredentials: ClientCredentials,
  options?: ResilienceOptions,
  customBody: Record<string, any> = {}
): Promise<ClientCredentialsResponse> {
  const authHeader = headerForClientCredentials(clientCredentials);
  const body = { grant_type: GrantType.CLIENT_CREDENTIALS, ...customBody };

  return post(
    tokenServiceUrlOrXsuaaServiceCerednetials,
    authHeader,
    objectToXWwwUrlEncodedBodyString(body),
    options
  )
    .then(resp => resp.data as ClientCredentialsResponse)
    .catch(error =>
      Promise.reject(accessTokenError(error, GrantType.CLIENT_CREDENTIALS))
    );
}

/**
 * Executes a user token grant request against the given URI.
 *
 * @param tokenServiceUrlOrXsuaaServiceCerednetials - The URL of the token service or the credentials of a XSUAA service instance.
 * @param userJwt - The JWT of the user on whose behalf the request is executed.
 * @param clientId - The client_id of the target XSUAA service instance.
 * @param options - Options to use by retrieving access token
 * @returns A promise resolving to the response of the XSUAA service.
 */
export function userTokenGrant(
  tokenServiceUrlOrXsuaaServiceCerednetials: string | XsuaaServiceCredentials,
  userJwt: string,
  clientId: string,
  options?: ResilienceOptions
): Promise<UserTokenResponse> {
  const authHeader = 'Bearer ' + userJwt;
  const body = objectToXWwwUrlEncodedBodyString({
    client_id: clientId,
    grant_type: GrantType.USER_TOKEN,
    response_type: 'token'
  });

  return post(
    tokenServiceUrlOrXsuaaServiceCerednetials,
    authHeader,
    body,
    options
  )
    .then(resp => resp.data as UserTokenResponse)
    .catch(error =>
      Promise.reject(accessTokenError(error, GrantType.USER_TOKEN))
    );
}

/**
 * Executes a refresh token grant request against the given URI.
 * If the first parameter is an instance of [[XsuaaServiceCredentials]], the response's access_token will be verified.
 * If the first parameter is an URI, the response will not be verified.
 *
 * @param tokenServiceUrlOrXsuaaServiceCerednetials - The URL of the token service or the credentials of a XSUAA service instance.
 * @param clientCredentials - The credentials (client_id, client_secret) if the target XSUAA service instance.
 * @param refreshToken - The refresh token that should be used to generate a new access token.
 * @param options - Options to use by retrieving access token.
 * @returns A promise resolving to the response of the XSUAA service.
 */
export function refreshTokenGrant(
  tokenServiceUrlOrXsuaaServiceCerednetials: string | XsuaaServiceCredentials,
  clientCredentials: ClientCredentials,
  refreshToken: string,
  options?: ResilienceOptions
): Promise<UserTokenResponse> {
  const authHeader = headerForClientCredentials(clientCredentials);
  const body = objectToXWwwUrlEncodedBodyString({
    grant_type: GrantType.REFRESH_TOKEN,
    refresh_token: refreshToken
  });

  return post(
    tokenServiceUrlOrXsuaaServiceCerednetials,
    authHeader,
    body,
    options
  )
    .then(resp => resp.data as UserTokenResponse)
    .catch(error =>
      Promise.reject(accessTokenError(error, GrantType.REFRESH_TOKEN))
    );
}

/**
 * Fetches verification keys from the XSUAA service for the given credentials.
 *
 * @param xsuaaCredentials - Credentials of the XSUAA service instance.
 * @param jku - Value of the jku property in the JWT header. If not provided the old legacy URL xsuaaCredentials.url/token_keys is used as a fallback which will not work for subscriber accounts created after 14th of April 2020.
 * @returns An array of TokenKeys.
 */
export function fetchVerificationKeys(
  xsuaaCredentials: XsuaaServiceCredentials,
  jku?: string
): Promise<TokenKey[]>;

/**
 * Fetches verification keys from the XSUAA service for the given URL, with the given pair of credentials.
 *
 * @param url - URL of the XSUAA service instance.
 * @param clientId - Client ID of the XSUAA service instance.
 * @param clientSecret - Client secret of the XSUAA service instance.
 * @returns An array of TokenKeys.
 */
export function fetchVerificationKeys(
  url: string,
  clientId: string,
  clientSecret: string
): Promise<TokenKey[]>;

export function fetchVerificationKeys(
  xsuaaUriOrCredentials: string | XsuaaServiceCredentials,
  clientIdOrJku?: string,
  clientSecret?: string
): Promise<TokenKey[]> {
  // The case where the XsuaaServiceCredentials are given as object
  if (typeof xsuaaUriOrCredentials !== 'string') {
    if (!clientIdOrJku) {
      logger.warn(
        'JKU field from the JWT not provided. Use xsuaaClient.url/token_keys as fallback. ' +
          'This will not work for subscriber accounts created after 14th of April 2020.' +
          'Please provide the right URL given by the field JKU present in the JWT header.'
      );
    }
    return fetchVerificationKeys(
      clientIdOrJku || `${xsuaaUriOrCredentials.url}/token_keys`,
      xsuaaUriOrCredentials.clientid,
      xsuaaUriOrCredentials.clientsecret
    );
  }
  // The three strings case
  const config: AxiosRequestConfig = {
    url: xsuaaUriOrCredentials,
    method: 'GET'
  };
  if (clientIdOrJku && clientSecret) {
    const authHeader = headerForClientCredentials({
      username: clientIdOrJku,
      password: clientSecret
    });
    config.headers = { Authorization: authHeader };
  }

  return axios
    .request(config)
    .then(resp => resp.data.keys.map(k => renameKeys(tokenKeyKeyMapping, k)))
    .catch(error => {
      throw new ErrorWithCause(
        `Failed to fetch verification keys from XSUAA service instance ${xsuaaUriOrCredentials}!`,
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

function post(
  tokenServiceUrlOrXsuaaServiceCerednetials: string | XsuaaServiceCredentials,
  authHeader: string,
  body: string,
  options: ResilienceOptions = { enableCircuitBreaker: true }
): AxiosPromise {
  const config = wrapXsuaaPostRequestHeader(authHeader);
  const targetUri =
    typeof tokenServiceUrlOrXsuaaServiceCerednetials === 'string'
      ? tokenServiceUrlOrXsuaaServiceCerednetials
      : getTokenServiceUrl(tokenServiceUrlOrXsuaaServiceCerednetials);

  if (
    options.enableCircuitBreaker ||
    options.enableCircuitBreaker === undefined
  ) {
    const xsuaaCircuitBreaker = getInstanceCircuitBreaker();

    if (!xsuaaCircuitBreaker) {
      throw new Error('The xsuaa circuit breaker is undefined.');
    }

    return xsuaaCircuitBreaker!.fire(targetUri, body, config);
  }
  return axios.post(targetUri, body, config);
}

function wrapXsuaaPostRequestHeader(authHeader: string): AxiosRequestConfig {
  return {
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
      Accept: 'application/json'
    }
  };
}

export function headerForClientCredentials(
  clientCredentials: ClientCredentials
): string {
  return (
    'Basic ' +
    encodeBase64(`${clientCredentials.username}:${clientCredentials.password}`)
  );
}
function objectToXWwwUrlEncodedBodyString(
  bodyAsObject: Record<string, any>
): string {
  return Object.entries(bodyAsObject)
    .map(kv => kv.join('='))
    .join('&');
}

enum GrantType {
  USER_TOKEN = 'user_token',
  REFRESH_TOKEN = 'refresh_token',
  CLIENT_CREDENTIALS = 'client_credentials'
}

function getTokenServiceUrl(
  xsuaaServiceCredentials: XsuaaServiceCredentials
): string {
  const xsuaaUri = xsuaaServiceCredentials.url.replace(/\/$/, '');
  logger.info(
    `Adding "/oauth/token" to the end of the target uri: ${xsuaaUri}.`
  );
  return `${xsuaaUri}/oauth/token`;
}

function accessTokenError(error: Error, grant: string): Error {
  return new ErrorWithCause(
    `FetchTokenError: ${grantTypeMapper[grant]} Grant failed! ${error.message}`,
    error
  );
}

function getInstanceCircuitBreaker(breaker?: any | undefined): any {
  return typeof breaker === 'undefined'
    ? new CircuitBreaker(axios.post, circuitBreakerDefaultOptions)
    : breaker;
}

const grantTypeMapper = {
  user_token: 'User token',
  refresh_token: 'Refresh token',
  client_credentials: 'Client credentials'
};
