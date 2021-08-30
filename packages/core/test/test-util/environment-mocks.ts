import {
  Protocol,
  ProxyConfiguration,
  Service,
  XsuaaServiceCredentials
} from '../../src';
import { publicKey } from './keys';

export enum TestTenants {
  PROVIDER = 'provider',
  SUBSCRIBER = 'subscriber',
  SUBSCRIBER_ONLY_ISS = 'subscriber-only-iss'
}

export const providerXsuaaUrl = `https://${TestTenants.PROVIDER}.example.com`;
export const providerXsuaaCertUrl = `https://${TestTenants.PROVIDER}.cert.example.com`;
export const subscriberXsuaaUrl = `https://${TestTenants.SUBSCRIBER}.example.com`;
export const onlyIssuerXsuaaUrl = `https://${TestTenants.SUBSCRIBER_ONLY_ISS}.example.com`;
export const destinationServiceUri = 'https://destination.example.com';

export const providerXsuaaClientCredentials = {
  url: providerXsuaaUrl
} as XsuaaServiceCredentials;

export const mockXsuaaBinding: Service = {
  plan: 'application',
  label: 'xsuaa',
  name: 'my-xsuaa',
  tags: ['xsuaa'],
  credentials: {
    url: providerXsuaaUrl,
    xsappname: 'app-name',
    clientid: 'clientid',
    clientsecret: 'clientsecret',
    verificationkey: publicKey,
    uaadomain: 'authentication.sap.hana.ondemand.com'
  }
};

export const mockDestinationServiceBinding: Service = {
  plan: 'lite',
  label: 'destination',
  name: 'my-destination',
  tags: ['destination', 'conn', 'connsvc'],
  credentials: {
    clientid: 'destinationClient',
    clientsecret: 'destinationSecret',
    uri: destinationServiceUri,
    url: providerXsuaaUrl
  }
};

export const mockDestinationServiceCertBinding: Service = {
  plan: 'lite',
  label: 'destination',
  name: 'my-destination',
  tags: ['destination', 'conn', 'connsvc'],
  credentials: {
    clientid: 'destinationClient',
    certificate: 'certificate',
    key: 'certificateKey',
    uri: destinationServiceUri,
    url: providerXsuaaUrl,
    certurl: providerXsuaaCertUrl
  }
};

export const mockedConnectivityServiceProxyConfig: ProxyConfiguration = {
  host: 'proxy.example.com',
  port: 12345,
  protocol: Protocol.HTTP
};

export const mockConnectivityServiceBinding: Service = {
  plan: 'application',
  label: 'connectivity',
  name: 'my-connectivity',
  tags: ['connectivity', 'conn', 'connsvc'],
  credentials: {
    clientid: 'clientid',
    clientsecret: 'clientsecret',
    onpremise_proxy_host: mockedConnectivityServiceProxyConfig.host,
    onpremise_proxy_port: mockedConnectivityServiceProxyConfig.port
  }
};

interface MockServiceBindings {
  xsuaa: Service[];
  destination: Service[];
  connectivity: Service[];
}

export function mockServiceBindings(mockWithCert = false): MockServiceBindings {
  const mockServiceEnv = {
    xsuaa: [mockXsuaaBinding],
    destination: [
      mockWithCert
        ? mockDestinationServiceCertBinding
        : mockDestinationServiceBinding
    ],
    connectivity: [mockConnectivityServiceBinding]
  };

  process.env['VCAP_SERVICES'] = JSON.stringify(mockServiceEnv);

  return mockServiceEnv;
}
