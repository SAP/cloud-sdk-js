import {
  ODataGetAllRequestConfig,
  ODataRequest
} from '../../odata-common/request';
import { TestEntity } from '../../../test/test-util/test-services/v2/test-service';
import { oDataUri as oDataUriV2 } from '../../odata-v2/uri-conversion';
import {
  defaultBasicCredentials,
  defaultDestination
} from '../../../test/test-util/request-mocker';
import { Destination } from './destination';
import {
  addAuthorizationHeader,
  buildAndAddAuthorizationHeader,
  buildAuthorizationHeaders,
  getAuthHeaders
} from './authorization-header';

const principalPropagationDestination = {
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

function removeSapConnectivityAuthentication(destination) {
  const destinationWithoutAuth = JSON.parse(JSON.stringify(destination));
  delete destinationWithoutAuth!.proxyConfiguration!.headers![
    'SAP-Connectivity-Authentication'
  ];

  return destinationWithoutAuth;
}

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
    it('builds headers', async () => {
      const headers = await buildAuthorizationHeaders(
        principalPropagationDestination
      );
      checkHeaders(headers);
    });

    it('does not throw on Principal Propagation', async () => {
      await expect(
        buildAuthorizationHeaders(
          removeSapConnectivityAuthentication(principalPropagationDestination)
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Principal propagation was selected in destination, but no SAP-Connectivity-Authentication bearer header was added by connectivity service."'
      );
    });
  });

  describe('OAuth2UserTokenExchange', () => {
    it('should add the auth token from the destination', async () => {
      const destination: Destination = {
        ...defaultDestination,
        authentication: 'OAuth2UserTokenExchange',
        authTokens: [
          {
            type: 'Bearer',
            value: 'some.token',
            expiresIn: '3600',
            error: null,
            http_header: {
              key: 'Authorization',
              value: 'Bearer some.token'
            }
          }
        ]
      };

      const actual = await buildAuthorizationHeaders(destination);

      expect(actual).toEqual({
        authorization: destination.authTokens![0].http_header.value
      });
    });
  });

  describe('OAuth2SAMLBearerAssertion', () => {
    it('should add the auth token from the destination', async () => {
      const destination: Destination = {
        ...defaultDestination,
        authentication: 'OAuth2SAMLBearerAssertion',
        authTokens: [
          {
            type: 'Bearer',
            value: 'some.token',
            expiresIn: '3600',
            error: null,
            http_header: {
              key: 'Authorization',
              value: 'Bearer some.token'
            }
          }
        ]
      };

      const actual = await buildAuthorizationHeaders(destination);

      expect(actual).toEqual({
        authorization: 'Bearer some.token'
      });
    });
  });

  describe('OAuth2ClientCredentials', () => {
    it('should add the auth token from the destination', async () => {
      const destination: Destination = {
        ...defaultDestination,
        authentication: 'OAuth2ClientCredentials',
        authTokens: [
          {
            type: 'Bearer',
            value: 'some.token',
            expiresIn: '3600',
            error: null,
            http_header: {
              key: 'Authorization',
              value: 'Bearer some.token'
            }
          }
        ]
      };

      const actual = await buildAuthorizationHeaders(destination);

      expect(actual).toEqual({
        authorization: 'Bearer some.token'
      });
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
            error: 'error',
            http_header: {
              key: 'Authorization',
              value: 'Bearer some.token'
            }
          },
          {
            type: 'Bearer',
            value: 'some.other.token',
            expiresIn: '3600',
            error: 'error',
            http_header: {
              key: 'Authorization',
              value: 'Bearer some.other.token'
            }
          }
        ]
      };

      await expect(buildAuthorizationHeaders(destination)).rejects
        .toThrowErrorMatchingInlineSnapshot(`
              "The destination tried to provide authorization tokens but failed in all cases. This is most likely due to misconfiguration.
              Original error messages:
              error
              error"
            `);
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
            error: 'error',
            http_header: {
              key: 'Authorization',
              value: 'Bearer some.token'
            }
          },
          {
            type: 'Bearer',
            value: 'some.other.token',
            expiresIn: '3600',
            error: null,
            http_header: {
              key: 'Authorization',
              value: 'Bearer some.other.token'
            }
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
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"AuthenticationType is \\"BasicAuthentication\\", but \\"username\\" and / or \\"password\\" are missing!"'
      );
    });

    it('Throws an error if no authTokens are present, password is null and authenticationType is wrongly set', async () => {
      const destination: Destination = {
        ...defaultDestination,
        password: null,
        authentication: 'BasicAuthentication'
      };

      await expect(
        buildAuthorizationHeaders(destination)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"AuthenticationType is \\"BasicAuthentication\\", but \\"username\\" and / or \\"password\\" are missing!"'
      );
    });
  });
});

describe('getAuthHeaders', () => {
  it('does not throw for custom principal propagation header', async () => {
    const authHeader = { 'SAP-Connectivity-Authentication': 'token' };
    await expect(
      getAuthHeaders(
        removeSapConnectivityAuthentication(principalPropagationDestination),
        authHeader
      )
    ).resolves.toEqual(authHeader);
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
    ).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Principal propagation was selected in destination, but no SAP-Connectivity-Authentication bearer header was added by connectivity service."'
    );
  });
});

export function checkHeaders(headers: Record<string, any>) {
  expect(headers['SAP-Connectivity-Authentication']).toBe('someValue');
  expect(headers['Proxy-Authorization']).toBe('someProxyValue');
}
