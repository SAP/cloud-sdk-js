/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import nock from 'nock';
import { buildHeaders } from '../../../src/request-builder/header-builder/header-builder';
import { ODataCreateRequestConfig } from '../../../src/request-builder/request/odata-create-request-config';
import { ODataGetAllRequestConfig } from '../../../src/request-builder/request/odata-get-all-request-config';
import { ODataRequest } from '../../../src/request-builder/request/odata-request';
import { ODataUpdateRequestConfig } from '../../../src/request-builder/request/odata-update-request-config';
import { sanitizeDestination } from '../../../src/scp-cf';
import { Destination } from '../../../src/scp-cf/destination-service-types';
import { mockedConnectivityServiceProxyConfig } from '../../test-util/environment-mocks';
import { muteLoggers } from '../../test-util/mute-logger';
import {
  defaultBasicCredentials,
  defaultDestination,
  mockHeaderRequest
} from '../../test-util/request-mocker';
import { TestEntity } from '../../test-util/test-services/test-service';
import * as csrfHeaders from '../../../src/request-builder/header-builder/csrf-headers';

describe('Header-builder:', () => {
  beforeAll(() => {
    muteLoggers('http-agent', 'csrf-headers', 'auth-headers');
  });

  it('customHeaders are not overwritten.', async () => {
    const authString = 'initial';
    const request = createGetAllRequest(defaultDestination);
    request.config.customHeaders = { authorization: authString };

    const headers = await buildHeaders(request);
    expect(headers.authorization).toBe(authString);
  });

  it('creates basic authentication headers from destination credentials.', async () => {
    const request = createGetAllRequest(defaultDestination);

    const headers = await buildHeaders(request);
    expect(headers.authorization).toBe(defaultBasicCredentials);
  });

  it('creates no authentication headers when only url is defined in a destination.', async () => {
    const request = createGetAllRequest({ url: defaultDestination.url });

    const headers = await buildHeaders(request);
    expect(headers.authorization).toBeUndefined();
  });

  it('uses authTokens if present on a destination', async () => {
    const destination: Destination = {
      ...defaultDestination,
      authentication: 'OAuth2SAMLBearerAssertion',
      authTokens: [
        {
          type: 'Bearer',
          value: 'some.token',
          expiresIn: '3600',
          error: null
        }
      ]
    };
    const request = createGetAllRequest(destination);
    const headers = await buildHeaders(request);

    expect(headers.authorization).toBe('Bearer some.token');
  });

  it('throws an error if the error property is truthy for all provided authTokens', async () => {
    const destination: Destination = {
      ...defaultDestination,
      authentication: 'OAuth2SAMLBearerAssertion',
      authTokens: [
        {
          type: 'Bearer',
          value: 'some.token',
          expiresIn: '3600',
          error: 'error'
        },
        {
          type: 'Bearer',
          value: 'some.other.token',
          expiresIn: '3600',
          error: 'error'
        }
      ]
    };
    const request = createGetAllRequest(destination);

    await expect(buildHeaders(request)).rejects.toThrowErrorMatchingSnapshot();
  });

  it('uses the first authToken where the error property is falsy', async () => {
    const destination: Destination = {
      ...defaultDestination,
      authentication: 'OAuth2SAMLBearerAssertion',
      authTokens: [
        {
          type: 'Bearer',
          value: 'some.token',
          expiresIn: '3600',
          error: 'error'
        },
        {
          type: 'Bearer',
          value: 'some.other.token',
          expiresIn: '3600',
          error: null
        }
      ]
    };
    const request = createGetAllRequest(destination);
    const headers = await buildHeaders(request);
    expect(headers.authorization).toBe('Bearer some.other.token');
  });

  it('Throws an error if no authTokens are present, username is null and authenticationType is wrongly set', async () => {
    const destination: Destination = {
      ...defaultDestination,
      username: null,
      authentication: 'BasicAuthentication'
    };
    const request = createGetAllRequest(destination);

    await expect(buildHeaders(request)).rejects.toThrowErrorMatchingSnapshot();
  });

  it('Throws an error if no authTokens are present, password is null and authenticationType is wrongly set', async () => {
    const destination: Destination = {
      ...defaultDestination,
      password: null,
      authentication: 'BasicAuthentication'
    };
    const request = createGetAllRequest(destination);

    await expect(buildHeaders(request)).rejects.toThrowErrorMatchingSnapshot();
  });

  describe('update request header with etag', () => {
    it('if-match should not be set when no etag is specified', async () => {
      const request = createUpdateRequest(defaultDestination);

      mockHeaderRequest({ request });

      const actual = await buildHeaders(request);
      expect(actual['if-match']).toBeUndefined();
    });

    it('if-match should be set when etag is specified in header-builder', async () => {
      const request = createUpdateRequest(defaultDestination);
      request.config.eTag = 'W//';

      mockHeaderRequest({ request });

      const actual = await buildHeaders(request);
      expect(actual['if-match']).toBe('W//');
    });

    it('if-match should be set to * when version identifier is ignored', async () => {
      const request = createUpdateRequest(defaultDestination);
      request.config.eTag = 'W//';
      // Set by ignoreVersionIdentifier()
      request.config.versionIdentifierIgnored = true;

      mockHeaderRequest({ request });

      const actual = await buildHeaders(request);
      expect(actual['if-match']).toBe('*');
    });
  });

  it('Adds proxy headers to the headers if there is a proxy configuration in the destination', async () => {
    const proxyHeaders = {
      'Proxy-Authorization': 'Bearer jwt',
      'SAP-Connectivity-Authentication': 'Bearer jwt'
    };

    const destination: Destination = {
      url: 'https://destination.example.com',
      proxyType: 'OnPremise',
      proxyConfiguration: {
        ...mockedConnectivityServiceProxyConfig,
        headers: proxyHeaders
      }
    };

    const request = createGetAllRequest(destination);
    const headers = await request.headers();

    expect(headers['Proxy-Authorization']).toBe('Bearer jwt');
    expect(headers['SAP-Connectivity-Authentication']).toBe('Bearer jwt');
  });

  it('Adds location id headers to the headers if there is a cloudConnectorLocationId in the destination', async () => {
    const destination: Destination = {
      url: 'https://destination.example.com',
      cloudConnectorLocationId: 'Potsdam'
    };

    const request = createGetAllRequest(destination);
    const headers = await request.headers();
    expect(headers['SAP-Connectivity-SCC-Location_ID']).toBe('Potsdam');
  });

  it('Adds location id headers to the fetch csrf token request if there is a cloudConnectorLocationId in the destination', async () => {
    const destination: Destination = {
      url: 'https://destination.example.com',
      cloudConnectorLocationId: 'Potsdam'
    };

    const mockedHeaders = {
      'x-csrf-token': 'mocked-x-csrf-token',
      'set-cookie': ['mocked-cookie-0;mocked-cookie-1', 'mocked-cookie-2']
    };

    nock('https://destination.example.com', {
      reqheaders: {
        'sap-connectivity-scc-location_id': 'Potsdam',
        'x-csrf-token': 'Fetch'
      }
    })
      .get('/sap/opu/odata/sap/API_TEST_SRV')
      .reply(200, undefined, mockedHeaders);

    const request = createCreateRequest(destination);
    const headers = await request.headers();

    expect(headers['SAP-Connectivity-SCC-Location_ID']).toBe('Potsdam');
    expect(headers['x-csrf-token']).toBe('mocked-x-csrf-token');
  });

  it('Fetching CSRF tokens works even if the endpoint responds with a non-200 HTTP code', async () => {
    const request = createCreateRequest(defaultDestination);

    mockHeaderRequest({ request });

    const headers = await request.headers();
    expect(headers['x-csrf-token']).toBe('mocked-x-csrf-token');
  });

  it('Skips csrf token retrieval for existing csrf header', async () => {
    spyOn(csrfHeaders, 'getCsrfHeaders');
    const request = createCreateRequest(defaultDestination);
    request.config.customHeaders = { 'x-csrf-token': 'defined' };

    mockHeaderRequest({ request });

    await request.headers();
    expect(csrfHeaders.getCsrfHeaders).not.toHaveBeenCalled();
  });

  it('Skips csrf token retrieval for GET request', async () => {
    spyOn(csrfHeaders, 'getCsrfHeaders');
    const request = createGetAllRequest(defaultDestination);

    mockHeaderRequest({ request });

    await request.headers();
    expect(csrfHeaders.getCsrfHeaders).not.toHaveBeenCalled();
  });

  it('Prioritizes custom Authorization headers (upper case A)', async () => {
    const request = createGetAllRequest(defaultDestination);
    request.config.addCustomHeaders({
      Authorization: 'Basic SOMETHINGSOMETHING'
    });

    const headers = await request.headers();
    expect(headers.authorization).toBe('Basic SOMETHINGSOMETHING');
  });

  it('Prioritizes custom Authorization headers (lower case A)', async () => {
    const request = createGetAllRequest(defaultDestination);
    request.config.addCustomHeaders({
      authorization: 'Basic SOMETHINGSOMETHING'
    });

    const headers = await request.headers();
    expect(headers.authorization).toBe('Basic SOMETHINGSOMETHING');
  });

  describe('OAuth2ClientCredentials', () => {
    const destination: Destination = {
      ...defaultDestination,
      authentication: 'OAuth2ClientCredentials',
      tokenServiceUrl: 'https://token.example.com/oauth/token',
      clientId: 'TokenClientId',
      clientSecret: 'TokenClientSecret'
    };

    const requestBody =
      'grant_type=client_credentials&client_id=TokenClientId&client_secret=TokenClientSecret';
    const fakeToken = 'FakeOAuth2ClientCredentialsToken';

    it('should add access token to the request header for "OAuth2ClientCredentials" authentication', async () => {
      nock('https://token.example.com', {
        reqheaders: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: 'Basic VG9rZW5DbGllbnRJZDpUb2tlbkNsaWVudFNlY3JldA=='
        }
      })
        .post('/oauth/token', requestBody)
        .once()
        .reply(200, { access_token: fakeToken, expires_in: 0, scope: '' });

      const request = createGetAllRequest(destination);
      const actual = await buildHeaders(request);

      expect(actual).toEqual({
        authorization: 'Bearer ' + fakeToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'sap-client': '123'
      });
    });

    it('should use  tokenServiceUser and tokenServicePassword in header authorization when specified', async () => {
      destination.tokenServiceUser = 'TokenServiceUser';
      destination.tokenServicePassword = 'TokenServicePassword';
      nock('https://token.example.com', {
        reqheaders: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization:
            'Basic VG9rZW5TZXJ2aWNlVXNlcjpUb2tlblNlcnZpY2VQYXNzd29yZA=='
        }
      })
        .post('/oauth/token', requestBody)
        .once()
        .reply(200, { access_token: fakeToken, expires_in: 0, scope: '' });

      const request = createGetAllRequest(destination);
      const actual = await buildHeaders(request);

      expect(actual).toEqual({
        authorization: 'Bearer ' + fakeToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'sap-client': '123'
      });
    });

    it('should throw an error if tokenServiceUrl, client_id or client_secret are not set', async () => {
      delete destination.tokenServiceUrl;

      const request = createGetAllRequest(destination);
      await expect(
        buildHeaders(request)
      ).rejects.toThrowErrorMatchingSnapshot();
    });

    it('should throw an error when the access token to the request header for "OAuth2ClientCredentials" is rejected', async () => {
      nock('https://token.example.com', {
        reqheaders: {
          'content-type': 'application/x-www-form-urlencoded',
          authorization: 'Basic VG9rZW5DbGllbnRJZDpUb2tlbkNsaWVudFNlY3JldA=='
        }
      })
        .post('/oauth/token', requestBody)
        .once()
        .reply(401, {
          error: 'unauthorized',
          error_description: 'Bad credentials'
        });

      const request = createGetAllRequest(destination);
      await expect(
        buildHeaders(request)
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });
});

function createUpdateRequest(dest: Destination) {
  const requestConfig = new ODataUpdateRequestConfig(TestEntity);
  return new ODataRequest(requestConfig, sanitizeDestination(dest));
}

function createGetAllRequest(dest: Destination) {
  const requestConfig = new ODataGetAllRequestConfig(TestEntity);
  return new ODataRequest(requestConfig, sanitizeDestination(dest));
}

function createCreateRequest(dest: Destination) {
  const requestConfig = new ODataCreateRequestConfig(TestEntity);
  return new ODataRequest(requestConfig, sanitizeDestination(dest));
}
