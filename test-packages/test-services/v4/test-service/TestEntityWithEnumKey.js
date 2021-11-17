'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityWithEnumKey = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityWithEnumKeyRequestBuilder_1 = require('./TestEntityWithEnumKeyRequestBuilder');
const TestEnumType_1 = require('./TestEnumType');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * This class represents the entity "A_TestEntityWithEnumKey" of service "API_TEST_SRV".
 */
class TestEntityWithEnumKey extends odata_v4_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntityWithEnumKey`.
   * @returns A builder that constructs instances of entity type `TestEntityWithEnumKey`.
   */
  static builder() {
    return odata_v4_1.Entity.entityBuilder(TestEntityWithEnumKey);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityWithEnumKey` entity type.
   * @returns A `TestEntityWithEnumKey` request builder.
   */
  static requestBuilder() {
    return new TestEntityWithEnumKeyRequestBuilder_1.TestEntityWithEnumKeyRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityWithEnumKey`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityWithEnumKey`.
   */
  static customField(fieldName) {
    return odata_v4_1.Entity.customFieldSelector(
      fieldName,
      TestEntityWithEnumKey
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
exports.TestEntityWithEnumKey = TestEntityWithEnumKey;
/**
 * Technical entity name for TestEntityWithEnumKey.
 */
TestEntityWithEnumKey._entityName = 'A_TestEntityWithEnumKey';
/**
 * Default url path for the according service.
 */
TestEntityWithEnumKey._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
(function (TestEntityWithEnumKey) {
  const _fieldBuilder = new internal_1.FieldBuilder(TestEntityWithEnumKey);
  /**
   * Static representation of the [[keyPropertyEnum1]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityWithEnumKey.KEY_PROPERTY_ENUM_1 = _fieldBuilder.buildEnumField(
    'KeyPropertyEnum1',
    TestEnumType_1.TestEnumType,
    false
  );
  /**
   * All fields of the TestEntityWithEnumKey entity.
   */
  TestEntityWithEnumKey._allFields = [
    TestEntityWithEnumKey.KEY_PROPERTY_ENUM_1
  ];
  /**
   * All fields selector.
   */
  TestEntityWithEnumKey.ALL_FIELDS = new internal_1.AllFields(
    '*',
    TestEntityWithEnumKey
  );
  /**
   * All key fields of the TestEntityWithEnumKey entity.
   */
  TestEntityWithEnumKey._keyFields = [
    TestEntityWithEnumKey.KEY_PROPERTY_ENUM_1
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityWithEnumKey.
   */
  TestEntityWithEnumKey._keys = TestEntityWithEnumKey._keyFields.reduce(
    (acc, field) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (TestEntityWithEnumKey =
    exports.TestEntityWithEnumKey || (exports.TestEntityWithEnumKey = {}))
);
//# sourceMappingURL=TestEntityWithEnumKey.js.map
