/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { BigNumber } from 'bignumber.js';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import {
  Entity,
  DeSerializationMiddleware,
  defaultDeSerializers,
  filterFunctions
} from '@sap-cloud-sdk/odata-v2';
import {
  EntityBuilderType,
  Link,
  Time
} from '@sap-cloud-sdk/odata-common/internal';

import { getDeSerializers } from '@sap-cloud-sdk/odata-v2/dist/de-serializers/get-de-serializers';

import { NewFieldBuilder } from '@sap-cloud-sdk/odata-common/dist/selectable/field-builder-new';

/**
 * This class represents the entity "A_TestEntity" of service "API_TEST_SRV".
 */
export class TestEntity<
    T extends DeSerializationMiddlewareV2BASE = DeSerializationMiddleware
  >
  extends Entity
  implements TestEntityType<T>
{
  static api(des: any) {}

  static schema(des: any) {}
  /**
   * Technical entity name for TestEntity.
   */
  static _entityName = 'A_TestEntity';
  /**
   * Default url path for the according service.
   */
  static _defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';

  // static _allFields: any = [];
  // static _keyFields = [];
  static _keys = ['KeyPropertyGuid', 'KeyPropertyString'];
  /**
   * Key Property Guid.
   */
  keyPropertyGuid!: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Key Property String.
   */
  keyPropertyString!: DeserializedType<T, 'Edm.String'>;
  /**
   * String Property.
   * Maximum length: 10.
   * @nullable
   */
  stringProperty?: DeserializedType<T, 'Edm.String'>;
  /**
   * Boolean Property.
   * @nullable
   */
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'>;
  /**
   * Guid Property.
   * @nullable
   */
  guidProperty?: DeserializedType<T, 'Edm.Guid'>;
  /**
   * Int 16 Property.
   * @nullable
   */
  int16Property?: DeserializedType<T, 'Edm.Int16'>;
  /**
   * Int 32 Property.
   * @nullable
   */
  int32Property?: DeserializedType<T, 'Edm.Int32'>;
  /**
   * Int 64 Property.
   * @nullable
   */
  int64Property?: DeserializedType<T, 'Edm.Int64'>;
  /**
   * Decimal Property.
   * @nullable
   */
  decimalProperty?: DeserializedType<T, 'Edm.Decimal'>;
  /**
   * Single Property.
   * @nullable
   */
  singleProperty?: DeserializedType<T, 'Edm.Single'>;
  /**
   * Double Property.
   * @nullable
   */
  doubleProperty?: DeserializedType<T, 'Edm.Double'>;
  /**
   * Float Property.
   * @nullable
   */
  floatProperty?: DeserializedType<T, 'Edm.Float'>;
  /**
   * Time Property.
   * @nullable
   */
  timeProperty?: DeserializedType<T, 'Edm.Time'>;
  /**
   * Date Time Property.
   * @nullable
   */
  dateTimeProperty?: DeserializedType<T, 'Edm.DateTime'>;
  /**
   * Date Time Off Set Property.
   * @nullable
   */
  dateTimeOffSetProperty?: DeserializedType<T, 'Edm.DateTimeOffset'>;
  /**
   * Byte Property.
   * @nullable
   */
  byteProperty?: DeserializedType<T, 'Edm.Byte'>;
  /**
   * S Byte Property.
   * @nullable
   */
  sByteProperty?: DeserializedType<T, 'Edm.SByte'>;
  /**
   * Something The Sdk Does Not Support.
   * @nullable
   */
  somethingTheSdkDoesNotSupport?: DeserializedType<T, 'Edm.Any'>;
  /**
   * Complex Type Property.
   * @nullable
   */
  complexTypeProperty?: TestComplexType<T>;
  /**
   * One-to-many navigation property to the [[TestEntityMultiLink]] entity.
   */
  toMultiLink!: TestEntityMultiLink<T>[];
  /**
   * One-to-many navigation property to the [[TestEntityOtherMultiLink]] entity.
   */
  toOtherMultiLink!: TestEntityOtherMultiLink[];
  /**
   * One-to-one navigation property to the [[TestEntitySingleLink]] entity.
   */
  toSingleLink?: TestEntitySingleLink<T> | null;

  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON(): { [key: string]: any } {
    return { ...this, ...this._customFields };
  }
}

