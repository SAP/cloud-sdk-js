"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierCompanyApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SupplierCompany_1 = require("./SupplierCompany");
const SupplierCompanyRequestBuilder_1 = require("./SupplierCompanyRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class SupplierCompanyApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = SupplierCompany_1.SupplierCompany;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_COMPANY_TEXT: new odata_v2_1.Link('to_CompanyText', this, linkedApis[0]),
            TO_SUPPLIER: new odata_v2_1.OneToOneLink('to_Supplier', this, linkedApis[1]),
            TO_SUPPLIER_DUNNING: new odata_v2_1.Link('to_SupplierDunning', this, linkedApis[2]),
            TO_SUPPLIER_WITH_HOLDING_TAX: new odata_v2_1.Link('to_SupplierWithHoldingTax', this, linkedApis[3])
        };
        return this;
    }
    requestBuilder() {
        return new SupplierCompanyRequestBuilder_1.SupplierCompanyRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(SupplierCompany_1.SupplierCompany, this.deSerializers);
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
             * Static representation of the [[authorizationGroup]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            AUTHORIZATION_GROUP: fieldBuilder.buildEdmTypeField('AuthorizationGroup', 'Edm.String', true),
            /**
             * Static representation of the [[companyCodeName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            COMPANY_CODE_NAME: fieldBuilder.buildEdmTypeField('CompanyCodeName', 'Edm.String', true),
            /**
             * Static representation of the [[paymentBlockingReason]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PAYMENT_BLOCKING_REASON: fieldBuilder.buildEdmTypeField('PaymentBlockingReason', 'Edm.String', true),
            /**
             * Static representation of the [[supplierIsBlockedForPosting]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUPPLIER_IS_BLOCKED_FOR_POSTING: fieldBuilder.buildEdmTypeField('SupplierIsBlockedForPosting', 'Edm.Boolean', true),
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
             * Static representation of the [[accountingClerkPhoneNumber]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            ACCOUNTING_CLERK_PHONE_NUMBER: fieldBuilder.buildEdmTypeField('AccountingClerkPhoneNumber', 'Edm.String', true),
            /**
             * Static representation of the [[supplierClerk]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUPPLIER_CLERK: fieldBuilder.buildEdmTypeField('SupplierClerk', 'Edm.String', true),
            /**
             * Static representation of the [[supplierClerkUrl]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUPPLIER_CLERK_URL: fieldBuilder.buildEdmTypeField('SupplierClerkURL', 'Edm.String', true),
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
             * Static representation of the [[clearCustomerSupplier]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CLEAR_CUSTOMER_SUPPLIER: fieldBuilder.buildEdmTypeField('ClearCustomerSupplier', 'Edm.Boolean', true),
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
             * Static representation of the [[paymentIsToBeSentByEdi]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PAYMENT_IS_TO_BE_SENT_BY_EDI: fieldBuilder.buildEdmTypeField('PaymentIsToBeSentByEDI', 'Edm.Boolean', true),
            /**
             * Static representation of the [[houseBank]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            HOUSE_BANK: fieldBuilder.buildEdmTypeField('HouseBank', 'Edm.String', true),
            /**
             * Static representation of the [[checkPaidDurationInDays]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CHECK_PAID_DURATION_IN_DAYS: fieldBuilder.buildEdmTypeField('CheckPaidDurationInDays', 'Edm.Decimal', true),
            /**
             * Static representation of the [[currency]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CURRENCY: fieldBuilder.buildEdmTypeField('Currency', 'Edm.String', true),
            /**
             * Static representation of the [[billOfExchLmtAmtInCoCodeCrcy]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            BILL_OF_EXCH_LMT_AMT_IN_CO_CODE_CRCY: fieldBuilder.buildEdmTypeField('BillOfExchLmtAmtInCoCodeCrcy', 'Edm.Decimal', true),
            /**
             * Static representation of the [[supplierClerkIdBySupplier]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUPPLIER_CLERK_ID_BY_SUPPLIER: fieldBuilder.buildEdmTypeField('SupplierClerkIDBySupplier', 'Edm.String', true),
            /**
             * Static representation of the [[reconciliationAccount]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            RECONCILIATION_ACCOUNT: fieldBuilder.buildEdmTypeField('ReconciliationAccount', 'Edm.String', true),
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
             * Static representation of the [[supplierHeadOffice]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUPPLIER_HEAD_OFFICE: fieldBuilder.buildEdmTypeField('SupplierHeadOffice', 'Edm.String', true),
            /**
             * Static representation of the [[alternativePayee]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            ALTERNATIVE_PAYEE: fieldBuilder.buildEdmTypeField('AlternativePayee', 'Edm.String', true),
            /**
             * Static representation of the [[layoutSortingRule]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            LAYOUT_SORTING_RULE: fieldBuilder.buildEdmTypeField('LayoutSortingRule', 'Edm.String', true),
            /**
             * Static representation of the [[aparToleranceGroup]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            APAR_TOLERANCE_GROUP: fieldBuilder.buildEdmTypeField('APARToleranceGroup', 'Edm.String', true),
            /**
             * Static representation of the [[supplierCertificationDate]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUPPLIER_CERTIFICATION_DATE: fieldBuilder.buildEdmTypeField('SupplierCertificationDate', 'Edm.DateTime', true),
            /**
             * Static representation of the [[supplierAccountNote]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUPPLIER_ACCOUNT_NOTE: fieldBuilder.buildEdmTypeField('SupplierAccountNote', 'Edm.String', true),
            /**
             * Static representation of the [[withholdingTaxCountry]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            WITHHOLDING_TAX_COUNTRY: fieldBuilder.buildEdmTypeField('WithholdingTaxCountry', 'Edm.String', true),
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
             * Static representation of the [[isToBeCheckedForDuplicates]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            IS_TO_BE_CHECKED_FOR_DUPLICATES: fieldBuilder.buildEdmTypeField('IsToBeCheckedForDuplicates', 'Edm.Boolean', true),
            /**
             * Static representation of the [[minorityGroup]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            MINORITY_GROUP: fieldBuilder.buildEdmTypeField('MinorityGroup', 'Edm.String', true),
            /**
             * Static representation of the [[supplierAccountGroup]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUPPLIER_ACCOUNT_GROUP: fieldBuilder.buildEdmTypeField('SupplierAccountGroup', 'Edm.String', true),
            ...this.navigationPropertyFields,
            /**
             *
             * All fields selector.
             */
            ALL_FIELDS: new odata_v2_1.AllFields('*', SupplierCompany_1.SupplierCompany)
        };
    }
}
exports.SupplierCompanyApi = SupplierCompanyApi;
//# sourceMappingURL=SupplierCompanyApi.js.map