"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPartnerAddressApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const BusinessPartnerAddress_1 = require("./BusinessPartnerAddress");
const BusinessPartnerAddressRequestBuilder_1 = require("./BusinessPartnerAddressRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class BusinessPartnerAddressApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = BusinessPartnerAddress_1.BusinessPartnerAddress;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_ADDRESS_USAGE: new odata_v2_1.Link('to_AddressUsage', this, linkedApis[0]),
            TO_EMAIL_ADDRESS: new odata_v2_1.Link('to_EmailAddress', this, linkedApis[1]),
            TO_FAX_NUMBER: new odata_v2_1.Link('to_FaxNumber', this, linkedApis[2]),
            TO_MOBILE_PHONE_NUMBER: new odata_v2_1.Link('to_MobilePhoneNumber', this, linkedApis[3]),
            TO_PHONE_NUMBER: new odata_v2_1.Link('to_PhoneNumber', this, linkedApis[4]),
            TO_URL_ADDRESS: new odata_v2_1.Link('to_URLAddress', this, linkedApis[5])
        };
        return this;
    }
    requestBuilder() {
        return new BusinessPartnerAddressRequestBuilder_1.BusinessPartnerAddressRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(BusinessPartnerAddress_1.BusinessPartnerAddress, this.deSerializers);
        return {
            /**
         * Static representation of the [[businessPartner]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            BUSINESS_PARTNER: fieldBuilder.buildEdmTypeField('BusinessPartner', 'Edm.String', false),
            /**
             * Static representation of the [[addressId]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            ADDRESS_ID: fieldBuilder.buildEdmTypeField('AddressID', 'Edm.String', false),
            /**
             * Static representation of the [[validityStartDate]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            VALIDITY_START_DATE: fieldBuilder.buildEdmTypeField('ValidityStartDate', 'Edm.DateTimeOffset', true),
            /**
             * Static representation of the [[validityEndDate]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            VALIDITY_END_DATE: fieldBuilder.buildEdmTypeField('ValidityEndDate', 'Edm.DateTimeOffset', true),
            /**
             * Static representation of the [[authorizationGroup]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            AUTHORIZATION_GROUP: fieldBuilder.buildEdmTypeField('AuthorizationGroup', 'Edm.String', true),
            /**
             * Static representation of the [[addressUuid]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            ADDRESS_UUID: fieldBuilder.buildEdmTypeField('AddressUUID', 'Edm.Guid', true),
            /**
             * Static representation of the [[additionalStreetPrefixName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            ADDITIONAL_STREET_PREFIX_NAME: fieldBuilder.buildEdmTypeField('AdditionalStreetPrefixName', 'Edm.String', true),
            /**
             * Static representation of the [[additionalStreetSuffixName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            ADDITIONAL_STREET_SUFFIX_NAME: fieldBuilder.buildEdmTypeField('AdditionalStreetSuffixName', 'Edm.String', true),
            /**
             * Static representation of the [[addressTimeZone]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            ADDRESS_TIME_ZONE: fieldBuilder.buildEdmTypeField('AddressTimeZone', 'Edm.String', true),
            /**
             * Static representation of the [[careOfName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CARE_OF_NAME: fieldBuilder.buildEdmTypeField('CareOfName', 'Edm.String', true),
            /**
             * Static representation of the [[cityCode]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CITY_CODE: fieldBuilder.buildEdmTypeField('CityCode', 'Edm.String', true),
            /**
             * Static representation of the [[cityName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CITY_NAME: fieldBuilder.buildEdmTypeField('CityName', 'Edm.String', true),
            /**
             * Static representation of the [[companyPostalCode]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            COMPANY_POSTAL_CODE: fieldBuilder.buildEdmTypeField('CompanyPostalCode', 'Edm.String', true),
            /**
             * Static representation of the [[country]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            COUNTRY: fieldBuilder.buildEdmTypeField('Country', 'Edm.String', true),
            /**
             * Static representation of the [[county]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            COUNTY: fieldBuilder.buildEdmTypeField('County', 'Edm.String', true),
            /**
             * Static representation of the [[deliveryServiceNumber]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            DELIVERY_SERVICE_NUMBER: fieldBuilder.buildEdmTypeField('DeliveryServiceNumber', 'Edm.String', true),
            /**
             * Static representation of the [[deliveryServiceTypeCode]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            DELIVERY_SERVICE_TYPE_CODE: fieldBuilder.buildEdmTypeField('DeliveryServiceTypeCode', 'Edm.String', true),
            /**
             * Static representation of the [[district]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            DISTRICT: fieldBuilder.buildEdmTypeField('District', 'Edm.String', true),
            /**
             * Static representation of the [[formOfAddress]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            FORM_OF_ADDRESS: fieldBuilder.buildEdmTypeField('FormOfAddress', 'Edm.String', true),
            /**
             * Static representation of the [[fullName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            FULL_NAME: fieldBuilder.buildEdmTypeField('FullName', 'Edm.String', true),
            /**
             * Static representation of the [[homeCityName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            HOME_CITY_NAME: fieldBuilder.buildEdmTypeField('HomeCityName', 'Edm.String', true),
            /**
             * Static representation of the [[houseNumber]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            HOUSE_NUMBER: fieldBuilder.buildEdmTypeField('HouseNumber', 'Edm.String', true),
            /**
             * Static representation of the [[houseNumberSupplementText]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            HOUSE_NUMBER_SUPPLEMENT_TEXT: fieldBuilder.buildEdmTypeField('HouseNumberSupplementText', 'Edm.String', true),
            /**
             * Static representation of the [[language]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            LANGUAGE: fieldBuilder.buildEdmTypeField('Language', 'Edm.String', true),
            /**
             * Static representation of the [[poBox]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PO_BOX: fieldBuilder.buildEdmTypeField('POBox', 'Edm.String', true),
            /**
             * Static representation of the [[poBoxDeviatingCityName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PO_BOX_DEVIATING_CITY_NAME: fieldBuilder.buildEdmTypeField('POBoxDeviatingCityName', 'Edm.String', true),
            /**
             * Static representation of the [[poBoxDeviatingCountry]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PO_BOX_DEVIATING_COUNTRY: fieldBuilder.buildEdmTypeField('POBoxDeviatingCountry', 'Edm.String', true),
            /**
             * Static representation of the [[poBoxDeviatingRegion]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PO_BOX_DEVIATING_REGION: fieldBuilder.buildEdmTypeField('POBoxDeviatingRegion', 'Edm.String', true),
            /**
             * Static representation of the [[poBoxIsWithoutNumber]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PO_BOX_IS_WITHOUT_NUMBER: fieldBuilder.buildEdmTypeField('POBoxIsWithoutNumber', 'Edm.Boolean', true),
            /**
             * Static representation of the [[poBoxLobbyName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PO_BOX_LOBBY_NAME: fieldBuilder.buildEdmTypeField('POBoxLobbyName', 'Edm.String', true),
            /**
             * Static representation of the [[poBoxPostalCode]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PO_BOX_POSTAL_CODE: fieldBuilder.buildEdmTypeField('POBoxPostalCode', 'Edm.String', true),
            /**
             * Static representation of the [[person]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PERSON: fieldBuilder.buildEdmTypeField('Person', 'Edm.String', true),
            /**
             * Static representation of the [[postalCode]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            POSTAL_CODE: fieldBuilder.buildEdmTypeField('PostalCode', 'Edm.String', true),
            /**
             * Static representation of the [[prfrdCommMediumType]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PRFRD_COMM_MEDIUM_TYPE: fieldBuilder.buildEdmTypeField('PrfrdCommMediumType', 'Edm.String', true),
            /**
             * Static representation of the [[region]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            REGION: fieldBuilder.buildEdmTypeField('Region', 'Edm.String', true),
            /**
             * Static representation of the [[streetName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            STREET_NAME: fieldBuilder.buildEdmTypeField('StreetName', 'Edm.String', true),
            /**
             * Static representation of the [[streetPrefixName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            STREET_PREFIX_NAME: fieldBuilder.buildEdmTypeField('StreetPrefixName', 'Edm.String', true),
            /**
             * Static representation of the [[streetSuffixName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            STREET_SUFFIX_NAME: fieldBuilder.buildEdmTypeField('StreetSuffixName', 'Edm.String', true),
            /**
             * Static representation of the [[taxJurisdiction]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            TAX_JURISDICTION: fieldBuilder.buildEdmTypeField('TaxJurisdiction', 'Edm.String', true),
            /**
             * Static representation of the [[transportZone]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            TRANSPORT_ZONE: fieldBuilder.buildEdmTypeField('TransportZone', 'Edm.String', true),
            /**
             * Static representation of the [[addressIdByExternalSystem]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            ADDRESS_ID_BY_EXTERNAL_SYSTEM: fieldBuilder.buildEdmTypeField('AddressIDByExternalSystem', 'Edm.String', true),
            /**
             * Static representation of the [[countyCode]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            COUNTY_CODE: fieldBuilder.buildEdmTypeField('CountyCode', 'Edm.String', true),
            /**
             * Static representation of the [[townshipCode]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            TOWNSHIP_CODE: fieldBuilder.buildEdmTypeField('TownshipCode', 'Edm.String', true),
            /**
             * Static representation of the [[townshipName]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            TOWNSHIP_NAME: fieldBuilder.buildEdmTypeField('TownshipName', 'Edm.String', true),
            ...this.navigationPropertyFields,
            /**
             *
             * All fields selector.
             */
            ALL_FIELDS: new odata_v2_1.AllFields('*', BusinessPartnerAddress_1.BusinessPartnerAddress)
        };
    }
}
exports.BusinessPartnerAddressApi = BusinessPartnerAddressApi;
//# sourceMappingURL=BusinessPartnerAddressApi.js.map