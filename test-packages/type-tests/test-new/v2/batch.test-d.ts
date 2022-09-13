import {
  changeset as otherServiceChangeset,
  multipleSchemasService
} from '@sap-cloud-sdk/test-services-odata-v2/multiple-schemas-service/index';
import {
  batch,
  changeset as testEntityChangeset, TestEntity,
  testService
} from '@sap-cloud-sdk/test-services-odata-v2/test-service/index';
import {mergeDefaultDeSerializersWith, ReadResponse, WriteResponses} from '@sap-cloud-sdk/odata-v2/internal';
import {expectError, expectType} from "tsd";
import {BatchChangeSet} from "@sap-cloud-sdk/odata-common";
import {BatchResponse, DefaultDeSerializers, DeSerializers, ODataBatchRequestBuilder} from "@sap-cloud-sdk/odata-v2";
import BigNumber from "bignumber.js";
import {Time} from "@sap-cloud-sdk/odata-common/internal";

const { testEntityApi } = testService();
const { multiSchemaTestEntityApi } = multipleSchemasService();

export type AnyDeserializer = DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>

export type DefaultDeSerializerV2 = DeSerializers<
    string,
    boolean,
    number,
    BigNumber,
    number,
    number,
    number,
    number,
    BigNumber,
    string,
    number,
    number,
    string,
    any,
    moment.Moment,
    moment.Moment,
    Time
    >;

export type CustomDeSerializerV2 = DeSerializers<
    string,
    boolean,
    number,
    BigNumber,
    number,
    number,
    number,
    number,
    BigNumber,
    string,
    number,
    number,
    number,
    any,
    moment.Moment,
    moment.Moment,
    Time
    >;

export const customTestDeSerializers: CustomDeSerializerV2 =
    mergeDefaultDeSerializersWith(    {
      'Edm.String': {
        deserialize: () => 100,
        serialize: (value: number) => value.toString(),
        serializeToUri: (value: number, serialize) => `'URI(${serialize(value)})'`
      }});

const createTestEntity = testEntityApi
  .requestBuilder()
  .create(testEntityApi.entityBuilder().build());
const createTestEntityFromOtherService = multiSchemaTestEntityApi
  .requestBuilder()
  .create(multiSchemaTestEntityApi.entityBuilder().build());

const changeSetTestEntity = testEntityChangeset(createTestEntity);
expectType<BatchChangeSet<DefaultDeSerializerV2>>(changeSetTestEntity)

expectType<BatchChangeSet<DefaultDeSerializerV2>>(testEntityChangeset(createTestEntity, createTestEntity));

expectType<BatchChangeSet<DefaultDeSerializerV2>>(testEntityChangeset([createTestEntity, createTestEntity]));

expectType<BatchChangeSet<DefaultDeSerializerV2>>(otherServiceChangeset(createTestEntityFromOtherService));

// // $ExpectError
// TestEntityChangeset(createTestEntityFromOtherService);

// // $ExpectError
// TestEntityChangeset(createTestEntity, createTestEntityFromOtherService);

expectType<ODataBatchRequestBuilder<DefaultDeSerializerV2>>(batch(changeSetTestEntity, changeSetTestEntity));

expectType<ODataBatchRequestBuilder<DefaultDeSerializerV2>>(batch([changeSetTestEntity, changeSetTestEntity]));

// // $ExpectError
// Batch(changeSetTestEntity, changeSetOtherServiceTestEntity);

expectType<() => ReadResponse<DefaultDeSerializers>>((): ReadResponse => ({} as any));

async () => {
  // $ExpectType BatchResponse<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Time>>[]
  const responses = await testService()
    .batch(testEntityApi.requestBuilder().getAll())
    .execute({} as any);
  expectType<BatchResponse<DefaultDeSerializerV2>[]>(responses)

  const response = responses[0];
  if (response.isSuccess()) {
    expectType<ReadResponse<DefaultDeSerializerV2>|WriteResponses<DefaultDeSerializerV2>>(response);
  }
  if (response.isReadResponse()) {
    expectType<ReadResponse<DefaultDeSerializerV2>>(response);

    expectType<TestEntity<DefaultDeSerializerV2>[]>(response.as(testEntityApi));
  }

  // $ExpectType BatchResponse<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, number, any, Moment, Moment, Time>>[]
  const responsesCustomDeserializer = await batch(
    testService(customTestDeSerializers).testEntityApi.requestBuilder().getAll()
  ).execute({} as any);
  expectType<BatchResponse<CustomDeSerializerV2>[]>(responsesCustomDeserializer)

  const responseCustomDeserializer = responsesCustomDeserializer[0];
  if (responseCustomDeserializer.isSuccess()) {
    expectType<ReadResponse<CustomDeSerializerV2>|WriteResponses<CustomDeSerializerV2>>(responseCustomDeserializer);
  }
  if (responseCustomDeserializer.isReadResponse()) {
    expectType<ReadResponse<CustomDeSerializerV2>>(responseCustomDeserializer);

    expectType<TestEntity<CustomDeSerializerV2>[]>(responseCustomDeserializer.as(
      testService(customTestDeSerializers).testEntityApi
    ));
  }
};
