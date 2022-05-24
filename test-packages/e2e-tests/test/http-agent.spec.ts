import { createServer, Server } from 'https';
import { promisify } from 'util';
import { DestinationCertificate } from '@sap-cloud-sdk/connectivity/dist/scp-cf';
import { Destination } from '@sap-cloud-sdk/connectivity';
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
MIICODCCAaECFDqIoh9oXU6qvv5PoPSF1deHgMndMA0GCSqGSIb3DQEBCwUAMFsx
CzAJBgNVBAYTAkRFMQswCQYDVQQIDAJERTEPMA0GA1UEBwwGQmVybGluMQwwCgYD
VQQKDANTQVAxDDAKBgNVBAsMA1NBUDESMBAGA1UEAwwJbG9jYWxob3N0MB4XDTIy
MDUyNDEwMTIxMFoXDTI0MDUyMzEwMTIxMFowWzELMAkGA1UEBhMCREUxCzAJBgNV
BAgMAkRFMQ8wDQYDVQQHDAZCZXJsaW4xDDAKBgNVBAoMA1NBUDEMMAoGA1UECwwD
U0FQMRIwEAYDVQQDDAlsb2NhbGhvc3QwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJ
AoGBAJ13QvVg21q0GrgCj9qeaUAaDStaShJVK89vICJwNZmmv9AhL6c8BEu1twn9
sJvYAYS7iGPfMMKYCNCwFYY0oeGWd0Tze9N+8NmJ351rDEyCUh4olLGf/jTTZ4X7
m5OMOVoEzXyRihAy/cugS+XyEG62negw0HtNrnRj22ZwKRh1AgMBAAEwDQYJKoZI
hvcNAQELBQADgYEAKFpWYi56QQcXKdabOE7PgoL9K1vAGjT89waTG1hdldkr49e+
5mjodaenqIhotQgL5FhZf2RkqJni9RrE0PiNqft8qYllDfNZNA6M5MEdyyjsdBJE
bEFG/f9jejXRaxLDTP2MhEL/2ZapjgfchCs/nR8qbHeNGUhXIJeV/UZlCp0=
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

    describe('trust',()=> {
        it('fails for a server using self-signed certificate if the trustStore is not set.', async () => {
            const destination: Destination = {
                url: `https://localhost:${port}`
            };

            await expect(
                executeHttpRequest(destination, {method: 'get'})
            ).rejects.toThrow('self signed certificate');
        });

        it('resolves for a server using self-signed certificate if trustAll is set.',async ()=>{
            const destination: Destination = {
                url: `https://localhost:${port}`,
                isTrustingAllCertificates:true
            };

            const response = await executeHttpRequest(destination, {method: 'get'});
            expect(response.data).toBe('Hello World.');
        })

        it('resolves for a server using self-signed certificate if the trustStore is set.', async () => {
            const destination: Destination = {
                url: `https://localhost:${port}`,
                trustStoreCertificate: destinationCertificate
            };

            const response = await executeHttpRequest(destination, {method: 'get'});
            expect(response.data).toBe('Hello World.');
        });
    });
});

