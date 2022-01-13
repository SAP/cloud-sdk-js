import { CustomField, DefaultDeSerializers, DeSerializers, AllFields, EntityBuilderType, EntityApi, EdmTypeField, OrderableEdmTypeField, Link } from '@sap-cloud-sdk/odata-v2';
import { BusinessPartnerAddress } from './BusinessPartnerAddress';
import { BusinessPartnerAddressRequestBuilder } from './BusinessPartnerAddressRequestBuilder';
import { BuPaAddressUsage } from './BuPaAddressUsage';
import { BuPaAddressUsageApi } from './BuPaAddressUsageApi';
import { AddressEmailAddress } from './AddressEmailAddress';
import { AddressEmailAddressApi } from './AddressEmailAddressApi';
import { AddressFaxNumber } from './AddressFaxNumber';
import { AddressFaxNumberApi } from './AddressFaxNumberApi';
import { AddressPhoneNumber } from './AddressPhoneNumber';
import { AddressPhoneNumberApi } from './AddressPhoneNumberApi';
import { AddressHomePageUrl } from './AddressHomePageUrl';
import { AddressHomePageUrlApi } from './AddressHomePageUrlApi';
export declare class BusinessPartnerAddressApi<DeSerializersT extends DeSerializers = DefaultDeSerializers> implements EntityApi<BusinessPartnerAddress<DeSerializersT>, DeSerializersT> {
    deSerializers: DeSerializersT;
    constructor(deSerializers?: DeSerializersT);
    private navigationPropertyFields;
    _addNavigationProperties(linkedApis: [
        BuPaAddressUsageApi<DeSerializersT>,
        AddressEmailAddressApi<DeSerializersT>,
        AddressFaxNumberApi<DeSerializersT>,
        AddressPhoneNumberApi<DeSerializersT>,
        AddressPhoneNumberApi<DeSerializersT>,
        AddressHomePageUrlApi<DeSerializersT>
    ]): this;
    entityConstructor: typeof BusinessPartnerAddress;
    requestBuilder(): BusinessPartnerAddressRequestBuilder<DeSerializersT>;
    entityBuilder(): EntityBuilderType<BusinessPartnerAddress<DeSerializersT>, DeSerializersT>;
    customField<NullableT extends boolean = false>(fieldName: string, isNullable?: NullableT): CustomField<BusinessPartnerAddress<DeSerializersT>, DeSerializersT, NullableT>;
    get schema(): {
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: AllFields<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>>;
        /**
         * Static representation of the one-to-many navigation property [[toAddressUsage]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_ADDRESS_USAGE: Link<BusinessPartnerAddress<DeSerializersT>, DeSerializersT, BuPaAddressUsage<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toEmailAddress]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_EMAIL_ADDRESS: Link<BusinessPartnerAddress<DeSerializersT>, DeSerializersT, AddressEmailAddress<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toFaxNumber]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_FAX_NUMBER: Link<BusinessPartnerAddress<DeSerializersT>, DeSerializersT, AddressFaxNumber<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toMobilePhoneNumber]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_MOBILE_PHONE_NUMBER: Link<BusinessPartnerAddress<DeSerializersT>, DeSerializersT, AddressPhoneNumber<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toPhoneNumber]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_PHONE_NUMBER: Link<BusinessPartnerAddress<DeSerializersT>, DeSerializersT, AddressPhoneNumber<DeSerializersT>>;
        /**
         * Static representation of the one-to-many navigation property [[toUrlAddress]] for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TO_URL_ADDRESS: Link<BusinessPartnerAddress<DeSerializersT>, DeSerializersT, AddressHomePageUrl<DeSerializersT>>;
        /**
     * Static representation of the [[businessPartner]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
        BUSINESS_PARTNER: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[addressId]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDRESS_ID: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', false, true>;
        /**
         * Static representation of the [[validityStartDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VALIDITY_START_DATE: OrderableEdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTimeOffset', true, true>;
        /**
         * Static representation of the [[validityEndDate]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        VALIDITY_END_DATE: OrderableEdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.DateTimeOffset', true, true>;
        /**
         * Static representation of the [[authorizationGroup]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AUTHORIZATION_GROUP: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[addressUuid]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDRESS_UUID: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Guid', true, true>;
        /**
         * Static representation of the [[additionalStreetPrefixName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDITIONAL_STREET_PREFIX_NAME: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[additionalStreetSuffixName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDITIONAL_STREET_SUFFIX_NAME: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[addressTimeZone]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDRESS_TIME_ZONE: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[careOfName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CARE_OF_NAME: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[cityCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CITY_CODE: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[cityName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        CITY_NAME: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[companyPostalCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPANY_POSTAL_CODE: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[country]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COUNTRY: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[county]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COUNTY: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[deliveryServiceNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DELIVERY_SERVICE_NUMBER: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[deliveryServiceTypeCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DELIVERY_SERVICE_TYPE_CODE: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[district]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DISTRICT: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[formOfAddress]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FORM_OF_ADDRESS: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[fullName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        FULL_NAME: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[homeCityName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        HOME_CITY_NAME: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[houseNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        HOUSE_NUMBER: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[houseNumberSupplementText]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        HOUSE_NUMBER_SUPPLEMENT_TEXT: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[language]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LANGUAGE: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[poBox]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PO_BOX: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[poBoxDeviatingCityName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PO_BOX_DEVIATING_CITY_NAME: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[poBoxDeviatingCountry]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PO_BOX_DEVIATING_COUNTRY: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[poBoxDeviatingRegion]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PO_BOX_DEVIATING_REGION: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[poBoxIsWithoutNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PO_BOX_IS_WITHOUT_NUMBER: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.Boolean', true, true>;
        /**
         * Static representation of the [[poBoxLobbyName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PO_BOX_LOBBY_NAME: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[poBoxPostalCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PO_BOX_POSTAL_CODE: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[person]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PERSON: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[postalCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        POSTAL_CODE: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[prfrdCommMediumType]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        PRFRD_COMM_MEDIUM_TYPE: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[region]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        REGION: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[streetName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STREET_NAME: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[streetPrefixName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STREET_PREFIX_NAME: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[streetSuffixName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STREET_SUFFIX_NAME: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[taxJurisdiction]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TAX_JURISDICTION: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[transportZone]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TRANSPORT_ZONE: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[addressIdByExternalSystem]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ADDRESS_ID_BY_EXTERNAL_SYSTEM: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[countyCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COUNTY_CODE: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[townshipCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TOWNSHIP_CODE: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
        /**
         * Static representation of the [[townshipName]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TOWNSHIP_NAME: EdmTypeField<BusinessPartnerAddress<DeSerializers<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>>, DeSerializersT, 'Edm.String', true, true>;
    };
}
// # sourceMappingURL=BusinessPartnerAddressApi.d.ts.map
