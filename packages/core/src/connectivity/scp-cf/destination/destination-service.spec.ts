import nock from 'nock';
import * as jwt123 from 'jsonwebtoken';
import { destinationServiceUri } from '../../../../test/test-util/environment-mocks';
import { privateKey } from '../../../../test/test-util/keys';
import * as httpClient from '../../../http-client/http-client';
import { Protocol } from '../protocol';
import { Destination } from './destination-service-types';
import {
  fetchDestination,
  fetchInstanceDestinations,
  fetchSubaccountDestinations
} from './destination-service';

const jwt = jwt123.sign(
  JSON.stringify({ user_id: 'user', zid: 'tenant' }),
  privateKey(),
  {
    algorithm: 'RS512'
  }
);

const basicDestination = {
  Name: 'HTTP-BASIC',
  Type: 'HTTP',
  URL: 'https://my.system.com',
  Authentication: 'BasicAuthentication',
  ProxyType: 'Internet',
  TrustAll: 'TRUE',
  User: 'USER_NAME',
  Password: 'password'
};

const oauth2SamlBearerDestination = {
  Name: 'HTTP-OAUTH',
  Type: 'HTTP',
  URL: 'https://my.system.com/',
  Authentication: 'OAuth2SAMLBearerAssertion',
  ProxyType: 'Internet',
  audience: 'https://my.system.com',
  authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:X509',
  clientKey: 'password',
  nameIdFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
  scope: 'SOME_SCOPE',
  tokenServiceUser: 'TOKEN_USER',
  tokenServiceURL: 'https://my.system.com/sap/bc/sec/oauth2/token',
  userIdSource: 'email',
  tokenServicePassword: 'password'
};

