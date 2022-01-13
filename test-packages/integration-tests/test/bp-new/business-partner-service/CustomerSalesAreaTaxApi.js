"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerSalesAreaTaxApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const CustomerSalesAreaTax_1 = require("./CustomerSalesAreaTax");
const CustomerSalesAreaTaxRequestBuilder_1 = require("./CustomerSalesAreaTaxRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class CustomerSalesAreaTaxApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = CustomerSalesAreaTax_1.CustomerSalesAreaTax;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new CustomerSalesAreaTaxRequestBuilder_1.CustomerSalesAreaTaxRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(CustomerSalesAreaTax_1.CustomerSalesAreaTax, this.deSerializers);
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
             * Static representation of the [[departureCountry]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            DEPARTURE_COUNTRY: fieldBuilder.buildEdmTypeField('DepartureCountry', 'Edm.String', false),
            /**
             * Static representation of the [[customerTaxCategory]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CUSTOMER_TAX_CATEGORY: fieldBuilder.buildEdmTypeField('CustomerTaxCategory', 'Edm.String', false),
            /**
             * Static representation of the [[customerTaxClassification]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CUSTOMER_TAX_CLASSIFICATION: fieldBuilder.buildEdmTypeField('CustomerTaxClassification', 'Edm.String', true),
            ...this.navigationPropertyFields,
            /**
             *
             * All fields selector.
             */
            ALL_FIELDS: new odata_v2_1.AllFields('*', CustomerSalesAreaTax_1.CustomerSalesAreaTax)
        };
    }
}
exports.CustomerSalesAreaTaxApi = CustomerSalesAreaTaxApi;
//# sourceMappingURL=CustomerSalesAreaTaxApi.js.map