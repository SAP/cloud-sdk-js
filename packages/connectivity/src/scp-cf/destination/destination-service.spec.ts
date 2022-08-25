import nock from 'nock';
import * as jwt123 from 'jsonwebtoken';
import axios, { AxiosRequestConfig } from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { createLogger } from '@sap-cloud-sdk/util';
import { destinationServiceUri } from '../../../../../test-resources/test/test-util/environment-mocks';
import { privateKey } from '../../../../../test-resources/test/test-util/keys';
import { defaultResilienceBTPServices } from '../resilience-options';
import { mockCertificateCall } from '../../../../../test-resources/test/test-util';
import { Destination } from './destination-service-types';
import {
  fetchDestination,
  fetchInstanceDestinations,
  fetchSubaccountDestinations,
  fetchCertificate
} from './destination-service';

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

const brokenDestination = {
  Name: 'BrokenDestination',
  URL: undefined
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

    it('only returns valid destinations - instance destinations', async () => {
      const response = [
        basicDestination,
        oauth2SamlBearerDestination,
        brokenDestination
      ];

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/instanceDestinations')
        .reply(200, response);

      const logger = createLogger({
        package: 'connectivity',
        messageContext: 'destination-service'
      });
      const debugSpy = jest.spyOn(logger, 'debug');
      const instanceDestinations: Destination[] =
        await fetchInstanceDestinations(destinationServiceUri, jwt, {
          enableCircuitBreaker: false
        });
      expect(instanceDestinations.length).toBe(2);
      expect(debugSpy).toHaveBeenCalledWith(
        'Parsing of destination with name "BrokenDestination" failed - skip this destination in parsing.'
      );
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

    it('only returns valid destinations - subaccount destinations', async () => {
      const response = [
        basicDestination,
        oauth2SamlBearerDestination,
        brokenDestination
      ];

      nock(destinationServiceUri, {
        reqheaders: {
          authorization: `Bearer ${jwt}`
        }
      })
        .get('/destination-configuration/v1/subaccountDestinations')
        .reply(200, response);

      const logger = createLogger({
        package: 'connectivity',
        messageContext: 'destination-service'
      });
      const debugSpy = jest.spyOn(logger, 'debug');
      const subaccountDestinations: Destination[] =
        await fetchSubaccountDestinations(destinationServiceUri, jwt, {
          enableCircuitBreaker: false
        });
      expect(subaccountDestinations.length).toBe(2);
      expect(debugSpy).toHaveBeenCalledWith(
        'Parsing of destination with name "BrokenDestination" failed - skip this destination in parsing.'
      );
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

  describe('fetchCertificate', () => {
    it('fetches the subaccount certificate', async () => {
      mockCertificateCall(nock, 'server-public-cert.pem', jwt, 'subaccount');

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
      mockCertificateCall(nock, 'server-public-cert.pem', jwt, 'instance');

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
      mockCertificateCall(nock, 'server-public-cert.pem', jwt, 'subaccount');
      const mockInstance = mockCertificateCall(
        nock,
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
      mockCertificateCall(nock, 'server-public-cert.jks', jwt, 'subaccount');

      const actual = await fetchCertificate(
        destinationServiceUri,
        jwt,
        'server-public-cert.jks'
      );
      expect(actual).toBeUndefined();
    });

    it('returns undefined for failing service call', async () => {
      return nock(destinationServiceUri)
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

        { destinationName, enableCircuitBreaker: false }
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
      const spy = jest.spyOn(axios, 'request');
      await fetchDestination(destinationServiceUri, jwt, {
        destinationName,
        enableCircuitBreaker: false
      });
      const expectedConfig: AxiosRequestConfig = {
        baseURL:
          'https://destination.example.com/destination-configuration/v1/destinations/HTTP-OAUTH',
        method: 'get',
        proxy: false,
        timeout: defaultResilienceBTPServices.timeout,
        headers: {
          Authorization: `Bearer ${jwt}`
        },
        httpsAgent: new HttpsProxyAgent({
          port: 80,
          host: 'some.foo.bar',
          protocol: 'http',
          rejectUnauthorized: true
        })
      };
      expect(spy).toHaveBeenCalledWith(expectedConfig);
      delete process.env.HTTPS_PROXY;
    });

    it('considers the custom timeout for destination service', async () => {
      async function doDelayTest(enableCircuitBreaker: boolean) {
        nock(destinationServiceUri, {
          reqheaders: {
            authorization: `Bearer ${jwt}`
          }
        })
          .get('/destination-configuration/v1/destinations/TIMEOUT-TEST')
          .delay(100)
          .reply(200, {});
        await expect(
          fetchDestination(destinationServiceUri, jwt, {
            destinationName: 'TIMEOUT-TEST',
            enableCircuitBreaker,
            timeout: 10
          })
        ).rejects.toMatchObject({
          cause: {
            message: 'timeout of 10ms exceeded'
          }
        });
      }

      await doDelayTest(true);
      await doDelayTest(false);
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
      const spy = jest.spyOn(axios, 'request');
      await fetchDestination(destinationServiceUri, jwt, {
        destinationName: 'timeoutTest',
        enableCircuitBreaker: false
      });
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          timeout: defaultResilienceBTPServices.timeout
        })
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
      await fetchDestination(destinationServiceUri, jwt, {
        destinationName,
        enableCircuitBreaker: false
      });
      const expectedConfig: AxiosRequestConfig = {
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
        timeout: defaultResilienceBTPServices.timeout,
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

        { destinationName, enableCircuitBreaker: false }
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
        fetchDestination(destinationServiceUri, jwt, {
          destinationName,
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
        fetchDestination(destinationServiceUri, jwt, {
          destinationName,
          enableCircuitBreaker: false
        })
      ).rejects.toThrowError();
    });
  });
});
