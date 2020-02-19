import { changeset as otherServiceChangeset, MultiSchemaTestEntity } from '@sap-cloud-sdk/test-services/multiple-schemas-service';
import { batch, changeset as testEntityChangeset, TestEntity } from '@sap-cloud-sdk/test-services/test-service';

const createTestEntity = TestEntity.requestBuilder().create(TestEntity.builder().build());
const createTestEntityFromOtherService = MultiSchemaTestEntity.requestBuilder().create(MultiSchemaTestEntity.builder().build());

// $ExpectType ODataBatchChangeSet<WriteTestServiceRequestBuilder>
const changeSetTestEntity = testEntityChangeset(createTestEntity);

// $ExpectType ODataBatchChangeSet<WriteMultipleSchemasServiceRequestBuilder>
const changeSetOtherServiceTestEntity = otherServiceChangeset(createTestEntityFromOtherService);

// // $ExpectError
// testEntityChangeset(createTestEntityFromOtherService);

// // $ExpectError
// testEntityChangeset(createTestEntity, createTestEntityFromOtherService);

// $ExpectType ODataBatchRequestBuilder
batch(changeSetTestEntity, changeSetTestEntity);

// // $ExpectError
// batch(changeSetTestEntity, changeSetOtherServiceTestEntity);
