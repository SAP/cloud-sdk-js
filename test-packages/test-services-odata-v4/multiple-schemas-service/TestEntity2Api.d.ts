/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity2 } from './TestEntity2';
import { TestEntity2RequestBuilder } from './TestEntity2RequestBuilder';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntity2Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntity2<DeSerializersT>, DeSerializersT> {
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): TestEntity2Api<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntity2;
  requestBuilder(): TestEntity2RequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntity2<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntity2<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof TestEntity2, DeSerializersT>;
  private _schema?;
  get schema(): {
    KEY_PROPERTY_STRING: OrderableEdmTypeField<
      TestEntity2<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    SINGLE_PROPERTY: OrderableEdmTypeField<
      TestEntity2<DeSerializers>,
      DeSerializersT,
      'Edm.Single',
      true,
      true
    >;
    ALL_FIELDS: AllFields<TestEntity2<DeSerializers>>;
  };
}
