"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuPaIndustryApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const BuPaIndustry_1 = require("./BuPaIndustry");
const BuPaIndustryRequestBuilder_1 = require("./BuPaIndustryRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class BuPaIndustryApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = BuPaIndustry_1.BuPaIndustry;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new BuPaIndustryRequestBuilder_1.BuPaIndustryRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(BuPaIndustry_1.BuPaIndustry, this.deSerializers);
        return {
            /**
         * Static representation of the [[industrySector]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            INDUSTRY_SECTOR: fieldBuilder.buildEdmTypeField('IndustrySector', 'Edm.String', false),
            /**
             * Static representation of the [[industrySystemType]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            INDUSTRY_SYSTEM_TYPE: fieldBuilder.buildEdmTypeField('IndustrySystemType', 'Edm.String', false),
            /**
             * Static representation of the [[businessPartner]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            BUSINESS_PARTNER: fieldBuilder.buildEdmTypeField('BusinessPartner', 'Edm.String', false),
            /**
             * Static representation of the [[isStandardIndustry]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            IS_STANDARD_INDUSTRY: fieldBuilder.buildEdmTypeField('IsStandardIndustry', 'Edm.String', true),
            /**
             * Static representation of the [[industryKeyDescription]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            INDUSTRY_KEY_DESCRIPTION: fieldBuilder.buildEdmTypeField('IndustryKeyDescription', 'Edm.String', true),
            ...this.navigationPropertyFields,
            /**
             *
             * All fields selector.
             */
            ALL_FIELDS: new odata_v2_1.AllFields('*', BuPaIndustry_1.BuPaIndustry)
        };
    }
}
exports.BuPaIndustryApi = BuPaIndustryApi;
//# sourceMappingURL=BuPaIndustryApi.js.map