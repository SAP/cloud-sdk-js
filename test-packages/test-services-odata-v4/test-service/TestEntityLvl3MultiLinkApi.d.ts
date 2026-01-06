/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityLvl3MultiLink } from './TestEntityLvl3MultiLink';
import { TestEntityLvl3MultiLinkRequestBuilder } from './TestEntityLvl3MultiLinkRequestBuilder';
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
export declare class TestEntityLvl3MultiLinkApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<
  TestEntityLvl3MultiLink<DeSerializersT>,
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
  >(deSerializers?: DeSerializersT): TestEntityLvl3MultiLinkApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntityLvl3MultiLink;
  requestBuilder(): TestEntityLvl3MultiLinkRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityLvl3MultiLink<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityLvl3MultiLink<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof TestEntityLvl3MultiLink,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    STRING_PROPERTY: OrderableEdmTypeField<
      TestEntityLvl3MultiLink<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    GUID_PROPERTY: OrderableEdmTypeField<
      TestEntityLvl3MultiLink<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    KEY_PROPERTY: OrderableEdmTypeField<
      TestEntityLvl3MultiLink<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ALL_FIELDS: AllFields<TestEntityLvl3MultiLink<DeSerializers>>;
  };
}
