/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { getPayload } from '../../src';
import { TestEntity } from '../test-util/test-services/v2/test-service';
import {
  createChangeSetWithFakeId,
  buildTestEntity
} from '../test-util/batch-test-util';
import { ODataBatchRequestConfig } from '../../src/odata/common/request/odata-batch-request-config';

const testEntity = buildTestEntity();
describe('batch request builder', () => {
  describe('getPayload', () => {
    it('serializes payload for batch subrequests', () => {
      const payload = getPayload(
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
