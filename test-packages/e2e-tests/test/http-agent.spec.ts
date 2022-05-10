import { createServer, Server } from 'https';
import { promisify } from 'util';
import {DestinationCertificate} from "@sap-cloud-sdk/connectivity/dist/scp-cf";
import {Destination} from "@sap-cloud-sdk/connectivity";
import {executeHttpRequest} from "@sap-cloud-sdk/http-client";

describe('createAgent', () => {

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
    })
});

