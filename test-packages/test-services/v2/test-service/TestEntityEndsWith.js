'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityEndsWith = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityEndsWithRequestBuilder_1 = require('./TestEntityEndsWithRequestBuilder');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const odata_common_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * This class represents the entity "A_TestEntityEndsWithCollection" of service "API_TEST_SRV".
 */
class TestEntityEndsWith extends odata_v2_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntityEndsWith`.
   * @returns A builder that constructs instances of entity type `TestEntityEndsWith`.
   */
  static builder() {
    return odata_v2_1.Entity.entityBuilder(TestEntityEndsWith);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityEndsWith` entity type.
   * @returns A `TestEntityEndsWith` request builder.
   */
  static requestBuilder() {
    return new TestEntityEndsWithRequestBuilder_1.TestEntityEndsWithRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityEndsWith`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityEndsWith`.
   */
  static customField(fieldName) {
    return odata_v2_1.Entity.customFieldSelector(fieldName, TestEntityEndsWith);
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.TestEntityEndsWith = TestEntityEndsWith;
/**
 * Technical entity name for TestEntityEndsWith.
 */
TestEntityEndsWith._entityName = 'A_TestEntityEndsWithCollection';
/**
 * Default url path for the according service.
 */
TestEntityEndsWith._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
(function (TestEntityEndsWith) {
  const _fieldBuilder = new odata_common_1.FieldBuilder(TestEntityEndsWith);
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityEndsWith.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * All fields of the TestEntityEndsWith entity.
   */
  TestEntityEndsWith._allFields = [TestEntityEndsWith.KEY_PROPERTY];
  /**
   * All fields selector.
   */
  TestEntityEndsWith.ALL_FIELDS = new odata_common_1.AllFields(
    '*',
    TestEntityEndsWith
  );
  /**
   * All key fields of the TestEntityEndsWith entity.
   */
  TestEntityEndsWith._keyFields = [TestEntityEndsWith.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityEndsWith.
   */
  TestEntityEndsWith._keys = TestEntityEndsWith._keyFields.reduce(
    (acc, field) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (TestEntityEndsWith =
    exports.TestEntityEndsWith || (exports.TestEntityEndsWith = {}))
);
//# sourceMappingURL=TestEntityEndsWith.js.map
