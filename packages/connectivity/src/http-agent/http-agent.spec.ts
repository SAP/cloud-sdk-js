import { HttpProxyAgent } from 'http-proxy-agent';
import { HttpsProxyAgent } from 'https-proxy-agent';
import mock from 'mock-fs';
import { connectivityProxyConfigMock } from '../../../../test-resources/test/test-util/environment-mocks';
import {
  DestinationCertificate,
  ProxyConfiguration,
  proxyAgent
} from '../scp-cf';
import { HttpDestination } from '../scp-cf/destination';
import { getAgentConfig } from './http-agent';

describe('createAgent', () => {
  const baseDestination: HttpDestination = {
    url: 'https://destination.example.com',
    authentication: 'NoAuthentication'
  };

  const proxyDestination: HttpDestination = {
    ...baseDestination,
    proxyConfiguration: {
      ...connectivityProxyConfigMock,
      headers: {
        'Proxy-Authorization': 'Bearer jwt'
      }
    }
  };

  const trustAllDestination: HttpDestination = {
    ...baseDestination,
    isTrustingAllCertificates: true
  };

  it('returns the default agent if neither a proxy configuration is present nor TrustAll is set', () => {
    const actual = getAgentConfig(baseDestination)['httpsAgent'];
    expect(actual.options.rejectUnauthorized).toBe(true);
  });

  it('returns a proxy agent if there is a proxy setting on the destination', () => {
    expect(getAgentConfig(proxyDestination)['httpsAgent']).toEqual(
      new HttpsProxyAgent({
        ...connectivityProxyConfigMock,
        rejectUnauthorized: true
      })
    );
  });

  it('returns a trustAll agent if TrustAll is configured', () => {
    const actual = getAgentConfig(trustAllDestination)['httpsAgent'];
    expect(actual.options.rejectUnauthorized).toBeFalsy();
  });

  it('returns a HTTP agent if a destination with http protocol URL is provided', () => {
    const destHttp = { url: 'http://localhost' };
    expect(getAgentConfig(destHttp)['httpAgent']).toHaveProperty(
      'protocol',
      'http:'
    );
  });

  it('returns a HTTP agent when passing HTTP destination with isTrustAll', () => {
    const destHttp = {
      url: 'http://localhost',
      isTrustingAllCertificates: true
    };
    expect(getAgentConfig(destHttp)['httpAgent']).toHaveProperty(
      'protocol',
      'http:'
    );
  });

  it('returns a proxy agent if a proxy setting and TrustAll are BOTH configured', () => {
    expect(
      getAgentConfig({ ...proxyDestination, ...trustAllDestination })[
        'httpsAgent'
      ]
    ).toEqual(
      new HttpsProxyAgent({
        ...connectivityProxyConfigMock,
        rejectUnauthorized: false
      })
    );
  });

  it('should return a proxy-agent with the same protocol as the destination (https).', () => {
    const proxyConfiguration: ProxyConfiguration = {
      host: 'some.host.com',
      port: 4711,
      protocol: 'https'
    };
    const destHttpWithProxy: HttpDestination = {
      url: 'http://example.com',
      proxyConfiguration
    };
    expect(proxyAgent(destHttpWithProxy)['httpAgent']).toStrictEqual(
      new HttpProxyAgent(proxyConfiguration)
    );
  });

  it('should return a proxy-agent with the same protocol as the destination (http).', () => {
    const proxyConfiguration: ProxyConfiguration = {
      host: 'some.host.com',
      port: 4711,
      protocol: 'http'
    };
    const destHttpsWithProxy: HttpDestination = {
      url: 'https://example.com',
      proxyConfiguration
    };
    expect(proxyAgent(destHttpsWithProxy)['httpsAgent']).toStrictEqual(
      new HttpsProxyAgent(proxyConfiguration)
    );
  });

  it('returns an agent with ca if trustStoreLocation is present.', async () => {
    const destinationCertificate: DestinationCertificate = {
      name: 'server-public-cert.pem',
      content: Buffer.from('myCertContent').toString('base64'),
      type: 'CERTIFICATE'
    };

    const destination: HttpDestination = {
      url: 'https://some.foo.bar',
      trustStoreCertificate: destinationCertificate
    };

    const expectedOptions = {
      rejectUnauthorized: true,
      ca: ['myCertContent']
    };

    expect(getAgentConfig(destination)['httpsAgent']['options']).toMatchObject(
      expectedOptions
    );
  });

  it('returns an agent with certificate and passphrase set for a destination with authentication type ClientCertificateAuthentication', () => {
    const destination: HttpDestination = {
      url: 'https://destination.example.com',
      authentication: 'ClientCertificateAuthentication',
      keyStoreName: 'cert.p12',
      keyStorePassword: 'password',
      certificates: [
        {
          name: 'cert.p12',
          content: 'base64string',
          type: 'CERTIFICATE'
        }
      ]
    };

    const expectedOptions = {
      rejectUnauthorized: true,
      passphrase: 'password',
      pfx: Buffer.from('base64string', 'base64')
    };

    expect(getAgentConfig(destination)['httpsAgent']['options']).toMatchObject(
      expectedOptions
    );
  });

  it("does not return an agent for destinations with authentication types that have a certificate but don't use MTLS", () => {
    const destination: HttpDestination = {
      url: 'https://destination.example.com',
      authentication: 'OAuth2SAMLBearerAssertion',
      keyStoreName: 'cert.p12',
      keyStorePassword: 'password',
      certificates: [
        {
          name: 'cert.p12',
          content: 'base64string',
          type: 'CERTIFICATE'
        }
      ]
    };

    const expectedOptions = {
      rejectUnauthorized: true
    };

    expect(getAgentConfig(destination)['httpsAgent']['options']).toMatchObject(
      expectedOptions
    );
  });

  it('throws an error if the format is not supported', () => {
    const destination: HttpDestination = {
      url: 'https://destination.example.com',
      authentication: 'ClientCertificateAuthentication',
      keyStoreName: 'cert.jks',
      keyStorePassword: 'password',
      certificates: [
        {
          name: 'cert.jks',
          content: 'base64string',
          type: 'CERTIFICATE'
        }
      ]
    };

    expect(() => getAgentConfig(destination)).toThrowError(
      "The format of the provided certificate 'cert.jks' is not supported. Supported formats are: p12, pfx. You can convert Java Keystores (.jks, .keystore) into PKCS#12 keystores using the JVM's keytool CLI: keytool -importkeystore -srckeystore your-keystore.jks -destkeystore your-keystore.p12 -deststoretype pkcs12"
    );
  });

  it('throws an error if no certificate with the given name can be found', () => {
    const destination: HttpDestination = {
      url: 'https://destination.example.com',
      authentication: 'ClientCertificateAuthentication',
      keyStoreName: 'cert.pfx',
      keyStorePassword: 'password',
      certificates: [
        {
          name: 'nope',
          content: 'base64string',
          type: 'CERTIFICATE'
        }
      ]
    };

    expect(() => getAgentConfig(destination)).toThrowError(
      'No certificate with name cert.pfx could be found on the destination!'
    );
  });

  // Check coverage
});

