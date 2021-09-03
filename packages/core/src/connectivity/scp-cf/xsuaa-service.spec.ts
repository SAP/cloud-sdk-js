import nock from 'nock';
import { unixEOL } from '@sap-cloud-sdk/util';
import { providerXsuaaUrl } from '../../../test/test-util';
import { fetchVerificationKeys, getSubdomainAndZoneId } from './xsuaa-service';
import * as jwt from './jwt';
import { TokenKey } from '.';

describe('getSubdomainAndZoneId', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('returns null subdomain and zoneId for undefined jwt', () => {
    const actual = getSubdomainAndZoneId();
    const expected = { subdomain: null, zoneId: null };
    expect(actual).toEqual(expected);
  });

  it('returns subdomain and zoneId', () => {
    const iss = 'https://sub.example.com';
    const zid = 'zone';
    jest.spyOn(jwt, 'decodeJwt').mockImplementationOnce(() => ({ iss, zid }));

    const actual = getSubdomainAndZoneId('nonNullJWT');
    const expected = { subdomain: 'sub', zoneId: zid };
    expect(actual).toEqual(expected);
  });

  it('returns null zoneId, when the jwt does not contain zid', () => {
    const iss = 'https://sub.example.com';
    jest.spyOn(jwt, 'decodeJwt').mockImplementationOnce(() => ({ iss }));

    const actual = getSubdomainAndZoneId('nonNullJWT');
    const expected = { subdomain: 'sub', zoneId: null };
    expect(actual).toEqual(expected);
  });

  it('returns null subdomain, when the jwt does not contain iss', () => {
    const zid = 'zone';
    jest.spyOn(jwt, 'decodeJwt').mockImplementationOnce(() => ({ zid }));

    const actual = getSubdomainAndZoneId('nonNullJWT');
    const expected = { subdomain: null, zoneId: zid };
    expect(actual).toEqual(expected);
  });
});

