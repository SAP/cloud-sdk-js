import { AgentOptions } from 'https';
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
 * For onPremProxy or internetProxy the connectivy service or enviroment variables are checked to fill the [[ProxyConfiguration]].
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

const addProtocol = (groups: any) => (
  proxyConfiguration: Partial<ProxyConfiguration> | undefined
) => {
  if (!proxyConfiguration) {
    return;
  }

  const copy = { ...proxyConfiguration };
  if (!groups.protocol) {
    copy.protocol = Protocol.HTTP;
    logger.info(
      'Protocol not specified in proxy environment value. Http used as fallback.'
    );
    return copy;
  }

  copy.protocol = Protocol.of(groups.protocol)!;
  if (!copy.protocol) {
    logger.warn(
      `Unsupported protocol requested in environment variable: ${groups.protocol}. Supported values are http and https - no proxy used.`
    );
    return undefined;
  }
  if (copy.protocol === Protocol.HTTPS) {
    logger.info(
      `You are using https to connect to a proxy" ${proxyConfiguration} - this is unusual but possible.`
    );
  }

  return copy;
};

const addPort = (groups: any) => (
  proxyConfiguration: Partial<ProxyConfiguration> | undefined
) => {
  if (!proxyConfiguration) {
    return;
  }

  const copy = { ...proxyConfiguration };
  if (groups.port) {
    if (groups.port.match(/[\D]/)) {
      logger.warn(
        'Given port in proxy env variable is not an integer - no proxy used.'
      );
      return undefined;
    }
    copy.port = parseInt(groups.port);
    return copy;
  }

  const fallBackPort =
    proxyConfiguration.protocol === Protocol.HTTPS ? 443 : 80;
  copy.port = fallBackPort;
  logger.info(
    `Port not specified in proxy environment value. ${fallBackPort} used as fallback.`
  );
  return copy;
};

const addAuthHeaders = (groups: any) => (
  proxyConfiguration: Partial<ProxyConfiguration> | undefined
) => {
  if (!proxyConfiguration) {
    return;
  }
  const copy = { ...proxyConfiguration };
  if (!groups.user || !groups.pwd) {
    logger.debug(
      'No user and password given in proxy environment value. Nothing added to header.'
    );
    return copy;
  }

  if (groups.user.match(/[^\w%]/) || groups.pwd.match(/[^\w%]/)) {
    logger.warn(
      'Username:Password in proxy environment variable contains special characters like [@/:]. Use percent-encoding to mask them - no Proxy used'
    );
    return undefined;
  }

  const userDecoded = decodeURIComponent(groups.user);
  const pwdDecoded = decodeURIComponent(groups.pwd);
  copy.headers = {
    'Proxy-Authorization': basicHeader(userDecoded, pwdDecoded)
  };
  logger.info(
    'Username and password added to authorization of the proxy configuration.'
  );
  return copy;
};

const addHost = (groups: any) => (
  proxyConfiguration: Partial<ProxyConfiguration>
) => {
  if (groups.host) {
    proxyConfiguration.host = groups.host;
    return proxyConfiguration;
  }

  logger.warn('Could not extract host from proxy env. - no proxy used');
  return;
};

/**
 * Parses the environment variable for the web proxy and extracts the values considering defaults like http for the protocol and 80 or 443 for the port.
 * The general pattern to be parsed is protocol://user:password@host:port, where everything besides the host is optional.
 * Special characters in the user and password need to be percent encoded.
 * @param proxyEnvValue - Environment variable which is parsed
 * @returns Configuration with default values or undefined if the parsing failed.
 */
export function parseProxyEnv(
  proxyEnvValue: string
): ProxyConfiguration | undefined {
  const regex = /(?<protocolWithDelimiter>(?<protocol>^.+):\/\/)?(?<userPwdWithDelimeter>(?<user>.+):(?<pwd>.+)@)?(?<hostAndPort>(?<host>[\w.]+):?(?<port>.+)?)/;
  const parsed = regex.exec(proxyEnvValue);

  if (parsed?.groups) {
    const { groups } = parsed;
    logger.debug(
      `Start to extract protocol, host and port from proxy env: ${proxyEnvValue}`
    );

    let proxyConfiguration = addHost(groups)({});
    proxyConfiguration = addProtocol(groups)(proxyConfiguration);
    proxyConfiguration = addPort(groups)(proxyConfiguration);
    proxyConfiguration = addAuthHeaders(groups)(proxyConfiguration);

    if (proxyConfiguration) {
      logger.debug(`Used Proxy Configuration:
     host:${proxyConfiguration!.host}
     protocol:${proxyConfiguration!.protocol}
     port:${proxyConfiguration!.port}
     headers: ${
       proxyConfiguration!.headers
         ? 'Authorization header present - Not logged for security reasons.'
         : 'No header present.'
     }.`);
    }
    return proxyConfiguration as ProxyConfiguration;
  }
  logger.warn(`Unable to extract proxy config from ${proxyEnvValue}.`);
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
 * @param options - Addiotional options for the agent
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

  if(options?.host){
    logger.warn(`The agent options you passed to the proxy agent creation contains the host "${options.host}" which will overwrite the host from the proxy config.`)
  }

  if(options?.port){
    logger.warn(`The agent options you passed to the proxy agent creation contains the port "${options.host}" which will overwrite the port from the proxy config.`)
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
