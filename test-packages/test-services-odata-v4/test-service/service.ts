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
import { TestEntityCircularLinkSelfApi } from './TestEntityCircularLinkSelfApi';
import { TestEntityEndsWithApi } from './TestEntityEndsWithApi';
import { TestEntityEndsWithSomethingElseApi } from './TestEntityEndsWithSomethingElseApi';
import {
  testFunctionImportEdmReturnType,
  testFunctionImportEdmReturnTypeCollection,
  testFunctionImportNullableTest,
  testFunctionImportEntityReturnType,
  testFunctionImportEntityReturnTypeCollection,
  testFunctionImportSharedEntityReturnType,
  testFunctionImportSharedEntityReturnTypeCollection,
  testFunctionImportComplexReturnType,
  testFunctionImportComplexReturnTypeCollection,
  testFunctionImportMultipleParams,
  testFunctionImportWithDifferentName,
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
  testActionImportNoParameterNoReturnType,
  testActionImportMultipleParameterComplexReturnType,
  testActionImportUnsupportedEdmTypes,
  testActionImportNoParameterEntityReturnType,
  testActionImportSharedEntityReturnType,
  testActionImportSharedEntityReturnTypeCollection,
  testActionImportNullableTest,
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
  defaultDeSerializers,
  DeSerializers,
  DefaultDeSerializers,
  mergeDefaultDeSerializersWith,
  Time
} from '@sap-cloud-sdk/odata-v4';
import { batch, changeset } from './BatchRequest';

