import { createServer } from 'https';
import { promisify } from 'util';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';
import type {
  DestinationCertificate,
  HttpDestination
} from '@sap-cloud-sdk/connectivity';
import type { Server } from 'https';

describe('createAgent', () => {
  let server: Server = undefined as any;
  const port = 8088;
  // Certificate creation guide: https://nodejs.org/en/knowledge/cryptography/how-to-use-the-tls-module/
  const privateCert = `-----BEGIN PRIVATE KEY-----
MC4CAQAwBQYDK2VwBCIEIBKb6GgWb1FjhJO3j8zQ6uOlybt3oRfgkO4HY708xjYL
-----END PRIVATE KEY-----`;

  const publicCert = `-----BEGIN CERTIFICATE-----
MIIBWzCCAQ2gAwIBAgIUQ0ilPWrU3FuE5zLVZJdiQjzEglAwBQYDK2VwMBQxEjAQ
BgNVBAMMCWxvY2FsaG9zdDAgFw0yNjA0MDgxNDU4MTZaGA8yMTI2MDMxNTE0NTgx
NlowFDESMBAGA1UEAwwJbG9jYWxob3N0MCowBQYDK2VwAyEAy13ifK7Xdx1lSMpz
y5aldxY0bd50JI3wdCSfKyeF1HejbzBtMB0GA1UdDgQWBBSedm/57tmWHEELl+wH
9p5dHGX9gDAfBgNVHSMEGDAWgBSedm/57tmWHEELl+wH9p5dHGX9gDAPBgNVHRMB
Af8EBTADAQH/MBoGA1UdEQQTMBGHBH8AAAGCCWxvY2FsaG9zdDAFBgMrZXADQQBQ
oCVwUyWIRvlspqA03iULge4pyizZ14E9ddDomcfG2pqlp/iYFjjpkBNzycaSmvOg
ADuX0HRp/iJSx+SLb/IC
-----END CERTIFICATE-----`;

  const destinationCertificate: DestinationCertificate = {
    name: 'server-public-cert.pem',
    content: Buffer.from(publicCert).toString('base64'),
    type: 'CERTIFICATE'
  };

  beforeAll(() => {
    const options = {
      key: privateCert,
      cert: publicCert
    };

    server = createServer(options, function (req, res) {
      res.writeHead(200);
      res.end('Hello World.');
    }).listen(port);
  });

  afterAll(async () =>
    promisify((callBack: (err, val) => void) =>
      server.close(err => callBack(err, undefined))
    )()
  );

  describe('trust', () => {
    it('fails for a server using self-signed certificate if the trustStore is not set.', async () => {
      const destination: HttpDestination = {
        url: `https://localhost:${port}`
      };

      await expect(
        executeHttpRequest(destination, { method: 'get' })
      ).rejects.toThrow('self-signed certificate');
    });

    it('resolves for a server using self-signed certificate if trustAll is set.', async () => {
      const destination: HttpDestination = {
        url: `https://localhost:${port}`,
        isTrustingAllCertificates: true
      };

      const response = await executeHttpRequest(destination, { method: 'get' });
      expect(response.data).toBe('Hello World.');
    });

    it('resolves for a server using self-signed certificate if the trustStore is set.', async () => {
      const destination: HttpDestination = {
        url: `https://localhost:${port}`,
        trustStoreCertificate: destinationCertificate
      };

      const response = await executeHttpRequest(destination, { method: 'get' });
      expect(response.data).toBe('Hello World.');
    });
  });
});
