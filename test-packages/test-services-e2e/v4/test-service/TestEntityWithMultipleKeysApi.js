"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityWithMultipleKeysApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityWithMultipleKeys_1 = require("./TestEntityWithMultipleKeys");
const TestEntityWithMultipleKeysRequestBuilder_1 = require("./TestEntityWithMultipleKeysRequestBuilder");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
class TestEntityWithMultipleKeysApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = TestEntityWithMultipleKeys_1.TestEntityWithMultipleKeys;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    requestBuilder() {
        return new TestEntityWithMultipleKeysRequestBuilder_1.TestEntityWithMultipleKeysRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v4_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v4_1.FieldBuilder(TestEntityWithMultipleKeys_1.TestEntityWithMultipleKeys, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link keyTestEntityWithMultipleKeys} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                KEY_TEST_ENTITY_WITH_MULTIPLE_KEYS: fieldBuilder.buildEdmTypeField('KeyTestEntityWithMultipleKeys', 'Edm.Int32', false),
                /**
                 * Static representation of the {@link stringPropertyWithMultipleKeys} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY_WITH_MULTIPLE_KEYS: fieldBuilder.buildEdmTypeField('StringPropertyWithMultipleKeys', 'Edm.String', false),
                /**
                 * Static representation of the {@link booleanPropertyWithMultipleKeys} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY_WITH_MULTIPLE_KEYS: fieldBuilder.buildEdmTypeField('BooleanPropertyWithMultipleKeys', 'Edm.Boolean', false),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v4_1.AllFields('*', TestEntityWithMultipleKeys_1.TestEntityWithMultipleKeys)
            };
        }
        return this._schema;
    }
}
exports.TestEntityWithMultipleKeysApi = TestEntityWithMultipleKeysApi;
//# sourceMappingURL=TestEntityWithMultipleKeysApi.js.map