/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityApi } from './TestEntityApi';
import { TestEntityMultiLinkApi } from './TestEntityMultiLinkApi';
import { TestEntityOtherMultiLinkApi } from './TestEntityOtherMultiLinkApi';
import { TestEntityLvl2MultiLinkApi } from './TestEntityLvl2MultiLinkApi';
import { TestEntitySingleLinkApi } from './TestEntitySingleLinkApi';
import { TestEntityLvl2SingleLinkApi } from './TestEntityLvl2SingleLinkApi';
import { TestEntityWithSharedEntityType1Api } from './TestEntityWithSharedEntityType1Api';
import { TestEntityWithSharedEntityType2Api } from './TestEntityWithSharedEntityType2Api';
import { TestEntityCircularLinkParentApi } from './TestEntityCircularLinkParentApi';
import { TestEntityCircularLinkChildApi } from './TestEntityCircularLinkChildApi';
import { TestEntityEndsWithApi } from './TestEntityEndsWithApi';
import { TestEntityEndsWithSomethingElseApi } from './TestEntityEndsWithSomethingElseApi';
import { CaseTestApi } from './CaseTestApi';
import { Casetest_1Api } from './Casetest_1Api';
import {
  TestFunctionImportNoReturnTypeParameters,
  TestFunctionImportEdmReturnTypeParameters,
  TestFunctionImportEdmReturnTypeCollectionParameters,
  TestFunctionImportEntityReturnTypeParameters,
  TestFunctionImportEntityReturnTypeCollectionParameters,
  TestFunctionImportSharedEntityReturnTypeParameters,
  TestFunctionImportSharedEntityReturnTypeCollectionParameters,
  TestFunctionImportComplexReturnTypeParameters,
  TestFunctionImportUnsupportedEdmTypesParameters,
  TestFunctionImportComplexReturnTypeCollectionParameters,
  TestFunctionImportGetParameters,
  TestFunctionImportPostParameters,
  TestFunctionImportMultipleParamsParameters,
  CreateTestComplexTypeParameters,
  FContinueParameters
} from './function-imports';
import { BigNumber } from 'bignumber.js';
import { Moment } from 'moment';
import {
  DeSerializers,
  DefaultDeSerializers,
  Time
} from '@sap-cloud-sdk/odata-v2';
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
  DateTimeT = Moment,
  TimeT = Time
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
      DateTimeT,
      TimeT
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
    DateTimeT,
    TimeT
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
  get testEntityMultiLinkApi(): TestEntityMultiLinkApi<DeSerializersT>;
  get testEntityOtherMultiLinkApi(): TestEntityOtherMultiLinkApi<DeSerializersT>;
  get testEntityLvl2MultiLinkApi(): TestEntityLvl2MultiLinkApi<DeSerializersT>;
  get testEntitySingleLinkApi(): TestEntitySingleLinkApi<DeSerializersT>;
  get testEntityLvl2SingleLinkApi(): TestEntityLvl2SingleLinkApi<DeSerializersT>;
  get testEntityWithSharedEntityType1Api(): TestEntityWithSharedEntityType1Api<DeSerializersT>;
  get testEntityWithSharedEntityType2Api(): TestEntityWithSharedEntityType2Api<DeSerializersT>;
  get testEntityCircularLinkParentApi(): TestEntityCircularLinkParentApi<DeSerializersT>;
  get testEntityCircularLinkChildApi(): TestEntityCircularLinkChildApi<DeSerializersT>;
  get testEntityEndsWithApi(): TestEntityEndsWithApi<DeSerializersT>;
  get testEntityEndsWithSomethingElseApi(): TestEntityEndsWithSomethingElseApi<DeSerializersT>;
  get caseTestApi(): CaseTestApi<DeSerializersT>;
  get casetest_1Api(): Casetest_1Api<DeSerializersT>;
  get functionImports(): {
    testFunctionImportNoReturnType: (
      parameter: TestFunctionImportNoReturnTypeParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportNoReturnTypeParameters<DeSerializersT>,
      undefined
    >;
    testFunctionImportEdmReturnType: (
      parameter: TestFunctionImportEdmReturnTypeParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportEdmReturnTypeParameters<DeSerializersT>,
      boolean
    >;
    testFunctionImportEdmReturnTypeCollection: (
      parameter: TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>,
      string[]
    >;
    testFunctionImportEntityReturnType: (
      parameter: TestFunctionImportEntityReturnTypeParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportEntityReturnTypeParameters<DeSerializersT>,
      import('./TestEntity').TestEntity<DefaultDeSerializers>
    >;
    testFunctionImportEntityReturnTypeCollection: (
      parameter: TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>,
      import('./TestEntity').TestEntity<DefaultDeSerializers>[]
    >;
    testFunctionImportSharedEntityReturnType: (
      parameter: TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>
    ) => Omit<
      import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
        DeSerializersT,
        TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>,
        never
      >,
      'execute'
    >;
    testFunctionImportSharedEntityReturnTypeCollection: (
      parameter: TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>
    ) => Omit<
      import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
        DeSerializersT,
        TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>,
        never
      >,
      'execute'
    >;
    testFunctionImportComplexReturnType: (
      parameter: TestFunctionImportComplexReturnTypeParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportComplexReturnTypeParameters<DeSerializersT>,
      import('./TestComplexType').TestComplexType<DefaultDeSerializers>
    >;
    testFunctionImportUnsupportedEdmTypes: (
      parameter: TestFunctionImportUnsupportedEdmTypesParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportUnsupportedEdmTypesParameters<DeSerializersT>,
      any
    >;
    testFunctionImportComplexReturnTypeCollection: (
      parameter: TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>,
      import('./TestComplexType').TestComplexType<DefaultDeSerializers>[]
    >;
    testFunctionImportGet: (
      parameter: TestFunctionImportGetParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportGetParameters<DeSerializersT>,
      boolean
    >;
    testFunctionImportPost: (
      parameter: TestFunctionImportPostParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportPostParameters<DeSerializersT>,
      boolean
    >;
    testFunctionImportMultipleParams: (
      parameter: TestFunctionImportMultipleParamsParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
      DeSerializersT,
      TestFunctionImportMultipleParamsParameters<DeSerializersT>,
      boolean
    >;
    createTestComplexType: (
      parameter: CreateTestComplexTypeParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
      DeSerializersT,
      CreateTestComplexTypeParameters<DeSerializersT>,
      import('./TestComplexType').TestComplexType<DefaultDeSerializers>
    >;
    fContinue: (
      parameter: FContinueParameters<DeSerializersT>
    ) => import('@sap-cloud-sdk/odata-v2').FunctionImportRequestBuilder<
      DeSerializersT,
      FContinueParameters<DeSerializersT>,
      boolean
    >;
  };
  get batch(): typeof batch;
  get changeset(): typeof changeset;
}
export {};
//# sourceMappingURL=service.d.ts.map
