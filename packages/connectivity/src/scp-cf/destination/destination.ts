import { isDestinationFetchOptions } from './destination-accessor-types';
import type { Xor } from '@sap-cloud-sdk/util';
import type { DestinationFetchOptions } from './destination-accessor-types';
import type { DestinationFromServiceBindingOptions } from './destination-from-vcap';
import type {
  AuthenticationType,
  Destination,
  DestinationAuthToken,
  DestinationCertificate,
  HttpDestination
} from './destination-service-types';

/**
 * Takes an existing or a parsed destination and returns an SDK compatible destination object.
 * @param destination - An object that adheres to the {@link Destination} interface.
 * @returns An SDK compatible destination object.
 */
export function sanitizeDestination(
  destination: Record<string, any>
): Destination {
  let parsedDestination = parseAuthTokens(destination);
  parsedDestination = parseCertificates(parsedDestination) as Destination;

  parsedDestination = setDefaultAuthenticationFallback(parsedDestination);
  parsedDestination = setTrustAll(parsedDestination);
  parsedDestination = setForwardAuthToken(parsedDestination);
  parsedDestination = setOriginalProperties(parsedDestination);

  return parsedDestination;
}

/**
 * Takes a JSON object returned by any of the calls to the destination service and returns an SDK compatible destination object.
 * This function only accepts destination configurations of type 'HTTP' and will error if no 'URL' is given.
 * @param destinationJson - A JSON object returned by the destination service.
 * @returns An SDK compatible destination object.
 * @internal
 */
export function parseDestination(
  destinationJson: DestinationJson | DestinationConfiguration
): Destination {
  const destinationConfig = getDestinationConfig(destinationJson);

  const destination = Object.entries(destinationConfig).reduce(
    (dest, [originalKey, value]) => {
      if (originalKey in configMapping) {
        dest[configMapping[originalKey]] = value;
      }
      return dest;
    },
    {
      originalProperties: destinationJson,
      authTokens: destinationJson['authTokens'] || [],
      certificates: destinationJson['certificates'] || []
    }
  );

  const additionalHeadersAndQueryParameters =
    getAdditionalHeadersAndQueryParameters(destinationConfig);

  return sanitizeDestination({
    ...destination,
    ...additionalHeadersAndQueryParameters
  });
}

/**
 * Get either additional headers or query parameters from a destination, depending on the given prefix.
 * @param destinationConfig - Original destination config that could include additional headers or query parameters.
 * @param originalKeyPrefix - This is what the additional header and query keys start with, when specified in the original destination config.
 * @returns An object with either the headers or query parameters and their values, depending on the `originalKeyPrefix`.
 */
function getAdditionalProperties(
  destinationConfig: DestinationConfiguration,
  originalKeyPrefix: 'URL.headers.' | 'URL.queries.'
): Record<string, any> {
  const relevantConfigEntries = Object.entries(destinationConfig).filter(
    ([key]) => key.startsWith(originalKeyPrefix)
  );

  return relevantConfigEntries.reduce(
    (additionalProperties: Record<string, any>, [originalKey, value]) => {
      const headerKey = originalKey.replace(originalKeyPrefix, '');
      additionalProperties[headerKey] = value;
      return additionalProperties;
    },
    {}
  );
}

/**
 * @internal
 * Get additional headers and/or query parameters from a destination.
 * Destinations can specify additional headers and/or query parameters, that should be added to every request against the given destination.
 * They are specified in the following format:
 * `URL.headers.<header-name>` or `URL.queries.<query-parameter-name>`
 * @param destinationConfig - Original destination config that could include additional headers or query parameters.
 * @returns An object with either the headers or query parameters and their values, depending on the `originalKeyPrefix`.
 */
export function getAdditionalHeadersAndQueryParameters(
  destinationConfig: DestinationConfiguration
): Pick<Destination, 'headers' | 'queryParameters'> {
  const additionalProperties = {};

  const additionalHeaders = getAdditionalHeaders(destinationConfig).headers;
  if (additionalHeaders && Object.keys(additionalHeaders).length) {
    additionalProperties['headers'] = additionalHeaders;
  }

  const additionalQueryParameters =
    getAdditionalQueryParameters(destinationConfig).queryParameters;
  if (
    additionalQueryParameters &&
    Object.keys(additionalQueryParameters).length
  ) {
    additionalProperties['queryParameters'] = additionalQueryParameters;
  }

  return additionalProperties;
}

/**
 * @internal
 * Get additional headers from a destination.
 * Destinations can specify additional headers, that should be added to every request against the given destination.
 * They are specified in the following format:
 * `URL.headers.<header-name>`
 * @param destinationConfig - Original destination config that could include additional headers.
 * @returns An object with either the headers or query parameters and their values, depending on the `originalKeyPrefix`.
 */
export function getAdditionalHeaders(
  destinationConfig: DestinationConfiguration
): Pick<Destination, 'headers'> {
  const additionalHeaders = getAdditionalProperties(
    destinationConfig,
    'URL.headers.'
  );

  const additionalProperties = {};
  if (Object.keys(additionalHeaders).length) {
    additionalProperties['headers'] = additionalHeaders;
  }

  return additionalProperties;
}

