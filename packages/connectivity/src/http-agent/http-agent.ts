import { readFile } from 'fs/promises';
import http from 'http';
import https from 'https';
import { createLogger, last } from '@sap-cloud-sdk/util';
/* Careful the proxy imports cause circular dependencies if imported from scp directly */
// eslint-disable-next-line import/no-internal-modules
import { getProtocolOrDefault } from '../scp-cf/get-protocol';
import {
  addProxyConfigurationInternet,
  getProxyConfig,
  proxyStrategy
  // eslint-disable-next-line import/no-internal-modules
} from '../scp-cf/destination/http-proxy-util';
// eslint-disable-next-line import/no-internal-modules
import { registerDestinationCache } from '../scp-cf/destination/register-destination-cache';
import type {
  BasicProxyConfiguration,
  Destination,
  DestinationCertificate,
  HttpDestination
} from '../scp-cf';
import type { HttpAgentConfig, HttpsAgentConfig } from './agent-config';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'http-agent'
});

/**
 * Will be renamed to getAgentConfig in the next major release.
 * Returns a promise of the http or https-agent config depending on the destination URL.
 * If the destination contains a proxy configuration, the agent will be a proxy-agent.
 * If not it will be the default http-agent coming from node.
 * @param destination - Determining which kind of configuration is returned.
 * @returns A promise of the HTTP or HTTPS agent configuration.
 */
export async function getAgentConfigAsync(
  destination: HttpDestination
): Promise<HttpAgentConfig | HttpsAgentConfig> {
  const certificateOptions = {
    ...getTrustStoreOptions(destination),
    ...getKeyStoreOptions(destination),
    ...(await getMtlsOptions(destination))
  };
  return createAgent(destination, certificateOptions);
}

/**
 * Returns the http or https-agent config depending on the destination URL.
 * If the destination contains a proxy configuration, the agent will be a proxy-agent.
 * If not it will be the default http-agent coming from node.
 * @deprecated Temporarily replaced by {@link getAgentConfigAsync}, will change its default behavior to be asynchronous in next major release.
 * @param destination - Determining which kind of configuration is returned.
 * @returns The HTTP or HTTPS agent configuration.
 */
export function getAgentConfig(
  destination: HttpDestination
): HttpAgentConfig | HttpsAgentConfig {
  const certificateOptions = {
    ...getTrustStoreOptions(destination),
    ...getKeyStoreOptions(destination)
  };
  return createAgent(destination, certificateOptions);
}

/**
 * @internal
 * The http agents (proxy and default) use node tls for trust handling. This method creates the options with the 'ca' or 'rejectUnauthorized' option.
 * https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
 * @param destination - Destination object
 * @returns Options, which can be used later the http client.
 */
