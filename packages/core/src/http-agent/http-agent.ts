import https from 'https';
import http from 'http';
import { assoc, createLogger, last } from '@sap-cloud-sdk/util';
import {
  Destination,
  DestinationCertificate,
  getProtocolOrDefault,
  Protocol
} from '../connectivity/scp-cf';
import { HttpRequestConfig } from '../http-client';
import { HttpAgentConfig, HttpsAgentConfig } from './agent-config';
import {
  addProxyConfigurationInternet,
  proxyAgent,
  ProxyStrategy,
  proxyStrategy
} from './proxy-util';

const logger = createLogger({
  package: 'core',
  messageContext: 'http-agent'
});

/**
 * Returns the http or https-agent config depending on the destination URL.
 * If the destination contains a proxy configuration, the agent will be a proxy-agent.
 * If not it will be the default http-agent coming from node.
 * @param destination - determining which kind of configuration is returned
 * @returns The http or http-agent configuration.
 */
export function getAgentConfig(
  destination: Destination
): HttpAgentConfig | HttpsAgentConfig {
  const agentType = destination.proxyConfiguration
    ? AgentType.PROXY
    : AgentType.DEFAULT;
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const certificateOptions = getCertificateOption(destination);
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

const trustAllOptions =
  (destination: Destination) =>
  (options: Record<string, any>): Record<string, any> =>
    assoc(
      'rejectUnauthorized',
      !destination.isTrustingAllCertificates,
      options
    );

const certificateOptions =
  (destination: Destination) =>
  (options: Record<string, any>): Record<string, any> => {
    if (destination.keyStoreName && destination.keyStorePassword) {
      const certificate = selectCertificate(destination);

      logger.debug(`Certifcate with name "${certificate.name}" selected.`);

      return {
        ...options,
        pfx: Buffer.from(certificate.content, 'base64'),
        passphrase: destination.keyStorePassword
      };
    }
    return options;
  };
/**
 * @hidden
 * The http agents (proxy and default) use node tls for the certificate handling. This method creates the options with the pfx and passphrase.
 * https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
 * @param destination - Destination object
 * @returns Options, which can be used later by tls.createSecureContext() e.g. pfx and passphrase or an empty object, if the protocol is not 'https:' or no client information are in the definition.
 */
function getCertificateOption(destination: Destination): Record<string, any> {
  // http case: no certificate needed
  if (getProtocolOrDefault(destination) === Protocol.HTTP) {
    if (destination.isTrustingAllCertificates) {
      logger.warn('"isTrustingAllCertificates" is not available for HTTP.');
    }

    return {};
  }
  // https case: get certificate options
  if (destination.isTrustingAllCertificates) {
    logger.warn(
      '"isTrustingAllCertificates" property in the provided destination is set to "true". This is highly discouraged in production.'
    );
  }

  const options = trustAllOptions(destination)({});
  return certificateOptions(destination)(options);
}

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

// eslint-disable-next-line valid-jsdoc
/**
 * @hidden
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
 * @deprecated Since v1.5.1. use getProtocolOrDefault instead
 * Takes the destination URL and return everything before the `://`.
 * @param destination - URL of this destination is parsed
 * @returns The protocol either `undefined` if no `://` is found or anything before the delimiter.
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
 * Builds part of the request config containing the URL and if needed proxy agents or normal http agents.
 * Considers the NO_Proxy env variable together with the targetUri.
 * @param targetUri - used as baseURL in request config
 * @returns HttpRequestConfig containing baseUrl and http(s) agents.
 */
export function urlAndAgent(
  targetUri: string
): Pick<HttpRequestConfig, 'baseURL' | 'httpAgent' | 'httpsAgent' | 'proxy'> {
  let destination: Destination = { url: targetUri, proxyType: 'Internet' };
  if (proxyStrategy(destination) === ProxyStrategy.INTERNET_PROXY) {
    destination = addProxyConfigurationInternet(destination);
  }
  return {
    baseURL: destination.url,
    ...getAgentConfig(destination)
  };
}
