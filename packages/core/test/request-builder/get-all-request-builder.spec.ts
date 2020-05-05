/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { GetAllRequestBuilder, GetAllRequestBuilderODataV4 } from '../../src/request-builder';
import { muteLoggers } from '../test-util/mute-logger';
import {
  defaultDestination,
  mockDestinationsEnv,
  mockGetRequest, mockGetRequestODataV4,
  unmockDestinationsEnv
} from '../test-util/request-mocker';
import {
  createOriginalTestEntityData1,
  createOriginalTestEntityData2,
  createPeople,
  createPersonJson1, createPersonJson2,
  createTestEntity
} from '../test-util/test-data';
import { TestEntity } from '../test-util/test-services/test-service';
import { Person } from '../test-util/test-services/test-service-odata-v4';

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

  describe('odata v4', () => {
    it('returns all entities', async () => {
      const person1 = createPersonJson1();
      const person2 = createPersonJson2();

      mockGetRequestODataV4({
        responseBody: {  value: [person1, person2] }
      });

      const actual = await new GetAllRequestBuilderODataV4(Person).execute(defaultDestination);
      expect(actual).toEqual([
        createPeople(person1),
        createPeople(person2)
      ]);
    });
  });
});
