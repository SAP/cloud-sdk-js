/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity } from './TestEntity';
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { TestEntityLinkApi } from './TestEntityLinkApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  OneToManyLink
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
    linkedApis: [TestEntityLinkApi<DeSerializersT>]
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
    KEY_TEST_ENTITY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Int32',
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
    GUID_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
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
    INT_64_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Int64',
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
    DECIMAL_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Decimal',
      true,
      true
    >;
    DATE_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Date',
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
    DATA_TIME_OFFSET_DATA_TIME_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
      true,
      true
    >;
    DATA_TIME_OFFSET_TIMESTAMP_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.DateTimeOffset',
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
      TestEntityLinkApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<TestEntity<DeSerializers>>;
  };
}
