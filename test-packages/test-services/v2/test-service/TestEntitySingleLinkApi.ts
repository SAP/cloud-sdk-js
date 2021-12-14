/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntitySingleLink } from './TestEntitySingleLink';
import { TestEntitySingleLinkRequestBuilder } from './TestEntitySingleLinkRequestBuilder';
import { TestEntityLvl2MultiLink } from './TestEntityLvl2MultiLink';
import { TestEntityLvl2MultiLinkApi } from './TestEntityLvl2MultiLinkApi';
import { TestEntityLvl2SingleLink } from './TestEntityLvl2SingleLink';
import { TestEntityLvl2SingleLinkApi } from './TestEntityLvl2SingleLinkApi';
import { CustomField, defaultDeSerializers, DeSerializers, mergeDefaultDeSerializersWith } from '@sap-cloud-sdk/odata-v2';
import { EdmTypeField, OrderableEdmTypeField, Link, OneToOneLink, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder, Time } from '@sap-cloud-sdk/odata-common/internal';
import { BigNumber } from 'bignumber.js';
import { Moment, Duration } from 'moment';
export class TestEntitySingleLinkApi<BinaryT = string,
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
TimeT = Time> implements 
    EntityApi<
      TestEntitySingleLink<
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
DateTimeT,
TimeT>
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
DateTimeT,
TimeT>
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
DateTimeT,
TimeT>;

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
DateTimeT,
TimeT>> = defaultDeSerializers as any) {
    this.deSerializers = mergeDefaultDeSerializersWith(deSerializers);
  }

  private navigationPropertyFields!: {
      /**
       * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_MULTI_LINK: Link<
            TestEntitySingleLink<DeSerializers<BinaryT,
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
      TimeT>>,
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
      DateTimeT,
      TimeT>,
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
      DateTimeT,
      TimeT>>
          >,
      /**
       * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_SINGLE_LINK: OneToOneLink<
            TestEntitySingleLink<DeSerializers<BinaryT,
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
      TimeT>>,
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
      DateTimeT,
      TimeT>,
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
      DateTimeT,
      TimeT>>
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
        DateTimeT,
        TimeT>,TestEntityLvl2SingleLinkApi<BinaryT,
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
        TimeT>
      ]): this {
        this.navigationPropertyFields = {
          TO_MULTI_LINK: new Link(
              'to_MultiLink',
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
  
  entityConstructor = TestEntitySingleLink;
  
  requestBuilder(): TestEntitySingleLinkRequestBuilder<
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
DateTimeT,
TimeT>
  > {
    return new TestEntitySingleLinkRequestBuilder(this);
  }
  
  entityBuilder(): EntityBuilderType<
    TestEntitySingleLink<
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
DateTimeT,
TimeT>
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
DateTimeT,
TimeT>
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
  TestEntitySingleLink<
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
    DateTimeT,
    TimeT
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
    const fieldBuilder = new FieldBuilder(TestEntitySingleLink, this.deSerializers);
    return { 
    /**
 * Static representation of the [[keyProperty]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
KEY_PROPERTY: fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false),
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
...this.navigationPropertyFields,
/**
 * 
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', TestEntitySingleLink) 
  };
  }
}