import {
  TestEntityMultiLink,
  TestEntityMultiLinkApi,
  TestEntityMultiLinkType
} from './TestEntityMultiLink';
import {
  TestEntityOtherMultiLink,
  TestEntityOtherMultiLinkType
} from './TestEntityOtherMultiLink';
import {
  TestEntitySingleLink,
  TestEntitySingleLinkType
} from './TestEntitySingleLink';
import { DeSerializationMiddlewareV2BASE } from '@sap-cloud-sdk/odata-v2/dist/de-serializers/de-serialization-middleware';
import { DeserializedType } from '@sap-cloud-sdk/odata-common/dist/de-serializers/de-serialization-middleware';

import { ConstructableBASE } from '@sap-cloud-sdk/odata-common/dist/entity-base';

export interface TestEntityType<
  T extends DeSerializationMiddlewareV2BASE = DeSerializationMiddleware
> {
  keyPropertyGuid: DeserializedType<T, 'Edm.Guid'>;
  keyPropertyString: DeserializedType<T, 'Edm.String'>;
  stringProperty?: DeserializedType<T, 'Edm.String'> | null;
  booleanProperty?: DeserializedType<T, 'Edm.Boolean'> | null;
  guidProperty?: DeserializedType<T, 'Edm.Guid'> | null;
  int16Property?: DeserializedType<T, 'Edm.Int16'> | null;
  int32Property?: DeserializedType<T, 'Edm.Int32'> | null;
  int64Property?: DeserializedType<T, 'Edm.Int64'> | null;
  decimalProperty?: DeserializedType<T, 'Edm.Decimal'> | null;
  singleProperty?: DeserializedType<T, 'Edm.Single'> | null;
  doubleProperty?: DeserializedType<T, 'Edm.Double'> | null;
  floatProperty?: DeserializedType<T, 'Edm.Float'> | null;
  timeProperty?: DeserializedType<T, 'Edm.Time'> | null;
  dateTimeProperty?: DeserializedType<T, 'Edm.DateTime'> | null;
  dateTimeOffSetProperty?: DeserializedType<T, 'Edm.DateTimeOffset'> | null;
  byteProperty?: DeserializedType<T, 'Edm.Byte'> | null;
  sByteProperty?: DeserializedType<T, 'Edm.SByte'> | null;
  somethingTheSdkDoesNotSupport?: DeserializedType<T, 'Edm.Any'> | null;
  complexTypeProperty?: TestComplexType<T> | null;
  toMultiLink: TestEntityMultiLinkType<T>[];
  toOtherMultiLink: TestEntityOtherMultiLinkType[];
  toSingleLink?: TestEntitySingleLinkType<T> | null;
}

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
    ConstructableBASE<
      TestEntity<
        DeSerializationMiddleware<
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
      DeSerializationMiddleware<
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
      TestEntityType<
        DeSerializationMiddleware<
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
    >
{
  public deSerializers: DeSerializationMiddleware<
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
  constructor(
    deSerializers: Partial<
      DeSerializationMiddleware<
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
    this.deSerializers = getDeSerializers(deSerializers);
  }

  schema() {
    const _fieldBuilder = new NewFieldBuilder(TestEntity, this.deSerializers);

    return {
      /**
       * Static representation of the [[keyPropertyGuid]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      KEY_PROPERTY_GUID: _fieldBuilder.buildEdmTypeField(
        'KeyPropertyGuid',
        'Edm.Guid',
        false
      ),
      /**
       * Static representation of the [[keyPropertyString]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      KEY_PROPERTY_STRING: _fieldBuilder.buildEdmTypeField(
        'KeyPropertyString',
        'Edm.String',
        false
      ),
      /**
       * Static representation of the [[stringProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      STRING_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'StringProperty',
        'Edm.String',
        true
      ),
      /**
       * Static representation of the [[booleanProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      BOOLEAN_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'BooleanProperty',
        'Edm.Boolean',
        true
      ),
      /**
       * Static representation of the [[guidProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      GUID_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'GuidProperty',
        'Edm.Guid',
        true
      ),
      /**
       * Static representation of the [[int16Property]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      INT_16_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'Int16Property',
        'Edm.Int16',
        true
      ),
      /**
       * Static representation of the [[int32Property]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      INT_32_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'Int32Property',
        'Edm.Int32',
        true
      ),
      /**
       * Static representation of the [[int64Property]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      INT_64_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'Int64Property',
        'Edm.Int64',
        true
      ),
      /**
       * Static representation of the [[decimalProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      DECIMAL_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'DecimalProperty',
        'Edm.Decimal',
        true
      ),
      /**
       * Static representation of the [[singleProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      SINGLE_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'SingleProperty',
        'Edm.Single',
        true
      ),
      /**
       * Static representation of the [[doubleProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      DOUBLE_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'DoubleProperty',
        'Edm.Double',
        true
      ),
      /**
       * Static representation of the [[floatProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      FLOAT_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'FloatProperty',
        'Edm.Float',
        true
      ),
      /**
       * Static representation of the [[timeProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TIME_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'TimeProperty',
        'Edm.Time',
        true
      ),
      /**
       * Static representation of the [[dateTimeProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      DATE_TIME_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'DateTimeProperty',
        'Edm.DateTime',
        true
      ),
      /**
       * Static representation of the [[dateTimeOffSetProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      DATE_TIME_OFF_SET_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'DateTimeOffSetProperty',
        'Edm.DateTimeOffset',
        true
      ),
      /**
       * Static representation of the [[byteProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      BYTE_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'ByteProperty',
        'Edm.Byte',
        true
      ),
      /**
       * Static representation of the [[sByteProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      S_BYTE_PROPERTY: _fieldBuilder.buildEdmTypeField(
        'SByteProperty',
        'Edm.SByte',
        true
      ),
      /**
       * Static representation of the [[somethingTheSdkDoesNotSupport]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      SOMETHING_THE_SDK_DOES_NOT_SUPPORT: _fieldBuilder.buildEdmTypeField(
        'SomethingTheSDKDoesNotSupport',
        'Edm.Any',
        true
      ),
      /**
       * Static representation of the [[complexTypeProperty]] property for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      COMPLEX_TYPE_PROPERTY: _fieldBuilder.buildComplexTypeField(
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
        TestEntity,
        TestEntityMultiLink
      ) as Link<TestEntity, TestEntityMultiLink>
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
       * All fields of the TestEntity entity.
       */
      // _allFields: [
      //   TestEntity.KEY_PROPERTY_GUID,
      //   TestEntity.KEY_PROPERTY_STRING,
      //   TestEntity.STRING_PROPERTY,
      //   TestEntity.BOOLEAN_PROPERTY,
      //   TestEntity.GUID_PROPERTY,
      //   TestEntity.INT_16_PROPERTY,
      //   TestEntity.INT_32_PROPERTY,
      //   TestEntity.INT_64_PROPERTY,
      //   TestEntity.DECIMAL_PROPERTY,
      //   TestEntity.SINGLE_PROPERTY,
      //   TestEntity.DOUBLE_PROPERTY,
      //   TestEntity.FLOAT_PROPERTY,
      //   TestEntity.TIME_PROPERTY,
      //   TestEntity.DATE_TIME_PROPERTY,
      //   TestEntity.DATE_TIME_OFF_SET_PROPERTY,
      //   TestEntity.BYTE_PROPERTY,
      //   TestEntity.S_BYTE_PROPERTY,
      //   TestEntity.SOMETHING_THE_SDK_DOES_NOT_SUPPORT,
      //   TestEntity.COMPLEX_TYPE_PROPERTY,
      //   TestEntity.TO_MULTI_LINK,
      //   TestEntity.TO_OTHER_MULTI_LINK,
      //   TestEntity.TO_SINGLE_LINK
      // ] as Array<
      //   | EdmTypeField<
      //       TestEntity,
      //       'Edm.Guid',
      //       CustomDeSerializer<typeof deSerializers>,
      //       false,
      //       true
      //     >
      //   | EdmTypeField<
      //       TestEntity,
      //       'Edm.String',
      //       CustomDeSerializer<typeof deSerializers>,
      //       false,
      //       true
      //     >
      //   | EdmTypeField<
      //       TestEntity,
      //       'Edm.String',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | EdmTypeField<
      //       TestEntity,
      //       'Edm.Boolean',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | EdmTypeField<
      //       TestEntity,
      //       'Edm.Guid',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | OrderableEdmTypeField<
      //       TestEntity,
      //       'Edm.Int16',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | OrderableEdmTypeField<
      //       TestEntity,
      //       'Edm.Int32',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | OrderableEdmTypeField<
      //       TestEntity,
      //       'Edm.Int64',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | OrderableEdmTypeField<
      //       TestEntity,
      //       'Edm.Decimal',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | OrderableEdmTypeField<
      //       TestEntity,
      //       'Edm.Single',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | OrderableEdmTypeField<
      //       TestEntity,
      //       'Edm.Double',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | OrderableEdmTypeField<
      //       TestEntity,
      //       'Edm.Float',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | OrderableEdmTypeField<
      //       TestEntity,
      //       'Edm.Time',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | OrderableEdmTypeField<
      //       TestEntity,
      //       'Edm.DateTime',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | OrderableEdmTypeField<
      //       TestEntity,
      //       'Edm.DateTimeOffset',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | OrderableEdmTypeField<
      //       TestEntity,
      //       'Edm.Byte',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | OrderableEdmTypeField<
      //       TestEntity,
      //       'Edm.SByte',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | EdmTypeField<
      //       TestEntity,
      //       'Edm.Any',
      //       CustomDeSerializer<typeof deSerializers>,
      //       true,
      //       true
      //     >
      //   | TestComplexTypeField<TestEntity, true, true>
      //   | Link<TestEntity, TestEntityMultiLink>
      //   | Link<TestEntity, TestEntityOtherMultiLink>
      //   | OneToOneLink<TestEntity, TestEntitySingleLink>
      // >,
      /**
       * All fields selector.
       */
      // ALL_FIELDS: new AllFields('*', TestEntity) as AllFields<TestEntity>,
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

  requestBuilder(): TestEntityRequestBuilder<typeof this.deSerializers> {
    return new TestEntityRequestBuilder(this.deSerializers, this.schema());
  }

  entityBuilder(): EntityBuilderType<
    TestEntity<typeof this.deSerializers>,
    TestEntityType<typeof this.deSerializers>
  > {
    return Entity.entityBuilder(
      TestEntity as any,
      this.deSerializers,
      this.schema()
    ) as any;
  }
}

const c = {
  'Edm.String': {
    deserialize: (val: any): number => 3,
    serialize: (val: number): any => '3'
  }
};

const testEntityApi = new TestEntityApi(c);
const testEntityApi2 = new TestEntityApi();
const testEntityLinkedApi = new TestEntityMultiLinkApi(c);
const testEntitySingleLinkedApi = new TestEntitySingleLinkApi(c);
const testEntityLinkedApi2 = new TestEntityMultiLinkApi();
const testEntity = testEntityApi.entityBuilder().build();

const a = testEntityApi.schema().STRING_PROPERTY.equals(4);

// const f = new NewFilter('test', 'eq', '2');
// const wf = new WrappedFilter(TestEntity, defaultDeSerializers, f);
const ff = filterFunctions(c).newEndsWith(
  testEntityApi.schema().STRING_PROPERTY,
  58349
);

testEntityApi
  .requestBuilder()
  .getAll()
  .filter(
    testEntityApi
      .schema()
      .COMPLEX_TYPE_PROPERTY.stringProperty.equals(39)
      .TO_SINGLE_LINK.filter(
        testEntitySingleLinkedApi.schema().STRING_PROPERTY.equals(432)
      )
    // filterFunctions.endsWith(TestEntity.STRING_PROPERTY, 'test').equals(true)

    // filterFunctions.endsWith(
    //   testEntityApi.schema().STRING_PROPERTY,
    //   'test'
    // ).equals(true),
    // filterFunctions(c).newStartsWith(
    //   testEntityApi.schema().STRING_PROPERTY,
    //   'test'
    // ).equals(true)
  );

const entity = testEntityApi
  .entityBuilder()
  .stringProperty(4839)
  .booleanProperty(true)
  .complexTypeProperty({
    stringProperty: 78,
    int16Property: 48
  })
  .toMultiLink([
    new TestEntityMultiLinkApi(c).entityBuilder().stringProperty(543).build()
  ])
  .build();
