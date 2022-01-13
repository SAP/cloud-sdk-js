"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressFaxNumberApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const AddressFaxNumber_1 = require("./AddressFaxNumber");
const AddressFaxNumberRequestBuilder_1 = require("./AddressFaxNumberRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class AddressFaxNumberApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = AddressFaxNumber_1.AddressFaxNumber;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new AddressFaxNumberRequestBuilder_1.AddressFaxNumberRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(AddressFaxNumber_1.AddressFaxNumber, this.deSerializers);
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
             * Static representation of the [[isDefaultFaxNumber]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            IS_DEFAULT_FAX_NUMBER: fieldBuilder.buildEdmTypeField('IsDefaultFaxNumber', 'Edm.Boolean', true),
            /**
             * Static representation of the [[faxCountry]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            FAX_COUNTRY: fieldBuilder.buildEdmTypeField('FaxCountry', 'Edm.String', true),
            /**
             * Static representation of the [[faxNumber]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            FAX_NUMBER: fieldBuilder.buildEdmTypeField('FaxNumber', 'Edm.String', true),
            /**
             * Static representation of the [[faxNumberExtension]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            FAX_NUMBER_EXTENSION: fieldBuilder.buildEdmTypeField('FaxNumberExtension', 'Edm.String', true),
            /**
             * Static representation of the [[internationalFaxNumber]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            INTERNATIONAL_FAX_NUMBER: fieldBuilder.buildEdmTypeField('InternationalFaxNumber', 'Edm.String', true),
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
            ALL_FIELDS: new odata_v2_1.AllFields('*', AddressFaxNumber_1.AddressFaxNumber)
        };
    }
}
exports.AddressFaxNumberApi = AddressFaxNumberApi;
//# sourceMappingURL=AddressFaxNumberApi.js.map