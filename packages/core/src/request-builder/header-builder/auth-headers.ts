/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  MapType,
  errorWithCause,
  createLogger,
  isNullish
} from '@sap-cloud-sdk/util';
import {
  DestinationAuthToken,
  Destination,
  getOAuth2ClientCredentialsToken
} from '../../scp-cf';
import { toSanitizedHeaderObject } from './headers-util';

const logger = createLogger({
  package: 'core',
  messageContext: 'auth-headers'
});

function toAuthorizationHeader(authorization: string): MapType<string> {
  return toSanitizedHeaderObject('authorization', authorization);
}

function headerFromTokens(
  authTokens?: DestinationAuthToken[] | null
): MapType<string> {
  if (!authTokens || !authTokens.length) {
    throw Error(
      'AuthenticationType is "OAuth2SAMLBearerAssertion", but no AuthTokens could be fetched from the destination service!'
    );
  }

  const usableTokens = authTokens.filter(
    (token: DestinationAuthToken) => !token.error
  );

  if (!usableTokens.length) {
    throw Error(
      [
        'The destination tried to provide authorization tokens but failed in all cases. This is most likely due to misconfiguration.',
        'Original error messages:',
        ...authTokens.map(token => token.error)
      ].join('\n')
    );
  }
  const authToken = usableTokens[0];
  return toAuthorizationHeader(`${authToken.type} ${authToken.value}`);
}

async function headerFromOAuth2ClientCredentialsDestination(
  destination: Destination
): Promise<MapType<string>> {
  const response = await getOAuth2ClientCredentialsToken(destination).catch(
    error => {
      throw errorWithCause(
        'Request for "OAuth2ClientCredentials" authentication access token failed or denied.',
        error
      );
    }
  );
  return toAuthorizationHeader(`Bearer ${response.access_token}`);
}

function headerFromBasicAuthDestination(
  destination: Destination
): MapType<string> {
  if (isNullish(destination.username) || isNullish(destination.password)) {
    throw Error(
      'AuthenticationType is "BasicAuthentication", but "username" and / or "password" are missing!'
    );
  }

  return toAuthorizationHeader(
    basicHeader(destination.username, destination.password)
  );
}

export function basicHeader(username: string, password: string): string {
  return `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
}

function headerForPrincipalPropagation(destination: Destination): MapType<any> {
  const principalPropagationHeader =
    destination?.proxyConfiguration?.headers?.[
      'SAP-Connectivity-Authentication'
    ];
  if (!principalPropagationHeader) {
    throw Error(
      'Principal propagation was selected in destination, but no SAP-Connectivity-Authentication bearer header was added by connectivity service.'
    );
  }
  return {
    'SAP-Connectivity-Authentication': principalPropagationHeader
  };
}

function headerForProxy(destination: Destination): MapType<any> {
  const proxyAuthHeader =
    destination?.proxyConfiguration?.headers?.['Proxy-Authorization'];

  return proxyAuthHeader ? { 'Proxy-Authorization': proxyAuthHeader } : {};
}

// TODO the proxy header are for OnPrem auth and are now handled correctly and should be removed here
// However this would be a breaking change, since we recommended to use 'NoAuthentication' to achieve principal propagation as a workaround.
// Remove this in v2
function legacyNoAuthOnPremiseProxy(destination: Destination): MapType<any> {
  logger.warn(
    `You are using \'NoAuthentication\' in destination: ${destination.name} which is an OnPremise destination. This is a deprecated configuration, most likely you wanted to set-up \'PrincipalPropagation\' so please change the destination property to the desired authentication scheme.`
  );

  let principalPropagationHeader;
  try {
    principalPropagationHeader = headerForPrincipalPropagation(destination);
  } catch (e) {
    logger.warn('No principal propagation header found.');
  }

  return {
    ...headerForProxy(destination),
    ...principalPropagationHeader
  };
}

function getProxyRelatedAuthHeaders(destination: Destination): MapType<any> {
  if (
    destination.proxyType === 'OnPremise' &&
    destination.authentication === 'NoAuthentication'
  ) {
    return legacyNoAuthOnPremiseProxy(destination);
  }

  // The connectivity service will raise an exception if it can not obtain the 'Proxy-Authorization' and the destination lookup will fail early
  return headerForProxy(destination);
}

async function getAuthenticationRelatedHeaders(
  destination: Destination
): Promise<MapType<string>> {
  switch (destination.authentication) {
    case null:
    case undefined:
      logger.warn(
        'No authentication type is specified on the destination! Assuming "NoAuthentication".'
      );
      return {};
    case 'NoAuthentication':
    case 'ClientCertificateAuthentication':
      return {};
    case 'OAuth2SAMLBearerAssertion':
      return headerFromTokens(destination.authTokens);
    case 'OAuth2ClientCredentials':
      return headerFromOAuth2ClientCredentialsDestination(destination);
    case 'BasicAuthentication':
      return headerFromBasicAuthDestination(destination);
    case 'PrincipalPropagation':
      return headerForPrincipalPropagation(destination);
    default:
      throw Error(
        'Failed to build authorization header for the given destination. Make sure to either correctly configure your destination for principal propagation, provide both a username and a password or select "NoAuthentication" in your destination configuration.'
      );
  }
}

export async function buildAuthorizationHeaders(
  destination: Destination
): Promise<MapType<string>> {
  return {
    ...(await getAuthenticationRelatedHeaders(destination)),
    ...getProxyRelatedAuthHeaders(destination)
  };
}
