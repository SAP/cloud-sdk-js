'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityLvl3MultiLink = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityLvl3MultiLinkRequestBuilder_1 = require('./TestEntityLvl3MultiLinkRequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * This class represents the entity "A_TestEntityLvl3MultiLink" of service "API_TEST_SRV".
 */
class TestEntityLvl3MultiLink extends odata_v4_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntityLvl3MultiLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl3MultiLink`.
   */
  static builder() {
    return odata_v4_1.Entity.entityBuilder(TestEntityLvl3MultiLink);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLvl3MultiLink` entity type.
   * @returns A `TestEntityLvl3MultiLink` request builder.
   */
  static requestBuilder() {
    return new TestEntityLvl3MultiLinkRequestBuilder_1.TestEntityLvl3MultiLinkRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLvl3MultiLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLvl3MultiLink`.
   */
  static customField(fieldName) {
    return odata_v4_1.Entity.customFieldSelector(
      fieldName,
      TestEntityLvl3MultiLink
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
exports.TestEntityLvl3MultiLink = TestEntityLvl3MultiLink;
/**
 * Technical entity name for TestEntityLvl3MultiLink.
 */
TestEntityLvl3MultiLink._entityName = 'A_TestEntityLvl3MultiLink';
/**
 * Default url path for the according service.
 */
TestEntityLvl3MultiLink._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
(function (TestEntityLvl3MultiLink) {
  const _fieldBuilder = new internal_1.FieldBuilder(TestEntityLvl3MultiLink);
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl3MultiLink.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl3MultiLink.GUID_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'GuidProperty',
    'Edm.Guid',
    true
  );
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl3MultiLink.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * All fields of the TestEntityLvl3MultiLink entity.
   */
  TestEntityLvl3MultiLink._allFields = [
    TestEntityLvl3MultiLink.STRING_PROPERTY,
    TestEntityLvl3MultiLink.GUID_PROPERTY,
    TestEntityLvl3MultiLink.KEY_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntityLvl3MultiLink.ALL_FIELDS = new internal_1.AllFields(
    '*',
    TestEntityLvl3MultiLink
  );
  /**
   * All key fields of the TestEntityLvl3MultiLink entity.
   */
  TestEntityLvl3MultiLink._keyFields = [TestEntityLvl3MultiLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl3MultiLink.
   */
  TestEntityLvl3MultiLink._keys = TestEntityLvl3MultiLink._keyFields.reduce(
    (acc, field) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (TestEntityLvl3MultiLink =
    exports.TestEntityLvl3MultiLink || (exports.TestEntityLvl3MultiLink = {}))
);
//# sourceMappingURL=TestEntityLvl3MultiLink.js.map
