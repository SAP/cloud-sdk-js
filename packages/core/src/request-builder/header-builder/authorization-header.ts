/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { createLogger, errorWithCause, MapType } from '@sap-cloud-sdk/util';
import { assoc, filter, head, identity, ifElse, isEmpty, isNil, map, path } from 'rambda';
import { Destination, DestinationAuthToken, getOAuth2ClientCredentialsToken } from '../../scp-cf';
import { ODataRequest, ODataRequestConfig } from '../request';

const logger = createLogger({
  package: 'core',
  messageContext: 'authorization-header'
});

/**
 * Adds authorization headers for a given ODataRequest to existing headers.
 *
 * @param request - an ODataRequest.
 * @param headers - The headers that should be added to.
 * @returns The provided headers with the new authorization headers.
 */
export function addAuthorizationHeader<RequestT extends ODataRequestConfig>(
  request: ODataRequest<RequestT>,
  headers: MapType<string>
): Promise<MapType<string>> {
  if (authorizationHeaderFromCustomHeaders(request)) {
    return Promise.resolve(assocAuthHeader(headers)(authorizationHeaderFromCustomHeaders(request)!));
  }
  if (request.needsAuthentication()) {
    if (!request.destination) {
      throw Error('The request destination is undefined.');
    }
    return buildAndAddAuthorizationHeader(request.destination)(headers);
  }
  return Promise.resolve(headers);
}

/**
 * Adds authorization headers for a given destination to existing headers.
 *
 * @param destination - A destination.
 * @param headers - The headers that should be added to.
 * @returns The provided headers with the new authorization headers.
 */
export const buildAndAddAuthorizationHeader = (destination: Destination) => (headers: MapType<any>): Promise<MapType<string>> => {
  if (destination.authentication === 'NoAuthentication' || destination.authentication === 'ClientCertificateAuthentication') {
    return Promise.resolve(headers);
  } else if (!destination.authentication) {
    logger.warn('No authentication type is specified on the destination! Assuming "NoAuthentication".');
    return Promise.resolve(headers);
  }
  return buildAuthHeader(destination).then(assocAuthHeader(headers));
};

const authorizationHeaderFromCustomHeaders = <T extends ODataRequestConfig>(request: ODataRequest<T>): string | undefined =>
  path(['config', 'customHeaders', 'authorization'], request) || path(['config', 'customHeaders', 'Authorization'], request);

const assocAuthHeader = (headers: MapType<any>) => (authHeader: string) => assoc('authorization', authHeader)(headers);

const buildAuthHeader = (destination: Destination): Promise<string> => {
  switch (destination.authentication) {
    case 'OAuth2SAMLBearerAssertion':
      if (!destination.authTokens) {
        throw new Error('The auth token is null.');
      }
      return Promise.resolve(headerFromTokens(destination.authTokens));
    case 'OAuth2ClientCredentials':
      return headerFromOAuth2ClientCredentialsDestination(destination);
    case 'BasicAuthentication':
      return Promise.resolve(headerFromBasicAuthDestination(destination));
    default:
      throw new Error(
        'Failed to build authorization header for the given destination. Make sure to either correctly configure your destination for principal propagation, provide both a username and a password or select "NoAuthentication" in your destination configuration.'
      );
  }
};

const throwAllTokensErrored = (authTokens: DestinationAuthToken[]) => {
  throw new Error(
    [
      'The destination tried to provide authorization tokens but errored in all cases. This is most likely due to misconfiguration.',
      'Original error messages:',
      ...map(token => token.error, authTokens)
    ].join('\n')
  );
};

const headerFromOAuth2ClientCredentialsDestination = (destination: Destination): Promise<string> =>
  getOAuth2ClientCredentialsToken(destination)
    .then(resp => `Bearer ${resp.access_token}`)
    .catch(error => Promise.reject(errorWithCause('Request for "OAuth2ClientCredentials" authentication access token failed or denied.', error)));

const headerFromAuthToken = (token: DestinationAuthToken) => `${token.type} ${token.value}`;

// using pipe led to wrong type errors
const headerFromTokens = (authTokens: DestinationAuthToken[]): string => {
  const usableTokens = filter((token: DestinationAuthToken) => !token.error, authTokens);

  if (authTokens === null) {
    throw new Error('AuthenticationType is "OAuth2SAMLBearerAssertion", but no AuthTokens could be fetched from the destination service!');
  }
  if (isEmpty(usableTokens)) {
    throwAllTokensErrored(authTokens);
  }

  ifElse(isEmpty, throwAllTokensErrored, identity)(usableTokens);

  const usableToken = head(usableTokens);
  if (!usableToken) {
    throw new Error(`No usable tokens are found in the ${usableTokens}`);
  }
  return headerFromAuthToken(usableToken!);
};

const headerFromBasicAuthDestination = (destination: Destination) => {
  if (isNil(destination.username) || isNil(destination.password)) {
    throw new Error('AuthenticationType is "BasicAuthentication", but "username" and/or "password" are missing!');
  }

  return basicHeader(destination.username, destination.password);
};

export function basicHeader(username: string, password: string): string {
  return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
}
