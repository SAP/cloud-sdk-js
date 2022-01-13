"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressHomePageUrlApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const AddressHomePageUrl_1 = require("./AddressHomePageUrl");
const AddressHomePageUrlRequestBuilder_1 = require("./AddressHomePageUrlRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class AddressHomePageUrlApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = AddressHomePageUrl_1.AddressHomePageUrl;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new AddressHomePageUrlRequestBuilder_1.AddressHomePageUrlRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(AddressHomePageUrl_1.AddressHomePageUrl, this.deSerializers);
        return {
            /**
         * Static representation of the [[addressId]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            ADDRESS_ID: fieldBuilder.buildEdmTypeField('AddressID', 'Edm.String', false),
            /**
             * Static representation of the [[person]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PERSON: fieldBuilder.buildEdmTypeField('Person', 'Edm.String', false),
            /**
             * Static representation of the [[ordinalNumber]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            ORDINAL_NUMBER: fieldBuilder.buildEdmTypeField('OrdinalNumber', 'Edm.String', false),
            /**
             * Static representation of the [[validityStartDate]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            VALIDITY_START_DATE: fieldBuilder.buildEdmTypeField('ValidityStartDate', 'Edm.DateTime', false),
            /**
             * Static representation of the [[isDefaultUrlAddress]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            IS_DEFAULT_URL_ADDRESS: fieldBuilder.buildEdmTypeField('IsDefaultURLAddress', 'Edm.Boolean', false),
            /**
             * Static representation of the [[searchUrlAddress]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SEARCH_URL_ADDRESS: fieldBuilder.buildEdmTypeField('SearchURLAddress', 'Edm.String', true),
            /**
             * Static representation of the [[addressCommunicationRemarkText]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            ADDRESS_COMMUNICATION_REMARK_TEXT: fieldBuilder.buildEdmTypeField('AddressCommunicationRemarkText', 'Edm.String', true),
            /**
             * Static representation of the [[urlFieldLength]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            URL_FIELD_LENGTH: fieldBuilder.buildEdmTypeField('URLFieldLength', 'Edm.Int16', true),
            /**
             * Static representation of the [[websiteUrl]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            WEBSITE_URL: fieldBuilder.buildEdmTypeField('WebsiteURL', 'Edm.String', true),
            ...this.navigationPropertyFields,
            /**
             *
             * All fields selector.
             */
            ALL_FIELDS: new odata_v2_1.AllFields('*', AddressHomePageUrl_1.AddressHomePageUrl)
        };
    }
}
exports.AddressHomePageUrlApi = AddressHomePageUrlApi;
//# sourceMappingURL=AddressHomePageUrlApi.js.map