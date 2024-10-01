import { URL } from 'node:url';
import { createLogger, sanitizeRecord } from '@sap-cloud-sdk/util';
import { getProtocol } from '../protocol';
import { basicHeader } from '../authorization-header';
import { getProtocolOrDefault } from '../get-protocol';
import { isHttpDestination } from './destination-service-types';
import type { Destination, HttpDestination } from './destination-service-types';
import type {
  BasicProxyConfiguration,
  ProxyConfiguration
} from '../connectivity-service-types';
import type { Protocol } from '../protocol';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'proxy-util'
});

type ProxyStrategy = 'no-proxy' | 'on-premise' | 'internet' | 'private-link';

/**
 * @internal
 * Determines the proxy strategy. If the 'no_proxy' env variable is set, the `ProxyConfiguration` in the destination is omitted.
 * For the 'on-premise' and 'internet' proxy strategies the connectivity service or environment variables are checked to fill the `ProxyConfiguration`.
 * @param destination - Destination to derive the proxy strategy from.
 * @returns The proxy strategy for the given destination.
 */
export function proxyStrategy(destination: Destination): ProxyStrategy {
  if (destination.proxyType === 'OnPremise') {
    logger.debug(
      'OnPrem destination proxy settings from connectivity service will be used.'
    );
    return 'on-premise';
  }

  if (destination.proxyType === 'PrivateLink') {
    logger.debug(
      'PrivateLink destination proxy settings will be used. This is not supported in local/CI/CD environments.'
    );
    return 'private-link';
  }

  if (isHttpDestination(destination)) {
    const destinationProtocol = getProtocolOrDefault(destination);
    return getProxyStrategyFromProxyEnvValue(
      destinationProtocol,
      destination.url
    );
  }
  return 'no-proxy';
}

function getProxyStrategyFromProxyEnvValue(
  protocol: Protocol,
  destinationUrl: string
): ProxyStrategy {
  if (!getProxyEnvValue(protocol)) {
    logger.debug(
      `Could not find proxy settings for ${protocol} in the environment variables - no proxy used.`
    );
    return 'no-proxy';
  }

  if (getNoProxyEnvValue().includes(destinationUrl)) {
    logger.debug(
      `Destination URL ${destinationUrl} is in no_proxy list: ${getNoProxyEnvValue()} - no proxy used.`
    );
    return 'no-proxy';
  }

  if (getProxyEnvValue(protocol)) {
    logger.debug(
      `Proxy settings for ${protocol} are found in environment variables.`
    );
    return 'internet';
  }
  return 'no-proxy';
}

function getProxyEnvValue(protocol: Protocol): string | undefined {
  const proxyEnvKey = protocol + '_proxy';
  const proxyEnvValue =
    process.env[proxyEnvKey.toLowerCase()] ||
    process.env[proxyEnvKey.toUpperCase()];
  logger.debug(
    `Tried to read ${proxyEnvKey.toLowerCase()} or ${proxyEnvKey.toUpperCase()} from the environment variables. Value is ${proxyEnvValue}.`
  );

  return proxyEnvValue || undefined;
}

function getNoProxyEnvValue(): string[] {
  const noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;

  if (!noProxyEnv) {
    return [];
  }

  const split = noProxyEnv.split(',').map(s => s.trim());
  if (split.find(s => s.includes('*'))) {
    logger.warn(
      `The no_proxy env contains a wildcard ${noProxyEnv}, which is currently not supported`
    );
  }
  return split;
}

function getPort(url: URL): number {
  if (url.port) {
    return parseInt(url.port);
  }
  return url.protocol === 'https:' ? 443 : 80;
}

function getOriginalProtocol(href: string): string | undefined {
  const test = href.match(/^[\w.-]+:\/\//);
  return test ? test[0].slice(0, -2) : undefined;
}

function sanitizeUrl(href: string): string {
  const protocol = getOriginalProtocol(href);

  if (!protocol) {
    logger.debug('No protocol specified, using "http:".');
    return `http://${href}`;
  }
  return href;
}

function validateUrl(url: URL): void {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error(`Unsupported protocol "${url.protocol}".`);
  }

  if (url.protocol === 'https:') {
    logger.debug(
      'Using protocol "https:" to connect to a proxy. This is unusual but possible.'
    );
  }

  if (url.username && !url.password) {
    throw new Error('Password missing.');
  }
}

/**
 * Parses the environment variable for the web proxy and extracts the values considering defaults like http for the protocol and 80 or 443 for the port.
 * The general pattern to be parsed is `protocol://user:password@host:port`, where everything besides the host is optional.
 * Special characters in the user and password need to be percent encoded.
 * @param proxyEnvValue - Environment variable which is parsed.
 * @returns Configuration with default values or `undefined` if the parsing failed.
 */
export function parseProxyEnv(
  proxyEnvValue: string
): ProxyConfiguration | undefined {
  const href = sanitizeUrl(proxyEnvValue);

  try {
    const url = new URL(href);
    validateUrl(url);

    const proxyConfig: ProxyConfiguration = {
      host: url.hostname,
      protocol: getProtocol(url.protocol)!,
      port: getPort(url)
    };

    if (url.username && url.password) {
      proxyConfig.headers = {
        'Proxy-Authorization': basicHeader(
          decodeURIComponent(url.username),
          decodeURIComponent(url.password)
        )
      };
    }

    if (proxyConfig) {
      const loggableConfig = {
        ...proxyConfig,
        headers: sanitizeRecord(
          proxyConfig.headers || {},
          'Authorization header present. Not logged for security reasons.'
        )
      };

      logger.debug(
        `Used Proxy Configuration: ${JSON.stringify(loggableConfig, null, 2)}.`
      );
    }

    return proxyConfig;
  } catch (err) {
    logger.warn(
      `Could not parse proxy configuration from environment variable. Reason: ${err.message}`
    );
    return undefined;
  }
}

/**
 * Adds the proxy configuration to a destination based on web proxies defined in environment variables. See {@link ProxyConfiguration} and {@link proxyStrategy} for details.
 * @param destination - to which the proxy configuration is added.
 * @returns Destination containing the configuration for web proxy.
 * @internal
 */
export function addProxyConfigurationInternet(
  destination: HttpDestination
): HttpDestination {
  const proxyEnvValue = getProxyEnvValue(getProtocolOrDefault(destination));
  if (proxyEnvValue) {
    return {
      ...destination,
      proxyConfiguration:
        parseProxyEnv(proxyEnvValue) || destination.proxyConfiguration
    };
  }
  logger.warn(
    'Attempt to get proxy config from environment variables failed. At this point this should not happen - no proxy used.'
  );
  return { ...destination };
}

/**
 * Picks the the proxy config properties.
 * Note, that the protocol ('http' or 'https') is not related to the destinations' target system protocol and in most cases 'http'.
 * @param destination - Destination containing the proxy configuration.
 * @returns Reduced proxy configuration.
 * @internal
 */
export function getProxyConfig(
  destination: HttpDestination
): BasicProxyConfiguration | false {
  if (destination.proxyConfiguration) {
    const { host, protocol, port } = destination.proxyConfiguration;
    return { host, protocol, port };
  }
  return false;
}
