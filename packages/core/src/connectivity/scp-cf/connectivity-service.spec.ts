import {
  mockConnectivityServiceBinding,
  mockedConnectivityServiceProxyConfig,
  mockServiceBindings
} from '../../../test/test-util/environment-mocks';
import {
  providerServiceToken,
  providerUserJwt
} from '../../../test/test-util/mocked-access-tokens';
import { mockServiceToken } from '../../../test/test-util/token-accessor-mocks';
import { mockClientCredentialsGrantCall } from '../../../test/test-util/xsuaa-service-mocks';
import { Destination } from './destination';
import {
  addProxyConfiguration,
  proxyHostAndPort
} from './connectivity-service';
import { Protocol } from '.';

describe('connectivity-service', () => {
  afterEach(() => {
    delete process.env.VCAP_SERVICES;
    jest.restoreAllMocks();
  });

  it('adds a proxy configuration containing at least the host, the port, and the "Proxy-Authorization" header to a destination', async () => {
    mockServiceBindings();
    mockServiceToken();

    const input: Destination = {
      url: 'https://example.com',
      proxyType: 'OnPremise'
    };

    const expected: Destination = {
      url: 'https://example.com',
      proxyType: 'OnPremise',
      proxyConfiguration: {
        ...mockedConnectivityServiceProxyConfig,
        headers: {
          'Proxy-Authorization': `Bearer ${providerServiceToken}`
        }
      }
    };

    const withProxy = await addProxyConfiguration(input);
    expect(withProxy).toEqual(expected);
  });

  it('also contains the "SAP-Connectivity-Authentication" header if a JWT is present', async () => {
    mockServiceBindings();
    mockServiceToken();

    const input: Destination = {
      url: 'https://example.com',
      proxyType: 'OnPremise'
    };

    const expected: Destination = {
      url: 'https://example.com',
      proxyType: 'OnPremise',
      proxyConfiguration: {
        ...mockedConnectivityServiceProxyConfig,
        headers: {
          'Proxy-Authorization': `Bearer ${providerServiceToken}`,
          'SAP-Connectivity-Authentication': `Bearer ${providerUserJwt}`
        }
      }
    };

    const withProxy = await addProxyConfiguration(input, providerUserJwt);
    expect(withProxy).toEqual(expected);
  });

  it('throws an error if there is no connectivity service bound', done => {
    addProxyConfiguration({ url: '' }).catch(error => {
      expect(error.message).toContain('connectivity service');
      done();
    });
  });

  it('throws an error if there is no XSUAA service with plan "application" bound', done => {
    process.env.VCAP_SERVICES = JSON.stringify({
      connectivity: [
        {
          plan: 'lite',
          label: 'connectivity',
          name: 'my-connectivity',
          credentials: mockConnectivityServiceBinding.credentials
        }
      ]
    });

    addProxyConfiguration({ url: '' }).catch(error => {
      expect(error.message).toBe(
        'Failed to add proxy authorization header - client credentials grant failed!'
      );
      done();
    });
  });

  it('returns onpremise_proxy_http_port instead of onpremise_proxy_port if both are present', () => {
    mockConnectivityServiceBinding.credentials.onpremise_proxy_http_port = 54321;
    process.env.VCAP_SERVICES = JSON.stringify({
      connectivity: [
        {
          ...mockConnectivityServiceBinding
        }
      ]
    });

    const expected = {
      host: 'proxy.example.com',
      port: 54321,
      protocol: Protocol.HTTP
    };

    const hostAndPort = proxyHostAndPort();

    expect(hostAndPort).toEqual(expected);
  });

  it('throws an error if the client credentials grant fails', done => {
    mockServiceBindings();
    mockClientCredentialsGrantCall(
      'https://provider.example.com',
      { error: 'nope' },
      500,
      'clientid',
      'clientsecret'
    );

    addProxyConfiguration({ url: '' }).catch(error => {
      expect(error.message).toContain(
        'Failed to add proxy authorization header'
      );
      done();
    });
  });
});
