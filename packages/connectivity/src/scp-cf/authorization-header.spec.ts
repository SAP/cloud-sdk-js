import { createLogger } from '@sap-cloud-sdk/util';
import {
  defaultBasicCredentials,
  defaultDestination
} from '../../../../test-resources/test/test-util/request-mocker';
import { buildAuthorizationHeaders } from './authorization-header';
import * as destinationImport from './destination/destination';
import type { Destination } from './destination';

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

describe('buildAuthorizationHeaders', () => {
  describe('basic authentication', () => {
    it('creates basic authentication headers from destination credentials.', async () => {
      const headers = await buildAuthorizationHeaders(defaultDestination);
      expect(headers.authorization).toBe(defaultBasicCredentials);
    });

    it('prioritizes destination headers before SDK built headers', async () => {
      const headers = await buildAuthorizationHeaders({
        ...defaultDestination,
        headers: { authorization: 'destinationHeader' }
      });
      expect(headers.authorization).toEqual('destinationHeader');
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

    it('defaults to NoAuthentication and does not create authentication headers when only URL is defined', async () => {
      const spy = jest.spyOn(destinationImport, 'sanitizeDestination');
      const headerPromise = buildAuthorizationHeaders({
        url: 'https://example.com'
      });
      await expect(headerPromise).resolves.not.toThrow();
      expect(spy).toHaveReturnedWith(
        expect.objectContaining({ authentication: 'NoAuthentication' })
      );
      expect((await headerPromise).authorization).toBeUndefined();
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

    it('throws when no `SAP-Connectivity-Authentication` header is given', async () => {
      await expect(
        buildAuthorizationHeaders(
          removeSapConnectivityAuthentication(principalPropagationDestination)
        )
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Principal propagation was selected in destination, but no SAP-Connectivity-Authentication bearer header was added by connectivity service."'
      );
    });

    it('gets `SAP-Connectivity-Authentication` header from destination headers second', async () => {
      await expect(
        buildAuthorizationHeaders(principalPropagationDestination)
      ).resolves.toEqual({
        'Proxy-Authorization': 'someProxyValue',
        'SAP-Connectivity-Authentication': 'someValueDestination'
      });
    });
  });
  describe('SamlAssertion', () => {
    it('should add the auth token from the destination', async () => {
      const destination: Destination = {
        ...defaultDestination,
        authentication: 'SAMLAssertion',
        authTokens: [
          {
            type: 'SAML2.0',
            value: 'some.token',
            expiresIn: '3600',
            error: null,
            http_header: {
              key: 'Authorization',
              value: 'SAML2.0 some.token'
            }
          }
        ]
      };
      const logger = createLogger({
        package: 'connectivity',
        messageContext: 'authorization-header'
      });
      const warnSpy = jest.spyOn(logger, 'warn');
      const actual = await buildAuthorizationHeaders(destination);
      expect(warnSpy).toHaveBeenCalledWith(
        "Destination authentication flow is 'SamlAssertion' and the auth header contains the SAML assertion. In most cases you want to translate the assertion to a Bearer token using the 'OAuth2SAMLBearerAssertion' flow."
      );

      expect(actual).toEqual({
        authorization: destination.authTokens![0].http_header.value,
        'x-sap-security-session': 'create'
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

  describe('OAuth2Password', () => {
    it('should add the auth token from the destination', async () => {
      const destination: Destination = {
        ...defaultDestination,
        authentication: 'OAuth2Password',
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
        '"AuthenticationType is "BasicAuthentication", but "username" and / or "password" are missing!"'
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
        '"AuthenticationType is "BasicAuthentication", but "username" and / or "password" are missing!"'
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
