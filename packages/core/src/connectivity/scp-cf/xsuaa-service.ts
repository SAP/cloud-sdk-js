import {
  createLogger,
  encodeBase64,
  ErrorWithCause,
  renameKeys
} from '@sap-cloud-sdk/util';
import axios, { AxiosRequestConfig } from 'axios';
import CircuitBreaker from 'opossum';
import {
  executeHttpRequest,
  HttpRequestConfig,
  HttpRequestOptions,
  HttpResponse
} from '../../http-client';
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
import { Destination, DestinationNameAndJwt } from './destination';
import {
  addProxyConfigurationInternet,
  ProxyStrategy,
  proxyStrategy
} from './proxy-util';

const logger = createLogger({
  package: 'core',
  messageContext: 'xsuaa-service'
});

type XsuaaCircuitBreaker = CircuitBreaker<
  [
    destination: Destination | DestinationNameAndJwt,
    requestConfig: HttpRequestConfig,
    options?: HttpRequestOptions | undefined
  ],
  HttpResponse
>;

let circuitBreaker: XsuaaCircuitBreaker;

/**
 * Executes a client credentials grant request.
 * If the first parameter is an instance of [[XsuaaServiceCredentials]], the response's access_token will be verified.
 * If the first parameter is a URI, the response will not be verified.
 *
 * @param tokenServiceUrlOrXsuaaServiceCredentials - The URL of the token service or the credentials of a XSUAA service instance.
 * @param clientCredentials - Client credentials for which to request a token.
 * @param options - Options to use by retrieving access token.
 * @param customBody - Object containing value required for the body request.
 * @returns A promise resolving to the response.
 */
export async function clientCredentialsGrant(
  tokenServiceUrlOrXsuaaServiceCredentials: string | XsuaaServiceCredentials,
  clientCredentials: ClientCredentials,
  options?: ResilienceOptions,
  customBody: Record<string, any> = {}
): Promise<ClientCredentialsResponse> {
  const authHeader = headerForClientCredentials(clientCredentials);
  const body = { grant_type: GrantType.CLIENT_CREDENTIALS, ...customBody };

  try {
    const { data } = await post(
      tokenServiceUrlOrXsuaaServiceCredentials,
      authHeader,
      objectToXWwwUrlEncodedBodyString(body),
      options
    );
    return data;
  } catch (error) {
    throw accessTokenError(error, GrantType.CLIENT_CREDENTIALS);
  }
}

/**
 * @deprecated Since v1.41.0 Use [[jwtBearerTokenGrant]] instead.
 * Executes a user token grant request against the given URI.
 *
 * @param tokenServiceUrlOrXsuaaServiceCredentials - The URL of the token service or the credentials of a XSUAA service instance.
 * @param userJwt - The JWT of the user on whose behalf the request is executed.
 * @param clientId - The client_id of the target XSUAA service instance.
 * @param options - Options to use by retrieving access token
 * @returns A promise resolving to the response of the XSUAA service.
 */
export async function userTokenGrant(
  tokenServiceUrlOrXsuaaServiceCredentials: string | XsuaaServiceCredentials,
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

  try {
    const { data } = await post(
      tokenServiceUrlOrXsuaaServiceCredentials,
      authHeader,
      body,
      options
    );
    return data;
  } catch (error) {
    throw accessTokenError(error, GrantType.USER_TOKEN);
  }
}

/**
 * @deprecated Since v1.41.0 Use [[jwtBearerTokenGrant]] instead.
 * Executes a refresh token grant request against the given URI.
 * If the first parameter is an instance of [[XsuaaServiceCredentials]], the response's access_token will be verified.
 * If the first parameter is an URI, the response will not be verified.
 *
 * @param tokenServiceUrlOrXsuaaServiceCredentials - The URL of the token service or the credentials of a XSUAA service instance.
 * @param clientCredentials - The credentials (client_id, client_secret) of the target XSUAA service instance.
 * @param refreshToken - The refresh token that should be used to generate a new access token.
 * @param options - Options to use by retrieving access token.
 * @returns A promise resolving to the response of the XSUAA service.
 */
