/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { Casetest_1 } from './Casetest_1';
import { Casetest_1RequestBuilder } from './Casetest_1RequestBuilder';
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
} from '@sap-cloud-sdk/odata-v2';
export class Casetest_1Api<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> implements EntityApi<Casetest_1<DeSerializersT>, DeSerializersT>
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

  entityConstructor = Casetest_1;

  requestBuilder(): Casetest_1RequestBuilder<DeSerializersT> {
    return new Casetest_1RequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    Casetest_1<DeSerializersT>,
    DeSerializersT
  > {
    return entityBuilder<Casetest_1<DeSerializersT>, DeSerializersT>(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<Casetest_1<DeSerializersT>, DeSerializersT, NullableT> {
    return new CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    ) as any;
  }

  private _fieldBuilder?: FieldBuilder<typeof Casetest_1, DeSerializersT>;
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new FieldBuilder(Casetest_1, this.deSerializers);
    }
    return this._fieldBuilder;
  }

  private _schema?: {
    KEY_PROPERTY_STRING: OrderableEdmTypeField<
      Casetest_1<DeSerializers>,
      DeSerializersT,
      'Edm.String',
      false,
      true
    >;
    ALL_FIELDS: AllFields<Casetest_1<DeSerializers>>;
  };

  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the {@link keyPropertyString} property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY_STRING: fieldBuilder.buildEdmTypeField(
          'KeyPropertyString',
          'Edm.String',
          false
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new AllFields('*', Casetest_1)
      };
    }

    return this._schema;
  }
}
