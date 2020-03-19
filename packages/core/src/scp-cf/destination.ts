/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { assoc, pipe } from 'rambda';
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
export function sanitizeDestination(destination: MapType<any>): Destination {
  validateDestinationInput(destination);
  const parsedDestination = pipe(parseAuthTokens, parseCertificates)(destination) as Destination;
  return pipe(setDefaultAuthenticationFallback, setTrustAll, setOriginalProperties)(parsedDestination);
}

/**
 * Takes a JSON object returned by any of the calls to the destination service and returns an SDK compatible destination object.
 * This function only accepts destination configurations of type 'HTTP' and will error if no 'URL' is given.
 *
 * @param destinationJson - A JSON object returned by the destination service.
 * @returns An SDK compatible destination object.
 */
export function parseDestination(destinationJson: DestinationJson | DestinationConfiguration): Destination {
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

  return sanitizeDestination(destination);
}

/**
 * Parses a list of destination configurations and returns a list of SDK compatible destinations.
 * Only destinations of type 'HTTP' destinations are considered, other types will be skipped.
 * Configurations of type undefined are assumed to have type 'HTTP'.
 *
 * @param destinationJsons - JSON objects as given by the destination service.
 * @returns A list of SDK compatible destinations.
 */
export function parseHttpDestinations(destinationJsons: (DestinationJson | DestinationConfiguration)[]): Destination[] {
  return (
    destinationJsons
      .map(destinationJson => getDestinationConfig(destinationJson))
      // We only consider destinations of type 'HTTP'. If no type is set we assume 'HTTP'
      .filter(destinationConfig => typeof destinationConfig.Type === 'undefined' || destinationConfig.Type === 'HTTP')
      .map(destinationConfig => parseDestination(destinationConfig))
  );
}

function getDestinationConfig(destinationJson: DestinationJson | DestinationConfiguration): DestinationConfiguration {
  return isDestinationJson(destinationJson) ? destinationJson.destinationConfiguration : destinationJson;
}

function validateDestinationConfig(destinationConfig: DestinationConfiguration): void {
  if (typeof destinationConfig.URL === 'undefined') {
    throw Error("Property 'URL' of destination configuration must not be undefined.");
  }
}

function validateDestinationInput(destinationInput: MapType<any>): void {
  if (typeof destinationInput.url === 'undefined') {
    throw Error("Property 'url' of destination input must not be undefined.");
  }
}

/* eslint-disable-next-line valid-jsdoc */
/**
 * @hidden
 */
export function toDestinationNameUrl(destination: Destination | DestinationNameAndJwt): string {
  return isDestinationNameAndJwt(destination) ? `name: ${destination.destinationName}` : `name: ${destination.name}, url: ${destination.url}`;
}

function setOriginalProperties(destination: Destination): Destination {
  const originalProperties = destination.originalProperties ? destination.originalProperties : destination;
  return assoc('originalProperties', originalProperties, destination);
}

function setDefaultAuthenticationFallback(destination: Destination): Destination {
  return destination.authentication ? destination : assoc('authentication', getAuthenticationType(destination), destination);
}

function parseCertificate(certificate: MapType<any>): DestinationCertificate {
  return {
    name: certificate.Name || certificate.name,
    content: certificate.Content || certificate.content,
    type: certificate.Type || certificate.type
  };
}

function parseCertificates(destination: MapType<any>): MapType<any> {
  const certificates = destination.certificates ? destination.certificates.map(parseCertificate) : [];
  return assoc('certificates', certificates, destination);
}

function parseAuthToken(authToken: MapType<any>): DestinationAuthToken {
  return {
    type: authToken.type,
    value: authToken.value,
    expiresIn: authToken.expires_in,
    error: 'error' in authToken ? authToken.error : null
  };
}

function parseAuthTokens(destination: MapType<any>): MapType<any> {
  const authTokens = destination.authTokens ? destination.authTokens.map(parseAuthToken) : [];
  return assoc('authTokens', authTokens, destination);
}

function setTrustAll(destination: Destination): Destination {
  return assoc('isTrustingAllCertificates', parseTrustAll(destination.isTrustingAllCertificates), destination);
}

function parseTrustAll(isTrustingAllCertificates?: string | boolean): boolean {
  if (typeof isTrustingAllCertificates === 'string') {
    return isTrustingAllCertificates.toLowerCase() === 'true';
  }

  return !!isTrustingAllCertificates;
}

function getAuthenticationType(destination: Destination): AuthenticationType {
  return destination.authentication || (destination.username && destination.password) ? 'BasicAuthentication' : 'NoAuthentication';
}

/**
 * Destination configuration alongside authtokens and certificates.
 */
export interface DestinationJson {
  [key: string]: any;
  destinationConfiguration: DestinationConfiguration;
  authTokens?: MapType<string>[];
  certificates?: MapType<string>[];
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
export function isDestinationConfiguration(destination: any): destination is DestinationConfiguration {
  return destination.URL !== undefined;
}

/* eslint-disable-next-line valid-jsdoc */
/**
 * @hidden
 */
export function isDestinationJson(destination: any): destination is DestinationJson {
  return Object.keys(destination).includes('destinationConfiguration');
}

const configMapping: MapType<string> = {
  URL: 'url',
  Name: 'name',
  User: 'username',
  Password: 'password',
  ProxyType: 'proxyType',
  'sap-client': 'sapClient',
  Authentication: 'authentication',
  TrustAll: 'isTrustingAllCertificates',
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
