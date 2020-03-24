/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { errorWithCause, MapType, renameKeys } from '@sap-cloud-sdk/util';
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

/**
 * Executes a client credentials grant request.
 * If the first parameter is an instance of [[XsuaaServiceCredentials]], the response's access_token will be verified.
 * If the first parameter is an URI, the response will not be verified.
 *
 * @param xsuaaUriOrCredentials - The URI or the credentials of a XSUAA service instance.
 * @param clientCredentials - Client credentials for which to request a token
 * @param options - Options to use by retrieving access token
 * @param customBody - Object containing value required for the body request
 * @returns A promise resolving to the response
 */
export function clientCredentialsGrant(
  xsuaaUriOrCredentials: string | XsuaaServiceCredentials,
  clientCredentials: ClientCredentials,
  options?: ResilienceOptions,
  customBody: MapType<any> = {}
): Promise<ClientCredentialsResponse> {
  const authHeader = headerForClientCredentials(clientCredentials);
  const body = { grant_type: GrantType.CLIENT_CREDENTIALS, ...customBody };

  return executeXsuaaPostRequest(
    xsuaaUriOrCredentials,
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
 * @param xsuaaUri - The URI of the target XSUAA service instance.
 * @param userJwt - The JWT of the user on whose behalf the request is executed.
 * @param clientId - The client_id of the target XSUAA service instance.
 * @param options - Options to use by retrieving access token
 * @returns A promise resolving to the response of the XSUAA service.
 */
export function userTokenGrant(
  xsuaaUri: string,
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

  return executeXsuaaPostRequest(
    getTargetUri(xsuaaUri),
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
 * @param xsuaaUriOrCredentials - The URI or the credentials of a XSUAA service instance.
 * @param clientCredentials - The credentials (client_id, client_secret) if the target XSUAA service instance.
 * @param refreshToken - The refresh token that should be used to generate a new access token.
 * @param options - Options to use by retrieving access token.
 * @returns A promise resolving to the response of the XSUAA service.
 */
export function refreshTokenGrant(
  xsuaaUriOrCredentials: string | XsuaaServiceCredentials,
  clientCredentials: ClientCredentials,
  refreshToken: string,
  options?: ResilienceOptions
): Promise<UserTokenResponse> {
  const authHeader = headerForClientCredentials(clientCredentials);
  const body = objectToXWwwUrlEncodedBodyString({
    grant_type: GrantType.REFRESH_TOKEN,
    refresh_token: refreshToken
  });

  return executeXsuaaPostRequest(
    xsuaaUriOrCredentials,
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
 * @returns An array of TokenKeys.
 */
export function fetchVerificationKeys(
  xsuaaCredentials: XsuaaServiceCredentials
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
  clientId?: string,
  clientSecret?: string
): Promise<TokenKey[]> {
  if (typeof xsuaaUriOrCredentials !== 'string') {
    return fetchVerificationKeys(
      xsuaaUriOrCredentials.url,
      xsuaaUriOrCredentials.clientid,
      xsuaaUriOrCredentials.clientsecret
    );
  }

  const url = `${xsuaaUriOrCredentials}/token_keys`;
  const config: AxiosRequestConfig = { url, method: 'GET' };
  if (clientId && clientSecret) {
    const authHeader = headerForClientCredentials({
      username: clientId,
      password: clientSecret
    });
    config.headers = { Authorization: authHeader };
  }

  return axios
    .request(config)
    .then(resp => resp.data.keys.map(k => renameKeys(tokenKeyKeyMapping, k)))
    .catch(error =>
      Promise.reject(
        errorWithCause(
          `Failed to fetch verification keys from XSUAA service instance ${xsuaaUriOrCredentials}!`,
          error
        )
      )
    );
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

function executeXsuaaPostRequest(
  uriOrCredentials: string | XsuaaServiceCredentials,
  authHeader: string,
  body: string,
  options: ResilienceOptions = { enableCircuitBreaker: true }
): AxiosPromise {
  if (typeof uriOrCredentials === 'string') {
    return post(uriOrCredentials, authHeader, body, options);
  }
  return post(uriOrCredentials.url, authHeader, body, options);
}

function post(
  uri: string,
  authHeader: string,
  body: string,
  options: ResilienceOptions = { enableCircuitBreaker: true }
): AxiosPromise {
  const config = wrapXsuaaPostRequestHeader(authHeader);
  const targetUri = getTargetUri(uri);

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

function encodeBase64(str: string): string {
  return Buffer.from(str).toString('base64');
}

function objectToXWwwUrlEncodedBodyString(bodyAsObject: object): string {
  return Object.entries(bodyAsObject)
    .map(kv => kv.join('='))
    .join('&');
}

enum GrantType {
  USER_TOKEN = 'user_token',
  REFRESH_TOKEN = 'refresh_token',
  CLIENT_CREDENTIALS = 'client_credentials'
}

function getTargetUri(xsuaaUri: string): string {
  xsuaaUri = xsuaaUri.replace(/\/$/, '');
  return xsuaaUri.endsWith('/oauth/token')
    ? xsuaaUri
    : `${xsuaaUri}/oauth/token`;
}

function accessTokenError(error: Error, grant: string): Error {
  return errorWithCause(
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
