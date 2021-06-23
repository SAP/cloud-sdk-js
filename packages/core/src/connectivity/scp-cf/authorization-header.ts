import {
  unixEOL,
  isNullish,
  createLogger,
  pickIgnoreCase,
  toSanitizedObject,
  encodeBase64
} from '@sap-cloud-sdk/util';
import type { ODataRequest, ODataRequestConfig } from '../../odata-common';
import {
  AuthenticationType,
  Destination,
  DestinationAuthToken,
  sanitizeDestination
} from './destination';

const logger = createLogger({
  package: 'core',
  messageContext: 'authorization-header'
});

/**
 * @deprecated Since v1.20.0. Use [[buildAuthorizationHeaders]] instead.
 * Adds authorization headers for a given ODataRequest to existing headers.
 *
 * @param request - an ODataRequest.
 * @param headers - The headers that should be added to.
 * @returns The provided headers with the new authorization headers.
 */
export async function addAuthorizationHeader<
  RequestT extends ODataRequestConfig
>(
  request: ODataRequest<RequestT>,
  headers: Record<string, string>
): Promise<Record<string, string>> {
  const destination = request.destination;
  if (!destination) {
    return headers;
  }
  const authHeaders = await getAuthHeaders(
    destination,
    request.config.customHeaders
  );
  return {
    ...headers,
    ...authHeaders
  };
}

function needsAuthHeaders(destination: Destination): boolean {
  if (!destination.authentication) {
    return false;
  }
  const authTypesWithAuthorizationHeader: AuthenticationType[] = [
    'BasicAuthentication',
    'OAuth2ClientCredentials',
    'OAuth2SAMLBearerAssertion',
    'OAuth2UserTokenExchange',
    'PrincipalPropagation'
  ];
  return authTypesWithAuthorizationHeader.includes(destination.authentication);
}

function getCustomAuthHeaders(
  destination: Destination,
  customHeaders?: Record<string, any>
) {
  if (destination.authentication === 'PrincipalPropagation') {
    return pickIgnoreCase(customHeaders, 'SAP-Connectivity-Authentication');
  }
  return pickIgnoreCase(customHeaders, 'authorization');
}

export async function getAuthHeaders(
  destination: Destination,
  customHeaders?: Record<string, any>
): Promise<Record<string, string>> {
  const customAuthHeaders = getCustomAuthHeaders(destination, customHeaders);

  if (Object.keys(customAuthHeaders).length && needsAuthHeaders(destination)) {
    logger.warn(
      'Found custom authorization headers. The given destination also provides authorization headers. This might be unintended. The custom headers from the request config will be used.'
    );
  }
  return Object.keys(customAuthHeaders).length
    ? customAuthHeaders
    : buildAuthorizationHeaders(destination);
}

/**
 * @deprecated Since v1.20.0. Use [[buildAuthorizationHeaders]] instead.
 * Adds authorization headers for a given destination to existing headers.
 *
 * @param destination - A destination.
 * @param headers - The headers that should be added to.
 * @returns The provided headers with the new authorization headers.
 */
export function buildAndAddAuthorizationHeader(destination: Destination) {
  return async function (
    headers: Record<string, any>
  ): Promise<Record<string, string>> {
    return {
      ...headers,
      ...(await buildAuthorizationHeaders(destination))
    };
  };
}
function toAuthorizationHeader(authorization: string): Record<string, string> {
  return toSanitizedObject('authorization', authorization);
}

function headerFromTokens(
  authenticationType: AuthenticationType,
  authTokens?: DestinationAuthToken[] | null
): Record<string, string> {
  if (!authTokens || !authTokens.length) {
    throw Error(
      `AuthenticationType is ${authenticationType}, but no AuthTokens could be fetched from the destination service!`
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
      ].join(unixEOL)
    );
  }
  const authToken = usableTokens[0];
  return toAuthorizationHeader(authToken.http_header.value);
}

function headerFromBasicAuthDestination(
  destination: Destination
): Record<string, string> {
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
  return 'Basic ' + encodeBase64(`${username}:${password}`);
}

function headerForPrincipalPropagation(
  destination: Destination
): Record<string, any> {
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

function headerForProxy(destination: Destination): Record<string, any> {
  const proxyAuthHeader =
    destination?.proxyConfiguration?.headers?.['Proxy-Authorization'];

  return proxyAuthHeader ? { 'Proxy-Authorization': proxyAuthHeader } : {};
}

// TODO the proxy header are for OnPrem auth and are now handled correctly and should be removed here
// However this would be a breaking change, since we recommended to use 'NoAuthentication' to achieve principal propagation as a workaround.
// Remove this in v2
function legacyNoAuthOnPremiseProxy(
  destination: Destination
): Record<string, any> {
  logger.warn(
    `You are using 'NoAuthentication' in destination: ${destination.name} which is an OnPremise destination. This is a deprecated configuration, most likely you wanted to set-up 'PrincipalPropagation' so please change the destination property to the desired authentication scheme.`
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

function getProxyRelatedAuthHeaders(
  destination: Destination
): Record<string, any> {
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
): Promise<Record<string, string>> {
  logger.debug(
    `Getting authentication related headers for authentication type: ${destination.authentication}`
  );

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
    case 'OAuth2UserTokenExchange':
    case 'OAuth2ClientCredentials':
      return headerFromTokens(
        destination.authentication,
        destination.authTokens
      );
    case 'BasicAuthentication':
      return headerFromBasicAuthDestination(destination);
    case 'PrincipalPropagation':
      return headerForPrincipalPropagation(destination);
    default:
      throw Error(
        `The destination used "${destination.authentication}" as authentication type which is not supported by the SDK.`
      );
  }
}

export async function buildAuthorizationHeaders(
  destination: Destination
): Promise<Record<string, string>> {
  const sanitizedDestination = sanitizeDestination(destination);
  return {
    ...(await getAuthenticationRelatedHeaders(sanitizedDestination)),
    ...getProxyRelatedAuthHeaders(sanitizedDestination)
  };
}
