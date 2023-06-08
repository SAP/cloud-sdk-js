import { X509Certificate } from 'node:crypto';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { HttpProxyAgent } from 'http-proxy-agent';
import mock from 'mock-fs';
import { createLogger } from '@sap-cloud-sdk/util';
import { certAsString } from '@sap-cloud-sdk/test-util';
import {
  proxyAgent,
  ProxyConfiguration,
  DestinationCertificate
} from '../scp-cf';
import { connectivityProxyConfigMock } from '../../../../test-resources/test/test-util/environment-mocks';
import { HttpDestination } from '../scp-cf/destination';
import { registerDestinationCache } from '../scp-cf/destination/register-destination-cache';
import { getAgentConfigAsync } from './http-agent';

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

  it('returns the default agent if neither a proxy configuration is present nor TrustAll is set', async () => {
    const actual = (await getAgentConfigAsync(baseDestination))['httpsAgent'];
    expect(actual.options.rejectUnauthorized).toBe(true);
  });

  it('returns a proxy agent if there is a proxy setting on the destination', async () => {
    expect((await getAgentConfigAsync(proxyDestination))['httpsAgent']).toEqual(
      new HttpsProxyAgent({
        ...connectivityProxyConfigMock,
        rejectUnauthorized: true
      })
    );
  });

  it('returns a trustAll agent if TrustAll is configured', async () => {
    const actual = (await getAgentConfigAsync(trustAllDestination))[
      'httpsAgent'
    ];
    expect(actual.options.rejectUnauthorized).toBeFalsy();
  });

  it('returns a HTTP agent if a destination with http protocol URL is provided', async () => {
    const destHttp = { url: 'http://localhost' };
    expect((await getAgentConfigAsync(destHttp))['httpAgent']).toHaveProperty(
      'protocol',
      'http:'
    );
  });

  it('returns a HTTP agent when passing HTTP destination with isTrustAll', async () => {
    const destHttp = {
      url: 'http://localhost',
      isTrustingAllCertificates: true
    };
    expect((await getAgentConfigAsync(destHttp))['httpAgent']).toHaveProperty(
      'protocol',
      'http:'
    );
  });

  it('returns a proxy agent if a proxy setting and TrustAll are BOTH configured', async () => {
    expect(
      (
        await getAgentConfigAsync({
          ...proxyDestination,
          ...trustAllDestination
        })
      )['httpsAgent']
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

    expect(
      (await getAgentConfigAsync(destination))['httpsAgent']['options']
    ).toMatchObject(expectedOptions);
  });

  it('returns an agent with certificate and passphrase set for a destination with authentication type ClientCertificateAuthentication', async () => {
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

    expect(
      (await getAgentConfigAsync(destination))['httpsAgent']['options']
    ).toMatchObject(expectedOptions);
  });

  it("does not return an agent for destinations with authentication types that have a certificate but don't use MTLS", async () => {
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

    expect(
      (await getAgentConfigAsync(destination))['httpsAgent']['options']
    ).toMatchObject(expectedOptions);
  });

  it('throws an error if the format is not supported', async () => {
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

    expect(async () => getAgentConfigAsync(destination)).rejects.toThrowError(
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

    expect(async () => getAgentConfigAsync(destination)).rejects.toThrowError(
      'No certificate with name cert.pfx could be found on the destination!'
    );
  });

  // Check coverage
});

