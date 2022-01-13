import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField, Link } from '@sap-cloud-sdk/odata-v2';
import { Supplier } from './Supplier';
import { SupplierRequestBuilder } from './SupplierRequestBuilder';
import { SupplierCompany } from './SupplierCompany';
import { SupplierCompanyApi } from './SupplierCompanyApi';
import { SupplierPurchasingOrg } from './SupplierPurchasingOrg';
import { SupplierPurchasingOrgApi } from './SupplierPurchasingOrgApi';
import { SupplierText } from './SupplierText';
import { SupplierTextApi } from './SupplierTextApi';
export declare class SupplierApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<Supplier<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
        SupplierCompanyApi<DeSerializersT>,
        SupplierPurchasingOrgApi<DeSerializersT>,
        SupplierTextApi<DeSerializersT>
    ]): this;
    entityConstructor: typeof Supplier;
    requestBuilder(): SupplierRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<Supplier<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<Supplier<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
         * Static representation of the one-to-many navigation property [[toSupplierCompany]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_SUPPLIER_COMPANY: Link<Supplier<DeSerializersT>, DeSerializersT, SupplierCompany<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toSupplierPurchasingOrg]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_SUPPLIER_PURCHASING_ORG: Link<Supplier<DeSerializersT>, DeSerializersT, SupplierPurchasingOrg<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toSupplierText]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_SUPPLIER_TEXT: Link<Supplier<DeSerializersT>, DeSerializersT, SupplierText<DeSerializersT>>;
        /**
     * Static representation of the [[supplier]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        SUPPLIER: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[alternativePayeeAccountNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ALTERNATIVE_PAYEE_ACCOUNT_NUMBER: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[createdByUser]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CREATED_BY_USER: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[creationDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CREATION_DATE: OrderableEdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[customer]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CUSTOMER: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[paymentIsBlockedForSupplier]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PAYMENT_IS_BLOCKED_FOR_SUPPLIER: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[postingIsBlocked]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        POSTING_IS_BLOCKED: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[purchasingIsBlocked]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PURCHASING_IS_BLOCKED: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[supplierAccountGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_ACCOUNT_GROUP: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierFullName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_FULL_NAME: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_NAME: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[vatRegistration]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VAT_REGISTRATION: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[birthDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BIRTH_DATE: OrderableEdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[concatenatedInternationalLocNo]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CONCATENATED_INTERNATIONAL_LOC_NO: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[deletionIndicator]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DELETION_INDICATOR: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[fiscalAddress]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FISCAL_ADDRESS: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[industry]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INDUSTRY: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[internationalLocationNumber1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTERNATIONAL_LOCATION_NUMBER_1: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[internationalLocationNumber2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTERNATIONAL_LOCATION_NUMBER_2: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[internationalLocationNumber3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTERNATIONAL_LOCATION_NUMBER_3: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[isNaturalPerson]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_NATURAL_PERSON: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[responsibleType]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        RESPONSIBLE_TYPE: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[suplrQltyInProcmtCertfnValidTo]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_QLTY_IN_PROCMT_CERTFN_VALID_TO: OrderableEdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[suplrQualityManagementSystem]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_QUALITY_MANAGEMENT_SYSTEM: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierCorporateGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_CORPORATE_GROUP: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[supplierProcurementBlock]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPPLIER_PROCUREMENT_BLOCK: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[taxNumber1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_NUMBER_1: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[taxNumber2]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_NUMBER_2: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[taxNumber3]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_NUMBER_3: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[taxNumber4]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_NUMBER_4: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[taxNumber5]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_NUMBER_5: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[taxNumberResponsible]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_NUMBER_RESPONSIBLE: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[taxNumberType]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_NUMBER_TYPE: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[suplrProofOfDelivRlvtCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SUPLR_PROOF_OF_DELIV_RLVT_CODE: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[brTaxIsSplit]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BR_TAX_IS_SPLIT: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[dataExchangeInstructionKey]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_EXCHANGE_INSTRUCTION_KEY: EdmTypeField<Supplier<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=SupplierApi.d.ts.map
