import {
  getIssuerSubdomain,
  replaceSubdomain,
  validateTenantSubdomain
} from './subdomain-replacer';

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

  describe('validateTenantSubdomain', () => {
    // Mirrors the SAP Cloud SDK for Python test suite
    // (tests/core/unit/test_tenant.py) plus the attack vectors from the report.
    it.each([
      'tenant',
      'tenant-123',
      'my-company-subdomain',
      'a',
      'a'.repeat(63),
      'A1b2C3',
      'xn--nxasmq6b' // punycoded label — valid RFC 1123 label chars
    ])('does not throw for valid DNS label "%s"', subdomain => {
      expect(() => validateTenantSubdomain(subdomain)).not.toThrow();
    });

    it.each([
      ['', 'empty string'],
      ['-leading-hyphen', 'starts with hyphen'],
      ['trailing-hyphen-', 'ends with hyphen'],
      ['-both-', 'starts and ends with hyphen'],
      ['a'.repeat(64), '64 chars — one over the 63-char limit'],
      ['has.dot', 'dot is not a valid label char'],
      ['has space', 'space is not allowed'],
      ['under_score', 'underscore is not allowed'],
      ['has/slash', 'slash is not allowed'],
      ['attacker.example:1234/', 'SSRF vector with host, port and path'],
      ['127.0.0.1:9999/', 'SSRF vector pointing at a local listener'],
      ['foo:443', 'colon / port is not allowed'],
      ['foo\nbar', 'newline is not allowed'],
      ['..', 'dots only'],
      ['%2e%2e', 'percent-encoded traversal']
    ])('throws for invalid subdomain "%s" (%s)', subdomain => {
      expect(() => validateTenantSubdomain(subdomain)).toThrow(
        /Invalid tenant subdomain/
      );
    });

    it('is a no-op for undefined (no subdomain)', () => {
      expect(() => validateTenantSubdomain(undefined)).not.toThrow();
    });
  });
});
