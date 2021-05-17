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
const createTestEntityFromOtherService =
  MultiSchemaTestEntity.requestBuilder().create(
    MultiSchemaTestEntity.builder().build()
  );

// $ExpectType ODataBatchChangeSet<WriteTestServiceRequestBuilder>
const changeSetTestEntity = testEntityChangeset(createTestEntity);

// $ExpectType ODataBatchChangeSet<WriteTestServiceRequestBuilder>
testEntityChangeset(createTestEntity, createTestEntity);

// $ExpectType ODataBatchChangeSet<WriteTestServiceRequestBuilder>
testEntityChangeset([createTestEntity, createTestEntity]);

// $ExpectType ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>
otherServiceChangeset(createTestEntityFromOtherService);

// // $ExpectError
// TestEntityChangeset(createTestEntityFromOtherService);

// // $ExpectError
// TestEntityChangeset(createTestEntity, createTestEntityFromOtherService);

// $ExpectType ODataBatchRequestBuilder
batch(changeSetTestEntity, changeSetTestEntity);

// $ExpectType ODataBatchRequestBuilder
batch([changeSetTestEntity, changeSetTestEntity]);

// // $ExpectError
// Batch(changeSetTestEntity, changeSetOtherServiceTestEntity);
