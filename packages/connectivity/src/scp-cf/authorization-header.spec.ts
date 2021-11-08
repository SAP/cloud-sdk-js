import {
  defaultBasicCredentials,
  defaultDestination
} from '../../../../test-resources/test/test-util/request-mocker';
import { getAuthHeaders } from './authorization-header';
import { Destination } from './destination/destination-service-types';

const principalPropagationDestination = {
  url: '',
  authentication: 'PrincipalPropagation',
  proxyType: 'OnPremise',
  proxyConfiguration: {
    headers: {
      'SAP-Connectivity-Authentication': 'someValueDestination',
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

describe('getAuthHeaders', () => {
  describe('basic authentication', () => {
    it('creates basic authentication headers from destination credentials.', async () => {
      const headers = await getAuthHeaders(defaultDestination);
      expect(headers.authorization).toBe(defaultBasicCredentials);
    });

    it('prioritizes destination headers before SDK built headers', async () => {
      const headers = await getAuthHeaders({
        ...defaultDestination,
        headers: { authorization: 'destinationHeader' }
      });
      expect(headers.authorization).toEqual('destinationHeader');
    });

    it('prioritizes custom headers before SDK built headers', async () => {
      const headers = await getAuthHeaders(defaultDestination, {
        authorization: 'custom'
      });
      expect(headers.authorization).toEqual('custom');
    });

    it('prioritizes custom headers before destination headers', async () => {
      const headers = await getAuthHeaders(
        {
          ...defaultDestination,
          headers: { authorization: 'destinationHeader' }
        },
        {
          authorization: 'custom'
        }
      );
      expect(headers.authorization).toEqual('custom');
    });
  });

  describe('no authentication', () => {
    it('does not throw on NoAuthentication', async () => {
      await expect(
        getAuthHeaders({
          url: 'https://example.com',
          authentication: 'NoAuthentication'
        })
      ).resolves.not.toThrow();
    });

    it('defaults to NoAuthentication', async () => {
      await expect(
        getAuthHeaders({ url: 'https://example.com' })
      ).resolves.not.toThrow();
    });

    it('creates no authentication headers when only url is defined in a destination.', async () => {
      const headers = await getAuthHeaders({
        url: defaultDestination.url
      });
      expect(headers.authorization).toBeUndefined();
    });
  });

  describe('client credentials', () => {
    it('does not throw on ClientCertificateAuthentication', async () => {
      await expect(
        getAuthHeaders({
          url: 'https://example.com',
          authentication: 'ClientCertificateAuthentication'
        })
      ).resolves.not.toThrow();
    });
  });

  describe('principal propagation', () => {
    it('builds headers', async () => {
      const headers = await getAuthHeaders(principalPropagationDestination);
      checkHeaders(headers);
    });

    it('throws when no `SAP-Connectivity-Authentication` header is given', async () => {
      await expect(
        getAuthHeaders(
          removeSapConnectivityAuthentication(principalPropagationDestination)
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Principal propagation was selected in destination, but no SAP-Connectivity-Authentication bearer header was added by connectivity service."'
      );
    });

    it('gets `SAP-Connectivity-Authentication` header from custom headers first', async () => {
      const authHeader = {
        'SAP-Connectivity-Authentication': 'someValueCustom'
      };
      await expect(
        getAuthHeaders(principalPropagationDestination, authHeader)
      ).resolves.toEqual({
        'Proxy-Authorization': 'someProxyValue',
        'SAP-Connectivity-Authentication': 'someValueCustom'
      });
    });

    it('gets `SAP-Connectivity-Authentication` header from destination headers second', async () => {
      await expect(
        getAuthHeaders(principalPropagationDestination)
      ).resolves.toEqual({
        'Proxy-Authorization': 'someProxyValue',
        'SAP-Connectivity-Authentication': 'someValueDestination'
      });
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

      const actual = await getAuthHeaders(destination);

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

      const actual = await getAuthHeaders(destination);

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

      const actual = await getAuthHeaders(destination);

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

      await expect(getAuthHeaders(destination)).rejects
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
      const headers = await getAuthHeaders(destination);
      expect(headers.authorization).toBe('Bearer some.other.token');
    });

    it('Throws an error if no authTokens are present, username is null and authenticationType is wrongly set', async () => {
      const destination: Destination = {
        ...defaultDestination,
        username: null,
        authentication: 'BasicAuthentication'
      };

      await expect(
        getAuthHeaders(destination)
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
        getAuthHeaders(destination)
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"AuthenticationType is \\"BasicAuthentication\\", but \\"username\\" and / or \\"password\\" are missing!"'
      );
    });
  });
});

export function checkHeaders(headers: Record<string, any>) {
  expect(headers['SAP-Connectivity-Authentication']).toBe(
    'someValueDestination'
  );
  expect(headers['Proxy-Authorization']).toBe('someProxyValue');
}
