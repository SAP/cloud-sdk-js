import { TestEntity } from '@sap-cloud-sdk/test-services/v4/test-service';
import {
  defaultDestination,
  mockCountRequest,
  mockGetRequest,
  unmockDestinationsEnv,
  createOriginalTestEntityData1,
  createOriginalTestEntityData2,
  createOriginalTestEntityDataWithLinks
} from '../../../../test-resources/test/test-util';
import { any } from '../filter';
import { DefaultDeSerializers } from '../de-serializers';
import {
  testEntityApi,
  testEntityLvl2MultiLinkApi,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi,
  createTestEntity
} from '../../test/test-util';
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

    it('is built correctly for nested expands', async () => {
      const expected =
        '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$expand=to_MultiLink($expand=to_MultiLink1($expand=to_MultiLink2))';
      const actual = await requestBuilder
        .expand(
          testEntityApi.schema.TO_MULTI_LINK.expand(
            testEntityMultiLinkApi.schema.TO_MULTI_LINK_1.expand(
              testEntityLvl2MultiLinkApi.schema.TO_MULTI_LINK_2.expand()
            )
          )
        )
        .url(defaultDestination);
      expect(actual).toBe(expected);
    });
  });

  it('is built correctly for selects inside of an expand', async () => {
    const expected =
      '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$expand=to_SingleLink($select=BooleanProperty)';
    const actual = await requestBuilder
      .expand(
        testEntityApi.schema.TO_SINGLE_LINK.select(
          testEntitySingleLinkApi.schema.BOOLEAN_PROPERTY
        )
      )
      .url(defaultDestination);
    expect(actual).toBe(expected);
  });

  describe('execute', () => {
    it('returns all entities', async () => {
      const testEntity1 = createOriginalTestEntityData1();
      const testEntity2 = createOriginalTestEntityData2();

      mockGetRequest(
        {
          responseBody: { value: [testEntity1, testEntity2] }
        },
        testEntityApi
      );

      const actual = await new GetAllRequestBuilder(testEntityApi).execute(
        defaultDestination
      );
      expect(actual).toEqual([
        createTestEntity(testEntity1),
        createTestEntity(testEntity2)
      ]);
    });

    it('top(1) returns the first entity', async () => {
      const testEntity1 = createOriginalTestEntityData1();
      mockGetRequest(
        {
          query: { $top: 1 },
          responseBody: { value: [testEntity1] }
        },
        testEntityApi
      );

      const actual = await requestBuilder.top(1).execute(defaultDestination);
      expect(actual).toEqual([createTestEntity(testEntity1)]);
    });

    it('skip(1) skips the first entity', async () => {
      const testEntity2 = createOriginalTestEntityData2();
      mockGetRequest(
        {
          query: { $skip: 1 },
          responseBody: { value: [testEntity2] }
        },
        testEntityApi
      );
      const actual = await requestBuilder.skip(1).execute(defaultDestination);
      expect(actual).toEqual([createTestEntity(testEntity2)]);
    });

    it('should resolve when ALL_FIELDS is selected and links are expanded', async () => {
      const testEntity = createOriginalTestEntityDataWithLinks();
      mockGetRequest(
        {
          query: {
            $select: '*',
            $expand: 'to_SingleLink,to_MultiLink'
          },
          responseBody: { value: [testEntity] }
        },
        testEntityApi
      );
      const actual = await requestBuilder
        .select(testEntityApi.schema.ALL_FIELDS)
        .expand(
          testEntityApi.schema.TO_SINGLE_LINK,
          testEntityApi.schema.TO_MULTI_LINK
        )
        .execute(defaultDestination);
      expect(actual).toEqual([createTestEntity(testEntity)]);
    });

    it('should resolve when multi-link is expanded with lambda expression filter', async () => {
      const testEntity = createOriginalTestEntityDataWithLinks();
      mockGetRequest(
        {
          query: {
            $expand:
              "to_SingleLink,to_MultiLink($filter=((to_MultiLink1/any(a0:(a0/StringProperty ne 'test')))))"
          },
          responseBody: { value: [testEntity] }
        },
        testEntityApi
      );
      const actual = await requestBuilder
        .expand(
          testEntityApi.schema.TO_SINGLE_LINK,
          testEntityApi.schema.TO_MULTI_LINK.filter(
            testEntityMultiLinkApi.schema.TO_MULTI_LINK_1.filter(
              any(
                testEntityLvl2MultiLinkApi.schema.STRING_PROPERTY.notEquals(
                  'test'
                )
              )
            )
          )
        )
        .execute(defaultDestination);
      expect(actual).toEqual([createTestEntity(testEntity)]);
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
  });

  describe('execute raw', () => {
    it('parses the raw number of count response', async () => {
      mockCountRequest(
        defaultDestination,
        4711,
        testEntityApi.requestBuilder().getAll()
      );
      const count = await requestBuilder.count().execute(defaultDestination);
      expect(count).toBe(4711);
    });
  });
});
