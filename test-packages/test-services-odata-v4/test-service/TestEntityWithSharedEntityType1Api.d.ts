/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityWithSharedEntityType1 } from './TestEntityWithSharedEntityType1';
import { TestEntityWithSharedEntityType1RequestBuilder } from './TestEntityWithSharedEntityType1RequestBuilder';
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
export declare class TestEntityWithSharedEntityType1Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<
  TestEntityWithSharedEntityType1<DeSerializersT>,
  DeSerializersT
> {
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    deSerializers?: DeSerializersT
  ): TestEntityWithSharedEntityType1Api<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityWithSharedEntityType1;
  requestBuilder(): TestEntityWithSharedEntityType1RequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityWithSharedEntityType1<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityWithSharedEntityType1<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof TestEntityWithSharedEntityType1,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    KEY_PROPERTY: OrderableEdmTypeField<
      TestEntityWithSharedEntityType1<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ALL_FIELDS: AllFields<TestEntityWithSharedEntityType1<DeSerializers>>;
  };
}
