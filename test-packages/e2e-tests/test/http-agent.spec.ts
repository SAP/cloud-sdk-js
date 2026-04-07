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
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
cpUhl8mQAIkNYpoiWnmj6XY7MrDi1Q==
-----END PRIVATE KEY-----`;

  const publicCert = `-----BEGIN CERTIFICATE-----
MIIEpjCCAo4CCQD7+0fKLPRZyzANBgkqhkiG9w0BAQsFADAUMRIwEAYDVQQDDAls
b2NhbGhvc3QwIBcNMjYwNDA3MTAzNDQ5WhgPMjEyNjAzMTQxMDM0NDlaMBQxEjAQ
BgNVBAMMCWxvY2FsaG9zdDCCAiIwDQYJKoZIhvcNAQEBBQADggIPADCCAgoCggIB
AMCg0ojOAl1VRTKqE4FjeGIyn1RY+vRGBtp3YGMtfLbEtCOpncjGW6I57dS4io0N
t6h/RoUsOLB1YLeEE3WA9zOrwxhZ+ncka3GJDFklPpVrrmcdeKTEQxJD8tMlvJQR
SSEwEsC15GlehDBiByE0623d8KuBd/aiejTKKGGePlwMYFx4UI19RxkulIsks+m9
9LRy4/X4EV+ixuAjXBHkZAGGi5RG9oplC811ANp6J5gvaSBfdLwrO7edJHZC0EgB
w/YPo8oXJE/lx2i6OmGacwJlUvBIHXZ/GCl0rR4P70C7I/yXQiOHLVHAiXuJfuM2
nXnqi1/eYTgtrbg0Nedc5GBLRwaKVHg75FzSdweoiz4QvucjWeeP6zT/sXLSwlui
n3xJybX3yZHLwgLWGbra4PvLBPLNLls4/O3Iuwey0kFrRoWk6hCeEJeWwsLTJFnJ
H+rNVv5rjHjsW7MDVkjMyJwIyEViclazHQZJGmRQ8a1HNJNbd+bPymI8PUr5QJ+i
6CWoP2yevDwqu+1Z4fXrwc3LvRZBFqIzLFzEtUROL7eVXtlWPQn5eervvTRDu7GU
9nYcY69XEiMqZmTxDh6/QLKpodyeiPs39wxIvfbc192VY8bcJOLdvH+rdVgfLIam
CwBkcSQWZGSFDW56/rZvFwgSbL4C/XWiycLkTTHlnYSBAgMBAAEwDQYJKoZIhvcN
AQELBQADggIBAIE4UT0s8+nZ6Lh6rmA1IeqG9JSvTm/AOjOEG/3nhpnEiS15ufmo
jeuYkC2qunEC1Oakvy7cnqGBLzAZV+OUBZ7z+fu2TxQWT/Z4Hh9EYxZzSA6k4sOB
4p0/+6XYpy9jIlOj/nOTTqJEqhK+i36aF3IutyL/EyX10TORcGpYuEq18sEUrf10
QP14mNkuTavW2hzJup7EidhhD5AF5AczuBUvknU/HrNe+wpiAifnFrcr+MMxsy5L
B0jtQdRrVTe0C7hd85pl2jXmcym7ZAz9bIvbIePOWODG0Lo05HHZjVCxTe6tD3at
HN3tS6TIoprH2dCV0FZ8bn/m1HpfZPwy1kEHxHAosZB7Dj/qtyMWQ6ip9YjPuPJ2
yoD6IZ5rrPIjZgEJd6SDjj+QWTDz0Mj3GBEMSLS0Z4LvhbDFObDaPueLctAEhIfX
aeLT8/ENPTyzQzpi0gExd4dcdw0la6vTy1iw095gQSzuBH1lbPnsB9WAITNeCcre
T9tfNcAF97z6ksYXkbfpwmKDv4YgkdG49775X/d0ro8pMplbIIRCxy3GHRbZy0g9
UQkM1cP6zZN7azTxtnngx9RgBbyboFYUBy2ZMtv9f+JOT5eiPYM7XTIHFNJV3xY1
wjcCFE+jvPdryv27g7t5gmzGzCHf7P8nmgUBqlaAULfUId6/NIMR+nzC
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
