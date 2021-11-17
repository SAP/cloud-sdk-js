'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityWithSharedEntityType1 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityWithSharedEntityType1RequestBuilder_1 = require('./TestEntityWithSharedEntityType1RequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * This class represents the entity "A_TestEntityWithSharedEntityType1" of service "API_TEST_SRV".
 */
class TestEntityWithSharedEntityType1 extends odata_v4_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntityWithSharedEntityType1`.
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType1`.
   */
  static builder() {
    return odata_v4_1.Entity.entityBuilder(TestEntityWithSharedEntityType1);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityWithSharedEntityType1` entity type.
   * @returns A `TestEntityWithSharedEntityType1` request builder.
   */
  static requestBuilder() {
    return new TestEntityWithSharedEntityType1RequestBuilder_1.TestEntityWithSharedEntityType1RequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityWithSharedEntityType1`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityWithSharedEntityType1`.
   */
  static customField(fieldName) {
    return odata_v4_1.Entity.customFieldSelector(
      fieldName,
      TestEntityWithSharedEntityType1
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
exports.TestEntityWithSharedEntityType1 = TestEntityWithSharedEntityType1;
/**
 * Technical entity name for TestEntityWithSharedEntityType1.
 */
TestEntityWithSharedEntityType1._entityName =
  'A_TestEntityWithSharedEntityType1';
/**
 * Default url path for the according service.
 */
TestEntityWithSharedEntityType1._defaultServicePath =
  '/sap/opu/odata/sap/API_TEST_SRV';
(function (TestEntityWithSharedEntityType1) {
  const _fieldBuilder = new internal_1.FieldBuilder(
    TestEntityWithSharedEntityType1
  );
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityWithSharedEntityType1.KEY_PROPERTY =
    _fieldBuilder.buildEdmTypeField('KeyProperty', 'Edm.String', false);
  /**
   * All fields of the TestEntityWithSharedEntityType1 entity.
   */
  TestEntityWithSharedEntityType1._allFields = [
    TestEntityWithSharedEntityType1.KEY_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntityWithSharedEntityType1.ALL_FIELDS = new internal_1.AllFields(
    '*',
    TestEntityWithSharedEntityType1
  );
  /**
   * All key fields of the TestEntityWithSharedEntityType1 entity.
   */
  TestEntityWithSharedEntityType1._keyFields = [
    TestEntityWithSharedEntityType1.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityWithSharedEntityType1.
   */
  TestEntityWithSharedEntityType1._keys =
    TestEntityWithSharedEntityType1._keyFields.reduce((acc, field) => {
      acc[field._fieldName] = field;
      return acc;
    }, {});
})(
  (TestEntityWithSharedEntityType1 =
    exports.TestEntityWithSharedEntityType1 ||
    (exports.TestEntityWithSharedEntityType1 = {}))
);
//# sourceMappingURL=TestEntityWithSharedEntityType1.js.map
