import { Destination } from '@sap-cloud-sdk/connectivity';

import {
  defaultDestination,
  mockHeaderRequest
} from '../../core/test/test-util/request-mocker';
import { connectivityProxyConfigMock } from '../../core/test/test-util/environment-mocks';
import {DummyEntity} from "./dummy-entity.spec";
import {ODataGetAllRequestConfig} from "./request/odata-get-all-request-config";
import {ODataRequest} from "./request/odata-request";
import {ODataUpdateRequestConfig} from "./request/odata-update-request-config";
import {buildHeaders} from "./header-builder";
import {ODataGetByKeyRequestConfig} from "./request/odata-get-by-key-request-config";
import {ODataDeleteRequestConfig} from "./request/odata-delete-request-config";
import {ODataCreateRequestConfig} from "./request/odata-create-request-config";
import {ODataBatchRequestConfig} from "./request/odata-batch-request-config";

export function createGetAllRequest(
    dest: Destination=defaultDestination
): ODataRequest<ODataGetAllRequestConfig<DummyEntity>> {
  const requestConfig = new ODataGetAllRequestConfig(DummyEntity, {} as any);
  requestConfig.method = 'get';
  const outer =  new ODataRequest(requestConfig, dest);
  return outer
}

export function createByKeyRequest(
    dest: Destination=defaultDestination
): ODataRequest<ODataGetByKeyRequestConfig<DummyEntity>> {
  const requestConfig = new ODataGetByKeyRequestConfig(DummyEntity, {} as any);
  return new ODataRequest(requestConfig, dest);
}

export function createUpdateRequest(
  dest: Destination
): ODataRequest<ODataUpdateRequestConfig<DummyEntity>> {
  const requestConfig = new ODataUpdateRequestConfig(DummyEntity, {} as any);
  return new ODataRequest(requestConfig, dest);
}

export function createDeleteRequest(
    dest: Destination=defaultDestination
): ODataRequest<ODataDeleteRequestConfig<DummyEntity>> {
  const requestConfig = new ODataDeleteRequestConfig(DummyEntity, {} as any);
  return new ODataRequest(requestConfig, dest);
}

export function createCreateRequest(
    dest: Destination=defaultDestination
): ODataRequest<ODataCreateRequestConfig<DummyEntity>> {
  const requestConfig = new ODataCreateRequestConfig(DummyEntity, {} as any);
  return new ODataRequest(requestConfig, dest);
}

export function createBatchRequest(
    dest: Destination=defaultDestination
): ODataRequest<ODataBatchRequestConfig> {
  const requestConfig = new ODataBatchRequestConfig( "");
  return new ODataRequest(requestConfig, dest);
}

describe('Header-Builder', () => {
  it('customHeaders are not overwritten', async () => {
    const authString = 'initial';
    const request = createGetAllRequest(defaultDestination);
    request.config.customHeaders = { authorization: authString };

    const headers = await buildHeaders(request);
    expect(headers.authorization).toBe(authString);
  });

  it('uses authTokens if present on a destination', async () => {
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
    const request = createGetAllRequest(destination);
    const headers = await buildHeaders(request);

    expect(headers.authorization).toBe('Bearer some.token');
  });

  describe('update request header with ETag', () => {
    it('if-match should not be set when no ETag is specified', async () => {
      const request = createUpdateRequest(defaultDestination);

      mockHeaderRequest({ request });

      const actual = await buildHeaders(request);
      expect(actual['if-match']).toBeUndefined();
    });

    it('if-match should be set when ETag is specified in header-builder', async () => {
      const request = createUpdateRequest(defaultDestination);
      request.config.eTag = 'W//';

      mockHeaderRequest({ request });

      const actual = await buildHeaders(request);
      expect(actual['if-match']).toBe('W//');
    });

    it('if-match should be set to * when version identifier is ignored', async () => {
      const request = createUpdateRequest(defaultDestination);
      request.config.eTag = 'W//';
      // Set by ignoreVersionIdentifier()
      request.config.versionIdentifierIgnored = true;

      mockHeaderRequest({ request });

      const actual = await buildHeaders(request);
      expect(actual['if-match']).toBe('*');
    });
  });

  it('Adds proxy headers to the headers if there is a proxy configuration in the destination', async () => {
    const proxyHeaders = {
      'Proxy-Authorization': 'Bearer jwt',
      'SAP-Connectivity-Authentication': 'Bearer jwt'
    };

    const destination: Destination = {
      url: 'https://destination.example.com',
      proxyType: 'OnPremise',
      proxyConfiguration: {
        ...connectivityProxyConfigMock,
        headers: proxyHeaders
      }
    };

    const request = createGetAllRequest(destination);
    const headers = await request.headers();

    expect(headers['Proxy-Authorization']).toBe('Bearer jwt');
    expect(headers['SAP-Connectivity-Authentication']).toBe('Bearer jwt');
  });

  it('Adds location id headers to the headers if there is a cloudConnectorLocationId in the destination', async () => {
    const destination: Destination = {
      url: 'https://destination.example.com',
      cloudConnectorLocationId: 'Potsdam'
    };

    const request = createGetAllRequest(destination);
    const headers = await request.headers();
    expect(headers['SAP-Connectivity-SCC-Location_ID']).toBe('Potsdam');
  });

  it('Prioritizes custom Authorization headers (upper case A)', async () => {
    const request = createGetAllRequest(defaultDestination);
    request.config.addCustomHeaders({
      Authorization: 'Basic SOMETHINGSOMETHING'
    });

    const headers = await request.headers();
    expect(headers.authorization).toBe('Basic SOMETHINGSOMETHING');
  });

  it('Prioritizes custom Authorization headers (lower case A)', async () => {
    const request = createGetAllRequest(defaultDestination);
    request.config.addCustomHeaders({
      authorization: 'Basic SOMETHINGSOMETHING'
    });

    const headers = await request.headers();
    expect(headers.authorization).toBe('Basic SOMETHINGSOMETHING');
  });
});
