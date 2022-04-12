import { v4 as uuid } from 'uuid';
import { Destination } from '@sap-cloud-sdk/connectivity';
import { encodeTypedClientRequest } from '@sap-cloud-sdk/http-client/internal';
import { commonODataUri } from '../../test/common-request-config';
import { CommonEntity, commonEntityApi } from '../../test/common-entity';
import { DefaultDeSerializers } from '../de-serializers';
import { ODataGetAllRequestConfig } from './odata-get-all-request-config';
import { ODataRequest } from './odata-request';

describe('OData Request', () => {
  it('should be noParamEncoder', async () => {
    const request = createRequest(ODataGetAllRequestConfig);
    expect(request.config.parameterEncoder).toBe(encodeTypedClientRequest);
  });

  describe('serviceUrl', () => {
    it('should contain "sap/opu/odata/sap/"', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      expect(request.serviceUrl()).toBe('/sap/opu/odata/sap/API_COMMON_SRV');
    });

    it('should contain custom service path', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      request.config.customServicePath = 'custom/path';
      expect(request.serviceUrl()).toBe('/custom/path');
    });

    it('should contain custom service path without slashes', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      request.config.customServicePath = '/custom/path/';
      expect(request.serviceUrl()).toBe('/custom/path');
    });

    it('should be empty for empty custom service path', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      request.config.customServicePath = '';
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
    const destination: Destination = {
      url: 'http://example.com'
    };

    const request = createRequest(ODataGetAllRequestConfig, destination);

    expect(request.headers()).toEqual(
      expect.not.objectContaining({
        'if-match': expect.anything()
      })
    );
  });

  describe('requestConfig', () => {
    it('should overwrite default request config with filtered custom request config', async () => {
      const request = createRequest(ODataGetAllRequestConfig);
      request.config.customRequestConfiguration = {
        method: 'merge'
      };
      const config = await request['requestConfig']();
      expect(config['method']).toBe('merge');
    });
  });
});

function createRequest(
  requestConfigConstructor,
  destination: Destination = { url: '' }
) {
  const config = new requestConfigConstructor(commonEntityApi, commonODataUri);
  config.keys = {
    KeyPropertyGuid: uuid(),
    KeyPropertyString: 'id'
  };
  return new ODataRequest(config, destination);
}
