import { v4 as uuid } from 'uuid';
import { Destination } from '@sap-cloud-sdk/connectivity';
import { OriginOptions } from '@sap-cloud-sdk/http-client';
import {
  DefaultDeSerializers,
  ODataCreateRequestConfig,
  ODataDeleteRequestConfig,
  ODataGetAllRequestConfig,
  ODataRequest,
  ODataUpdateRequestConfig
} from '../internal';
import { commonODataUri } from '../../test/common-request-config';
import { CommonEntity, commonEntityApi } from '../../test/common-entity';

describe('OData Request', () => {
  describe('format', () => {
    it('should be json for GET', async () => {
      const request = createRequestWithHeaders(ODataGetAllRequestConfig);
      expect(request.url()).toContain('$format=json');
    });

    it('should not be json for POST', async () => {
      const request = createRequestWithHeaders(ODataCreateRequestConfig);
      expect(request.url()).not.toContain('$format=json');
    });

    it('should not be json for PATCH', async () => {
      const request = createRequestWithHeaders(ODataUpdateRequestConfig);
      expect(request.url()).not.toContain('$format=json');
    });

    it('should not be json for DELETE', async () => {
      const request = createRequestWithHeaders(ODataDeleteRequestConfig);
      expect(request.url()).not.toContain('$format=json');
    });

    function createRequestWithHeaders(
      configConstructor,
      destination?
    ): ODataRequest<any> {
      const req = createRequest(configConstructor, destination);
      jest.spyOn(req, 'headers').mockResolvedValue({} as OriginOptions);
      return req;
    }
  });

  describe('query', () => {
    it('should have json parameter by default for get request', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      expect(request.query()).toEqual('?$format=json');
    });
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
        'sap/opu/odata/sap/API_COMMON_SRV/A_CommonEntity/$value?$format=json'
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
        'sap/opu/odata/sap/API_COMMON_SRV/A_CommonEntity/?$format=json'
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
