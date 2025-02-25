import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import { getServiceBindings } from './environment-accessor';
import { serviceToken } from './token-accessor';
import { decodeJwt } from './jwt';
import type { JwtPayload } from './jsonwebtoken-type';
import type { Protocol } from './protocol';
import type {
  ProxyConfiguration,
  ProxyConfigurationHeaders
} from './connectivity-service-types';
import type {
  AuthenticationType,
  Destination,
  SubscriberToken
} from './destination';
import type { Service } from './environment-accessor';

const logger = createLogger({
  package: 'connectivity',
  messageContext: 'connectivity-service'
});

/**
 * @internal
 * @param destination - Destination which is extended
 * @param subscriberToken - The user and service token
 * @returns Destination containing the proxy config
 */
export async function addProxyConfigurationOnPrem(
  destination: Destination,
  subscriberToken?: Required<SubscriberToken>
): Promise<Destination> {
  if (destination.type === 'MAIL') {
    return {
      ...destination,
      proxyConfiguration: await socksProxyHostAndPort(
        subscriberToken?.userJwt.decoded
      )
    };
  }

  // Get the proxy authorization token if it exists
  const proxyAuthorizationToken =
    destination.proxyConfiguration?.headers?.['Proxy-Authorization']?.match(
      /^Bearer (.+)/
    )?.[1];

  let proxyConfiguration: ProxyConfiguration;
  if (proxyAuthorizationToken) {
    // Expiration time is a `NumericDate` value (seconds since the epoch), see https://tools.ietf.org/html/rfc7519#section-2
    const exp = decodeJwt(proxyAuthorizationToken).exp;
    // If the token is not expired, use the existing headers
    if (exp && exp * 1000 > Date.now()) {
      proxyConfiguration = {
        ...httpProxyHostAndPort(),
        headers: destination.proxyConfiguration?.headers
      };
      return { ...destination, proxyConfiguration };
    }
  }

  // No token or token expired, get a new header
  proxyConfiguration = {
    ...httpProxyHostAndPort(),
    headers: {
      ...(await proxyHeaders(destination.authentication, subscriberToken))
    }
  };
  return { ...destination, proxyConfiguration };
}

interface HostAndPort {
  host: string;
  port: number;
  protocol: Protocol;
}

/**
 * @internal
 * @returns Proxy host and port
 */
export function httpProxyHostAndPort(): HostAndPort {
  const service = readConnectivityServiceBinding();
  return {
    host: service.credentials.onpremise_proxy_host,
    port:
      service.credentials.onpremise_proxy_http_port ||
      service.credentials.onpremise_proxy_port,
    protocol: 'http'
  };
}

/**
 * @internal
 * @param userJwt - The user JWT
 * @returns Socks Proxy Configuration
 */
export async function socksProxyHostAndPort(
  userJwt?: JwtPayload
): Promise<ProxyConfiguration> {
  const service = readConnectivityServiceBinding();
  const connectivityServiceToken = await serviceToken(service, {
    jwt: userJwt
  });
  return {
    host: service.credentials.onpremise_proxy_host,
    port: parseInt(service.credentials.onpremise_socks5_proxy_port),
    protocol: 'socks',
    'proxy-authorization': connectivityServiceToken
  };
}

function readConnectivityServiceBinding(): Service {
  const serviceBindings = getServiceBindings('connectivity');

  if (!serviceBindings.length) {
    throw new Error(
      'No binding to a connectivity service found! Please make sure to bind an instance of the connectivity service to your app if you want to connect to on-premise destinations.'
    );
  }

  return serviceBindings[0];
}

async function proxyHeaders(
  authenticationType: AuthenticationType | undefined,
  subscriberToken?: Required<SubscriberToken>
): Promise<ProxyConfigurationHeaders> {
  const proxyAuthHeader = await proxyAuthorizationHeader(
    subscriberToken?.serviceJwt.encoded
  );
  const sapConnectivityHeader = sapConnectivityAuthenticationHeader(
    authenticationType,
    subscriberToken?.userJwt.encoded
  );
  return {
    ...proxyAuthHeader,
    ...sapConnectivityHeader
  };
}

async function proxyAuthorizationHeader(
  jwt?: string
): Promise<{ 'Proxy-Authorization': string }> {
  try {
    const connServiceBinding = readConnectivityServiceBinding();
    const token = await serviceToken(connServiceBinding, { jwt });
    return { 'Proxy-Authorization': `Bearer ${token}` };
  } catch (error) {
    throw new ErrorWithCause(
      'Failed to add proxy authorization header - client credentials grant failed!',
      error
    );
  }
}

function sapConnectivityAuthenticationHeader(
  authenticationType: AuthenticationType | undefined,
  jwt?: string
): { 'SAP-Connectivity-Authentication'?: string } {
  if (authenticationType === 'PrincipalPropagation') {
    if (jwt) {
      return {
        'SAP-Connectivity-Authentication': `Bearer ${jwt}`
      };
    }
    throw new Error(
      `Unable to create "SAP-Connectivity-Authentication" header: no JWT found on the current request.
     Connecting to on-premise systems via principle propagation is not possible.`
    );
  }
  if (authenticationType === 'BasicAuthentication') {
    logger.warn(
      'You are connecting to an On-Premise system using basic authentication. For productive usage Principal propagation is recommended.'
    );
  }

  return {};
}
