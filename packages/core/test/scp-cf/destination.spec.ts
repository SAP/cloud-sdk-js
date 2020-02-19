import { AuthenticationType, Destination, parseDestination, sanitizeDestination } from '../../src/scp-cf';
import { basicMultipleResponse, certificateMultipleResponse, certificateSingleResponse } from '../test-util/example-destination-service-responses';

describe('Destination parser', () => {
  it('destination is parsed correctly ', () => {
    const actual = parseDestination(basicMultipleResponse[0]);

    const expected: Destination = {
      url: 'https://my.system.com',
      name: 'FINAL-DESTINATION',
      proxyType: 'Internet',
      username: 'USER_NAME',
      password: 'password',
      authentication: 'BasicAuthentication',
      authTokens: [],
      originalProperties: basicMultipleResponse[0],
      isTrustingAllCertificates: true
    };
    expect(actual).toMatchObject(expected);
  });

  it('TrustAll is correctly parsed', () => {
    const actual = parseDestination({ ...basicMultipleResponse[0], TrustAll: 'TRUE' });
    expect(actual.isTrustingAllCertificates).toBe(true);
  });

  it('isTrustingAllCertificates is set to false when TrustAll is not "TRUE"', () => {
    const actual = parseDestination({ ...basicMultipleResponse[0], TrustAll: 'TRUEE' });
    expect(actual.isTrustingAllCertificates).toBe(false);
  });

  it('isTrustingAllCertificates is set as boolean: ', () => {
    const destination = { name: 'destination', isTrustingAllCertificates: true, url: 'https://destination.example' };
    const actual = sanitizeDestination(destination);
    const expected = {
      name: 'destination',
      url: 'https://destination.example',
      isTrustingAllCertificates: true,
      authentication: 'NoAuthentication',
      authTokens: []
    };
    expect(actual).toMatchObject(expected);
  });

  it('certificates are parsed correctly', () => {
    const actual = parseDestination(certificateSingleResponse);
    expect(actual.authentication).toBe('ClientCertificateAuthentication');
    expect(actual.keyStoreName).toBe('key.p12');
    expect(actual.keyStorePassword).toBe('password');
    expect(actual.certificates!.length).toBe(1);
    expect(actual.certificates![0]).toEqual({
      name: 'key.p12',
      content: 'base64string',
      type: 'CERTIFICATE'
    });
  });

  it('certificates are initialized as empty array if none are present', () => {
    const destinationJson = {
      Name: 'ERNIE-UND-CERT',
      Type: 'HTTP',
      URL: 'https://ms.ca.com',
      Authentication: 'ClientCertificateAuthentication' as AuthenticationType,
      ProxyType: 'Internet',
      KeyStorePassword: 'password',
      KeyStoreLocation: 'key.p12'
    };

    const actual = parseDestination(destinationJson);
    expect(actual.authentication).toBe('ClientCertificateAuthentication');
    expect(actual.keyStoreName).toBe('key.p12');
    expect(actual.keyStorePassword).toBe('password');
    expect(actual.certificates!.length).toBe(0);
  });

  it('should be idempotent', () => {
    let oneTime = sanitizeDestination(certificateSingleResponse);
    let twoTimes = sanitizeDestination(oneTime);
    expect(oneTime).toMatchObject(twoTimes);

    oneTime = sanitizeDestination(certificateMultipleResponse[0]);
    twoTimes = sanitizeDestination(oneTime);
    expect(oneTime).toMatchObject(twoTimes);
  });
});
