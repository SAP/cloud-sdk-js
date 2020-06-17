/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import {
  changeset as otherServiceChangeset,
  MultiSchemaTestEntity
} from '@sap-cloud-sdk/test-services/v2/multiple-schemas-service';
import {
  batch,
  changeset as testEntityChangeset,
  TestEntity
} from '@sap-cloud-sdk/test-services/v2/test-service';

const createTestEntity = TestEntity.requestBuilder().create(
  TestEntity.builder().build()
);
const createTestEntityFromOtherService = MultiSchemaTestEntity.requestBuilder().create(
  MultiSchemaTestEntity.builder().build()
);

// $ExpectType ODataBatchChangeSet<WriteTestServiceRequestBuilder>
const changeSetTestEntity = testEntityChangeset(createTestEntity);

// $ExpectType ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>
const changeSetOtherServiceTestEntity = otherServiceChangeset(
  createTestEntityFromOtherService
);

// // $ExpectError
// TestEntityChangeset(createTestEntityFromOtherService);

// // $ExpectError
// TestEntityChangeset(createTestEntity, createTestEntityFromOtherService);

// $ExpectType ODataBatchRequestBuilder
batch(changeSetTestEntity, changeSetTestEntity);

// // $ExpectError
// Batch(changeSetTestEntity, changeSetOtherServiceTestEntity);
