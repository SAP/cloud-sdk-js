import * as jwt123 from 'jsonwebtoken';
import nock from 'nock';
// eslint-disable-next-line import/named
import * as resilienceMethods from '@sap-cloud-sdk/resilience/internal';
import { circuitBreakers } from '@sap-cloud-sdk/resilience/internal';
// eslint-disable-next-line import/named
import axios from 'axios';
import { mockCertificateCall } from '../../../../../test-resources/test/test-util';
import { destinationServiceUri } from '../../../../../test-resources/test/test-util/environment-mocks';
import { privateKey } from '../../../../../test-resources/test/test-util/keys';
import { parseDestination } from './destination';
import {
  fetchCertificate,
  fetchDestinationWithTokenRetrieval,
  fetchDestinationWithoutTokenRetrieval,
  fetchDestinations
} from './destination-service';
import type { DestinationConfiguration } from './destination';
import type { RawAxiosRequestConfig } from 'axios';
import type { Destination } from './destination-service-types';

const jwt = jwt123.sign(
  JSON.stringify({ user_id: 'user', zid: 'tenant' }),
  privateKey,
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
} satisfies DestinationConfiguration;

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
} satisfies DestinationConfiguration;

describe('destination service', () => {
  describe('fetchDestinations (instance)', () => {
    it('uses a circuit breaker', async () => {
      const response = [basicDestination];
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
        }
      ];

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/instanceDestinations')
        .reply(200, response);

      const subaccountDestinations: Destination[] = await fetchDestinations(
        destinationServiceUri,
        jwt,
        'instance'
      );
      expected.forEach((e, index) => {
        expect(subaccountDestinations[index]).toMatchObject(e);
      });
      expect(Object.keys(circuitBreakers)).toEqual([
        'https://destination.example.com/destination-configuration/v1/instanceDestinations::tenant'
      ]);
    });

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

      const instanceDestinations: Destination[] = await fetchDestinations(
        destinationServiceUri,
        jwt,
        'instance'
      );
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
        fetchDestinations(destinationServiceUri, jwt, 'instance')
      ).rejects.toThrow();
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
        fetchDestinations(destinationServiceUri, jwt, 'instance')
      ).rejects.toThrow();
    });
  });

  describe('fetchDestinations (subaccount)', () => {
    it('uses a circuit breaker', async () => {
      const response = [basicDestination];
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
        }
      ];

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/subaccountDestinations')
        .reply(200, response);

      const subaccountDestinations: Destination[] = await fetchDestinations(
        destinationServiceUri,
        jwt,
        'subaccount'
      );
      expected.forEach((e, index) => {
        expect(subaccountDestinations[index]).toMatchObject(e);
      });
      expect(
        circuitBreakers[
          'https://destination.example.com/destination-configuration/v1/subaccountDestinations::tenant'
        ]
      ).toBeDefined();
    });

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

      const subaccountDestinations: Destination[] = await fetchDestinations(
        destinationServiceUri,
        jwt,
        'subaccount'
      );
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
        fetchDestinations(destinationServiceUri, jwt, 'subaccount')
      ).rejects.toThrow();
    });
  });

  describe('fetchCertificate', () => {
    it('fetches the subaccount certificate', async () => {
      mockCertificateCall('server-public-cert.pem', jwt, 'subaccount');

      const actual = await fetchCertificate(
        destinationServiceUri,
        jwt,
        'server-public-cert.pem'
      );
      expect(actual).toEqual({
        name: 'server-public-cert.pem',
        content: expect.any(String),
        type: 'CERTIFICATE'
      });
    });

    it('fetches the instance certificate', async () => {
      mockCertificateCall('server-public-cert.pem', jwt, 'instance');

      const actual = await fetchCertificate(
        destinationServiceUri,
        jwt,
        'server-public-cert.pem'
      );
      expect(actual).toEqual({
        name: 'server-public-cert.pem',
        content: expect.any(String),
        type: 'CERTIFICATE'
      });
    });

    it('fetches the subaccount first', async () => {
      mockCertificateCall('server-public-cert.pem', jwt, 'subaccount');
      const mockInstance = mockCertificateCall(
        'server-public-cert.pem',
        jwt,
        'instance'
      );

      await fetchCertificate(
        destinationServiceUri,
        jwt,
        'server-public-cert.pem'
      );
      expect(mockInstance.isDone()).toBe(false);
    });

    it('returns undefined for non pem files', async () => {
      mockCertificateCall('server-public-cert.jks', jwt, 'subaccount');

      const actual = await fetchCertificate(
        destinationServiceUri,
        jwt,
        'server-public-cert.jks'
      );
      expect(actual).toBeUndefined();
    });

    it('returns undefined for failing service call', async () => {
      nock(destinationServiceUri)
        .get('/destination-configuration/v1/subaccountCertificates/*')
        .reply(500);

      const actual = await fetchCertificate(
        destinationServiceUri,
        jwt,
        'server-public-cert.jks'
      );
      expect(actual).toBeUndefined();
    });
  });

  describe('fetchDestinationByToken', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('uses a circuit breaker', async () => {
      const destinationName = 'HTTP-BASIC';
      const response = {
        owner: {
          SubaccountId: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
          InstanceId: null
        },
        destinationConfiguration: basicDestination
      };
      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/destinations/HTTP-BASIC')
        .reply(200, response);

      await fetchDestinationWithTokenRetrieval(destinationServiceUri, jwt, {
        destinationName
      });
      expect(
        Object.keys(
          circuitBreakers[
            'https://destination.example.com/destination-configuration/v1/destinations/HTTP-BASIC::tenant'
          ]
        )
      ).toBeDefined();
    });

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

      const actual = await fetchDestinationWithTokenRetrieval(
        destinationServiceUri,
        jwt,
        {
          destinationName
        }
      );
      expect(actual).toMatchObject(expected);
    });

    it('adds proxy to destination request if HTTPS_PROXY env variable is set', async () => {
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

      const requestSpy = jest
        .spyOn(axios, 'request')
        .mockResolvedValue({ data: response });
      await fetchDestinationWithTokenRetrieval(destinationServiceUri, jwt, {
        destinationName
      });
      const expectedConfig: RawAxiosRequestConfig = {
        baseURL:
          'https://destination.example.com/destination-configuration/v1/destinations/HTTP-OAUTH',
        method: 'get',
        proxy: {
          host: 'some.foo.bar',
          protocol: 'http',
          port: 80
        },
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      };
      expect(requestSpy).toHaveBeenCalledWith(
        expect.objectContaining(expectedConfig)
      );
      delete process.env.HTTPS_PROXY;
    });

    it('considers the default timeout for destination service', async () => {
      const response = {
        URL: 'someDestinationUrl'
      };

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/destinations/timeoutTest')
        .reply(200, response);
      const spy = jest.spyOn(resilienceMethods, 'executeWithMiddleware');
      await fetchDestinationWithTokenRetrieval(destinationServiceUri, jwt, {
        destinationName: 'timeoutTest'
      });
      // Assertion for two anonymous functions in the middleware one of them is timeout the other CB.
      expect(spy).toHaveBeenCalledWith(
        [expect.any(Function), expect.any(Function)],
        {
          context: expect.objectContaining({ tenantId: 'tenant' }),
          fn: expect.any(Function),
          fnArgument: expect.objectContaining({ baseURL: expect.any(String) })
        }
      );
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
      const spy = jest.spyOn(axios, 'request');
      await fetchDestinationWithTokenRetrieval(destinationServiceUri, jwt, {
        destinationName
      });
      const expectedConfig: RawAxiosRequestConfig = {
        baseURL:
          'https://destination.example.com/destination-configuration/v1/destinations/HTTP-OAUTH',
        headers: {
          Authorization: `Bearer ${jwt}`
        },
        method: 'get',
        proxy: false,
        // The jest matchers have problems to match two  instances of an httpsAgent.
        // As a workaround I wanted to assert on proxy:undefined but was not able to achieve this.
        // The "_events" property is only present for the httpAgent and not the httpProxyAgent so this works as an implicit test.
        httpsAgent: expect.objectContaining({
          _events: expect.anything(),
          options: expect.objectContaining({ rejectUnauthorized: true })
        })
      };
      expect(spy).toHaveBeenCalledWith(expect.objectContaining(expectedConfig));

      expect(spy).toHaveBeenCalledWith(expectedConfig);
      delete process.env.HTTPS_PROXY;
      delete process.env.no_proxy;
    });

    it('does a retry if request fails with 500 error', async () => {
      const response = {
        owner: {
          SubaccountId: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
          InstanceId: null
        },
        destinationConfiguration: basicDestination
      };
      nock(destinationServiceUri)
        .get('/destination-configuration/v1/destinations/HTTP-BASIC')
        .reply(500)
        .get('/destination-configuration/v1/destinations/HTTP-BASIC')
        .reply(200, response);

      const actual = await fetchDestinationWithTokenRetrieval(
        destinationServiceUri,
        jwt,
        {
          destinationName: 'HTTP-BASIC',
          retry: true
        }
      );
      expect(actual).toEqual(parseDestination(response));
    });

    it('does no retry if request fails with 401 error', async () => {
      const response = {
        owner: {
          SubaccountId: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
          InstanceId: null
        },
        destinationConfiguration: basicDestination
      };
      const mock = nock(destinationServiceUri)
        .get('/destination-configuration/v1/destinations/HTTP-BASIC')
        .reply(401)
        .get('/destination-configuration/v1/destinations/HTTP-BASIC')
        .reply(200, response);

      await expect(
        fetchDestinationWithTokenRetrieval(destinationServiceUri, jwt, {
          destinationName: 'HTTP-BASIC',
          retry: true
        })
      ).rejects.toThrow();
      expect(mock.isDone()).toBe(false);
      nock.cleanAll();
    });

    it('does a retry if auth token contains errors', async () => {
      const responseErrorInToken = {
        owner: {
          SubaccountId: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
          InstanceId: null
        },
        destinationConfiguration: oauth2SamlBearerDestination,
        authTokens: [
          {
            error: 'ERROR'
          }
        ]
      };
      const responseValidToken = {
        ...responseErrorInToken,
        authTokens: [
          {
            type: 'Bearer',
            value: 'some.token',
            expires_in: '3600',
            error: '',
            http_header: {
              key: 'Authorization',
              value: 'Bearer some.token'
            } as any // TODO fix the authTokens type in DestinationJson
          }
        ]
      };
      nock(destinationServiceUri)
        .get('/destination-configuration/v1/destinations/HTTP-OAUTH')
        .reply(200, responseErrorInToken)
        .get('/destination-configuration/v1/destinations/HTTP-OAUTH')
        .reply(200, responseValidToken);

      const actual = await fetchDestinationWithTokenRetrieval(
        destinationServiceUri,
        jwt,
        {
          destinationName: 'HTTP-OAUTH',
          retry: true
        }
      );
      expect(actual).toMatchObject(parseDestination(responseValidToken));
    });

    it('does a retry if auth tokens are failing but returns the destination with errors in the end', async () => {
      const response = {
        owner: {
          SubaccountId: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
          InstanceId: null
        },
        destinationConfiguration: oauth2SamlBearerDestination,
        authTokens: [
          {
            error: 'ERROR'
          }
        ]
      };

      const mock = nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/destinations/HTTP-OAUTH')
        .times(3)
        .reply(200, response);

      const actual = await fetchDestinationWithTokenRetrieval(
        destinationServiceUri,
        jwt,
        {
          destinationName: 'HTTP-OAUTH',
          retry: true
        }
      );
      expect(actual.authTokens![0].error).toEqual('ERROR');
      expect(mock.isDone()).toBe(true);
    }, 10000);

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

      const actual = await fetchDestinationWithTokenRetrieval(
        destinationServiceUri,
        jwt,

        { destinationName }
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
        fetchDestinationWithTokenRetrieval(destinationServiceUri, jwt, {
          destinationName
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
        fetchDestinationWithTokenRetrieval(destinationServiceUri, jwt, {
          destinationName
        })
      ).rejects.toThrowError();
    });
  });

  describe('fetchDestinationWithoutTokenRetrieval', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('returns correct destination by type based on owner property in response', async () => {
      const destinationName = 'HTTP-BASIC';
      const response = {
        owner: {
          SubaccountId: 'a89ea924-d9c2-4eab-84fb-3ffcaadf5d24',
          InstanceId: '60f1cc00-6c94-4ada-ba16-495325060b54'
        },
        destinationConfiguration: basicDestination
      };
      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get(
          '/destination-configuration/v1/destinations/HTTP-BASIC?$skipTokenRetrieval=true'
        )
        .reply(200, response);

      const actual = await fetchDestinationWithoutTokenRetrieval(
        destinationName,
        destinationServiceUri,
        jwt
      );
      expect(actual).toMatchObject({
        subaccount: [],
        instance: [parseDestination(response.destinationConfiguration)]
      });
    });
  });
});
