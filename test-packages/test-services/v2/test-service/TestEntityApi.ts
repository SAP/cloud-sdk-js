/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  CustomField,
  defaultDeSerializers,
  DeSerializers,
  Entity,
  mergeDefaultDeSerializersWith
} from '@sap-cloud-sdk/odata-v2';
import {
  entityBuilder,
  AllFields,
  EntityApi,
  EntityBuilderType,
  FieldBuilder,
  Link,
  Time
} from '@sap-cloud-sdk/odata-common/internal';
import { TestEntity } from './TestEntity';
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { TestComplexTypeField } from './TestComplexType';
import { TestEntityMultiLink } from './TestEntityMultiLink';
import { BigNumber } from 'bignumber.js';
import moment from 'moment';
import { TestEntityMultiLinkApi } from '.';

export class TestEntityApi<
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
  DateTimeT = moment.Moment,
  DateTimeOffsetT = moment.Moment,
  TimeT = Time
> implements
    EntityApi<
      TestEntity<
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
          DateTimeT,
          DateTimeOffsetT,
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
        DateTimeT,
        DateTimeOffsetT,
        TimeT
      >
    >
{
  private fieldBuilder;
  public deSerializers: DeSerializers<
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
    DateTimeT,
    DateTimeOffsetT,
    TimeT
  >;
  public schema;

  constructor(
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
        DateTimeT,
        DateTimeOffsetT,
        TimeT
      >
    > = defaultDeSerializers as any
  ) {
    this.deSerializers = mergeDefaultDeSerializersWith(deSerializers);
    this.fieldBuilder = new FieldBuilder(TestEntity, this.deSerializers);

    this.schema = {
      /**
       * Static representation of the [[keyPropertyGuid]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      KEY_PROPERTY_GUID: this.fieldBuilder.buildEdmTypeField(
        'KeyPropertyGuid',
        'Edm.Guid',
        false
      ),
      /**
       * Static representation of the [[keyPropertyString]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      KEY_PROPERTY_STRING: this.fieldBuilder.buildEdmTypeField(
        'KeyPropertyString',
        'Edm.String',
        false
      ),
      /**
       * Static representation of the [[stringProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      STRING_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'StringProperty',
        'Edm.String',
        true
      ),
      /**
       * Static representation of the [[booleanProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      BOOLEAN_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'BooleanProperty',
        'Edm.Boolean',
        true
      ),
      /**
       * Static representation of the [[guidProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      GUID_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'GuidProperty',
        'Edm.Guid',
        true
      ),
      /**
       * Static representation of the [[int16Property]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      INT_16_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'Int16Property',
        'Edm.Int16',
        true
      ),
      /**
       * Static representation of the [[int32Property]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      INT_32_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'Int32Property',
        'Edm.Int32',
        true
      ),
      /**
       * Static representation of the [[int64Property]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      INT_64_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'Int64Property',
        'Edm.Int64',
        true
      ),
      /**
       * Static representation of the [[decimalProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      DECIMAL_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'DecimalProperty',
        'Edm.Decimal',
        true
      ),
      /**
       * Static representation of the [[singleProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      SINGLE_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'SingleProperty',
        'Edm.Single',
        true
      ),
      /**
       * Static representation of the [[doubleProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      DOUBLE_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'DoubleProperty',
        'Edm.Double',
        true
      ),
      /**
       * Static representation of the [[floatProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      FLOAT_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'FloatProperty',
        'Edm.Float',
        true
      ),
      /**
       * Static representation of the [[timeProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TIME_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'TimeProperty',
        'Edm.Time',
        true
      ),
      /**
       * Static representation of the [[dateTimeProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      DATE_TIME_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'DateTimeProperty',
        'Edm.DateTime',
        true
      ),
      /**
       * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      DATE_TIME_OFF_SET_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'DateTimeOffSetProperty',
        'Edm.DateTimeOffset',
        true
      ),
      /**
       * Static representation of the [[byteProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      BYTE_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'ByteProperty',
        'Edm.Byte',
        true
      ),
      /**
       * Static representation of the [[sByteProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      S_BYTE_PROPERTY: this.fieldBuilder.buildEdmTypeField(
        'SByteProperty',
        'Edm.SByte',
        true
      ),
      /**
       * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      SOMETHING_THE_SDK_DOES_NOT_SUPPORT: this.fieldBuilder.buildEdmTypeField(
        'SomethingTheSDKDoesNotSupport',
        'Edm.Any',
        true
      ),
      /**
       * Static representation of the [[complexTypeProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      COMPLEX_TYPE_PROPERTY: this.fieldBuilder.buildComplexTypeField(
        'ComplexTypeProperty',
        TestComplexTypeField,
        true
      ),
      /**
       * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_MULTI_LINK: new Link(
        'to_MultiLink',
        this,
        new TestEntityMultiLinkApi(this.deSerializers) as any
      )
      // as Link<
      //   TestEntity,
      //   DeSerializers<
      //     BinaryT,
      //     BooleanT,
      //     ByteT,
      //     DecimalT,
      //     DoubleT,
      //     FloatT,
      //     Int16T,
      //     Int32T,
      //     Int64T,
      //     GuidT,
      //     SByteT,
      //     SingleT,
      //     StringT,
      //     AnyT,
      //     DateTimeT,
      //     DateTimeOffsetT,
      //     TimeT
      //   >,
      //   TestEntityMultiLink
      // >,
      ,
      // /**
      //  * Static representation of the one-to-many navigation property [[toOtherMultiLink]] for query construction.
      //  * Use to reference this property in query operations such as 'select' in the fluent request API.
      //  */
      // TO_OTHER_MULTI_LINK: new Link(
      //   'to_OtherMultiLink',
      //   TestEntity,
      //   TestEntityOtherMultiLink
      // ) as Link<TestEntity, TestEntityOtherMultiLink>,
      // /**
      //  * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
      //  * Use to reference this property in query operations such as 'select' in the fluent request API.
      //  */
      // TO_SINGLE_LINK: new OneToOneLink(
      //   'to_SingleLink',
      //   TestEntity,
      //   TestEntitySingleLink
      // ) as OneToOneLink<TestEntity, TestEntitySingleLink>

      /**
       * All fields selector.
       */
      ALL_FIELDS: new AllFields('*', TestEntity) as AllFields<TestEntity>
      // /**
      //  * All key fields of the TestEntity entity.
      //  */
      // _keyFields: [
      //   TestEntity.KEY_PROPERTY_GUID,
      //   TestEntity.KEY_PROPERTY_STRING
      // ] as Array<Field<TestEntity, boolean, boolean>>,
      // /**
      //  * Mapping of all key field names to the respective static field property TestEntity.
      //  */
      // _keys: TestEntity._keyFields.reduce(
      //   (
      //     acc: { [keys: string]: Field<TestEntity, boolean, boolean> },
      //     field: Field<TestEntity, boolean, boolean>
      //   ) => {
      //     acc[field._fieldName] = field;
      //     return acc;
      //   },
      //   {}
      // ) as { [keys: string]: Field<TestEntity, boolean, boolean> }
    };
  }

  entityConstructor = TestEntity;

  requestBuilder(): TestEntityRequestBuilder<
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
      DateTimeT,
      DateTimeOffsetT,
      TimeT
    >
  > {
    return new TestEntityRequestBuilder(this);
  }

  entityBuilder(): EntityBuilderType<
    TestEntity<
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
        DateTimeT,
        DateTimeOffsetT,
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
      DateTimeT,
      DateTimeOffsetT,
      TimeT
    >
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    TestEntity<
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
        DateTimeT,
        DateTimeOffsetT,
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
      DateTimeT,
      DateTimeOffsetT,
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
}

