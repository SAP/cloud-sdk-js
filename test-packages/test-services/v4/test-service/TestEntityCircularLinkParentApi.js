"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityCircularLinkParentApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityCircularLinkParent_1 = require("./TestEntityCircularLinkParent");
const TestEntityCircularLinkParentRequestBuilder_1 = require("./TestEntityCircularLinkParentRequestBuilder");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const internal_1 = require("@sap-cloud-sdk/odata-common/internal");
class TestEntityCircularLinkParentApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = TestEntityCircularLinkParent_1.TestEntityCircularLinkParent;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_FIRST_CHILD: new internal_1.OneToOneLink('to_FirstChild', this, linkedApis[0]),
            TO_CHILDREN: new internal_1.OneToManyLink('to_Children', this, linkedApis[1])
        };
        return this;
    }
    requestBuilder() {
        return new TestEntityCircularLinkParentRequestBuilder_1.TestEntityCircularLinkParentRequestBuilder(this);
    }
    entityBuilder() {
        return (0, internal_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new internal_1.FieldBuilder(TestEntityCircularLinkParent_1.TestEntityCircularLinkParent, this.deSerializers);
        return {
            /**
         * Static representation of the [[keyProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            KEY_PROPERTY: fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false),
            ...this.navigationPropertyFields,
            /**
             *
             * All fields selector.
             */
            ALL_FIELDS: new internal_1.AllFields('*', TestEntityCircularLinkParent_1.TestEntityCircularLinkParent)
        };
    }
}
exports.TestEntityCircularLinkParentApi = TestEntityCircularLinkParentApi;
//# sourceMappingURL=TestEntityCircularLinkParentApi.js.map