/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityCircularLinkParent } from './TestEntityCircularLinkParent';
import { TestEntityCircularLinkParentRequestBuilder } from './TestEntityCircularLinkParentRequestBuilder';
import { TestEntityCircularLinkChildApi } from './TestEntityCircularLinkChildApi';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  OneToOneLink,
  OneToManyLink
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntityCircularLinkParentApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<
  TestEntityCircularLinkParent<DeSerializersT>,
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
  ): TestEntityCircularLinkParentApi<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(
    linkedApis: [
      TestEntityCircularLinkChildApi<DeSerializersT>,
      TestEntityCircularLinkChildApi<DeSerializersT>
    ]
  ): this;
  entityConstructor: typeof TestEntityCircularLinkParent;
  requestBuilder(): TestEntityCircularLinkParentRequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntityCircularLinkParent<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<
    TestEntityCircularLinkParent<DeSerializersT>,
    DeSerializersT,
    NullableT
  >;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<
    typeof TestEntityCircularLinkParent,
    DeSerializersT
  >;
  private _schema?;
  get schema(): {
    KEY_PROPERTY: OrderableEdmTypeField<
      TestEntityCircularLinkParent<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property {@link toFirstChild} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_FIRST_CHILD: OneToOneLink<
      TestEntityCircularLinkParent<DeSerializersT>,
      DeSerializersT,
      TestEntityCircularLinkChildApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-many navigation property {@link toChildren} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_CHILDREN: OneToManyLink<
      TestEntityCircularLinkParent<DeSerializersT>,
      DeSerializersT,
      TestEntityCircularLinkChildApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<TestEntityCircularLinkParent<DeSerializers>>;
  };
}
