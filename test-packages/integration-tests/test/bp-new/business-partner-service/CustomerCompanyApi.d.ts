import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField, Link } from '@sap-cloud-sdk/odata-v2';
import { CustomerCompany } from './CustomerCompany';
import { CustomerCompanyRequestBuilder } from './CustomerCompanyRequestBuilder';
import { CustomerCompanyText } from './CustomerCompanyText';
import { CustomerCompanyTextApi } from './CustomerCompanyTextApi';
import { CustomerDunning } from './CustomerDunning';
import { CustomerDunningApi } from './CustomerDunningApi';
import { CustomerWithHoldingTax } from './CustomerWithHoldingTax';
import { CustomerWithHoldingTaxApi } from './CustomerWithHoldingTaxApi';
export declare class CustomerCompanyApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<CustomerCompany<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
        CustomerCompanyTextApi<DeSerializersT>,
        CustomerDunningApi<DeSerializersT>,
        CustomerWithHoldingTaxApi<DeSerializersT>
    ]): this;
    entityConstructor: typeof CustomerCompany;
    requestBuilder(): CustomerCompanyRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<CustomerCompany<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<CustomerCompany<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
         * Static representation of the one-to-many navigation property [[toCompanyText]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_COMPANY_TEXT: Link<CustomerCompany<DeSerializersT>, DeSerializersT, CustomerCompanyText<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toCustomerDunning]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_CUSTOMER_DUNNING: Link<CustomerCompany<DeSerializersT>, DeSerializersT, CustomerDunning<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toWithHoldingTax]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_WITH_HOLDING_TAX: Link<CustomerCompany<DeSerializersT>, DeSerializersT, CustomerWithHoldingTax<DeSerializersT>>;
        /**
     * Static representation of the [[customer]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        CUSTOMER: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[companyCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPANY_CODE: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[aparToleranceGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        APAR_TOLERANCE_GROUP: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[accountByCustomer]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACCOUNT_BY_CUSTOMER: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[accountingClerk]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACCOUNTING_CLERK: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[accountingClerkFaxNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACCOUNTING_CLERK_FAX_NUMBER: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[accountingClerkInternetAddress]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACCOUNTING_CLERK_INTERNET_ADDRESS: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[accountingClerkPhoneNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACCOUNTING_CLERK_PHONE_NUMBER: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[alternativePayerAccount]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ALTERNATIVE_PAYER_ACCOUNT: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[collectiveInvoiceVariant]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COLLECTIVE_INVOICE_VARIANT: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerAccountNote]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_ACCOUNT_NOTE: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerHeadOffice]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_HEAD_OFFICE: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerSupplierClearingIsUsed]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_SUPPLIER_CLEARING_IS_USED: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[houseBank]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        HOUSE_BANK: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[interestCalculationCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTEREST_CALCULATION_CODE: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[interestCalculationDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTEREST_CALCULATION_DATE: OrderableEdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[intrstCalcFrequencyInMonths]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTRST_CALC_FREQUENCY_IN_MONTHS: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[isToBeLocallyProcessed]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_TO_BE_LOCALLY_PROCESSED: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[itemIsToBePaidSeparately]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ITEM_IS_TO_BE_PAID_SEPARATELY: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[layoutSortingRule]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LAYOUT_SORTING_RULE: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[paymentBlockingReason]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_BLOCKING_REASON: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[paymentMethodsList]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_METHODS_LIST: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[paymentTerms]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_TERMS: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[paytAdviceIsSentbyEdi]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYT_ADVICE_IS_SENTBY_EDI: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[physicalInventoryBlockInd]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PHYSICAL_INVENTORY_BLOCK_IND: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[reconciliationAccount]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RECONCILIATION_ACCOUNT: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[recordPaymentHistoryIndicator]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RECORD_PAYMENT_HISTORY_INDICATOR: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[userAtCustomer]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        USER_AT_CUSTOMER: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[deletionIndicator]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DELETION_INDICATOR: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[cashPlanningGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CASH_PLANNING_GROUP: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[knownOrNegotiatedLeave]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KNOWN_OR_NEGOTIATED_LEAVE: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[valueAdjustmentKey]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VALUE_ADJUSTMENT_KEY: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[customerAccountGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER_ACCOUNT_GROUP: EdmTypeField<CustomerCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=CustomerCompanyApi.d.ts.map