describe('destination service', () => {
  describe('fetchInstanceDestinations', () => {
    it('fetches instance destinations and returns them as Destination array', async () => {
      const response = [basicDestination, oauth2SamlBearerDestination];

      const expected: Destination[] = [
        {
          name: 'HTTP-BASIC',
          url: 'https://my.system.com',
          authentication: 'BasicAuthentication',
          proxyType: 'Internet',
          username: 'USER_NAME',
          password: 'password',
          isTrustingAllCertificates: true,
          originalProperties: basicDestination,
          authTokens: []
        },
        {
          name: 'HTTP-OAUTH',
          url: 'https://my.system.com/',
          authentication: 'OAuth2SAMLBearerAssertion',
          proxyType: 'Internet',
          isTrustingAllCertificates: false,
          originalProperties: oauth2SamlBearerDestination,
          authTokens: []
        }
      ];

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/instanceDestinations')
        .reply(200, response);

      const instanceDestinations: Destination[] =
        await fetchInstanceDestinations(destinationServiceUri, jwt, {
          enableCircuitBreaker: false
        });
      expected.forEach((e, index) => {
        expect(instanceDestinations[index]).toMatchObject(e);
      });
    });

    it('returns 400 for an invalid JWT', async () => {
      const response = {
        ErrorMessage: 'Unable to parse the JWT in Authorization Header.'
      };

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/instanceDestinations')
        .reply(400, response);

      await expect(
        fetchInstanceDestinations(destinationServiceUri, jwt, {
          enableCircuitBreaker: false
        })
      ).rejects.toThrowError();
    });

    it('does not fail horribly when an internal server error occurs', async () => {
      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/instanceDestinations')
        .reply(500);

      await expect(
        fetchInstanceDestinations(destinationServiceUri, jwt, {
          enableCircuitBreaker: false
        })
      ).rejects.toThrowError();
    });
  });

  describe('fetchSubaccountDestinations', () => {
    it('fetches subaccount destinations and returns them as Destination array', async () => {
      const response = [basicDestination, oauth2SamlBearerDestination];
      const expected: Destination[] = [
        {
          name: 'HTTP-BASIC',
          url: 'https://my.system.com',
          authentication: 'BasicAuthentication',
          proxyType: 'Internet',
          password: 'password',
          username: 'USER_NAME',
          isTrustingAllCertificates: true,
          originalProperties: basicDestination,
          authTokens: []
        },
        {
          name: 'HTTP-OAUTH',
          url: 'https://my.system.com/',
          authentication: 'OAuth2SAMLBearerAssertion',
          proxyType: 'Internet',
          isTrustingAllCertificates: false,
          originalProperties: oauth2SamlBearerDestination,
          authTokens: []
        }
      ];

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/subaccountDestinations')
        .reply(200, response);

      const subaccountDestinations: Destination[] =
        await fetchSubaccountDestinations(destinationServiceUri, jwt, {
          enableCircuitBreaker: false
        });
      expected.forEach((e, index) => {
        expect(subaccountDestinations[index]).toMatchObject(e);
      });
    });

    it('returns 400 for an invalid JWT', async () => {
      const response = {
        ErrorMessage: 'Unable to parse the JWT in Authorization Header.'
      };

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/subaccountDestinations')
        .reply(400, response);

      await expect(
        fetchSubaccountDestinations(destinationServiceUri, jwt, {
          enableCircuitBreaker: false
        })
      ).rejects.toThrowError();
    });
  });

  describe('fetchDestination', () => {
    it('fetches a destination including authTokens', async () => {
      const destinationName = 'HTTP-OAUTH';
      const response = {
        owner: {
          SubaccountId: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
          InstanceId: null
        },
        destinationConfiguration: oauth2SamlBearerDestination,
        authTokens: [
          {
            type: 'Bearer',
            value: 'token',
            expires_in: '3600',
            http_header: {
              key: 'Authorization',
              value: 'Bearer token'
            }
          }
        ]
      };

      const expected: Destination = {
        name: 'HTTP-OAUTH',
        url: 'https://my.system.com/',
        authentication: 'OAuth2SAMLBearerAssertion',
        proxyType: 'Internet',
        isTrustingAllCertificates: false,
        originalProperties: {
          owner: {
            SubaccountId: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
            InstanceId: null
          },
          destinationConfiguration: oauth2SamlBearerDestination,
          authTokens: [
            {
              type: 'Bearer',
              value: 'token',
              expires_in: '3600',
              http_header: {
                key: 'Authorization',
                value: 'Bearer token'
              }
            }
          ]
        },
        authTokens: [
          {
            type: 'Bearer',
            value: 'token',
            expiresIn: '3600',
            error: null,
            http_header: {
              key: 'Authorization',
              value: 'Bearer token'
            }
          }
        ]
      };

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/destinations/HTTP-OAUTH')
        .reply(200, response);

      const actual = await fetchDestination(
        destinationServiceUri,
        jwt,
        destinationName,
        { enableCircuitBreaker: false }
      );
      expect(actual).toMatchObject(expected);
    });

    it('fetches a destination including proxy', async () => {
      const destinationName = 'HTTP-OAUTH';
      process.env.HTTPS_PROXY = 'http://some.foo.bar';
      const response = {
        owner: {
          SubaccountId: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
          InstanceId: null
        },
        destinationConfiguration: oauth2SamlBearerDestination,
        authTokens: [
          {
            type: 'Bearer',
            value: 'token',
            expires_in: '3600',
            http_header: {
              key: 'Authorization',
              value: 'Bearer token'
            }
          }
        ]
      };

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/destinations/HTTP-OAUTH')
        .reply(200, response);
      const spy = jest.spyOn(httpClient, 'executeHttpRequest');
      await fetchDestination(destinationServiceUri, jwt, destinationName, {
        enableCircuitBreaker: false
      });
      const expectedArgument: Destination = {
        url: 'https://destination.example.com/destination-configuration/v1/destinations/HTTP-OAUTH',
        proxyType: 'Internet',
        proxyConfiguration: {
          host: 'some.foo.bar',
          port: 80,
          protocol: Protocol.HTTP
        }
      };
      expect(spy).toHaveBeenCalledWith(expectedArgument, expect.anything());
      delete process.env.HTTPS_PROXY;
    });

    it('fetches a destination considering no_proxy', async () => {
      const destinationName = 'HTTP-OAUTH';
      process.env.HTTPS_PROXY = 'http://some.foo.bar';
      process.env.no_proxy =
        'https://destination.example.com/destination-configuration/v1/destinations/HTTP-OAUTH';
      const response = {
        owner: {
          SubaccountId: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
          InstanceId: null
        },
        destinationConfiguration: oauth2SamlBearerDestination,
        authTokens: [
          {
            type: 'Bearer',
            value: 'token',
            expires_in: '3600',
            http_header: {
              key: 'Authorization',
              value: 'Bearer token'
            }
          }
        ]
      };

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/destinations/HTTP-OAUTH')
        .reply(200, response);
      const spy = jest.spyOn(httpClient, 'executeHttpRequest');
      await fetchDestination(destinationServiceUri, jwt, destinationName, {
        enableCircuitBreaker: false
      });
      const expectedArgument: Destination = {
        url: 'https://destination.example.com/destination-configuration/v1/destinations/HTTP-OAUTH',
        proxyType: 'Internet'
      };
      expect(spy).toHaveBeenCalledWith(expectedArgument, expect.anything());
      delete process.env.HTTPS_PROXY;
      delete process.env.no_proxy;
    });

    it('fetches a destination and returns 200 but authTokens are failing', async () => {
      const destinationName = 'FINAL-DESTINATION';

      const response = {
        owner: {
          SubaccountId: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
          InstanceId: null
        },
        destinationConfiguration: {
          Name: 'HTTP-OAUTH',
          Type: 'HTTP',
          URL: 'https://my.system.com/',
          Authentication: 'OAuth2SAMLBearerAssertion',
          ProxyType: 'Internet',
          audience: 'https://my.system.com',
          authnContextClassRef: 'urn:oasis:names:tc:SAML:2.0:ac:classes:X509',
          clientKey: 'TOKEN_USER',
          nameIdFormat:
            'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
          scope: 'SOME_SCOPE',
          tokenServiceUser: 'TOKEN_USER',
          tokenServiceURL: 'https://my.system.com/sap/bc/sec/oauth2/token',
          userIdSource: 'email',
          tokenServicePassword: 'password'
        },
        authTokens: [
          {
            type: '',
            error: 'ERROR',
            value: '',
            expires_in: '0',
            http_header: {
              key: '',
              value: ''
            }
          }
        ]
      };

      const expected: Destination = {
        name: 'HTTP-OAUTH',
        url: 'https://my.system.com/',
        authentication: 'OAuth2SAMLBearerAssertion',
        proxyType: 'Internet',
        isTrustingAllCertificates: false,
        authTokens: [
          {
            type: '',
            error: 'ERROR',
            value: '',
            expiresIn: '0',
            http_header: {
              key: '',
              value: ''
            }
          }
        ],
        originalProperties: response
      };

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/destinations/FINAL-DESTINATION')
        .reply(200, response);

      const actual = await fetchDestination(
        destinationServiceUri,
        jwt,
        destinationName,
        { enableCircuitBreaker: false }
      );
      expect(actual).toMatchObject(expected);
    });

    it('does not fail horribly when an internal server error occurs', async () => {
      const destinationName = 'FINAL-DESTINATION';

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/destinations/FINAL-DESTINATION')
        .reply(500);

      await expect(
        fetchDestination(destinationServiceUri, jwt, destinationName, {
          enableCircuitBreaker: false
        })
      ).rejects.toThrowError();
    });

    it('returns 400 for an invalid JWT', async () => {
      const destinationName = 'FINAL-DESTINATION';

      const response = {
        ErrorMessage: 'Unable to parse the JWT in Authorization Header.'
      };

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/destinations/FINAL-DESTINATION')
        .reply(400, response);

      await expect(() =>
        fetchDestination(destinationServiceUri, jwt, destinationName, {
          enableCircuitBreaker: false
        })
      ).rejects.toThrowError();
    });
  });
});
