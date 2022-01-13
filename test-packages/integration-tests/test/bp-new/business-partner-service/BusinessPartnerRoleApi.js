"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPartnerRoleApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const BusinessPartnerRole_1 = require("./BusinessPartnerRole");
const BusinessPartnerRoleRequestBuilder_1 = require("./BusinessPartnerRoleRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class BusinessPartnerRoleApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = BusinessPartnerRole_1.BusinessPartnerRole;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new BusinessPartnerRoleRequestBuilder_1.BusinessPartnerRoleRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(BusinessPartnerRole_1.BusinessPartnerRole, this.deSerializers);
        return {
            /**
         * Static representation of the [[businessPartner]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            BUSINESS_PARTNER: fieldBuilder.buildEdmTypeField('BusinessPartner', 'Edm.String', false),
            /**
             * Static representation of the [[businessPartnerRole]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            BUSINESS_PARTNER_ROLE: fieldBuilder.buildEdmTypeField('BusinessPartnerRole', 'Edm.String', false),
            /**
             * Static representation of the [[validFrom]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            VALID_FROM: fieldBuilder.buildEdmTypeField('ValidFrom', 'Edm.DateTimeOffset', true),
            /**
             * Static representation of the [[validTo]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            VALID_TO: fieldBuilder.buildEdmTypeField('ValidTo', 'Edm.DateTimeOffset', true),
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
            ALL_FIELDS: new odata_v2_1.AllFields('*', BusinessPartnerRole_1.BusinessPartnerRole)
        };
    }
}
exports.BusinessPartnerRoleApi = BusinessPartnerRoleApi;
//# sourceMappingURL=BusinessPartnerRoleApi.js.map