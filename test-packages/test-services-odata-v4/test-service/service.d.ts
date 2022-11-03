/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityApi } from './TestEntityApi';
import { TestEntityWithEnumKeyApi } from './TestEntityWithEnumKeyApi';
import { TestEntityWithSharedEntityType1Api } from './TestEntityWithSharedEntityType1Api';
import { TestEntityWithSharedEntityType2Api } from './TestEntityWithSharedEntityType2Api';
import { TestEntityMultiLinkApi } from './TestEntityMultiLinkApi';
import { TestEntityOtherMultiLinkApi } from './TestEntityOtherMultiLinkApi';
import { TestEntityLvl2MultiLinkApi } from './TestEntityLvl2MultiLinkApi';
import { TestEntityLvl3MultiLinkApi } from './TestEntityLvl3MultiLinkApi';
import { TestEntitySingleLinkApi } from './TestEntitySingleLinkApi';
import { TestEntityLvl2SingleLinkApi } from './TestEntityLvl2SingleLinkApi';
import { TestEntityCircularLinkParentApi } from './TestEntityCircularLinkParentApi';
import { TestEntityCircularLinkChildApi } from './TestEntityCircularLinkChildApi';
import { TestEntityEndsWithApi } from './TestEntityEndsWithApi';
import { TestEntityEndsWithSomethingElseApi } from './TestEntityEndsWithSomethingElseApi';
import {
  TestFunctionImportEdmReturnTypeParameters,
  TestFunctionImportEdmReturnTypeCollectionParameters,
  TestFunctionImportNullableTestParameters,
  TestFunctionImportEntityReturnTypeParameters,
  TestFunctionImportEntityReturnTypeCollectionParameters,
  TestFunctionImportSharedEntityReturnTypeParameters,
  TestFunctionImportSharedEntityReturnTypeCollectionParameters,
  TestFunctionImportComplexReturnTypeParameters,
  TestFunctionImportComplexReturnTypeCollectionParameters,
  TestFunctionImportMultipleParamsParameters,
  TestFunctionImportWithDifferentNameParameters
} from './function-imports';
import {
  TestActionImportNoParameterNoReturnTypeParameters,
  TestActionImportMultipleParameterComplexReturnTypeParameters,
  TestActionImportUnsupportedEdmTypesParameters,
  TestActionImportNoParameterEntityReturnTypeParameters,
  TestActionImportSharedEntityReturnTypeParameters,
  TestActionImportSharedEntityReturnTypeCollectionParameters,
  TestActionImportNullableTestParameters
} from './action-imports';
import { BigNumber } from 'bignumber.js';
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
  get testEntityWithEnumKeyApi(): TestEntityWithEnumKeyApi<DeSerializersT>;
  get testEntityWithSharedEntityType1Api(): TestEntityWithSharedEntityType1Api<DeSerializersT>;
  get testEntityWithSharedEntityType2Api(): TestEntityWithSharedEntityType2Api<DeSerializersT>;
  get testEntityMultiLinkApi(): TestEntityMultiLinkApi<DeSerializersT>;
  get testEntityOtherMultiLinkApi(): TestEntityOtherMultiLinkApi<DeSerializersT>;
  get testEntityLvl2MultiLinkApi(): TestEntityLvl2MultiLinkApi<DeSerializersT>;
  get testEntityLvl3MultiLinkApi(): TestEntityLvl3MultiLinkApi<DeSerializersT>;
  get testEntitySingleLinkApi(): TestEntitySingleLinkApi<DeSerializersT>;
  get testEntityLvl2SingleLinkApi(): TestEntityLvl2SingleLinkApi<DeSerializersT>;
  get testEntityCircularLinkParentApi(): TestEntityCircularLinkParentApi<DeSerializersT>;
  get testEntityCircularLinkChildApi(): TestEntityCircularLinkChildApi<DeSerializersT>;
  get testEntityEndsWithApi(): TestEntityEndsWithApi<DeSerializersT>;
  get testEntityEndsWithSomethingElseApi(): TestEntityEndsWithSomethingElseApi<DeSerializersT>;
  get functionImports(): {
    testFunctionImportEdmReturnType: (
      parameter: TestFunctionImportEdmReturnTypeParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportEdmReturnTypeParameters<DeSerializersT>,
      boolean
    >;
    testFunctionImportEdmReturnTypeCollection: (
      parameter: TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>,
      string[]
    >;
    testFunctionImportNullableTest: (
      parameter: TestFunctionImportNullableTestParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportNullableTestParameters<DeSerializersT>,
      string[] | null
    >;
    testFunctionImportEntityReturnType: (
      parameter: TestFunctionImportEntityReturnTypeParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportEntityReturnTypeParameters<DeSerializersT>,
      import('./TestEntity').TestEntity<DefaultDeSerializers>
    >;
    testFunctionImportEntityReturnTypeCollection: (
      parameter: TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>,
      import('./TestEntity').TestEntity<DefaultDeSerializers>[]
    >;
    testFunctionImportSharedEntityReturnType: (
      parameter: TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>
    ) => Omit<
      import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
        DeSerializersT,
        TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>,
        never
      >,
      'execute'
    >;
    testFunctionImportSharedEntityReturnTypeCollection: (
      parameter: TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>
    ) => Omit<
      import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
        DeSerializersT,
        TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
        never
      >,
      'execute'
    >;
    testFunctionImportComplexReturnType: (
      parameter: TestFunctionImportComplexReturnTypeParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportComplexReturnTypeParameters<DeSerializersT>,
      import('./TestComplexType').TestComplexType<DefaultDeSerializers>
    >;
    testFunctionImportComplexReturnTypeCollection: (
      parameter: TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>,
      import('./TestComplexType').TestComplexType<DefaultDeSerializers>[]
    >;
    testFunctionImportMultipleParams: (
      parameter: TestFunctionImportMultipleParamsParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportMultipleParamsParameters<DeSerializersT>,
      boolean | null
    >;
    testFunctionImportWithDifferentName: (
      parameter: TestFunctionImportWithDifferentNameParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportWithDifferentNameParameters<DeSerializersT>,
      undefined
    >;
  };
  get actionImports(): {
    testActionImportNoParameterNoReturnType: (
      parameter: TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').ActionImportRequestBuilder<
      DeSerializersT,
      TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT>,
      undefined
    >;
    testActionImportMultipleParameterComplexReturnType: (
      parameter: TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').ActionImportRequestBuilder<
      DeSerializersT,
      TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT>,
      import('./TestComplexType').TestComplexType<DefaultDeSerializers>
    >;
    testActionImportUnsupportedEdmTypes: (
      parameter: TestActionImportUnsupportedEdmTypesParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').ActionImportRequestBuilder<
      DeSerializersT,
      TestActionImportUnsupportedEdmTypesParameters<DeSerializersT>,
      any
    >;
    testActionImportNoParameterEntityReturnType: (
      parameter: TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').ActionImportRequestBuilder<
      DeSerializersT,
      TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT>,
      import('./TestEntity').TestEntity<DefaultDeSerializers>
    >;
    testActionImportSharedEntityReturnType: (
      parameter: TestActionImportSharedEntityReturnTypeParameters<DeSerializersT>
    ) => Omit<
      import('@sap-cloud-sdk/odata-v4').ActionImportRequestBuilder<
        DeSerializersT,
        TestActionImportSharedEntityReturnTypeParameters<DeSerializersT>,
        never
      >,
      'execute'
    >;
    testActionImportSharedEntityReturnTypeCollection: (
      parameter: TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>
    ) => Omit<
      import('@sap-cloud-sdk/odata-v4').ActionImportRequestBuilder<
        DeSerializersT,
        TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
        never
      >,
      'execute'
    >;
    testActionImportNullableTest: (
      parameter: TestActionImportNullableTestParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v4').ActionImportRequestBuilder<
      DeSerializersT,
      TestActionImportNullableTestParameters<DeSerializersT>,
      import('./TestComplexType').TestComplexType<DefaultDeSerializers> | null
    >;
  };
  get batch(): typeof batch;
  get changeset(): typeof changeset;
}
export {};
//# sourceMappingURL=service.d.ts.map
