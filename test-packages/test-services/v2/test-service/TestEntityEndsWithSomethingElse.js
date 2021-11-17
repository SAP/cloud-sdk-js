'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityEndsWithSomethingElse = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityEndsWithSomethingElseRequestBuilder_1 = require('./TestEntityEndsWithSomethingElseRequestBuilder');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const odata_common_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * This class represents the entity "A_TestEntityEndsWithSomethingElse" of service "API_TEST_SRV".
 */
class TestEntityEndsWithSomethingElse extends odata_v2_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntityEndsWithSomethingElse`.
   * @returns A builder that constructs instances of entity type `TestEntityEndsWithSomethingElse`.
   */
  static builder() {
    return odata_v2_1.Entity.entityBuilder(TestEntityEndsWithSomethingElse);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityEndsWithSomethingElse` entity type.
   * @returns A `TestEntityEndsWithSomethingElse` request builder.
   */
  static requestBuilder() {
    return new TestEntityEndsWithSomethingElseRequestBuilder_1.TestEntityEndsWithSomethingElseRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityEndsWithSomethingElse`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityEndsWithSomethingElse`.
   */
  static customField(fieldName) {
    return odata_v2_1.Entity.customFieldSelector(
      fieldName,
      TestEntityEndsWithSomethingElse
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
exports.TestEntityEndsWithSomethingElse = TestEntityEndsWithSomethingElse;
/**
 * Technical entity name for TestEntityEndsWithSomethingElse.
 */
TestEntityEndsWithSomethingElse._entityName =
  'A_TestEntityEndsWithSomethingElse';
/**
 * Default url path for the according service.
 */
TestEntityEndsWithSomethingElse._defaultServicePath =
  '/sap/opu/odata/sap/API_TEST_SRV';
(function (TestEntityEndsWithSomethingElse) {
  const _fieldBuilder = new odata_common_1.FieldBuilder(
    TestEntityEndsWithSomethingElse
  );
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityEndsWithSomethingElse.KEY_PROPERTY =
    _fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false);
  /**
   * All fields of the TestEntityEndsWithSomethingElse entity.
   */
  TestEntityEndsWithSomethingElse._allFields = [
    TestEntityEndsWithSomethingElse.KEY_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntityEndsWithSomethingElse.ALL_FIELDS = new odata_common_1.AllFields(
    '*',
    TestEntityEndsWithSomethingElse
  );
  /**
   * All key fields of the TestEntityEndsWithSomethingElse entity.
   */
  TestEntityEndsWithSomethingElse._keyFields = [
    TestEntityEndsWithSomethingElse.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityEndsWithSomethingElse.
   */
  TestEntityEndsWithSomethingElse._keys =
    TestEntityEndsWithSomethingElse._keyFields.reduce((acc, field) => {
      acc[field._fieldName] = field;
      return acc;
    }, {});
})(
  (TestEntityEndsWithSomethingElse =
    exports.TestEntityEndsWithSomethingElse ||
    (exports.TestEntityEndsWithSomethingElse = {}))
);
//# sourceMappingURL=TestEntityEndsWithSomethingElse.js.map
