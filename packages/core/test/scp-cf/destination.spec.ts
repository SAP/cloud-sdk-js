/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { Destination, parseDestination, sanitizeDestination, DestinationConfiguration } from '../../src/scp-cf';
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

  it('isTrustingAllCertificates is set as boolean', () => {
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
    const actual = parseDestination(certificateMultipleResponse[0]);
    expect(actual.authentication).toBe('ClientCertificateAuthentication');
    expect(actual.keyStoreName).toBe('key.p12');
    expect(actual.keyStorePassword).toBe('password');
    expect(actual.certificates!.length).toBe(0);
  });

  it('sanitizeDestination should be idempotent', () => {
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

  it('parseDestination throws an error if there is no URL given', () => {
    expect(() =>
      parseDestination({
        Name: 'DEST'
      } as any)
    ).toThrowErrorMatchingSnapshot();
  });

  it('sanitizeDestination throws an error if there is no url given', () => {
    expect(() =>
      sanitizeDestination({
        username: 'username',
        password: 'password',
        name: 'DEST'
      })
    ).toThrowErrorMatchingSnapshot();
  });

  it("parseDestination does not throw when there is not url for destinations with type other than 'HTTP' or undefined", () => {
    expect(parseDestination({ Type: 'RFC' } as DestinationConfiguration)).not.toThrow();
  });

  it("sanitizeDestination does not throw when there is not url for destinations with type other than 'HTTP' or undefined", () => {
    expect(sanitizeDestination({ type: 'RFC' })).not.toThrow();
  });
});