export function testService<
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
      DateTimeOffsetT,
      DateT,
      DurationT,
      TimeOfDayT,
      EnumT
    >
  > = defaultDeSerializers as any
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
> {
  return new TestService(mergeDefaultDeSerializersWith(deSerializers));
}
class TestService<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
  private apis: Record<string, any> = {};
  private deSerializers: DeSerializersT;

  private _testEntityApi?: TestEntityApi<DeSerializersT> = undefined;
  private _testEntityWithEnumKeyApi?: TestEntityWithEnumKeyApi<DeSerializersT> =
    undefined;
  private _testEntityWithSharedEntityType1Api?: TestEntityWithSharedEntityType1Api<DeSerializersT> =
    undefined;
  private _testEntityWithSharedEntityType2Api?: TestEntityWithSharedEntityType2Api<DeSerializersT> =
    undefined;
  private _testEntityMultiLinkApi?: TestEntityMultiLinkApi<DeSerializersT> =
    undefined;
  private _testEntityOtherMultiLinkApi?: TestEntityOtherMultiLinkApi<DeSerializersT> =
    undefined;
  private _testEntityLvl2MultiLinkApi?: TestEntityLvl2MultiLinkApi<DeSerializersT> =
    undefined;
  private _testEntityLvl3MultiLinkApi?: TestEntityLvl3MultiLinkApi<DeSerializersT> =
    undefined;
  private _testEntitySingleLinkApi?: TestEntitySingleLinkApi<DeSerializersT> =
    undefined;
  private _testEntityLvl2SingleLinkApi?: TestEntityLvl2SingleLinkApi<DeSerializersT> =
    undefined;
  private _testEntityCircularLinkParentApi?: TestEntityCircularLinkParentApi<DeSerializersT> =
    undefined;
  private _testEntityCircularLinkChildApi?: TestEntityCircularLinkChildApi<DeSerializersT> =
    undefined;
  private _testEntityCircularLinkSelfApi?: TestEntityCircularLinkSelfApi<DeSerializersT> =
    undefined;
  private _testEntityEndsWithApi?: TestEntityEndsWithApi<DeSerializersT> =
    undefined;
  private _testEntityEndsWithSomethingElseApi?: TestEntityEndsWithSomethingElseApi<DeSerializersT> =
    undefined;

  constructor(deSerializers: DeSerializersT) {
    this.deSerializers = deSerializers;
  }

  private initApi(key: string, ctor: new (...args: any[]) => any): any {
    if (!this.apis[key]) {
      this.apis[key] = new ctor(this.deSerializers);
    }
    return this.apis[key];
  }

  get testEntityApi(): TestEntityApi<DeSerializersT> {
    if (!this._testEntityApi) {
      const api = this.initApi('testEntityApi', TestEntityApi);
      const linkedApis = [
        this.testEntityMultiLinkApi,
        this.testEntityMultiLinkApi,
        this.testEntitySingleLinkApi
      ];
      api._addNavigationProperties(linkedApis);
      this._testEntityApi = api;
    }
    return this._testEntityApi!;
  }

  get testEntityWithEnumKeyApi(): TestEntityWithEnumKeyApi<DeSerializersT> {
    if (!this._testEntityWithEnumKeyApi) {
      this._testEntityWithEnumKeyApi = this.initApi(
        'testEntityWithEnumKeyApi',
        TestEntityWithEnumKeyApi
      );
    }
    return this._testEntityWithEnumKeyApi!;
  }

  get testEntityWithSharedEntityType1Api(): TestEntityWithSharedEntityType1Api<DeSerializersT> {
    if (!this._testEntityWithSharedEntityType1Api) {
      this._testEntityWithSharedEntityType1Api = this.initApi(
        'testEntityWithSharedEntityType1Api',
        TestEntityWithSharedEntityType1Api
      );
    }
    return this._testEntityWithSharedEntityType1Api!;
  }

  get testEntityWithSharedEntityType2Api(): TestEntityWithSharedEntityType2Api<DeSerializersT> {
    if (!this._testEntityWithSharedEntityType2Api) {
      this._testEntityWithSharedEntityType2Api = this.initApi(
        'testEntityWithSharedEntityType2Api',
        TestEntityWithSharedEntityType2Api
      );
    }
    return this._testEntityWithSharedEntityType2Api!;
  }

  get testEntityMultiLinkApi(): TestEntityMultiLinkApi<DeSerializersT> {
    if (!this._testEntityMultiLinkApi) {
      const api = this.initApi(
        'testEntityMultiLinkApi',
        TestEntityMultiLinkApi
      );
      const linkedApis = [
        this.testEntityLvl2MultiLinkApi,
        this.testEntityLvl2SingleLinkApi
      ];
      api._addNavigationProperties(linkedApis);
      this._testEntityMultiLinkApi = api;
    }
    return this._testEntityMultiLinkApi!;
  }

  get testEntityOtherMultiLinkApi(): TestEntityOtherMultiLinkApi<DeSerializersT> {
    if (!this._testEntityOtherMultiLinkApi) {
      this._testEntityOtherMultiLinkApi = this.initApi(
        'testEntityOtherMultiLinkApi',
        TestEntityOtherMultiLinkApi
      );
    }
    return this._testEntityOtherMultiLinkApi!;
  }

  get testEntityLvl2MultiLinkApi(): TestEntityLvl2MultiLinkApi<DeSerializersT> {
    if (!this._testEntityLvl2MultiLinkApi) {
      const api = this.initApi(
        'testEntityLvl2MultiLinkApi',
        TestEntityLvl2MultiLinkApi
      );
      const linkedApis = [this.testEntityLvl3MultiLinkApi];
      api._addNavigationProperties(linkedApis);
      this._testEntityLvl2MultiLinkApi = api;
    }
    return this._testEntityLvl2MultiLinkApi!;
  }

  get testEntityLvl3MultiLinkApi(): TestEntityLvl3MultiLinkApi<DeSerializersT> {
    if (!this._testEntityLvl3MultiLinkApi) {
      this._testEntityLvl3MultiLinkApi = this.initApi(
        'testEntityLvl3MultiLinkApi',
        TestEntityLvl3MultiLinkApi
      );
    }
    return this._testEntityLvl3MultiLinkApi!;
  }

  get testEntitySingleLinkApi(): TestEntitySingleLinkApi<DeSerializersT> {
    if (!this._testEntitySingleLinkApi) {
      const api = this.initApi(
        'testEntitySingleLinkApi',
        TestEntitySingleLinkApi
      );
      const linkedApis = [
        this.testEntityLvl2MultiLinkApi,
        this.testEntityLvl2SingleLinkApi
      ];
      api._addNavigationProperties(linkedApis);
      this._testEntitySingleLinkApi = api;
    }
    return this._testEntitySingleLinkApi!;
  }

  get testEntityLvl2SingleLinkApi(): TestEntityLvl2SingleLinkApi<DeSerializersT> {
    if (!this._testEntityLvl2SingleLinkApi) {
      this._testEntityLvl2SingleLinkApi = this.initApi(
        'testEntityLvl2SingleLinkApi',
        TestEntityLvl2SingleLinkApi
      );
    }
    return this._testEntityLvl2SingleLinkApi!;
  }

  get testEntityCircularLinkParentApi(): TestEntityCircularLinkParentApi<DeSerializersT> {
    if (!this._testEntityCircularLinkParentApi) {
      const api = this.initApi(
        'testEntityCircularLinkParentApi',
        TestEntityCircularLinkParentApi
      );
      const linkedApis = [
        this.testEntityCircularLinkChildApi,
        this.testEntityCircularLinkChildApi
      ];
      api._addNavigationProperties(linkedApis);
      this._testEntityCircularLinkParentApi = api;
    }
    return this._testEntityCircularLinkParentApi!;
  }

  get testEntityCircularLinkChildApi(): TestEntityCircularLinkChildApi<DeSerializersT> {
    if (!this._testEntityCircularLinkChildApi) {
      const api = this.initApi(
        'testEntityCircularLinkChildApi',
        TestEntityCircularLinkChildApi
      );
      const linkedApis = [this.testEntityCircularLinkParentApi];
      api._addNavigationProperties(linkedApis);
      this._testEntityCircularLinkChildApi = api;
    }
    return this._testEntityCircularLinkChildApi!;
  }

  get testEntityCircularLinkSelfApi(): TestEntityCircularLinkSelfApi<DeSerializersT> {
    if (!this._testEntityCircularLinkSelfApi) {
      const api = this.initApi(
        'testEntityCircularLinkSelfApi',
        TestEntityCircularLinkSelfApi
      );
      const linkedApis = [this.testEntityCircularLinkSelfApi];
      api._addNavigationProperties(linkedApis);
      this._testEntityCircularLinkSelfApi = api;
    }
    return this._testEntityCircularLinkSelfApi!;
  }

  get testEntityEndsWithApi(): TestEntityEndsWithApi<DeSerializersT> {
    if (!this._testEntityEndsWithApi) {
      this._testEntityEndsWithApi = this.initApi(
        'testEntityEndsWithApi',
        TestEntityEndsWithApi
      );
    }
    return this._testEntityEndsWithApi!;
  }

  get testEntityEndsWithSomethingElseApi(): TestEntityEndsWithSomethingElseApi<DeSerializersT> {
    if (!this._testEntityEndsWithSomethingElseApi) {
      this._testEntityEndsWithSomethingElseApi = this.initApi(
        'testEntityEndsWithSomethingElseApi',
        TestEntityEndsWithSomethingElseApi
      );
    }
    return this._testEntityEndsWithSomethingElseApi!;
  }

  get functionImports() {
    return {
      testFunctionImportEdmReturnType: (
        parameter: TestFunctionImportEdmReturnTypeParameters<DeSerializersT>
      ) => testFunctionImportEdmReturnType(parameter, this.deSerializers),
      testFunctionImportEdmReturnTypeCollection: (
        parameter: TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>
      ) =>
        testFunctionImportEdmReturnTypeCollection(
          parameter,
          this.deSerializers
        ),
      testFunctionImportNullableTest: (
        parameter: TestFunctionImportNullableTestParameters<DeSerializersT>
      ) => testFunctionImportNullableTest(parameter, this.deSerializers),
      testFunctionImportEntityReturnType: (
        parameter: TestFunctionImportEntityReturnTypeParameters<DeSerializersT>
      ) => testFunctionImportEntityReturnType(parameter, this.deSerializers),
      testFunctionImportEntityReturnTypeCollection: (
        parameter: TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>
      ) =>
        testFunctionImportEntityReturnTypeCollection(
          parameter,
          this.deSerializers
        ),
      testFunctionImportSharedEntityReturnType: (
        parameter: TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>
      ) =>
        testFunctionImportSharedEntityReturnType(parameter, this.deSerializers),
      testFunctionImportSharedEntityReturnTypeCollection: (
        parameter: TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>
      ) =>
        testFunctionImportSharedEntityReturnTypeCollection(
          parameter,
          this.deSerializers
        ),
      testFunctionImportComplexReturnType: (
        parameter: TestFunctionImportComplexReturnTypeParameters<DeSerializersT>
      ) => testFunctionImportComplexReturnType(parameter, this.deSerializers),
      testFunctionImportComplexReturnTypeCollection: (
        parameter: TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>
      ) =>
        testFunctionImportComplexReturnTypeCollection(
          parameter,
          this.deSerializers
        ),
      testFunctionImportMultipleParams: (
        parameter: TestFunctionImportMultipleParamsParameters<DeSerializersT>
      ) => testFunctionImportMultipleParams(parameter, this.deSerializers),
      testFunctionImportWithDifferentName: (
        parameter: TestFunctionImportWithDifferentNameParameters<DeSerializersT>
      ) => testFunctionImportWithDifferentName(parameter, this.deSerializers)
    };
  }

  get actionImports() {
    return {
      testActionImportNoParameterNoReturnType: (
        parameter: TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT>
      ) =>
        testActionImportNoParameterNoReturnType(parameter, this.deSerializers),
      testActionImportMultipleParameterComplexReturnType: (
        parameter: TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT>
      ) =>
        testActionImportMultipleParameterComplexReturnType(
          parameter,
          this.deSerializers
        ),
      testActionImportUnsupportedEdmTypes: (
        parameter: TestActionImportUnsupportedEdmTypesParameters<DeSerializersT>
      ) => testActionImportUnsupportedEdmTypes(parameter, this.deSerializers),
      testActionImportNoParameterEntityReturnType: (
        parameter: TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT>
      ) =>
        testActionImportNoParameterEntityReturnType(
          parameter,
          this.deSerializers
        ),
      testActionImportSharedEntityReturnType: (
        parameter: TestActionImportSharedEntityReturnTypeParameters<DeSerializersT>
      ) =>
        testActionImportSharedEntityReturnType(parameter, this.deSerializers),
      testActionImportSharedEntityReturnTypeCollection: (
        parameter: TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>
      ) =>
        testActionImportSharedEntityReturnTypeCollection(
          parameter,
          this.deSerializers
        ),
      testActionImportNullableTest: (
        parameter: TestActionImportNullableTestParameters<DeSerializersT>
      ) => testActionImportNullableTest(parameter, this.deSerializers)
    };
  }

  get batch(): typeof batch {
    return batch;
  }

  get changeset(): typeof changeset {
    return changeset;
  }
}
