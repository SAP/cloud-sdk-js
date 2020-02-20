import { Destination, executeHttpRequest, HttpMethod, HttpResponse, Protocol } from '@sap-cloud-sdk/core';
import { setTestDestination, unmockTestDestination } from '@sap-cloud-sdk/test-util';
import { MapType } from '@sap-cloud-sdk/util';
import axios from 'axios';
import { ODataRequest, ODataRequestConfig } from '../../../packages/core/src/request-builder/request';

import mockserver = require('mockserver-node');

describe('proxy', () => {
  const proxyPort = 1080;
  const destination: Destination = {
    name: 'exampleDotCom',
    url: 'http://example.com',
    proxyConfiguration: {
      host: 'localhost',
      protocol: Protocol.HTTP,
      port: proxyPort,
      headers: undefined
    }
  };

  beforeAll(async () => {
    await startProxyServer(proxyPort);
  }, 10000);

  afterAll(async () => {
    await mockserver.stop_mockserver({ serverPort: proxyPort });
    unmockTestDestination(destination.name as string);
    delete process.env.VCAP_SERVICES;
  });

  beforeEach(async () => {
    const response = await axios.put('http://localhost:1080/mockserver/clear?type=log');
    expect(response.status).toBe(200);
    unmockTestDestination(destination.name as string);
    delete process.env.VCAP_SERVICES;
  });

  it('should use the http proxy with odata-request', async () => {
    await checkProxyServerLogsClean();
    const config = new DummyODataRequestConfig('get', '', 'application/json');
    const oDataRequest = new ODataRequest(config, destination);
    const response = await oDataRequest.execute();

    checkResponse(response);

    await checkProxyServerWasUsed();
  });

  it('should use the http proxy with http-execute.', async () => {
    await checkProxyServerLogsClean();

    await executeHttpRequest(destination, {
      method: HttpMethod.GET
    });

    await checkProxyServerWasUsed();
  }, 10000);

  it('should use proxy if destination is in env variables.', async () => {
    setTestDestination(destination);

    await checkProxyServerLogsClean();

    // Do the call using the proxy
    const response = await executeHttpRequest(
      { destinationName: destination.name as string },
      {
        method: HttpMethod.GET
      }
    );

    checkResponse(response);

    await checkProxyServerWasUsed();
  }, 10000);

  it('should use proxy if destination and proxy is in env variables.', async () => {
    setTestDestination({
      name: 'exampleDotCom',
      url: 'http://example.com'
    });

    process.env['http_proxy'] = `http://localhost:${proxyPort}`;

    await checkProxyServerLogsClean();

    // Do the call using the proxy
    const response = await executeHttpRequest(
      { destinationName: destination.name as string },
      {
        method: HttpMethod.GET
      }
    );

    checkResponse(response);

    await checkProxyServerWasUsed();
  }, 10000);

  it('should use proxy if destination is in vcap and proxy is in env variables.', async () => {
    const serviceBindings = {
      's4-hana-cloud': [
        {
          binding_name: null,
          credentials: {
            Authentication: 'BasicAuthentication',
            Password: 'bar',
            URL: destination.url,
            User: 'foo'
          },
          instance_name: destination.name,
          label: 's4-hana-cloud',
          name: destination.name,
          plan: 'sap_com_0008',
          provider: null,
          syslog_drain_url: null,
          tags: ['s4-hana-cloud'],
          volume_mounts: []
        }
      ]
    };

    process.env.VCAP_SERVICES = JSON.stringify(serviceBindings);

    process.env['http_proxy'] = `http://localhost:${proxyPort}`;

    await checkProxyServerLogsClean();

    // Do the call using the proxy
    const response = await executeHttpRequest(
      { destinationName: destination.name as string },
      {
        method: HttpMethod.GET
      }
    );

    checkResponse(response);

    await checkProxyServerWasUsed();
  }, 10000);
});

const expectedStringsAfterRequest = ['example.com', 'for forwarded request', 'This domain is for use in illustrative examples in documents.'];

async function checkProxyServerLogsClean() {
  const serverLogsBeforCall = await getMockServerLogs();
  expectedStringsAfterRequest.forEach(expected => expect(serverLogsBeforCall).not.toContain(expected));
}

async function checkResponse(response: HttpResponse) {
  expect(response.status).toBe(200);
  expect(response.data).toContain('This domain is for use in illustrative examples in documents.');
}

async function checkProxyServerWasUsed() {
  const serverLogsAfterCall = await getMockServerLogs();
  expectedStringsAfterRequest.forEach(expected => expect(serverLogsAfterCall).toContain(expected));
}

async function getMockServerLogs(): Promise<string> {
  return (await axios.put('http://localhost:1080/mockserver/retrieve?type=logs')).data;
}

async function startProxyServer(port: number) {
  return mockserver.start_mockserver({
    serverPort: port,
    verbose: true
  });
}

class DummyODataRequestConfig extends ODataRequestConfig {
  queryParameters(): MapType<any> {
    return new Map();
  }

  resourcePath(): string {
    return '';
  }
}
