/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityCircularLinkSelf } from './TestEntityCircularLinkSelf';
import { TestEntityCircularLinkSelfRequestBuilder } from './TestEntityCircularLinkSelfRequestBuilder';
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
  OrderableEdmTypeField,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export class TestEntityCircularLinkSelfApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements
    EntityApi<TestEntityCircularLinkSelf<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  constructor(deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-one navigation property [[toSelf]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SELF: OneToOneLink<
      TestEntityCircularLinkSelf<DeSerializersT>,
      DeSerializersT,
      TestEntityCircularLinkSelfApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [TestEntityCircularLinkSelfApi<DeSerializersT>]
  ): this {
    this.navigationPropertyFields = {
      TO_SELF: new OneToOneLink('to_Self', this, linkedApis[0])
    };
    return this;
  }

  entityConstructor = TestEntityCircularLinkSelf;

  requestBuilder(): TestEntityCircularLinkSelfRequestBuilder<DeSerializersT> {
    return new TestEntityCircularLinkSelfRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    TestEntityCircularLinkSelf<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    TestEntityCircularLinkSelf<DeSerializersT>,
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
    typeof TestEntityCircularLinkSelf,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        TestEntityCircularLinkSelf,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    KEY_PROPERTY: OrderableEdmTypeField<
      TestEntityCircularLinkSelf<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    /**
     * Static representation of the one-to-one navigation property [[toSelf]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SELF: OneToOneLink<
      TestEntityCircularLinkSelf<DeSerializersT>,
      DeSerializersT,
      TestEntityCircularLinkSelfApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<TestEntityCircularLinkSelf<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the [[keyProperty]] property for query construction.
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
        ALL_FIELDS: new AllFields('*', TestEntityCircularLinkSelf)
      };
    }

    return this._schema;
  }
}
