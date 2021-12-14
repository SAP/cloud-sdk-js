import {
  changeset as otherServiceChangeset,
  MultiSchemaTestEntityApi
} from '@sap-cloud-sdk/test-services/v2/multiple-schemas-service';
import {
  batch,
  changeset as testEntityChangeset,
  TestEntityApi
} from '@sap-cloud-sdk/test-services/v2/test-service';

const testEntityApi = new TestEntityApi();
const multiSchemaApi = new MultiSchemaTestEntityApi();

const createTestEntity = testEntityApi
  .requestBuilder()
  .create(testEntityApi.entityBuilder().build());
const createTestEntityFromOtherService = multiSchemaApi
  .requestBuilder()
  .create(multiSchemaApi.entityBuilder().build());

// $ExpectType BatchChangeSet<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
const changeSetTestEntity = testEntityChangeset(createTestEntity);

// $ExpectType BatchChangeSet<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
testEntityChangeset(createTestEntity, createTestEntity);

// $ExpectType BatchChangeSet<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
testEntityChangeset([createTestEntity, createTestEntity]);

// $ExpectType BatchChangeSet<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
otherServiceChangeset(createTestEntityFromOtherService);

// // $ExpectError
// TestEntityChangeset(createTestEntityFromOtherService);

// // $ExpectError
// TestEntityChangeset(createTestEntity, createTestEntityFromOtherService);

// $ExpectType ODataBatchRequestBuilder<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
batch(changeSetTestEntity, changeSetTestEntity);

// $ExpectType ODataBatchRequestBuilder<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
batch([changeSetTestEntity, changeSetTestEntity]);

// // $ExpectError
// Batch(changeSetTestEntity, changeSetOtherServiceTestEntity);
