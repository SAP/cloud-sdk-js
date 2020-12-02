import { replaceSubdomain } from './subdomain-replacer';

describe('subdomain replacer', () => {
  const issuerUrl =
    'https://subscriber-identifier.localhost:8080/uaa/oauth/token';
  const xsuaaUrl = 'https://provider-identifier.authentication.sap.com';
  const invalidUrl = 'anInvalidUrl';

  it('should replace the sub-domain correctly.', () => {
    const actual = replaceSubdomain(issuerUrl, xsuaaUrl);
    const expected = 'https://subscriber-identifier.authentication.sap.com';
    expect(actual).toBe(expected);
  });

  it('should return the xsuaa url directly without replacement.', () => {
    const mutatedIssuerUrl =
      'https://provider-identifier.localhost:8080/uaa/oauth/token';
    const actual = replaceSubdomain(mutatedIssuerUrl, xsuaaUrl);
    expect(actual).toBe(xsuaaUrl);
  });

  it('should throw an error when issuerUrl is not conform.', () => {
    expect(() => replaceSubdomain(invalidUrl, xsuaaUrl)).toThrow();
  });

  it('should throw an error when xsuaaUrl is not conform.', () => {
    expect(() => replaceSubdomain(issuerUrl, invalidUrl)).toThrow();
  });

  it('should throw an error when a URL host has no sub-domain.', () => {
    const mutatedIssuerUrl = 'https://' + invalidUrl;
    expect(() => replaceSubdomain(mutatedIssuerUrl, xsuaaUrl)).toThrow();
  });
});
