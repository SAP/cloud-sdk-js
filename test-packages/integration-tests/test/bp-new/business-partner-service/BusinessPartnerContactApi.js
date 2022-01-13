"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessPartnerContactApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const BusinessPartnerContact_1 = require("./BusinessPartnerContact");
const BusinessPartnerContactRequestBuilder_1 = require("./BusinessPartnerContactRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class BusinessPartnerContactApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = BusinessPartnerContact_1.BusinessPartnerContact;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_CONTACT_ADDRESS: new odata_v2_1.Link('to_ContactAddress', this, linkedApis[0]),
            TO_CONTACT_RELATIONSHIP: new odata_v2_1.OneToOneLink('to_ContactRelationship', this, linkedApis[1])
        };
        return this;
    }
    requestBuilder() {
        return new BusinessPartnerContactRequestBuilder_1.BusinessPartnerContactRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new odata_v2_1.FieldBuilder(BusinessPartnerContact_1.BusinessPartnerContact, this.deSerializers);
        return {
            /**
         * Static representation of the [[relationshipNumber]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            RELATIONSHIP_NUMBER: fieldBuilder.buildEdmTypeField('RelationshipNumber', 'Edm.String', false),
            /**
             * Static representation of the [[businessPartnerCompany]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            BUSINESS_PARTNER_COMPANY: fieldBuilder.buildEdmTypeField('BusinessPartnerCompany', 'Edm.String', false),
            /**
             * Static representation of the [[businessPartnerPerson]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            BUSINESS_PARTNER_PERSON: fieldBuilder.buildEdmTypeField('BusinessPartnerPerson', 'Edm.String', false),
            /**
             * Static representation of the [[validityEndDate]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            VALIDITY_END_DATE: fieldBuilder.buildEdmTypeField('ValidityEndDate', 'Edm.DateTime', false),
            /**
             * Static representation of the [[validityStartDate]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            VALIDITY_START_DATE: fieldBuilder.buildEdmTypeField('ValidityStartDate', 'Edm.DateTime', true),
            /**
             * Static representation of the [[isStandardRelationship]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            IS_STANDARD_RELATIONSHIP: fieldBuilder.buildEdmTypeField('IsStandardRelationship', 'Edm.Boolean', true),
            /**
             * Static representation of the [[relationshipCategory]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            RELATIONSHIP_CATEGORY: fieldBuilder.buildEdmTypeField('RelationshipCategory', 'Edm.String', true),
            ...this.navigationPropertyFields,
            /**
             *
             * All fields selector.
             */
            ALL_FIELDS: new odata_v2_1.AllFields('*', BusinessPartnerContact_1.BusinessPartnerContact)
        };
    }
}
exports.BusinessPartnerContactApi = BusinessPartnerContactApi;
//# sourceMappingURL=BusinessPartnerContactApi.js.map