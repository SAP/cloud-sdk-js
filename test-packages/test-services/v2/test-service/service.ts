import { serviceToken } from '@sap-cloud-sdk/connectivity';
import { Time } from '@sap-cloud-sdk/odata-common/internal';
import {
  defaultDeSerializers,
  DeSerializers,
  mergeDefaultDeSerializersWith
} from '@sap-cloud-sdk/odata-v2';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import { TestEntityMultiLinkApi } from '.';
import { TestEntityApi as TestEntityApiCtor } from './TestEntityApi';

export function TestService<
  BinaryT = string,
  BooleanT = boolean,
  ByteT = number,
  DecimalT = BigNumber,
  DoubleT = number,
  FloatT = number,
  Int16T = number,
  Int32T = number,
  Int64T = BigNumber,
  GuidT = string,
  SByteT = number,
  SingleT = number,
  StringT = string,
  AnyT = any,
  DateTimeT = moment.Moment,
  DateTimeOffsetT = moment.Moment,
  TimeT = Time
>(
  deSerializers: Partial<
    DeSerializers<
      BinaryT,
      BooleanT,
      ByteT,
      DecimalT,
      DoubleT,
      FloatT,
      Int16T,
      Int32T,
      Int64T,
      GuidT,
      SByteT,
      SingleT,
      StringT,
      AnyT,
      DateTimeT,
      DateTimeOffsetT,
      TimeT
    >
  > = defaultDeSerializers as any
) {
  const fullDeSerializers = mergeDefaultDeSerializersWith(deSerializers);
  return {
    //functionImports:
    TestEntityApi: new TestEntityApiCtor(fullDeSerializers),
    CustomerApi: new TestEntityApiCtor(fullDeSerializers),
    BusinessPartnerApi: new TestEntityApiCtor(fullDeSerializers)

    // nest-like module, for DI
  };
}

const c = {
  'Edm.String': {
    deserialize: (val: any): number => 3,
    serialize: (val: number): any => '3'
  }
};

const { TestEntityApi } = TestService(c);

// TestEntityApi.

new TestEntityApiCtor(c)
  .entityBuilder()
  .toMultiLink(new TestEntityMultiLinkApi(c))
  .build();

TestEntityApi(c).entityBuilder();
TestEntityApi().entityBuilder();

// Plan
// 1. update function imports
// 2. check complex types
// 3. finalize "new" fields, fieldbuilders, filter, etc.
// 20. nest-like modules for DI (retro topic)
