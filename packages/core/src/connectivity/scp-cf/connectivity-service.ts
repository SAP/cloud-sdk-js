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
import { EnvironmentAccessor } from './environment-accessor';
import { Service } from './environment-accessor-types';
import { serviceToken } from './token-accessor';
import { decodeJwt, isUserToken, JwtPair } from './jwt';

const logger = createLogger({
  package: 'core',
  messageContext: 'connectivity-service'
});

/**
 * Given a destination and a JWT (required for subscriber destinations), this function will add a proxy configuration to a destination.
 * See also [[ProxyConfiguration]].
 *
 * This function will reject if no connectivity service is bound, no XSUAA service with plan application is bound or the client credentials grant with the XSUAA service fails.
 *
 * @Deprecated Since v1.16.0. Use [[addProxyConfigurationOnPrem]] instead.
 * @param destination - The destination to which the proxy configuration should be added.
 * @param jwt - The JWT of the current user.
 * @returns A promise resolving to the destination with the added proxy configuration.
 */
export async function addProxyConfiguration(
  destination: Destination,
  jwt?: string
): Promise<Destination> {
  const proxyConfiguration: ProxyConfiguration = {
    ...proxyHostAndPort(),
    headers: { ...(await proxyHeaders(destination.authentication, jwt)) }
  };
  return { ...destination, proxyConfiguration };
}

// TODO: remove string argument in v2.0
export function addProxyConfigurationOnPrem(
  destination: Destination,
  jwt: string | JwtPair | undefined
): Promise<Destination> {
  const jwtPair =
    typeof jwt === 'string' ? { encoded: jwt, decoded: decodeJwt(jwt) } : jwt;
  if (
    destination.authentication === 'PrincipalPropagation' &&
    !isUserToken(jwtPair)
  ) {
    throw new Error('For principal propagation a user JWT is needed.');
  }

  return addProxyConfiguration(destination, jwtPair?.encoded);
}

interface HostAndPort {
  host: string;
  port: number;
  protocol: Protocol.HTTP;
}

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
  const serviceBindings = EnvironmentAccessor.getServiceList('connectivity');

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
