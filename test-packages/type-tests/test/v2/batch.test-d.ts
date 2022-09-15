import {
  changeset as otherServiceChangeset,
  multipleSchemasService
} from '@sap-cloud-sdk/test-services-odata-v2/multiple-schemas-service';
import {
  batch,
  changeset as testEntityChangeset,
  TestEntity,
  testService
} from '@sap-cloud-sdk/test-services-odata-v2/test-service';
import {
  mergeDefaultDeSerializersWith,
  ReadResponse,
  WriteResponses
} from '@sap-cloud-sdk/odata-v2/internal';
import { expectType } from 'tsd';
import { BatchChangeSet } from '@sap-cloud-sdk/odata-common';
import {
  BatchResponse,
  DefaultDeSerializers,
  ODataBatchRequestBuilder
} from '@sap-cloud-sdk/odata-v2';
import {
  CustomDeSerializerV2,
  DefaultDeSerializerV2
} from '../duplicated-types';

const { testEntityApi } = testService();
const { multiSchemaTestEntityApi } = multipleSchemasService();

export const customTestDeSerializers: CustomDeSerializerV2 =
  mergeDefaultDeSerializersWith({
    'Edm.String': {
      deserialize: () => 100,
      serialize: (value: number) => value.toString(),
      serializeToUri: (value: number, serialize) => `'URI(${serialize(value)})'`
    }
  });

const createTestEntity = testEntityApi
  .requestBuilder()
  .create(testEntityApi.entityBuilder().build());
const createTestEntityFromOtherService = multiSchemaTestEntityApi
  .requestBuilder()
  .create(multiSchemaTestEntityApi.entityBuilder().build());

const changeSetTestEntity = testEntityChangeset(createTestEntity);
expectType<BatchChangeSet<DefaultDeSerializerV2>>(changeSetTestEntity);

expectType<BatchChangeSet<DefaultDeSerializerV2>>(
  testEntityChangeset(createTestEntity, createTestEntity)
);

expectType<BatchChangeSet<DefaultDeSerializerV2>>(
  testEntityChangeset([createTestEntity, createTestEntity])
);

expectType<BatchChangeSet<DefaultDeSerializerV2>>(
  otherServiceChangeset(createTestEntityFromOtherService)
);

expectType<ODataBatchRequestBuilder<DefaultDeSerializerV2>>(
  batch(changeSetTestEntity, changeSetTestEntity)
);

expectType<ODataBatchRequestBuilder<DefaultDeSerializerV2>>(
  batch([changeSetTestEntity, changeSetTestEntity])
);

expectType<() => ReadResponse<DefaultDeSerializers>>(
  (): ReadResponse => ({} as any)
);

async () => {
  const responses = await testService()
    .batch(testEntityApi.requestBuilder().getAll())
    .execute({} as any);
  expectType<BatchResponse<DefaultDeSerializerV2>[]>(responses);

  const response = responses[0];
  if (response.isSuccess()) {
    expectType<
      | ReadResponse<DefaultDeSerializerV2>
      | WriteResponses<DefaultDeSerializerV2>
    >(response);
  }
  if (response.isReadResponse()) {
    expectType<ReadResponse<DefaultDeSerializerV2>>(response);

    expectType<TestEntity<DefaultDeSerializerV2>[]>(response.as(testEntityApi));
  }

  const responsesCustomDeserializer = await batch(
    testService(customTestDeSerializers).testEntityApi.requestBuilder().getAll()
  ).execute({} as any);
  expectType<BatchResponse<CustomDeSerializerV2>[]>(
    responsesCustomDeserializer
  );

  const responseCustomDeserializer = responsesCustomDeserializer[0];
  if (responseCustomDeserializer.isSuccess()) {
    expectType<
      ReadResponse<CustomDeSerializerV2> | WriteResponses<CustomDeSerializerV2>
    >(responseCustomDeserializer);
  }
  if (responseCustomDeserializer.isReadResponse()) {
    expectType<ReadResponse<CustomDeSerializerV2>>(responseCustomDeserializer);

    expectType<TestEntity<CustomDeSerializerV2>[]>(
      responseCustomDeserializer.as(
        testService(customTestDeSerializers).testEntityApi
      )
    );
  }
};
