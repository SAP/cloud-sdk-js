import https from 'https';
import http from 'http';
import { HttpsProxyAgent } from 'https-proxy-agent';
import nock from 'nock';
import { createLogger } from '@sap-cloud-sdk/util';
import axios from 'axios';
import {
  Destination,
  Protocol,
  ProxyConfiguration
} from '@sap-cloud-sdk/connectivity';
import {
  connectivityProxyConfigMock,
  defaultDestination
} from '../../../test-resources/test/test-util';
import * as csrfHeaders from './csrf-token-header';
import {
  DestinationHttpRequestConfig,
  HttpRequestConfig,
  HttpRequestConfigWithOrigin,
  HttpResponse
} from './http-client-types';
import {
  addDestinationToRequestConfig,
  buildHttpRequest,
  buildRequestWithMergedHeadersAndQueryParameters,
  encodeAllParameters,
  executeHttpRequest,
  getDefaultHttpRequestOptions,
  encodeTypedClientRequest,
  shouldHandleCsrfToken
} from './http-client';

describe('generic http client', () => {
  const httpsDestination: Destination = {
    name: 'httpsDestination',
    url: 'https://example.com',
    authentication: 'BasicAuthentication',
    username: 'USERNAME',
    password: 'PASSWORD',
    sapClient: '001'
  };

  const proxyAuthorization = 'youmaypass';

  const proxyDestination: Destination = {
    name: 'proxyDestination',
    url: 'http://example.com',
    authentication: 'BasicAuthentication',
    proxyType: 'Internet',
    username: 'USERNAME',
    password: 'PASSWORD',
    sapClient: '001',
    proxyConfiguration: {
      headers: {
        'Proxy-Authorization': proxyAuthorization
      },
      host: 'proxy.host',
      port: 1234,
      protocol: Protocol.HTTP
    }
  };

  describe('buildHttpRequest', () => {
    it('provides a baseURL, headers, and either an httpAgent or an httpsAgent', async () => {
      const expectedHttps: DestinationHttpRequestConfig = {
        baseURL: 'https://example.com',
        headers: {
          authorization: 'Basic VVNFUk5BTUU6UEFTU1dPUkQ=',
          'sap-client': '001'
        }
      };

      const actualHttps = await buildHttpRequest(httpsDestination);

      expect(actualHttps).toMatchObject(expectedHttps);
      expect(actualHttps.httpsAgent).toBeDefined();

      const expectedProxy: DestinationHttpRequestConfig = {
        baseURL: 'http://example.com',
        headers: {
          authorization: 'Basic VVNFUk5BTUU6UEFTU1dPUkQ=',
          'sap-client': '001',
          'Proxy-Authorization': proxyAuthorization
        }
      };

      const actualProxy = await buildHttpRequest(proxyDestination);

      expect(actualProxy).toMatchObject(expectedProxy);
      expect(actualProxy.httpAgent).toBeDefined();
    });

    it('throws useful error messages when finding the destination fails', async () => {
      await expect(
        buildHttpRequest({ destinationName: 'does not exist' })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Failed to load destination."'
      );
    });

    it('throws useful error messages when building headers fails', async () => {
      await expect(
        buildHttpRequest({
          url: 'https://example.com',
          authentication: 'BasicAuthentication'
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Failed to build headers."'
      );
    });

    it('defaults to NoAuthentication/does not throw if no credentials are provided', async () => {
      await expect(
        buildHttpRequest({ url: 'https://example.com' })
      ).resolves.not.toThrow();
    });
  });

  describe('addDestinationToRequestConfig', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('merges given headers with provided headers (but gives priority to custom headers)', async () => {
      const expected = {
        a: '1',
        b: '2',
        baseURL: 'https://example.com',
        headers: {
          a: '1',
          authorization: 'CUSTOM',
          'sap-client': '001'
        }
      };

      const actual = await addDestinationToRequestConfig(httpsDestination, {
        method: 'get',
        a: '1',
        b: '2',
        headers: {
          a: '1',
          authorization: 'CUSTOM'
        }
      });

      expect(actual).toMatchObject(expected);
      expect(actual.httpsAgent).toBeDefined();
    });

    it('overwrites baseURL and either httpAgent or httpsAgent', async () => {
      const expected = {
        baseURL: 'https://custom.example.com',
        headers: {
          a: '1',
          authorization: 'CUSTOM',
          'sap-client': '001'
        },
        httpsAgent: 'custom-agent'
      };

      const actual = await addDestinationToRequestConfig(httpsDestination, {
        method: 'get',
        baseURL: 'https://custom.example.com',
        headers: {
          a: '1',
          authorization: 'CUSTOM'
        },
        httpsAgent: 'custom-agent'
      });

      expect(actual).toMatchObject(expected);
    });

    it('allows usage with e.g. axios.request', async () => {
      nock('https://example.com', {
        reqheaders: {
          authorization: 'Basic VVNFUk5BTUU6UEFTU1dPUkQ=',
          'sap-client': '001'
        }
      })
        .get('/api/entity')
        .query({
          a: 'a',
          b: 'b'
        })
        .reply(200);

      const request = addDestinationToRequestConfig(httpsDestination, {
        method: 'get',
        url: '/api/entity',
        headers: {},
        params: {
          a: 'a',
          b: 'b'
        }
      }).then(conf => axios.request(conf));
      await expect(request).resolves.not.toThrow();
    });
  });

  describe('executeHttpRequest', () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    // The base-agent dependency coming in via the http-proxy-agent did mess with the node https.
    // Since version 3.0.0 the issue is fixed and the test ensures this.
    it('should not break the plain node http client', async () => {
      nock('https://example.com').get(/.*/).reply(200);

      return new Promise((resolve, reject) =>
        https.get('https://example.com', response =>
          response.statusCode === 200 ? resolve(200) : reject()
        )
      );
    });

    it('takes a generic HTTP request and executes it', async () => {
      nock('https://example.com', {
        reqheaders: {
          authorization: 'Basic VVNFUk5BTUU6UEFTU1dPUkQ=',
          'sap-client': '001'
        }
      })
        .get('/api/entity')
        .query({
          a: 'a',
          b: 'b'
        })
        .reply(200, { res: 'ult' }, { sharp: 'header' });

      jest.spyOn(csrfHeaders, 'buildCsrfHeaders');
      const config: HttpRequestConfigWithOrigin = {
        method: 'GET',
        url: '/api/entity',
        params: {
          requestConfig: {
            a: 'a',
            b: 'b'
          }
        }
      };

      const response = await executeHttpRequest(httpsDestination, config);
      expect(response.data.res).toBe('ult');
      expect(response.status).toBe(200);
      expect(response.headers).toMatchObject({ sharp: 'header' });
      expect(csrfHeaders.buildCsrfHeaders).not.toHaveBeenCalled();
    });

    it('logs request information', async () => {
      nock('https://example.com', {
        reqheaders: {
          authorization: 'Basic VVNFUk5BTUU6UEFTU1dPUkQ=',
          'sap-client': '001'
        }
      })
        .get('/api/entity')
        .reply(200, { res: 'ult' }, { sharp: 'header' });

      const config: HttpRequestConfigWithOrigin = {
        method: 'GET',
        url: '/api/entity'
      };
      const logger = createLogger({
        package: 'http-client',
        messageContext: 'http-client'
      });
      const debugSpy = jest.spyOn(logger, 'debug');
      await executeHttpRequest(httpsDestination, config);
      expect(debugSpy)
        .toHaveBeenCalledWith(`Execute 'GET' request with target: /api/entity.
The headers of the request are:
authorization:<DATA NOT LOGGED TO PREVENT LEAKING SENSITIVE DATA>
sap-client:001`);
    });

    it('logs when custom headers are used', async () => {
      nock('https://example.com', {
        reqheaders: {
          authorization: 'abc',
          'sap-client': '001',
          'SAP-Connectivity-SCC-Location_ID': 'efg'
        }
      })
        .get('/api/entity')
        .reply(200, { res: 'ult' }, { sharp: 'header' });
      const config: HttpRequestConfigWithOrigin = {
        method: 'get',
        url: '/api/entity',
        headers: {
          custom: {
            authorization: 'abc',
            'sap-client': '001',
            'SAP-Connectivity-SCC-Location_ID': 'efg'
          },
          requestConfig: {}
        }
      };
      const logger = createLogger({
        package: 'http-client',
        messageContext: 'http-client'
      });
      const infoSpy = jest.spyOn(logger, 'info');

      await executeHttpRequest(httpsDestination, config);

      expect(infoSpy).toBeCalledWith(
        `The following custom headers will overwrite headers created by the SDK:
  - "authorization"
  - "sap-client"
  - "SAP-Connectivity-SCC-Location_ID"`
      );
    });

    it('also works also in more complex cases', async () => {
      nock('https://custom.example.com', {
        reqheaders: {
          'content-type': 'application/json',
          accept: 'application/json',
          'x-csrf-token': 'Fetch',
          authorization: 'custom-auth-header',
          'sap-client': '001'
        }
      })
        .post('/api/entity', {
          a: 1,
          b: 2,
          c: 3
        })
        .reply(200);

      const config: HttpRequestConfigWithOrigin = {
        baseURL: 'https://custom.example.com',
        method: 'POST',
        url: '/api/entity',
        headers: {
          custom: {
            'content-type': 'application/json',
            accept: 'application/json',
            'x-csrf-token': 'Fetch',
            authorization: 'custom-auth-header'
          },
          requestConfig: {}
        },
        data: {
          a: 1,
          b: 2,
          c: 3
        }
      };

      await expect(
        executeHttpRequest(httpsDestination, config)
      ).resolves.not.toThrow();
    });

    it('propagates errors to the caller', async () => {
      nock('https://example.com', {
        reqheaders: {
          authorization: 'Basic VVNFUk5BTUU6UEFTU1dPUkQ=',
          'sap-client': '001'
        }
      })
        .get('/api/entity')
        .query({
          a: 'a',
          b: 'b'
        })
        .reply(500, { res: 'NOPE' }, { sharp: 'header' });

      await expect(
        executeHttpRequest(httpsDestination, {
          method: 'get',
          url: '/api/entity',
          params: {
            requestConfig: {
              a: 'a',
              b: 'b'
            }
          }
        })
      ).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Request failed with status code 500"'
      );
    });

    it('fetches csrf token headers for non-get requests by default', async () => {
      const csrfToken = 'some-csrf-token';
      nock('https://example.com', {
        reqheaders: {
          'x-csrf-token': 'Fetch',
          'content-type': 'application/json',
          accept: 'application/json',
          authorization: 'custom-auth-header',
          'sap-client': '001'
        }
      })
        .head('/api/entity')
        .reply(200, {}, { 'x-csrf-token': csrfToken });

      nock('https://example.com', {
        reqheaders: {
          'x-csrf-token': csrfToken,
          'content-type': 'application/json',
          accept: 'application/json',
          authorization: 'custom-auth-header',
          'sap-client': '001'
        }
      })
        .post('/api/entity', {
          a: 1
        })
        .reply(200);

      const config: HttpRequestConfigWithOrigin = {
        baseURL: 'https://example.com',
        method: 'POST',
        url: '/api/entity',
        headers: {
          custom: {
            authorization: 'custom-auth-header',
            'content-type': 'application/json',
            accept: 'application/json'
          },
          requestConfig: {}
        },
        data: {
          a: 1
        }
      };
      jest.spyOn(csrfHeaders, 'buildCsrfHeaders');
      await expect(
        executeHttpRequest(httpsDestination, config)
      ).resolves.not.toThrow();
      expect(csrfHeaders.buildCsrfHeaders).toHaveBeenCalled();
    });

    it('fetches csrf token headers even when the response status is not 2xx', async () => {
      const csrfToken = 'some-csrf-token';
      nock('https://example.com', {
        reqheaders: {
          'x-csrf-token': 'Fetch',
          'content-type': 'application/json',
          accept: 'application/json',
          authorization: 'custom-auth-header',
          'sap-client': '001'
        }
      })
        .head('/api/entity')
        .reply(405, {}, { 'x-csrf-token': csrfToken });

      nock('https://example.com', {
        reqheaders: {
          'x-csrf-token': csrfToken,
          'content-type': 'application/json',
          accept: 'application/json',
          authorization: 'custom-auth-header',
          'sap-client': '001'
        }
      })
        .post('/api/entity', {
          a: 1
        })
        .reply(200);

      const config: HttpRequestConfigWithOrigin = {
        baseURL: 'https://example.com',
        method: 'POST',
        url: '/api/entity',
        headers: {
          custom: {
            authorization: 'custom-auth-header',
            'content-type': 'application/json',
            accept: 'application/json'
          },
          requestConfig: {}
        },
        data: {
          a: 1
        }
      };

      await expect(
        executeHttpRequest(httpsDestination, config)
      ).resolves.not.toThrow();
    });

    it('should not fetch csrf token headers when fetchCsrfToken is true(default) and request contains the token in the header', async () => {
      const csrfToken = 'some-csrf-token';

      nock('https://example.com', {
        reqheaders: {
          'x-csrf-token': csrfToken,
          'content-type': 'application/json',
          accept: 'application/json',
          authorization: 'custom-auth-header',
          'sap-client': '001'
        }
      })
        .post('/api/entity', {
          a: 1
        })
        .reply(200);

      const config: HttpRequestConfigWithOrigin = {
        baseURL: 'https://example.com',
        method: 'POST',
        url: '/api/entity',
        headers: {
          custom: {
            authorization: 'custom-auth-header',
            'content-type': 'application/json',
            accept: 'application/json',
            'x-csrf-token': csrfToken
          },
          requestConfig: {}
        },
        data: {
          a: 1
        }
      };

      jest.spyOn(csrfHeaders, 'buildCsrfHeaders');
      await executeHttpRequest(httpsDestination, config);
      expect(csrfHeaders.buildCsrfHeaders).not.toHaveBeenCalled();
    });

    it('should apply http(s)Agent to both CSRF token request and the real request', async () => {
      const csrfTokenResponse: HttpResponse = {
        headers: { 'x-csrf-token': 'token' }
      } as HttpResponse;
      const spy = jest
        .spyOn(axios, 'request')
        .mockImplementationOnce(async () => csrfTokenResponse);
      jest
        .spyOn(axios, 'request')
        .mockImplementationOnce(async () => 'post response');

      const httpsAgentOption = { ca: 'CA' };
      const config: HttpRequestConfigWithOrigin = {
        baseURL: 'https://www.example.com',
        url: 'api',
        method: 'post',
        headers: { requestConfig: {} },
        httpsAgent: new https.Agent(httpsAgentOption)
      };

      await executeHttpRequest(httpsDestination, config);
      expect(spy).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          httpsAgent: expect.objectContaining({
            options: expect.objectContaining(httpsAgentOption)
          })
        })
      );
    });

    it('rejectUnauthorized property of HttpsAgent should be set to true when isTrustingAllCertificates is false', async () => {
      jest.spyOn(axios, 'request').mockResolvedValue({});
      const destination: Destination = {
        url: 'https://example.com',
        isTrustingAllCertificates: true
      };

      await executeHttpRequest(destination, { method: 'get' });
      const expectedJsonHttpsAgent = {
        httpsAgent: expect.objectContaining({
          options: expect.objectContaining({ rejectUnauthorized: false })
        })
      };
      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining(expectedJsonHttpsAgent)
      );
    });

    it('rejectUnauthorized property of HttpsAgent should be set to false when isTrustingAllCertificates is true', async () => {
      jest.spyOn(axios, 'request').mockResolvedValue({});
      const destination: Destination = {
        url: 'https://example.com',
        isTrustingAllCertificates: false
      };
      await executeHttpRequest(destination, { method: 'get' });
      const expectedJsonHttpsAgent = {
        httpsAgent: expect.objectContaining({
          options: expect.objectContaining({ rejectUnauthorized: true })
        })
      };
      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining(expectedJsonHttpsAgent)
      );
    });

    it('request config contains httpAgent when destination URL uses "http" as protocol', async () => {
      jest.spyOn(axios, 'request').mockResolvedValue({});

      const expectedConfigEntry = { httpAgent: expect.anything() };
      const destination: Destination = {
        url: 'http://example.com',
        authentication: 'NoAuthentication'
      };

      await executeHttpRequest(destination, { method: 'get' });
      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining(expectedConfigEntry)
      );
    });

    it('request config contains httpsAgent when destination URL uses "https" as protocol', async () => {
      jest.spyOn(axios, 'request').mockResolvedValue({});
      const expectedConfigEntry = { httpsAgent: expect.anything() };
      const destination: Destination = {
        url: 'https://example.com',
        authentication: 'NoAuthentication'
      };

      await executeHttpRequest(destination, { method: 'get' });

      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining(expectedConfigEntry)
      );
    });

    it('throws an error if the destination URL uses neither "http" nor "https" as protocol (e.g. RFC)', async () => {
      jest.spyOn(axios, 'request').mockResolvedValue({});
      const destination: Destination = {
        url: 'rfc://example.com',
        authentication: 'NoAuthentication'
      };

      await expect(
        executeHttpRequest(destination, { method: 'get' })
      ).rejects.toThrowErrorMatchingSnapshot();
    });

    it('includes the default axios config in request', async () => {
      const destination: Destination = { url: 'https://destinationUrl' };
      const requestSpy = jest.spyOn(axios, 'request').mockResolvedValue(true);
      await executeHttpRequest(destination, { method: 'get' });
      expect(requestSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          proxy: false,
          httpsAgent: expect.anything(),
          httpAgent: expect.anything()
        })
      );

      requestSpy.mockRestore();
    });

    it('overwrites the default axios config with destination related request config', async () => {
      const destination: Destination = {
        url: 'https://destinationUrl',
        proxyConfiguration: {
          host: 'dummy',
          port: 1234,
          protocol: Protocol.HTTP
        }
      };
      const requestSpy = jest.spyOn(axios, 'request').mockResolvedValue(true);
      await expect(
        executeHttpRequest(destination, { method: 'get' })
      ).resolves.not.toThrow();
      expect(requestSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          proxy: false,
          httpsAgent: expect.objectContaining({
            proxy: expect.objectContaining({ host: 'dummy', port: 1234 })
          })
        })
      );
    });

    it('overwrites destination related request config with the explicit one', async () => {
      const destination: Destination = { url: 'https://destinationUrl' };
      const requestSpy = jest.spyOn(axios, 'request').mockResolvedValue(true);
      await expect(
        executeHttpRequest(
          destination,
          { method: 'post' },
          { fetchCsrfToken: false }
        )
      ).resolves.not.toThrow();

      expect(requestSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'post'
        })
      );
    });

    /* eslint-disable no-console */
    /**
     * https://github.com/SAP/cloud-sdk-backlog/issues/560.
     * Actual: request is successfull.
     * Expected: Axios requests should pass via the proxy and hence result in a redirect loop.
     * */
    xit('test axios proxy redirect', () => {
      const proxyConfiguration: ProxyConfiguration = {
        host: 'localhost',
        port: 8080,
        protocol: Protocol.HTTP
      };
      // A fake proxy server
      http
        .createServer(function (req, res) {
          res.writeHead(302, { location: 'https://example.com' });
          res.end();
        })
        .listen(8080);

      axios({
        method: 'get',
        url: 'https://google.com',
        httpsAgent: new HttpsProxyAgent(proxyConfiguration)
      })
        .then(r => console.log(r))
        .catch(console.error);
    });
  });

  describe('buildRequestWithMergedHeadersAndQueryParameters', () => {
    const requestWithParameters: HttpRequestConfigWithOrigin = {
      method: 'get',
      url: '/api/entity',
      params: {
        custom: {
          customParam: 'a/b'
        },
        requestConfig: {
          requestParam: 'a/b'
        }
      }
    };
    const destinationWithParameters: Destination = {
      url: 'http://example.com',
      queryParameters: {
        destProp: 'a#b'
      },
      originalProperties: {
        'URL.queries.destUrlProp': 'a?b'
      }
    };

    it('uses authTokens if present on a destination', async () => {
      const httpRequestConfigWithOrigin: HttpRequestConfigWithOrigin = {
        method: 'get',
        headers: {
          requestConfig: {}
        }
      };
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
      const actual = await buildRequestWithMergedHeadersAndQueryParameters(
        httpRequestConfigWithOrigin,
        destination,
        {} as DestinationHttpRequestConfig
      );
      const expected = {
        method: 'get',
        headers: {
          authorization: 'Bearer some.token',
          'sap-client': '123'
        },
        params: {}
      };
      expect(actual).toStrictEqual(expected);
    });

    it("should encode query parameters excluding the 'custom' ones.", async () => {
      const actual = await buildRequestWithMergedHeadersAndQueryParameters(
        requestWithParameters,
        destinationWithParameters,
        {} as DestinationHttpRequestConfig
      );
      const expected = {
        method: 'get',
        url: '/api/entity',
        headers: {},
        params: {
          customParam: 'a/b',
          requestParam: 'a%2Fb',
          destProp: 'a%23b',
          destUrlProp: 'a%3Fb'
        }
      };
      expect(actual).toStrictEqual(expected);
    });

    it('should encode query parameters excluding the custom and request ones if the sdkEncoder is used explicitly.', async () => {
      const actual = await buildRequestWithMergedHeadersAndQueryParameters(
        {
          ...requestWithParameters,
          parameterEncoder: encodeTypedClientRequest
        },
        destinationWithParameters,
        {} as DestinationHttpRequestConfig
      );
      const expected = {
        method: 'get',
        url: '/api/entity',
        headers: {},
        parameterEncoder: encodeTypedClientRequest,
        params: {
          customParam: 'a/b',
          requestParam: 'a/b',
          destProp: 'a%23b',
          destUrlProp: 'a%3Fb'
        }
      };
      expect(actual).toStrictEqual(expected);
    });

    it('should encode all parameters if the encodeAll function is used', async () => {
      const actual = await buildRequestWithMergedHeadersAndQueryParameters(
        {
          ...requestWithParameters,
          parameterEncoder: encodeAllParameters
        },
        destinationWithParameters,
        {} as DestinationHttpRequestConfig
      );
      const expected = {
        method: 'get',
        url: '/api/entity',
        headers: {},
        parameterEncoder: encodeAllParameters,
        params: {
          customParam: 'a%2Fb',
          requestParam: 'a%2Fb',
          destProp: 'a%23b',
          destUrlProp: 'a%3Fb'
        }
      };
      expect(actual).toStrictEqual(expected);
    });

    it('should use custom parameter serializer if given', async () => {
      function parameterEncoder(
        params: Record<string, any>
      ): Record<string, any> {
        return Object.fromEntries(
          Object.entries(params).map(([key, value]) => [
            key,
            `${value}SomeChange`
          ])
        );
      }

      const actual = await buildRequestWithMergedHeadersAndQueryParameters(
        { ...requestWithParameters, parameterEncoder },
        destinationWithParameters,
        {} as DestinationHttpRequestConfig
      );
      const expected = {
        method: 'get',
        url: '/api/entity',
        headers: {},
        parameterEncoder,
        params: {
          customParam: 'a/bSomeChange',
          requestParam: 'a/bSomeChange',
          destProp: 'a#bSomeChange',
          destUrlProp: 'a?bSomeChange'
        }
      };
      expect(actual).toStrictEqual(expected);
    });

    it('should merge and resolve conflicts', async () => {
      const httpRequestConfigWithOrigin: HttpRequestConfigWithOrigin = {
        method: 'get',
        url: '/api/entity',
        headers: {
          custom: {
            'IF-match': 'customEtag'
          },
          requestConfig: {
            Authorization: 'reqConfigAuth',
            'if-match': 'reqConfigEtag'
          }
        }
      };
      const destination: Destination = {
        url: 'http://example.com',
        headers: { 'sap-client': '001' },
        originalProperties: {
          'URL.headers.AUTHORIZATION': 'destPropAuth',
          'URL.queries.param1': 'destPropParam1'
        }
      };
      const actual = await buildRequestWithMergedHeadersAndQueryParameters(
        httpRequestConfigWithOrigin,
        destination,
        {} as DestinationHttpRequestConfig
      );
      const expected = {
        method: 'get',
        url: '/api/entity',
        headers: {
          AUTHORIZATION: 'destPropAuth',
          'IF-match': 'customEtag',
          'sap-client': '001'
        },
        params: {
          param1: 'destPropParam1'
        }
      };
      expect(actual).toStrictEqual(expected);
    });

    it('should add location id headers to the headers if there is a cloudConnectorLocationId in the destination', async () => {
      const httpRequestConfigWithOrigin: HttpRequestConfigWithOrigin = {
        method: 'get',
        headers: {
          requestConfig: {}
        }
      };
      const destination: Destination = {
        url: 'http://example.com',
        cloudConnectorLocationId: 'Potsdam'
      };
      const actual = await buildRequestWithMergedHeadersAndQueryParameters(
        httpRequestConfigWithOrigin,
        destination,
        {} as DestinationHttpRequestConfig
      );
      const expected = {
        method: 'get',
        headers: {
          'SAP-Connectivity-SCC-Location_ID': 'Potsdam'
        },
        params: {}
      };
      expect(actual).toStrictEqual(expected);
    });
    it('should add proxy headers to the headers if there is a proxy configuration in the destination', async () => {
      const proxyHeaders = {
        'Proxy-Authorization': 'Bearer jwt',
        'SAP-Connectivity-Authentication': 'Bearer jwt'
      };
      const httpRequestConfigWithOrigin: HttpRequestConfigWithOrigin = {
        method: 'get',
        headers: {
          requestConfig: {}
        }
      };
      const destination: Destination = {
        url: 'http://example.com',
        proxyType: 'OnPremise',
        proxyConfiguration: {
          ...connectivityProxyConfigMock,
          headers: proxyHeaders
        },
        authentication: 'PrincipalPropagation'
      };
      const actual = await buildRequestWithMergedHeadersAndQueryParameters(
        httpRequestConfigWithOrigin,
        destination,
        {} as DestinationHttpRequestConfig
      );
      const expected = {
        method: 'get',
        headers: {
          'Proxy-Authorization': 'Bearer jwt',
          'SAP-Connectivity-Authentication': 'Bearer jwt'
        },
        params: {}
      };
      expect(actual).toStrictEqual(expected);
    });
  });

  describe('shouldHandleCsrfToken', () => {
    it('should not handle csrf token for get request with default HttpRequestOptions', () => {
      const request = { method: 'get' } as HttpRequestConfig;
      const options = getDefaultHttpRequestOptions();
      expect(shouldHandleCsrfToken(request, options)).toEqual(false);
    });

    it('should not handle csrf token when fetchCsrfToken is overriden to false', () => {
      const request = { method: 'post' } as HttpRequestConfig;
      const options = { fetchCsrfToken: false };
      expect(shouldHandleCsrfToken(request, options)).toEqual(false);
    });

    it('should handle csrf token for non-get request with default HttpRequestOptions', () => {
      const request = { method: 'patch' } as HttpRequestConfig;
      const options = getDefaultHttpRequestOptions();
      expect(shouldHandleCsrfToken(request, options)).toEqual(true);
    });
  });
});
