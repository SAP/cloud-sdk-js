/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { ODataBatchChangeSetV2 } from '../../src/odata/v2';
import { TestEntity } from './test-services/v2/test-service';

export function createChangeSetWithFakeId(
  ...requests
): ODataBatchChangeSetV2<any> {
  return new ODataBatchChangeSetV2(requests, 'changesetId');
}

export function buildTestEntity(): TestEntity {
  return TestEntity.builder()
    .keyPropertyGuid('guidId')
    .keyPropertyString('strId')
    .int16Property(12)
    .doubleProperty(14.5)
    .build();
}