/**
 * @internal
 * Get additional query parameters from a destination.
 * Destinations can specify additional query parameters, that should be added to every request against the given destination.
 * They are specified in the following format:
 * `URL.queries.<query-parameter-name>`
 * @param destinationConfig - Original destination config that could include additional headers or query parameters.
 * @returns An object with either the headers or query parameters and their values, depending on the `originalKeyPrefix`.
 */
export function getAdditionalQueryParameters(
  destinationConfig: DestinationConfiguration
): Pick<Destination, 'queryParameters'> {
  const additionalQueryParameters = getAdditionalProperties(
    destinationConfig,
    'URL.queries.'
  );

  const additionalProperties = {};
  if (Object.keys(additionalQueryParameters).length) {
    additionalProperties['queryParameters'] = additionalQueryParameters;
  }

  return additionalProperties;
}

/**
 * @internal
 */
export function getDestinationConfig(
  destinationJson: DestinationJson | DestinationConfiguration
): DestinationConfiguration {
  return isDestinationJson(destinationJson)
    ? destinationJson.destinationConfiguration
    : destinationJson;
}

/**
 * Transform destination to string containing destination information.
 * @param destination - Either destination object or destinationName and Jwt.
 * @returns String containing information on the destination.
 */
export function toDestinationNameUrl(
  destination: DestinationOrFetchOptions
): string {
  if (isDestinationFetchOptions(destination)) {
    return `name: ${destination.destinationName}`;
  }

  const text = ['name', 'url']
    .filter(key => destination[key])
    .map(key => `${key}: ${destination[key]}`);

  return text.length > 0
    ? text.join(',')
    : "Destination does not have a 'name' or 'url' property.";
}

function setOriginalProperties(destination: Destination): Destination {
  const originalProperties = destination.originalProperties
    ? destination.originalProperties
    : destination;
  return {
    ...destination,
    originalProperties
  };
}

function setDefaultAuthenticationFallback(
  destination: Destination
): Destination {
  return destination.authentication
    ? destination
    : {
        ...destination,
        authentication: getAuthenticationType(destination)
      };
}

/**
 * Transforms the upper case properties of the destination service response to lower case.
 * @internal
 * @param certificate - Response from the certificate endpoint of the destination service.
 * @returns The parsed Destination Certificate with lower case properties.
 */
export function parseCertificate(
  certificate: Record<string, any>
): DestinationCertificate {
  return {
    name: certificate.Name || certificate.name,
    content: certificate.Content || certificate.content,
    type: certificate.Type || certificate.type
  };
}

function parseCertificates(
  destination: Record<string, any>
): Record<string, any> {
  return {
    ...destination,
    certificates: (destination.certificates || []).map(certificate =>
      parseCertificate(certificate)
    )
  };
}

function parseAuthToken(authToken: Record<string, any>): DestinationAuthToken {
  return {
    type: authToken.type,
    value: authToken.value,
    expiresIn: authToken.expires_in,
    error: 'error' in authToken ? authToken.error : null,
    http_header: authToken.http_header
  };
}

function parseAuthTokens(
  destination: Record<string, any>
): Record<string, any> {
  return {
    ...destination,
    authTokens: (destination.authTokens || []).map(token =>
      parseAuthToken(token)
    )
  };
}

function setTrustAll(destination: Destination): Destination {
  return {
    ...destination,
    isTrustingAllCertificates: parseTrustAll(
      destination.isTrustingAllCertificates
    )
  };
}

function parseTrustAll(isTrustingAllCertificates?: string | boolean): boolean {
  if (typeof isTrustingAllCertificates === 'string') {
    return isTrustingAllCertificates.toLowerCase() === 'true';
  }

  return !!isTrustingAllCertificates;
}

function getAuthenticationType(destination: Destination): AuthenticationType {
  return destination.authentication ||
    (destination.username && destination.password)
    ? 'BasicAuthentication'
    : 'NoAuthentication';
}

function setForwardAuthToken(
  destination: Destination & { forwardAuthToken?: string }
): Destination {
  const forwardAuthToken =
    destination.originalProperties?.forwardAuthToken ??
    destination.originalProperties?.['HTML5.ForwardAuthToken'] ??
    destination.forwardAuthToken;

  return {
    ...destination,
    forwardAuthToken: forwardAuthToken === 'true' || forwardAuthToken === true
  };
}

/**
 * Destination configuration alongside auth tokens and certificates.
 */
export interface DestinationJson {
  [key: string]: any;
  /**
   * Configuration of a destination as it is available through the destination service.
   */
  destinationConfiguration: DestinationConfiguration;
  /**
   * Authentication tokens as they are available through the destination service.
   */
  authTokens?: Record<string, string>[];
  /**
   * Certificates for authentication as they are available through the destination service.
   */
  certificates?: Record<string, string>[];
}

/**
 * Configuration of a destination as it is available through the destination service.
 */
