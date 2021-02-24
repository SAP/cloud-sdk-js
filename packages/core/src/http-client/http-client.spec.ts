import https from 'https';
import Axios from 'axios';
import nock from 'nock';
import { createLogger } from '@sap-cloud-sdk/util';
import { Destination, Protocol } from '../connectivity';
import {
  DestinationHttpRequestConfig,
  HttpMethod,
  HttpRequest
} from './http-client-types';
import {
  addDestinationToRequestConfig,
  buildHttpRequest,
  executeHttpRequest
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

    it('warn when custom headers are used', async () => {
      const logger = createLogger({
        package: 'core',
        messageContext: 'http-client'
      });
      const warnSpy = jest.spyOn(logger, 'warn');

      await buildHttpRequest(httpsDestination, {
        authorization: 'abc',
        'sap-client': '001',
        'SAP-Connectivity-SCC-Location_ID': 'efg'
      });
      expect(warnSpy).toBeCalledWith(
        'The custom headers are provided with the keys: authorization,sap-client,SAP-Connectivity-SCC-Location_ID. These keys will overwrite the headers created by the SDK.'
      );
    });

    it('throws useful error messages when finding the destination fails', async () => {
      await expect(
        buildHttpRequest({ destinationName: 'does not exist' })
      ).rejects.toThrowErrorMatchingSnapshot();
    });

    it('throws useful error messages when building headers fails', async () => {
      await expect(
        buildHttpRequest({
          url: 'https://example.com',
          authentication: 'BasicAuthentication'
        })
      ).rejects.toThrowErrorMatchingSnapshot();
    });

    it('defaults to NoAuthentication/does not throw if no credentials are provided', async () => {
      await expect(
        buildHttpRequest({ url: 'https://example.com' })
      ).resolves.not.toThrow();
    });
  });

  describe('mergeIntoRequest', () => {
    beforeAll(() => {
      nock.cleanAll();
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
      }).then(conf => Axios.request(conf));
      await expect(request).resolves.not.toThrow();
    });
  });

  describe('executeHttpRequest', () => {
    beforeAll(() => {
      nock.cleanAll();
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

      const config = {
        method: HttpMethod.GET,
        url: '/api/entity',
        params: {
          a: 'a',
          b: 'b'
        }
      };

      const response = await executeHttpRequest(httpsDestination, config);
      expect(response.data.res).toBe('ult');
      expect(response.status).toBe(200);
      expect(response.headers).toMatchObject({ sharp: 'header' });
    });

    it('also works also in more complex cases in more complex cases', async () => {
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

      const config: HttpRequest = {
        baseURL: 'https://custom.example.com',
        method: HttpMethod.POST,
        url: '/api/entity',
        headers: {
          'content-type': 'application/json',
          accept: 'application/json',
          'x-csrf-token': 'Fetch',
          authorization: 'custom-auth-header'
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
            a: 'a',
            b: 'b'
          }
        })
      ).rejects.toThrowErrorMatchingSnapshot();
    });
  });
});
