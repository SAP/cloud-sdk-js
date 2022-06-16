import https from 'https';
import http from 'http';
import { createLogger, last } from '@sap-cloud-sdk/util';
import {
  Destination,
  DestinationCertificate,
  getProtocolOrDefault,
  Protocol
} from '../scp-cf';
/* Careful the proxy imports cause circular dependencies if imported from scp directly */
import {
  addProxyConfigurationInternet,
  proxyAgent,
  proxyStrategy,
  ProxyStrategy
} from '../scp-cf/destination';
import { HttpAgentConfig, HttpsAgentConfig } from './agent-config';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'http-agent'
});

/**
 * Returns the http or https-agent config depending on the destination URL.
 * If the destination contains a proxy configuration, the agent will be a proxy-agent.
 * If not it will be the default http-agent coming from node.
 * @param destination - Determining which kind of configuration is returned.
 * @returns The http or http-agent configuration.
 */
export function getAgentConfig(
  destination: Destination
): HttpAgentConfig | HttpsAgentConfig {
  const agentType = destination.proxyConfiguration
    ? AgentType.PROXY
    : AgentType.DEFAULT;
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const certificateOptions = {
    ...getTrustStoreOptions(destination),
    ...getKeyStoreOption(destination)
  };
  if (agentType === AgentType.PROXY) {
    return createProxyAgent(destination, certificateOptions);
  }
  return createDefaultAgent(destination, certificateOptions);
}

enum AgentType {
  DEFAULT,
  PROXY
}

function createProxyAgent(
  destination: Destination,
  options: https.AgentOptions
): HttpAgentConfig | HttpsAgentConfig {
  if (!destination.proxyConfiguration) {
    throw new Error(
      `The destination proxy configuration: ${destination.proxyConfiguration} is undefined.`
    );
  }
  return proxyAgent(destination, options);
}

/**
 * @internal
 * The http agents (proxy and default) use node tls for trust handling. This method creates the options with the 'ca' or 'rejectUnauthorized' option.
 * https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
 * @param destination - Destination object
 * @returns Options, which can be used later the http client.
 */
function getTrustStoreOptions(destination: Destination): Record<string, any> {
  // http case: no certificate needed
  if (getProtocolOrDefault(destination) === Protocol.HTTP) {
    if (destination.isTrustingAllCertificates) {
      logger.warn('"isTrustingAllCertificates" is not available for HTTP.');
    }
    if (destination.trustStoreCertificate) {
      logger.warn('"trustStore" is not available for HTTP.');
    }
    return {};
  }

  // https case
  if (
    destination.isTrustingAllCertificates &&
    destination.trustStoreCertificate
  ) {
    logger.warn(
      `Destination ${destination.name} contains the 'trustAll' and 'trustStoreLocation' property which is a redundant setup.`
    );
  }

  if (destination.isTrustingAllCertificates) {
    logger.warn(
      '"isTrustingAllCertificates" property in the provided destination is set to "true". This is highly discouraged in production.'
    );
    return { rejectUnauthorized: !destination.isTrustingAllCertificates };
  }

  if (destination.trustStoreCertificate) {
    const decoded = Buffer.from(
      destination.trustStoreCertificate.content,
      'base64'
    ).toString('utf8');
    return {
      rejectUnauthorized: true,
      ca: [decoded]
    };
  }
  return { rejectUnauthorized: true };
}

/**
 * @internal
 * The http agents (proxy and default) use node tls for the certificate handling. This method creates the options with the pfx and passphrase.
 * https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
 * @param destination - Destination object
 * @returns Options, which can be used later by tls.createSecureContext() e.g. pfx and passphrase or an empty object, if the protocol is not 'https:' or no client information are in the definition.
 */
function getKeyStoreOption(destination: Destination): Record<string, any> {
  if (destination.keyStoreName && destination.keyStorePassword) {
    const certificate = selectCertificate(destination);

    logger.debug(`Certificate with name "${certificate.name}" selected.`);

    return {
      pfx: Buffer.from(certificate.content, 'base64'),
      passphrase: destination.keyStorePassword
    };
  }
  return {};
}

/*
 The node client supports only these store formats https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions.
 */
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
      `The format of the provided certificate '${
        certificate.name
      }' is not supported. Supported formats are: ${supportedCertificateFormats.join(
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

/**
 * @internal
 * See https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener for details on the possible options
 */
function createDefaultAgent(
  destination: Destination,
  options: https.AgentOptions
): HttpAgentConfig | HttpsAgentConfig {
  if (getProtocolOrDefault(destination) === Protocol.HTTPS) {
    return { httpsAgent: new https.Agent(options) };
  }
  return { httpAgent: new http.Agent(options) };
}

/**
 * Builds part of the request config containing the URL and if needed proxy agents or normal http agents.
 * Considers the `no_proxy` environment variable together with the `targetUri`.
 * @internal
 * @param targetUri - Used as baseURL in request config.
 * @returns HttpRequestConfig containing baseUrl and http(s) agents.
 */
export function urlAndAgent(targetUri: string): {
  baseURL: string;
  httpAgent?: http.Agent;
  httpsAgent?: http.Agent;
} {
  let destination: Destination = { url: targetUri, proxyType: 'Internet' };
  if (proxyStrategy(destination) === ProxyStrategy.INTERNET_PROXY) {
    destination = addProxyConfigurationInternet(destination);
  }
  return {
    baseURL: destination.url,
    ...getAgentConfig(destination)
  };
}
