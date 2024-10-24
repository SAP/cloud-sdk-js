import nock from 'nock';
import * as httpClient from '@sap-cloud-sdk/http-client';
import { oDataTypedClientParameterEncoder } from '@sap-cloud-sdk/http-client/dist/http-client';
import {
  defaultDestination,
  mockCountRequest,
  mockGetRequest,
  unmockDestinationsEnv,
  createOriginalTestEntityData1,
  createOriginalTestEntityData2,
  expectAllMocksUsed,
  certificateSingleResponse,
  mockServiceBindings,
  onlyIssuerServiceToken,
  onlyIssuerXsuaaUrl,
  providerXsuaaUrl,
  providerServiceToken,
  mockFetchDestinationCalls
} from '../../../../test-resources/test/test-util';
import { parseDestination } from '../../../connectivity/src/scp-cf/destination/destination';
import { testEntityApi } from '../../test/test-util';
import { GetAllRequestBuilder } from './get-all-request-builder';
import type { DefaultDeSerializers } from '../de-serializers';
import type { TestEntity } from '@sap-cloud-sdk/test-services-odata-v2/test-service';

describe('GetAllRequestBuilder', () => {
  let requestBuilder: GetAllRequestBuilder<TestEntity, DefaultDeSerializers>;

  afterEach(() => {
    unmockDestinationsEnv();
  });

  beforeEach(() => {
    requestBuilder = new GetAllRequestBuilder(testEntityApi);
  });

  describe('executeRaw', () => {
    it('returns request and raw response', async () => {
      const entityData1 = createOriginalTestEntityData1();
      const entityData2 = createOriginalTestEntityData2();
      const rawResponse = { d: { results: [entityData1, entityData2] } };

      mockGetRequest(
        {
          responseBody: rawResponse,
          path: 'A_TestEntity'
        },
        testEntityApi
      );

      const actual = await requestBuilder.executeRaw(defaultDestination);
      expect(actual.data).toEqual(rawResponse);
      expect(actual.request.method).toBe('GET');
    });

    it('executes a request using the (iss) to build a token instead of a user JWT', async () => {
      mockServiceBindings();
      jest.clearAllMocks();

      const httpMocks = [
        nock(onlyIssuerXsuaaUrl)
          .post('/oauth/token')
          .times(1)
          .reply(200, { access_token: onlyIssuerServiceToken }),
        nock(providerXsuaaUrl)
          .post('/oauth/token')
          .times(1)
          .reply(200, { access_token: providerServiceToken }),
        ...mockFetchDestinationCalls(certificateSingleResponse, {
          serviceToken: onlyIssuerServiceToken
        }),
        nock(certificateSingleResponse.destinationConfiguration.URL!)
          .get(/.*/)
          .reply(200, 'iss token used on the way')
      ];
      const spy = jest.spyOn(httpClient, 'executeHttpRequest');
      const response = await requestBuilder.executeRaw({
        destinationName: 'ERNIE-UND-CERT',
        iss: onlyIssuerXsuaaUrl
      });
      expectAllMocksUsed(httpMocks);
      expect(spy).toHaveBeenCalledWith(
        parseDestination(certificateSingleResponse),
        {
          headers: {
            requestConfig: {
              accept: 'application/json',
              'content-type': 'application/json'
            }
          },
          parameterEncoder: oDataTypedClientParameterEncoder,
          params: {
            requestConfig: {}
          },
          url: 'sap/opu/odata/sap/API_TEST_SRV/A_TestEntity',
          method: 'get',
          middleware: [expect.any(Function)],
          data: undefined
        },
        { fetchCsrfToken: true }
      );
      expect(response.data).toBe('iss token used on the way');
    }, 60000);

    it('returns request and raw response count', async () => {
      mockCountRequest(
        defaultDestination,
        4711,
        testEntityApi.requestBuilder().getAll()
      );
      const actual = await requestBuilder
        .count()
        .executeRaw(defaultDestination);
      expect(actual.data).toEqual(4711);
      expect(actual.request.method).toBe('GET');
    });
  });
});
