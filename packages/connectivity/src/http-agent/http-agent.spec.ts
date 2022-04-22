import { createServer, Server } from 'https';
import { resolve } from 'path';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { HttpProxyAgent } from 'http-proxy-agent';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import mock from 'mock-fs';
import {
  proxyAgent,
  Protocol,
  ProxyConfiguration,
  Destination
} from '../scp-cf';
import { connectivityProxyConfigMock } from '../../../../test-resources/test/test-util/environment-mocks';
import { getAgentConfig } from './http-agent';

describe('createAgent', () => {
  const baseDestination: Destination = {
    url: 'https://destination.example.com',
    authentication: 'NoAuthentication'
  };

  const proxyDestination: Destination = {
    ...baseDestination,
    proxyConfiguration: {
      ...connectivityProxyConfigMock,
      headers: {
        'Proxy-Authorization': 'Bearer jwt'
      }
    }
  };

  let server: Server = undefined as any;
  const port = 8088;
  // Certificate creation guide: https://nodejs.org/en/knowledge/cryptography/how-to-use-the-tls-module/
  const privateCert = `-----BEGIN RSA PRIVATE KEY-----
MIICWwIBAAKBgQC0mlPxxDF5Sdx2ZYLNuJPblkp7ca1JXyq5rHoZuXgvH0hoNWZE
sI+zR/jz5ednsveVgr6j2UhtnwJLAEI24Ev45HWrgdtvX03sWEp6DP08IexWlE4A
fCMAZyiWDWnGU0SIHxVVwqnS88BRmH9l45PZAzQwY7Ut/0S8i5le6MFvpwIDAQAB
AoGAAv1vGFiULRrg8IDbuoYsxHznfMW0BbvynCJT3ysn5zfQXhFMQSTfLCur3nXW
7+uRl8MTXukQ/uecBRva/MeX2l7kWtOw6byOpF+x4dxa2c/dU0SjRfrj/OLM+dYT
81RNGkMvtbAJ+TMhvT3xyqETIiq7SXm8VDxtSHsKOVhawnECQQDjgusUw2nWQz4W
TYDPLoYjYZ/mDqcHf9SNdu/gcv08fTlaQOeK2lcIwKAXHYTJCmxEzeHlzKYfGORH
trrEKvapAkEAyze2vdko0OpfX2u8jDWLHpkTLgBxP1JLhFCGi901F57UAmr+NB2G
grnD+9Rpv0g/PP6tkntLiAqZMRRVrDs1zwJAWqskEKRIG5G0vqKogOjjoFoZpU+V
lVGGXdJWiraI4YBuSN+w5w9YvC44Hr4u2wgCWfFK45AJbD85SrMx/1e38QJAaxoV
6cDFzjV3xmaVnJ+rjpjGjvwUs3a/7iAyiQwwqx4+Rnf1OapF9ifJrrOod/OvwInJ
GOZ6TFypmEBLVtZt6QJAZ86TXEUXm6wd+sAW2jtV2jfbHpflGWfaSFo8xBNtOn3z
QvyyECosaUlTxpCd6FfTU1bWebQo0JutAtk2EwW2Iw==
-----END RSA PRIVATE KEY-----`;

  const publicCert = `-----BEGIN CERTIFICATE-----
MIICODCCAaECFG1hsnYv75yQ6XUSWCWerF3iFLh4MA0GCSqGSIb3DQEBCwUAMFsx
CzAJBgNVBAYTAkRFMQswCQYDVQQIDAJERTEPMA0GA1UEBwwGQmVybGluMQwwCgYD
VQQKDANTQVAxDDAKBgNVBAsMA1NBUDESMBAGA1UEAwwJbG9jYWxob3N0MB4XDTIy
MDQyMjE0MTkyMloXDTIyMDUyMjE0MTkyMlowWzELMAkGA1UEBhMCREUxCzAJBgNV
BAgMAkRFMQ8wDQYDVQQHDAZCZXJsaW4xDDAKBgNVBAoMA1NBUDEMMAoGA1UECwwD
U0FQMRIwEAYDVQQDDAlsb2NhbGhvc3QwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJ
AoGBALSaU/HEMXlJ3HZlgs24k9uWSntxrUlfKrmsehm5eC8fSGg1ZkSwj7NH+PPl
52ey95WCvqPZSG2fAksAQjbgS/jkdauB229fTexYSnoM/Twh7FaUTgB8IwBnKJYN
acZTRIgfFVXCqdLzwFGYf2Xjk9kDNDBjtS3/RLyLmV7owW+nAgMBAAEwDQYJKoZI
hvcNAQELBQADgYEAX+IT+BlOfomW44iioviywdzS3yWFlgQk8wCeBZimopM4Ave1
iBKm9Nfjdjm7jYVqxJ8e8qizHlN7/jTF6G5wnywFe3HfFTqhA5OzV5Lyqrx1WdMs
T53TtQm+oQdUNanvJuk9VANEY+5ObG48gp/bhmskgn/RAPzDgknF0ar8QUU=
-----END CERTIFICATE-----`;

  beforeAll(() => {
    mock({
      [resolve('server-public-cert.pem')]: publicCert
    });

    const options = {
      key: privateCert,
      cert: publicCert
    };

    server = createServer(options, function (req, res) {
      res.writeHead(200);
      res.end('Hello World.');
    }).listen(port);
  });

  afterAll(async () => {
    mock.restore();
    // TODO promisify did not work, why?
    return new Promise((res, rej) => {
      server.close(err => {
        if (err) {
          rej(err);
        } else {
          res('server closed');
        }
      });
    });
  });

  const trustAllDestination: Destination = {
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

  it('should return a proxy-agent with the same protocol as the destination.', () => {
    const proxyConfiguration: ProxyConfiguration = {
      host: 'some.host.com',
      port: 4711,
      protocol: Protocol.HTTPS
    };
    const destHttpWithProxy: Destination = {
      url: 'http://example.com',
      proxyConfiguration
    };
    expect(proxyAgent(destHttpWithProxy)['httpAgent']).toStrictEqual(
      new HttpProxyAgent(proxyConfiguration)
    );

    proxyConfiguration.protocol = Protocol.HTTP;
    const destHttpsWithProxy: Destination = {
      url: 'https://example.com',
      proxyConfiguration
    };
    expect(proxyAgent(destHttpsWithProxy)['httpsAgent']).toStrictEqual(
      new HttpsProxyAgent(proxyConfiguration)
    );
  });

  it('fails for a server using self-signed certificate if the trustStore is not set.', async () => {
    const destination: Destination = {
      url: `https://localhost:${port}`
    };

    await expect(
      executeHttpRequest(destination, { method: 'get' })
    ).rejects.toThrow('self signed certificate');
  });

  it('resolves for a server using self-signed certificate if the trustStore is set.', async () => {
    const destination: Destination = {
      url: `https://localhost:${port}`,
      trustStoreLocation: 'server-public-cert.pem'
    };

    const response = await executeHttpRequest(destination, { method: 'get' });
    expect(response.data).toBe('Hello World.');
  });

  it('returns an agent with ca if trustStoreLocation is present.', async () => {
    const destination: Destination = {
      url: 'https://some.foo.bar',
      trustStoreLocation: 'server-public-cert.pem'
    };

    const expectedOptions = {
      rejectUnauthorized: true,
      ca: [publicCert]
    };

    expect(getAgentConfig(destination)['httpsAgent']['options']).toMatchObject(
      expectedOptions
    );
  });

  it('returns an agent with certificate and passphrase set for a destination with authentication type ClientCertificateAuthentication', () => {
    const destination: Destination = {
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

  it('throws an error if the format is not supported', () => {
    const destination: Destination = {
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
    const destination: Destination = {
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
    const destination: Destination = {
      url: 'https://example.com'
    };

    expect(getAgentConfig(destination)['httpsAgent']).toBeDefined();
  });

  it('returns an object with key "httpAgent" for destinations with protocol HTTP', () => {
    const destination: Destination = {
      url: 'http://example.com'
    };

    expect(getAgentConfig(destination)['httpAgent']).toBeDefined();
  });

  it('returns an object with key "httpsAgent" for destinations without protocol', () => {
    const destination: Destination = {
      url: 'example.com'
    };

    expect(getAgentConfig(destination)['httpsAgent']).toBeDefined();
  });

  it('throws an error for unsupported protocols', () => {
    const destination: Destination = {
      url: 'rpc://example.com'
    };

    expect(() => getAgentConfig(destination)).toThrow();
  });
});
