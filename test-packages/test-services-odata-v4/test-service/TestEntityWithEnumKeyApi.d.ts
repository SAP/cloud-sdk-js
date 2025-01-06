/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityWithEnumKey } from './TestEntityWithEnumKey';
import { TestEntityWithEnumKeyRequestBuilder } from './TestEntityWithEnumKeyRequestBuilder';
import { TestEnumType } from './TestEnumType';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  EnumField
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntityWithEnumKeyApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityWithEnumKey<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): TestEntityWithEnumKeyApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityWithEnumKey;
  requestBuilder(): TestEntityWithEnumKeyRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityWithEnumKey<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityWithEnumKey<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof TestEntityWithEnumKey,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    KEY_PROPERTY_ENUM_1: EnumField<
      TestEntityWithEnumKey<DeSerializers>,
      DeSerializersT,
      TestEnumType,
      false,
      true
    >;
    ALL_FIELDS: AllFields<TestEntityWithEnumKey<DeSerializers>>;
  };
}
