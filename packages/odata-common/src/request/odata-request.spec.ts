import { v4 as uuid } from 'uuid';
import { Destination } from '@sap-cloud-sdk/connectivity';
import {
  ODataCreateRequestConfig,
  ODataDeleteRequestConfig,
  ODataGetAllRequestConfig,
  ODataRequest,
  ODataUpdateRequestConfig
} from '../internal';
import { commonODataUri } from '../../test/common-request-config';
import { CommonEntity } from '../../test/common-entity';

// jest.mock('../../http-client/node_modules/axios', () => ({
//   request: () => Promise.resolve()
// }));
//   .spyOn(axios, 'request')
//   .mockResolvedValue({ 'x-csrf-token': 'test' });

// jest.mock('@sap-cloud-sdk/http-client');

jest.mock('@sap-cloud-sdk/http-client', () => {
  const actual = jest.requireActual('@sap-cloud-sdk/http-client');
  return {
    ...actual,
    executeHttpRequestWithOrigin: jest
      .fn()
      .mockResolvedValue({ 'x-csrf-token': 'test' })
  };
});

describe('OData Request', () => {
  // const requestSpy
  describe('format', () => {
    beforeEach(() => {
      // requestSpy.mockResolvedValue({ 'x-csrf-token': 'test' });
    });

    afterEach(() => {
      // requestSpy.mockReset();
    });

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
      const requestConfig =
        request.config as ODataGetAllRequestConfig<CommonEntity>;
      requestConfig.appendPath('/$value');
      expect(request.relativeUrl()).toBe(
        'sap/opu/odata/sap/API_COMMON_SRV/A_CommonEntity/$value?$format=json'
      );
    });

    it('should not remove the trailing slash', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      const requestConfig =
        request.config as ODataGetAllRequestConfig<CommonEntity>;
      requestConfig.appendPath('/');
      expect(request.relativeUrl()).toBe(
        'sap/opu/odata/sap/API_COMMON_SRV/A_CommonEntity/?$format=json'
      );
    });
  });
});

function createRequest(
  requestConfigConstructor,
  destination: Destination = { url: '' }
) {
  const config = new requestConfigConstructor(CommonEntity, commonODataUri);
  config.keys = {
    KeyPropertyGuid: uuid(),
    KeyPropertyString: 'id'
  };
  return new ODataRequest(config, destination);
}
