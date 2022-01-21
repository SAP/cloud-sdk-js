import {
  batch,
  testService
} from '@sap-cloud-sdk/test-services/v4/test-service';
import { ReadResponse } from '@sap-cloud-sdk/odata-v4/internal';
import { customTestDeSerializers } from '../../../../test-resources/test/test-util';

const { testEntityApi } = testService();

// $ExpectType () => ReadResponse<DefaultDeSerializers>
(): ReadResponse => ({} as any);

async () => {
  // $ExpectType BatchResponse<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>[]
  const responses = await testService()
    .batch(testEntityApi.requestBuilder().getAll())
    .execute({} as any);

  const response = responses[0];
  if (response.isSuccess()) {
    // $ExpectType ReadResponse<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>> | WriteResponses<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
    response;
  }

  if (response.isReadResponse()) {
    // $ExpectType ReadResponse<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
    response;

    // $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>[]
    response.as(testEntityApi);
  }

  // $ExpectType BatchResponse<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, number, any, Moment, Moment, Duration, Time, any>>[]
  const responsesCustomDeserializer = await batch(
    testService(customTestDeSerializers).testEntityApi.requestBuilder().getAll()
  ).execute({} as any);

  const responseCustomDeserializer = responsesCustomDeserializer[0];
  if (responseCustomDeserializer.isSuccess()) {
    // $ExpectType ReadResponse<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, number, any, Moment, Moment, Duration, Time, any>> | WriteResponses<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, number, any, Moment, Moment, Duration, Time, any>>
    responseCustomDeserializer;
  }
  if (responseCustomDeserializer.isReadResponse()) {
    // $ExpectType ReadResponse<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, number, any, Moment, Moment, Duration, Time, any>>
    responseCustomDeserializer;

    // $ExpectType TestEntity<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, number, any, Moment, Moment, Duration, Time, any>>[]
    responseCustomDeserializer.as(
      testService(customTestDeSerializers).testEntityApi
    );
  }
};
