"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustSalesPartnerFuncApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const CustSalesPartnerFunc_1 = require("./CustSalesPartnerFunc");
const CustSalesPartnerFuncRequestBuilder_1 = require("./CustSalesPartnerFuncRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class CustSalesPartnerFuncApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = CustSalesPartnerFunc_1.CustSalesPartnerFunc;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new CustSalesPartnerFuncRequestBuilder_1.CustSalesPartnerFuncRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(CustSalesPartnerFunc_1.CustSalesPartnerFunc, this.deSerializers);
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
             * Static representation of the [[partnerCounter]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PARTNER_COUNTER: fieldBuilder.buildEdmTypeField('PartnerCounter', 'Edm.String', false),
            /**
             * Static representation of the [[partnerFunction]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PARTNER_FUNCTION: fieldBuilder.buildEdmTypeField('PartnerFunction', 'Edm.String', false),
            /**
             * Static representation of the [[bpCustomerNumber]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            BP_CUSTOMER_NUMBER: fieldBuilder.buildEdmTypeField('BPCustomerNumber', 'Edm.String', true),
            /**
             * Static representation of the [[customerPartnerDescription]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CUSTOMER_PARTNER_DESCRIPTION: fieldBuilder.buildEdmTypeField('CustomerPartnerDescription', 'Edm.String', true),
            /**
             * Static representation of the [[defaultPartner]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            DEFAULT_PARTNER: fieldBuilder.buildEdmTypeField('DefaultPartner', 'Edm.Boolean', true),
            /**
             * Static representation of the [[supplier]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            SUPPLIER: fieldBuilder.buildEdmTypeField('Supplier', 'Edm.String', true),
            /**
             * Static representation of the [[personnelNumber]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            PERSONNEL_NUMBER: fieldBuilder.buildEdmTypeField('PersonnelNumber', 'Edm.String', true),
            /**
             * Static representation of the [[contactPerson]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            CONTACT_PERSON: fieldBuilder.buildEdmTypeField('ContactPerson', 'Edm.String', true),
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
            ALL_FIELDS: new odata_v2_1.AllFields('*', CustSalesPartnerFunc_1.CustSalesPartnerFunc)
        };
    }
}
exports.CustSalesPartnerFuncApi = CustSalesPartnerFuncApi;
//# sourceMappingURL=CustSalesPartnerFuncApi.js.map