// const c = {
//   'Edm.String': {
//     deserialize: (val: any): number => 3,
//     serialize: (val: number): any => '3'
//   }
// };

// import {TestEntityApi, TestEntity, TestComplexType, functionImports} from 'test';
// const entestEntity: TestEntity<typeof customDes> = await TestEntityApi(customDes).requestBuilder().getAll()...
// TestEntityApi(customDes).entityBuilder().build();
// await entity: TestEntity<typeof customDes> = functionImports(c).functionimportfn({}).execute();

// const testEntityApi = new TestEntityApi(c);
// const cf = testEntityApi.customField('test', true)
// testEntityApi.schema.STRING_PROPERTY.equals(4);
// testEntityApi.entityBuilder().stringProperty(54);
// const testEntityApi2 = new TestEntityApi();
// testEntityApi2.schema.STRING_PROPERTY.equals(4);
// testEntityApi2.entityBuilder().stringProperty('54');
// const testEntityLinkedApi = new TestEntityMultiLinkApi(c);
// const testEntitySingleLinkedApi = new TestEntitySingleLinkApi(c);
// const testEntityLinkedApi2 = new TestEntityMultiLinkApi();
// const testEntity = testEntityApi.entityBuilder().build();

// const a = testEntityApi.schema.STRING_PROPERTY.equals(4);

// // const f = new NewFilter('test', 'eq', '2');
// // const wf = new WrappedFilter(TestEntity, defaultDeSerializers, f);
// const ff = filterFunctions(c).newEndsWith(
//   testEntityApi.schema.STRING_PROPERTY,
//   58349
// );

// testEntityApi
//   .requestBuilder()
//   .getAll()
//   .filter(
//     testEntityApi.schema.COMPLEX_TYPE_PROPERTY.stringProperty
//       .equals(39)
//       .TO_SINGLE_LINK.filter(
//         testEntitySingleLinkedApi.schema.STRING_PROPERTY.equals(432)
//       )
//     // filterFunctions.endsWith(TestEntity.STRING_PROPERTY, 'test').equals(true)

//     // filterFunctions.endsWith(
//     //   testEntityApi.schema.STRING_PROPERTY,
//     //   'test'
//     // ).equals(true),
//     // filterFunctions(c).newStartsWith(
//     //   testEntityApi.schema.STRING_PROPERTY,
//     //   'test'
//     // ).equals(true)
//   );

// const entity = testEntityApi
//   .entityBuilder()
//   .stringProperty(4839)
//   .booleanProperty(true)
//   .complexTypeProperty({
//     stringProperty: 78,
//     int16Property: 48
//   })
//   .toMultiLink([
//     new TestEntityMultiLinkApi(c).entityBuilder().stringProperty(543).build()
//   ])
//   .build();
