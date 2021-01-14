import {
  defaultDestination,
  mockGetRequest,
  unmockDestinationsEnv
} from '../../../test/test-util/request-mocker';
import {
  TestEntity,
  TestEntityLvl2MultiLink,
  TestEntityMultiLink,
  TestEntitySingleLink
} from '../../../test/test-util/test-services/v4/test-service';
import {
  createOriginalTestEntityData1,
  createOriginalTestEntityData2,
  createOriginalTestEntityDataWithLinks,
  createTestEntityV4 as createTestEntity
} from '../../../test/test-util/test-data';
import { any } from '..';
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

    it('is built correctly for nested expands', async () => {
      const expected =
        '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$format=json&$expand=to_MultiLink($expand=to_MultiLink1($expand=to_MultiLink2))';
      const actual = await requestBuilder
        .expand(
          TestEntity.TO_MULTI_LINK.expand(
            TestEntityMultiLink.TO_MULTI_LINK_1.expand(
              TestEntityLvl2MultiLink.TO_MULTI_LINK_2.expand()
            )
          )
        )
        .url(defaultDestination);
      expect(actual).toBe(expected);
    });
  });

  it('is built correctly for selects inside of an expand.', async () => {
    const expected =
      '/testination/sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$format=json&$expand=to_SingleLink($select=BooleanProperty)';
    const actual = await requestBuilder
      .expand(
        TestEntity.TO_SINGLE_LINK.select(TestEntitySingleLink.BOOLEAN_PROPERTY)
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
        TestEntity
      );

      const actual = await new GetAllRequestBuilder(TestEntity).execute(
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
        TestEntity
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
        TestEntity
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
        TestEntity
      );
      const actual = await requestBuilder
        .select(TestEntity.ALL_FIELDS)
        .expand(TestEntity.TO_SINGLE_LINK, TestEntity.TO_MULTI_LINK)
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
        TestEntity
      );
      const actual = await requestBuilder
        .expand(
          TestEntity.TO_SINGLE_LINK,
          TestEntity.TO_MULTI_LINK.filter(
            TestEntityMultiLink.TO_MULTI_LINK_1.filter(
              any(TestEntityLvl2MultiLink.STRING_PROPERTY.notEquals('test'))
            )
          )
        )
        .execute(defaultDestination);
      expect(actual).toEqual([createTestEntity(testEntity)]);
    });
  });
});
