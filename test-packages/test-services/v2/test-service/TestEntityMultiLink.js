"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestEntityMultiLink = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityMultiLinkRequestBuilder_1 = require("./TestEntityMultiLinkRequestBuilder");
const odata_v2_1 = require("@sap-cloud-sdk/odata-v2");
const internal_1 = require("@sap-cloud-sdk/odata-common/internal");
/**
 * This class represents the entity "A_TestEntityMultiLink" of service "API_TEST_SRV".
 */
class TestEntityMultiLink extends odata_v2_1.Entity {
    /**
     * Returns an entity builder to construct instances of `TestEntityMultiLink`.
     * @returns A builder that constructs instances of entity type `TestEntityMultiLink`.
     */
    static builder() {
        return odata_v2_1.Entity.entityBuilder(TestEntityMultiLink);
    }
    /**
     * Returns a request builder to construct requests for operations on the `TestEntityMultiLink` entity type.
     * @returns A `TestEntityMultiLink` request builder.
     */
    static requestBuilder() {
        return new TestEntityMultiLinkRequestBuilder_1.TestEntityMultiLinkRequestBuilder();
    }
    /**
     * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityMultiLink`.
     * @param fieldName Name of the custom field to select
     * @returns A builder that constructs instances of entity type `TestEntityMultiLink`.
     */
    static customField(fieldName) {
        return odata_v2_1.Entity.customFieldSelector(fieldName, TestEntityMultiLink);
    }
    /**
     * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
     * @returns An object containing all instance variables + custom fields.
     */
    toJSON() {
        return { ...this, ...this._customFields };
    }
}
exports.TestEntityMultiLink = TestEntityMultiLink;
/**
 * Technical entity name for TestEntityMultiLink.
 */
TestEntityMultiLink._entityName = 'A_TestEntityMultiLink';
/**
 * Default url path for the according service.
 */
TestEntityMultiLink._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const TestEntityLvl2MultiLink_1 = require("./TestEntityLvl2MultiLink");
const TestEntityLvl2SingleLink_1 = require("./TestEntityLvl2SingleLink");
(function (TestEntityMultiLink) {
    const _fieldBuilder = new internal_1.FieldBuilder(TestEntityMultiLink);
    /**
     * Static representation of the [[keyProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntityMultiLink.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false);
    /**
     * Static representation of the [[stringProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntityMultiLink.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField('StringProperty', 'Edm.String', true);
    /**
     * Static representation of the [[booleanProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntityMultiLink.BOOLEAN_PROPERTY = _fieldBuilder.buildEdmTypeField('BooleanProperty', 'Edm.Boolean', true);
    /**
     * Static representation of the [[guidProperty]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntityMultiLink.GUID_PROPERTY = _fieldBuilder.buildEdmTypeField('GuidProperty', 'Edm.Guid', true);
    /**
     * Static representation of the [[int16Property]] property for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntityMultiLink.INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField('Int16Property', 'Edm.Int16', true);
    /**
     * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntityMultiLink.TO_MULTI_LINK = new internal_1.Link('to_MultiLink', TestEntityMultiLink, TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink);
    /**
     * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
     * Use to reference this property in query operations such as 'select' in the fluent request API.
     */
    TestEntityMultiLink.TO_SINGLE_LINK = new internal_1.OneToOneLink('to_SingleLink', TestEntityMultiLink, TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink);
    /**
     * All fields of the TestEntityMultiLink entity.
     */
    TestEntityMultiLink._allFields = [
        TestEntityMultiLink.KEY_PROPERTY,
        TestEntityMultiLink.STRING_PROPERTY,
        TestEntityMultiLink.BOOLEAN_PROPERTY,
        TestEntityMultiLink.GUID_PROPERTY,
        TestEntityMultiLink.INT_16_PROPERTY,
        TestEntityMultiLink.TO_MULTI_LINK,
        TestEntityMultiLink.TO_SINGLE_LINK
    ];
    /**
     * All fields selector.
     */
    TestEntityMultiLink.ALL_FIELDS = new internal_1.AllFields('*', TestEntityMultiLink);
    /**
     * All key fields of the TestEntityMultiLink entity.
     */
    TestEntityMultiLink._keyFields = [TestEntityMultiLink.KEY_PROPERTY];
    /**
     * Mapping of all key field names to the respective static field property TestEntityMultiLink.
     */
    TestEntityMultiLink._keys = TestEntityMultiLink._keyFields.reduce((acc, field) => {
        acc[field._fieldName] = field;
        return acc;
    }, {});
})(TestEntityMultiLink = exports.TestEntityMultiLink || (exports.TestEntityMultiLink = {}));
//# sourceMappingURL=TestEntityMultiLink.js.map