/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import * as http from 'http';
import { once } from 'events';
import {
  Protocol,
  executeHttpRequest,
  HttpMethod,
  Destination
} from '@sap-cloud-sdk/core';
import httpProxy from 'http-proxy';
import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';
import nock from 'nock';
import { setTestDestination } from '@sap-cloud-sdk/test-util';
import axios from '../../../packages/core/node_modules/axios';

const httpServerResponse = 'http';
describe('proxy', () => {
  it("should use the http proxy with http-execute for 'http'", async () => {
    const httpServer = await createHttpServer();
    const httpServerPort = getServerPort(httpServer);

    const proxySpy = jest.fn();

    const proxyServer = await createProxyServer(proxySpy);
    const proxyPort = getServerPort(proxyServer);

    const destination: Destination = {
      url: `http://localhost:${httpServerPort}`,
      proxyConfiguration: {
        host: 'localhost',
        protocol: Protocol.HTTP,
        port: proxyPort
      }
    };

    const request = executeHttpRequest(destination, {
      method: HttpMethod.GET
    }).then(res => res.data);

    await expect(request).resolves.toEqual(httpServerResponse);
    expect(proxySpy).toHaveBeenCalled();

    await closeServer(httpServer);
    await closeServer(proxyServer);
  });

  describe('should have proxy config set', () => {
    const destination: Destination = {
      name: 'TESTINATION',
      url: 'http://example.com',
      proxyConfiguration: {
        host: 'proxy.com',
        protocol: Protocol.HTTP,
        port: 1234
      }
    };

    let requestSpy;

    beforeEach(() => {
      nock('http://example.com')
        .get(/.*/)
        .reply(200, { d: { results: [] } });

      requestSpy = jest.spyOn(axios, 'request');
    });

    afterEach(() => {
      requestSpy.mockClear();
      delete process.env.destinations;
    });

    it('not for OData requests without proxy configuration', async () => {
      await TestEntity.requestBuilder()
        .getAll()
        .execute({ url: destination.url });
      expect(requestSpy).not.toHaveBeenCalledWith(objectContainingProxyAgent());
    });

    it('for OData requests with proxy configuration', async () => {
      await TestEntity.requestBuilder().getAll().execute(destination);
      expect(requestSpy).toHaveBeenCalledWith(objectContainingProxyAgent());
    });

    it('for OData requests with proxy configuration to https destination', async () => {
      nock('https://example.com')
        .get(/.*/)
        .reply(200, { d: { results: [] } });
      const httpsRequestSpy = jest.spyOn(axios, 'request');
      await TestEntity.requestBuilder()
        .getAll()
        .execute({ ...destination, url: 'https://example.com' });
      expect(httpsRequestSpy).toHaveBeenCalledWith(
        objectContainingProxyAgent('httpsAgent')
      );
    });

    it('for destinations in env variable', async () => {
      setTestDestination({ ...destination, name: destination.name });
      await TestEntity.requestBuilder()
        .getAll()
        .execute({ destinationName: destination.name! });
      expect(requestSpy).toHaveBeenCalledWith(objectContainingProxyAgent());
    });

    it('for destinations in env variable with proxy env variable', async () => {
      setTestDestination({ url: destination.url, name: destination.name });
      process.env.http_proxy = `${destination.proxyConfiguration?.protocol}://${destination.proxyConfiguration?.host}:${destination.proxyConfiguration?.port}`;
      await TestEntity.requestBuilder()
        .getAll()
        .execute({ destinationName: destination.name! });
      expect(requestSpy).toHaveBeenCalledWith(objectContainingProxyAgent());
    });

    it('for destinations in vcap_services with proxy env variable', async () => {
      const serviceBindings = {
        's4-hana-cloud': [
          {
            credentials: {
              Password: 'password',
              URL: destination.url,
              User: 'user'
            },
            instance_name: destination.name,
            name: destination.name
          }
        ]
      };

      process.env.VCAP_SERVICES = JSON.stringify(serviceBindings);
      process.env.http_proxy = 'http://proxy.com:1234';

      await TestEntity.requestBuilder()
        .getAll()
        .execute({ destinationName: destination.name! });
      expect(requestSpy).toHaveBeenCalledWith(objectContainingProxyAgent());
    });
  });
});

function objectContainingProxyAgent(agentKey = 'httpAgent') {
  return expect.objectContaining({
    [agentKey]: expect.objectContaining({
      proxy: expect.objectContaining({
        href: 'http://proxy.com:1234/'
      })
    })
  });
}

async function createHttpServer() {
  const server = http.createServer((req, res) => {
    res.end(httpServerResponse);
  });

  server.listen();
  await once(server, 'listening');
  return server;
}

async function createProxyServer(proxySpy) {
  const proxy = httpProxy.createProxyServer({});
  const server = http.createServer(function (req, res) {
    proxySpy();
    proxy.web(req, res, { target: `http://${req.headers.host!}` });
  });

  server.listen();
  await once(server, 'listening');
  return server;
}

function getServerPort(server) {
  return (server._server || server).address().port;
}

async function closeServer(server) {
  server.close();
  return once(server, 'close');
}
