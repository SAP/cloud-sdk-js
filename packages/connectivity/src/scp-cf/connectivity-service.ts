import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import { Protocol } from './protocol';
import {
  ProxyConfiguration,
  ProxyConfigurationHeaders
} from './connectivity-service-types';
import {
  AuthenticationType,
  Destination
} from './destination/destination-service-types';
import { getServiceList } from './environment-accessor';
import { Service } from './environment-accessor-types';
import { serviceToken } from './token-accessor';
import { isUserToken, JwtPair } from './jwt';

const logger = createLogger({
  package: 'core',
  messageContext: 'connectivity-service'
});

/**
 * @internal
 * @param destination
 * @param jwt
 */
export async function addProxyConfigurationOnPrem(
  destination: Destination,
  jwt?: JwtPair
): Promise<Destination> {
  if (
    destination.authentication === 'PrincipalPropagation' &&
    !isUserToken(jwt)
  ) {
    throw new Error('For principal propagation a user JWT is needed.');
  }

  const proxyConfiguration: ProxyConfiguration = {
    ...proxyHostAndPort(),
    headers: { ...(await proxyHeaders(destination.authentication, jwt?.encoded)) }
  };
  return { ...destination, proxyConfiguration };
}

interface HostAndPort {
  host: string;
  port: number;
  protocol: Protocol.HTTP;
}

/**
 * @internal
 */
export function proxyHostAndPort(): HostAndPort {
  const service = readConnectivityServiceBinding();
  return {
    host: service.credentials.onpremise_proxy_host,
    port:
      service.credentials.onpremise_proxy_http_port ||
      service.credentials.onpremise_proxy_port,
    protocol: Protocol.HTTP
  };
}

function readConnectivityServiceBinding(): Service {
  const serviceBindings = getServiceList('connectivity');

  if (!serviceBindings.length) {
    throw new Error(
      'No binding to a connectivity service found! Please make sure to bind an instance of the connectivity service to your app if you want to connect to on-premise destinations.'
    );
  }

  return serviceBindings[0];
}

async function proxyHeaders(
  authenticationType: AuthenticationType | undefined,
  jwt?: string
): Promise<ProxyConfigurationHeaders> {
  const proxyAuthHeader = await proxyAuthorizationHeader(jwt);
  const sapConnectivityHeader = sapConnectivityAuthenticationHeader(
    authenticationType,
    jwt
  );
  return {
    ...proxyAuthHeader,
    ...sapConnectivityHeader
  };
}

async function proxyAuthorizationHeader(
  userJwt?
): Promise<{ 'Proxy-Authorization': string }> {
  try {
    const connServiceBinding = readConnectivityServiceBinding();
    const token = await serviceToken(connServiceBinding, { userJwt });
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
