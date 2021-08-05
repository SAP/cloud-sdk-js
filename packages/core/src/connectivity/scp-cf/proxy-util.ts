import { AgentOptions } from 'https';
import { URL } from 'url';
import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { createLogger } from '@sap-cloud-sdk/util';
import { HttpAgentConfig, HttpsAgentConfig } from '../../http-client';
import { getProtocolOrDefault } from './get-protocol';
import { Destination } from './destination';
import { Protocol } from './protocol';
import { ProxyConfiguration } from './connectivity-service-types';
import { basicHeader } from './authorization-header';

const logger = createLogger({
  package: 'core',
  messageContext: 'proxy-util'
});

/**
 * Determines the proxy strategy. If noProxy is set the ProxyConfiguration in the destination is omitted.
 * For onPremProxy or internetProxy the connectivity service or environment variables are checked to fill the [[ProxyConfiguration]].
 * @param destination - from which the proxy strategy is derived.
 * @returns ProxyStrategy possible values are noProxy, internetProxy or onPremProxy.
 */
export function proxyStrategy(destination: Destination): ProxyStrategy {
  if (destination.proxyType === 'OnPremise') {
    logger.info(
      'OnPrem destination proxy settings from connectivity service will be used.'
    );
    return ProxyStrategy.ON_PREMISE_PROXY;
  }
  const destinationProtocol = getProtocolOrDefault(destination);
  if (!getProxyEnvValue(destinationProtocol)) {
    logger.info(
      `No Proxy settings for ${destinationProtocol} are found in environment variables - no proxy used`
    );
    return ProxyStrategy.NO_PROXY;
  }

  if (getNoProxyEnvValue().includes(destination.url)) {
    logger.info(
      `Destination URL ${
        destination.url
      } is in no_proxy list: ${getNoProxyEnvValue()} - no proxy used`
    );
    return ProxyStrategy.NO_PROXY;
  }

  if (getProxyEnvValue(destinationProtocol)) {
    logger.info(
      `Proxy settings for ${destinationProtocol} are found in environment variables.`
    );
    return ProxyStrategy.INTERNET_PROXY;
  }

  return ProxyStrategy.NO_PROXY;
}

function getProxyEnvValue(protocol: Protocol): string | undefined {
  const proxyEnvKey = protocol + '_proxy';
  const proxyEnvValue =
    process.env[proxyEnvKey.toLowerCase()] ||
    process.env[proxyEnvKey.toUpperCase()];
  logger.info(
    `Try to fetch ${proxyEnvKey.toLowerCase()} or ${proxyEnvKey.toUpperCase()} from the process env. Found value is ${proxyEnvValue}`
  );

  if (!proxyEnvValue) {
    return undefined;
  }

  return proxyEnvValue;
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
    logger.info(
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
 * @param proxyEnvValue - Environment variable which is parsed
 * @returns Configuration with default values or undefined if the parsing failed.
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
      protocol: Protocol.of(url.protocol)!,
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
        headers: proxyConfig.headers
          ? 'Authorization header present. Not logged for security reasons.'
          : 'No authorization header present.'
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
  }
}

/**
 * Adds the proxy configuration to a destination based on web proxies defined in environment variables. See [[ProxyConfiguration]] and [[proxyStrategy]] for details.
 * @param destination - to which the proxy configuration is added.
 * @returns Destination containing the configuration for web proxy.
 */
export function addProxyConfigurationInternet(destination: any): Destination {
  const proxyEnvValue = getProxyEnvValue(getProtocolOrDefault(destination));
  if (proxyEnvValue) {
    const proxyConfiguration = parseProxyEnv(proxyEnvValue);
    if (proxyConfiguration) {
      return { ...destination, proxyConfiguration };
    }
    return { ...destination };
  }
  logger.warn(
    'Attempt to get proxy config from environment variables failed. At this point this should not happen - no proxy used.'
  );
  return { ...destination };
}

/**
 * Builds the http(s)-agent config. Note that the proxy agent type like http or https is determined by the destination RUL protocol.
 * The protocol from the proxy is unrelated to this and in most cases http.
 * All additional options are forwarded to tls.connect and net.connect see https://github.com/TooTallNate/node-https-proxy-agent#new-httpsproxyagentobject-options
 *
 * @param destination - Destination containing the proxy configurations
 * @param options - Additional options for the agent
 * @returns The http(s)-agent containing the proxy configuration
 */
export function proxyAgent(
  destination: Destination,
  options?: AgentOptions
): HttpAgentConfig | HttpsAgentConfig {
  const targetProtocol = getProtocolOrDefault(destination);
  const proxyConfig = destination.proxyConfiguration;

  if (!proxyConfig) {
    throw new Error('Proxy config must not be undefined.');
  }

  if (options?.host) {
    logger.warn(
      `The agent options you passed to the proxy agent creation contains the host "${options.host}" which will overwrite the host from the proxy config.`
    );
  }

  if (options?.port) {
    logger.warn(
      `The agent options you passed to the proxy agent creation contains the port "${options.port}" which will overwrite the port from the proxy config.`
    );
  }

  const agentConfig = {
    host: proxyConfig.host,
    protocol: proxyConfig.protocol,
    port: proxyConfig.port,
    ...options
  };

  switch (targetProtocol) {
    case Protocol.HTTP:
      return {
        httpAgent: new HttpProxyAgent(agentConfig)
      };
    case Protocol.HTTPS:
      return {
        httpsAgent: new HttpsProxyAgent(agentConfig)
      };
  }
}

/**
 * Enum representing the different strategies for proxying request. Possible situations are "NO_PROXY", use the connectivity service proxy for On-Premise connection or a usual web proxy.
 * See also [[ProxyConfiguration]] for more details.
 */
export enum ProxyStrategy {
  NO_PROXY,
  ON_PREMISE_PROXY,
  INTERNET_PROXY
}
