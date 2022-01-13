"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPartnerTaxNumberApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const BusinessPartnerTaxNumber_1 = require("./BusinessPartnerTaxNumber");
const BusinessPartnerTaxNumberRequestBuilder_1 = require("./BusinessPartnerTaxNumberRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class BusinessPartnerTaxNumberApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = BusinessPartnerTaxNumber_1.BusinessPartnerTaxNumber;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new BusinessPartnerTaxNumberRequestBuilder_1.BusinessPartnerTaxNumberRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(BusinessPartnerTaxNumber_1.BusinessPartnerTaxNumber, this.deSerializers);
        return {
            /**
         * Static representation of the [[businessPartner]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            BUSINESS_PARTNER: fieldBuilder.buildEdmTypeField('BusinessPartner', 'Edm.String', false),
            /**
             * Static representation of the [[bpTaxType]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            BP_TAX_TYPE: fieldBuilder.buildEdmTypeField('BPTaxType', 'Edm.String', false),
            /**
             * Static representation of the [[bpTaxNumber]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            BP_TAX_NUMBER: fieldBuilder.buildEdmTypeField('BPTaxNumber', 'Edm.String', true),
            /**
             * Static representation of the [[bpTaxLongNumber]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            BP_TAX_LONG_NUMBER: fieldBuilder.buildEdmTypeField('BPTaxLongNumber', 'Edm.String', true),
            /**
             * Static representation of the [[authorizationGroup]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            AUTHORIZATION_GROUP: fieldBuilder.buildEdmTypeField('AuthorizationGroup', 'Edm.String', true),
            ...this.navigationPropertyFields,
            /**
             *
             * All fields selector.
             */
            ALL_FIELDS: new odata_v2_1.AllFields('*', BusinessPartnerTaxNumber_1.BusinessPartnerTaxNumber)
        };
    }
}
exports.BusinessPartnerTaxNumberApi = BusinessPartnerTaxNumberApi;
//# sourceMappingURL=BusinessPartnerTaxNumberApi.js.map