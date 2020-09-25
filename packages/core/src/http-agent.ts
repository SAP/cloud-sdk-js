/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import * as http from 'http';
import * as https from 'https';
import { createLogger } from '@sap-cloud-sdk/util';
import { assoc, pipe } from 'rambda';
import { Destination, DestinationCertificate } from './scp-cf';
import { proxyAgent } from './util/proxy-util';
import { Protocol } from './protocol';
import { HttpAgentConfig, HttpsAgentConfig } from './agent-config';
import { getProtocolOrDefault } from './get-protocol';

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
  options: Record<string, any>
): Record<string, any> =>
  assoc('rejectUnauthorized', !destination.isTrustingAllCertificates, options);

const certificateOptions = (destination: Destination) => (
  options: Record<string, any>
): Record<string, any> => {
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
