import nock from 'nock';
import {
  ODataGetAllRequestConfig,
  ODataRequest
} from '../../odata-common/request';
import { TestEntity } from '../../../test/test-util/test-services/v2/test-service';
import { oDataUriV2 } from '../../odata-v2/uri-conversion';
import {
  defaultBasicCredentials,
  defaultDestination
} from '../../../test/test-util/request-mocker';
import { Destination } from './destination';
import {
  addAuthorizationHeader, basicHeader,
  buildAndAddAuthorizationHeader,
  buildAuthorizationHeaders
} from './authorization-header';

describe('buildAuthorizationHeaders', () => {
  describe('basic authentication', () => {
    it('creates basic authentication headers from destination credentials.', async () => {
      const headers = await buildAuthorizationHeaders(defaultDestination);
      expect(headers.authorization).toBe(defaultBasicCredentials);
    });
  });

  describe('no authentication', () => {
    it('does not throw on NoAuthentication', async () => {
      await expect(
        buildAuthorizationHeaders({
          url: 'https://example.com',
          authentication: 'NoAuthentication'
        })
      ).resolves.not.toThrow();
    });

    it('defaults to NoAuthentication', async () => {
      await expect(
        buildAuthorizationHeaders({ url: 'https://example.com' })
      ).resolves.not.toThrow();
    });

    it('creates no authentication headers when only url is defined in a destination.', async () => {
      const headers = await buildAuthorizationHeaders({
        url: defaultDestination.url
      });
      expect(headers.authorization).toBeUndefined();
    });
  });

  describe('client credentials', () => {
    it('does not throw on ClientCertificateAuthentication', async () => {
      await expect(
        buildAuthorizationHeaders({
          url: 'https://example.com',
          authentication: 'ClientCertificateAuthentication'
        })
      ).resolves.not.toThrow();
    });
  });

  describe('principal propagation', () => {
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
          authorization: basicHeader(destination.clientId!,destination.clientSecret!)
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
          authorization: basicHeader(destination.tokenServiceUser,destination.tokenServicePassword)
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
          authorization: basicHeader(destination.clientId!,destination.clientSecret!)
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

  describe('auth token errors', () => {
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
  });
});

describe('[deprecated]', () => {
  it('Prioritizes custom Authorization headers (upper case A)', async () => {
    const request = new ODataRequest(
      new ODataGetAllRequestConfig(TestEntity, oDataUriV2),
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
      new ODataGetAllRequestConfig(TestEntity, oDataUriV2),
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

export function checkHeaders(headers: Record<string, any>) {
  expect(headers['SAP-Connectivity-Authentication']).toBe('someValue');
  expect(headers['Proxy-Authorization']).toBe('someProxyValue');
}
