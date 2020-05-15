/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import nock from 'nock';
import { MapType } from '@sap-cloud-sdk/util';
import {
  buildAndAddAuthorizationHeader,
  Destination,
  ODataRequest,
  oDataUri
} from '../../../src';
import {
  addAuthorizationHeader,
  buildAuthorizationHeaders
} from '../../../src/header-builder/authorization-header';
import { ODataGetAllRequestConfig } from '../../../src/odata/common/request-builder/request/odata-get-all-request-config';
import {
  defaultDestination,
  defaultBasicCredentials
} from '../../test-util/request-mocker';
import { TestEntity } from '../../test-util/test-services/v2/test-service';
import { buildHeadersForDestination } from '../../../src/header-builder/header-builder';

describe('Authorization header builder', () => {
  it('does not throw on NoAuthentication', async () => {
    await expect(
      buildAuthorizationHeaders({
        url: 'https://example.com',
        authentication: 'NoAuthentication'
      })
    ).resolves.not.toThrow();
  });

  it('does not throw on ClientCertificateAuthentication', async () => {
    await expect(
      buildAuthorizationHeaders({
        url: 'https://example.com',
        authentication: 'ClientCertificateAuthentication'
      })
    ).resolves.not.toThrow();
  });

  it('defaults to NoAuthentication', async () => {
    await expect(
      buildAuthorizationHeaders({ url: 'https://example.com' })
    ).resolves.not.toThrow();
  });

  it('does not throw on Principal Propagation', async () => {
    const destination = {
      url: '',
      authentication: 'PrincipalPropagation',
      proxyType: 'OnPremise',
      proxyConfiguration: {
        headers: {
          'SAP-Connectivity-Authentication': 'someValue',
          'Proxy-Authorization': 'someProxyValue'
        }
      }
    } as Destination;

    const headers = await buildAuthorizationHeaders(destination);
    checkHeaders(headers);

    delete destination!.proxyConfiguration!.headers![
      'SAP-Connectivity-Authentication'
    ];
    await expect(
      buildAuthorizationHeaders(destination)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it("should still add header if the old 'NoAuthorization' workaround is used.", async () => {
    const destination = {
      url: '',
      authentication: 'NoAuthentication',
      proxyType: 'OnPremise',
      proxyConfiguration: {
        headers: {
          'SAP-Connectivity-Authentication': 'someValue',
          'Proxy-Authorization': 'someProxyValue'
        }
      }
    } as Destination;

    const headers = await buildHeadersForDestination(destination);
    checkHeaders(headers);
  });

  describe('[deprecated]', () => {
    it('Prioritizes custom Authorization headers (upper case A)', async () => {
      const request = new ODataRequest(
        new ODataGetAllRequestConfig(TestEntity, oDataUri),
        defaultDestination
      );
      request.config.addCustomHeaders({
        Authorization: 'Basic SOMETHINGSOMETHING'
      });

      const headers = await addAuthorizationHeader(request, {});
      expect(headers.authorization).toBe('Basic SOMETHINGSOMETHING');
    });

    it('Prioritizes custom Authorization headers (lower case A)', async () => {
      const request = new ODataRequest(
        new ODataGetAllRequestConfig(TestEntity, oDataUri),
        defaultDestination
      );
      request.config.addCustomHeaders({
        authorization: 'Basic SOMETHINGSOMETHING'
      });

      const headers = await addAuthorizationHeader(request, {});
      expect(headers.authorization).toBe('Basic SOMETHINGSOMETHING');
    });

    it('does not throw on NoAuthentication', async () => {
      await expect(
        buildAndAddAuthorizationHeader({
          url: 'https://example.com',
          authentication: 'NoAuthentication'
        })({})
      ).resolves.not.toThrow();
    });

    it('does not throw on ClientCertificateAuthentication', async () => {
      await expect(
        buildAndAddAuthorizationHeader({
          url: 'https://example.com',
          authentication: 'ClientCertificateAuthentication'
        })({})
      ).resolves.not.toThrow();
    });

    it('defaults to NoAuthentication', async () => {
      await expect(
        buildAndAddAuthorizationHeader({ url: 'https://example.com' })({})
      ).resolves.not.toThrow();
    });

    it('does not throw on Principal Propagation', async () => {
      const destination = {
        url: '',
        authentication: 'PrincipalPropagation',
        proxyType: 'OnPremise',
        proxyConfiguration: {
          headers: {
            'SAP-Connectivity-Authentication': 'someValue',
            'Proxy-Authorization': 'someProxyValue'
          }
        }
      } as Destination;

      const headers = await buildAndAddAuthorizationHeader(destination)({});
      expect(headers['SAP-Connectivity-Authentication']).toBe('someValue');
      expect(headers['Proxy-Authorization']).toBe('someProxyValue');

      delete destination!.proxyConfiguration!.headers![
        'SAP-Connectivity-Authentication'
      ];
      await expect(
        buildAndAddAuthorizationHeader(destination)({})
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });

  it('creates basic authentication headers from destination credentials.', async () => {
    const headers = await buildAuthorizationHeaders(defaultDestination);
    expect(headers.authorization).toBe(defaultBasicCredentials);
  });

  it('creates no authentication headers when only url is defined in a destination.', async () => {
    const headers = await buildAuthorizationHeaders({
      url: defaultDestination.url
    });
    expect(headers.authorization).toBeUndefined();
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

    await expect(
      buildAuthorizationHeaders(destination)
    ).rejects.toThrowErrorMatchingSnapshot();
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
    const headers = await buildAuthorizationHeaders(destination);
    expect(headers.authorization).toBe('Bearer some.other.token');
  });

  it('Throws an error if no authTokens are present, username is null and authenticationType is wrongly set', async () => {
    const destination: Destination = {
      ...defaultDestination,
      username: null,
      authentication: 'BasicAuthentication'
    };

    await expect(
      buildAuthorizationHeaders(destination)
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  it('Throws an error if no authTokens are present, password is null and authenticationType is wrongly set', async () => {
    const destination: Destination = {
      ...defaultDestination,
      password: null,
      authentication: 'BasicAuthentication'
    };

    await expect(
      buildAuthorizationHeaders(destination)
    ).rejects.toThrowErrorMatchingSnapshot();
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

      const actual = await buildAuthorizationHeaders(destination);

      expect(actual).toEqual({
        authorization: 'Bearer ' + fakeToken
      });
    });

    it('should use tokenServiceUser and tokenServicePassword in header authorization when specified', async () => {
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

      const actual = await buildAuthorizationHeaders(destination);

      expect(actual).toEqual({
        authorization: 'Bearer ' + fakeToken
      });
    });

    it('should throw an error if tokenServiceUrl, client_id or client_secret are not set', async () => {
      delete destination.tokenServiceUrl;

      await expect(
        buildAuthorizationHeaders(destination)
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

      await expect(
        buildAuthorizationHeaders(destination)
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });
});

function checkHeaders(headers: MapType<any>) {
  expect(headers['SAP-Connectivity-Authentication']).toBe('someValue');
  expect(headers['Proxy-Authorization']).toBe('someProxyValue');
}
