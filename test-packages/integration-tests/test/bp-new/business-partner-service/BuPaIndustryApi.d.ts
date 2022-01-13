import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { BuPaIndustry } from './BuPaIndustry';
import { BuPaIndustryRequestBuilder } from './BuPaIndustryRequestBuilder';
export declare class BuPaIndustryApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<BuPaIndustry<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof BuPaIndustry;
    requestBuilder(): BuPaIndustryRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<BuPaIndustry<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<BuPaIndustry<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<BuPaIndustry<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[industrySector]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        INDUSTRY_SECTOR: EdmTypeField<BuPaIndustry<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[industrySystemType]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INDUSTRY_SYSTEM_TYPE: EdmTypeField<BuPaIndustry<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[businessPartner]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BUSINESS_PARTNER: EdmTypeField<BuPaIndustry<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[isStandardIndustry]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_STANDARD_INDUSTRY: EdmTypeField<BuPaIndustry<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[industryKeyDescription]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INDUSTRY_KEY_DESCRIPTION: EdmTypeField<BuPaIndustry<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=BuPaIndustryApi.d.ts.map
