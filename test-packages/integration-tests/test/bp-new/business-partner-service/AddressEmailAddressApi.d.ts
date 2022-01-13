import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { AddressEmailAddress } from './AddressEmailAddress';
import { AddressEmailAddressRequestBuilder } from './AddressEmailAddressRequestBuilder';
export declare class AddressEmailAddressApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<AddressEmailAddress<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof AddressEmailAddress;
    requestBuilder(): AddressEmailAddressRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<AddressEmailAddress<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<AddressEmailAddress<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<AddressEmailAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[addressId]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        ADDRESS_ID: EdmTypeField<AddressEmailAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[person]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PERSON: EdmTypeField<AddressEmailAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[ordinalNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ORDINAL_NUMBER: EdmTypeField<AddressEmailAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[isDefaultEmailAddress]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_DEFAULT_EMAIL_ADDRESS: EdmTypeField<AddressEmailAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[emailAddress]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        EMAIL_ADDRESS: EdmTypeField<AddressEmailAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[searchEmailAddress]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SEARCH_EMAIL_ADDRESS: EdmTypeField<AddressEmailAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[addressCommunicationRemarkText]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDRESS_COMMUNICATION_REMARK_TEXT: EdmTypeField<AddressEmailAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=AddressEmailAddressApi.d.ts.map
