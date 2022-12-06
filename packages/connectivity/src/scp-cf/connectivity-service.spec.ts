import {
  connectivityBindingMock,
  connectivityProxyConfigMock,
  connectivitySocksProxyConfigMock,
  mockServiceBindings
} from '../../../../test-resources/test/test-util/environment-mocks';
import {
  providerServiceToken,
  providerUserJwt
} from '../../../../test-resources/test/test-util/mocked-access-tokens';
import { mockServiceToken } from '../../../../test-resources/test/test-util/token-accessor-mocks';
import { mockClientCredentialsGrantCall } from '../../../../test-resources/test/test-util/xsuaa-service-mocks';
import {
  addProxyConfigurationOnPrem,
  httpProxyHostAndPort
} from './connectivity-service';
import { Protocol } from './protocol';
import { Destination } from './destination';

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
      proxyType: 'OnPremise',
      type: 'HTTP'
    };

    const expected: Destination = {
      url: 'https://example.com',
      proxyType: 'OnPremise',
      type: 'HTTP',
      proxyConfiguration: {
        ...connectivityProxyConfigMock,
        headers: {
          'Proxy-Authorization': `Bearer ${providerServiceToken}`
        }
      }
    };

    const withProxy = await addProxyConfigurationOnPrem(input);
    expect(withProxy).toEqual(expected);
  });

  it('also contains the "SAP-Connectivity-Authentication" header if a JWT is present', async () => {
    mockServiceBindings();
    mockServiceToken();

    const input: Destination = {
      url: 'https://example.com',
      proxyType: 'OnPremise',
      type: 'HTTP',
      authentication: 'PrincipalPropagation'
    };

    const expected: Destination = {
      url: 'https://example.com',
      proxyType: 'OnPremise',
      type: 'HTTP',
      authentication: 'PrincipalPropagation',
      proxyConfiguration: {
        ...connectivityProxyConfigMock,
        headers: {
          'Proxy-Authorization': `Bearer ${providerServiceToken}`,
          'SAP-Connectivity-Authentication': `Bearer ${providerUserJwt}`
        }
      }
    };

    const withProxy = await addProxyConfigurationOnPrem(input, {
      encoded: providerUserJwt,
      decoded: {}
    });
    expect(withProxy).toEqual(expected);
  });

  it('throws an error if there is no connectivity service bound', done => {
    addProxyConfigurationOnPrem({ url: '' }).catch(error => {
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
          credentials: connectivityBindingMock.credentials
        }
      ]
    });

    addProxyConfigurationOnPrem({ url: '' }).catch(error => {
      expect(error.message).toBe(
        'Failed to add proxy authorization header - client credentials grant failed!'
      );
      done();
    });
  });

  it('returns onpremise_proxy_http_port instead of onpremise_proxy_port if both are present', () => {
    connectivityBindingMock.credentials.onpremise_proxy_http_port = 54321;
    process.env.VCAP_SERVICES = JSON.stringify({
      connectivity: [
        {
          ...connectivityBindingMock
        }
      ]
    });

    const expected = {
      host: 'proxy.example.com',
      port: 54321,
      protocol: Protocol.HTTP
    };

    const hostAndPort = httpProxyHostAndPort();

    expect(hostAndPort).toEqual(expected);
  });

  it('throws an error if the client credentials grant fails', done => {
    mockServiceBindings();
    mockClientCredentialsGrantCall(
      'https://provider.example.com',
      { error: 'nope' },
      500,
      { clientid: 'clientid', clientsecret: 'clientsecret' }
    );

    addProxyConfigurationOnPrem({ url: '' }, undefined).catch(error => {
      expect(error.message).toContain(
        'Failed to add proxy authorization header'
      );
      done();
    });
  });

  describe('MAIL destination', () => {
    it('adds a proxy configuration containing at least the host, the port, and the "proxy-authorization"', async () => {
      mockServiceBindings();
      mockServiceToken();

      const input: Destination = {
        url: 'https://example.com',
        proxyType: 'OnPremise',
        type: 'MAIL'
      };

      const expected: Destination = {
        url: 'https://example.com',
        proxyType: 'OnPremise',
        type: 'MAIL',
        proxyConfiguration: {
          ...connectivitySocksProxyConfigMock,
          'proxy-authorization': providerServiceToken
        }
      };

      const withProxy = await addProxyConfigurationOnPrem(input);
      expect(withProxy).toEqual(expected);
    });
  });
});
