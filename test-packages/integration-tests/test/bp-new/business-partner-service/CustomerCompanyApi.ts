/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { CustomField, defaultDeSerializers, DefaultDeSerializers, DeSerializers, AllFields, entityBuilder, EntityBuilderType, EntityApi, FieldBuilder, Link } from '@sap-cloud-sdk/odata-v2';
import { CustomerCompany } from './CustomerCompany';
import { CustomerCompanyRequestBuilder } from './CustomerCompanyRequestBuilder';
import { CustomerCompanyText } from './CustomerCompanyText';
import { CustomerCompanyTextApi } from './CustomerCompanyTextApi';
import { CustomerDunning } from './CustomerDunning';
import { CustomerDunningApi } from './CustomerDunningApi';
import { CustomerWithHoldingTax } from './CustomerWithHoldingTax';
import { CustomerWithHoldingTaxApi } from './CustomerWithHoldingTaxApi';
export class CustomerCompanyApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements
    EntityApi<
      CustomerCompany<
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
      /**
       * Static representation of the one-to-many navigation property [[toCompanyText]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_COMPANY_TEXT: Link<
            CustomerCompany<DeSerializersT>,
            DeSerializersT,
            CustomerCompanyText<DeSerializersT>
          >;
      /**
       * Static representation of the one-to-many navigation property [[toCustomerDunning]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_CUSTOMER_DUNNING: Link<
            CustomerCompany<DeSerializersT>,
            DeSerializersT,
            CustomerDunning<DeSerializersT>
          >;
      /**
       * Static representation of the one-to-many navigation property [[toWithHoldingTax]] for query construction.
       * Use to reference this property in query operations such as 'select' in the fluent request API.
       */
      TO_WITH_HOLDING_TAX: Link<
            CustomerCompany<DeSerializersT>,
            DeSerializersT,
            CustomerWithHoldingTax<DeSerializersT>
          >;
    };

  _addNavigationProperties(
      linkedApis: [
        CustomerCompanyTextApi<DeSerializersT>,CustomerDunningApi<DeSerializersT>,CustomerWithHoldingTaxApi<DeSerializersT>
      ]): this {
        this.navigationPropertyFields = {
          TO_COMPANY_TEXT: new Link(
              'to_CompanyText',
              this,
              linkedApis[0]
            ),
          TO_CUSTOMER_DUNNING: new Link(
              'to_CustomerDunning',
              this,
              linkedApis[1]
            ),
          TO_WITH_HOLDING_TAX: new Link(
              'to_WithHoldingTax',
              this,
              linkedApis[2]
            )
        };
        return this;
      }

  entityConstructor = CustomerCompany;

  requestBuilder(): CustomerCompanyRequestBuilder<
    DeSerializersT
  > {
    return new CustomerCompanyRequestBuilder<DeSerializersT>(this);
  }

  entityBuilder(): EntityBuilderType<
    CustomerCompany<
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
  CustomerCompany<
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
    const fieldBuilder = new FieldBuilder(CustomerCompany, this.deSerializers);
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
 * Static representation of the [[aparToleranceGroup]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
APAR_TOLERANCE_GROUP: fieldBuilder.buildEdmTypeField('APARToleranceGroup', 'Edm.String', true),
/**
 * Static representation of the [[accountByCustomer]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ACCOUNT_BY_CUSTOMER: fieldBuilder.buildEdmTypeField('AccountByCustomer', 'Edm.String', true),
/**
 * Static representation of the [[accountingClerk]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ACCOUNTING_CLERK: fieldBuilder.buildEdmTypeField('AccountingClerk', 'Edm.String', true),
/**
 * Static representation of the [[accountingClerkFaxNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ACCOUNTING_CLERK_FAX_NUMBER: fieldBuilder.buildEdmTypeField('AccountingClerkFaxNumber', 'Edm.String', true),
/**
 * Static representation of the [[accountingClerkInternetAddress]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ACCOUNTING_CLERK_INTERNET_ADDRESS: fieldBuilder.buildEdmTypeField('AccountingClerkInternetAddress', 'Edm.String', true),
/**
 * Static representation of the [[accountingClerkPhoneNumber]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ACCOUNTING_CLERK_PHONE_NUMBER: fieldBuilder.buildEdmTypeField('AccountingClerkPhoneNumber', 'Edm.String', true),
/**
 * Static representation of the [[alternativePayerAccount]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ALTERNATIVE_PAYER_ACCOUNT: fieldBuilder.buildEdmTypeField('AlternativePayerAccount', 'Edm.String', true),
/**
 * Static representation of the [[authorizationGroup]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
AUTHORIZATION_GROUP: fieldBuilder.buildEdmTypeField('AuthorizationGroup', 'Edm.String', true),
/**
 * Static representation of the [[collectiveInvoiceVariant]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
COLLECTIVE_INVOICE_VARIANT: fieldBuilder.buildEdmTypeField('CollectiveInvoiceVariant', 'Edm.String', true),
/**
 * Static representation of the [[customerAccountNote]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUSTOMER_ACCOUNT_NOTE: fieldBuilder.buildEdmTypeField('CustomerAccountNote', 'Edm.String', true),
/**
 * Static representation of the [[customerHeadOffice]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUSTOMER_HEAD_OFFICE: fieldBuilder.buildEdmTypeField('CustomerHeadOffice', 'Edm.String', true),
/**
 * Static representation of the [[customerSupplierClearingIsUsed]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUSTOMER_SUPPLIER_CLEARING_IS_USED: fieldBuilder.buildEdmTypeField('CustomerSupplierClearingIsUsed', 'Edm.Boolean', true),
/**
 * Static representation of the [[houseBank]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
HOUSE_BANK: fieldBuilder.buildEdmTypeField('HouseBank', 'Edm.String', true),
/**
 * Static representation of the [[interestCalculationCode]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INTEREST_CALCULATION_CODE: fieldBuilder.buildEdmTypeField('InterestCalculationCode', 'Edm.String', true),
/**
 * Static representation of the [[interestCalculationDate]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INTEREST_CALCULATION_DATE: fieldBuilder.buildEdmTypeField('InterestCalculationDate', 'Edm.DateTime', true),
/**
 * Static representation of the [[intrstCalcFrequencyInMonths]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
INTRST_CALC_FREQUENCY_IN_MONTHS: fieldBuilder.buildEdmTypeField('IntrstCalcFrequencyInMonths', 'Edm.String', true),
/**
 * Static representation of the [[isToBeLocallyProcessed]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
IS_TO_BE_LOCALLY_PROCESSED: fieldBuilder.buildEdmTypeField('IsToBeLocallyProcessed', 'Edm.Boolean', true),
/**
 * Static representation of the [[itemIsToBePaidSeparately]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
ITEM_IS_TO_BE_PAID_SEPARATELY: fieldBuilder.buildEdmTypeField('ItemIsToBePaidSeparately', 'Edm.Boolean', true),
/**
 * Static representation of the [[layoutSortingRule]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
LAYOUT_SORTING_RULE: fieldBuilder.buildEdmTypeField('LayoutSortingRule', 'Edm.String', true),
/**
 * Static representation of the [[paymentBlockingReason]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PAYMENT_BLOCKING_REASON: fieldBuilder.buildEdmTypeField('PaymentBlockingReason', 'Edm.String', true),
/**
 * Static representation of the [[paymentMethodsList]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PAYMENT_METHODS_LIST: fieldBuilder.buildEdmTypeField('PaymentMethodsList', 'Edm.String', true),
/**
 * Static representation of the [[paymentTerms]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PAYMENT_TERMS: fieldBuilder.buildEdmTypeField('PaymentTerms', 'Edm.String', true),
/**
 * Static representation of the [[paytAdviceIsSentbyEdi]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PAYT_ADVICE_IS_SENTBY_EDI: fieldBuilder.buildEdmTypeField('PaytAdviceIsSentbyEDI', 'Edm.Boolean', true),
/**
 * Static representation of the [[physicalInventoryBlockInd]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
PHYSICAL_INVENTORY_BLOCK_IND: fieldBuilder.buildEdmTypeField('PhysicalInventoryBlockInd', 'Edm.Boolean', true),
/**
 * Static representation of the [[reconciliationAccount]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
RECONCILIATION_ACCOUNT: fieldBuilder.buildEdmTypeField('ReconciliationAccount', 'Edm.String', true),
/**
 * Static representation of the [[recordPaymentHistoryIndicator]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
RECORD_PAYMENT_HISTORY_INDICATOR: fieldBuilder.buildEdmTypeField('RecordPaymentHistoryIndicator', 'Edm.Boolean', true),
/**
 * Static representation of the [[userAtCustomer]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
USER_AT_CUSTOMER: fieldBuilder.buildEdmTypeField('UserAtCustomer', 'Edm.String', true),
/**
 * Static representation of the [[deletionIndicator]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
DELETION_INDICATOR: fieldBuilder.buildEdmTypeField('DeletionIndicator', 'Edm.Boolean', true),
/**
 * Static representation of the [[cashPlanningGroup]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CASH_PLANNING_GROUP: fieldBuilder.buildEdmTypeField('CashPlanningGroup', 'Edm.String', true),
/**
 * Static representation of the [[knownOrNegotiatedLeave]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
KNOWN_OR_NEGOTIATED_LEAVE: fieldBuilder.buildEdmTypeField('KnownOrNegotiatedLeave', 'Edm.String', true),
/**
 * Static representation of the [[valueAdjustmentKey]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
VALUE_ADJUSTMENT_KEY: fieldBuilder.buildEdmTypeField('ValueAdjustmentKey', 'Edm.String', true),
/**
 * Static representation of the [[customerAccountGroup]] property for query construction.
 * Use to reference this property in query operations such as 'select' in the fluent request API.
 */
CUSTOMER_ACCOUNT_GROUP: fieldBuilder.buildEdmTypeField('CustomerAccountGroup', 'Edm.String', true),
...this.navigationPropertyFields,
/**
 *
 * All fields selector.
 */
ALL_FIELDS: new AllFields('*', CustomerCompany)
  };
  }
}
