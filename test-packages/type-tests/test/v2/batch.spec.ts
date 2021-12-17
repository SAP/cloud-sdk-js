import {
  changeset as otherServiceChangeset,
  multipleSchemasService
} from '@sap-cloud-sdk/test-services/v2/multiple-schemas-service';
import {
  batch,
  changeset as testEntityChangeset,
  testService
} from '@sap-cloud-sdk/test-services/v2/test-service';

const { testEntityApi } = testService();
const { multiSchemaTestEntityApi } = multipleSchemasService();

const createTestEntity = testEntityApi
  .requestBuilder()
  .create(testEntityApi.entityBuilder().build());
const createTestEntityFromOtherService = multiSchemaTestEntityApi
  .requestBuilder()
  .create(multiSchemaTestEntityApi.entityBuilder().build());

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
