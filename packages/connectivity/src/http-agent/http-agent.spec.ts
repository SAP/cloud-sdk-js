import { X509Certificate } from 'node:crypto';
import mock from 'mock-fs';
import { createLogger } from '@sap-cloud-sdk/util';
import { registerDestinationCache } from '../scp-cf/destination/register-destination-cache';
import { certAsString } from '../../../../test-resources/test/test-util/test-certificate';
import { getAgentConfig } from './http-agent';
import type { HttpDestination } from '../scp-cf/destination';
import type { DestinationCertificate } from '../scp-cf';

describe('createAgent', () => {
  const baseDestination: HttpDestination = {
    url: 'https://destination.example.com',
    authentication: 'NoAuthentication'
  };

  const trustAllDestination: HttpDestination = {
    ...baseDestination,
    isTrustingAllCertificates: true
  };

  it('returns the default agent if TrustAll is not set', async () => {
    const agentConfig = (await getAgentConfig(baseDestination))['httpsAgent'];
    expect(agentConfig.options.rejectUnauthorized).toBe(true);
  });

  it('disables rejectUnauthorized agent if TrustAll is configured', async () => {
    const agentConfig = (await getAgentConfig(trustAllDestination))[
      'httpsAgent'
    ];
    expect(agentConfig.options.rejectUnauthorized).toBe(false);
  });

  it('returns a HTTP agent if a destination with http protocol URL is provided', async () => {
    const destHttp = { url: 'http://localhost' };
    expect((await getAgentConfig(destHttp))['httpAgent']).toHaveProperty(
      'protocol',
      'http:'
    );
  });

  it('returns a HTTP agent when passing HTTP destination with isTrustAll', async () => {
    const destHttp = {
      url: 'http://localhost',
      isTrustingAllCertificates: true
    };
    expect((await getAgentConfig(destHttp))['httpAgent']).toHaveProperty(
      'protocol',
      'http:'
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
      (await getAgentConfig(destination))['httpsAgent']['options']
    ).toMatchObject(expectedOptions);
  });

  it('returns an agent with pfx certificate and passphrase set for a destination with authentication type ClientCertificateAuthentication', async () => {
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
      (await getAgentConfig(destination))['httpsAgent']['options']
    ).toMatchObject(expectedOptions);
  });

  it('returns an agent with pfx certificate and no passphrase for authentication type ClientCertificateAuthentication', async () => {
    const destination: HttpDestination = {
      url: 'https://destination.example.com',
      authentication: 'ClientCertificateAuthentication',
      keyStoreName: 'cert.p12',
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
      pfx: Buffer.from('base64string', 'base64')
    };

    expect(
      (await getAgentConfig(destination))['httpsAgent']['options']
    ).toMatchObject(expectedOptions);
  });

  it('returns an agent with certificate, private key and passphrase set for a destination with authentication type ClientCertificateAuthentication and a PEM certificate', async () => {
    const destination: HttpDestination = {
      url: 'https://destination.example.com',
      authentication: 'ClientCertificateAuthentication',
      keyStoreName: 'cert.pem',
      keyStorePassword: 'password',
      certificates: [
        {
          name: 'cert.pem',
          content: 'base64string',
          type: 'CERTIFICATE'
        }
      ]
    };

    const expectedOptions = {
      rejectUnauthorized: true,
      passphrase: 'password',
      cert: Buffer.from('base64string', 'base64'),
      key: Buffer.from('base64string', 'base64')
    };

    expect(
      (await getAgentConfig(destination))['httpsAgent']['options']
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
      (await getAgentConfig(destination))['httpsAgent']['options']
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

    expect(async () => getAgentConfig(destination)).rejects.toThrow(
      "The format of the provided certificate 'cert.jks' is not supported. Supported formats are: p12, pfx, pem. You can convert Java Keystores (.jks, .keystore) into PKCS#12 keystores using the JVM's keytool CLI: keytool -importkeystore -srckeystore your-keystore.jks -destkeystore your-keystore.p12 -deststoretype pkcs12"
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

    expect(async () => getAgentConfig(destination)).rejects.toThrow(
      'No certificate with name cert.pfx could be found on the destination!'
    );
  });

  // Check coverage
});

describe('getAgentConfig', () => {
  it('returns an object with key "httpsAgent" for destinations with protocol HTTPS', async () => {
    const destination: HttpDestination = {
      url: 'https://example.com'
    };

    expect((await getAgentConfig(destination))['httpsAgent']).toBeDefined();
  });

  it('returns an object with key "httpAgent" for destinations with protocol HTTP', async () => {
    const destination: HttpDestination = {
      url: 'http://example.com'
    };

    expect((await getAgentConfig(destination))['httpAgent']).toBeDefined();
  });

  it('returns an object with key "httpsAgent" for destinations without protocol', async () => {
    const destination: HttpDestination = {
      url: 'example.com'
    };

    expect((await getAgentConfig(destination))['httpsAgent']).toBeDefined();
  });

  it('throws an error for unsupported protocols', async () => {
    const destination: HttpDestination = {
      url: 'rpc://example.com'
    };

    expect(async () => getAgentConfig(destination)).rejects.toThrow();
  });

  describe('mTLS', () => {
    describe('on CloudFoundry', () => {
      beforeEach(() => {
        mock({
          'cf-crypto': {
            'cf-cert': certAsString,
            'cf-key': 'my-key'
          }
        });
      });

      afterEach(() => {
        mock.restore();
      });

      afterEach(async () => {
        delete process.env.CF_INSTANCE_CERT;
        delete process.env.CF_INSTANCE_KEY;
        await registerDestinationCache.mtls.clear();
      });

      it('returns an object with key "httpsAgent" which includes mTLS options when mtls is set to true and env variables contain cert & key', async () => {
        process.env.CF_INSTANCE_CERT = 'cf-crypto/cf-cert';
        process.env.CF_INSTANCE_KEY = 'cf-crypto/cf-key';

        const destination: HttpDestination = {
          url: 'https://example.com',
          mtls: true
        };
        const actual = (await getAgentConfig(destination))['httpsAgent']
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

        const actual = (await getAgentConfig(destination))['httpsAgent']
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

      const actual = (await getAgentConfig(destination))['httpsAgent'].options;

      expect(actual.cert).not.toBeDefined();
      expect(actual.key).not.toBeDefined();
      expect(warnSpy).toHaveBeenCalledTimes(1);

      warnSpy.mockRestore();
    });

    it('returns an object with key "httpsAgent" which is missing mTLS options if mtls is not set to true', async () => {
      const destination: HttpDestination = {
        url: 'https://example.com'
      };

      const actual = (await getAgentConfig(destination))['httpsAgent'].options;

      expect(actual.cert).not.toBeDefined();
      expect(actual.key).not.toBeDefined();
    });
  });
});
