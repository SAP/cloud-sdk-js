/* eslint-disable no-unused-vars */
import {
  changeset as otherServiceChangeset,
  multipleSchemasService
} from '@sap-cloud-sdk/test-services/v2/multiple-schemas-service';
import {
  batch,
  changeset as testEntityChangeset,
  testService
} from '@sap-cloud-sdk/test-services/v2/test-service';
import { ReadResponse } from '@sap-cloud-sdk/odata-v2/internal';

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

// $ExpectType ReadResponse<DefaultDeSerializers>
const responseWithDefault = {} as ReadResponse;

async function test() {
  // $ExpectType BatchResponse<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>[]
  const responses = await batch(
    testEntityApi.requestBuilder().getAll()
  ).execute({} as any);

  const response = responses[0];
  if (response.isSuccess()) {
    // $ExpectType ReadResponse<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>> | WriteResponses<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
    response;
    if (response.isReadResponse()) {
      // $ExpectType ReadResponse<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
      response;

      // $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>[]
      const result = response.as(testEntityApi);
    }
  }

  // Custom deserializer - first vaule in generic from string to number
  const custom = {
    'Edm.Binary': {
      deserialize: (val: string): number => 1,
      serialize: (val: number): string => '1',
      serializeToUri: () => ''
    }
  };

  // $ExpectType BatchResponse<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>[]
  const responsesCustomDeserializer = await batch(
    testService(custom).testEntityApi.requestBuilder().getAll()
  ).execute({} as any);

  const responseCustomDeserializer = responsesCustomDeserializer[0];
  if (responseCustomDeserializer.isSuccess()) {
    // $ExpectType ReadResponse<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>> | WriteResponses<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
    responseCustomDeserializer;
    if (responseCustomDeserializer.isReadResponse()) {
      // $ExpectType ReadResponse<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>
      responseCustomDeserializer;

      // $ExpectType TestEntity<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>[]
      const result = responseCustomDeserializer.as(
        testService(custom).testEntityApi
      );
    }
  }
}
