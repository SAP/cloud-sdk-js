import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField, Link, OneToOneLink } from '@sap-cloud-sdk/odata-v2';
import { SupplierCompany } from './SupplierCompany';
import { SupplierCompanyRequestBuilder } from './SupplierCompanyRequestBuilder';
import { SupplierCompanyText } from './SupplierCompanyText';
import { SupplierCompanyTextApi } from './SupplierCompanyTextApi';
import { Supplier } from './Supplier';
import { SupplierApi } from './SupplierApi';
import { SupplierDunning } from './SupplierDunning';
import { SupplierDunningApi } from './SupplierDunningApi';
import { SupplierWithHoldingTax } from './SupplierWithHoldingTax';
import { SupplierWithHoldingTaxApi } from './SupplierWithHoldingTaxApi';
export declare class SupplierCompanyApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<SupplierCompany<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
        SupplierCompanyTextApi<DeSerializersT>,
        SupplierApi<DeSerializersT>,
        SupplierDunningApi<DeSerializersT>,
        SupplierWithHoldingTaxApi<DeSerializersT>
    ]): this;
    entityConstructor: typeof SupplierCompany;
    requestBuilder(): SupplierCompanyRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<SupplierCompany<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<SupplierCompany<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
         * Static representation of the one-to-many navigation property [[toCompanyText]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_COMPANY_TEXT: Link<SupplierCompany<DeSerializersT>, DeSerializersT, SupplierCompanyText<DeSerializersT>>;
        /**
         * Static representation of the one-to-one navigation property [[toSupplier]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_SUPPLIER: OneToOneLink<SupplierCompany<DeSerializersT>, DeSerializersT, Supplier<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toSupplierDunning]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_SUPPLIER_DUNNING: Link<SupplierCompany<DeSerializersT>, DeSerializersT, SupplierDunning<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toSupplierWithHoldingTax]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_SUPPLIER_WITH_HOLDING_TAX: Link<SupplierCompany<DeSerializersT>, DeSerializersT, SupplierWithHoldingTax<DeSerializersT>>;
        /**
     * Static representation of the [[supplier]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        SUPPLIER: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[companyCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPANY_CODE: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[companyCodeName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPANY_CODE_NAME: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[paymentBlockingReason]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_BLOCKING_REASON: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierIsBlockedForPosting]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_IS_BLOCKED_FOR_POSTING: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[accountingClerk]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACCOUNTING_CLERK: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[accountingClerkFaxNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACCOUNTING_CLERK_FAX_NUMBER: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[accountingClerkPhoneNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ACCOUNTING_CLERK_PHONE_NUMBER: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierClerk]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_CLERK: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierClerkUrl]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_CLERK_URL: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[paymentMethodsList]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_METHODS_LIST: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[paymentTerms]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_TERMS: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[clearCustomerSupplier]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CLEAR_CUSTOMER_SUPPLIER: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[isToBeLocallyProcessed]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_TO_BE_LOCALLY_PROCESSED: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[itemIsToBePaidSeparately]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ITEM_IS_TO_BE_PAID_SEPARATELY: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[paymentIsToBeSentByEdi]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_IS_TO_BE_SENT_BY_EDI: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[houseBank]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        HOUSE_BANK: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[checkPaidDurationInDays]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CHECK_PAID_DURATION_IN_DAYS: OrderableEdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Decimal', true, true>;
        /**
         * Static representation of the [[currency]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CURRENCY: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[billOfExchLmtAmtInCoCodeCrcy]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BILL_OF_EXCH_LMT_AMT_IN_CO_CODE_CRCY: OrderableEdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Decimal', true, true>;
        /**
         * Static representation of the [[supplierClerkIdBySupplier]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_CLERK_ID_BY_SUPPLIER: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[reconciliationAccount]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RECONCILIATION_ACCOUNT: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[interestCalculationCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTEREST_CALCULATION_CODE: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[interestCalculationDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTEREST_CALCULATION_DATE: OrderableEdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[intrstCalcFrequencyInMonths]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTRST_CALC_FREQUENCY_IN_MONTHS: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierHeadOffice]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_HEAD_OFFICE: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[alternativePayee]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ALTERNATIVE_PAYEE: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[layoutSortingRule]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LAYOUT_SORTING_RULE: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[aparToleranceGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        APAR_TOLERANCE_GROUP: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierCertificationDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_CERTIFICATION_DATE: OrderableEdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[supplierAccountNote]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_ACCOUNT_NOTE: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[withholdingTaxCountry]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WITHHOLDING_TAX_COUNTRY: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[deletionIndicator]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DELETION_INDICATOR: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[cashPlanningGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CASH_PLANNING_GROUP: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[isToBeCheckedForDuplicates]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_TO_BE_CHECKED_FOR_DUPLICATES: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[minorityGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        MINORITY_GROUP: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierAccountGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_ACCOUNT_GROUP: EdmTypeField<SupplierCompany<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=SupplierCompanyApi.d.ts.map
