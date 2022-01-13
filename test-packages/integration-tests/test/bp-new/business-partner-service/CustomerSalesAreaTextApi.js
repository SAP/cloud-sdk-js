"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSalesAreaTextApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const CustomerSalesAreaText_1 = require("./CustomerSalesAreaText");
const CustomerSalesAreaTextRequestBuilder_1 = require("./CustomerSalesAreaTextRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class CustomerSalesAreaTextApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = CustomerSalesAreaText_1.CustomerSalesAreaText;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new CustomerSalesAreaTextRequestBuilder_1.CustomerSalesAreaTextRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(CustomerSalesAreaText_1.CustomerSalesAreaText, this.deSerializers);
        return {
            /**
         * Static representation of the [[customer]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            CUSTOMER: fieldBuilder.buildEdmTypeField('Customer', 'Edm.String', false),
            /**
             * Static representation of the [[salesOrganization]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SALES_ORGANIZATION: fieldBuilder.buildEdmTypeField('SalesOrganization', 'Edm.String', false),
            /**
             * Static representation of the [[distributionChannel]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            DISTRIBUTION_CHANNEL: fieldBuilder.buildEdmTypeField('DistributionChannel', 'Edm.String', false),
            /**
             * Static representation of the [[division]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            DIVISION: fieldBuilder.buildEdmTypeField('Division', 'Edm.String', false),
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
            ALL_FIELDS: new odata_v2_1.AllFields('*', CustomerSalesAreaText_1.CustomerSalesAreaText)
        };
    }
}
exports.CustomerSalesAreaTextApi = CustomerSalesAreaTextApi;
//# sourceMappingURL=CustomerSalesAreaTextApi.js.map