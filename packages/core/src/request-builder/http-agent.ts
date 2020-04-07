/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import * as http from 'http';
import * as https from 'https';
import { createLogger, MapType } from '@sap-cloud-sdk/util';
import { assoc, last, pipe } from 'rambda';
import { Destination, DestinationCertificate } from '../scp-cf';
import { proxyAgent } from '../util/proxy-util';

const logger = createLogger({
  package: 'core',
  messageContext: 'http-agent'
});

/**
 * Returns the http or https-agent config depending on the destination URL.
 * If the destination contains a proxy configuration, the agent will be a proxy-agent.
 * If not it will be the default http-agent coming from node.
 *
 * @param destination - determining which kind of configuration is returned
 * @returns The http or http-agent configuration.
 */
export function getAgentConfig(
  destination: Destination
): HttpAgentConfig | HttpsAgentConfig {
  const agentType = destination.proxyConfiguration
    ? AgentType.PROXY
    : AgentType.DEFAULT;
  if (agentType === AgentType.PROXY) {
    return createProxyAgent(destination);
  }
  return createDefaultAgent(destination);
}

enum AgentType {
  DEFAULT,
  PROXY
}

/**
 * Interface for the http-agent within the Axios request config.
 */
export interface HttpAgentConfig {
  httpAgent: http.Agent;
}

/**
 * Interface for the https-agent within the Axios request config.
 */
export interface HttpsAgentConfig {
  httpsAgent: http.Agent;
}

function createProxyAgent(
  destination: Destination
): HttpAgentConfig | HttpsAgentConfig {
  if (!destination.proxyConfiguration) {
    throw new Error(
      `The destination proxy configuration: ${destination.proxyConfiguration} is undefined.`
    );
  }

  if (destination.isTrustingAllCertificates) {
    logger.warn(
      'The destination is configured to both use a proxy and to trust all certificates. This is currently not supported. The proxy configuration will be applied, but certificates will be validated.'
    );
  }

  return proxyAgent(destination);
}

const trustAllOptions = (destination: Destination) => (
  options: MapType<any>
): MapType<any> =>
  assoc('rejectUnauthorized', !destination.isTrustingAllCertificates, options);

const certificateOptions = (destination: Destination) => (
  options: MapType<any>
): MapType<any> => {
  if (destination.keyStoreName && destination.keyStorePassword) {
    const certificate = selectCertificate(destination);

    return {
      ...options,
      pfx: Buffer.from(certificate.content, 'base64'),
      passphrase: destination.keyStorePassword
    };
  }
  return options;
};

const supportedCertificateFormats = ['p12', 'pfx'];

function hasSupportedFormat(certificate: DestinationCertificate): boolean {
  const certificateFormat = last(certificate.name.split('.'));
  if (certificateFormat) {
    return supportedCertificateFormats.includes(certificateFormat);
  }
  return false;
}

function selectCertificate(destination): DestinationCertificate {
  const certificate = destination.certificates.find(
    c => c.name === destination.keyStoreName
  );

  if (!certificate) {
    throw Error(
      `No certificate with name ${destination.keyStoreName} could be found on the destination!`
    );
  }

  if (!hasSupportedFormat(certificate)) {
    const format: string | undefined = last(certificate.name.split('.'));
    throw Error(
      `The format of the provided certificate ${
        certificate.name
      } is not supported. Supported formats are: ${supportedCertificateFormats.join(
        ', '
      )}. ${
        format && ['jks', 'keystore'].includes(format)
          ? "You can convert Java Keystores (.jks, .keystore) into PKCS#12 keystores using the JVM's keytool CLI: keytool -importkeystore -srckeystore your-keystore.jks -destkeystore your-keystore.p12 -deststoretype pkcs12"
          : ''
      }`
    );
  }

  return certificate;
}

function createDefaultAgent(
  destination: Destination
): HttpAgentConfig | HttpsAgentConfig {
  if (getProtocolOrDefault(destination) === Protocol.HTTPS) {
    if (destination.isTrustingAllCertificates) {
      logger.warn(
        '"isTrustingAllCertificates" property in the provided destination is set to "true". This is highly discouraged in production.'
      );
    }
    const options = pipe(
      trustAllOptions(destination),
      certificateOptions(destination)
    )({});
    return { httpsAgent: new https.Agent(options) };
  }

  if (destination.isTrustingAllCertificates) {
    logger.warn('"isTrustingAllCertificates" is not available for HTTP.');
  }
  return { httpAgent: new http.Agent() };
}

/**
 * Extracts the http protocol from the destination url. The default value is http if no protocol is given.
 *
 * @param destination - URL of this destination is parsed
 * @throws Error in case a unsupported protocol is given in the destination URL like rfc://example.com.
 * @returns The protocol, either https or http.
 */
export function getProtocolOrDefault(destination: Destination): Protocol {
  const protocol = destination?.url?.toLowerCase()?.split('://');

  if (!protocol || protocol.length === 1) {
    logger.warn(
      `URL of the provided destination (${destination.url}) has no protocol specified! Assuming HTTPS.`
    );
    return Protocol.HTTPS;
  }
  const casted = Protocol.of(protocol[0]);
  if (casted) {
    return casted;
  }

  throw new Error(
    `Protocol of the provided destination (${destination.url}) is not supported! Currently only HTTP and HTTPS are supported.`
  );
}

/**
 * @deprecated Since v1.5.1. use getProtocolOrDefault instead
 * Takes the destination URL and return everything before the '://'.
 *
 * @param destination - URL of this destination is parsed
 * @returns The protocol either undefined if no :// is found or anything before the delimiter.
 */
export function getUrlProtocol(destination: Destination): Protocol | undefined {
  if (destination.url) {
    const urlParts = destination.url.toLowerCase().split('://');
    if (urlParts.length > 1) {
      return urlParts[0] as Protocol;
    }
  }
}

/**
 * Protocol enumeration, either 'http' or 'https'.
 */
export enum Protocol {
  HTTP = 'http',
  HTTPS = 'https'
}

/* eslint-disable-next-line no-redeclare */
export namespace Protocol {
  /**
   * Get [[Protocol]] from its string representation.
   * @param protocol Protocol as string, either 'http' or 'https'.
   * @returns Either the matching protocol or undefined
   */
  export function of(protocol: string): Protocol | undefined {
    if (protocol.toLowerCase() === Protocol.HTTP) {
      return Protocol.HTTP;
    }
    if (protocol.toLowerCase() === Protocol.HTTPS) {
      return Protocol.HTTPS;
    }
  }
}
