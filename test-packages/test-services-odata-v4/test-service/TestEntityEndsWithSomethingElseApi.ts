/*
 * Copyright (c) 2025 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityEndsWithSomethingElse } from './TestEntityEndsWithSomethingElse';
import { TestEntityEndsWithSomethingElseRequestBuilder } from './TestEntityEndsWithSomethingElseRequestBuilder';
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
export class TestEntityEndsWithSomethingElseApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<TestEntityEndsWithSomethingElse<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  private constructor(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ) {
    this.deSerializers = deSerializers;
  }

  /**
   * Do not use this method or the constructor directly.
   * Use the service function as described in the documentation to get an API instance.
   */
  public static _privateFactory<
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >(
    deSerializers: DeSerializersT = defaultDeSerializers as any
  ): TestEntityEndsWithSomethingElseApi<DeSerializersT> {
    return new TestEntityEndsWithSomethingElseApi(deSerializers);
  }

  private navigationPropertyFields!: {};

  _addNavigationProperties(linkedApis: []): this {
    this.navigationPropertyFields = {};
    return this;
  }

  entityConstructor = TestEntityEndsWithSomethingElse;

  requestBuilder(): TestEntityEndsWithSomethingElseRequestBuilder<DeSerializersT> {
    return new TestEntityEndsWithSomethingElseRequestBuilder<DeSerializersT>(
      this
    );
  }

  entityBuilder(): EntityBuilderType<
    TestEntityEndsWithSomethingElse<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      TestEntityEndsWithSomethingElse<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    TestEntityEndsWithSomethingElse<DeSerializersT>,
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
    typeof TestEntityEndsWithSomethingElse,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        TestEntityEndsWithSomethingElse,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    KEY_PROPERTY: OrderableEdmTypeField<
      TestEntityEndsWithSomethingElse<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ALL_FIELDS: AllFields<TestEntityEndsWithSomethingElse<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link keyProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY: fieldBuilder.buildEdmTypeField(
          'KeyProperty',
          'Edm.String',
          false
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', TestEntityEndsWithSomethingElse)
      };
    }

    return this._schema;
  }
}
