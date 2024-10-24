import nock from 'nock';
import * as httpClient from '@sap-cloud-sdk/http-client';
import { oDataTypedClientParameterEncoder } from '@sap-cloud-sdk/http-client/dist/http-client';
import { timeout } from '@sap-cloud-sdk/resilience';
import {
  defaultDestination,
  mockCountRequest,
  mockDestinationsEnv,
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
  createOriginalTestEntityDataWithLinks,
  mockFetchDestinationCalls
} from '../../../../test-resources/test/test-util';
import { parseDestination } from '../../../connectivity/src/scp-cf/destination/destination';
import {
  testEntityApi,
  createTestEntity,
  testEntityApiCustom,
  createTestEntityWithCustomDeSerializers
} from '../../test/test-util';
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

  describe('execute', () => {
    it('is possible to use untyped properties', async () => {
      const entityData1 = {
        SomethingTheSDKDoesNotSupport: 'SomeValue'
      };

      mockGetRequest(
        {
          query: { $select: 'SomethingTheSDKDoesNotSupport' },
          responseBody: { d: { results: [entityData1] } },
          path: 'A_TestEntity'
        },
        testEntityApi
      );

      const actual = await requestBuilder
        .select(testEntityApi.schema.SOMETHING_THE_SDK_DOES_NOT_SUPPORT)
        .execute(defaultDestination);
      expect(actual[0].somethingTheSdkDoesNotSupport).toBe('SomeValue');
    });

    it('returns all entities', async () => {
      const entityData1 = createOriginalTestEntityData1();
      const entityData2 = createOriginalTestEntityData2();

      mockGetRequest(
        {
          responseBody: { d: { results: [entityData1, entityData2] } },
          path: 'A_TestEntity'
        },
        testEntityApi
      );

      const actual = await requestBuilder.execute(defaultDestination);
      expect(actual).toEqual([
        createTestEntity(entityData1),
        createTestEntity(entityData2)
      ]);
    });

    it('top(1) returns the first entity', async () => {
      const entityData1 = createOriginalTestEntityData1();
      mockGetRequest(
        {
          query: { $top: 1 },
          responseBody: { d: { results: [entityData1] } },
          path: 'A_TestEntity'
        },
        testEntityApi
      );

      const actual = await requestBuilder.top(1).execute(defaultDestination);
      expect(actual).toEqual([createTestEntity(entityData1)]);
    });

    it('skip(1) skips the first entity', async () => {
      const entityData2 = createOriginalTestEntityData2();
      mockGetRequest(
        {
          query: { $skip: 1 },
          responseBody: { d: { results: [entityData2] } },
          path: 'A_TestEntity'
        },
        testEntityApi
      );
      const actual = await requestBuilder.skip(1).execute(defaultDestination);
      expect(actual).toEqual([createTestEntity(entityData2)]);
    });

    it('throws an error when the destination cannot be found', async () => {
      mockDestinationsEnv(defaultDestination);

      const getAllRequest = requestBuilder.execute({
        destinationName: 'NonExistentDestination'
      });

      await expect(getAllRequest).rejects.toThrowErrorMatchingInlineSnapshot(
        '"Could not find a destination with name "NonExistentDestination"! Unable to execute request."'
      );
    });

    it('throws an error when request execution fails', async () => {
      mockGetRequest(
        {
          responseBody: { error: 'ERROR' },
          statusCode: 500
        },
        testEntityApi
      );

      const getAllRequest = requestBuilder.execute(defaultDestination);

      await expect(getAllRequest).rejects.toThrowErrorMatchingInlineSnapshot(
        '"get request to http://example.com/sap/opu/odata/sap/API_TEST_SRV failed! "'
      );
    });

    it('considers custom timeout on the request', async () => {
      const entityData1 = createOriginalTestEntityData1();
      mockGetRequest(
        {
          query: { $top: 1 },
          responseBody: { d: { results: [entityData1] } },
          delay: 100,
          path: 'A_TestEntity'
        },
        testEntityApi
      );

      try {
        await requestBuilder
          .top(1)
          .middleware(timeout(10))
          .execute(defaultDestination);
      } catch (err) {
        expect(err.message).toBe(
          'Request to URL: http://example.com ran into a timeout after 10ms.'
        );
        return;
      }
      throw new Error('Should not reach here.');
    });

    it('sets custom headers instead of destination headers', async () => {
      const entityData = createOriginalTestEntityData1();
      const customAuthHeader = { Authorization: 'custom' };
      mockGetRequest(
        {
          headers: customAuthHeader,
          responseBody: { d: { results: [entityData] } },
          path: 'A_TestEntity'
        },
        testEntityApi
      );

      const destinationWithAuthHeader = {
        ...defaultDestination,
        Authorization: 'destination'
      };
      const actual = await requestBuilder
        .addCustomHeaders(customAuthHeader)
        .execute(destinationWithAuthHeader);

      expect(actual).toEqual([createTestEntity(entityData)]);
    });

    it('parses the raw number of count response', async () => {
      mockCountRequest(
        defaultDestination,
        4711,
        testEntityApi.requestBuilder().getAll()
      );
      const count = await requestBuilder.count().execute(defaultDestination);
      expect(count).toBe(4711);
    });

    it('executes request and deserializes entities with custom (de-)serializer', async () => {
      const entityData = createOriginalTestEntityDataWithLinks();

      mockGetRequest(
        {
          responseBody: { d: { results: [entityData] } },
          path: 'A_TestEntity'
        },
        testEntityApiCustom
      );

      const [entity] = await testEntityApiCustom
        .requestBuilder()
        .getAll()
        .execute(defaultDestination);
      expect(entity).toEqual(
        createTestEntityWithCustomDeSerializers(entityData)
      );
    });
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
