import {
  batch,
  testService
} from '@sap-cloud-sdk/test-services/v4/test-service';
import { ReadResponse } from '@sap-cloud-sdk/odata-v4/internal';

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

  // Custom deserializer - first vaule in generic from string to number
  const custom = {
    'Edm.Binary': {
      deserialize: (): number => 1,
      serialize: (): string => '1',
      serializeToUri: () => ''
    }
  };

  // $ExpectType BatchResponse<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>[]
  const responsesCustomDeserializer = await batch(
    testService(custom).testEntityApi.requestBuilder().getAll()
  ).execute({} as any);

  const responseCustomDeserializer = responsesCustomDeserializer[0];
  if (responseCustomDeserializer.isSuccess()) {
    // $ExpectType ReadResponse<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>> | WriteResponses<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
    responseCustomDeserializer;
  }
  if (responseCustomDeserializer.isReadResponse()) {
    // $ExpectType ReadResponse<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
    responseCustomDeserializer;

    // $ExpectType TestEntity<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>[]
    responseCustomDeserializer.as(testService(custom).testEntityApi);
  }
};
