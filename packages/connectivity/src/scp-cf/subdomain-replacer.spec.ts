import { replaceWithIssuerSubdomain } from './subdomain-replacer';

describe('replaceWithIssuerSubdomain', () => {
  const iss = 'https://subscriber-identifier.localhost:8080/uaa/oauth/token';
  const xsuaaUrl = 'https://provider-identifier.authentication.sap.com';
  const invalidUrl = 'anInvalidUrl';

  it('should replace the sub-domain correctly', () => {
    expect(replaceWithIssuerSubdomain(xsuaaUrl, { iss })).toBe(
      'https://subscriber-identifier.authentication.sap.com'
    );
  });

  it('should return the xsuaa url directly without replacement', () => {
    expect(
      replaceWithIssuerSubdomain(xsuaaUrl, {
        iss: 'https://provider-identifier.localhost:8080/uaa/oauth/token'
      })
    ).toBe(xsuaaUrl);
  });

  it('should throw an error when issuer URL is not conform', () => {
    expect(() =>
      replaceWithIssuerSubdomain(xsuaaUrl, { iss: invalidUrl })
    ).toThrowErrorMatchingInlineSnapshot(
      '"Issuer URL in JWT is not a valid URL: "anInvalidUrl"."'
    );
  });

  it('should throw an error when XSUAA URL is not conform', () => {
    expect(() =>
      replaceWithIssuerSubdomain(invalidUrl, { iss })
    ).toThrowErrorMatchingInlineSnapshot(
      '"XSUAA URL is not a valid URL: "anInvalidUrl"."'
    );
  });

  it('should throw an error when the issuer URL host has no subdomain', () => {
    expect(() =>
      replaceWithIssuerSubdomain(xsuaaUrl, { iss: `https://${invalidUrl}` })
    ).toThrowErrorMatchingInlineSnapshot(
      '"Failed to determine sub-domain: invalid host in "https://aninvalidurl/"."'
    );
  });
});
