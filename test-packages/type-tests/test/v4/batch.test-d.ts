import {
  batch,
  testService
} from '@sap-cloud-sdk/test-services-odata-v4/test-service';
import { ReadResponse, WriteResponses } from '@sap-cloud-sdk/odata-v4/internal';
import { expectType } from 'tsd';
import { BatchResponse } from '@sap-cloud-sdk/odata-v4';
import { TestEntity } from '@sap-cloud-sdk/test-services-odata-v4/test-service/TestEntity';
import {
  CustomDeSerializerV4,
  customTestDeSerializersV4,
  DefaultDeSerializersV4
} from '../duplicated-types';

const { testEntityApi } = testService();

expectType<() => ReadResponse<DefaultDeSerializersV4>>(
  (): ReadResponse => ({} as any)
);

async () => {
  const responses = await testService()
    .batch(testEntityApi.requestBuilder().getAll())
    .execute({} as any);
  expectType<BatchResponse<DefaultDeSerializersV4>[]>(responses);

  const response = responses[0];
  if (response.isSuccess()) {
    expectType<
      | ReadResponse<DefaultDeSerializersV4>
      | WriteResponses<DefaultDeSerializersV4>
    >(response);
  }

  if (response.isReadResponse()) {
    expectType<ReadResponse<DefaultDeSerializersV4>>(response);

    expectType<TestEntity<DefaultDeSerializersV4>[]>(
      response.as(testEntityApi)
    );
  }

  const responsesCustomDeserializer = await batch(
    testService(customTestDeSerializersV4)
      .testEntityApi.requestBuilder()
      .getAll()
  ).execute({} as any);
  expectType<BatchResponse<CustomDeSerializerV4>[]>(
    responsesCustomDeserializer
  );

  const responseCustomDeserializer = responsesCustomDeserializer[0];
  if (responseCustomDeserializer.isSuccess()) {
    expectType<
      ReadResponse<CustomDeSerializerV4> | WriteResponses<CustomDeSerializerV4>
    >(responseCustomDeserializer);
  }
  if (responseCustomDeserializer.isReadResponse()) {
    expectType<ReadResponse<CustomDeSerializerV4>>(responseCustomDeserializer);

    expectType<TestEntity<CustomDeSerializerV4>[]>(
      responseCustomDeserializer.as(
        testService(customTestDeSerializersV4).testEntityApi
      )
    );
  }
};
