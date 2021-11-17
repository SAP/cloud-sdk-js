'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityOtherMultiLink = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityOtherMultiLinkRequestBuilder_1 = require('./TestEntityOtherMultiLinkRequestBuilder');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
const odata_common_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * This class represents the entity "A_TestEntityOtherMultiLink" of service "API_TEST_SRV".
 */
class TestEntityOtherMultiLink extends odata_v2_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntityOtherMultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityOtherMultiLink`.
   */
  static builder() {
    return odata_v2_1.Entity.entityBuilder(TestEntityOtherMultiLink);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityOtherMultiLink` entity type.
   * @returns A `TestEntityOtherMultiLink` request builder.
   */
  static requestBuilder() {
    return new TestEntityOtherMultiLinkRequestBuilder_1.TestEntityOtherMultiLinkRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityOtherMultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityOtherMultiLink`.
   */
  static customField(fieldName) {
    return odata_v2_1.Entity.customFieldSelector(
      fieldName,
      TestEntityOtherMultiLink
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
exports.TestEntityOtherMultiLink = TestEntityOtherMultiLink;
/**
 * Technical entity name for TestEntityOtherMultiLink.
 */
TestEntityOtherMultiLink._entityName = 'A_TestEntityOtherMultiLink';
/**
 * Default url path for the according service.
 */
TestEntityOtherMultiLink._defaultServicePath =
  '/sap/opu/odata/sap/API_TEST_SRV';
(function (TestEntityOtherMultiLink) {
  const _fieldBuilder = new odata_common_1.FieldBuilder(
    TestEntityOtherMultiLink
  );
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityOtherMultiLink.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * All fields of the TestEntityOtherMultiLink entity.
   */
  TestEntityOtherMultiLink._allFields = [TestEntityOtherMultiLink.KEY_PROPERTY];
  /**
   * All fields selector.
   */
  TestEntityOtherMultiLink.ALL_FIELDS = new odata_common_1.AllFields(
    '*',
    TestEntityOtherMultiLink
  );
  /**
   * All key fields of the TestEntityOtherMultiLink entity.
   */
  TestEntityOtherMultiLink._keyFields = [TestEntityOtherMultiLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityOtherMultiLink.
   */
  TestEntityOtherMultiLink._keys = TestEntityOtherMultiLink._keyFields.reduce(
    (acc, field) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (TestEntityOtherMultiLink =
    exports.TestEntityOtherMultiLink || (exports.TestEntityOtherMultiLink = {}))
);
//# sourceMappingURL=TestEntityOtherMultiLink.js.map
