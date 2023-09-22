"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityLvl2MultiLinkApi = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityLvl2MultiLink_1 = require("./TestEntityLvl2MultiLink");
const TestEntityLvl2MultiLinkRequestBuilder_1 = require("./TestEntityLvl2MultiLinkRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
class TestEntityLvl2MultiLinkApi {
    deSerializers;
    constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
        this.deSerializers = deSerializers;
    }
    /**
     * Do not use this method or the constructor directly.
     * Use the service function as described in the documentation to get an API instance.
     */
    static _privateFactory(deSerializers = odata_v2_1.defaultDeSerializers) {
        return new TestEntityLvl2MultiLinkApi(deSerializers);
    }
    navigationPropertyFields;
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {};
        return this;
    }
    entityConstructor = TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink;
    requestBuilder() {
        return new TestEntityLvl2MultiLinkRequestBuilder_1.TestEntityLvl2MultiLinkRequestBuilder(this);
    }
    entityBuilder() {
        return (0, odata_v2_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v2_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    _fieldBuilder;
    get fieldBuilder() {
        if (!this._fieldBuilder) {
            this._fieldBuilder = new odata_v2_1.FieldBuilder(TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink, this.deSerializers);
        }
        return this._fieldBuilder;
    }
    _schema;
    get schema() {
        if (!this._schema) {
            const fieldBuilder = this.fieldBuilder;
            this._schema = {
                /**
                 * Static representation of the {@link keyProperty} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                KEY_PROPERTY: fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false),
                /**
                 * Static representation of the {@link stringProperty} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                STRING_PROPERTY: fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', true),
                /**
                 * Static representation of the {@link booleanProperty} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                BOOLEAN_PROPERTY: fieldBuilder.buildEdmTypeField('BooleanProperty', 'Edm.Boolean', true),
                /**
                 * Static representation of the {@link guidProperty} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                GUID_PROPERTY: fieldBuilder.buildEdmTypeField('GuidProperty', 'Edm.Guid', true),
                /**
                 * Static representation of the {@link int16Property} property for query construction.
                 * Use to reference this property in query operations such as 'select' in the fluent request API.
                 */
                INT_16_PROPERTY: fieldBuilder.buildEdmTypeField('Int16Property', 'Edm.Int16', true),
                ...this.navigationPropertyFields,
                /**
                 *
                 * All fields selector.
                 */
                ALL_FIELDS: new odata_v2_1.AllFields('*', TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink)
            };
        }
        return this._schema;
    }
}
exports.TestEntityLvl2MultiLinkApi = TestEntityLvl2MultiLinkApi;
//# sourceMappingURL=TestEntityLvl2MultiLinkApi.js.map