/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityApi } from './TestEntityApi';
import { TestEntityWithMultipleKeysApi } from './TestEntityWithMultipleKeysApi';
import { TestEntityLinkApi } from './TestEntityLinkApi';
import { TestEntity50PropApi } from './TestEntity50PropApi';
import {
  concatStrings,
  getAll,
  getByKey,
  getByKeyWithMultipleKeys,
  returnCollection,
  returnInt,
  returnSapCloudSdk,
  ConcatStringsParameters,
  GetAllParameters,
  GetByKeyParameters,
  GetByKeyWithMultipleKeysParameters,
  ReturnCollectionParameters,
  ReturnIntParameters,
  ReturnSapCloudSdkParameters
} from './function-imports';
import {
  createTestEntityById,
  createTestEntityByIdReturnId,
  CreateTestEntityByIdParameters,
  CreateTestEntityByIdReturnIdParameters
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
    const api = this.initApi('testEntityApi', TestEntityApi);
    const linkedApis = [this.initApi('testEntityLinkApi', TestEntityLinkApi)];
    api._addNavigationProperties(linkedApis);
    return api;
  }

  get testEntityWithMultipleKeysApi(): TestEntityWithMultipleKeysApi<DeSerializersT> {
    return this.initApi(
      'testEntityWithMultipleKeysApi',
      TestEntityWithMultipleKeysApi
    );
  }

  get testEntityLinkApi(): TestEntityLinkApi<DeSerializersT> {
    return this.initApi('testEntityLinkApi', TestEntityLinkApi);
  }

  get testEntity50PropApi(): TestEntity50PropApi<DeSerializersT> {
    return this.initApi('testEntity50PropApi', TestEntity50PropApi);
  }

  get functionImports() {
    return {
      concatStrings: (parameter: ConcatStringsParameters<DeSerializersT>) =>
        concatStrings(parameter, this.deSerializers),
      getAll: (parameter: GetAllParameters<DeSerializersT>) =>
        getAll(parameter, this.deSerializers),
      getByKey: (parameter: GetByKeyParameters<DeSerializersT>) =>
        getByKey(parameter, this.deSerializers),
      getByKeyWithMultipleKeys: (
        parameter: GetByKeyWithMultipleKeysParameters<DeSerializersT>
      ) => getByKeyWithMultipleKeys(parameter, this.deSerializers),
      returnCollection: (
        parameter: ReturnCollectionParameters<DeSerializersT>
      ) => returnCollection(parameter, this.deSerializers),
      returnInt: (parameter: ReturnIntParameters<DeSerializersT>) =>
        returnInt(parameter, this.deSerializers),
      returnSapCloudSdk: (
        parameter: ReturnSapCloudSdkParameters<DeSerializersT>
      ) => returnSapCloudSdk(parameter, this.deSerializers)
    };
  }

  get actionImports() {
    return {
      createTestEntityById: (
        parameter: CreateTestEntityByIdParameters<DeSerializersT>
      ) => createTestEntityById(parameter, this.deSerializers),
      createTestEntityByIdReturnId: (
        parameter: CreateTestEntityByIdReturnIdParameters<DeSerializersT>
      ) => createTestEntityByIdReturnId(parameter, this.deSerializers)
    };
  }

  get batch(): typeof batch {
    return batch;
  }

  get changeset(): typeof changeset {
    return changeset;
  }
}
