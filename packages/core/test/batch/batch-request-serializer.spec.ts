/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { TestEntity } from '../test-util/test-services/v2/test-service';
import {
  buildTestEntity,
  createChangeSetWithFakeId
} from '../test-util/batch-test-util';
import {
  serializeBatchRequest,
  serializeChangeSet,
  serializeRequest
} from '../../src/odata/v2/batch-request-serializer';
import { ODataBatchRequestConfig } from '../../src/odata/common/request/odata-batch-request-config';

describe('batch request serializer', () => {
  let testEntity: TestEntity;

  beforeEach(() => {
    testEntity = buildTestEntity();
  });

  describe('serializeRequest', () => {
    it('serializes getAll request', () => {
      expect(
        serializeRequest(TestEntity.requestBuilder().getAll())
      ).toMatchSnapshot();
    });

    it('serializes getAll request with custom headers', () => {
      expect(
        serializeRequest(
          TestEntity.requestBuilder()
            .getAll()
            .withCustomHeaders({ 'Custom-Header': 'custom' })
        )
      ).toMatchSnapshot();
    });

    it('serializes getByKey request', () => {
      const getByKeyRequest = TestEntity.requestBuilder().getByKey(
        'testId',
        'test'
      );
      expect(serializeRequest(getByKeyRequest)).toMatchSnapshot();
    });

    it('serializes create request', () => {
      const createRequest = TestEntity.requestBuilder().create(testEntity);
      expect(serializeRequest(createRequest)).toMatchSnapshot();
    });

    it('serializes update request', () => {
      const updateRequest = TestEntity.requestBuilder().update(testEntity);
      expect(serializeRequest(updateRequest)).toMatchSnapshot();
    });

    it('serializes update request using put', () => {
      const updateRequest = TestEntity.requestBuilder()
        .update(testEntity)
        .replaceWholeEntityWithPut();
      expect(serializeRequest(updateRequest)).toMatchSnapshot();
    });

    it('serializes delete request with entity', () => {
      const deleteRequest = TestEntity.requestBuilder().delete(testEntity);
      expect(serializeRequest(deleteRequest)).toMatchSnapshot();
    });

    it('serializes delete request with id', () => {
      const deleteRequest = TestEntity.requestBuilder().delete('test', 'test');
      expect(serializeRequest(deleteRequest)).toMatchSnapshot();
    });

    it('serializes delete request with eTag', () => {
      const deleteRequest = TestEntity.requestBuilder().delete(
        testEntity.setVersionIdentifier('eTag')
      );
      expect(serializeRequest(deleteRequest)).toMatchSnapshot();
    });
  });

  describe('serializeChangeSet', () => {
    it('serializes change set with one operation', () => {
      const createRequest = TestEntity.requestBuilder().create(testEntity);
      expect(
        serializeChangeSet(createChangeSetWithFakeId(createRequest))
      ).toMatchSnapshot();
    });

    it('serializes change set with multiple operations', () => {
      const updateRequest = TestEntity.requestBuilder().update(testEntity);
      const createRequest = TestEntity.requestBuilder().create(testEntity);
      expect(
        serializeChangeSet(
          createChangeSetWithFakeId(updateRequest, createRequest)
        )
      ).toMatchSnapshot();
    });

    it('returns undefined for empty change set', () => {
      expect(serializeChangeSet(createChangeSetWithFakeId())).toBeUndefined();
    });
  });

  describe('serializeBatchRequest', () => {
    it('serializes payload for batch subrequests', () => {
      const payload = serializeBatchRequest(
        [
          createChangeSetWithFakeId(
            TestEntity.requestBuilder().create(testEntity)
          ),
          TestEntity.requestBuilder().getAll(),
          createChangeSetWithFakeId(
            TestEntity.requestBuilder().update(testEntity),
            TestEntity.requestBuilder().delete(testEntity)
          ),
          TestEntity.requestBuilder().getByKey('guidId', 'strId')
        ],
        { batchId: 'batchId' } as ODataBatchRequestConfig
      );

      expect(payload).toMatchSnapshot();
    });
  });
});
