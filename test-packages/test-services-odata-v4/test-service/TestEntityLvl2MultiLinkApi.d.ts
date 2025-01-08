/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityLvl2MultiLink } from './TestEntityLvl2MultiLink';
import { TestEntityLvl2MultiLinkRequestBuilder } from './TestEntityLvl2MultiLinkRequestBuilder';
import { TestEntityLvl3MultiLinkApi } from './TestEntityLvl3MultiLinkApi';
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
export declare class TestEntityLvl2MultiLinkApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityLvl2MultiLink<DeSerializersT>, DeSerializersT>
{
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): TestEntityLvl2MultiLinkApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [TestEntityLvl3MultiLinkApi<DeSerializersT>]
  ): this;
  entityConstructor: typeof TestEntityLvl2MultiLink;
  requestBuilder(): TestEntityLvl2MultiLinkRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityLvl2MultiLink<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityLvl2MultiLink<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof TestEntityLvl2MultiLink,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    STRING_PROPERTY: OrderableEdmTypeField<
      TestEntityLvl2MultiLink<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BOOLEAN_PROPERTY: OrderableEdmTypeField<
      TestEntityLvl2MultiLink<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    GUID_PROPERTY: OrderableEdmTypeField<
      TestEntityLvl2MultiLink<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      true,
      true
    >;
    INT_16_PROPERTY: OrderableEdmTypeField<
      TestEntityLvl2MultiLink<DeSerializers>,
      DeSerializersT,
      'Edm.Int16',
      true,
      true
    >;
    KEY_PROPERTY: OrderableEdmTypeField<
      TestEntityLvl2MultiLink<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toMultiLink2} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_MULTI_LINK_2: OneToManyLink<
      TestEntityLvl2MultiLink<DeSerializersT>,
      DeSerializersT,
      TestEntityLvl3MultiLinkApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<TestEntityLvl2MultiLink<DeSerializers>>;
  };
}
