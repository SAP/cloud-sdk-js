/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity1 } from './TestEntity1';
import { TestEntity1RequestBuilder } from './TestEntity1RequestBuilder';
import { TestComplexType1Field } from './TestComplexType1';
import { TestEnumType1 } from './TestEnumType1';
import {
  CustomField,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField,
  EnumField
} from '@sap-cloud-sdk/odata-v4';
export declare class TestEntity1Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntity1<DeSerializersT>, DeSerializersT> {
  deSerializers: DeSerializersT;
  private constructor();
  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(deSerializers?: DeSerializersT): TestEntity1Api<DeSerializersT>;
  private navigationPropertyFields;
  _addNavigationProperties(linkedApis: []): this;
  entityConstructor: typeof TestEntity1;
  requestBuilder(): TestEntity1RequestBuilder<DeSerializersT>;
  entityBuilder(): EntityBuilderType<
    TestEntity1<DeSerializersT>,
    DeSerializersT
  >;
  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable?: NullableT
  ): CustomField<TestEntity1<DeSerializersT>, DeSerializersT, NullableT>;
  private _fieldBuilder?;
  get fieldBuilder(): FieldBuilder<typeof TestEntity1, DeSerializersT>;
  private _schema?;
  get schema(): {
    KEY_PROPERTY_STRING: OrderableEdmTypeField<
      TestEntity1<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    INT_16_PROPERTY: OrderableEdmTypeField<
      TestEntity1<DeSerializers>,
      DeSerializersT,
      'Edm.Int16',
      true,
      true
    >;
    ENUM_PROPERTY: EnumField<
      TestEntity1<DeSerializers>,
      DeSerializersT,
      TestEnumType1,
      true,
      true
    >;
    COMPLEX_TYPE_PROPERTY: TestComplexType1Field<
      TestEntity1<DeSerializers>,
      DeSerializersT,
      true,
      true
    >;
    ALL_FIELDS: AllFields<TestEntity1<DeSerializers>>;
  };
}
