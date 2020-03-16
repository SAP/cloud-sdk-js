/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import https from 'https';
import Axios from 'axios';
import nock from 'nock';
import {
  addDestinationToRequestConfig,
  buildHttpRequest,
  Destination,
  DestinationHttpRequestConfig,
  executeHttpRequest,
  HttpMethod,
  HttpRequest,
  Protocol
} from '../../src';
import { muteLoggers } from '../test-util/mute-logger';

describe('generic http client', () => {
  beforeAll(() => {
    muteLoggers('environment-accessor', 'destination-accessor');
  });

  const httpsDestination: Destination = {
    name: 'httpsDestination',
    url: 'https://example.com',
    authentication: 'BasicAuthentication',
    username: 'USERNAME',
    password: 'PASSWORD',
    sapClient: '001'
  };

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
        'Proxy-Authorization': 'jajaja',
        'SAP-Connectivity-Authentication': 'yeahyeah'
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
          'Proxy-Authorization': 'jajaja',
          'SAP-Connectivity-Authentication': 'yeahyeah'
        }
      };

      const actualProxy = await buildHttpRequest(proxyDestination);

      expect(actualProxy).toMatchObject(expectedProxy);
      expect(actualProxy.httpAgent).toBeDefined();
    });

    it('throws useful error messages when finding the destination fails', async () => {
      await expect(buildHttpRequest({ destinationName: 'does not exist' })).rejects.toThrowErrorMatchingSnapshot();
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
      await expect(buildHttpRequest({ url: 'https://example.com' })).resolves.not.toThrow();
    });
  });

  describe('mergeIntoRequest', () => {
    beforeAll(() => {
      nock.cleanAll();
    });

    it('merges given headers with provided headers (but gives priority to our headers)', async () => {
      const input = {
        a: '1',
        b: '2',
        headers: {
          a: '1',
          authorization: 'whatever'
        }
      };

      const expected = {
        a: '1',
        b: '2',
        baseURL: 'https://example.com',
        headers: {
          a: '1',
          authorization: 'Basic VVNFUk5BTUU6UEFTU1dPUkQ=',
          'sap-client': '001'
        }
      };

      const actual = await addDestinationToRequestConfig(httpsDestination, input);

      expect(actual).toMatchObject(expected);
      expect(actual.httpsAgent).toBeDefined();
    });

    it('overwrites baseURL and either httpAgent or httpsAgent', async () => {
      const input = {
        baseURL: 'lalala',
        headers: {
          a: '1',
          authorization: 'whatever'
        },
        httpsAgent: 'lalala'
      };

      const expected = {
        baseURL: 'https://example.com',
        headers: {
          a: '1',
          authorization: 'Basic VVNFUk5BTUU6UEFTU1dPUkQ=',
          'sap-client': '001'
        }
      };

      const actual = await addDestinationToRequestConfig(httpsDestination, input);

      expect(actual).toMatchObject(expected);
      expect(actual.httpsAgent).not.toBe('lalala');
    });

    it('allows usage with e.g. axios.request', async () => {
      const config: HttpRequest = {
        baseURL: '',
        method: HttpMethod.GET,
        url: '/api/entity',
        headers: {},
        params: {
          a: 'a',
          b: 'b'
        }
      };

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

      const request = addDestinationToRequestConfig(httpsDestination, config).then(conf => Axios.request(conf));
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
      nock('https://example.com')
        .get(/.*/)
        .reply(200);

      return new Promise((resolve, reject) => https.get('https://example.com', response => (response.statusCode === 200 ? resolve() : reject())));
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

    it('works also in more complex cases', async () => {
      nock('https://example.com', {
        reqheaders: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-csrf-token': 'Fetch',
          authorization: 'Basic VVNFUk5BTUU6UEFTU1dPUkQ=',
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
        baseURL: '',
        method: HttpMethod.POST,
        url: '/api/entity',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'x-csrf-token': 'Fetch',
          authorization: 'trololol'
        },
        data: {
          a: 1,
          b: 2,
          c: 3
        }
      };

      await expect(executeHttpRequest(httpsDestination, config)).resolves.not.toThrow();
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

      const config: HttpRequest = {
        baseURL: '',
        method: HttpMethod.GET,
        url: '/api/entity',
        headers: {},
        params: {
          a: 'a',
          b: 'b'
        }
      };

      await expect(executeHttpRequest(httpsDestination, config)).rejects.toThrowErrorMatchingSnapshot();
    });
  });
});