export async function refreshTokenGrant(
  tokenServiceUrlOrXsuaaServiceCredentials: string | XsuaaServiceCredentials,
  clientCredentials: ClientCredentials,
  refreshToken: string,
  options?: ResilienceOptions
): Promise<UserTokenResponse> {
  const authHeader = headerForClientCredentials(clientCredentials);
  const body = objectToXWwwUrlEncodedBodyString({
    grant_type: GrantType.REFRESH_TOKEN,
    refresh_token: refreshToken
  });

  try {
    const { data } = await post(
      tokenServiceUrlOrXsuaaServiceCredentials,
      authHeader,
      body,
      options
    );
    return data;
  } catch (error) {
    throw accessTokenError(error, GrantType.REFRESH_TOKEN);
  }
}

/**
 * Executes a JWT bearer token grant request against the given URI.
 *
 * @param tokenServiceUrlOrXsuaaServiceCredentials - The URL of the token service or the credentials of a XSUAA service instance.
 * @param clientCredentials - The credentials (client_id, client_secret) of the target XSUAA service instance.
 * @param userJwt - The JWT of the user on whose behalf the request is executed.
 * @param options - Options to use by retrieving access token.
 * @returns A promise resolving to the response of the XSUAA service.
 */
export async function jwtBearerTokenGrant(
  tokenServiceUrlOrXsuaaServiceCredentials: string | XsuaaServiceCredentials,
  clientCredentials: ClientCredentials,
  userJwt: string,
  options?: ResilienceOptions
): Promise<ClientCredentialsResponse> {
  const authHeader = headerForClientCredentials(clientCredentials);
  const body = objectToXWwwUrlEncodedBodyString({
    client_id: clientCredentials.username,
    assertion: userJwt,
    grant_type: GrantType.JWT_BEARER_TOKEN,
    response_type: 'token'
  });

  try {
    const { data } = await post(
      tokenServiceUrlOrXsuaaServiceCredentials,
      authHeader,
      body,
      options
    );
    return data;
  } catch (error) {
    throw accessTokenError(error, GrantType.JWT_BEARER_TOKEN);
  }
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
  tokenServiceUrlOrXsuaaServiceCredentials: string | XsuaaServiceCredentials,
  authHeader: string,
  body: string,
  options: ResilienceOptions = { enableCircuitBreaker: true }
): Promise<HttpResponse> {
  const config = wrapXsuaaPostRequestHeader(authHeader, body);
  const targetUri =
    typeof tokenServiceUrlOrXsuaaServiceCredentials === 'string'
      ? tokenServiceUrlOrXsuaaServiceCredentials
      : getTokenServiceUrl(tokenServiceUrlOrXsuaaServiceCredentials);

  let destination: Destination = { url: targetUri, proxyType: 'Internet' };
  if (proxyStrategy(destination) === ProxyStrategy.INTERNET_PROXY) {
    destination = addProxyConfigurationInternet(destination);
  }

  if (options.enableCircuitBreaker) {
    return getCircuitBreaker().fire(destination, config);
  }

  return executeHttpRequest(destination, config);
}

function wrapXsuaaPostRequestHeader(
  authHeader: string,
  body: string
): HttpRequestConfig {
  return {
    method: 'post',
    data: body,
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
  CLIENT_CREDENTIALS = 'client_credentials',
  JWT_BEARER_TOKEN = 'urn:ietf:params:oauth:grant-type:jwt-bearer'
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

function getCircuitBreaker(): XsuaaCircuitBreaker {
  if (!circuitBreaker) {
    circuitBreaker = new CircuitBreaker(
      executeHttpRequest,
      circuitBreakerDefaultOptions
    );
  }
  return circuitBreaker;
}

const grantTypeMapper = {
  [GrantType.USER_TOKEN]: 'User token',
  [GrantType.REFRESH_TOKEN]: 'Refresh token',
  [GrantType.CLIENT_CREDENTIALS]: 'Client credentials',
  [GrantType.JWT_BEARER_TOKEN]: 'JWT token'
};
