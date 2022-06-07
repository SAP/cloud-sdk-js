/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntity } from './TestEntity';
import { TestEntityRequestBuilder } from './TestEntityRequestBuilder';
import { TestEntityMultiLinkApi } from './TestEntityMultiLinkApi';
import { TestEntitySingleLinkApi } from './TestEntitySingleLinkApi';
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
  OneToManyLink,
  OneToOneLink
} from '@sap-cloud-sdk/odata-v4';
export class TestEntityApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntity<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  constructor(deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_MULTI_LINK: OneToManyLink<
      TestEntity<DeSerializersT>,
      DeSerializersT,
      TestEntityMultiLinkApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SINGLE_LINK: OneToOneLink<
      TestEntity<DeSerializersT>,
      DeSerializersT,
      TestEntitySingleLinkApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [
      TestEntityMultiLinkApi<DeSerializersT>,
      TestEntitySingleLinkApi<DeSerializersT>
    ]
  ): this {
    this.navigationPropertyFields = {
      TO_MULTI_LINK: new OneToManyLink('to_MultiLink', this, linkedApis[0]),
      TO_SINGLE_LINK: new OneToOneLink('to_SingleLink', this, linkedApis[1])
    };
    return this;
  }

  entityConstructor = TestEntity;

  requestBuilder(): TestEntityRequestBuilder<DeSerializersT> {
    return new TestEntityRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    TestEntity<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<TestEntity<DeSerializersT>, DeSerializersT, NullableT> {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  private _fieldBuilder?: FieldBuilder<typeof TestEntity, DeSerializersT>;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(TestEntity, this.deSerializers);
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    KEY_PROPERTY_GUID: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Guid',
      false,
      true
    >;
    KEY_PROPERTY_STRING: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    STRING_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      true,
      true
    >;
    BOOLEAN_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Boolean',
      true,
      true
    >;
    INT_16_PROPERTY: OrderableEdmTypeField<
      TestEntity<DeSerializers>,
      DeSerializersT,
      'Edm.Int16',
      true,
      true
    >;
    /**
     * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_MULTI_LINK: OneToManyLink<
      TestEntity<DeSerializersT>,
      DeSerializersT,
      TestEntityMultiLinkApi<DeSerializersT>
    >;
    /**
     * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_SINGLE_LINK: OneToOneLink<
      TestEntity<DeSerializersT>,
      DeSerializersT,
      TestEntitySingleLinkApi<DeSerializersT>
    >;
    ALL_FIELDS: AllFields<TestEntity<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the [[keyPropertyGuid]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY_GUID: fieldBuilder.buildEdmTypeField(
          'KeyPropertyGuid',
          'Edm.Guid',
          false
        ),
        /**
         * Static representation of the [[keyPropertyString]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY_STRING: fieldBuilder.buildEdmTypeField(
          'KeyPropertyString',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the [[stringProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY: fieldBuilder.buildEdmTypeField(
          'StringProperty',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the [[booleanProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY: fieldBuilder.buildEdmTypeField(
          'BooleanProperty',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the [[int16Property]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_16_PROPERTY: fieldBuilder.buildEdmTypeField(
          'Int16Property',
          'Edm.Int16',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', TestEntity)
      };
    }

    return this._schema;
  }
}
