/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { TestEntity } from '../test-util/test-services/v2/test-service';
import { serializeRequest } from '../../src/odata/common/request/odata-batch-request-util';
import { buildTestEntity } from '../test-util/batch-test-util';

const testEntity = buildTestEntity();
describe('batch util', () => {
  describe('serializeRequest', () => {
    it('serializes getAll request', () => {
      const getAllRequest = TestEntity.requestBuilder().getAll();
      expect(serializeRequest(getAllRequest)).toMatchInlineSnapshot(
        '"GET /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity?$format=json HTTP/1.1"'
      );
    });

    it('serializes request with custom query parameters and custom service path', () => {
      const getAllRequest = TestEntity.requestBuilder()
        .getAll()
        .withCustomQueryParameters({ key: 'value' })
        .withCustomServicePath('custom/service/path');
      expect(serializeRequest(getAllRequest)).toMatchInlineSnapshot(
        '"GET /custom/service/path/A_TestEntity?$format=json&key=value HTTP/1.1"'
      );
    });

    it('serializes getByKey request', () => {
      const getByKeyRequest = TestEntity.requestBuilder().getByKey(
        'testId',
        'test'
      );
      expect(serializeRequest(getByKeyRequest)).toMatchInlineSnapshot(
        "\"GET /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'testId',KeyPropertyString='test')?$format=json HTTP/1.1\""
      );
    });

    it('serializes create request', () => {
      const createRequest = TestEntity.requestBuilder().create(testEntity);
      expect(serializeRequest(createRequest)).toMatchInlineSnapshot(
        '"POST /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity HTTP/1.1"'
      );
    });

    it('serializes update request', () => {
      const updateRequest = TestEntity.requestBuilder().update(testEntity);
      expect(serializeRequest(updateRequest)).toMatchInlineSnapshot(
        "\"PATCH /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'guidId',KeyPropertyString='strId') HTTP/1.1\""
      );
    });

    it('serializes update request with PUT', () => {
      const updateRequest = TestEntity.requestBuilder()
        .update(testEntity)
        .replaceWholeEntityWithPut();
      expect(serializeRequest(updateRequest)).toMatchInlineSnapshot(
        "\"PUT /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'guidId',KeyPropertyString='strId') HTTP/1.1\""
      );
    });

    it('serializes delete request', () => {
      const updateRequest = TestEntity.requestBuilder().delete(testEntity);
      expect(serializeRequest(updateRequest)).toMatchInlineSnapshot(
        "\"DELETE /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'guidId',KeyPropertyString='strId') HTTP/1.1\""
      );
    });

    it('serializes delete request with keys', () => {
      const updateRequest = TestEntity.requestBuilder().delete(
        'guidId',
        'stringId'
      );
      expect(serializeRequest(updateRequest)).toMatchInlineSnapshot(
        "\"DELETE /sap/opu/odata/sap/API_TEST_SRV/A_TestEntity(KeyPropertyGuid=guid'guidId',KeyPropertyString='stringId') HTTP/1.1\""
      );
    });
  });
});
