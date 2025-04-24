/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity1Api } from './TestEntity1Api';
import { TestEntity2Api } from './TestEntity2Api';
import { TestEntity3Api } from './TestEntity3Api';
import { TestEntity4Api } from './TestEntity4Api';
import {
  TestFunctionImportEntityReturnType1Parameters,
  TestFunctionImportEntityReturnType2Parameters,
  TestActionImportNoParameterComplexReturnType1Parameters,
  TestActionImportNoParameterComplexReturnType2Parameters
} from './operations';
import { Moment, Duration } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  Time
} from '@sap-cloud-sdk/odata-v4';
import { batch, changeset } from './BatchRequest';
export declare function multipleSchemasService<
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
): MultipleSchemasService<
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
declare class MultipleSchemasService<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> {
  private apis;
  private deSerializers;
  constructor(deSerializers: DeSerializersT);
  private initApi;
  get testEntity1Api(): TestEntity1Api<DeSerializersT>;
  get testEntity2Api(): TestEntity2Api<DeSerializersT>;
  get testEntity3Api(): TestEntity3Api<DeSerializersT>;
  get testEntity4Api(): TestEntity4Api<DeSerializersT>;
  get operations(): {
    testFunctionImportEntityReturnType1: (
      parameter: TestFunctionImportEntityReturnType1Parameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').OperationRequestBuilder<
      DeSerializersT,
      TestFunctionImportEntityReturnType1Parameters<DeSerializersT>,
      import('./TestEntity1').TestEntity1<DefaultDeSerializers>
    >;
    testFunctionImportEntityReturnType2: (
      parameter: TestFunctionImportEntityReturnType2Parameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').OperationRequestBuilder<
      DeSerializersT,
      TestFunctionImportEntityReturnType2Parameters<DeSerializersT>,
      import('./TestEntity2').TestEntity2<DefaultDeSerializers>
    >;
    testActionImportNoParameterComplexReturnType1: (
      parameter: TestActionImportNoParameterComplexReturnType1Parameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').OperationRequestBuilder<
      DeSerializersT,
      TestActionImportNoParameterComplexReturnType1Parameters<DeSerializersT>,
      import('./TestComplexType1').TestComplexType1<DefaultDeSerializers>
    >;
    testActionImportNoParameterComplexReturnType2: (
      parameter: TestActionImportNoParameterComplexReturnType2Parameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').OperationRequestBuilder<
      DeSerializersT,
      TestActionImportNoParameterComplexReturnType2Parameters<DeSerializersT>,
      import('./TestComplexType2').TestComplexType2<DefaultDeSerializers>
    >;
  };
  get batch(): typeof batch;
  get changeset(): typeof changeset;
}
export {};