describe('getAgentConfig', () => {
  it('returns an object with key "httpsAgent" for destinations with protocol HTTPS', () => {
    const destination: HttpDestination = {
      url: 'https://example.com'
    };

    expect(getAgentConfig(destination)['httpsAgent']).toBeDefined();
  });

  it('returns an object with key "httpAgent" for destinations with protocol HTTP', () => {
    const destination: HttpDestination = {
      url: 'http://example.com'
    };

    expect(getAgentConfig(destination)['httpAgent']).toBeDefined();
  });

  it('returns an object with key "httpsAgent" for destinations without protocol', () => {
    const destination: HttpDestination = {
      url: 'example.com'
    };

    expect(getAgentConfig(destination)['httpsAgent']).toBeDefined();
  });

  it('throws an error for unsupported protocols', () => {
    const destination: HttpDestination = {
      url: 'rpc://example.com'
    };

    expect(() => getAgentConfig(destination)).toThrow();
  });

  describe('mTLS', () => {
    describe('on CloudFoundry', () => {
      beforeAll(() => {
        mock({
          'cf-crypto': {
            'cf-cert': 'my-cert',
            'cf-key': 'my-key'
          }
        });

        process.env.CF_INSTANCE_CERT = 'cf-crypto/cf-cert';
        process.env.CF_INSTANCE_KEY = 'cf-crypto/cf-key';
      });

      afterAll(() => {
        mock.restore();

        delete process.env.CF_INSTANCE_CERT;
        delete process.env.CF_INSTANCE_KEY;
      });

      it('returns an object with key "httpsAgent" and mTLS options for destinations with inferMtlsCertificate option and environment variables are present', async () => {
        const destination: HttpDestination = {
          url: 'https://example.com',
          inferMtlsCertificate: true
        };
        const actual = getAgentConfig(destination)['httpsAgent'].options;

        expect(await actual.cert).toEqual('my-cert');
        expect(await actual.key).toEqual('my-key');
        expect(actual.pfx).not.toBeDefined();
        expect(actual.passphrase).not.toBeDefined();
      });
    });

    it('returns an object with key "httpsAgent" and mTLS options for destinations with inferMtlsCertificate option and environment variables are not present', async () => {
      const destination: HttpDestination = {
        url: 'https://example.com',
        inferMtlsCertificate: true
      };

      const actual = getAgentConfig(destination)['httpsAgent'].options;

      expect(await actual.cert).not.toBeDefined();
      expect(await actual.key).not.toBeDefined();
    });

    it('returns an object with key "httpsAgent" and mTLS options missing for destinations without inferMtlsCertificate option', async () => {
      const destination: HttpDestination = {
        url: 'https://example.com'
      };

      const actual = getAgentConfig(destination)['httpsAgent'].options;

      expect(await actual.cert).not.toBeDefined();
      expect(await actual.key).not.toBeDefined();
    });
  });
});
