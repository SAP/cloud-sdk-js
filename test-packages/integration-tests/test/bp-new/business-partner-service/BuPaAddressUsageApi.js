"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuPaAddressUsageApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const BuPaAddressUsage_1 = require("./BuPaAddressUsage");
const BuPaAddressUsageRequestBuilder_1 = require("./BuPaAddressUsageRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class BuPaAddressUsageApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = BuPaAddressUsage_1.BuPaAddressUsage;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new BuPaAddressUsageRequestBuilder_1.BuPaAddressUsageRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(BuPaAddressUsage_1.BuPaAddressUsage, this.deSerializers);
        return {
            /**
         * Static representation of the [[businessPartner]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            BUSINESS_PARTNER: fieldBuilder.buildEdmTypeField('BusinessPartner', 'Edm.String', false),
            /**
             * Static representation of the [[validityEndDate]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            VALIDITY_END_DATE: fieldBuilder.buildEdmTypeField('ValidityEndDate', 'Edm.DateTimeOffset', false),
            /**
             * Static representation of the [[addressUsage]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            ADDRESS_USAGE: fieldBuilder.buildEdmTypeField('AddressUsage', 'Edm.String', false),
            /**
             * Static representation of the [[addressId]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            ADDRESS_ID: fieldBuilder.buildEdmTypeField('AddressID', 'Edm.String', false),
            /**
             * Static representation of the [[validityStartDate]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            VALIDITY_START_DATE: fieldBuilder.buildEdmTypeField('ValidityStartDate', 'Edm.DateTimeOffset', true),
            /**
             * Static representation of the [[standardUsage]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            STANDARD_USAGE: fieldBuilder.buildEdmTypeField('StandardUsage', 'Edm.Boolean', true),
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
            ALL_FIELDS: new odata_v2_1.AllFields('*', BuPaAddressUsage_1.BuPaAddressUsage)
        };
    }
}
exports.BuPaAddressUsageApi = BuPaAddressUsageApi;
//# sourceMappingURL=BuPaAddressUsageApi.js.map