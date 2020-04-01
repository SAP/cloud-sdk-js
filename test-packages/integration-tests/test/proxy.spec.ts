/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import * as http from 'http';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';
import { once } from 'events';
import {
  Protocol,
  executeHttpRequest,
  HttpMethod,
  Destination
} from '@sap-cloud-sdk/core';
import httpProxy from 'http-proxy';

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
});

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