describe('fetchVerificationKeys', () => {
  it('fetches verification keys', async () => {
    const response = {
      keys: [
        {
          kty: 'RSA',
          e: 'AQAB',
          use: 'sig',
          kid: 'key-id-0',
          alg: 'RS256',
          value: `-----BEGIN PUBLIC KEY-----${unixEOL}MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx/jN5v1mp/TVn9nTQoYV${unixEOL}IUfCsUDHa3Upr5tDZC7mzlTrN2PnwruzyS7w1Jd+StqwW4/vn87ua2YlZzU8Ob0j${unixEOL}R4lbOPCKaHIi0kyNtJXQvQ7LZPG8epQLbx0IIP/WLVVVtB8bL5OWuHma3pUnibbm${unixEOL}ATtbOh5LksQ2zLMngEjUF52JQyzTpjoQkahp0BNe/drlAqO253keiY63FL6belKj${unixEOL}JGmSqdnotSXxB2ym+HQ0ShaNvTFLEvi2+ObkyjGWgFpQaoCcGq0KX0y0mPzOvdFs${unixEOL}NT+rBFdkHiK+Jl638Sbim1z9fItFbH9hiVwY37R9rLtH1YKi3PuATMjf/DJ7mUlu${unixEOL}DQIDAQAB${unixEOL}-----END PUBLIC KEY-----`,
          n: 'AMf4zeb9Zqf01Z_Z00KGFSFHwrFAx2t1Ka-bQ2Qu5s5U6zdj58K7s8ku8NSXfkrasFuP75_O7mtmJWc1PDm9I0eJWzjwimhyItJMjbSV0L0Oy2TxvHqUC28dCCD_1i1VVbQfGy-Tlrh5mt6VJ4m25gE7WzoeS5LENsyzJ4BI1BediUMs06Y6EJGoadATXv3a5QKjtud5HomOtxS-m3pSoyRpkqnZ6LUl8Qdspvh0NEoWjb0xSxL4tvjm5MoxloBaUGqAnBqtCl9MtJj8zr3RbDU_qwRXZB4iviZet_Em4ptc_XyLRWx_YYlcGN-0fay7R9WCotz7gEzI3_wye5lJbg0'
        },
        {
          kty: 'RSA',
          e: 'AQAB',
          use: 'sig',
          kid: 'key-id-1',
          alg: 'RS256',
          value: `-----BEGIN PUBLIC KEY-----${unixEOL}MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx/jN5v1mp/TVn9nTQoYV${unixEOL}IUfCsUDHa3Upr5tDZC7mzlTrN2PnwruzyS7w1Jd+StqwW4/vn87ua2YlZzU8Ob0j${unixEOL}R4lbOPCKaHIi0kyNtJXQvQ7LZPG8epQLbx0IIP/WLVVVtB8bL5OWuHma3pUnibbm${unixEOL}ATtbOh5LksQ2zLMngEjUF52JQyzTpjoQkahp0BNe/drlAqO253keiY63FL6belKj${unixEOL}JGmSqdnotSXxB2ym+HQ0ShaNvTFLEvi2+ObkyjGWgFpQaoCcGq0KX0y0mPzOvdFs${unixEOL}NT+rBFdkHiK+Jl638Sbim1z9fItFbH9hiVwY37R9rLtH1YKi3PuATMjf/DJ7mUlu${unixEOL}DQIDAQAB${unixEOL}-----END PUBLIC KEY-----`,
          n: 'AMf4zeb9Zqf01Z_Z00KGFSFHwrFAx2t1Ka-bQ2Qu5s5U6zdj58K7s8ku8NSXfkrasFuP75_O7mtmJWc1PDm9I0eJWzjwimhyItJMjbSV0L0Oy2TxvHqUC28dCCD_1i1VVbQfGy-Tlrh5mt6VJ4m25gE7WzoeS5LENsyzJ4BI1BediUMs06Y6EJGoadATXv3a5QKjtud5HomOtxS-m3pSoyRpkqnZ6LUl8Qdspvh0NEoWjb0xSxL4tvjm5MoxloBaUGqAnBqtCl9MtJj8zr3RbDU_qwRXZB4iviZet_Em4ptc_XyLRWx_YYlcGN-0fay7R9WCotz7gEzI3_wye5lJbg0'
        }
      ]
    };

    nock(providerXsuaaUrl).get('/').reply(200, response);

    const expected: TokenKey[] = [
      {
        keyType: 'RSA',
        publicKeyExponent: 'AQAB',
        use: 'sig',
        keyId: 'key-id-0',
        algorithm: 'RS256',
        value: `-----BEGIN PUBLIC KEY-----${unixEOL}MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx/jN5v1mp/TVn9nTQoYV${unixEOL}IUfCsUDHa3Upr5tDZC7mzlTrN2PnwruzyS7w1Jd+StqwW4/vn87ua2YlZzU8Ob0j${unixEOL}R4lbOPCKaHIi0kyNtJXQvQ7LZPG8epQLbx0IIP/WLVVVtB8bL5OWuHma3pUnibbm${unixEOL}ATtbOh5LksQ2zLMngEjUF52JQyzTpjoQkahp0BNe/drlAqO253keiY63FL6belKj${unixEOL}JGmSqdnotSXxB2ym+HQ0ShaNvTFLEvi2+ObkyjGWgFpQaoCcGq0KX0y0mPzOvdFs${unixEOL}NT+rBFdkHiK+Jl638Sbim1z9fItFbH9hiVwY37R9rLtH1YKi3PuATMjf/DJ7mUlu${unixEOL}DQIDAQAB${unixEOL}-----END PUBLIC KEY-----`,
        publicKeyModulus:
          'AMf4zeb9Zqf01Z_Z00KGFSFHwrFAx2t1Ka-bQ2Qu5s5U6zdj58K7s8ku8NSXfkrasFuP75_O7mtmJWc1PDm9I0eJWzjwimhyItJMjbSV0L0Oy2TxvHqUC28dCCD_1i1VVbQfGy-Tlrh5mt6VJ4m25gE7WzoeS5LENsyzJ4BI1BediUMs06Y6EJGoadATXv3a5QKjtud5HomOtxS-m3pSoyRpkqnZ6LUl8Qdspvh0NEoWjb0xSxL4tvjm5MoxloBaUGqAnBqtCl9MtJj8zr3RbDU_qwRXZB4iviZet_Em4ptc_XyLRWx_YYlcGN-0fay7R9WCotz7gEzI3_wye5lJbg0'
      },
      {
        keyType: 'RSA',
        publicKeyExponent: 'AQAB',
        use: 'sig',
        keyId: 'key-id-1',
        algorithm: 'RS256',
        value: `-----BEGIN PUBLIC KEY-----${unixEOL}MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx/jN5v1mp/TVn9nTQoYV${unixEOL}IUfCsUDHa3Upr5tDZC7mzlTrN2PnwruzyS7w1Jd+StqwW4/vn87ua2YlZzU8Ob0j${unixEOL}R4lbOPCKaHIi0kyNtJXQvQ7LZPG8epQLbx0IIP/WLVVVtB8bL5OWuHma3pUnibbm${unixEOL}ATtbOh5LksQ2zLMngEjUF52JQyzTpjoQkahp0BNe/drlAqO253keiY63FL6belKj${unixEOL}JGmSqdnotSXxB2ym+HQ0ShaNvTFLEvi2+ObkyjGWgFpQaoCcGq0KX0y0mPzOvdFs${unixEOL}NT+rBFdkHiK+Jl638Sbim1z9fItFbH9hiVwY37R9rLtH1YKi3PuATMjf/DJ7mUlu${unixEOL}DQIDAQAB${unixEOL}-----END PUBLIC KEY-----`,
        publicKeyModulus:
          'AMf4zeb9Zqf01Z_Z00KGFSFHwrFAx2t1Ka-bQ2Qu5s5U6zdj58K7s8ku8NSXfkrasFuP75_O7mtmJWc1PDm9I0eJWzjwimhyItJMjbSV0L0Oy2TxvHqUC28dCCD_1i1VVbQfGy-Tlrh5mt6VJ4m25gE7WzoeS5LENsyzJ4BI1BediUMs06Y6EJGoadATXv3a5QKjtud5HomOtxS-m3pSoyRpkqnZ6LUl8Qdspvh0NEoWjb0xSxL4tvjm5MoxloBaUGqAnBqtCl9MtJj8zr3RbDU_qwRXZB4iviZet_Em4ptc_XyLRWx_YYlcGN-0fay7R9WCotz7gEzI3_wye5lJbg0'
      }
    ];

    const actual = await fetchVerificationKeys(providerXsuaaUrl);
    expect(actual).toEqual(expected);
  });

  it('provides some useful message on failure', async () => {
    const response = {
      error: 'bad_request',
      error_description: 'Bad request'
    };

    nock(providerXsuaaUrl).get('/').reply(400, response);

    await expect(
      fetchVerificationKeys(providerXsuaaUrl)
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Failed to fetch verification keys from XSUAA service instance \\"https://provider.example.com\\"."'
    );
  });
});
