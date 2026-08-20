import { readFile } from 'node:fs/promises';
import http from 'node:http';
import https from 'node:https';
import * as jks from 'jks-js';
import { createLogger, last } from '@sap-cloud-sdk/util';
/* Careful the proxy imports cause circular dependencies if imported from scp directly */
/* eslint-disable import-x/no-internal-modules */
import { getProtocolOrDefault } from '../scp-cf/get-protocol';
import { decodeJwt, getTenantId, userId as getUserId } from '../scp-cf/jwt/jwt';
import { Cache, hashCacheKey } from '../scp-cf/cache';
import {
  addProxyConfigurationInternet,
  getProxyConfig,
  proxyStrategy
} from '../scp-cf/destination/http-proxy-util';
import { registerDestinationCache } from '../scp-cf/destination/register-destination-cache';
import type {
  Destination,
  DestinationCertificate,
  HttpDestination
} from '../scp-cf/destination';
import type { BasicProxyConfiguration } from '../scp-cf/connectivity-service-types';
/* eslint-enable import-x/no-internal-modules */
import type { HttpAgentConfig, HttpsAgentConfig } from './agent-config';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'http-agent'
});

/**
 * Returns a promise of the http or https-agent config depending on the destination URL.
 * If the destination contains a proxy configuration, the agent will be a proxy-agent.
 * If not it will be the default http-agent coming from node.
 * @param destination - Determining which kind of configuration is returned.
 * @returns A promise of the HTTP or HTTPS agent configuration.
 */
