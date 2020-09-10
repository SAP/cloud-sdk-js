/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { TestEntity } from '../test-util/test-services/v2/test-service';
import { getRequestLine } from '../../src/odata/common/request/odata-batch-request-util';
import { buildTestEntity } from '../test-util/batch-test-util';

const testEntity = buildTestEntity();
describe('batch util', () => {
  describe('getRequestLine', () => {
    it('serializes getAll request', () => {
      const getAllRequest = TestEntity.requestBuilder().getAll();
      expect(getRequestLine(getAllRequest)).toMatchInlineSnapshot(
        '"GET /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$format=json HTTP/1.1"'
      );
    });

    it('serializes getByKey request', () => {
      const getByKeyRequest = TestEntity.requestBuilder().getByKey(
        'testId',
        'test'
      );
      expect(getRequestLine(getByKeyRequest)).toMatchInlineSnapshot(
        "\"GET /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'testId',KeyPropertyString='test')?$format=json HTTP/1.1\""
      );
    });

    it('serializes create request', () => {
      const createRequest = TestEntity.requestBuilder().create(testEntity);
      expect(getRequestLine(createRequest)).toMatchInlineSnapshot(
        '"POST /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity HTTP/1.1"'
      );
    });

    it('serializes update request', () => {
      const updateRequest = TestEntity.requestBuilder().update(testEntity);
      expect(getRequestLine(updateRequest)).toMatchInlineSnapshot(
        "\"PATCH /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'guidId',KeyPropertyString='strId') HTTP/1.1\""
      );
    });

    it('serializes update request with PUT', () => {
      const updateRequest = TestEntity.requestBuilder()
        .update(testEntity)
        .replaceWholeEntityWithPut();
      expect(getRequestLine(updateRequest)).toMatchInlineSnapshot(
        "\"PUT /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'guidId',KeyPropertyString='strId') HTTP/1.1\""
      );
    });

    it('serializes delete request', () => {
      const updateRequest = TestEntity.requestBuilder().delete(testEntity);
      expect(getRequestLine(updateRequest)).toMatchInlineSnapshot(
        "\"DELETE /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'guidId',KeyPropertyString='strId') HTTP/1.1\""
      );
    });

    it('serializes delete request with keys', () => {
      const updateRequest = TestEntity.requestBuilder().delete(
        'guidId',
        'stringId'
      );
      expect(getRequestLine(updateRequest)).toMatchInlineSnapshot(
        "\"DELETE /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'guidId',KeyPropertyString='stringId') HTTP/1.1\""
      );
    });
  });
});
