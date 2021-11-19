'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntity3 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntity3RequestBuilder_1 = require('./TestEntity3RequestBuilder');
const TestComplexType2_1 = require('./TestComplexType2');
const TestEnumType2_1 = require('./TestEnumType2');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * This class represents the entity "A_TestEntity3" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
class TestEntity3 extends odata_v4_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntity3`.
   * @returns A builder that constructs instances of entity type `TestEntity3`.
   */
  static builder() {
    return odata_v4_1.Entity.entityBuilder(TestEntity3);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntity3` entity type.
   * @returns A `TestEntity3` request builder.
   */
  static requestBuilder() {
    return new TestEntity3RequestBuilder_1.TestEntity3RequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity3`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity3`.
   */
  static customField(fieldName) {
    return odata_v4_1.Entity.customFieldSelector(fieldName, TestEntity3);
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.TestEntity3 = TestEntity3;
/**
 * Technical entity name for TestEntity3.
 */
TestEntity3._entityName = 'A_TestEntity3';
/**
 * Default url path for the according service.
 */
TestEntity3._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
(function (TestEntity3) {
  const _fieldBuilder = new internal_1.FieldBuilder(TestEntity3);
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity3.KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity3.ENUM_PROPERTY = _fieldBuilder.buildEnumField(
    'EnumProperty',
    TestEnumType2_1.TestEnumType2,
    true
  );
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity3.COMPLEX_TYPE_PROPERTY = _fieldBuilder.buildComplexTypeField(
    'ComplexTypeProperty',
    TestComplexType2_1.TestComplexType2Field,
    true
  );
  /**
   * All fields of the TestEntity3 entity.
   */
  TestEntity3._allFields = [
    TestEntity3.KEY_PROPERTY_STRING,
    TestEntity3.ENUM_PROPERTY,
    TestEntity3.COMPLEX_TYPE_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntity3.ALL_FIELDS = new internal_1.AllFields('*', TestEntity3);
  /**
   * All key fields of the TestEntity3 entity.
   */
  TestEntity3._keyFields = [TestEntity3.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property TestEntity3.
   */
  TestEntity3._keys = TestEntity3._keyFields.reduce((acc, field) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((TestEntity3 = exports.TestEntity3 || (exports.TestEntity3 = {})));
//# sourceMappingURL=TestEntity3.js.map
