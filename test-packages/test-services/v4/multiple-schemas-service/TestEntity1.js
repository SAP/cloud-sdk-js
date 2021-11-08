'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntity1 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntity1RequestBuilder_1 = require('./TestEntity1RequestBuilder');
const TestComplexType1_1 = require('./TestComplexType1');
const TestEnumType1_1 = require('./TestEnumType1');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
/**
 * This class represents the entity "A_TestEntity1" of service "API_MULTIPLE_SCHEMAS_SRV".
 */
class TestEntity1 extends odata_v4_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntity1`.
   * @returns A builder that constructs instances of entity type `TestEntity1`.
   */
  static builder() {
    return odata_v4_1.Entity.entityBuilder(TestEntity1);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntity1` entity type.
   * @returns A `TestEntity1` request builder.
   */
  static requestBuilder() {
    return new TestEntity1RequestBuilder_1.TestEntity1RequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity1`.
   */
  static customField(fieldName) {
    return odata_v4_1.Entity.customFieldSelector(fieldName, TestEntity1);
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.TestEntity1 = TestEntity1;
/**
 * Technical entity name for TestEntity1.
 */
TestEntity1._entityName = 'A_TestEntity1';
/**
 * Default url path for the according service.
 */
TestEntity1._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
(function (TestEntity1) {
  const _fieldBuilder = new odata_common_1.FieldBuilder(TestEntity1);
  /**
   * Static representation of the [[keyPropertyString]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity1.KEY_PROPERTY_STRING = _fieldBuilder.buildEdmTypeField(
    'KeyPropertyString',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity1.INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int16Property',
    'Edm.Int16',
    true
  );
  /**
   * Static representation of the [[enumProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity1.ENUM_PROPERTY = _fieldBuilder.buildEnumField(
    'EnumProperty',
    TestEnumType1_1.TestEnumType1,
    true
  );
  /**
   * Static representation of the [[complexTypeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity1.COMPLEX_TYPE_PROPERTY = _fieldBuilder.buildComplexTypeField(
    'ComplexTypeProperty',
    TestComplexType1_1.TestComplexType1Field,
    true
  );
  /**
   * All fields of the TestEntity1 entity.
   */
  TestEntity1._allFields = [
    TestEntity1.KEY_PROPERTY_STRING,
    TestEntity1.INT_16_PROPERTY,
    TestEntity1.ENUM_PROPERTY,
    TestEntity1.COMPLEX_TYPE_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntity1.ALL_FIELDS = new odata_common_1.AllFields('*', TestEntity1);
  /**
   * All key fields of the TestEntity1 entity.
   */
  TestEntity1._keyFields = [TestEntity1.KEY_PROPERTY_STRING];
  /**
   * Mapping of all key field names to the respective static field property TestEntity1.
   */
  TestEntity1._keys = TestEntity1._keyFields.reduce((acc, field) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((TestEntity1 = exports.TestEntity1 || (exports.TestEntity1 = {})));
//# sourceMappingURL=TestEntity1.js.map
