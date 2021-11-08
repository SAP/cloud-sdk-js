'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityLvl2MultiLink = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityLvl2MultiLinkRequestBuilder_1 = require('./TestEntityLvl2MultiLinkRequestBuilder');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
/**
 * This class represents the entity "A_TestEntityLvl2MultiLink" of service "API_TEST_SRV".
 */
class TestEntityLvl2MultiLink extends odata_v2_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntityLvl2MultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl2MultiLink`.
   */
  static builder() {
    return odata_v2_1.Entity.entityBuilder(TestEntityLvl2MultiLink);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLvl2MultiLink` entity type.
   * @returns A `TestEntityLvl2MultiLink` request builder.
   */
  static requestBuilder() {
    return new TestEntityLvl2MultiLinkRequestBuilder_1.TestEntityLvl2MultiLinkRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLvl2MultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLvl2MultiLink`.
   */
  static customField(fieldName) {
    return odata_v2_1.Entity.customFieldSelector(
      fieldName,
      TestEntityLvl2MultiLink
    );
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.TestEntityLvl2MultiLink = TestEntityLvl2MultiLink;
/**
 * Technical entity name for TestEntityLvl2MultiLink.
 */
TestEntityLvl2MultiLink._entityName = 'A_TestEntityLvl2MultiLink';
/**
 * Default url path for the according service.
 */
TestEntityLvl2MultiLink._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
(function (TestEntityLvl2MultiLink) {
  const _fieldBuilder = new odata_common_1.FieldBuilder(
    TestEntityLvl2MultiLink
  );
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2MultiLink.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2MultiLink.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2MultiLink.BOOLEAN_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
    true
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2MultiLink.GUID_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'GuidProperty',
    'Edm.Guid',
    true
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2MultiLink.INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int16Property',
    'Edm.Int16',
    true
  );
  /**
   * All fields of the TestEntityLvl2MultiLink entity.
   */
  TestEntityLvl2MultiLink._allFields = [
    TestEntityLvl2MultiLink.KEY_PROPERTY,
    TestEntityLvl2MultiLink.STRING_PROPERTY,
    TestEntityLvl2MultiLink.BOOLEAN_PROPERTY,
    TestEntityLvl2MultiLink.GUID_PROPERTY,
    TestEntityLvl2MultiLink.INT_16_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntityLvl2MultiLink.ALL_FIELDS = new odata_common_1.AllFields(
    '*',
    TestEntityLvl2MultiLink
  );
  /**
   * All key fields of the TestEntityLvl2MultiLink entity.
   */
  TestEntityLvl2MultiLink._keyFields = [TestEntityLvl2MultiLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl2MultiLink.
   */
  TestEntityLvl2MultiLink._keys = TestEntityLvl2MultiLink._keyFields.reduce(
    (acc, field) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (TestEntityLvl2MultiLink =
    exports.TestEntityLvl2MultiLink || (exports.TestEntityLvl2MultiLink = {}))
);
//# sourceMappingURL=TestEntityLvl2MultiLink.js.map
