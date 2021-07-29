import { assoc } from '@sap-cloud-sdk/util';
import {
  AuthenticationType,
  Destination,
  DestinationAuthToken,
  DestinationCertificate,
  DestinationNameAndJwt,
  isDestinationNameAndJwt
} from './destination-service-types';

/**
 * Takes an existing or a parsed destination and returns an SDK compatible destination object.
 *
 * @param destination - An object that adheres to the [[Destination]] interface.
 * @returns An SDK compatible destination object.
 */
export function sanitizeDestination(
  destination: Record<string, any>
): Destination {
  validateDestinationInput(destination);
  const destAuthToken = parseAuthTokens(destination);
  let parsedDestination = parseCertificates(destAuthToken) as Destination;

  parsedDestination = setDefaultAuthenticationFallback(parsedDestination);
  parsedDestination = setTrustAll(parsedDestination);
  parsedDestination = setOriginalProperties(parsedDestination);

  return parsedDestination;
}

/**
 * Takes a JSON object returned by any of the calls to the destination service and returns an SDK compatible destination object.
 * This function only accepts destination configurations of type 'HTTP' and will error if no 'URL' is given.
 *
 * @param destinationJson - A JSON object returned by the destination service.
 * @returns An SDK compatible destination object.
 */
export function parseDestination(
  destinationJson: DestinationJson | DestinationConfiguration
): Destination {
  const destinationConfig = getDestinationConfig(destinationJson);
  validateDestinationConfig(destinationConfig);

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
 * @param destinationConfig Original destination config that could include additional headers or query parameters.
 * @param originalKeyPrefix This is what the additional header and query keys start with, when specified in the original destination config.
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
 * Get additional headers and/or query parameters from a destination.
 * Destinations can specify additional headers and/or query parameters, that should be added to every request against the given destination.
 * They are specified in the following format:
 * `URL.headers.<header-name>` or `URL.queries.<query-parameter-name>`
 * @param destinationConfig Original destination config that could include additional headers or query parameters.
 * @returns An object with either the headers or query parameters and their values, depending on the `originalKeyPrefix`.
 */
function getAdditionalHeadersAndQueryParameters(
  destinationConfig: DestinationConfiguration
): Pick<Destination, 'headers' | 'queryParameters'> {
  const additionalHeaders = getAdditionalProperties(
    destinationConfig,
    'URL.headers.'
  );
  const additionalQueryParameters = getAdditionalProperties(
    destinationConfig,
    'URL.queries.'
  );

  const additionalProperties = {};
  if (Object.keys(additionalHeaders).length) {
    additionalProperties['headers'] = additionalHeaders;
  }
  if (Object.keys(additionalQueryParameters).length) {
    additionalProperties['queryParameters'] = additionalQueryParameters;
  }

  return additionalProperties;
}

function getDestinationConfig(
  destinationJson: DestinationJson | DestinationConfiguration
): DestinationConfiguration {
  return isDestinationJson(destinationJson)
    ? destinationJson.destinationConfiguration
    : destinationJson;
}

function validateDestinationConfig(
  destinationConfig: DestinationConfiguration
): void {
  if (
    isHttpDestination(destinationConfig) &&
    typeof destinationConfig.URL === 'undefined'
  ) {
    throw Error(
      "Property 'URL' of destination configuration must not be undefined."
    );
  }
}

function validateDestinationInput(destinationInput: Record<string, any>): void {
  if (
    isHttpDestination(destinationInput) &&
    typeof destinationInput.url === 'undefined'
  ) {
    throw Error("Property 'url' of destination input must not be undefined.");
  }
}

function isHttpDestination(destinationInput: Record<string, any>): boolean {
  return (
    destinationInput.Type === 'HTTP' ||
    destinationInput.type === 'HTTP' ||
    (typeof destinationInput.type === 'undefined' &&
      typeof destinationInput.Type === 'undefined')
  );
}

/* eslint-disable-next-line valid-jsdoc */
/**
 * @hidden
 */
export function toDestinationNameUrl(
  destination: Destination | DestinationNameAndJwt
): string {
  return isDestinationNameAndJwt(destination)
    ? `name: ${destination.destinationName}`
    : `name: ${destination.name}, url: ${destination.url}`;
}

function setOriginalProperties(destination: Destination): Destination {
  const originalProperties = destination.originalProperties
    ? destination.originalProperties
    : destination;
  return assoc('originalProperties', originalProperties, destination);
}

function setDefaultAuthenticationFallback(
  destination: Destination
): Destination {
  return destination.authentication
    ? destination
    : assoc('authentication', getAuthenticationType(destination), destination);
}

function parseCertificate(
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
  const certificates = destination.certificates
    ? destination.certificates.map(parseCertificate)
    : [];
  return assoc('certificates', certificates, destination);
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
  const authTokens = destination.authTokens
    ? destination.authTokens.map(parseAuthToken)
    : [];
  return assoc('authTokens', authTokens, destination);
}

function setTrustAll(destination: Destination): Destination {
  return assoc(
    'isTrustingAllCertificates',
    parseTrustAll(destination.isTrustingAllCertificates),
    destination
  );
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

/**
 * Destination configuration alongside authtokens and certificates.
 */
export interface DestinationJson {
  [key: string]: any;
  destinationConfiguration: DestinationConfiguration;
  authTokens?: Record<string, string>[];
  certificates?: Record<string, string>[];
}

/**
 * Configuration of a destination as it is available through the destination service.
 */
export interface DestinationConfiguration {
  [key: string]: any;
  URL: string;
  Name?: string;
  ProxyType?: string;
  'sap-client'?: string;
  User?: string;
  Password?: string;
  Authentication?: AuthenticationType;
  TrustAll?: string;
  tokenServiceURL?: string;
  tokenServiceUsername?: string;
  tokenServicePass?: string;
  clientId?: string;
  clientSecret?: string;
  SystemUser?: string;
  Type?: 'HTTP' | 'LDAP' | 'MAIL' | 'RFC';
}
/* eslint-disable-next-line valid-jsdoc */
/**
 * @hidden
 */
export function isDestinationConfiguration(
  destination: any
): destination is DestinationConfiguration {
  return destination.URL !== undefined;
}

/* eslint-disable-next-line valid-jsdoc */
/**
 * @hidden
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
  SystemUser: 'systemUser'
};
