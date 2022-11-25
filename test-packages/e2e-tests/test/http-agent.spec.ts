import { createServer, Server } from 'https';
import { promisify } from 'util';
import {
  Destination,
  DestinationCertificate
} from '@sap-cloud-sdk/connectivity';
import { executeHttpRequest } from '@sap-cloud-sdk/http-client';

describe('createAgent', () => {
  let server: Server = undefined as any;
  const port = 8088;
  // Certificate creation guide: https://nodejs.org/en/knowledge/cryptography/how-to-use-the-tls-module/
  const privateCert = `-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQCdd0L1YNtatBq4Ao/anmlAGg0rWkoSVSvPbyAicDWZpr/QIS+n
PARLtbcJ/bCb2AGEu4hj3zDCmAjQsBWGNKHhlndE83vTfvDZid+dawxMglIeKJSx
n/4002eF+5uTjDlaBM18kYoQMv3LoEvl8hButp3oMNB7Ta50Y9tmcCkYdQIDAQAB
AoGAM/333ttPMiC7nbxC0VVyvRac+I6EXI9AuuofOx+/ou8a8Fa0zEwVwwXJ3QOl
t59XyQK+ovNDv0zBxF4PjVN9i2EaTQFBink74PnF2RY3WB6uuklRABpB9+Lmd5Ud
DQFXHH9nDpQ4bvwKUQJ84z0qCv8+XoDio9tdhhOUm4wNAOECQQDQuPs/opzFhsX0
wKebsfO3AsPs2rXC16d5al8Ii6abOLX+FXT7tT9i5WOgsSu9wRnrekK2jSzZq+UR
ukbaVvGdAkEAwSIZuSpu6/lFMR6wk8H0TkBsOhoyPt6e/gnB+y6o5k5tmZN2OIMi
sqtaKLp4x/aBiHVQtYgvxtGluf41yIUWuQJBAJ9R4+6iCHq6MlZtzEKLJhY3FSix
lXZhuKN0L5BNUOJA+qI07LPJmNW7dT3Ony3bvRZCn7PKtUZ98H+Eqdq17P0CQQCk
KjNJVMtiY8kvvpGDl1rt5Q7ZuIi7Lgphj7PGqdvBoCrDXzgfQ0CMNOD3O8IM3vku
H+JR3AgYbP39Aht/bblpAkAaa/ZIobip8wgeYrxULg13fwd71OgsSCikEEe/GvRD
FT3f9HN2Gniih0CBDRpgKp9b5/+jYaLeaHmpHphw8MsV
-----END RSA PRIVATE KEY-----`;

  const publicCert = `-----BEGIN CERTIFICATE-----
MIICOjCCAaMCFC/b4sv/OZ9SWceKl/2cIl9vfQNKMA0GCSqGSIb3DQEBCwUAMFsx
CzAJBgNVBAYTAkRFMQswCQYDVQQIDAJERTEPMA0GA1UEBwwGQmVybGluMQwwCgYD
VQQKDANTQVAxDDAKBgNVBAsMA1NBUDESMBAGA1UEAwwJbG9jYWxob3N0MCAXDTIy
MDUyNDE0MTc1NloYDzIyMDExMDI4MTQxNzU2WjBbMQswCQYDVQQGEwJERTELMAkG
A1UECAwCREUxDzANBgNVBAcMBkJlcmxpbjEMMAoGA1UECgwDU0FQMQwwCgYDVQQL
DANTQVAxEjAQBgNVBAMMCWxvY2FsaG9zdDCBnzANBgkqhkiG9w0BAQEFAAOBjQAw
gYkCgYEAnXdC9WDbWrQauAKP2p5pQBoNK1pKElUrz28gInA1maa/0CEvpzwES7W3
Cf2wm9gBhLuIY98wwpgI0LAVhjSh4ZZ3RPN7037w2YnfnWsMTIJSHiiUsZ/+NNNn
hfubk4w5WgTNfJGKEDL9y6BL5fIQbrad6DDQe02udGPbZnApGHUCAwEAATANBgkq
hkiG9w0BAQsFAAOBgQBJCqYtbQXloxsC+alszFTrpmyOJctPhIHnJ0rVoBw858Sl
gzA4kzvaXIo+IqIPCkU7Rf5ngUA3voEdzAXh+tao6sIkyCCuLR6dcNxfj5r671se
ZH+EmGNgQbWNQV96abqUFGju68IIxz1ycGj0372Ko53CRKMG8GH5oA48qpP0xw==
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
      const destination: Destination = {
        url: `https://localhost:${port}`
      };

      await expect(
        executeHttpRequest(destination, { method: 'get' })
      ).rejects.toThrow('self signed certificate');
    });

    it('resolves for a server using self-signed certificate if trustAll is set.', async () => {
      const destination: Destination = {
        url: `https://localhost:${port}`,
        isTrustingAllCertificates: true
      };

      const response = await executeHttpRequest(destination, { method: 'get' });
      expect(response.data).toBe('Hello World.');
    });

    it('resolves for a server using self-signed certificate if the trustStore is set.', async () => {
      const destination: Destination = {
        url: `https://localhost:${port}`,
        trustStoreCertificate: destinationCertificate
      };

      const response = await executeHttpRequest(destination, { method: 'get' });
      expect(response.data).toBe('Hello World.');
    });
  });
});
