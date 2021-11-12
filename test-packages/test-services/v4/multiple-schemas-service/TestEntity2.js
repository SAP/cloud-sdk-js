'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntity2 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntity2RequestBuilder_1 = require('./TestEntity2RequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
/**
 * This class represents the entity "A_TestEntity2" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
class TestEntity2 extends odata_v4_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntity2`.
   * @returns A builder that constructs instances of entity type `TestEntity2`.
   */
  static builder() {
    return odata_v4_1.Entity.entityBuilder(TestEntity2);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntity2` entity type.
   * @returns A `TestEntity2` request builder.
   */
  static requestBuilder() {
    return new TestEntity2RequestBuilder_1.TestEntity2RequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity2`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity2`.
   */
  static customField(fieldName) {
    return odata_v4_1.Entity.customFieldSelector(fieldName, TestEntity2);
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.TestEntity2 = TestEntity2;
/**
 * Technical entity name for TestEntity2.
 */
TestEntity2._entityName = 'A_TestEntity2';
/**
 * Default url path for the according service.
 */
TestEntity2._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
(function (TestEntity2) {
  const _fieldBuilder = new odata_common_1.FieldBuilder(TestEntity2);
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity2.KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[singleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity2.SINGLE_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'SingleProperty',
    'Edm.Single',
    true
  );
  /**
   * All fields of the TestEntity2 entity.
   */
  TestEntity2._allFields = [
    TestEntity2.KEY_PROPERTY_STRING,
    TestEntity2.SINGLE_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntity2.ALL_FIELDS = new odata_common_1.AllFields('*', TestEntity2);
  /**
   * All key fields of the TestEntity2 entity.
   */
  TestEntity2._keyFields = [TestEntity2.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property TestEntity2.
   */
  TestEntity2._keys = TestEntity2._keyFields.reduce((acc, field) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((TestEntity2 = exports.TestEntity2 || (exports.TestEntity2 = {})));
//# sourceMappingURL=TestEntity2.js.map
