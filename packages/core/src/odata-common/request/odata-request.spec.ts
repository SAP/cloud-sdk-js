import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { TestEntity } from '../../../test/test-util/test-services/v2/test-service';
import { Destination } from '../../connectivity/scp-cf/destination';
import { oDataUri as oDataUriV2 } from '../../odata-v2/uri-conversion';
import { ODataGetAllRequestConfig } from './odata-get-all-request-config';
import { ODataUpdateRequestConfig } from './odata-update-request-config';
import { ODataCreateRequestConfig } from './odata-create-request-config';
import { ODataDeleteRequestConfig } from './odata-delete-request-config';
import { ODataRequest } from './odata-request';

describe('OData Request', () => {
  let requestSpy: jest.SpyInstance;
  describe('format', () => {
    beforeEach(() => {
      requestSpy = jest
        .spyOn(axios, 'request')
        .mockResolvedValue({ 'x-csrf-token': 'test' });
    });

    afterEach(() => {
      requestSpy.mockRestore();
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

    describe('isTrustingAllCertificates is defined', () => {
      it('rejectUnauthorized property of HttpsAgent should be set to TRUE when TrustAll is false', async () => {
        const destination: Destination = {
          url: 'https://example.com',
          isTrustingAllCertificates: true
        };
        const request = createRequestWithHeaders(
          ODataDeleteRequestConfig,
          destination
        );
        request.config.fetchCsrfToken = false;
        await request.execute();
        const expectedJsonHttpsAgent = {
          httpsAgent: expect.objectContaining({
            options: expect.objectContaining({ rejectUnauthorized: false })
          })
        };
        expect(axios.request).toHaveBeenCalledWith(
          expect.objectContaining(expectedJsonHttpsAgent)
        );
      });

      it('rejectUnauthorized property of HttpsAgent should be set to FALSE when TrustAll is true', async () => {
        const destination: Destination = {
          url: 'https://example.com',
          isTrustingAllCertificates: false
        };
        const request = createRequestWithHeaders(
          ODataDeleteRequestConfig,
          destination
        );
        request.config.fetchCsrfToken = false;
        await request.execute();
        const expectedJsonHttpsAgent = {
          httpsAgent: expect.objectContaining({
            options: expect.objectContaining({ rejectUnauthorized: true })
          })
        };
        expect(axios.request).toHaveBeenCalledWith(
          expect.objectContaining(expectedJsonHttpsAgent)
        );
      });
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
    it.only('should have json parameter by default for get request', () => {
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
      expect(request.serviceUrl()).toBe('/sap/opu/odata/sap/API_TEST_SRV');
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
        request.config as ODataGetAllRequestConfig<TestEntity>;
      requestConfig.appendPath('/$value');
      expect(request.relativeUrl()).toBe(
        'sap/opu/odata/sap/API_TEST_SRV/A_TestEntity/$value?$format=json'
      );
    });

    it('should not remove the trailing slash', () => {
      const request = createRequest(ODataGetAllRequestConfig);
      const requestConfig =
        request.config as ODataGetAllRequestConfig<TestEntity>;
      requestConfig.appendPath('/');
      expect(request.relativeUrl()).toBe(
        'sap/opu/odata/sap/API_TEST_SRV/A_TestEntity/?$format=json'
      );
    });
  });

  describe('execute', () => {
    beforeEach(() => {
      requestSpy = jest.spyOn(axios, 'request').mockResolvedValue('test');
    });

    afterEach(() => {
      requestSpy.mockRestore();
    });

    it('request config contains headers without etag value when there is no etag config', async () => {
      const destination: Destination = {
        url: 'http://example.com'
      };

      await createRequest(ODataGetAllRequestConfig, destination).execute();

      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining({
          headers: expect.not.objectContaining({
            'if-match': expect.anything()
          })
        })
      );
    });

    it('request config contains httpAgent when destination URL uses "http" as protocol', async () => {
      const expectedConfigEntry = { httpAgent: expect.anything() };
      const httpDestination: Destination = {
        url: 'http://example.com',
        authentication: 'NoAuthentication'
      };

      await createRequest(ODataGetAllRequestConfig, httpDestination).execute();

      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining(expectedConfigEntry)
      );
    });

    it('request config contains httpsAgent when destination URL uses "https" as protocol', async () => {
      const expectedConfigEntry = { httpsAgent: expect.anything() };
      const httpsDestination: Destination = {
        url: 'https://example.com',
        authentication: 'NoAuthentication'
      };

      await createRequest(ODataGetAllRequestConfig, httpsDestination).execute();

      expect(axios.request).toHaveBeenCalledWith(
        expect.objectContaining(expectedConfigEntry)
      );
    });

    it('throws an error if the destination URL uses neither "http" nor "https" as protocol (e.g. RFC)', async () => {
      const rfcDestination: Destination = {
        url: 'rfc://example.com',
        authentication: 'NoAuthentication'
      };

      const request = createRequest(
        ODataGetAllRequestConfig,
        rfcDestination
      ).execute();

      await expect(request).rejects.toThrowErrorMatchingSnapshot();
    });
  });
});

function createRequest(
  requestConfigConstructor,
  destination: Destination = { url: '' }
) {
  const config = new requestConfigConstructor(TestEntity, oDataUriV2);
  config.keys = {
    KeyPropertyGuid: uuid(),
    KeyPropertyString: 'id'
  };
  return new ODataRequest(config, destination);
}
