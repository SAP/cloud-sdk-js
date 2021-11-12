'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntity4 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntity4RequestBuilder_1 = require('./TestEntity4RequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
/**
 * This class represents the entity "A_TestEntity4" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
class TestEntity4 extends odata_v4_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntity4`.
   * @returns A builder that constructs instances of entity type `TestEntity4`.
   */
  static builder() {
    return odata_v4_1.Entity.entityBuilder(TestEntity4);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntity4` entity type.
   * @returns A `TestEntity4` request builder.
   */
  static requestBuilder() {
    return new TestEntity4RequestBuilder_1.TestEntity4RequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity4`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity4`.
   */
  static customField(fieldName) {
    return odata_v4_1.Entity.customFieldSelector(fieldName, TestEntity4);
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.TestEntity4 = TestEntity4;
/**
 * Technical entity name for TestEntity4.
 */
TestEntity4._entityName = 'A_TestEntity4';
/**
 * Default url path for the according service.
 */
TestEntity4._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
(function (TestEntity4) {
  const _fieldBuilder = new odata_common_1.FieldBuilder(TestEntity4);
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity4.KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity4.BOOLEAN_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
    true
  );
  /**
   * All fields of the TestEntity4 entity.
   */
  TestEntity4._allFields = [
    TestEntity4.KEY_PROPERTY_STRING,
    TestEntity4.BOOLEAN_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntity4.ALL_FIELDS = new odata_common_1.AllFields('*', TestEntity4);
  /**
   * All key fields of the TestEntity4 entity.
   */
  TestEntity4._keyFields = [TestEntity4.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property TestEntity4.
   */
  TestEntity4._keys = TestEntity4._keyFields.reduce((acc, field) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((TestEntity4 = exports.TestEntity4 || (exports.TestEntity4 = {})));
//# sourceMappingURL=TestEntity4.js.map