export async function getAgentConfig(
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
    !(mtlsIsEnabled(destination) || destination.mtlsKeyPair) &&
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

    if (
      getFormat(certificate) === 'jks' ||
      getFormat(certificate) === 'keystore'
    ) {
      const pemKeystore = jks.toPem(
        certBuffer,
        destination.keyStorePassword || ''
      );
      const aliases = Object.keys(pemKeystore);
      if (aliases.length === 0) {
        throw Error('No entries found in JKS keystore');
      }
      const alias = aliases[0];

      if (aliases.length > 1) {
        logger.debug(
          `JKS keystore contains ${aliases.length} aliases. ` +
            'Using the first one. ' +
            'If this is not the correct certificate, please use a JKS file with only one entry.'
        );
      }

      const entry = pemKeystore[alias];
      if (!entry.cert || !entry.key) {
        throw Error('Invalid JKS entry: missing cert or key');
      }
      return {
        cert: Buffer.from(entry.cert, 'utf8'),
        key: Buffer.from(entry.key, 'utf8')
      };
    }
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
  if (destination.mtlsKeyPair) {
    if (mtlsIsEnabled(destination)) {
      logger.warn(
        `Destination ${
          destination.name ? destination.name : ''
        } has both 'mtlsKeyPair' (used by IAS) and 'mtls' (to use certs from cf) enabled. The 'mtlsKeyPair' will be used.`
      );
    }

    return destination.mtlsKeyPair;
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
const supportedCertificateFormats = ['p12', 'pfx', 'pem', 'jks', 'keystore'];

function isSupportedFormat(format: string | undefined): boolean {
  return !!format && supportedCertificateFormats.includes(format);
}

function selectCertificate(destination: Destination): DestinationCertificate {
  const certificate = destination.certificates?.find(
    (c: DestinationCertificate) => c.name === destination.keyStoreName
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
      `The format of the provided certificate '${certificate.name}' is not supported. Supported formats are: ${supportedCertificateFormats.join(', ')}.`
    );
  }
}

/**
 * Cache for http(s) agents.
 * Exported for testing purposes only.
 * @internal
 */
export const agentCache = new Cache<HttpAgentConfig | HttpsAgentConfig>(
  3600000, // 1 hour
  100 // max 100 LRU-cached agents
);

/**
 * Default options for the http(s) agents.
 * @internal
 */
export const defaultAgentOptions: https.AgentOptions | http.AgentOptions = {
  keepAlive: true,
  timeout: 5000
};

/**
 * Builds a secret-free cache key input for the agent cache.
 * For non-OnPremise destinations the agent is fully defined by its protocol, TLS
 * options and optional `agentOptions` - auth headers are sent per request, so
 * sharing keep-alive sockets is safe.
 * For OnPremise destinations all keep-alive sockets are Cloud Connector tunnels
 * through the same connectivity proxy origin, bound to the subaccount, location
 * ID, target system and propagated principal of their first request. The key is
 * therefore scoped by all of these dimensions (derived from stable, non-secret
 * JWT claims). If any dimension cannot be derived, caching is skipped entirely
 * instead of risking cross-context socket reuse.
 * @param destination - Destination to derive the cache key dimensions from.
 * @param options - TLS/agent options that define the agent instance.
 * @returns A plain object to be hashed into the agent cache key, or `undefined` to skip caching.
 */
function getAgentCacheKeyInput(
  destination: HttpDestination,
  options: https.AgentOptions
): Record<string, unknown> | undefined {
  const protocol = getProtocolOrDefault(destination);
  const keyInput: Record<string, unknown> = {
    protocol,
    options,
    agentOptions: destination.agentOptions
  };

  if (destination.proxyType !== 'OnPremise') {
    return keyInput;
  }

  const proxyAuth = getProxyAuthCacheKey(destination);
  const principal = getPrincipalCacheKey(destination);

  if (
    // Without a subaccount scope tunnels could be reused across subaccounts.
    proxyAuth.status !== 'derived' ||
    // A present but unusable user token means we cannot scope the principal.
    principal.status === 'invalid' ||
    // PrincipalPropagation binds the Cloud Connector tunnel to the propagated
    // user. Without a stable userId we cannot derive a safe cache key and must
    // skip caching to avoid reusing a tunnel across principals.
    (destination.authentication === 'PrincipalPropagation' &&
      (principal.status !== 'derived' || !principal.scope.userId))
  ) {
    return undefined;
  }

  keyInput.cloudConnectorLocationId = destination.cloudConnectorLocationId;
  keyInput.proxyHost = destination.proxyConfiguration?.host;
  keyInput.proxyPort = destination.proxyConfiguration?.port;
  // destination.url is the base URL, so it is a stable cache-key source.
  keyInput.target = destination.url;
  keyInput.proxyAuth = proxyAuth.scope;
  // For all other OnPremise flows the principal is not strictly required, but
  // we still scope by full available principal information for better cache isolation.
  if (principal.status === 'derived') {
    keyInput.principal = principal.scope;
  }

  return keyInput;
}

/**
 * Outcome of deriving a cache key scope from an auth header.
 * - `derived`: a stable, non-secret scope could be extracted.
 * - `absent`: no auth header is present - no identity context to scope by.
 * - `invalid`: a header is present but cannot be reduced to stable claims, so no safe cache key can be built.
 * @template T - Type of the derived scope.
 */
type CacheScope<T> =
  | { status: 'derived'; scope: T }
  | { status: 'absent' }
  | { status: 'invalid' };

/**
 * Derives a stable subaccount scope from the `Proxy-Authorization` header, so
 * that keep-alive tunnels are not reused across subaccounts. The connectivity
 * service JWT is decoded and reduced to the stable, non-secret claims
 * `tenantId` (subaccount) and `clientId`, because the raw token rotates on
 * every refresh and must never be part of a cache key. `clientId` is taken
 * from that JWT rather than `destination.clientId`, because the JWT reflects
 * the assumed identity.
 * @param destination - Destination carrying the proxy configuration.
 * @returns The derivation outcome for the subaccount scope.
 */
function getProxyAuthCacheKey(
  destination: HttpDestination
): CacheScope<{ tenantId?: string; clientId?: string }> {
  const authHeader =
    destination.proxyConfiguration?.headers?.['Proxy-Authorization'];
  if (!authHeader) {
    return { status: 'absent' };
  }

  const bearerMatch = authHeader.match(/^Bearer (.+)$/i);
  if (!bearerMatch) {
    return { status: 'invalid' };
  }

  try {
    const decoded = decodeJwt(bearerMatch[1]);
    const tenantId = getTenantId(decoded);
    const clientId = decoded.clientid;
    if (!tenantId && !clientId) {
      return { status: 'invalid' };
    }
    return { status: 'derived', scope: { tenantId, clientId } };
  } catch {
    return { status: 'invalid' };
  }
}

/**
 * Derives a stable, non-secret identity scope for OnPremise destinations from
 * the propagated JWT. The raw token must not be part of the cache key, because
 * it is a secret and rotates on every refresh. `userId` and `tenantId` are
 * stable claims that scope the cache entry to a principal.
 * @param destination - Destination carrying the propagated principal JWT.
 * @returns The derivation outcome for the principal scope.
 */
function getPrincipalCacheKey(
  destination: HttpDestination
): CacheScope<{ userId?: string; tenantId?: string }> {
  const authHeader =
    destination.proxyConfiguration?.headers?.[
      'SAP-Connectivity-Authentication'
    ];
  if (!authHeader) {
    return { status: 'absent' };
  }

  const encoded = authHeader.replace(/^Bearer /i, '');
  try {
    const decoded = decodeJwt(encoded);
    const tenantId = getTenantId(decoded);
    const userId = getUserId(decoded);

    if (!tenantId && !userId) {
      return { status: 'invalid' };
    }

    return { status: 'derived', scope: { userId, tenantId } };
  } catch {
    return { status: 'invalid' };
  }
}

async function getAgentCacheKey(
  destination: HttpDestination,
  options: https.AgentOptions
): Promise<string | undefined> {
  const cacheKeyInput = getAgentCacheKeyInput(destination, options);
  // If the cache key is undefined, avoid caching the agent.
  if (!cacheKeyInput) {
    return undefined;
  }
  return hashCacheKey(cacheKeyInput);
}

function createAgentImpl(
  destination: HttpDestination,
  options: https.AgentOptions,
  willBeCached: boolean
): HttpAgentConfig | HttpsAgentConfig {
  const protocol = getProtocolOrDefault(destination);
  logger.debug(
    `Creating new ${protocol.toUpperCase()} agent for destination ${destination.name || '<unknown>'}`
  );
  const optionsWithDefaults = {
    ...defaultAgentOptions,
    // Disable keep-alive for agents that will not be cached,
    // as there will be no chance to reuse sockets.
    ...(!willBeCached ? { keepAlive: false } : {}),
    ...destination.agentOptions,
    ...options
  };
  return protocol === 'https'
    ? { httpsAgent: new https.Agent(optionsWithDefaults) }
    : { httpAgent: new http.Agent(optionsWithDefaults) };
}

/**
 * @internal
 * Agents are cached for up to one hour, but can be evicted earlier if more than 100 agents are created.
 * See https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener for details on the possible options
 */
async function createAgent(
  destination: HttpDestination,
  options: https.AgentOptions
): Promise<HttpAgentConfig | HttpsAgentConfig> {
  const cacheKey = await getAgentCacheKey(destination, options);

  if (!cacheKey) {
    logger.info(
      `Could not derive a cache key for destination ${destination.name || '<unknown>'}. Creating a new agent without caching.`
    );
    return createAgentImpl(destination, options, false);
  }
  return agentCache.getOrInsertComputed(cacheKey, () => ({
    entry: createAgentImpl(destination, options, true)
  }));
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
    ...(await getAgentConfig(destination)),
    proxy: getProxyConfig(destination)
  };
}
