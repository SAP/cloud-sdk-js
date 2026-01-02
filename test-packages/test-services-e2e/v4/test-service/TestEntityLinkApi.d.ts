/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityLink } from './TestEntityLink';
import { TestEntityLinkRequestBuilder } from './TestEntityLinkRequestBuilder';
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
export declare class TestEntityLinkApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityLink<DeSerializersT>, DeSerializersT> {
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): TestEntityLinkApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityLink;
  requestBuilder(): TestEntityLinkRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityLink<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntityLink<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof TestEntityLink, DeSerializersT>;
  private _schema?;
  get schema(): {
    KEY_TEST_ENTITY_LINK: OrderableEdmTypeField<
      TestEntityLink<DeSerializers>,
      DeSerializersT,
      'Edm.Int32',
      false,
      true
    >;
    KEY_TO_TEST_ENTITY: OrderableEdmTypeField<
      TestEntityLink<DeSerializers>,
      DeSerializersT,
      'Edm.Int32',
      false,
      true
    >;
    STRING_PROPERTY: OrderableEdmTypeField<
      TestEntityLink<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    ALL_FIELDS: AllFields<TestEntityLink<DeSerializers>>;
  };
}
