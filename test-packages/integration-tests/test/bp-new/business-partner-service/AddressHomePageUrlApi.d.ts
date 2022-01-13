import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { AddressHomePageUrl } from './AddressHomePageUrl';
import { AddressHomePageUrlRequestBuilder } from './AddressHomePageUrlRequestBuilder';
export declare class AddressHomePageUrlApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<AddressHomePageUrl<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof AddressHomePageUrl;
    requestBuilder(): AddressHomePageUrlRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<AddressHomePageUrl<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<AddressHomePageUrl<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<AddressHomePageUrl<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[addressId]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        ADDRESS_ID: EdmTypeField<AddressHomePageUrl<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[person]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PERSON: EdmTypeField<AddressHomePageUrl<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[ordinalNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ORDINAL_NUMBER: EdmTypeField<AddressHomePageUrl<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[validityStartDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VALIDITY_START_DATE: OrderableEdmTypeField<AddressHomePageUrl<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTime', false, true>;
        /**
         * Static representation of the [[isDefaultUrlAddress]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_DEFAULT_URL_ADDRESS: EdmTypeField<AddressHomePageUrl<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', false, true>;
        /**
         * Static representation of the [[searchUrlAddress]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SEARCH_URL_ADDRESS: EdmTypeField<AddressHomePageUrl<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[addressCommunicationRemarkText]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDRESS_COMMUNICATION_REMARK_TEXT: EdmTypeField<AddressHomePageUrl<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[urlFieldLength]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        URL_FIELD_LENGTH: OrderableEdmTypeField<AddressHomePageUrl<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Int16', true, true>;
        /**
         * Static representation of the [[websiteUrl]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        WEBSITE_URL: EdmTypeField<AddressHomePageUrl<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=AddressHomePageUrlApi.d.ts.map
