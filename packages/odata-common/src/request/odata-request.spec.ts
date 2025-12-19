import { randomUUID } from 'node:crypto';
import { oDataTypedClientParameterEncoder } from '@sap-cloud-sdk/http-client/internal';
import { commonODataUri } from '@sap-cloud-sdk/test-services-odata-common/common-request-config';
import { commonEntityApi } from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import { ODataGetAllRequestConfig } from './odata-get-all-request-config';
import { ODataRequest } from './odata-request';
import type { CommonEntity } from '@sap-cloud-sdk/test-services-odata-common/common-entity';
import type { HttpDestination } from '@sap-cloud-sdk/connectivity/internal';
import type { DefaultDeSerializers } from '../de-serializers';

describe('OData Request', () => {
  it('should be noParamEncoder', async () => {
    const request = createRequest(ODataGetAllRequestConfig);
    expect(request.config.parameterEncoder).toBe(
      oDataTypedClientParameterEncoder
    );
  });

  describe('serviceUrl', () => {
    it('should contain "sap/opu/odata/sap/"', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      expect(request.serviceUrl()).toBe('/sap/opu/odata/sap/API_COMMON_SRV');
    });

    it('should contain a new base path', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      request.config.basePath = 'custom/path';
      expect(request.serviceUrl()).toBe('/custom/path');
    });

    it('should contain a base path without slashes', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      request.config.basePath = '/custom/path/';
      expect(request.serviceUrl()).toBe('/custom/path');
    });

    it('should be empty for empty base path', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      request.config.basePath = '';
      expect(request.serviceUrl()).toBe('/');
    });
  });

  describe('relativeUrl', () => {
    it('should contain appended path', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      const requestConfig = request.config as ODataGetAllRequestConfig<
        CommonEntity,
        DefaultDeSerializers
      >;
      requestConfig.appendPath('/$value');
      expect(request.relativeUrl()).toBe(
        'sap/opu/odata/sap/API_COMMON_SRV/A_CommonEntity/$value'
      );
    });

    it('should not remove the trailing slash', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      const requestConfig = request.config as ODataGetAllRequestConfig<
        CommonEntity,
        DefaultDeSerializers
      >;
      requestConfig.appendPath('/');
      expect(request.relativeUrl()).toBe(
        'sap/opu/odata/sap/API_COMMON_SRV/A_CommonEntity/'
      );
    });
  });

  it('request config contains headers without ETag value when there is no ETag config', async () => {
    const destination: HttpDestination = { url: 'http://example.com' };

    const request = createRequest(ODataGetAllRequestConfig, destination);

    expect(request.headers()).toEqual(
      expect.not.objectContaining({ 'if-match': expect.anything() })
    );
  });

  describe('requestConfig', () => {
    it('should overwrite default request config with filtered custom request config', async () => {
      const request = createRequest(ODataGetAllRequestConfig);
      request.config.customRequestConfiguration = { method: 'merge' };
      const config = await request['requestConfig']();
      expect(config['method']).toBe('merge');
    });
  });
});

function createRequest(
  requestConfigConstructor,
  destination: HttpDestination = { url: '' }
) {
  const config = new requestConfigConstructor(commonEntityApi, commonODataUri);
  config.keys = { KeyPropertyGuid: randomUUID(), KeyPropertyString: 'id' };
  return new ODataRequest(config, destination);
}
