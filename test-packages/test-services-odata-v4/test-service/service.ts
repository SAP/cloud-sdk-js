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
import { testFunctionImportEdmReturnType, testFunctionImportEdmReturnTypeCollection, testFunctionImportNullableTest, testFunctionImportEntityReturnType, testFunctionImportEntityReturnTypeCollection, testFunctionImportSharedEntityReturnType, testFunctionImportSharedEntityReturnTypeCollection, testFunctionImportComplexReturnType, testFunctionImportComplexReturnTypeCollection, testFunctionImportMultipleParams, testFunctionImportWithDifferentName, TestFunctionImportEdmReturnTypeParameters, TestFunctionImportEdmReturnTypeCollectionParameters, TestFunctionImportNullableTestParameters, TestFunctionImportEntityReturnTypeParameters, TestFunctionImportEntityReturnTypeCollectionParameters, TestFunctionImportSharedEntityReturnTypeParameters, TestFunctionImportSharedEntityReturnTypeCollectionParameters, TestFunctionImportComplexReturnTypeParameters, TestFunctionImportComplexReturnTypeCollectionParameters, TestFunctionImportMultipleParamsParameters, TestFunctionImportWithDifferentNameParameters } from './function-imports';
import { testActionImportNoParameterNoReturnType, testActionImportMultipleParameterComplexReturnType, testActionImportUnsupportedEdmTypes, testActionImportNoParameterEntityReturnType, testActionImportSharedEntityReturnType, testActionImportSharedEntityReturnTypeCollection, testActionImportNullableTest, TestActionImportNoParameterNoReturnTypeParameters, TestActionImportMultipleParameterComplexReturnTypeParameters, TestActionImportUnsupportedEdmTypesParameters, TestActionImportNoParameterEntityReturnTypeParameters, TestActionImportSharedEntityReturnTypeParameters, TestActionImportSharedEntityReturnTypeCollectionParameters, TestActionImportNullableTestParameters } from './action-imports';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
import { defaultDeSerializers, DeSerializers, DefaultDeSerializers, mergeDefaultDeSerializersWith, Time } from '@sap-cloud-sdk/odata-v4';
import { batch, changeset } from './BatchRequest';
  
  export function testService<BinaryT = string,
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
EnumT = any>(
  deSerializers: Partial<DeSerializers<BinaryT,
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
EnumT>> = defaultDeSerializers as any
  ):TestService<DeSerializers<BinaryT,
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
EnumT>>  
  {
  return new TestService(mergeDefaultDeSerializersWith(deSerializers))
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
          const linkedApis = [
            this.initApi('testEntityMultiLinkApi', TestEntityMultiLinkApi),
        this.initApi('testEntityMultiLinkApi', TestEntityMultiLinkApi),
        this.initApi('testEntitySingleLinkApi', TestEntitySingleLinkApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api    
      }
    
    get testEntityWithEnumKeyApi(): TestEntityWithEnumKeyApi<DeSerializersT> { 
        return this.initApi('testEntityWithEnumKeyApi', TestEntityWithEnumKeyApi)    
      }
    
    get testEntityWithSharedEntityType1Api(): TestEntityWithSharedEntityType1Api<DeSerializersT> { 
        return this.initApi('testEntityWithSharedEntityType1Api', TestEntityWithSharedEntityType1Api)    
      }
    
    get testEntityWithSharedEntityType2Api(): TestEntityWithSharedEntityType2Api<DeSerializersT> { 
        return this.initApi('testEntityWithSharedEntityType2Api', TestEntityWithSharedEntityType2Api)    
      }
    
    get testEntityMultiLinkApi(): TestEntityMultiLinkApi<DeSerializersT> { 
        const api = this.initApi('testEntityMultiLinkApi', TestEntityMultiLinkApi);
          const linkedApis = [
            this.initApi('testEntityLvl2MultiLinkApi', TestEntityLvl2MultiLinkApi),
        this.initApi('testEntityLvl2SingleLinkApi', TestEntityLvl2SingleLinkApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api    
      }
    
    get testEntityOtherMultiLinkApi(): TestEntityOtherMultiLinkApi<DeSerializersT> { 
        return this.initApi('testEntityOtherMultiLinkApi', TestEntityOtherMultiLinkApi)    
      }
    
    get testEntityLvl2MultiLinkApi(): TestEntityLvl2MultiLinkApi<DeSerializersT> { 
        const api = this.initApi('testEntityLvl2MultiLinkApi', TestEntityLvl2MultiLinkApi);
          const linkedApis = [
            this.initApi('testEntityLvl3MultiLinkApi', TestEntityLvl3MultiLinkApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api    
      }
    
    get testEntityLvl3MultiLinkApi(): TestEntityLvl3MultiLinkApi<DeSerializersT> { 
        return this.initApi('testEntityLvl3MultiLinkApi', TestEntityLvl3MultiLinkApi)    
      }
    
    get testEntitySingleLinkApi(): TestEntitySingleLinkApi<DeSerializersT> { 
        const api = this.initApi('testEntitySingleLinkApi', TestEntitySingleLinkApi);
          const linkedApis = [
            this.initApi('testEntityLvl2MultiLinkApi', TestEntityLvl2MultiLinkApi),
        this.initApi('testEntityLvl2SingleLinkApi', TestEntityLvl2SingleLinkApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api    
      }
    
    get testEntityLvl2SingleLinkApi(): TestEntityLvl2SingleLinkApi<DeSerializersT> { 
        return this.initApi('testEntityLvl2SingleLinkApi', TestEntityLvl2SingleLinkApi)    
      }
    
    get testEntityCircularLinkParentApi(): TestEntityCircularLinkParentApi<DeSerializersT> { 
        const api = this.initApi('testEntityCircularLinkParentApi', TestEntityCircularLinkParentApi);
          const linkedApis = [
            this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi),
        this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api    
      }
    
    get testEntityCircularLinkChildApi(): TestEntityCircularLinkChildApi<DeSerializersT> { 
        const api = this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi);
          const linkedApis = [
            this.initApi('testEntityCircularLinkParentApi', TestEntityCircularLinkParentApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api    
      }
    
    get testEntityEndsWithApi(): TestEntityEndsWithApi<DeSerializersT> { 
        return this.initApi('testEntityEndsWithApi', TestEntityEndsWithApi)    
      }
    
    get testEntityEndsWithSomethingElseApi(): TestEntityEndsWithSomethingElseApi<DeSerializersT> { 
        return this.initApi('testEntityEndsWithSomethingElseApi', TestEntityEndsWithSomethingElseApi)    
      }
    
      get functionImports( ) {
        return {testFunctionImportEdmReturnType:(parameter:TestFunctionImportEdmReturnTypeParameters<DeSerializersT>)=>testFunctionImportEdmReturnType(parameter,this.deSerializers),testFunctionImportEdmReturnTypeCollection:(parameter:TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>)=>testFunctionImportEdmReturnTypeCollection(parameter,this.deSerializers),testFunctionImportNullableTest:(parameter:TestFunctionImportNullableTestParameters<DeSerializersT>)=>testFunctionImportNullableTest(parameter,this.deSerializers),testFunctionImportEntityReturnType:(parameter:TestFunctionImportEntityReturnTypeParameters<DeSerializersT>)=>testFunctionImportEntityReturnType(parameter,this.deSerializers),testFunctionImportEntityReturnTypeCollection:(parameter:TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>)=>testFunctionImportEntityReturnTypeCollection(parameter,this.deSerializers),testFunctionImportSharedEntityReturnType:(parameter:TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>)=>testFunctionImportSharedEntityReturnType(parameter,this.deSerializers),testFunctionImportSharedEntityReturnTypeCollection:(parameter:TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>)=>testFunctionImportSharedEntityReturnTypeCollection(parameter,this.deSerializers),testFunctionImportComplexReturnType:(parameter:TestFunctionImportComplexReturnTypeParameters<DeSerializersT>)=>testFunctionImportComplexReturnType(parameter,this.deSerializers),testFunctionImportComplexReturnTypeCollection:(parameter:TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>)=>testFunctionImportComplexReturnTypeCollection(parameter,this.deSerializers),testFunctionImportMultipleParams:(parameter:TestFunctionImportMultipleParamsParameters<DeSerializersT>)=>testFunctionImportMultipleParams(parameter,this.deSerializers),testFunctionImportWithDifferentName:(parameter:TestFunctionImportWithDifferentNameParameters<DeSerializersT>)=>testFunctionImportWithDifferentName(parameter,this.deSerializers)}
      }
    
      get actionImports( ) {
        return {testActionImportNoParameterNoReturnType:(parameter:TestActionImportNoParameterNoReturnTypeParameters<DeSerializersT>)=>testActionImportNoParameterNoReturnType(parameter,this.deSerializers),testActionImportMultipleParameterComplexReturnType:(parameter:TestActionImportMultipleParameterComplexReturnTypeParameters<DeSerializersT>)=>testActionImportMultipleParameterComplexReturnType(parameter,this.deSerializers),testActionImportUnsupportedEdmTypes:(parameter:TestActionImportUnsupportedEdmTypesParameters<DeSerializersT>)=>testActionImportUnsupportedEdmTypes(parameter,this.deSerializers),testActionImportNoParameterEntityReturnType:(parameter:TestActionImportNoParameterEntityReturnTypeParameters<DeSerializersT>)=>testActionImportNoParameterEntityReturnType(parameter,this.deSerializers),testActionImportSharedEntityReturnType:(parameter:TestActionImportSharedEntityReturnTypeParameters<DeSerializersT>)=>testActionImportSharedEntityReturnType(parameter,this.deSerializers),testActionImportSharedEntityReturnTypeCollection:(parameter:TestActionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>)=>testActionImportSharedEntityReturnTypeCollection(parameter,this.deSerializers),testActionImportNullableTest:(parameter:TestActionImportNullableTestParameters<DeSerializersT>)=>testActionImportNullableTest(parameter,this.deSerializers)}
      }
    
      get batch(): typeof batch {
        return batch;
      }

      get changeset(): typeof changeset {
        return changeset;
      }
  }
