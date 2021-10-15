import {
  unixEOL,
  isNullish,
  createLogger,
  encodeBase64,
  pickValueIgnoreCase
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

function getAuthHeader(
  authenticationType: AuthenticationType | undefined,
  customHeaders?: Record<string, any>
): AuthenticationHeaderOnPrem | AuthenticationHeaderCloud | undefined {
  if (authenticationType === 'PrincipalPropagation') {
    const principalPropagationHeader = pickValueIgnoreCase(
      customHeaders,
      'SAP-Connectivity-Authentication'
    );
    if (principalPropagationHeader) {
      return { 'SAP-Connectivity-Authentication': principalPropagationHeader };
    }
  }
  const authorizationHeader = pickValueIgnoreCase(
    customHeaders,
    'authorization'
  );
  if (authorizationHeader) {
    return { authorization: authorizationHeader };
  }
}

export async function getAuthHeaders(
  destination: Destination,
  customHeaders?: Record<string, any>
): Promise<AuthenticationHeaders> {
  const customAuthHeader = getAuthHeader(
    destination.authentication,
    customHeaders
  );

  return buildAuthorizationHeaders(destination, customAuthHeader);
}

/**
 * @deprecated Since v1.20.0. Use [[buildAuthorizationHeaders]] instead.
 * Adds authorization headers for a given destination to existing headers.
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

function toAuthorizationHeader(
  authorization: string
): AuthenticationHeaderCloud {
  return { authorization };
}

function headerFromTokens(
  authenticationType: AuthenticationType,
  authTokens?: DestinationAuthToken[] | null
): AuthenticationHeaderCloud {
  if (!authTokens || !authTokens.length) {
    throw Error(
      `\`AuthenticationType\` is "${authenticationType}", but no auth tokens could be fetched from the destination service.`
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
): AuthenticationHeaderCloud {
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
): AuthenticationHeaderOnPrem {
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

function headerForProxy(
  destination: Destination
): AuthenticationHeaderProxy | undefined {
  const authHeader =
    destination?.proxyConfiguration?.headers?.['Proxy-Authorization'];
  if (authHeader) {
    return { 'Proxy-Authorization': authHeader };
  }
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
): AuthenticationHeaderProxy | undefined {
  if (
    destination.proxyType === 'OnPremise' &&
    destination.authentication === 'NoAuthentication'
  ) {
    return legacyNoAuthOnPremiseProxy(destination) as any;
  }

  // The connectivity service will raise an exception if it can not obtain the 'Proxy-Authorization' and the destination lookup will fail early
  return headerForProxy(destination);
}

interface AuthenticationHeaderCloud {
  authorization: string;
}
interface AuthenticationHeaderOnPrem {
  'SAP-Connectivity-Authentication': string;
}
interface AuthenticationHeaderProxy {
  'Proxy-Authorization': string;
}
interface AuthenticationHeaders {
  authorization?: string;
  'Proxy-Authorization'?: string;
  'SAP-Connectivity-Authentication'?: string;
}

async function getAuthenticationRelatedHeaders(
  destination: Destination
): Promise<AuthenticationHeaderCloud | AuthenticationHeaderOnPrem | undefined> {
  const destinationAuthHeaders = getAuthHeader(
    destination.authentication,
    destination.headers
  );

  logger.debug(
    `Getting authentication related headers for authentication type: ${destination.authentication}`
  );

  if (destinationAuthHeaders) {
    logger.debug("Authentication header from 'destination.headers' used.");
    return destinationAuthHeaders;
  }

  switch (destination.authentication) {
    case null:
    case undefined:
      logger.warn(
        'No authentication type is specified on the destination! Assuming "NoAuthentication".'
      );
      return;
    case 'NoAuthentication':
    case 'ClientCertificateAuthentication':
      return;
    case 'OAuth2SAMLBearerAssertion':
    case 'OAuth2UserTokenExchange':
    case 'OAuth2JWTBearer':
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
        `The destination used "${destination.authentication}" as authentication type which is not supported by the SAP Cloud SDK.`
      );
  }
}

export async function buildAuthorizationHeaders(
  destination: Destination,
  customAuthHeader?: AuthenticationHeaderCloud | AuthenticationHeaderOnPrem
): Promise<AuthenticationHeaders> {
  const sanitizedDestination = sanitizeDestination(destination);

  if (customAuthHeader && Object.keys(customAuthHeader).length) {
    return {
      ...customAuthHeader,
      ...getProxyRelatedAuthHeaders(sanitizedDestination)
    };
  }

  return {
    ...(await getAuthenticationRelatedHeaders(sanitizedDestination)),
    ...getProxyRelatedAuthHeaders(sanitizedDestination)
  };
}
