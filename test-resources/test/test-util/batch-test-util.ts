/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { TestEntity } from '@sap-cloud-sdk/test-services/v2/test-service';
import { TestEntityApi } from '@sap-cloud-sdk/test-services/v2/test-service/TestEntityApi';

export function buildTestEntity(): TestEntity {
  return new TestEntityApi()
    .entityBuilder()
    .keyPropertyGuid('guidId')
    .keyPropertyString('strId')
    .int16Property(12)
    .doubleProperty(14.5)
    .build();
}
