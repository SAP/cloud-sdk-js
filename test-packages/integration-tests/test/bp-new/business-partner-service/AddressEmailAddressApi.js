"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressEmailAddressApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const AddressEmailAddress_1 = require("./AddressEmailAddress");
const AddressEmailAddressRequestBuilder_1 = require("./AddressEmailAddressRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class AddressEmailAddressApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = AddressEmailAddress_1.AddressEmailAddress;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new AddressEmailAddressRequestBuilder_1.AddressEmailAddressRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(AddressEmailAddress_1.AddressEmailAddress, this.deSerializers);
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
             * Static representation of the [[isDefaultEmailAddress]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            IS_DEFAULT_EMAIL_ADDRESS: fieldBuilder.buildEdmTypeField('IsDefaultEmailAddress', 'Edm.Boolean', true),
            /**
             * Static representation of the [[emailAddress]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            EMAIL_ADDRESS: fieldBuilder.buildEdmTypeField('EmailAddress', 'Edm.String', true),
            /**
             * Static representation of the [[searchEmailAddress]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SEARCH_EMAIL_ADDRESS: fieldBuilder.buildEdmTypeField('SearchEmailAddress', 'Edm.String', true),
            /**
             * Static representation of the [[addressCommunicationRemarkText]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            ADDRESS_COMMUNICATION_REMARK_TEXT: fieldBuilder.buildEdmTypeField('AddressCommunicationRemarkText', 'Edm.String', true),
            ...this.navigationPropertyFields,
            /**
             *
             * All fields selector.
             */
            ALL_FIELDS: new odata_v2_1.AllFields('*', AddressEmailAddress_1.AddressEmailAddress)
        };
    }
}
exports.AddressEmailAddressApi = AddressEmailAddressApi;
//# sourceMappingURL=AddressEmailAddressApi.js.map