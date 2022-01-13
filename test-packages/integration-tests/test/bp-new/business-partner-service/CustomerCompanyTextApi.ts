/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustomerCompanyTextRequestBuilder } from './CustomerCompanyTextRequestBuilder';
import { CustomerCompanyText } from './CustomerCompanyText';
export class CustomerCompanyTextApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      CustomerCompanyText<
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

  entityConstructor = CustomerCompanyText;

  requestBuilder(): CustomerCompanyTextRequestBuilder<
    DeSerializersT
  > {
    return new CustomerCompanyTextRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    CustomerCompanyText<
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
  CustomerCompanyText<
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
    const fieldBuilder = new FieldBuilder(CustomerCompanyText, this.deSerializers);
    return {
    /**
 * Static representation of the [[customer]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUSTOMER: fieldBuilder.buildEdmTypeField('Customer', 'Edm.String', false),
/**
 * Static representation of the [[companyCode]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
COMPANY_CODE: fieldBuilder.buildEdmTypeField('CompanyCode', 'Edm.String', false),
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
ALL_FIELDS: new AllFields('*', CustomerCompanyText)
  };
  }
}
