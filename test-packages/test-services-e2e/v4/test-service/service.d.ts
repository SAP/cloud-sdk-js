import { TestEntityApi } from './TestEntityApi';
import { TestEntityLinkApi } from './TestEntityLinkApi';
import {
  ConcatStringsParameters,
  GetAllParameters,
  GetByKeyParameters,
  ReturnCollectionParameters,
  ReturnIntParameters,
  ReturnSapCloudSdkParameters
} from './function-imports';
import {
  CreateTestEntityByIdParameters,
  CreateTestEntityByIdReturnIdParameters
} from './action-imports';
import { BigNumber } from 'bignumber.js';
import { batch } from './BatchRequest';
import { Moment, Duration } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  Time
} from '@sap-cloud-sdk/odata-v4';
export declare function testService<
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
  DateTimeOffsetT = Moment,
  DateT = Moment,
  DurationT = Duration,
  TimeOfDayT = Time
>(
  deSerializers?: Partial<
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
      DateTimeOffsetT,
      DateT,
      DurationT,
      TimeOfDayT
    >
  >
): TestService<
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
    DateTimeOffsetT,
    DateT,
    DurationT,
    TimeOfDayT
  >
>;
export declare class TestService<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  private apis;
  private deSerializers;
  constructor(deSerializers: DeSerializersT);
  private initApi;
  get testEntityApi(): TestEntityApi<DeSerializersT>;
  get testEntityLinkApi(): TestEntityLinkApi<DeSerializersT>;
  get functionImports(): {
    concatStrings: (
      parameter: ConcatStringsParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      ConcatStringsParameters<DeSerializersT>,
      string
    >;
    getAll: (
      parameter: GetAllParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      GetAllParameters<DeSerializersT>,
      import('./TestEntity').TestEntity<DefaultDeSerializers>[]
    >;
    getByKey: (
      parameter: GetByKeyParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      GetByKeyParameters<DeSerializersT>,
      import('./TestEntity').TestEntity<DefaultDeSerializers>
    >;
    returnCollection: (
      parameter: ReturnCollectionParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      ReturnCollectionParameters<DeSerializersT>,
      number[]
    >;
    returnInt: (
      parameter: ReturnIntParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      ReturnIntParameters<DeSerializersT>,
      number
    >;
    returnSapCloudSdk: (
      parameter: ReturnSapCloudSdkParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      ReturnSapCloudSdkParameters<DeSerializersT>,
      string
    >;
  };
  get actionImports(): {
    createTestEntityById: (
      parameter: CreateTestEntityByIdParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').ActionImportRequestBuilder<
      DeSerializersT,
      CreateTestEntityByIdParameters<DeSerializersT>,
      import('./TestEntity').TestEntity<DefaultDeSerializers>
    >;
    createTestEntityByIdReturnId: (
      parameter: CreateTestEntityByIdReturnIdParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').ActionImportRequestBuilder<
      DeSerializersT,
      CreateTestEntityByIdReturnIdParameters<DeSerializersT>,
      number
    >;
  };
  get batch(): typeof batch;
}
//# sourceMappingURL=service.d.ts.map
