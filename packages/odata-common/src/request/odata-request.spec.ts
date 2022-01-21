import { v4 as uuid } from 'uuid';
import { Destination } from '@sap-cloud-sdk/connectivity';
import { commonODataUri } from '../../test/common-request-config';
import { CommonEntity, commonEntityApi } from '../../test/common-entity';
import { DefaultDeSerializers } from '../de-serializers';
import { ODataGetAllRequestConfig } from './odata-get-all-request-config';
import { ODataCreateRequestConfig } from './odata-create-request-config';
import { ODataUpdateRequestConfig } from './odata-update-request-config';
import { ODataDeleteRequestConfig } from './odata-delete-request-config';
import { ODataRequest } from './odata-request';

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
      jest.spyOn(req, 'headers').mockResolvedValue({});
      return req;
    }
  });

  describe('query', () => {
    it('should have json parameter by default for get request', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      expect(request.query()).toEqual('?$format=json');
    });

    it('should prioritize destination query parameters over SDK built parameters', () => {
      const request = createRequest(ODataGetAllRequestConfig, {
        url: '',
        queryParameters: { $format: 'destinationParam' }
      });
      expect(request.query()).toEqual('?$format=destinationParam');
    });

    it('should prioritize custom query parameters over SDK built parameters', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      request.config.customQueryParameters = {
        $format: 'customParam'
      };
      expect(request.query()).toEqual('?$format=customParam');
    });

    it('should prioritize custom query parameters over destination parameters', () => {
      const request = createRequest(ODataGetAllRequestConfig, {
        url: '',
        queryParameters: { $format: 'destinationParam' }
      });
      request.config.customQueryParameters = {
        $format: 'customParam'
      };
      expect(request.query()).toEqual('?$format=customParam');
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
