/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { ODataBatchChangeSet } from '@sap-cloud-sdk/odata-v2';
import { TestEntity } from './test-services/v2/test-service';

export function createChangeSetWithFakeId(
  ...requests
): ODataBatchChangeSet<any> {
  return new ODataBatchChangeSet(requests, 'changeSet_boundary');
}

export function buildTestEntity(): TestEntity {
  return TestEntity.builder()
    .keyPropertyGuid('guidId')
    .keyPropertyString('strId')
    .int16Property(12)
    .doubleProperty(14.5)
    .build();
}