function getTrustStoreOptions(destination: HttpDestination): {
  rejectUnauthorized?: boolean;
  ca?: [string];
} {
  // http case: no certificate needed
  if (getProtocolOrDefault(destination) === 'http') {
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
 * The http agent uses node tls for the certificate handling. This method creates the options with the pfx and passphrase or key, cert and passphrase, depending on the format of the certificate.
 * https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
 * @param destination - Destination object.
 * @returns Options, which can be used later by tls.createSecureContext() e.g. pfx and passphrase or an empty object, if the protocol is not 'https:' or no client information are in the definition.
 */
function getKeyStoreOptions(destination: Destination):
  | {
      pfx?: Buffer;
      passphrase?: string;
    }
  | {
      cert?: Buffer;
      key?: Buffer;
      passphrase?: string;
    } {
  if (
    // Only add certificates, when using ClientCertificateAuthentication (https://github.com/SAP/cloud-sdk-js/issues/3544)
    destination.authentication === 'ClientCertificateAuthentication' &&
    !mtlsIsEnabled(destination) &&
    destination.keyStoreName
  ) {
    const certificate = selectCertificate(destination);
    validateFormat(certificate);

    logger.debug(`Certificate with name "${certificate.name}" selected.`);

    if (!destination.keyStorePassword) {
      logger.debug(
        `Destination '${destination.name}' does not have a keystore password.`
      );
    }

    const certBuffer = Buffer.from(certificate.content, 'base64');

    // if the format is pem, the key and certificate needs to be passed separately
    // it could be required to separate the string into two parts, but this seems to work as well
    if (getFormat(certificate) === 'pem') {
      return {
        cert: certBuffer,
        key: certBuffer,
        passphrase: destination.keyStorePassword
      };
    }
    // pfx is a format that combines key and cert
    return {
      pfx: certBuffer,
      passphrase: destination.keyStorePassword
    };
  }
  return {};
}

/**
 * Options used for establishing mTLS connections.
 * @internal
 */
export interface MtlsOptions {
  /**
   * @internal
   */
  cert: string;
  /**
   * @internal
   */
  key: string;
}

/*
 Reads mTLS client certificates from known environment variables on CloudFoundry.
 */
async function getMtlsOptions(
  destination: Destination
): Promise<MtlsOptions | Record<string, never>> {
  if (
    destination.mtls &&
    !(process.env.CF_INSTANCE_CERT && process.env.CF_INSTANCE_KEY)
  ) {
    logger.warn(
      `Destination ${
        destination.name ? destination.name : ''
      } has mTLS enabled, but the required Cloud Foundry environment variables (CF_INSTANCE_CERT and CF_INSTANCE_KEY) are not defined. Note that 'inferMtls' only works on Cloud Foundry.`
    );
  }
  if (mtlsIsEnabled(destination)) {
    if (registerDestinationCache.mtls.useMtlsCache) {
      return registerDestinationCache.mtls.getMtlsOptions();
    }
    const getCert = readFile(process.env.CF_INSTANCE_CERT as string, 'utf8');
    const getKey = readFile(process.env.CF_INSTANCE_KEY as string, 'utf8');
    const [cert, key] = await Promise.all([getCert, getKey]);
    return {
      cert,
      key
    };
  }
  return {};
}

function mtlsIsEnabled(destination: Destination) {
  return (
    destination.mtls &&
    process.env.CF_INSTANCE_CERT &&
    process.env.CF_INSTANCE_KEY
  );
}

/*
 The node client supports only these store formats https://nodejs.org/api/tls.html#tlscreatesecurecontextoptions.
 */
const supportedCertificateFormats = ['p12', 'pfx', 'pem'];

function isSupportedFormat(format: string | undefined): boolean {
  return !!format && supportedCertificateFormats.includes(format);
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

  return certificate;
}

function getFormat(certificate: DestinationCertificate): string | undefined {
  return last(certificate.name.split('.'));
}

function validateFormat(certificate: DestinationCertificate) {
  const format = getFormat(certificate);
  if (!isSupportedFormat(format)) {
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
}

/**
 * @internal
 * See https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener for details on the possible options
 */
function createAgent(
  destination: HttpDestination,
  options: https.AgentOptions
): HttpAgentConfig | HttpsAgentConfig {
  return getProtocolOrDefault(destination) === 'https'
    ? { httpsAgent: new https.Agent(options) }
    : { httpAgent: new http.Agent(options) };
}

/**
 * Builds part of the request config containing the URL and if needed proxy agents or normal http agents.
 * Considers the `no_proxy` environment variable together with the `targetUri`.
 * @internal
 * @param targetUri - Used as baseURL in request config.
 * @returns HttpRequestConfig containing baseUrl and http(s) agents.
 */
export async function urlAndAgent(targetUri: string): Promise<{
  baseURL: string;
  proxy?: BasicProxyConfiguration | false;
  httpAgent?: http.Agent;
  httpsAgent?: http.Agent;
}> {
  let destination: HttpDestination = { url: targetUri, proxyType: 'Internet' };
  if (proxyStrategy(destination) === 'internet') {
    destination = addProxyConfigurationInternet(destination);
  }
  return {
    baseURL: destination.url,
    ...(await getAgentConfigAsync(destination)),
    proxy: getProxyConfig(destination)
  };
}
