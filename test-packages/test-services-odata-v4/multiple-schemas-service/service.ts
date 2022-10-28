/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity1Api } from './TestEntity1Api';
import { TestEntity2Api } from './TestEntity2Api';
import { TestEntity3Api } from './TestEntity3Api';
import { TestEntity4Api } from './TestEntity4Api';
import { testFunctionImportEntityReturnType1, testFunctionImportEntityReturnType2, TestFunctionImportEntityReturnType1Parameters, TestFunctionImportEntityReturnType2Parameters } from './function-imports';
import { testActionImportNoParameterComplexReturnType1, testActionImportNoParameterComplexReturnType2, TestActionImportNoParameterComplexReturnType1Parameters, TestActionImportNoParameterComplexReturnType2Parameters } from './action-imports';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
import { defaultDeSerializers, DeSerializers, DefaultDeSerializers, mergeDefaultDeSerializersWith, Time } from '@sap-cloud-sdk/odata-v4';
import { batch, changeset } from './BatchRequest';
  
  export function multipleSchemasService<BinaryT = string,
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
  ):MultipleSchemasService<DeSerializers<BinaryT,
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
  return new MultipleSchemasService(mergeDefaultDeSerializersWith(deSerializers))
  } 
class MultipleSchemasService<DeSerializersT extends DeSerializers = DefaultDeSerializers> {
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

    get testEntity1Api(): TestEntity1Api<DeSerializersT> { 
        return this.initApi('testEntity1Api', TestEntity1Api)    
      }
    
    get testEntity2Api(): TestEntity2Api<DeSerializersT> { 
        return this.initApi('testEntity2Api', TestEntity2Api)    
      }
    
    get testEntity3Api(): TestEntity3Api<DeSerializersT> { 
        return this.initApi('testEntity3Api', TestEntity3Api)    
      }
    
    get testEntity4Api(): TestEntity4Api<DeSerializersT> { 
        return this.initApi('testEntity4Api', TestEntity4Api)    
      }
    
      get functionImports( ) {
        return {testFunctionImportEntityReturnType1:(parameter:TestFunctionImportEntityReturnType1Parameters<DeSerializersT>)=>testFunctionImportEntityReturnType1(parameter,this.deSerializers),testFunctionImportEntityReturnType2:(parameter:TestFunctionImportEntityReturnType2Parameters<DeSerializersT>)=>testFunctionImportEntityReturnType2(parameter,this.deSerializers)}
      }
    
      get actionImports( ) {
        return {testActionImportNoParameterComplexReturnType1:(parameter:TestActionImportNoParameterComplexReturnType1Parameters<DeSerializersT>)=>testActionImportNoParameterComplexReturnType1(parameter,this.deSerializers),testActionImportNoParameterComplexReturnType2:(parameter:TestActionImportNoParameterComplexReturnType2Parameters<DeSerializersT>)=>testActionImportNoParameterComplexReturnType2(parameter,this.deSerializers)}
      }
    
      get batch(): typeof batch {
        return batch;
      }

      get changeset(): typeof changeset {
        return changeset;
      }
  }
