import { createLogger, ErrorWithCause } from '@sap-cloud-sdk/util';
import { Protocol } from './protocol';
import { ProxyConfiguration } from './connectivity-service-types';
import { Destination } from './destination/destination-service-types';
import { EnvironmentAccessor } from './environment-accessor';
import { Service } from './environment-accessor-types';
import { serviceToken } from './token-accessor';

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
 *
 * @param destination - The destination to which the proxy configuration should be added.
 * @param jwt - The JWT of the current user.
 * @returns A promise resolving to the destination with the added proxy configuration.
 */
export function addProxyConfiguration(
  destination: Destination,
  jwt?: string
): Promise<Destination> {
  return Promise.resolve()
    .then(() => proxyHostAndPort())
    .then(hostAndPort => addHeaders(hostAndPort, jwt))
    .then(proxyConfiguration => ({
      ...destination,
      proxyConfiguration
    }));
}

export function addProxyConfigurationOnPrem(
  destination: Destination,
  jwt?: string
): Promise<Destination> {
  return addProxyConfiguration(destination, jwt);
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

function addHeaders(
  hostAndPort: HostAndPort,
  jwt?: string
): Promise<ProxyConfiguration> {
  const connServiceBinding = readConnectivityServiceBinding();

  return Promise.resolve()
    .then(() => proxyAuthorizationHeader(connServiceBinding, jwt))
    .then(proxyAuthHeader => ({
      ...proxyAuthHeader,
      ...sapConnectivityAuthenticationHeader(jwt)
    }))
    .then(
      headers =>
        ({
          ...hostAndPort,
          headers
        } as ProxyConfiguration)
    );
}

function proxyAuthorizationHeader(
  connectivityServiceBinding: Service,
  userJwt?
): Promise<Record<string, string>> {
  return serviceToken(connectivityServiceBinding, { userJwt })
    .then(token => ({
      'Proxy-Authorization': `Bearer ${token}`
    }))
    .catch(error => {
      throw new ErrorWithCause(
        'Failed to add proxy authorization header - client credentials grant failed!',
        error
      );
    });
}

function sapConnectivityAuthenticationHeader(
  jwt?: string
): Record<string, string> {
  if (jwt) {
    return {
      'SAP-Connectivity-Authentication': `Bearer ${jwt}`
    };
  }
  logger.warn(
    `Unable to create "SAP-Connectivity-Authentication" header: no JWT found on the current request.
    Continuing without header. Connecting to on-premise systems may not be possible.`
  );
  return {};
}
