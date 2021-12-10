"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityOtherMultiLinkApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityOtherMultiLink_1 = require("./TestEntityOtherMultiLink");
const TestEntityOtherMultiLinkRequestBuilder_1 = require("./TestEntityOtherMultiLinkRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const internal_1 = require("@sap-cloud-sdk/odata-common/internal");
class TestEntityOtherMultiLinkApi {
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.entityConstructor = TestEntityOtherMultiLink_1.TestEntityOtherMultiLink;
        this.deSerializers = (0, odata_v2_1.mergeDefaultDeSerializersWith)(deSerializers);
        const fieldBuilder = new internal_1.FieldBuilder(TestEntityOtherMultiLink_1.TestEntityOtherMultiLink, this.deSerializers);
        this.schema =
            {
                /**
             * Static representation of the [[keyProperty]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
                KEY_PROPERTY: fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false),
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new internal_1.AllFields('*', TestEntityOtherMultiLink_1.TestEntityOtherMultiLink)
            };
    }
    requestBuilder() {
        return new TestEntityOtherMultiLinkRequestBuilder_1.TestEntityOtherMultiLinkRequestBuilder(this);
    }
    entityBuilder() {
        return (0, internal_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
}
exports.TestEntityOtherMultiLinkApi = TestEntityOtherMultiLinkApi;
//# sourceMappingURL=TestEntityOtherMultiLinkApi.js.map