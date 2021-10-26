'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityWithSharedEntityType2 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityWithSharedEntityType2RequestBuilder_1 = require('./TestEntityWithSharedEntityType2RequestBuilder');
const core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntityWithSharedEntityType2" of service "API_TEST_SRV".
 */
class TestEntityWithSharedEntityType2 extends core_1.EntityV4 {
  /**
   * Returns an entity builder to construct instances of `TestEntityWithSharedEntityType2`.
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType2`.
   */
  static builder() {
    return core_1.EntityV4.entityBuilder(TestEntityWithSharedEntityType2);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityWithSharedEntityType2` entity type.
   * @returns A `TestEntityWithSharedEntityType2` request builder.
   */
  static requestBuilder() {
    return new TestEntityWithSharedEntityType2RequestBuilder_1.TestEntityWithSharedEntityType2RequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityWithSharedEntityType2`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType2`.
   */
  static customField(fieldName) {
    return core_1.EntityV4.customFieldSelector(
      fieldName,
      TestEntityWithSharedEntityType2
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
exports.TestEntityWithSharedEntityType2 = TestEntityWithSharedEntityType2;
/**
 * Technical entity name for TestEntityWithSharedEntityType2.
 */
TestEntityWithSharedEntityType2._entityName =
  'A_TestEntityWithSharedEntityType2';
/**
 * Default url path for the according service.
 */
TestEntityWithSharedEntityType2._defaultServicePath =
  '/sap/opu/odata/sap/API_TEST_SRV';
(function (TestEntityWithSharedEntityType2) {
  const _fieldBuilder = new core_1.FieldBuilder(
    TestEntityWithSharedEntityType2
  );
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityWithSharedEntityType2.KEY_PROPERTY =
    _fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false);
  /**
   * All fields of the TestEntityWithSharedEntityType2 entity.
   */
  TestEntityWithSharedEntityType2._allFields = [
    TestEntityWithSharedEntityType2.KEY_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntityWithSharedEntityType2.ALL_FIELDS = new core_1.AllFields(
    '*',
    TestEntityWithSharedEntityType2
  );
  /**
   * All key fields of the TestEntityWithSharedEntityType2 entity.
   */
  TestEntityWithSharedEntityType2._keyFields = [
    TestEntityWithSharedEntityType2.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityWithSharedEntityType2.
   */
  TestEntityWithSharedEntityType2._keys =
    TestEntityWithSharedEntityType2._keyFields.reduce((acc, field) => {
      acc[field._fieldName] = field;
      return acc;
    }, {});
})(
  (TestEntityWithSharedEntityType2 =
    exports.TestEntityWithSharedEntityType2 ||
    (exports.TestEntityWithSharedEntityType2 = {}))
);
//# sourceMappingURL=TestEntityWithSharedEntityType2.js.map
