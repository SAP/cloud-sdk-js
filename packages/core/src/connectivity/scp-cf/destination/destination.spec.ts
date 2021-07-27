import {
  basicMultipleResponse,
  certificateMultipleResponse,
  certificateSingleResponse
} from '../../../../test/test-util/example-destination-service-responses';
import {
  DestinationConfiguration,
  parseDestination,
  sanitizeDestination
} from './destination';
import { Destination } from './destination-service-types';

describe('parseDestination', () => {
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

  it("'TrustAll' is correctly parsed", () => {
    const actual = parseDestination({
      ...basicMultipleResponse[0],
      TrustAll: 'TRUE'
    });
    expect(actual.isTrustingAllCertificates).toBe(true);
  });

  it('`isTrustingAllCertificates` is set to false when TrustAll is not "TRUE"', () => {
    const actual = parseDestination({
      ...basicMultipleResponse[0],
      TrustAll: 'NOT_TRUE'
    });
    expect(actual.isTrustingAllCertificates).toBe(false);
  });

  it('parses certificates', () => {
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

  it('initializes certificates as empty array if none are present', () => {
    const actual = parseDestination(certificateMultipleResponse[0]);
    expect(actual.authentication).toBe('ClientCertificateAuthentication');
    expect(actual.keyStoreName).toBe('key.p12');
    expect(actual.keyStorePassword).toBe('password');
    expect(actual.certificates!.length).toBe(0);
  });

  it('parses additional headers and query parameters', () => {
    const destination = parseDestination({
      URL: '',
      'URL.headers.additionalHeader1': 'additionalHeader1',
      'URL.queries.additionalQueryParam': 'additionalQueryParam',
      'URL.headers.additionalHeader2': 'additionalHeader2'
    });
    expect(destination).toEqual(
      expect.objectContaining({
        headers: {
          additionalHeader1: 'additionalHeader1',
          additionalHeader2: 'additionalHeader2'
        },
        queryParameters: {
          additionalQueryParam: 'additionalQueryParam'
        }
      })
    );
  });

  it('parses additional headers and query parameters as undefined if not provided', () => {
    const destination = parseDestination({
      URL: ''
    });

    expect(destination).not.toHaveProperty('headers');
    expect(destination).not.toHaveProperty('queryParameters');
  });

  it('throws an error if there is no `URL` given', () => {
    expect(() =>
      parseDestination({
        Name: 'DEST'
      } as any)
    ).toThrowErrorMatchingInlineSnapshot(
      '"Property \'URL\' of destination configuration must not be undefined."'
    );
  });

  it("does not throw when there is no `URL` for destinations with type other than 'HTTP' or undefined", () => {
    expect(() =>
      parseDestination({ Type: 'RFC' } as DestinationConfiguration)
    ).not.toThrow();
  });
});

describe('sanitizeDestination', () => {
  it('should be idempotent', () => {
    const destination = {
      username: 'username',
      password: 'password',
      name: 'DEST',
      url: 'https://example.com'
    };

    const oneTime = sanitizeDestination(destination);
    const twoTimes = sanitizeDestination(oneTime);
    expect(oneTime).toMatchObject(twoTimes);
  });

  it('sets `isTrustingAllCertificates` as boolean', () => {
    const destination = {
      name: 'destination',
      isTrustingAllCertificates: true,
      url: 'https://destination.example'
    };
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

  it('throws an error if there is no `url` given', () => {
    expect(() =>
      sanitizeDestination({
        username: 'username',
        password: 'password',
        name: 'DEST'
      })
    ).toThrowErrorMatchingInlineSnapshot(
      '"Property \'url\' of destination input must not be undefined."'
    );
  });

  it("does not throw when there is no `url` for destinations with type other than 'HTTP' or undefined", () => {
    expect(() => sanitizeDestination({ type: 'RFC' })).not.toThrow();
  });
});
