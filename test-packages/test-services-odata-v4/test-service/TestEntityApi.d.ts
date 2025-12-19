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
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  EdmTypeField,
  CollectionField,
  EnumField,
  OneToManyLink,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntityApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntity<DeSerializersT>, DeSerializersT> {
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): TestEntityApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      TestEntityMultiLinkApi<DeSerializersT>,
      TestEntityMultiLinkApi<DeSerializersT>,
      TestEntitySingleLinkApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof TestEntity;
  requestBuilder(): TestEntityRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntity<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntity<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof TestEntity, DeSerializersT>;
  private _schema?;
  get schema(): {
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
}
