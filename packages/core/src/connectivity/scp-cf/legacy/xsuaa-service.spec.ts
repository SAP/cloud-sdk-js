import { fail } from 'assert';
import nock from 'nock';
import axios, { AxiosRequestConfig } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import {
  providerXsuaaClientCredentials,
  providerXsuaaUrl
} from '../../../../test/test-util/environment-mocks';
import {
  clientCredentialsGrant,
  refreshTokenGrant,
  userTokenGrant
} from './xsuaa-service';

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

  describe('web proxy handling', () => {
    it('includes the proxy if present', async () => {
      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders(basicHeader)
      })
        .post('/oauth/token', 'grant_type=client_credentials')
        .reply(200, expectedResponse200);
      process.env.https_proxy = 'http://some.test.proxy.com:1234';
      const spy = jest.spyOn(axios, 'request');
      await clientCredentialsGrant(providerXsuaaClientCredentials, creds);
      const expectedConfig: AxiosRequestConfig = {
        url: 'https://provider.example.com/oauth/token',
        method: 'post',
        data: 'grant_type=client_credentials',
        proxy: false,
        headers: {
          Accept: 'application/json',
          Authorization: basicHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        httpsAgent: new HttpsProxyAgent({
          port: 1234,
          host: 'some.test.proxy.com',
          protocol: 'http',
          rejectUnauthorized: true
        })
      };

      expect(spy).toHaveBeenCalledWith(expectedConfig);
      delete process.env.https_proxy;
    });

    it('considers the no_proxy if present', async () => {
      nock(providerXsuaaUrl, {
        reqheaders: reqHeaders(basicHeader)
      })
        .post('/oauth/token', 'grant_type=client_credentials')
        .reply(200, expectedResponse200);
      process.env.https_proxy = 'http://some.test.proxy.com:1234';
      process.env.no_proxy = 'https://provider.example.com/oauth/token';
      const spy = jest.spyOn(axios, 'request');
      await clientCredentialsGrant(providerXsuaaClientCredentials, creds);
      const expectedConfig: AxiosRequestConfig = {
        url: 'https://provider.example.com/oauth/token',
        proxy: false,
        method: 'post',
        data: 'grant_type=client_credentials',
        headers: {
          Accept: 'application/json',
          Authorization: basicHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        // The jest matchers have problems to match two  instances of an httpsAgent.
        // As a workaround I wanted to assert on proxy:undefined but was not able to achieve this.
        // The "_events" property is only present for the httpAgent and not the httpProxyAgent so this works as an implicit test.
        httpsAgent: expect.objectContaining({
          _events: expect.anything(),
          options: expect.objectContaining({ rejectUnauthorized: true })
        })
      };

      expect(spy).toHaveBeenCalledWith(expect.objectContaining(expectedConfig));
      delete process.env.https_proxy;
      delete process.env.no_proxy;
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
        clientId,
        { enableCircuitBreaker: false }
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
        refreshToken,
        { enableCircuitBreaker: false }
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
});

function reqHeaders(authHeader: string) {
  return {
    authorization: authHeader,
    'content-type': 'application/x-www-form-urlencoded',
    accept: 'application/json'
  };
}
