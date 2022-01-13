/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustomerSalesAreaTextRequestBuilder } from './CustomerSalesAreaTextRequestBuilder';
import { CustomerSalesAreaText } from './CustomerSalesAreaText';
export class CustomerSalesAreaTextApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      CustomerSalesAreaText<
        DeSerializersT
      >,
      DeSerializersT
    > {
  public deSerializers: DeSerializersT;

  constructor(
    deSerializers: DeSerializersT = defaultDeSerializers as any) {
    this.deSerializers = deSerializers;
  }

  private navigationPropertyFields!: {

    };

  _addNavigationProperties(
      linkedApis: [

      ]): this {
        this.navigationPropertyFields = {

        };
        return this;
      }

  entityConstructor = CustomerSalesAreaText;

  requestBuilder(): CustomerSalesAreaTextRequestBuilder<
    DeSerializersT
  > {
    return new CustomerSalesAreaTextRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    CustomerSalesAreaText<
      DeSerializersT
    >,
    DeSerializersT
  > {
    return entityBuilder(this);
  }

  customField<NullableT extends boolean = false>(
    fieldName: string,
    isNullable: NullableT = false as NullableT
  ): CustomField<
  CustomerSalesAreaText<
      DeSerializersT>,
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

  get schema() {
    const fieldBuilder = new FieldBuilder(CustomerSalesAreaText, this.deSerializers);
    return {
    /**
 * Static representation of the [[customer]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUSTOMER: fieldBuilder.buildEdmTypeField('Customer', 'Edm.String', false),
/**
 * Static representation of the [[salesOrganization]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SALES_ORGANIZATION: fieldBuilder.buildEdmTypeField('SalesOrganization', 'Edm.String', false),
/**
 * Static representation of the [[distributionChannel]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DISTRIBUTION_CHANNEL: fieldBuilder.buildEdmTypeField('DistributionChannel', 'Edm.String', false),
/**
 * Static representation of the [[division]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DIVISION: fieldBuilder.buildEdmTypeField('Division', 'Edm.String', false),
/**
 * Static representation of the [[language]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LANGUAGE: fieldBuilder.buildEdmTypeField('Language', 'Edm.String', false),
/**
 * Static representation of the [[longTextId]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LONG_TEXT_ID: fieldBuilder.buildEdmTypeField('LongTextID', 'Edm.String', false),
/**
 * Static representation of the [[longText]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LONG_TEXT: fieldBuilder.buildEdmTypeField('LongText', 'Edm.String', true),
...this.navigationPropertyFields,
/**
 *
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', CustomerSalesAreaText)
  };
  }
}
