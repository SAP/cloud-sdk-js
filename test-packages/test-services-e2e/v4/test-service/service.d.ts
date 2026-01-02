/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityApi } from './TestEntityApi';
import { TestEntityWithMultipleKeysApi } from './TestEntityWithMultipleKeysApi';
import { TestEntityLinkApi } from './TestEntityLinkApi';
import { TestEntity50PropApi } from './TestEntity50PropApi';
import {
  ConcatStringsParameters,
  GetAllParameters,
  GetByKeyParameters,
  GetByKeyWithMultipleKeysParameters,
  ReturnCollectionParameters,
  ReturnIntParameters,
  ReturnSapCloudSdkParameters,
  CreateTestEntityByIdParameters,
  CreateTestEntityByIdReturnIdParameters
} from './operations';
import { Moment, Duration } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  Time
} from '@sap-cloud-sdk/odata-v4';
import { batch, changeset } from './BatchRequest';
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
  TimeOfDayT = Time,
  EnumT = any
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
      TimeOfDayT,
      EnumT
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
    TimeOfDayT,
    EnumT
  >
>;
declare class TestService<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  private apis;
  private deSerializers;
  constructor(deSerializers: DeSerializersT);
  private initApi;
  get testEntityApi(): TestEntityApi<DeSerializersT>;
  get testEntityWithMultipleKeysApi(): TestEntityWithMultipleKeysApi<DeSerializersT>;
  get testEntityLinkApi(): TestEntityLinkApi<DeSerializersT>;
  get testEntity50PropApi(): TestEntity50PropApi<DeSerializersT>;
  get operations(): {
    concatStrings: (
      parameter: ConcatStringsParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').OperationRequestBuilder<
      DeSerializersT,
      ConcatStringsParameters<DeSerializersT>,
      string
    >;
    getAll: (
      parameter: GetAllParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').OperationRequestBuilder<
      DeSerializersT,
      GetAllParameters<DeSerializersT>,
      import('./TestEntity').TestEntity<DefaultDeSerializers>[]
    >;
    getByKey: (
      parameter: GetByKeyParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').OperationRequestBuilder<
      DeSerializersT,
      GetByKeyParameters<DeSerializersT>,
      import('./TestEntity').TestEntity<DefaultDeSerializers>
    >;
    getByKeyWithMultipleKeys: (
      parameter: GetByKeyWithMultipleKeysParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').OperationRequestBuilder<
      DeSerializersT,
      GetByKeyWithMultipleKeysParameters<DeSerializersT>,
      import('./TestEntityWithMultipleKeys').TestEntityWithMultipleKeys<DefaultDeSerializers>
    >;
    returnCollection: (
      parameter: ReturnCollectionParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').OperationRequestBuilder<
      DeSerializersT,
      ReturnCollectionParameters<DeSerializersT>,
      number[]
    >;
    returnInt: (
      parameter: ReturnIntParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').OperationRequestBuilder<
      DeSerializersT,
      ReturnIntParameters<DeSerializersT>,
      number
    >;
    returnSapCloudSdk: (
      parameter: ReturnSapCloudSdkParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').OperationRequestBuilder<
      DeSerializersT,
      ReturnSapCloudSdkParameters<DeSerializersT>,
      string
    >;
    createTestEntityById: (
      parameter: CreateTestEntityByIdParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').OperationRequestBuilder<
      DeSerializersT,
      CreateTestEntityByIdParameters<DeSerializersT>,
      import('./TestEntity').TestEntity<DefaultDeSerializers>
    >;
    createTestEntityByIdReturnId: (
      parameter: CreateTestEntityByIdReturnIdParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').OperationRequestBuilder<
      DeSerializersT,
      CreateTestEntityByIdReturnIdParameters<DeSerializersT>,
      number
    >;
  };
  get batch(): typeof batch;
  get changeset(): typeof changeset;
}
export {};
