'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityLink = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityLinkRequestBuilder_1 = require('./TestEntityLinkRequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const odata_common_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * This class represents the entity "TestEntityLink" of service "TestService".
 */
class TestEntityLink extends odata_v4_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntityLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLink`.
   */
  static builder() {
    return odata_v4_1.Entity.entityBuilder(TestEntityLink);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLink` entity type.
   * @returns A `TestEntityLink` request builder.
   */
  static requestBuilder() {
    return new TestEntityLinkRequestBuilder_1.TestEntityLinkRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLink`.
   */
  static customField(fieldName) {
    return odata_v4_1.Entity.customFieldSelector(fieldName, TestEntityLink);
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.TestEntityLink = TestEntityLink;
/**
 * Technical entity name for TestEntityLink.
 */
TestEntityLink._entityName = 'TestEntityLink';
/**
 * Default url path for the according service.
 */
TestEntityLink._defaultServicePath = '/odata/test-service';
(function (TestEntityLink) {
  const _fieldBuilder = new odata_common_1.FieldBuilder(TestEntityLink);
  /**
   * Static representation of the [[keyTestEntityLink]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLink.KEY_TEST_ENTITY_LINK = _fieldBuilder.buildEdmTypeField(
    'KeyTestEntityLink',
    'Edm.Int32',
    false
  );
  /**
   * Static representation of the [[keyToTestEntity]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLink.KEY_TO_TEST_ENTITY = _fieldBuilder.buildEdmTypeField(
    'KeyToTestEntity',
    'Edm.Int32',
    false
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLink.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * All fields of the TestEntityLink entity.
   */
  TestEntityLink._allFields = [
    TestEntityLink.KEY_TEST_ENTITY_LINK,
    TestEntityLink.KEY_TO_TEST_ENTITY,
    TestEntityLink.STRING_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntityLink.ALL_FIELDS = new odata_common_1.AllFields('*', TestEntityLink);
  /**
   * All key fields of the TestEntityLink entity.
   */
  TestEntityLink._keyFields = [
    TestEntityLink.KEY_TEST_ENTITY_LINK,
    TestEntityLink.KEY_TO_TEST_ENTITY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLink.
   */
  TestEntityLink._keys = TestEntityLink._keyFields.reduce((acc, field) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((TestEntityLink = exports.TestEntityLink || (exports.TestEntityLink = {})));
//# sourceMappingURL=TestEntityLink.js.map
