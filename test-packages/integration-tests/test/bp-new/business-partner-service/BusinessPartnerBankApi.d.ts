import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { BusinessPartnerBank } from './BusinessPartnerBank';
import { BusinessPartnerBankRequestBuilder } from './BusinessPartnerBankRequestBuilder';
export declare class BusinessPartnerBankApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<BusinessPartnerBank<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof BusinessPartnerBank;
    requestBuilder(): BusinessPartnerBankRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<BusinessPartnerBank<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<BusinessPartnerBank<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[businessPartner]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        BUSINESS_PARTNER: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[bankIdentification]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BANK_IDENTIFICATION: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[bankCountryKey]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BANK_COUNTRY_KEY: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[bankName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BANK_NAME: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[bankNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BANK_NUMBER: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[swiftCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SWIFT_CODE: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[bankControlKey]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BANK_CONTROL_KEY: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[bankAccountHolderName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BANK_ACCOUNT_HOLDER_NAME: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[bankAccountName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BANK_ACCOUNT_NAME: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[validityStartDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VALIDITY_START_DATE: OrderableEdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTimeOffset', true, true>;
        /**
         * Static representation of the [[validityEndDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VALIDITY_END_DATE: OrderableEdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTimeOffset', true, true>;
        /**
         * Static representation of the [[iban]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IBAN: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[ibanValidityStartDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IBAN_VALIDITY_START_DATE: OrderableEdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[bankAccount]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BANK_ACCOUNT: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[bankAccountReferenceText]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BANK_ACCOUNT_REFERENCE_TEXT: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[collectionAuthInd]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COLLECTION_AUTH_IND: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[cityName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CITY_NAME: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<BusinessPartnerBank<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=BusinessPartnerBankApi.d.ts.map
