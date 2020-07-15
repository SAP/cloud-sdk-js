/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { GetAllRequestBuilder } from '../../src/odata/v4';
import { muteLoggers } from '../test-util/mute-logger';
import {
  defaultDestination,
  mockGetRequest,
  unmockDestinationsEnv
} from '../test-util/request-mocker';
import { TestEntity } from '../test-util/test-services/v4/test-service';
import {
  createOriginalTestEntityData1,
  createOriginalTestEntityData2,
  createOriginalTestEntityData3,
  createTestEntityV4
} from '../test-util/test-data';

describe('GetAllRequestBuilder', () => {
  let requestBuilder: GetAllRequestBuilder<TestEntity>;

  beforeAll(() => {
    muteLoggers('http-agent', 'destination-accessor', 'environment-accessor');
  });

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
        createTestEntityV4(testEntity1),
        createTestEntityV4(testEntity2)
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
      expect(actual).toEqual([createTestEntityV4(testEntity1)]);
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
      expect(actual).toEqual([createTestEntityV4(testEntity2)]);
    });

    it('should resolve when ALL_FIELDS is selected and links are expanded', async () => {
      const testEntity3 = createOriginalTestEntityData3();
      mockGetRequest(
        {
          query: {
            $select: '*',
            $expand: 'to_SingleLink,to_MultiLink'
          },
          responseBody: { value: [testEntity3] }
        },
        TestEntity
      );
      const actual = await requestBuilder
        .select(TestEntity.ALL_FIELDS)
        .expand(TestEntity.TO_SINGLE_LINK, TestEntity.TO_MULTI_LINK)
        .execute(defaultDestination);
      expect(actual).toEqual([createTestEntityV4(testEntity3)]);
    });
  });
});
