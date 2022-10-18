/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { TestEntityLvl2MultiLink } from './TestEntityLvl2MultiLink';
import { TestEntityLvl2MultiLinkRequestBuilder } from './TestEntityLvl2MultiLinkRequestBuilder';
import { TestEntityLvl3MultiLinkApi } from './TestEntityLvl3MultiLinkApi';
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
  OneToManyLink
} from '@sap-cloud-sdk/odata-v4';
export class TestEntityLvl2MultiLinkApi<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<TestEntityLvl2MultiLink<DeSerializersT>, DeSerializersT>
{
  public deSerializers: DeSerializersT;

  constructor(deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {
    /**
     * Static representation of the one-to-many navigation property {@link toMultiLink2} for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TO_MULTI_LINK_2: OneToManyLink<
      TestEntityLvl2MultiLink<DeSerializersT>,
      DeSerializersT,
      TestEntityLvl3MultiLinkApi<DeSerializersT>
    >;
  };

  _addNavigationProperties(
    linkedApis: [TestEntityLvl3MultiLinkApi<DeSerializersT>]
  ): this {
    this.navigationPropertyFields = {
      TO_MULTI_LINK_2: new OneToManyLink('to_MultiLink2', this, linkedApis[0])
    };
    return this;
  }

  entityConstructor = TestEntityLvl2MultiLink;

  requestBuilder(): TestEntityLvl2MultiLinkRequestBuilder<DeSerializersT> {
    return new TestEntityLvl2MultiLinkRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    TestEntityLvl2MultiLink<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<
      TestEntityLvl2MultiLink<DeSerializersT>,
      DeSerializersT
    >(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
    TestEntityLvl2MultiLink<DeSerializersT>,
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
    typeof TestEntityLvl2MultiLink,
    DeSerializersT
  >;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(
        TestEntityLvl2MultiLink,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }

  private _schema?: {
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

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link stringProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY: fieldBuilder.buildEdmTypeField(
          'StringProperty',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the {@link booleanProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY: fieldBuilder.buildEdmTypeField(
          'BooleanProperty',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the {@link guidProperty} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY: fieldBuilder.buildEdmTypeField(
          'GuidProperty',
          'Edm.Guid',
          true
        ),
        /**
         * Static representation of the {@link int16Property} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_16_PROPERTY: fieldBuilder.buildEdmTypeField(
          'Int16Property',
          'Edm.Int16',
          true
        ),
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
        ALL_FIELDS: new AllFields('*', TestEntityLvl2MultiLink)
      };
    }

    return this._schema;
  }
}
