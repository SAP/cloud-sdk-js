import { fail } from 'assert';
import { unixEOL } from '@sap-cloud-sdk/util';
import nock from 'nock';
import { providerXsuaaUrl } from '../../../test/test-util/environment-mocks';
import * as httpClient from '../../http-client/http-client';
import {
  clientCredentialsGrant,
  fetchVerificationKeys,
  refreshTokenGrant,
  userTokenGrant
} from './xsuaa-service';
import { TokenKey } from './xsuaa-service-types';
import { Destination } from './destination';
import { XsuaaServiceCredentials } from './environment-accessor-types';
import { Protocol } from './protocol';

const expectedResponse200 = {
  access_token: 'sometoken',
  token_type: 'bearer',
  expires_in: 0,
  scope: 'some scopes',
  jti: 'uhm'
};

describe('xsuaa', () => {
  const creds = {
    username: 'horsti',
    password: 'borsti'
  };
  const basicHeader = 'Basic aG9yc3RpOmJvcnN0aQ==';
  const providerXsuaaClientCredentials = {
    url: providerXsuaaUrl
  } as XsuaaServiceCredentials;

  describe('web proxy handling', () => {
    it('includes the proxy if present', async () => {
      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders('Basic aG9yc3RpOmJvcnN0aQ==')
      })
        .post('/oauth/token', 'grant_type=client_credentials')
        .reply(200, expectedResponse200);
      process.env.https_proxy = 'http://some.test.proxy.com:1234';
      const spy = jest.spyOn(httpClient, 'executeHttpRequest');
      const response = await clientCredentialsGrant(
        providerXsuaaClientCredentials,
        creds
      );
      const expectedDestination: Destination = {
        url: 'https://provider.example.com/oauth/token',
        proxyType: 'Internet',
        proxyConfiguration: {
          host: 'some.test.proxy.com',
          protocol: Protocol.HTTP,
          port: 1234
        }
      };

      expect(spy).toHaveBeenCalledWith(expectedDestination, expect.anything());
    });

    it('considers the no_proxy if present', async () => {
      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders('Basic aG9yc3RpOmJvcnN0aQ==')
      })
        .post('/oauth/token', 'grant_type=client_credentials')
        .reply(200, expectedResponse200);
      process.env.https_proxy = 'http://some.test.proxy.com:1234';
      process.env.no_proxy = 'https://provider.example.com/oauth/token';
      const spy = jest.spyOn(httpClient, 'executeHttpRequest');
      const response = await clientCredentialsGrant(
        providerXsuaaClientCredentials,
        creds
      );
      const expectedDestination: Destination = {
        url: 'https://provider.example.com/oauth/token',
        proxyType: 'Internet'
      };

      expect(spy).toHaveBeenCalledWith(expectedDestination, expect.anything());
    });
  });

  describe('clientCredentialsGrant', () => {
    it('returns a valid token for a given set of client credentials when the url comes from XsuaaServiceCredentials', async () => {
      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders('Basic aG9yc3RpOmJvcnN0aQ==')
      })
        .post('/oauth/token', 'grant_type=client_credentials')
        .reply(200, expectedResponse200);

      const response = await clientCredentialsGrant(
        providerXsuaaClientCredentials,
        creds
      );
      expect(response).toEqual(expectedResponse200);
    });

    it('does not change the given token service URL if a string is passed', async () => {
      nock('https://some.token.service.url.com', {
        reqheaders: reqHeaders('Basic aG9yc3RpOmJvcnN0aQ==')
      })
        .post('/token/path', 'grant_type=client_credentials')
        .reply(200, expectedResponse200);

      const response = await clientCredentialsGrant(
        'https://some.token.service.url.com/token/path',
        creds
      );
      expect(response).toEqual(expectedResponse200);
    });

    it('adds /oauth/token if the XsuaaServiceCredentials are passed', async () => {
      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders('Basic aG9yc3RpOmJvcnN0aQ==')
      })
        .post('/oauth/token', 'grant_type=client_credentials')
        .reply(200, expectedResponse200);

      const response = await clientCredentialsGrant(
        providerXsuaaClientCredentials,
        creds
      );
      expect(response).toEqual(expectedResponse200);
    });

    it('returns a valid token for a given set of client credentials when the url comes from destination', async () => {
      const tokenUrlEndpointAndPathParam =
        '/oauth/token?grant_type=client_credentials';
      const tokenUrl = `${providerXsuaaUrl}${tokenUrlEndpointAndPathParam}`;

      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders('Basic aG9yc3RpOmJvcnN0aQ==')
      })
        .post(tokenUrlEndpointAndPathParam, 'grant_type=client_credentials')
        .reply(200, expectedResponse200);

      const response = await clientCredentialsGrant(tokenUrl, creds);
      expect(response).toEqual(expectedResponse200);
    });

    it('returns 401 on wrong credentials', async () => {
      const response = {
        error: 'unauthorized',
        errorDescription: 'Bad Credentials'
      };

      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders('Basic aG9yc3RpOmJvcnN0aQ==')
      })
        .post('/oauth/token', 'grant_type=client_credentials')
        .reply(401, response);
      try {
        await clientCredentialsGrant(providerXsuaaClientCredentials, creds, {
          enableCircuitBreaker: false
        });
      } catch (error) {
        expect(error.message).toBe(
          'FetchTokenError: Client credentials Grant failed! Request failed with status code 401'
        );
      }
    });

    it('returns 404 in case of a wrong URL', async () => {
      nock(providerXsuaaUrl).post('/oauth/token').reply(404);

      try {
        await clientCredentialsGrant(providerXsuaaClientCredentials, creds, {
          enableCircuitBreaker: false
        });
        fail();
      } catch (error) {
        expect(error.stack).toContain('404');
      }
    });

    it('does not fail miserably on internal server error', async () => {
      nock(providerXsuaaUrl).post('/oauth/token').reply(500);

      try {
        await clientCredentialsGrant(providerXsuaaClientCredentials, creds, {
          enableCircuitBreaker: false
        });
        fail();
      } catch (error) {
        expect(error.stack).toContain('500');
      }
    });
  });

  describe('userTokenGrant', () => {
    const userJwt = 'ey.thisis.ajwt';
    const clientId = 'client';
    it('returns a refresh token for a given client id + JWT', async () => {
      const expectedResponse = {
        access_token: null,
        token_type: 'bearer',
        refresh_token: 'fresshhhh',
        expires_in: 1,
        scope: 'some scopes',
        jti: 'uhm'
      };

      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders('Bearer ' + userJwt)
      })
        .post(
          '/oauth/token',
          'client_id=' + clientId + '&grant_type=user_token&response_type=token'
        )
        .reply(200, expectedResponse);

      const userToken = await userTokenGrant(
        providerXsuaaClientCredentials,
        userJwt,
        clientId
      );
      expect(userToken).toEqual(expectedResponse);
    });

    it('returns 401 for an invalid JWT', async () => {
      const expectedResponse = {
        error: 'invalid_token',
        error_description:
          'The token expired, was revoked, or the token ID is incorrect.'
      };

      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders('Bearer ' + userJwt)
      })
        .post(
          '/oauth/token',
          'client_id=' + clientId + '&grant_type=user_token&response_type=token'
        )
        .reply(401, expectedResponse);

      try {
        await userTokenGrant(
          providerXsuaaClientCredentials,
          userJwt,
          clientId,
          {
            enableCircuitBreaker: false
          }
        );
      } catch (error) {
        expect(error.message).toBe(
          'FetchTokenError: User token Grant failed! Request failed with status code 401'
        );
      }
    });

    it('returns 401 for an expired JWT', async () => {
      const expectedResponse = {
        error: 'invalid_token',
        error_description:
          'Invalid access token: expired at Wed Dec 12 13:21:33 UTC 2018'
      };

      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders('Bearer ' + userJwt)
      })
        .post(
          '/oauth/token',
          'client_id=' + clientId + '&grant_type=user_token&response_type=token'
        )
        .reply(401, expectedResponse);

      try {
        await userTokenGrant(
          providerXsuaaClientCredentials,
          userJwt,
          clientId,
          {
            enableCircuitBreaker: false
          }
        );
      } catch (error) {
        expect(error.message).toBe(
          'FetchTokenError: User token Grant failed! Request failed with status code 401'
        );
      }
    });

    it('returns 401 for a wrong client ID', async () => {
      const expectedResponse = {
        error: 'invalid_client',
        error_description: 'Bad client credentials'
      };

      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders('Bearer ' + userJwt)
      })
        .post(
          '/oauth/token',
          'client_id=' + clientId + '&grant_type=user_token&response_type=token'
        )
        .reply(401, expectedResponse);

      try {
        await userTokenGrant(
          providerXsuaaClientCredentials,
          userJwt,
          clientId,
          {
            enableCircuitBreaker: false
          }
        );
      } catch (error) {
        expect(error.message).toBe(
          'FetchTokenError: User token Grant failed! Request failed with status code 401'
        );
      }
    });
  });

  describe('refreshTokenGrant', () => {
    const refreshToken = 'refreshtoken';
    it('returns a new access token for a given refresh token', async () => {
      const expectedResponse = {
        access_token: 'riJWTo',
        token_type: 'bearer',
        refresh_token: 'refreshtoken',
        expires_in: 43199,
        scope: 'openid',
        jti: 'whatever'
      };

      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders('Basic aG9yc3RpOmJvcnN0aQ==')
      })
        .post(
          '/oauth/token',
          'grant_type=refresh_token&refresh_token=refreshtoken'
        )
        .reply(200, expectedResponse);

      const response = await refreshTokenGrant(
        providerXsuaaClientCredentials,
        creds,
        refreshToken
      );
      expect(response).toEqual(expectedResponse);
    });

    it('returns 401 for wrong credentials', async () => {
      const expectedResponse = {
        error: 'unauthorized',
        error_description: 'Bad credentials'
      };

      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders('Basic aG9yc3RpOmJvcnN0aQ==')
      })
        .post(
          '/oauth/token',
          'grant_type=refresh_token&refresh_token=refreshtoken'
        )
        .reply(401, expectedResponse);

      try {
        await refreshTokenGrant(
          providerXsuaaClientCredentials,
          creds,
          refreshToken,
          {
            enableCircuitBreaker: false
          }
        );
      } catch (error) {
        expect(error.message).toBe(
          'FetchTokenError: Refresh token Grant failed! Request failed with status code 401'
        );
      }
    });

    it('returns 401 for invalid refresh token', async () => {
      const expectedResponse = {
        error: 'invalid_token',
        error_description:
          'The token expired, was revoked, or the token ID is incorrect.'
      };

      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders('Basic aG9yc3RpOmJvcnN0aQ==')
      })
        .post(
          '/oauth/token',
          'grant_type=refresh_token&refresh_token=refreshtoken'
        )
        .reply(401, expectedResponse);

      try {
        await refreshTokenGrant(
          providerXsuaaClientCredentials,
          creds,
          refreshToken,
          {
            enableCircuitBreaker: false
          }
        );
      } catch (error) {
        expect(error.message).toBe(
          'FetchTokenError: Refresh token Grant failed! Request failed with status code 401'
        );
      }
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
            n:
              'AMf4zeb9Zqf01Z_Z00KGFSFHwrFAx2t1Ka-bQ2Qu5s5U6zdj58K7s8ku8NSXfkrasFuP75_O7mtmJWc1PDm9I0eJWzjwimhyItJMjbSV0L0Oy2TxvHqUC28dCCD_1i1VVbQfGy-Tlrh5mt6VJ4m25gE7WzoeS5LENsyzJ4BI1BediUMs06Y6EJGoadATXv3a5QKjtud5HomOtxS-m3pSoyRpkqnZ6LUl8Qdspvh0NEoWjb0xSxL4tvjm5MoxloBaUGqAnBqtCl9MtJj8zr3RbDU_qwRXZB4iviZet_Em4ptc_XyLRWx_YYlcGN-0fay7R9WCotz7gEzI3_wye5lJbg0'
          },
          {
            kty: 'RSA',
            e: 'AQAB',
            use: 'sig',
            kid: 'key-id-1',
            alg: 'RS256',
            value: `-----BEGIN PUBLIC KEY-----${unixEOL}MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAx/jN5v1mp/TVn9nTQoYV${unixEOL}IUfCsUDHa3Upr5tDZC7mzlTrN2PnwruzyS7w1Jd+StqwW4/vn87ua2YlZzU8Ob0j${unixEOL}R4lbOPCKaHIi0kyNtJXQvQ7LZPG8epQLbx0IIP/WLVVVtB8bL5OWuHma3pUnibbm${unixEOL}ATtbOh5LksQ2zLMngEjUF52JQyzTpjoQkahp0BNe/drlAqO253keiY63FL6belKj${unixEOL}JGmSqdnotSXxB2ym+HQ0ShaNvTFLEvi2+ObkyjGWgFpQaoCcGq0KX0y0mPzOvdFs${unixEOL}NT+rBFdkHiK+Jl638Sbim1z9fItFbH9hiVwY37R9rLtH1YKi3PuATMjf/DJ7mUlu${unixEOL}DQIDAQAB${unixEOL}-----END PUBLIC KEY-----`,
            n:
              'AMf4zeb9Zqf01Z_Z00KGFSFHwrFAx2t1Ka-bQ2Qu5s5U6zdj58K7s8ku8NSXfkrasFuP75_O7mtmJWc1PDm9I0eJWzjwimhyItJMjbSV0L0Oy2TxvHqUC28dCCD_1i1VVbQfGy-Tlrh5mt6VJ4m25gE7WzoeS5LENsyzJ4BI1BediUMs06Y6EJGoadATXv3a5QKjtud5HomOtxS-m3pSoyRpkqnZ6LUl8Qdspvh0NEoWjb0xSxL4tvjm5MoxloBaUGqAnBqtCl9MtJj8zr3RbDU_qwRXZB4iviZet_Em4ptc_XyLRWx_YYlcGN-0fay7R9WCotz7gEzI3_wye5lJbg0'
          }
        ]
      };

      nock(providerXsuaaUrl, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(200, response);

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

      const actual = await fetchVerificationKeys(
        providerXsuaaUrl,
        creds.username,
        creds.password
      );
      expect(actual).toEqual(expected);
    });

    it('provides some useful message on failure', done => {
      const response = {
        error: 'unauthorized',
        error_description: 'Bad credentials'
      };

      nock(providerXsuaaUrl, { reqheaders: { Authorization: basicHeader } })
        .get('/')
        .reply(401, response);

      fetchVerificationKeys(providerXsuaaUrl, creds.username, creds.password)
        .then(() => done('Should have failed!'))
        .catch(error => {
          expect(
            error.message.includes(
              `Failed to fetch verification keys from XSUAA service instance ${providerXsuaaUrl}!`
            )
          ).toBe(true);
          done();
        });
    });
  });
});

function reqHeaders(authHeader: string) {
  return {
    authorization: authHeader,
    'content-type': 'application/x-www-form-urlencoded',
    accept: 'application/json',
    'user-agent': 'axios/0.21.1'
  };
}
