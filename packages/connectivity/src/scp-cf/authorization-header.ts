import {
  unixEOL,
  isNullish,
  createLogger,
  encodeBase64,
  pickValueIgnoreCase
} from '@sap-cloud-sdk/util';
// eslint-disable-next-line import/no-internal-modules
import { sanitizeDestination } from './destination/destination';
import type {
  AuthenticationType,
  Destination,
  DestinationAuthToken
} from './destination';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'authorization-header'
});

/**
 * @internal
 * Get an authentication header from given custom headers.
 * @param authenticationType - The authentication type of a destination
 * @param customHeaders - Custom headers.
 * @returns An authentication header.
 */
export function getAuthHeader(
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
  // The value property of the destination service has already the pattern e.g. "Bearer Token" so it can be used directly.
  return { authorization: authToken.http_header.value };
}

function headerFromBasicAuthDestination(
  destination: Destination
): AuthenticationHeaderCloud {
  if (isNullish(destination.username) || isNullish(destination.password)) {
    throw Error(
      'AuthenticationType is "BasicAuthentication", but "username" and / or "password" are missing!'
    );
  }

  return {
    authorization: basicHeader(destination.username, destination.password)
  };
}

/**
 * @internal
 * @param username - The username
 * @param password - The password
 * @returns basic header as string
 */
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

interface AuthenticationHeaderSAMLAssertion {
  'x-sap-security-session': 'create';
}

function getProxyRelatedAuthHeaders(
  destination: Destination
): AuthenticationHeaderProxy | undefined {
  // The connectivity service will raise an exception if it can not obtain the 'Proxy-Authorization' and the destination lookup will fail early
  const authHeader =
    destination?.proxyConfiguration?.headers?.['Proxy-Authorization'];
  if (authHeader) {
    return { 'Proxy-Authorization': authHeader };
  }
}

async function getAuthenticationRelatedHeaders(
  destination: Destination
): Promise<
  | AuthenticationHeaderCloud
  | AuthenticationHeaderOnPrem
  | AuthenticationHeaderSAMLAssertion
  | undefined
> {
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
        'No authentication type is specified on the destination. Assuming "NoAuthentication".'
      );
      return;
    case 'NoAuthentication':
      return;
    case 'ClientCertificateAuthentication':
      return;
    case 'SAMLAssertion':
    case 'OAuth2SAMLBearerAssertion':
    case 'OAuth2UserTokenExchange':
    case 'OAuth2JWTBearer':
    case 'OAuth2ClientCredentials':
    case 'OAuth2Password':
    case 'OAuth2RefreshToken': {
      const header = headerFromTokens(
        destination.authentication,
        destination.authTokens
      );
      if (destination.authentication === 'SAMLAssertion') {
        logger.warn(
          "Destination authentication flow is 'SamlAssertion' and the auth header contains the SAML assertion. In most cases you want to translate the assertion to a Bearer token using the 'OAuth2SAMLBearerAssertion' flow."
        );
        return {
          ...header,
          'x-sap-security-session': 'create'
        };
      }
      return header;
    }
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

/**
 * @param destination - Destination from which headers are build
 * @param customAuthHeader - Additional custom headers
 * @returns authorization - headers build from destination
 * @internal
 */
export async function buildAuthorizationHeaders(
  destination: Destination
): Promise<AuthenticationHeaders> {
  const sanitizedDestination = sanitizeDestination(destination);

  return {
    ...(await getAuthenticationRelatedHeaders(sanitizedDestination)),
    ...getProxyRelatedAuthHeaders(sanitizedDestination)
  };
}
