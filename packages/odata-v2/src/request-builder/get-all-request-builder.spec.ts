import nock from 'nock';
import * as httpClient from '@sap-cloud-sdk/http-client';
import {
  TestEntity,
  TestEntitySingleLink
} from '@sap-cloud-sdk/test-services/v2/test-service';
import { wrapJwtInHeader } from '../../../connectivity/src/scp-cf/jwt';
import {
  defaultDestination,
  mockDestinationsEnv,
  mockGetRequest,
  unmockDestinationsEnv
} from '../../../core/test/test-util/request-mocker';
import {
  createOriginalTestEntityData1,
  createOriginalTestEntityData2,
  createTestEntity
} from '../../../core/test/test-util/test-data';
import {
  expectAllMocksUsed,
  certificateMultipleResponse,
  certificateSingleResponse,
  mockInstanceDestinationsCall,
  mockServiceBindings,
  mockSingleDestinationCall,
  mockSubaccountDestinationsCall,
  onlyIssuerServiceToken,
  onlyIssuerXsuaaUrl,
  providerXsuaaUrl,
  providerServiceToken
} from '../../../core/test/test-util';
import { parseDestination } from '../../../connectivity/src/scp-cf/destination/destination';
import { GetAllRequestBuilder } from './get-all-request-builder';

describe('GetAllRequestBuilder', () => {
  let requestBuilder: GetAllRequestBuilder<TestEntity>;

  afterEach(() => {
    unmockDestinationsEnv();
  });

  beforeEach(() => {
    requestBuilder = new GetAllRequestBuilder(TestEntity);
  });

  describe('url', () => {
    it('is built correctly', async () => {
      const expected =
        '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$format=json';
      const actual = await requestBuilder.url(defaultDestination);
      expect(actual).toBe(expected);
    });

    it('is built correctly with URI encoding', async () => {
      const expected =
        "/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$format=json&$filter=(StringProperty%20eq%20'%C3%A4%20%C3%B6%2B%20''c')";
      const actual = await requestBuilder
        .filter(TestEntity.STRING_PROPERTY.equals("ä ö+ 'c"))
        .url(defaultDestination);
      expect(actual).toBe(expected);
    });

    it('adds expand for nested selects', async () => {
      const expected =
        '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$format=json&$select=to_SingleLink/BooleanProperty&$expand=to_SingleLink';
      const actual = await requestBuilder
        .select(
          TestEntity.TO_SINGLE_LINK.select(
            TestEntitySingleLink.BOOLEAN_PROPERTY
          )
        )
        .url(defaultDestination);
      expect(actual).toBe(expected);
    });
  });

  describe('execute', () => {
    it('is possible to use untyped properties', async () => {
      const entityData1 = {
        SomethingTheSDKDoesNotSupport: 'SomeValue'
      };

      mockGetRequest({
        query: { $select: 'SomethingTheSDKDoesNotSupport' },
        responseBody: { d: { results: [entityData1] } }
      });

      const actual = await requestBuilder
        .select(TestEntity.SOMETHING_THE_SDK_DOES_NOT_SUPPORT)
        .execute(defaultDestination);
      expect(actual[0].somethingTheSdkDoesNotSupport).toBe('SomeValue');
    });

    it('returns all entities', async () => {
      const entityData1 = createOriginalTestEntityData1();
      const entityData2 = createOriginalTestEntityData2();

      mockGetRequest({
        responseBody: { d: { results: [entityData1, entityData2] } }
      });

      const actual = await requestBuilder.execute(defaultDestination);
      expect(actual).toEqual([
        createTestEntity(entityData1),
        createTestEntity(entityData2)
      ]);
    });

    it('top(1) returns the first entity', async () => {
      const entityData1 = createOriginalTestEntityData1();
      mockGetRequest({
        query: { $top: 1 },
        responseBody: { d: { results: [entityData1] } }
      });

      const actual = await requestBuilder.top(1).execute(defaultDestination);
      expect(actual).toEqual([createTestEntity(entityData1)]);
    });

    it('skip(1) skips the first entity', async () => {
      const entityData2 = createOriginalTestEntityData2();
      mockGetRequest({
        query: { $skip: 1 },
        responseBody: { d: { results: [entityData2] } }
      });
      const actual = await requestBuilder.skip(1).execute(defaultDestination);
      expect(actual).toEqual([createTestEntity(entityData2)]);
    });

    it('throws an error when the destination cannot be found', async () => {
      mockDestinationsEnv(defaultDestination);

      const getAllRequest = requestBuilder.execute({
        destinationName: 'NonExistentDestination'
      });

      await expect(getAllRequest).rejects.toThrowErrorMatchingSnapshot();
    });

    it('throws an error when request execution fails', async () => {
      mockGetRequest({
        responseBody: { error: 'ERROR' },
        statusCode: 500
      });

      const getAllRequest = requestBuilder.execute(defaultDestination);

      await expect(getAllRequest).rejects.toThrowErrorMatchingSnapshot();
    });
  });

  describe('executeRaw', () => {
    it('returns request and raw response', async () => {
      const entityData1 = createOriginalTestEntityData1();
      const entityData2 = createOriginalTestEntityData2();
      const rawResponse = { d: { results: [entityData1, entityData2] } };

      mockGetRequest({
        responseBody: rawResponse
      });

      const actual = await requestBuilder.executeRaw(defaultDestination);
      expect(actual.data).toEqual(rawResponse);
      expect(actual.request.method).toBe('GET');
    });

    it('executes a request using the (iss) to build a token instead of a user JWT', async () => {
      mockServiceBindings();
      jest.clearAllMocks();

      const nocks = [
        nock(onlyIssuerXsuaaUrl)
          .post('/oauth/token')
          .times(2)
          .reply(200, { access_token: onlyIssuerServiceToken }),
        nock(providerXsuaaUrl)
          .post('/oauth/token')
          .times(1)
          .reply(200, { access_token: providerServiceToken }),
        mockInstanceDestinationsCall(nock, [], 200, onlyIssuerServiceToken),
        mockSubaccountDestinationsCall(
          nock,
          certificateMultipleResponse,
          200,
          onlyIssuerServiceToken
        ),
        mockSingleDestinationCall(
          nock,
          certificateSingleResponse,
          200,
          'ERNIE-UND-CERT',
          wrapJwtInHeader(onlyIssuerServiceToken).headers
        ),
        nock(certificateSingleResponse.destinationConfiguration.URL)
          .get(/.*/)
          .reply(200, 'iss token used on the way')
      ];
      const spy = jest.spyOn(httpClient, 'executeHttpRequest');
      const response = await requestBuilder.executeRaw(
        { destinationName: 'ERNIE-UND-CERT' },
        { iss: onlyIssuerXsuaaUrl }
      );
      expectAllMocksUsed(nocks);
      expect(spy).toHaveBeenCalledWith(
        parseDestination(certificateSingleResponse),
        {
          headers: {
            accept: 'application/json',
            'content-type': 'application/json'
          },
          params: {
            $format: 'json'
          },
          url: 'sap/opu/odata/sap/API_TEST_SRV/A_TestEntity',
          method: 'get',

          data: undefined
        },
        { fetchCsrfToken: true }
      );
      expect(response.data).toBe('iss token used on the way');
    }, 60000);
  });
});
