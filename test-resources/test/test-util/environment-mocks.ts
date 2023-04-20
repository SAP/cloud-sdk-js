import { XsuaaServiceCredentials } from '@sap-cloud-sdk/connectivity/internal';
import { ProxyConfiguration, Service } from '@sap-cloud-sdk/connectivity';
import { publicKey } from './keys';

export const testTenants = {
  provider: 'provider',
  subscriber: 'subscriber',
  subscriberOnlyIss: 'subscriber-only-iss'
};

export const providerXsuaaUrl = `https://${testTenants.provider}.example.com`;
export const providerXsuaaCertUrl = `https://${testTenants.provider}.cert.example.com`;
export const subscriberXsuaaUrl = `https://${testTenants.subscriber}.example.com`;
export const onlyIssuerXsuaaUrl = `https://${testTenants.subscriberOnlyIss}.example.com`;
export const destinationServiceUri = 'https://destination.example.com';

const uaaDomain = 'authentication.sap.hana.ondemand.com';

export const providerXsuaaClientCredentials = {
  url: providerXsuaaUrl
} as XsuaaServiceCredentials;

export const xsuaaBindingMock: Service = {
  plan: 'application',
  label: 'xsuaa',
  name: 'my-xsuaa',
  tags: ['xsuaa'],
  credentials: {
    url: providerXsuaaUrl,
    xsappname: 'xsapp-myapp!123',
    clientid: 'clientid',
    clientsecret: 'clientsecret',
    verificationkey: publicKey,
    uaadomain: uaaDomain,
    subaccountid: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
    tenantid: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
    zoneid: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24'
  }
};

export const destinationBindingClientSecretMock: Service = {
  plan: 'lite',
  label: 'destination',
  name: 'my-destination',
  tags: ['destination', 'conn', 'connsvc'],
  credentials: {
    clientid: 'destinationClient',
    clientsecret: 'destinationSecret',
    uri: destinationServiceUri,
    url: providerXsuaaUrl,
    uaadomain: uaaDomain
  }
};

export const destinationBindingCertMock: Service = {
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
    certurl: providerXsuaaCertUrl,
    uaadomain: uaaDomain
  }
};

export const connectivityProxyConfigMock: ProxyConfiguration = {
  host: 'proxy.example.com',
  port: 12345,
  protocol: 'http'
};

export const connectivitySocksProxyConfigMock: ProxyConfiguration = {
  host: 'proxy.example.com',
  port: 54321,
  protocol: 'socks'
};

export const connectivityBindingMock: Service = {
  plan: 'application',
  label: 'connectivity',
  name: 'my-connectivity',
  tags: ['connectivity', 'conn', 'connsvc'],
  credentials: {
    clientid: 'clientid',
    clientsecret: 'clientsecret',
    onpremise_proxy_host: connectivityProxyConfigMock.host,
    onpremise_proxy_port: connectivityProxyConfigMock.port,
    onpremise_socks5_proxy_port: connectivitySocksProxyConfigMock.port
  }
};

export interface MockServiceBindings {
  xsuaa: Service[];
  destination: Service[];
  connectivity: Service[];
}

export function mockServiceBindings(options?: {
  mockDestinationBindingWithCert?: boolean;
  xsuaaBinding?: boolean;
}): MockServiceBindings {
  options = { xsuaaBinding: true, ...options };
  const mockServiceEnv = {
    xsuaa: options.xsuaaBinding ? [xsuaaBindingMock] : [],
    destination: [
      options?.mockDestinationBindingWithCert
        ? destinationBindingCertMock
        : destinationBindingClientSecretMock
    ],
    connectivity: [connectivityBindingMock]
  };

  process.env['VCAP_SERVICES'] = JSON.stringify(mockServiceEnv);

  return mockServiceEnv;
}
