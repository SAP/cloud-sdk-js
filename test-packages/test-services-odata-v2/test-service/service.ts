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
import { testFunctionImportNoReturnType, testFunctionImportEdmReturnType, testFunctionImportEdmReturnTypeCollection, testFunctionImportEntityReturnType, testFunctionImportEntityReturnTypeCollection, testFunctionImportSharedEntityReturnType, testFunctionImportSharedEntityReturnTypeCollection, testFunctionImportComplexReturnType, testFunctionImportUnsupportedEdmTypes, testFunctionImportComplexReturnTypeCollection, testFunctionImportGet, testFunctionImportPost, testFunctionImportMultipleParams, createTestComplexType, fContinue, TestFunctionImportNoReturnTypeParameters, TestFunctionImportEdmReturnTypeParameters, TestFunctionImportEdmReturnTypeCollectionParameters, TestFunctionImportEntityReturnTypeParameters, TestFunctionImportEntityReturnTypeCollectionParameters, TestFunctionImportSharedEntityReturnTypeParameters, TestFunctionImportSharedEntityReturnTypeCollectionParameters, TestFunctionImportComplexReturnTypeParameters, TestFunctionImportUnsupportedEdmTypesParameters, TestFunctionImportComplexReturnTypeCollectionParameters, TestFunctionImportGetParameters, TestFunctionImportPostParameters, TestFunctionImportMultipleParamsParameters, CreateTestComplexTypeParameters, FContinueParameters } from './function-imports';
import { BigNumber } from 'bignumber.js';
import { Moment } from 'moment';
import { defaultDeSerializers, DeSerializers, DefaultDeSerializers, mergeDefaultDeSerializersWith, Time } from '@sap-cloud-sdk/odata-v2';
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
DateTimeT = Moment,
TimeT = Time>(
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
DateTimeT,
TimeT>> = defaultDeSerializers as any
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
DateTimeT,
TimeT>>  
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
        this.initApi('testEntityOtherMultiLinkApi', TestEntityOtherMultiLinkApi),
        this.initApi('testEntitySingleLinkApi', TestEntitySingleLinkApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api    
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
        return this.initApi('testEntityLvl2MultiLinkApi', TestEntityLvl2MultiLinkApi)    
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
    
    get testEntityWithSharedEntityType1Api(): TestEntityWithSharedEntityType1Api<DeSerializersT> { 
        return this.initApi('testEntityWithSharedEntityType1Api', TestEntityWithSharedEntityType1Api)    
      }
    
    get testEntityWithSharedEntityType2Api(): TestEntityWithSharedEntityType2Api<DeSerializersT> { 
        return this.initApi('testEntityWithSharedEntityType2Api', TestEntityWithSharedEntityType2Api)    
      }
    
    get testEntityCircularLinkParentApi(): TestEntityCircularLinkParentApi<DeSerializersT> { 
        const api = this.initApi('testEntityCircularLinkParentApi', TestEntityCircularLinkParentApi);
          const linkedApis = [
            this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi)
          ];
          api._addNavigationProperties(linkedApis);
          return api    
      }
    
    get testEntityCircularLinkChildApi(): TestEntityCircularLinkChildApi<DeSerializersT> { 
        const api = this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi);
          const linkedApis = [
            this.initApi('testEntityCircularLinkChildApi', TestEntityCircularLinkChildApi)
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
    
    get caseTestApi(): CaseTestApi<DeSerializersT> { 
        return this.initApi('caseTestApi', CaseTestApi)    
      }
    
    get casetest_1Api(): Casetest_1Api<DeSerializersT> { 
        return this.initApi('casetest_1Api', Casetest_1Api)    
      }
    
      get functionImports( ) {
        return {testFunctionImportNoReturnType:(parameter:TestFunctionImportNoReturnTypeParameters<DeSerializersT>)=>testFunctionImportNoReturnType(parameter,this.deSerializers),testFunctionImportEdmReturnType:(parameter:TestFunctionImportEdmReturnTypeParameters<DeSerializersT>)=>testFunctionImportEdmReturnType(parameter,this.deSerializers),testFunctionImportEdmReturnTypeCollection:(parameter:TestFunctionImportEdmReturnTypeCollectionParameters<DeSerializersT>)=>testFunctionImportEdmReturnTypeCollection(parameter,this.deSerializers),testFunctionImportEntityReturnType:(parameter:TestFunctionImportEntityReturnTypeParameters<DeSerializersT>)=>testFunctionImportEntityReturnType(parameter,this.deSerializers),testFunctionImportEntityReturnTypeCollection:(parameter:TestFunctionImportEntityReturnTypeCollectionParameters<DeSerializersT>)=>testFunctionImportEntityReturnTypeCollection(parameter,this.deSerializers),testFunctionImportSharedEntityReturnType:(parameter:TestFunctionImportSharedEntityReturnTypeParameters<DeSerializersT>)=>testFunctionImportSharedEntityReturnType(parameter,this.deSerializers),testFunctionImportSharedEntityReturnTypeCollection:(parameter:TestFunctionImportSharedEntityReturnTypeCollectionParameters<DeSerializersT>)=>testFunctionImportSharedEntityReturnTypeCollection(parameter,this.deSerializers),testFunctionImportComplexReturnType:(parameter:TestFunctionImportComplexReturnTypeParameters<DeSerializersT>)=>testFunctionImportComplexReturnType(parameter,this.deSerializers),testFunctionImportUnsupportedEdmTypes:(parameter:TestFunctionImportUnsupportedEdmTypesParameters<DeSerializersT>)=>testFunctionImportUnsupportedEdmTypes(parameter,this.deSerializers),testFunctionImportComplexReturnTypeCollection:(parameter:TestFunctionImportComplexReturnTypeCollectionParameters<DeSerializersT>)=>testFunctionImportComplexReturnTypeCollection(parameter,this.deSerializers),testFunctionImportGet:(parameter:TestFunctionImportGetParameters<DeSerializersT>)=>testFunctionImportGet(parameter,this.deSerializers),testFunctionImportPost:(parameter:TestFunctionImportPostParameters<DeSerializersT>)=>testFunctionImportPost(parameter,this.deSerializers),testFunctionImportMultipleParams:(parameter:TestFunctionImportMultipleParamsParameters<DeSerializersT>)=>testFunctionImportMultipleParams(parameter,this.deSerializers),createTestComplexType:(parameter:CreateTestComplexTypeParameters<DeSerializersT>)=>createTestComplexType(parameter,this.deSerializers),fContinue:(parameter:FContinueParameters<DeSerializersT>)=>fContinue(parameter,this.deSerializers)}
      }
    
    
    
      get batch(): typeof batch {
        return batch;
      }

      get changeset(): typeof changeset {
        return changeset;
      }
  }
