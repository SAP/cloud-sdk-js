/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityLvl2SingleLink } from './TestEntityLvl2SingleLink';
import { TestEntityLvl2SingleLinkRequestBuilder } from './TestEntityLvl2SingleLinkRequestBuilder';
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
export declare class TestEntityLvl2SingleLinkApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityLvl2SingleLink<DeSerializersT>, DeSerializersT>
{
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
  ): TestEntityLvl2SingleLinkApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityLvl2SingleLink;
  requestBuilder(): TestEntityLvl2SingleLinkRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityLvl2SingleLink<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityLvl2SingleLink<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof TestEntityLvl2SingleLink,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    STRING_PROPERTY: OrderableEdmTypeField<
      TestEntityLvl2SingleLink<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BOOLEAN_PROPERTY: OrderableEdmTypeField<
      TestEntityLvl2SingleLink<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    GUID_PROPERTY: OrderableEdmTypeField<
      TestEntityLvl2SingleLink<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    INT_16_PROPERTY: OrderableEdmTypeField<
      TestEntityLvl2SingleLink<DeSerializers>,
      DeSerializersT,
      'Edm.Int16',
      true,
      true
    >;
    KEY_PROPERTY: OrderableEdmTypeField<
      TestEntityLvl2SingleLink<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ALL_FIELDS: AllFields<TestEntityLvl2SingleLink<DeSerializers>>;
  };
}
