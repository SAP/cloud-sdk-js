import { XsuaaServiceCredentials } from '@sap-cloud-sdk/connectivity/internal';
import {
  Protocol,
  ProxyConfiguration,
  Service
} from '@sap-cloud-sdk/connectivity';
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
    uaadomain: 'authentication.sap.hana.ondemand.com'
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
    url: providerXsuaaUrl
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
    certurl: providerXsuaaCertUrl
  }
};

export const connectivityProxyConfigMock: ProxyConfiguration = {
  host: 'proxy.example.com',
  port: 12345,
  protocol: Protocol.HTTP
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
    onpremise_proxy_port: connectivityProxyConfigMock.port
  }
};

export interface MockServiceBindings {
  xsuaa: Service[];
  destination: Service[];
  connectivity: Service[];
}

export function mockServiceBindings(
  options?: {
    mockDestinationBindingWithCert: boolean;
  },
  xsuaaBinding = true
): MockServiceBindings {
  const mockServiceEnv = {
    xsuaa: xsuaaBinding ? [xsuaaBindingMock] : [],
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
