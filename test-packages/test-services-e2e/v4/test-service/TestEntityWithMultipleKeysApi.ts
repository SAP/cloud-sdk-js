/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityWithMultipleKeys } from './TestEntityWithMultipleKeys';
import { TestEntityWithMultipleKeysRequestBuilder } from './TestEntityWithMultipleKeysRequestBuilder';
import {
  CustomField,
  defaultDeSerializers,
  DefaultDeSerializers,
  DeSerializers,
  AllFields,
  entityBuilder,
  EntityBuilderType,
  EntityApi,
  FieldBuilder,
  OrderableEdmTypeField
} from '@sap-cloud-sdk/odata-v4';
export class TestEntityWithMultipleKeysApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<TestEntityWithMultipleKeys<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  constructor(deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = TestEntityWithMultipleKeys;

  requestBuilder(): TestEntityWithMultipleKeysRequestBuilder<DeSerializersT> {
    return new TestEntityWithMultipleKeysRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      TestEntityWithMultipleKeys<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    TestEntityWithMultipleKeys<DeSerializersT>,
    DeSerializersT,
    NullableT
  > {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  private _fieldBuilder?: FieldBuilder<
    typeof TestEntityWithMultipleKeys,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        TestEntityWithMultipleKeys,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    KEY_TEST_ENTITY_WITH_MULTIPLE_KEYS: OrderableEdmTypeField<
      TestEntityWithMultipleKeys<DeSerializers>,
      DeSerializersT,
      'Edm.Int32',
      false,
      true
    >;
    STRING_PROPERTY_WITH_MULTIPLE_KEYS: OrderableEdmTypeField<
      TestEntityWithMultipleKeys<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    BOOLEAN_PROPERTY_WITH_MULTIPLE_KEYS: OrderableEdmTypeField<
      TestEntityWithMultipleKeys<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      false,
      true
    >;
    ALL_FIELDS: AllFields<TestEntityWithMultipleKeys<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link keyTestEntityWithMultipleKeys} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_TEST_ENTITY_WITH_MULTIPLE_KEYS: fieldBuilder.buildEdmTypeField(
          'KeyTestEntityWithMultipleKeys',
          'Edm.Int32',
          false
        ),
        /**
         * Static representation of the {@link stringPropertyWithMultipleKeys} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY_WITH_MULTIPLE_KEYS: fieldBuilder.buildEdmTypeField(
          'StringPropertyWithMultipleKeys',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the {@link booleanPropertyWithMultipleKeys} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY_WITH_MULTIPLE_KEYS: fieldBuilder.buildEdmTypeField(
          'BooleanPropertyWithMultipleKeys',
          'Edm.Boolean',
          false
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', TestEntityWithMultipleKeys)
      };
    }

    return this._schema;
  }
}
