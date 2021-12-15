/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity4 } from './TestEntity4';
import { TestEntity4RequestBuilder } from './TestEntity4RequestBuilder';
import { CustomField, defaultDeSerializers, DeSerializers, mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v4';
import { EdmTypeField, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder, Time } from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export class TestEntity4Api<BinaryT = string,
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
TimeOfDayT = Time> implements 
    EntityApi<
      TestEntity4<
        DeSerializers<BinaryT,
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
TimeOfDayT>
      >, 
      DeSerializers<BinaryT,
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
TimeOfDayT>
    > {
  public deSerializers: DeSerializers<BinaryT,
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

  constructor(
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
TimeOfDayT>> = defaultDeSerializers as any) {
    this.deSerializers = mergeDefaultDeSerializersWith(deSerializers);
  }

  private navigationPropertyFields!: {
      
    };

  _addNavigationProperties(
      linkedApis: [
        
      ]): this {
        this.navigationPropertyFields = {
          
        };
        return this;
      }
  
  entityConstructor = TestEntity4;
  
  requestBuilder(): TestEntity4RequestBuilder<
    DeSerializers<BinaryT,
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
TimeOfDayT>
  > {
    return new TestEntity4RequestBuilder(this);
  }
  
  entityBuilder(): EntityBuilderType<
    TestEntity4<
      DeSerializers<BinaryT,
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
TimeOfDayT>
    >,
    DeSerializers<BinaryT,
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
TimeOfDayT>
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
  TestEntity4<
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
      TimeOfDayT
      >
    >,
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
    TimeOfDayT
    >,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    );
  }

  get schema() {
    const fieldBuilder = new FieldBuilder(TestEntity4, this.deSerializers);
    return { 
    /**
 * Static representation of the [[keyPropertyString]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
KEY_PROPERTY_STRING: fieldBuilder.buildEdmTypeField('KeyPropertyString', 'Edm.String', false),
/**
 * Static representation of the [[booleanProperty]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BOOLEAN_PROPERTY: fieldBuilder.buildEdmTypeField('BooleanProperty', 'Edm.Boolean', true),
...this.navigationPropertyFields,
/**
 * 
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', TestEntity4) 
  };
  }
}
