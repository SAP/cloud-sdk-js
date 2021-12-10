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
const TestEntityCircularLinkChildApi_1 = require("./TestEntityCircularLinkChildApi");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const internal_1 = require("@sap-cloud-sdk/odata-common/internal");
class TestEntityCircularLinkParentApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = TestEntityCircularLinkParent_1.TestEntityCircularLinkParent;
        this.deSerializers = (0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers);
        const fieldBuilder = new internal_1.FieldBuilder(TestEntityCircularLinkParent_1.TestEntityCircularLinkParent, this.deSerializers);
        this.schema =
            {
                /**
             * Static representation of the [[keyProperty]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
                KEY_PROPERTY: fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false),
                /**
                 * Static representation of the one-to-many navigation property [[toChild]] for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                TO_CHILD: new internal_1.Link('to_Child', this, new TestEntityCircularLinkChildApi_1.TestEntityCircularLinkChildApi(deSerializers)),
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new internal_1.AllFields('*', TestEntityCircularLinkParent_1.TestEntityCircularLinkParent)
            };
    }
    requestBuilder() {
        return new TestEntityCircularLinkParentRequestBuilder_1.TestEntityCircularLinkParentRequestBuilder(this);
    }
    entityBuilder() {
        return (0, internal_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
}
exports.TestEntityCircularLinkParentApi = TestEntityCircularLinkParentApi;
//# sourceMappingURL=TestEntityCircularLinkParentApi.js.map