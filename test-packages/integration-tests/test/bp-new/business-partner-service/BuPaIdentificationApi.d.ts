import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { BuPaIdentification } from './BuPaIdentification';
import { BuPaIdentificationRequestBuilder } from './BuPaIdentificationRequestBuilder';
export declare class BuPaIdentificationApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<BuPaIdentification<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof BuPaIdentification;
    requestBuilder(): BuPaIdentificationRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<BuPaIdentification<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<BuPaIdentification<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<BuPaIdentification<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[businessPartner]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        BUSINESS_PARTNER: EdmTypeField<BuPaIdentification<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[bpIdentificationType]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BP_IDENTIFICATION_TYPE: EdmTypeField<BuPaIdentification<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[bpIdentificationNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BP_IDENTIFICATION_NUMBER: EdmTypeField<BuPaIdentification<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[bpIdnNmbrIssuingInstitute]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BP_IDN_NMBR_ISSUING_INSTITUTE: EdmTypeField<BuPaIdentification<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[bpIdentificationEntryDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BP_IDENTIFICATION_ENTRY_DATE: OrderableEdmTypeField<BuPaIdentification<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[country]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COUNTRY: EdmTypeField<BuPaIdentification<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[region]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        REGION: EdmTypeField<BuPaIdentification<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[validityStartDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VALIDITY_START_DATE: OrderableEdmTypeField<BuPaIdentification<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[validityEndDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VALIDITY_END_DATE: OrderableEdmTypeField<BuPaIdentification<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', true, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<BuPaIdentification<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=BuPaIdentificationApi.d.ts.map
