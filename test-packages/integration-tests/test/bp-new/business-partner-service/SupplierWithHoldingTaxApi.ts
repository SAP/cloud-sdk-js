/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder } from '@sap-cloud-sdk/odata-v2';
import { SupplierWithHoldingTaxRequestBuilder } from './SupplierWithHoldingTaxRequestBuilder';
import { SupplierWithHoldingTax } from './SupplierWithHoldingTax';
export class SupplierWithHoldingTaxApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      SupplierWithHoldingTax<
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

  entityConstructor = SupplierWithHoldingTax;

  requestBuilder(): SupplierWithHoldingTaxRequestBuilder<
    DeSerializersT
  > {
    return new SupplierWithHoldingTaxRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    SupplierWithHoldingTax<
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
  SupplierWithHoldingTax<
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
    const fieldBuilder = new FieldBuilder(SupplierWithHoldingTax, this.deSerializers);
    return {
    /**
 * Static representation of the [[supplier]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
SUPPLIER: fieldBuilder.buildEdmTypeField('Supplier', 'Edm.String', false),
/**
 * Static representation of the [[companyCode]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
COMPANY_CODE: fieldBuilder.buildEdmTypeField('CompanyCode', 'Edm.String', false),
/**
 * Static representation of the [[withholdingTaxType]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
WITHHOLDING_TAX_TYPE: fieldBuilder.buildEdmTypeField('WithholdingTaxType', 'Edm.String', false),
/**
 * Static representation of the [[exemptionDateBegin]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
EXEMPTION_DATE_BEGIN: fieldBuilder.buildEdmTypeField('ExemptionDateBegin', 'Edm.DateTime', true),
/**
 * Static representation of the [[exemptionDateEnd]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
EXEMPTION_DATE_END: fieldBuilder.buildEdmTypeField('ExemptionDateEnd', 'Edm.DateTime', true),
/**
 * Static representation of the [[exemptionReason]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
EXEMPTION_REASON: fieldBuilder.buildEdmTypeField('ExemptionReason', 'Edm.String', true),
/**
 * Static representation of the [[isWithholdingTaxSubject]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IS_WITHHOLDING_TAX_SUBJECT: fieldBuilder.buildEdmTypeField('IsWithholdingTaxSubject', 'Edm.Boolean', true),
/**
 * Static representation of the [[recipientType]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
RECIPIENT_TYPE: fieldBuilder.buildEdmTypeField('RecipientType', 'Edm.String', true),
/**
 * Static representation of the [[withholdingTaxCertificate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
WITHHOLDING_TAX_CERTIFICATE: fieldBuilder.buildEdmTypeField('WithholdingTaxCertificate', 'Edm.String', true),
/**
 * Static representation of the [[withholdingTaxCode]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
WITHHOLDING_TAX_CODE: fieldBuilder.buildEdmTypeField('WithholdingTaxCode', 'Edm.String', true),
/**
 * Static representation of the [[withholdingTaxExmptPercent]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
WITHHOLDING_TAX_EXMPT_PERCENT: fieldBuilder.buildEdmTypeField('WithholdingTaxExmptPercent', 'Edm.Decimal', true),
/**
 * Static representation of the [[withholdingTaxNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
WITHHOLDING_TAX_NUMBER: fieldBuilder.buildEdmTypeField('WithholdingTaxNumber', 'Edm.String', true),
/**
 * Static representation of the [[authorizationGroup]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
AUTHORIZATION_GROUP: fieldBuilder.buildEdmTypeField('AuthorizationGroup', 'Edm.String', true),
...this.navigationPropertyFields,
/**
 *
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', SupplierWithHoldingTax)
  };
  }
}
