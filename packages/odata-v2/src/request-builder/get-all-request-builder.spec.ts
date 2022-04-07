import nock from 'nock';
import * as httpClient from '@sap-cloud-sdk/http-client';
import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';
import { encodeTypedClientRequest } from '@sap-cloud-sdk/http-client/dist/http-client';
import { wrapJwtInHeader } from '../../../connectivity/src/scp-cf/jwt';
import {
  defaultDestination,
  mockCountRequest,
  mockDestinationsEnv,
  mockGetRequest,
  unmockDestinationsEnv,
  createOriginalTestEntityData1,
  createOriginalTestEntityData2,
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
  providerServiceToken,
  createOriginalTestEntityDataWithLinks
} from '../../../../test-resources/test/test-util';
import { parseDestination } from '../../../connectivity/src/scp-cf/destination/destination';
import {
  testEntityApi,
  testEntitySingleLinkApi,
  createTestEntity,
  testEntityApiCustom,
  createTestEntityWithCustomDeSerializers
} from '../../test/test-util';
import { DefaultDeSerializers } from '../de-serializers';
import { GetAllRequestBuilder } from './get-all-request-builder';

describe('GetAllRequestBuilder', () => {
  let requestBuilder: GetAllRequestBuilder<TestEntity, DefaultDeSerializers>;

  afterEach(() => {
    unmockDestinationsEnv();
  });

  beforeEach(() => {
    requestBuilder = new GetAllRequestBuilder(testEntityApi);
  });

  describe('url', () => {
    it('is built correctly', async () => {
      const expected =
        '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity';
      const actual = await requestBuilder.url(defaultDestination);
      expect(actual).toBe(expected);
    });

    it('is built correctly with URI encoding', async () => {
      const expected =
        "/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$filter=(StringProperty%20eq%20'%C3%A4%20%C3%B6%2B%20''c')";
      const actual = await requestBuilder
        .filter(testEntityApi.schema.STRING_PROPERTY.equals("ä ö+ 'c"))
        .url(defaultDestination);
      expect(actual).toBe(expected);
    });

    it('adds expand for nested selects', async () => {
      const expected =
        '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$select=to_SingleLink/BooleanProperty&$expand=to_SingleLink';
      const actual = await requestBuilder
        .select(
          testEntityApi.schema.TO_SINGLE_LINK.select(
            testEntitySingleLinkApi.schema.BOOLEAN_PROPERTY
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

      mockGetRequest(
        {
          query: { $select: 'SomethingTheSDKDoesNotSupport' },
          responseBody: { d: { results: [entityData1] } }
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
          responseBody: { d: { results: [entityData1, entityData2] } }
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
          responseBody: { d: { results: [entityData1] } }
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
          responseBody: { d: { results: [entityData2] } }
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

      await expect(getAllRequest).rejects.toThrowErrorMatchingSnapshot();
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

      await expect(getAllRequest).rejects.toThrowErrorMatchingSnapshot();
    });

    it('considers custom timeout on the request', async () => {
      const entityData1 = createOriginalTestEntityData1();
      mockGetRequest(
        {
          query: { $top: 1 },
          responseBody: { d: { results: [entityData1] } },
          delay: 100
        },
        testEntityApi
      );

      try {
        await requestBuilder.top(1).timeout(10).execute(defaultDestination);
      } catch (err) {
        expect(err.cause.message).toBe('timeout of 10ms exceeded');
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
          responseBody: { d: { results: [entityData] } }
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
          responseBody: { d: { results: [entityData] } }
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
          responseBody: rawResponse
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

      const nocks = [
        nock(onlyIssuerXsuaaUrl)
          .post('/oauth/token')
          .times(1)
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
      const response = await requestBuilder.executeRaw({
        destinationName: 'ERNIE-UND-CERT',
        iss: onlyIssuerXsuaaUrl
      });
      expectAllMocksUsed(nocks);
      expect(spy).toHaveBeenCalledWith(
        parseDestination(certificateSingleResponse),
        {
          headers: {
            requestConfig: {
              accept: 'application/json',
              'content-type': 'application/json'
            }
          },
          parameterEncoder: encodeTypedClientRequest,
          params: {
            requestConfig: {}
          },
          url: 'sap/opu/odata/sap/API_TEST_SRV/A_TestEntity',
          method: 'get',
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
