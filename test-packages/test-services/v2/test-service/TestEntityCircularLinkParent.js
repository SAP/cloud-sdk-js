'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityCircularLinkParent = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityCircularLinkParentRequestBuilder_1 = require('./TestEntityCircularLinkParentRequestBuilder');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
/**
 * This class represents the entity "A_TestEntityCircularLinkParent" of service "API_TEST_SRV".
 */
class TestEntityCircularLinkParent extends odata_v2_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntityCircularLinkParent`.
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkParent`.
   */
  static builder() {
    return odata_v2_1.Entity.entityBuilder(TestEntityCircularLinkParent);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityCircularLinkParent` entity type.
   * @returns A `TestEntityCircularLinkParent` request builder.
   */
  static requestBuilder() {
    return new TestEntityCircularLinkParentRequestBuilder_1.TestEntityCircularLinkParentRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityCircularLinkParent`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkParent`.
   */
  static customField(fieldName) {
    return odata_v2_1.Entity.customFieldSelector(
      fieldName,
      TestEntityCircularLinkParent
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
exports.TestEntityCircularLinkParent = TestEntityCircularLinkParent;
/**
 * Technical entity name for TestEntityCircularLinkParent.
 */
TestEntityCircularLinkParent._entityName = 'A_TestEntityCircularLinkParent';
/**
 * Default url path for the according service.
 */
TestEntityCircularLinkParent._defaultServicePath =
  '/sap/opu/odata/sap/API_TEST_SRV';
const TestEntityCircularLinkChild_1 = require('./TestEntityCircularLinkChild');
(function (TestEntityCircularLinkParent) {
  const _fieldBuilder = new odata_common_1.FieldBuilder(
    TestEntityCircularLinkParent
  );
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityCircularLinkParent.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * Static representation of the one-to-many navigation property [[toChild]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityCircularLinkParent.TO_CHILD = new odata_common_1.Link(
    'to_Child',
    TestEntityCircularLinkParent,
    TestEntityCircularLinkChild_1.TestEntityCircularLinkChild
  );
  /**
   * All fields of the TestEntityCircularLinkParent entity.
   */
  TestEntityCircularLinkParent._allFields = [
    TestEntityCircularLinkParent.KEY_PROPERTY,
    TestEntityCircularLinkParent.TO_CHILD
  ];
  /**
   * All fields selector.
   */
  TestEntityCircularLinkParent.ALL_FIELDS = new odata_common_1.AllFields(
    '*',
    TestEntityCircularLinkParent
  );
  /**
   * All key fields of the TestEntityCircularLinkParent entity.
   */
  TestEntityCircularLinkParent._keyFields = [
    TestEntityCircularLinkParent.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityCircularLinkParent.
   */
  TestEntityCircularLinkParent._keys =
    TestEntityCircularLinkParent._keyFields.reduce((acc, field) => {
      acc[field._fieldName] = field;
      return acc;
    }, {});
})(
  (TestEntityCircularLinkParent =
    exports.TestEntityCircularLinkParent ||
    (exports.TestEntityCircularLinkParent = {}))
);
//# sourceMappingURL=TestEntityCircularLinkParent.js.map
