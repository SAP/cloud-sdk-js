/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity } from './TestEntity';
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { TestEntityMultiLinkApi } from './TestEntityMultiLinkApi';
import { TestEntitySingleLinkApi } from './TestEntitySingleLinkApi';
import { TestComplexType, TestComplexTypeField } from './TestComplexType';
import { TestEnumType } from './TestEnumType';
import { TestEnumTypeInt64 } from './TestEnumTypeInt64';
import { TestEnumTypeWithOneMember } from './TestEnumTypeWithOneMember';
import {
  CustomField,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  Time,
  OrderableEdmTypeField,
  EdmTypeField,
  CollectionField,
  EnumField,
  OneToManyLink,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export class TestEntityApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntity<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  private constructor(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ) {
    this.deSerializers = deSerializers;
  }

  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  public static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ): TestEntityApi<DeSerializersT> {
    return new TestEntityApi(deSerializers);
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-many navigation property {@link toMultiLink} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_MULTI_LINK: OneToManyLink<
      TestEntity<DeSerializersT>,
      DeSerializersT,
      TestEntityMultiLinkApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toOtherMultiLink} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_OTHER_MULTI_LINK: OneToManyLink<
      TestEntity<DeSerializersT>,
      DeSerializersT,
      TestEntityMultiLinkApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toSingleLink} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SINGLE_LINK: OneToOneLink<
      TestEntity<DeSerializersT>,
      DeSerializersT,
      TestEntitySingleLinkApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [
      TestEntityMultiLinkApi<DeSerializersT>,
      TestEntityMultiLinkApi<DeSerializersT>,
      TestEntitySingleLinkApi<DeSerializersT>
    ]
  ): this {
    this.navigationPropertyFields = {
      TO_MULTI_LINK: new OneToManyLink('to_MultiLink', this, linkedApis[0]),
      TO_OTHER_MULTI_LINK: new OneToManyLink(
        'to_OtherMultiLink',
        this,
        linkedApis[1]
      ),
      TO_SINGLE_LINK: new OneToOneLink('to_SingleLink', this, linkedApis[2])
    };
    return this;
  }

  entityConstructor = TestEntity;

  requestBuilder(): TestEntityRequestBuilder<DeSerializersT> {
    return new TestEntityRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    TestEntity<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<TestEntity<DeSerializersT>, DeSerializersT>(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<TestEntity<DeSerializersT>, DeSerializersT, NullableT> {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  private _fieldBuilder?: FieldBuilder<typeof TestEntity, DeSerializersT>;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(TestEntity, this.deSerializers);
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    KEY_PROPERTY_GUID: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    KEY_PROPERTY_STRING: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STRING_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BOOLEAN_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    GUID_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    INT_16_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Int16',
      true,
      true
    >;
    INT_32_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Int32',
      true,
      true
    >;
    INT_64_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Int64',
      true,
      true
    >;
    DECIMAL_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    SINGLE_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Single',
      true,
      true
    >;
    DOUBLE_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Double',
      true,
      true
    >;
    FLOAT_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Float',
      true,
      true
    >;
    TIME_OF_DAY_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.TimeOfDay',
      true,
      true
    >;
    KEY_DATE_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
      true,
      true
    >;
    DATE_TIME_OFF_SET_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    DURATION_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Duration',
      true,
      true
    >;
    BYTE_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Byte',
      true,
      true
    >;
    S_BYTE_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.SByte',
      true,
      true
    >;
    GEOGRAPHY_POINT_PROPERTY: EdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Any',
      true,
      true
    >;
    SOMETHING_THE_SDK_DOES_NOT_SUPPORT: EdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Any',
      true,
      true
    >;
    COLLECTION_PROPERTY: CollectionField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    COMPLEX_TYPE_PROPERTY: TestComplexTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      true,
      true
    >;
    COMPLEX_TYPE_COLLECTION_PROPERTY: CollectionField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      TestComplexType,
      true,
      true
    >;
    ENUM_PROPERTY: EnumField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      TestEnumType,
      true,
      true
    >;
    ENUM_PROPERTY_INT_64: EnumField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      TestEnumTypeInt64,
      true,
      true
    >;
    ENUM_PROPERTY_WITH_ONE_MEMBER: EnumField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      TestEnumTypeWithOneMember,
      true,
      true
    >;
    ENUM_COLLECTION_PROPERTY: CollectionField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      typeof TestEnumType,
      true,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toMultiLink} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_MULTI_LINK: OneToManyLink<
      TestEntity<DeSerializersT>,
      DeSerializersT,
      TestEntityMultiLinkApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toOtherMultiLink} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_OTHER_MULTI_LINK: OneToManyLink<
      TestEntity<DeSerializersT>,
      DeSerializersT,
      TestEntityMultiLinkApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toSingleLink} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SINGLE_LINK: OneToOneLink<
      TestEntity<DeSerializersT>,
      DeSerializersT,
      TestEntitySingleLinkApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<TestEntity<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link keyPropertyGuid} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY_GUID: fieldBuilder.buildEdmTypeField(
          'KeyPropertyGuid',
          'Edm.Guid',
          false
        ),
        /**
         * Static representation of the {@link keyPropertyString} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY_STRING: fieldBuilder.buildEdmTypeField(
          'KeyPropertyString',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link stringProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY: fieldBuilder.buildEdmTypeField(
          'StringProperty',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link booleanProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY: fieldBuilder.buildEdmTypeField(
          'BooleanProperty',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link guidProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY: fieldBuilder.buildEdmTypeField(
          'GuidProperty',
          'Edm.Guid',
          true
        ),
        /**
         * Static representation of the {@link int16Property} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_16_PROPERTY: fieldBuilder.buildEdmTypeField(
          'Int16Property',
          'Edm.Int16',
          true
        ),
        /**
         * Static representation of the {@link int32Property} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_32_PROPERTY: fieldBuilder.buildEdmTypeField(
          'Int32Property',
          'Edm.Int32',
          true
        ),
        /**
         * Static representation of the {@link int64Property} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY: fieldBuilder.buildEdmTypeField(
          'Int64Property',
          'Edm.Int64',
          true
        ),
        /**
         * Static representation of the {@link decimalProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY: fieldBuilder.buildEdmTypeField(
          'DecimalProperty',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the {@link singleProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SINGLE_PROPERTY: fieldBuilder.buildEdmTypeField(
          'SingleProperty',
          'Edm.Single',
          true
        ),
        /**
         * Static representation of the {@link doubleProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY: fieldBuilder.buildEdmTypeField(
          'DoubleProperty',
          'Edm.Double',
          true
        ),
        /**
         * Static representation of the {@link floatProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FLOAT_PROPERTY: fieldBuilder.buildEdmTypeField(
          'FloatProperty',
          'Edm.Float',
          true
        ),
        /**
         * Static representation of the {@link timeOfDayProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY: fieldBuilder.buildEdmTypeField(
          'TimeOfDayProperty',
          'Edm.TimeOfDay',
          true
        ),
        /**
         * Static representation of the {@link keyDateProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_DATE_PROPERTY: fieldBuilder.buildEdmTypeField(
          'KeyDateProperty',
          'Edm.Date',
          true
        ),
        /**
         * Static representation of the {@link dateTimeOffSetProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_TIME_OFF_SET_PROPERTY: fieldBuilder.buildEdmTypeField(
          'DateTimeOffSetProperty',
          'Edm.DateTimeOffset',
          true,
          2
        ),
        /**
         * Static representation of the {@link durationProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DURATION_PROPERTY: fieldBuilder.buildEdmTypeField(
          'DurationProperty',
          'Edm.Duration',
          true
        ),
        /**
         * Static representation of the {@link byteProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BYTE_PROPERTY: fieldBuilder.buildEdmTypeField(
          'ByteProperty',
          'Edm.Byte',
          true
        ),
        /**
         * Static representation of the {@link sByteProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        S_BYTE_PROPERTY: fieldBuilder.buildEdmTypeField(
          'SByteProperty',
          'Edm.SByte',
          true
        ),
        /**
         * Static representation of the {@link geographyPointProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GEOGRAPHY_POINT_PROPERTY: fieldBuilder.buildEdmTypeField(
          'GeographyPointProperty',
          'Edm.Any',
          true
        ),
        /**
         * Static representation of the {@link somethingTheSdkDoesNotSupport} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SOMETHING_THE_SDK_DOES_NOT_SUPPORT: fieldBuilder.buildEdmTypeField(
          'SomethingTheSDKDoesNotSupport',
          'Edm.Any',
          true
        ),
        /**
         * Static representation of the {@link collectionProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COLLECTION_PROPERTY: fieldBuilder.buildCollectionField(
          'CollectionProperty',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link complexTypeProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPLEX_TYPE_PROPERTY: fieldBuilder.buildComplexTypeField(
          'ComplexTypeProperty',
          TestComplexTypeField,
          true
        ),
        /**
         * Static representation of the {@link complexTypeCollectionProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPLEX_TYPE_COLLECTION_PROPERTY: fieldBuilder.buildCollectionField(
          'ComplexTypeCollectionProperty',
          TestComplexType,
          true
        ),
        /**
         * Static representation of the {@link enumProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENUM_PROPERTY: fieldBuilder.buildEnumField(
          'EnumProperty',
          TestEnumType,
          true
        ),
        /**
         * Static representation of the {@link enumPropertyInt64} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENUM_PROPERTY_INT_64: fieldBuilder.buildEnumField(
          'EnumPropertyInt64',
          TestEnumTypeInt64,
          true
        ),
        /**
         * Static representation of the {@link enumPropertyWithOneMember} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENUM_PROPERTY_WITH_ONE_MEMBER: fieldBuilder.buildEnumField(
          'EnumPropertyWithOneMember',
          TestEnumTypeWithOneMember,
          true
        ),
        /**
         * Static representation of the {@link enumCollectionProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENUM_COLLECTION_PROPERTY: fieldBuilder.buildCollectionField(
          'EnumCollectionProperty',
          TestEnumType,
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', TestEntity)
      };
    }

    return this._schema;
  }
}
