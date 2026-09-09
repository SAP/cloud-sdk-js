import { getIssuerSubdomain, replaceSubdomain } from './subdomain-replacer';

describe('subdomain-replacer', () => {
  describe('getIssuerSubdomain', () => {
    it('returns undefined if no JWT is given', () => {
      expect(getIssuerSubdomain(undefined)).toBeUndefined();
    });

    it('returns undefined if the JWT has no issuer', () => {
      expect(getIssuerSubdomain({})).toBeUndefined();
    });

    it('extracts the subdomain from an issuer URL', () => {
      expect(
        getIssuerSubdomain({
          iss: 'https://subscriber.authentication.sap.hana.ondemand.com'
        })
      ).toBe('subscriber');
    });

    it('extracts the subdomain from an issuer URL with a path', () => {
      expect(
        getIssuerSubdomain({
          iss: 'https://subscriber.accounts.ondemand.com/oauth/token'
        })
      ).toBe('subscriber');
    });

    it('extracts the subdomain from an issuer without a scheme', () => {
      expect(
        getIssuerSubdomain({ iss: 'subscriber.accounts.ondemand.com' })
      ).toBe('subscriber');
    });

    it('keeps a non-https scheme as given', () => {
      expect(
        getIssuerSubdomain({ iss: 'http://subscriber.accounts.ondemand.com' })
      ).toBe('subscriber');
    });

    it('prefers the `ias_iss` claim for IAS tokens', () => {
      expect(
        getIssuerSubdomain(
          {
            iss: 'https://provider.accounts.ondemand.com',
            ias_iss: 'https://subscriber.accounts.ondemand.com'
          },
          true
        )
      ).toBe('subscriber');
    });

    it('extracts the subdomain from an `ias_iss` claim without a scheme', () => {
      expect(
        getIssuerSubdomain(
          {
            iss: 'https://provider.accounts.ondemand.com',
            ias_iss: 'subscriber.accounts.ondemand.com'
          },
          true
        )
      ).toBe('subscriber');
    });

    it('throws if the issuer is not a valid URL', () => {
      expect(() => getIssuerSubdomain({ iss: 'not a valid issuer' })).toThrow(
        'Issuer URL in JWT is not a valid URL: "not a valid issuer".'
      );
    });

    it('throws if the issuer has no dot in the host', () => {
      expect(() => getIssuerSubdomain({ iss: 'localhost' })).toThrow(
        /Failed to determine hostname/
      );
    });
  });

  describe('replaceSubdomain', () => {
    it('replaces the subdomain of the given URL', () => {
      expect(
        replaceSubdomain('https://provider.accounts.ondemand.com', 'subscriber')
      ).toBe('https://subscriber.accounts.ondemand.com');
    });

    it('removes the subdomain if none is given', () => {
      expect(
        replaceSubdomain('https://provider.accounts.ondemand.com', undefined)
      ).toBe('https://accounts.ondemand.com');
    });

    it('throws if the base URL is not a valid URL', () => {
      expect(() => replaceSubdomain('not a valid url', 'subscriber')).toThrow(
        'Base URL is not a valid URL: "not a valid url".'
      );
    });
  });
});
