/* eslint-disable no-unused-vars */
import {
  batch,
  testService
} from '@sap-cloud-sdk/test-services/v4/test-service';
import { ReadResponse } from '@sap-cloud-sdk/odata-v4/internal';

const { testEntityApi } = testService();

// $ExpectType ReadResponse<DefaultDeSerializers>
const responseWithDefault = {} as ReadResponse;

async function test() {
  // $ExpectType BatchResponse<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>[]
  const responses = await batch(
    testEntityApi.requestBuilder().getAll()
  ).execute({} as any);

  const response = responses[0];
  if (response.isSuccess()) {
    // $ExpectType ReadResponse<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>> | WriteResponses<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
    response;
    if (response.isReadResponse()) {
      // $ExpectType ReadResponse<DeSerializers<string, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
      response;
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

  // $ExpectType BatchResponse<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>[]
  const responsesCustomDeserializer = await batch(
    testService(custom).testEntityApi.requestBuilder().getAll()
  ).execute({} as any);

  const responseCustomDeserializer = responsesCustomDeserializer[0];
  if (responseCustomDeserializer.isSuccess()) {
    // $ExpectType ReadResponse<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>> | WriteResponses<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
    responseCustomDeserializer;
    if (responseCustomDeserializer.isReadResponse()) {
      // $ExpectType ReadResponse<DeSerializers<number, boolean, number, BigNumber, number, number, number, number, BigNumber, string, number, number, string, any, Moment, Moment, Duration, Time, any>>
      responseCustomDeserializer;
    }
  }
}
