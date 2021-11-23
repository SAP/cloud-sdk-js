/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { BatchChangeSet } from '@sap-cloud-sdk/odata-common/internal';
import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';

export function createChangeSetWithFakeId(
  ...requests
): BatchChangeSet<any> {
  return new BatchChangeSet(requests, 'changeSet_boundary');
}

export function buildTestEntity(): TestEntity {
  return TestEntity.builder()
    .keyPropertyGuid('guidId')
    .keyPropertyString('strId')
    .int16Property(12)
    .doubleProperty(14.5)
    .build();
}
