import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField } from '@sap-cloud-sdk/odata-v2';
import { AddressFaxNumber } from './AddressFaxNumber';
import { AddressFaxNumberRequestBuilder } from './AddressFaxNumberRequestBuilder';
export declare class AddressFaxNumberApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<AddressFaxNumber<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
    ]): this;
    entityConstructor: typeof AddressFaxNumber;
    requestBuilder(): AddressFaxNumberRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<AddressFaxNumber<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<AddressFaxNumber<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<AddressFaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
     * Static representation of the [[addressId]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        ADDRESS_ID: EdmTypeField<AddressFaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[person]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PERSON: EdmTypeField<AddressFaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[ordinalNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ORDINAL_NUMBER: EdmTypeField<AddressFaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[isDefaultFaxNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IS_DEFAULT_FAX_NUMBER: EdmTypeField<AddressFaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[faxCountry]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FAX_COUNTRY: EdmTypeField<AddressFaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[faxNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FAX_NUMBER: EdmTypeField<AddressFaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[faxNumberExtension]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FAX_NUMBER_EXTENSION: EdmTypeField<AddressFaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[internationalFaxNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INTERNATIONAL_FAX_NUMBER: EdmTypeField<AddressFaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[addressCommunicationRemarkText]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDRESS_COMMUNICATION_REMARK_TEXT: EdmTypeField<AddressFaxNumber<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=AddressFaxNumberApi.d.ts.map
