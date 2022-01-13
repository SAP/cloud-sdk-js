/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { CustomerTaxGroupingRequestBuilder } from './CustomerTaxGroupingRequestBuilder';
import { CustomerTaxGrouping } from './CustomerTaxGrouping';
export class CustomerTaxGroupingApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      CustomerTaxGrouping<
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

  entityConstructor = CustomerTaxGrouping;

  requestBuilder(): CustomerTaxGroupingRequestBuilder<
    DeSerializersT
  > {
    return new CustomerTaxGroupingRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    CustomerTaxGrouping<
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
  CustomerTaxGrouping<
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
    const fieldBuilder = new FieldBuilder(CustomerTaxGrouping, this.deSerializers);
    return {
    /**
 * Static representation of the [[customer]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUSTOMER: fieldBuilder.buildEdmTypeField('Customer', 'Edm.String', false),
/**
 * Static representation of the [[customerTaxGroupingCode]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUSTOMER_TAX_GROUPING_CODE: fieldBuilder.buildEdmTypeField('CustomerTaxGroupingCode', 'Edm.String', false),
/**
 * Static representation of the [[custTaxGrpExemptionCertificate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUST_TAX_GRP_EXEMPTION_CERTIFICATE: fieldBuilder.buildEdmTypeField('CustTaxGrpExemptionCertificate', 'Edm.String', true),
/**
 * Static representation of the [[custTaxGroupExemptionRate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUST_TAX_GROUP_EXEMPTION_RATE: fieldBuilder.buildEdmTypeField('CustTaxGroupExemptionRate', 'Edm.Decimal', true),
/**
 * Static representation of the [[custTaxGroupExemptionStartDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUST_TAX_GROUP_EXEMPTION_START_DATE: fieldBuilder.buildEdmTypeField('CustTaxGroupExemptionStartDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[custTaxGroupExemptionEndDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUST_TAX_GROUP_EXEMPTION_END_DATE: fieldBuilder.buildEdmTypeField('CustTaxGroupExemptionEndDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[custTaxGroupSubjectedStartDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUST_TAX_GROUP_SUBJECTED_START_DATE: fieldBuilder.buildEdmTypeField('CustTaxGroupSubjectedStartDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[custTaxGroupSubjectedEndDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUST_TAX_GROUP_SUBJECTED_END_DATE: fieldBuilder.buildEdmTypeField('CustTaxGroupSubjectedEndDate', 'Edm.DateTime', true),
...this.navigationPropertyFields,
/**
 *
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', CustomerTaxGrouping)
  };
  }
}
