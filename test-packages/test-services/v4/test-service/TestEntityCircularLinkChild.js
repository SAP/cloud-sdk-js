'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityCircularLinkChild = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityCircularLinkChildRequestBuilder_1 = require('./TestEntityCircularLinkChildRequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
/**
 * This class represents the entity "A_TestEntityCircularLinkChild" of service "API_TEST_SRV".
 */
class TestEntityCircularLinkChild extends odata_v4_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntityCircularLinkChild`.
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkChild`.
   */
  static builder() {
    return odata_v4_1.Entity.entityBuilder(TestEntityCircularLinkChild);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityCircularLinkChild` entity type.
   * @returns A `TestEntityCircularLinkChild` request builder.
   */
  static requestBuilder() {
    return new TestEntityCircularLinkChildRequestBuilder_1.TestEntityCircularLinkChildRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityCircularLinkChild`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityCircularLinkChild`.
   */
  static customField(fieldName) {
    return odata_v4_1.Entity.customFieldSelector(
      fieldName,
      TestEntityCircularLinkChild
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
exports.TestEntityCircularLinkChild = TestEntityCircularLinkChild;
/**
 * Technical entity name for TestEntityCircularLinkChild.
 */
TestEntityCircularLinkChild._entityName = 'A_TestEntityCircularLinkChild';
/**
 * Default url path for the according service.
 */
TestEntityCircularLinkChild._defaultServicePath =
  '/sap/opu/odata/sap/API_TEST_SRV';
const TestEntityCircularLinkParent_1 = require('./TestEntityCircularLinkParent');
(function (TestEntityCircularLinkChild) {
  const _fieldBuilder = new odata_common_1.FieldBuilder(
    TestEntityCircularLinkChild
  );
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityCircularLinkChild.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * Static representation of the one-to-one navigation property [[toParent]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityCircularLinkChild.TO_PARENT = new odata_common_1.OneToOneLink(
    'to_Parent',
    TestEntityCircularLinkChild,
    TestEntityCircularLinkParent_1.TestEntityCircularLinkParent
  );
  /**
   * All fields of the TestEntityCircularLinkChild entity.
   */
  TestEntityCircularLinkChild._allFields = [
    TestEntityCircularLinkChild.KEY_PROPERTY,
    TestEntityCircularLinkChild.TO_PARENT
  ];
  /**
   * All fields selector.
   */
  TestEntityCircularLinkChild.ALL_FIELDS = new odata_common_1.AllFields(
    '*',
    TestEntityCircularLinkChild
  );
  /**
   * All key fields of the TestEntityCircularLinkChild entity.
   */
  TestEntityCircularLinkChild._keyFields = [
    TestEntityCircularLinkChild.KEY_PROPERTY
  ];
  /**
   * Mapping of all key field names to the respective static field property TestEntityCircularLinkChild.
   */
  TestEntityCircularLinkChild._keys =
    TestEntityCircularLinkChild._keyFields.reduce((acc, field) => {
      acc[field._fieldName] = field;
      return acc;
    }, {});
})(
  (TestEntityCircularLinkChild =
    exports.TestEntityCircularLinkChild ||
    (exports.TestEntityCircularLinkChild = {}))
);
//# sourceMappingURL=TestEntityCircularLinkChild.js.map