export interface DestinationConfiguration {
  [key: string]: any;
  /**
   * `URL` of the destination.
   */
  URL?: string;
  /**
   * `Name` of the destination.
   */
  Name?: string;
  /**
   * `ProxyType` of the destination, e.g., `Internet` or `OnPremise`.
   */
  ProxyType?: string;
  /**
   * `sap-client` defined in the destination.
   */
  'sap-client'?: string;
  /**
   * Username in case of basic authentication destinations.
   */
  User?: string;
  /**
   * Password in case of basic authentication destinations.
   */
  Password?: string;
  /**
   * Represents the authentication type of a destination.
   */
  Authentication?: AuthenticationType;
  /**
   * Value of the TrustAll property of the destination.
   */
  TrustAll?: string;
  /**
   * URL of the token service endpoint to retrieve access token.
   * This may contain placeholders in multi-tenant scenarios. @see {@link https://help.sap.com/docs/CP_CONNECTIVITY/cca91383641e40ffbe03bdc78f00f681/c69ea6aacd714ad2ae8ceb5fc3ceea56.html?locale=en-US|OAuth SAML Bearer Assertion Authentication}.
   * In most cases the XSUAA will be used here.
   */
  tokenServiceURL?: string;
  /**
   * Decides if the token service subdomain is fixed or adjusted in multi-tenant scenarios. @see {@link https://help.sap.com/docs/CP_CONNECTIVITY/cca91383641e40ffbe03bdc78f00f681/c69ea6aacd714ad2ae8ceb5fc3ceea56.html?locale=en-US|OAuth SAML Bearer Assertion Authentication}.
   */
  tokenServiceURLType?: 'Common' | 'Dedicated;';
  /**
   * Fixed username to retrieve an auth token from the endpoint.
   */
  tokenServiceUsername?: string;
  /**
   * Password to retrieve an auth token from the endpoint.
   */
  tokenServicePass?: string;
  /**
   * ClientId to retrieve an auth token from the token service endpoint.
   */
  clientId?: string;
  /**
   * ClientSecret to retrieve an auth token from the token service endpoint.
   */
  clientSecret?: string;
  /**
   * Deprecated option of the destination service to fix a user in OnPremise principal propagation.
   */
  SystemUser?: string;
  /**
   * Type of the destination.
   */
  Type?: 'HTTP' | 'LDAP' | 'MAIL' | 'RFC';
}
/* eslint-disable-next-line valid-jsdoc */
/**
 * @internal
 */
export function isDestinationConfiguration(
  destination: any
): destination is DestinationConfiguration {
  return destination.URL !== undefined;
}

/* eslint-disable-next-line valid-jsdoc */
/**
 * @internal
 */
export function isDestinationJson(
  destination: any
): destination is DestinationJson {
  return Object.keys(destination).includes('destinationConfiguration');
}

const configMapping: Record<string, keyof Destination> = {
  URL: 'url',
  Name: 'name',
  User: 'username',
  Password: 'password',
  ProxyType: 'proxyType',
  'sap-client': 'sapClient',
  Authentication: 'authentication',
  TrustAll: 'isTrustingAllCertificates',
  Type: 'type',
  tokenServiceURL: 'tokenServiceUrl',
  clientId: 'clientId',
  clientSecret: 'clientSecret',
  tokenServiceUser: 'tokenServiceUser',
  tokenServicePassword: 'tokenServicePassword',
  CloudConnectorLocationId: 'cloudConnectorLocationId',
  certificates: 'certificates',
  KeyStoreLocation: 'keyStoreName',
  KeyStorePassword: 'keyStorePassword',
  SystemUser: 'systemUser',
  /**
   * Base64-encoded JSON web key set, containing the signing keys which are used to validate the JWT provided in the X-User-Token header.
   */
  'x_user_token.jwks': 'jwks',
  /**
   * URI of the JSON web key set, containing the signing keys which are used to validate the JWT provided in the X-User-Token header.
   */
  'x_user_token.jwks_uri': 'jwksUri',
  'HTML5.ForwardAuthToken': 'forwardAuthToken',
  /**
   * This overwrites `HTML5.ForwardAuthToken`, if both exist (during sanitize).
   */
  forwardAuthToken: 'forwardAuthToken'
};

/**
 * @internal
 */
export function noDestinationErrorMessage(
  destination: DestinationOrFetchOptions
): string {
  return isDestinationFetchOptions(destination)
    ? `Could not find a destination with name "${destination.destinationName}"! Unable to execute request.`
    : 'Could not find a destination to execute request against and no destination name has been provided (this should never happen)!';
}

/**
 * Type that is either a {@link HttpDestination} or (XOR) {@link DestinationFetchOptions & DestinationFromServiceBindingOptions}.
 */
export type DestinationOrFetchOptions = Xor<
  Destination,
  DestinationFetchOptions & DestinationFromServiceBindingOptions
>;

/**
 * Type that is either a {@link HttpDestination} or (XOR) {@link DestinationFetchOptions & DestinationFromServiceBindingOptions}.
 */
export type HttpDestinationOrFetchOptions = Xor<
  HttpDestination,
  DestinationFetchOptions & DestinationFromServiceBindingOptions
>;
