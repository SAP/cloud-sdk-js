"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupplierPurchasingOrgTextApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const SupplierPurchasingOrgText_1 = require("./SupplierPurchasingOrgText");
const SupplierPurchasingOrgTextRequestBuilder_1 = require("./SupplierPurchasingOrgTextRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class SupplierPurchasingOrgTextApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = SupplierPurchasingOrgText_1.SupplierPurchasingOrgText;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new SupplierPurchasingOrgTextRequestBuilder_1.SupplierPurchasingOrgTextRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(SupplierPurchasingOrgText_1.SupplierPurchasingOrgText, this.deSerializers);
        return {
            /**
         * Static representation of the [[supplier]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            SUPPLIER: fieldBuilder.buildEdmTypeField('Supplier', 'Edm.String', false),
            /**
             * Static representation of the [[purchasingOrganization]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PURCHASING_ORGANIZATION: fieldBuilder.buildEdmTypeField('PurchasingOrganization', 'Edm.String', false),
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
            ALL_FIELDS: new odata_v2_1.AllFields('*', SupplierPurchasingOrgText_1.SupplierPurchasingOrgText)
        };
    }
}
exports.SupplierPurchasingOrgTextApi = SupplierPurchasingOrgTextApi;
//# sourceMappingURL=SupplierPurchasingOrgTextApi.js.map