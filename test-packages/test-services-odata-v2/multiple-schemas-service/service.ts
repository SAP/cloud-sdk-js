/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { MultiSchemaTestEntityApi } from './MultiSchemaTestEntityApi';
import { BigNumber } from 'bignumber.js';
import { Moment } from 'moment';
import { defaultDeSerializers, DeSerializers, DefaultDeSerializers, mergeDefaultDeSerializersWith, Time } from '@sap-cloud-sdk/odata-v2';
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
DateTimeT,
TimeT>>  
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

    get multiSchemaTestEntityApi(): MultiSchemaTestEntityApi<DeSerializersT> { 
        return this.initApi('multiSchemaTestEntityApi', MultiSchemaTestEntityApi)    
      }
    
    
    
    
    
      get batch(): typeof batch {
        return batch;
      }

      get changeset(): typeof changeset {
        return changeset;
      }
  }
