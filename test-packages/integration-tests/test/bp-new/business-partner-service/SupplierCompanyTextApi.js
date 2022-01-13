"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierCompanyTextApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SupplierCompanyText_1 = require("./SupplierCompanyText");
const SupplierCompanyTextRequestBuilder_1 = require("./SupplierCompanyTextRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class SupplierCompanyTextApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = SupplierCompanyText_1.SupplierCompanyText;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new SupplierCompanyTextRequestBuilder_1.SupplierCompanyTextRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(SupplierCompanyText_1.SupplierCompanyText, this.deSerializers);
        return {
            /**
         * Static representation of the [[supplier]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            SUPPLIER: fieldBuilder.buildEdmTypeField('Supplier', 'Edm.String', false),
            /**
             * Static representation of the [[companyCode]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            COMPANY_CODE: fieldBuilder.buildEdmTypeField('CompanyCode', 'Edm.String', false),
            /**
             * Static representation of the [[language]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            LANGUAGE: fieldBuilder.buildEdmTypeField('Language', 'Edm.String', false),
            /**
             * Static representation of the [[longTextId]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            LONG_TEXT_ID: fieldBuilder.buildEdmTypeField('LongTextID', 'Edm.String', false),
            /**
             * Static representation of the [[longText]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            LONG_TEXT: fieldBuilder.buildEdmTypeField('LongText', 'Edm.String', true),
            ...this.navigationPropertyFields,
            /**
             *
             * All fields selector.
             */
            ALL_FIELDS: new odata_v2_1.AllFields('*', SupplierCompanyText_1.SupplierCompanyText)
        };
    }
}
exports.SupplierCompanyTextApi = SupplierCompanyTextApi;
//# sourceMappingURL=SupplierCompanyTextApi.js.map