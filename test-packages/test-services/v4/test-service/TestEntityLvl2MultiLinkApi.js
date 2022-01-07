"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityLvl2MultiLinkApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityLvl2MultiLink_1 = require("./TestEntityLvl2MultiLink");
const TestEntityLvl2MultiLinkRequestBuilder_1 = require("./TestEntityLvl2MultiLinkRequestBuilder");
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const internal_1 = require("@sap-cloud-sdk/odata-common/internal");
class TestEntityLvl2MultiLinkApi {
    constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
        this.entityConstructor = TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink;
        this.deSerializers = deSerializers;
    }
    _addNavigationProperties(linkedApis) {
        this.navigationPropertyFields = {
            TO_MULTI_LINK_2: new internal_1.OneToManyLink('to_MultiLink2', this, linkedApis[0])
        };
        return this;
    }
    requestBuilder() {
        return new TestEntityLvl2MultiLinkRequestBuilder_1.TestEntityLvl2MultiLinkRequestBuilder(this);
    }
    entityBuilder() {
        return (0, internal_1.entityBuilder)(this);
    }
    customField(fieldName, isNullable = false) {
        return new odata_v4_1.CustomField(fieldName, this.entityConstructor, this.deSerializers, isNullable);
    }
    get schema() {
        const fieldBuilder = new internal_1.FieldBuilder(TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink, this.deSerializers);
        return {
            /**
         * Static representation of the [[stringProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
            STRING_PROPERTY: fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', true),
            /**
             * Static representation of the [[booleanProperty]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            BOOLEAN_PROPERTY: fieldBuilder.buildEdmTypeField('BooleanProperty', 'Edm.Boolean', true),
            /**
             * Static representation of the [[guidProperty]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            GUID_PROPERTY: fieldBuilder.buildEdmTypeField('GuidProperty', 'Edm.Guid', true),
            /**
             * Static representation of the [[int16Property]] property for query construction.
             * Use to reference this property in query operations such as 'select' in the fluent request API.
             */
            INT_16_PROPERTY: fieldBuilder.buildEdmTypeField('Int16Property', 'Edm.Int16', true),
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
            ALL_FIELDS: new internal_1.AllFields('*', TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink)
        };
    }
}
exports.TestEntityLvl2MultiLinkApi = TestEntityLvl2MultiLinkApi;
//# sourceMappingURL=TestEntityLvl2MultiLinkApi.js.map