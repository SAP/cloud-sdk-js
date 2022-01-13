"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerTaxGroupingApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const CustomerTaxGrouping_1 = require("./CustomerTaxGrouping");
const CustomerTaxGroupingRequestBuilder_1 = require("./CustomerTaxGroupingRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class CustomerTaxGroupingApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = CustomerTaxGrouping_1.CustomerTaxGrouping;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new CustomerTaxGroupingRequestBuilder_1.CustomerTaxGroupingRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(CustomerTaxGrouping_1.CustomerTaxGrouping, this.deSerializers);
        return {
            /**
         * Static representation of the [[customer]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            CUSTOMER: fieldBuilder.buildEdmTypeField('Customer', 'Edm.String', false),
            /**
             * Static representation of the [[customerTaxGroupingCode]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CUSTOMER_TAX_GROUPING_CODE: fieldBuilder.buildEdmTypeField('CustomerTaxGroupingCode', 'Edm.String', false),
            /**
             * Static representation of the [[custTaxGrpExemptionCertificate]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CUST_TAX_GRP_EXEMPTION_CERTIFICATE: fieldBuilder.buildEdmTypeField('CustTaxGrpExemptionCertificate', 'Edm.String', true),
            /**
             * Static representation of the [[custTaxGroupExemptionRate]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CUST_TAX_GROUP_EXEMPTION_RATE: fieldBuilder.buildEdmTypeField('CustTaxGroupExemptionRate', 'Edm.Decimal', true),
            /**
             * Static representation of the [[custTaxGroupExemptionStartDate]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CUST_TAX_GROUP_EXEMPTION_START_DATE: fieldBuilder.buildEdmTypeField('CustTaxGroupExemptionStartDate', 'Edm.DateTime', true),
            /**
             * Static representation of the [[custTaxGroupExemptionEndDate]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CUST_TAX_GROUP_EXEMPTION_END_DATE: fieldBuilder.buildEdmTypeField('CustTaxGroupExemptionEndDate', 'Edm.DateTime', true),
            /**
             * Static representation of the [[custTaxGroupSubjectedStartDate]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CUST_TAX_GROUP_SUBJECTED_START_DATE: fieldBuilder.buildEdmTypeField('CustTaxGroupSubjectedStartDate', 'Edm.DateTime', true),
            /**
             * Static representation of the [[custTaxGroupSubjectedEndDate]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CUST_TAX_GROUP_SUBJECTED_END_DATE: fieldBuilder.buildEdmTypeField('CustTaxGroupSubjectedEndDate', 'Edm.DateTime', true),
            ...this.navigationPropertyFields,
            /**
             *
             * All fields selector.
             */
            ALL_FIELDS: new odata_v2_1.AllFields('*', CustomerTaxGrouping_1.CustomerTaxGrouping)
        };
    }
}
exports.CustomerTaxGroupingApi = CustomerTaxGroupingApi;
//# sourceMappingURL=CustomerTaxGroupingApi.js.map