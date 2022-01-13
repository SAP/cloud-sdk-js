import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { BusinessPartnerTaxNumber } from './BusinessPartnerTaxNumber';
import { BusinessPartnerTaxNumberRequestBuilder } from './BusinessPartnerTaxNumberRequestBuilder';
export declare class BusinessPartnerTaxNumberApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<BusinessPartnerTaxNumber<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof BusinessPartnerTaxNumber;
    requestBuilder(): BusinessPartnerTaxNumberRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<BusinessPartnerTaxNumber<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<BusinessPartnerTaxNumber<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<BusinessPartnerTaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[businessPartner]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        BUSINESS_PARTNER: EdmTypeField<BusinessPartnerTaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[bpTaxType]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BP_TAX_TYPE: EdmTypeField<BusinessPartnerTaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[bpTaxNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BP_TAX_NUMBER: EdmTypeField<BusinessPartnerTaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[bpTaxLongNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BP_TAX_LONG_NUMBER: EdmTypeField<BusinessPartnerTaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<BusinessPartnerTaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=BusinessPartnerTaxNumberApi.d.ts.map
