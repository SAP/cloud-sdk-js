/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  toBatchChangeSetV2,
  toBatchRetrieveBodyV2,
  toEtagHeaderValue,
  toRequestPayload
} from '../../src';
import { TestEntity } from '../test-util/test-services/v2/test-service';
import {
  buildTestEntity,
  createChangeSetWithFakeId
} from '../test-util/batch-test-util';

describe('batch request serializer', () => {
  let testEntity: TestEntity;

  beforeEach(() => {
    testEntity = buildTestEntity();
  });

  it('serializes getAll request', () => {
    expect(
      toBatchRetrieveBodyV2(TestEntity.requestBuilder().getAll())
    ).toMatchSnapshot();
  });

  it('serializes getAll request with custom headers', () => {
    expect(
      toBatchRetrieveBodyV2(
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
    expect(toBatchRetrieveBodyV2(getByKeyRequest)).toMatchSnapshot();
  });

  describe('toRequestPayload', () => {
    it('serializes create request', () => {
      const createRequest = TestEntity.requestBuilder().create(testEntity);
      expect(toRequestPayload(createRequest, 'testId')).toMatchSnapshot();
    });

    it('serializes update request', () => {
      const updateRequest = TestEntity.requestBuilder().update(testEntity);
      expect(toRequestPayload(updateRequest, 'testId')).toMatchSnapshot();
    });

    it('serializes update request using put', () => {
      const updateRequest = TestEntity.requestBuilder()
        .update(testEntity)
        .replaceWholeEntityWithPut();
      expect(toRequestPayload(updateRequest, 'testId')).toMatchSnapshot();
    });

    it('serializes delete request with entity', () => {
      const deleteRequest = TestEntity.requestBuilder().delete(testEntity);
      expect(toRequestPayload(deleteRequest, 'testId')).toMatchSnapshot();
    });

    it('serializes delete request with id', () => {
      const deleteRequest = TestEntity.requestBuilder().delete('test', 'test');
      expect(toRequestPayload(deleteRequest, 'testId')).toMatchSnapshot();
    });

    it('serializes delete request with eTag', () => {
      const deleteRequest = TestEntity.requestBuilder().delete(
        testEntity.setVersionIdentifier('eTag')
      );
      expect(toRequestPayload(deleteRequest, 'testId')).toMatchSnapshot();
    });
  });

  describe('toEtagHeaderValue', () => {
    it('does not retrieve eTag for update request without eTag', () => {
      const updateRequest = TestEntity.requestBuilder().update(testEntity);
      expect(toEtagHeaderValue(updateRequest)).toBeUndefined();
    });

    it('retrieves eTag for update request with eTag', () => {
      const updateRequest = TestEntity.requestBuilder().update(
        testEntity.setVersionIdentifier('eTag')
      );
      expect(toEtagHeaderValue(updateRequest)).toEqual('eTag');
    });

    it('retrieves wildcard eTag for update request when eTag is ignored', () => {
      const updateRequest = TestEntity.requestBuilder()
        .update(testEntity.setVersionIdentifier('eTag'))
        .ignoreVersionIdentifier();
      expect(toEtagHeaderValue(updateRequest)).toEqual('*');
    });

    it('does not retrieve eTag for delete request without eTag', () => {
      const deleteRequest = TestEntity.requestBuilder().delete(testEntity);
      expect(toEtagHeaderValue(deleteRequest)).toBeUndefined();
    });

    it('retrieves eTag for delete request with eTag', () => {
      const deleteRequest = TestEntity.requestBuilder().delete(
        testEntity.setVersionIdentifier('eTag')
      );
      expect(toEtagHeaderValue(deleteRequest)).toEqual('eTag');
    });

    it('retrieves wildcard eTag for delete request when eTag is ignored', () => {
      const deleteRequest = TestEntity.requestBuilder()
        .delete(testEntity)
        .ignoreVersionIdentifier();
      expect(toEtagHeaderValue(deleteRequest)).toEqual('*');
    });

    it('does not retrieve eTag for create request', () => {
      const createRequest = TestEntity.requestBuilder().create(testEntity);
      expect(toEtagHeaderValue(createRequest)).toBeUndefined();
    });
  });

  describe('toBatchChangeSetV2', () => {
    it('serializes change set with one operation', () => {
      const createRequest = TestEntity.requestBuilder().create(testEntity);
      expect(
        toBatchChangeSetV2(createChangeSetWithFakeId(createRequest))
      ).toMatchSnapshot();
    });

    it('serializes change set with multiple operations', () => {
      const updateRequest = TestEntity.requestBuilder().update(testEntity);
      const createRequest = TestEntity.requestBuilder().create(testEntity);
      expect(
        toBatchChangeSetV2(
          createChangeSetWithFakeId(updateRequest, createRequest)
        )
      ).toMatchSnapshot();
    });

    it('returns undefined for empty change set', () => {
      expect(toBatchChangeSetV2(createChangeSetWithFakeId())).toMatchSnapshot();
    });
  });
});
