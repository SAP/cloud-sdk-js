/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity } from './TestEntity';
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { TestEntityMultiLinkApi } from './TestEntityMultiLinkApi';
import { TestEntityOtherMultiLinkApi } from './TestEntityOtherMultiLinkApi';
import { TestEntitySingleLinkApi } from './TestEntitySingleLinkApi';
import { TestComplexTypeField } from './TestComplexType';
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
  Link,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v2';
export declare class TestEntityApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntity<DeSerializersT>, DeSerializersT>
{
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
      TestEntityOtherMultiLinkApi<DeSerializersT>,
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
    TIME_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Time',
      true,
      true
    >;
    DATE_TIME_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.DateTime',
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
    SOMETHING_THE_SDK_DOES_NOT_SUPPORT: EdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Any',
      true,
      true
    >;
    COMPLEX_TYPE_PROPERTY: TestComplexTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      true,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toMultiLink} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_MULTI_LINK: Link<
      TestEntity<DeSerializersT>,
      DeSerializersT,
      TestEntityMultiLinkApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toOtherMultiLink} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_OTHER_MULTI_LINK: Link<
      TestEntity<DeSerializersT>,
      DeSerializersT,
      TestEntityOtherMultiLinkApi<DeSerializersT>
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
