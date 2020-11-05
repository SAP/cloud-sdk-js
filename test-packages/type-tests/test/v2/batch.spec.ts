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

// $ExpectType ODataBatchChangeSetV2<WriteTestServiceRequestBuilder>
const changeSetTestEntity = testEntityChangeset(createTestEntity);

// $ExpectType ODataBatchChangeSetV2<WriteTestServiceRequestBuilder>
testEntityChangeset(createTestEntity, createTestEntity);

// $ExpectType ODataBatchChangeSetV2<WriteTestServiceRequestBuilder>
testEntityChangeset([createTestEntity, createTestEntity]);

// $ExpectType ODataBatchChangeSetV2<WriteMultipleSchemasServiceRequestBuilder>
const changeSetOtherServiceTestEntity = otherServiceChangeset(
  createTestEntityFromOtherService
);

// // $ExpectError
// TestEntityChangeset(createTestEntityFromOtherService);

// // $ExpectError
// TestEntityChangeset(createTestEntity, createTestEntityFromOtherService);

// $ExpectType ODataBatchRequestBuilderV2
batch(changeSetTestEntity, changeSetTestEntity);

// $ExpectType ODataBatchRequestBuilderV2
batch([changeSetTestEntity, changeSetTestEntity]);

// // $ExpectError
// Batch(changeSetTestEntity, changeSetOtherServiceTestEntity);
