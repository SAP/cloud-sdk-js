/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityMultiLink } from './TestEntityMultiLink';
import { TestEntityMultiLinkRequestBuilder } from './TestEntityMultiLinkRequestBuilder';
import { TestEntityLvl2MultiLink } from './TestEntityLvl2MultiLink';
import { TestEntityLvl2MultiLinkApi } from './TestEntityLvl2MultiLinkApi';
import { TestEntityLvl2SingleLink } from './TestEntityLvl2SingleLink';
import { TestEntityLvl2SingleLinkApi } from './TestEntityLvl2SingleLinkApi';
import { CustomField, defaultDeSerializers, DeSerializers, mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v4';
import { EdmTypeField, OrderableEdmTypeField, OneToManyLink, OneToOneLink, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder, Time } from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export class TestEntityMultiLinkApi<BinaryT = string,
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
      TestEntityMultiLink<
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
      /**
       * Static representation of the one-to-many navigation property [[toMultiLink1]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_MULTI_LINK_1: OneToManyLink<
            TestEntityMultiLink<DeSerializers<BinaryT,
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
      TimeOfDayT>>,
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
      TimeOfDayT>,
            TestEntityLvl2MultiLink<DeSerializers<BinaryT,
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
      TimeOfDayT>>
          >,
      /**
       * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_SINGLE_LINK: OneToOneLink<
            TestEntityMultiLink<DeSerializers<BinaryT,
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
      TimeOfDayT>>,
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
      TimeOfDayT>,
            TestEntityLvl2SingleLink<DeSerializers<BinaryT,
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
      TimeOfDayT>>
          >
    };

  _addNavigationProperties(
      linkedApis: [
        TestEntityLvl2MultiLinkApi<BinaryT,
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
        TimeOfDayT>,TestEntityLvl2SingleLinkApi<BinaryT,
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
      ]): this {
        this.navigationPropertyFields = {
          TO_MULTI_LINK_1: new OneToManyLink(
              'to_MultiLink1',
              this,
              linkedApis[0]
            ),
          TO_SINGLE_LINK: new OneToOneLink(
              'to_SingleLink',
              this,
              linkedApis[1]
            )
        };
        return this;
      }
  
  entityConstructor = TestEntityMultiLink;
  
  requestBuilder(): TestEntityMultiLinkRequestBuilder<
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
    return new TestEntityMultiLinkRequestBuilder(this);
  }
  
  entityBuilder(): EntityBuilderType<
    TestEntityMultiLink<
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
  TestEntityMultiLink<
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
    const fieldBuilder = new FieldBuilder(TestEntityMultiLink, this.deSerializers);
    return { 
    /**
 * Static representation of the [[stringProperty]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
STRING_PROPERTY: fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', true),
/**
 * Static representation of the [[booleanProperty]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
BOOLEAN_PROPERTY: fieldBuilder.buildEdmTypeField('BooleanProperty', 'Edm.Boolean', true),
/**
 * Static representation of the [[guidProperty]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
GUID_PROPERTY: fieldBuilder.buildEdmTypeField('GuidProperty', 'Edm.Guid', true),
/**
 * Static representation of the [[int16Property]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INT_16_PROPERTY: fieldBuilder.buildEdmTypeField('Int16Property', 'Edm.Int16', true),
/**
 * Static representation of the [[keyProperty]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
KEY_PROPERTY: fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false),
...this.navigationPropertyFields,
/**
 * 
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', TestEntityMultiLink) 
  };
  }
}
