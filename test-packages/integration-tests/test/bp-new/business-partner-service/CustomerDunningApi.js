"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDunningApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const CustomerDunning_1 = require("./CustomerDunning");
const CustomerDunningRequestBuilder_1 = require("./CustomerDunningRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class CustomerDunningApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = CustomerDunning_1.CustomerDunning;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new CustomerDunningRequestBuilder_1.CustomerDunningRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(CustomerDunning_1.CustomerDunning, this.deSerializers);
        return {
            /**
         * Static representation of the [[customer]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            CUSTOMER: fieldBuilder.buildEdmTypeField('Customer', 'Edm.String', false),
            /**
             * Static representation of the [[companyCode]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            COMPANY_CODE: fieldBuilder.buildEdmTypeField('CompanyCode', 'Edm.String', false),
            /**
             * Static representation of the [[dunningArea]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            DUNNING_AREA: fieldBuilder.buildEdmTypeField('DunningArea', 'Edm.String', false),
            /**
             * Static representation of the [[dunningBlock]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            DUNNING_BLOCK: fieldBuilder.buildEdmTypeField('DunningBlock', 'Edm.String', true),
            /**
             * Static representation of the [[dunningLevel]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            DUNNING_LEVEL: fieldBuilder.buildEdmTypeField('DunningLevel', 'Edm.String', true),
            /**
             * Static representation of the [[dunningProcedure]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            DUNNING_PROCEDURE: fieldBuilder.buildEdmTypeField('DunningProcedure', 'Edm.String', true),
            /**
             * Static representation of the [[dunningRecipient]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            DUNNING_RECIPIENT: fieldBuilder.buildEdmTypeField('DunningRecipient', 'Edm.String', true),
            /**
             * Static representation of the [[lastDunnedOn]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            LAST_DUNNED_ON: fieldBuilder.buildEdmTypeField('LastDunnedOn', 'Edm.DateTime', true),
            /**
             * Static representation of the [[legDunningProcedureOn]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            LEG_DUNNING_PROCEDURE_ON: fieldBuilder.buildEdmTypeField('LegDunningProcedureOn', 'Edm.DateTime', true),
            /**
             * Static representation of the [[dunningClerk]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            DUNNING_CLERK: fieldBuilder.buildEdmTypeField('DunningClerk', 'Edm.String', true),
            /**
             * Static representation of the [[authorizationGroup]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            AUTHORIZATION_GROUP: fieldBuilder.buildEdmTypeField('AuthorizationGroup', 'Edm.String', true),
            /**
             * Static representation of the [[customerAccountGroup]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CUSTOMER_ACCOUNT_GROUP: fieldBuilder.buildEdmTypeField('CustomerAccountGroup', 'Edm.String', true),
            ...this.navigationPropertyFields,
            /**
             *
             * All fields selector.
             */
            ALL_FIELDS: new odata_v2_1.AllFields('*', CustomerDunning_1.CustomerDunning)
        };
    }
}
exports.CustomerDunningApi = CustomerDunningApi;
//# sourceMappingURL=CustomerDunningApi.js.map