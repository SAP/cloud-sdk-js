import {
  createOriginalTestEntityDataV4_1,
  createOriginalTestEntityDataV4_2,
  createOriginalTestEntityDataWithLinks,
  defaultDestination,
  mockCountRequest,
  mockGetRequest,
  unmockDestinationsEnv
} from '../../../../test-resources/test/test-util';
import {
  createTestEntity,
  testEntityApi,
  testEntityLvl2MultiLinkApi,
  testEntityMultiLinkApi,
  testEntitySingleLinkApi
} from '../../test/test-util';
import { any } from '../filter';
import { GetAllRequestBuilder } from './get-all-request-builder';
import type { DefaultDeSerializers } from '../de-serializers';
import type { TestEntity } from '@sap-cloud-sdk/test-services-odata-v4/test-service';

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
        'http://example.com/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity';
      const actual = await requestBuilder.url(defaultDestination);
      expect(actual).toBe(expected);
    });

    it('is built correctly for nested expands', async () => {
      const expected =
        'http://example.com/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$expand=to_MultiLink($expand=to_MultiLink1($expand=to_MultiLink2))';
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

    it('is built correctly for selects inside of an expand', async () => {
      const expected =
        'http://example.com/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$expand=to_SingleLink($select=BooleanProperty)';
      const actual = await requestBuilder
        .expand(
          testEntityApi.schema.TO_SINGLE_LINK.select(
            testEntitySingleLinkApi.schema.BOOLEAN_PROPERTY
          )
        )
        .url(defaultDestination);
      expect(actual).toBe(expected);
    });
  });

  describe('execute', () => {
    const testEntity1 = createOriginalTestEntityDataV4_1();
    const testEntity2 = createOriginalTestEntityDataV4_2();
    const response = [
      {
        KeyPropertyGuid: testEntity1.KeyPropertyGuid,
        KeyPropertyString: 'ABCDE',
        KeyDateProperty: '2023-05-05',
        StringProperty: 'FGHIJ',
        BooleanProperty: false,
        Int16Property: 13
      },
      {
        KeyPropertyGuid: testEntity2.KeyPropertyGuid,
        KeyPropertyString: '12345',
        KeyDateProperty: '2023-05-05',
        StringProperty: '6789',
        BooleanProperty: true,
        Int16Property: 42,
        EnumProperty: 'Enum1'
      }
    ];
    it('returns all entities', async () => {
      mockGetRequest(
        {
          responseBody: { value: response },
          path: 'A_TestEntity'
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
      mockGetRequest(
        {
          query: { $top: 1 },
          responseBody: { value: [response[0]] },
          path: 'A_TestEntity'
        },
        testEntityApi
      );

      const actual = await requestBuilder.top(1).execute(defaultDestination);
      expect(actual).toEqual([createTestEntity(testEntity1)]);
    });

    it('skip(1) skips the first entity', async () => {
      mockGetRequest(
        {
          query: { $skip: 1 },
          responseBody: { value: [response[1]] },
          path: 'A_TestEntity'
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
          responseBody: { value: [testEntity] },
          path: 'A_TestEntity'
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
          responseBody: { value: [testEntity] },
          path: 'A_TestEntity'
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