describe('getAgentConfigAsync', () => {
  it('returns an object with key "httpsAgent" for destinations with protocol HTTPS', async () => {
    const destination: HttpDestination = {
      url: 'https://example.com'
    };

    expect(
      (await getAgentConfigAsync(destination))['httpsAgent']
    ).toBeDefined();
  });

  it('returns an object with key "httpAgent" for destinations with protocol HTTP', async () => {
    const destination: HttpDestination = {
      url: 'http://example.com'
    };

    expect((await getAgentConfigAsync(destination))['httpAgent']).toBeDefined();
  });

  it('returns an object with key "httpsAgent" for destinations without protocol', async () => {
    const destination: HttpDestination = {
      url: 'example.com'
    };

    expect(
      (await getAgentConfigAsync(destination))['httpsAgent']
    ).toBeDefined();
  });

  it('throws an error for unsupported protocols', async () => {
    const destination: HttpDestination = {
      url: 'rpc://example.com'
    };

    expect(async () => getAgentConfigAsync(destination)).rejects.toThrow();
  });

  describe('mTLS', () => {
    describe('on CloudFoundry', () => {
      beforeAll(() => {
        mock({
          'cf-crypto': {
            'cf-cert': certAsString,
            'cf-key': 'my-key'
          }
        });
      });

      afterAll(() => {
        mock.restore();
      });

      afterEach(() => {
        delete process.env.CF_INSTANCE_CERT;
        delete process.env.CF_INSTANCE_KEY;
        registerDestinationCache.mtls.clear();
      });

      it('returns an object with key "httpsAgent" which includes mTLS options when mtls is set to true and env variables contain cert & key', async () => {
        process.env.CF_INSTANCE_CERT = 'cf-crypto/cf-cert';
        process.env.CF_INSTANCE_KEY = 'cf-crypto/cf-key';

        const destination: HttpDestination = {
          url: 'https://example.com',
          mtls: true
        };
        const actual = (await getAgentConfigAsync(destination))['httpsAgent']
          .options;

        expect(actual.cert).toEqual(certAsString);
        expect(actual.key).toEqual('my-key');
        expect(actual.pfx).not.toBeDefined();
        expect(actual.passphrase).not.toBeDefined();
      });

      it('returns an object with key "httpsAgent" which includes mTLS options when mtls is set to true, env variables contain cert & key and the cache has been used', async () => {
        process.env.CF_INSTANCE_CERT = 'cf-crypto/cf-cert';
        process.env.CF_INSTANCE_KEY = 'cf-crypto/cf-key';

        const currentTimeInMs = Date.now();
        const validCertTime = currentTimeInMs + 100000;
        jest
          .spyOn(X509Certificate.prototype, 'validTo', 'get')
          .mockImplementation(() => validCertTime.toString());

        const destination: HttpDestination = {
          url: 'https://example.com',
          mtls: true
        };
        registerDestinationCache.mtls.useMtlsCache = true;
        await registerDestinationCache.mtls.cacheMtlsOptions();
        const cacheSpy = jest.spyOn(
          registerDestinationCache.mtls,
          'retrieveMtlsOptionsFromCache'
        );

        const actual = (await getAgentConfigAsync(destination))['httpsAgent']
          .options;

        expect(actual.cert).toEqual(certAsString);
        expect(actual.key).toEqual('my-key');
        expect(actual.pfx).not.toBeDefined();
        expect(actual.passphrase).not.toBeDefined();
        expect(cacheSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('returns an object with key "httpsAgent" which is missing mTLS options when mtls is set to true but env variables do not include cert & key', async () => {
      const destination: HttpDestination = {
        url: 'https://example.com',
        mtls: true
      };
      const logger = createLogger('http-agent');
      const warnSpy = jest.spyOn(logger, 'warn');

      const actual = (await getAgentConfigAsync(destination))['httpsAgent']
        .options;

      expect(actual.cert).not.toBeDefined();
      expect(actual.key).not.toBeDefined();
      expect(warnSpy).toHaveBeenCalledTimes(1);

      warnSpy.mockRestore();
    });

    it('returns an object with key "httpsAgent" which is missing mTLS options if mtls is not set to true', async () => {
      const destination: HttpDestination = {
        url: 'https://example.com'
      };

      const actual = (await getAgentConfigAsync(destination))['httpsAgent']
        .options;

      expect(actual.cert).not.toBeDefined();
      expect(actual.key).not.toBeDefined();
    });
  });
});
