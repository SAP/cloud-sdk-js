/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
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
import { Time } from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
import { defaultDeSerializers, DeSerializers, mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v4';
  
export class TestService<BinaryT = string,
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
TimeOfDayT = Time> {
    private apis: Record<string, any> = {};
    private deSerializers: DeSerializers<BinaryT,
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
TimeOfDayT>;

    constructor(deSerializers: Partial<DeSerializers<BinaryT,
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
TimeOfDayT>> = defaultDeSerializers as any) {
      this.deSerializers = mergeDefaultDeSerializersWith(deSerializers);
    }

    private initApi(key: string, ctor: new (...args: any[]) => any): any {
      if (!this.apis[key]) {
        this.apis[key] = new ctor(this.deSerializers);
      }
      return this.apis[key];
    }

    get testEntityApi(): TestEntityApi<BinaryT,
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
    TimeOfDayT> {
        const api = this.initApi('testEntityApi', TestEntityApi);
        const linkedApis = [
            this.initApi('testEntityMultiLinkApi', TestEntityMultiLinkApi),
        this.initApi('testEntityMultiLinkApi', TestEntityMultiLinkApi),
        this.initApi('testEntitySingleLinkApi', TestEntitySingleLinkApi)
          ];
          api._addNavigationProperties(linkedApis);
        return api;
      }
    
    get testEntityWithEnumKeyApi(): TestEntityWithEnumKeyApi<BinaryT,
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
    TimeOfDayT> {
        const api = this.initApi('testEntityWithEnumKeyApi', TestEntityWithEnumKeyApi);
        
        return api;
      }
    
    get testEntityWithSharedEntityType1Api(): TestEntityWithSharedEntityType1Api<BinaryT,
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
    TimeOfDayT> {
        const api = this.initApi('testEntityWithSharedEntityType1Api', TestEntityWithSharedEntityType1Api);
        
        return api;
      }
    
    get testEntityWithSharedEntityType2Api(): TestEntityWithSharedEntityType2Api<BinaryT,
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
    TimeOfDayT> {
        const api = this.initApi('testEntityWithSharedEntityType2Api', TestEntityWithSharedEntityType2Api);
        
        return api;
      }
    
    get testEntityMultiLinkApi(): TestEntityMultiLinkApi<BinaryT,
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
    TimeOfDayT> {
        const api = this.initApi('testEntityMultiLinkApi', TestEntityMultiLinkApi);
        const linkedApis = [
            this.initApi('testEntityLvl2MultiLinkApi', TestEntityLvl2MultiLinkApi),
        this.initApi('testEntityLvl2SingleLinkApi', TestEntityLvl2SingleLinkApi)
          ];
          api._addNavigationProperties(linkedApis);
        return api;
      }
    
    get testEntityOtherMultiLinkApi(): TestEntityOtherMultiLinkApi<BinaryT,
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
    TimeOfDayT> {
        const api = this.initApi('testEntityOtherMultiLinkApi', TestEntityOtherMultiLinkApi);
        
        return api;
      }
    
    get testEntityLvl2MultiLinkApi(): TestEntityLvl2MultiLinkApi<BinaryT,
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
    TimeOfDayT> {
        const api = this.initApi('testEntityLvl2MultiLinkApi', TestEntityLvl2MultiLinkApi);
        const linkedApis = [
            this.initApi('testEntityLvl3MultiLinkApi', TestEntityLvl3MultiLinkApi)
          ];
          api._addNavigationProperties(linkedApis);
        return api;
      }
    
    get testEntityLvl3MultiLinkApi(): TestEntityLvl3MultiLinkApi<BinaryT,
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
    TimeOfDayT> {
        const api = this.initApi('testEntityLvl3MultiLinkApi', TestEntityLvl3MultiLinkApi);
        
        return api;
      }
    
    get testEntitySingleLinkApi(): TestEntitySingleLinkApi<BinaryT,
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
    TimeOfDayT> {
        const api = this.initApi('testEntitySingleLinkApi', TestEntitySingleLinkApi);
        const linkedApis = [
            this.initApi('testEntityLvl2MultiLinkApi', TestEntityLvl2MultiLinkApi),
        this.initApi('testEntityLvl2SingleLinkApi', TestEntityLvl2SingleLinkApi)
          ];
          api._addNavigationProperties(linkedApis);
        return api;
      }
    
    get testEntityLvl2SingleLinkApi(): TestEntityLvl2SingleLinkApi<BinaryT,
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
    TimeOfDayT> {
        const api = this.initApi('testEntityLvl2SingleLinkApi', TestEntityLvl2SingleLinkApi);
        
        return api;
      }
    
    get testEntityCircularLinkParentApi(): TestEntityCircularLinkParentApi<BinaryT,
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
    TimeOfDayT> {
        const api = this.initApi('testEntityCircularLinkParentApi', TestEntityCircularLinkParentApi);
        const linkedApis = [
            this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi),
        this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi)
          ];
          api._addNavigationProperties(linkedApis);
        return api;
      }
    
    get testEntityCircularLinkChildApi(): TestEntityCircularLinkChildApi<BinaryT,
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
    TimeOfDayT> {
        const api = this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi);
        const linkedApis = [
            this.initApi('testEntityCircularLinkParentApi', TestEntityCircularLinkParentApi)
          ];
          api._addNavigationProperties(linkedApis);
        return api;
      }
    
    get testEntityEndsWithApi(): TestEntityEndsWithApi<BinaryT,
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
    TimeOfDayT> {
        const api = this.initApi('testEntityEndsWithApi', TestEntityEndsWithApi);
        
        return api;
      }
    
    get testEntityEndsWithSomethingElseApi(): TestEntityEndsWithSomethingElseApi<BinaryT,
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
    TimeOfDayT> {
        const api = this.initApi('testEntityEndsWithSomethingElseApi', TestEntityEndsWithSomethingElseApi);
        
        return api;
      }
  }
