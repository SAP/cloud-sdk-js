/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

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
 * @param destination - A JSON object returned by the destination service.
 * @returns An SDK compatible destination object.
 */
export function sanitizeDestination(destination: MapType<any>): Destination {
  return pipe(setDefaultAuthenticationFallback, parseAuthTokens, parseCertificates, setTrustAll, setOriginalProperties)(destination) as Destination;
}

/**
 * Takes a JSON object returned by any of the calls to the destination service and returns an SDK compatible destination object.
 *
 * @param destinationJson - A JSON object returned by the destination service.
 * @returns An SDK compatible destination object.
 */
export function parseDestination(destinationJson: DestinationJSON | DestinationConfiguration): Destination {
  const destinationConfig = Object.keys(destinationJson).includes('destinationConfiguration')
    ? (destinationJson as DestinationJSON).destinationConfiguration
    : (destinationJson as DestinationConfiguration);

  const destination = {
    originalProperties: destinationJson,
    authTokens: destinationJson['authTokens'] || [],
    certificates: destinationJson['certificates'] || []
  };

  Object.entries(destinationConfig).map(([originalKey, value]) => {
    if (originalKey in configMapping) {
      destination[configMapping[originalKey]] = value;
    }
  });
  return sanitizeDestination(destination);
}

export function toDestinationNameUrl(destination: Destination | DestinationNameAndJwt): string {
  if (isDestinationNameAndJwt(destination)) {
    return `name: ${destination.destinationName}`;
  } else {
    return `name: ${destination.name}, url: ${destination.url}`;
  }
}

function setOriginalProperties(destination: MapType<any>): MapType<any> {
  const originalProperties = destination.originalProperties ? destination.originalProperties : destination;
  return assoc('originalProperties', originalProperties, destination);
}

function setDefaultAuthenticationFallback(destination: MapType<any>): MapType<any> {
  if (destination.authentication) {
    return destination;
  }
  return assoc('authentication', getAuthenticationType(destination), destination);
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

function setTrustAll(destination: MapType<any>): MapType<any> {
  return assoc('isTrustingAllCertificates', parseTrustAll(destination.isTrustingAllCertificates), destination);
}

function parseTrustAll(isTrustingAllCertificates: string | boolean): boolean {
  if (!isTrustingAllCertificates) {
    return false;
  } else if (typeof isTrustingAllCertificates === 'boolean') {
    return isTrustingAllCertificates;
  } else {
    return isTrustingAllCertificates.toLowerCase() === 'true';
  }
}

function getAuthenticationType(destinationConfig: MapType<any>): AuthenticationType {
  if (destinationConfig.authentication) {
    return destinationConfig.authentication;
  }
  if (destinationConfig.username && destinationConfig.password) {
    return 'BasicAuthentication';
  }
  return 'NoAuthentication';
}

interface DestinationJSON {
  destinationConfiguration: DestinationConfiguration;
  authTokens?: MapType<string>[];
  certificates?: MapType<string>[];
}

interface DestinationConfiguration {
  URL: string;
  Name?: string;
  ProxyType: string;
  'sap-client'?: string;
  User?: string;
  Password?: string;
  Authentication: AuthenticationType;
  TrustAll?: string;
  tokenServiceURL?: string;
  tokenServiceUsername?: string;
  tokenServicePass?: string;
  clientId?: string;
  clientSecret?: string;
  SystemUser?: string;
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
