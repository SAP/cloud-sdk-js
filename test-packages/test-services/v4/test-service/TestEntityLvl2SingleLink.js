'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityLvl2SingleLink = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityLvl2SingleLinkRequestBuilder_1 = require('./TestEntityLvl2SingleLinkRequestBuilder');
const core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "A_TestEntityLvl2SingleLink" of service "API_TEST_SRV".
 */
class TestEntityLvl2SingleLink extends core_1.EntityV4 {
  /**
   * Returns an entity builder to construct instances of `TestEntityLvl2SingleLink`.
   * @returns A builder that constructs instances of entity type `TestEntityLvl2SingleLink`.
   */
  static builder() {
    return core_1.EntityV4.entityBuilder(TestEntityLvl2SingleLink);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntityLvl2SingleLink` entity type.
   * @returns A `TestEntityLvl2SingleLink` request builder.
   */
  static requestBuilder() {
    return new TestEntityLvl2SingleLinkRequestBuilder_1.TestEntityLvl2SingleLinkRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntityLvl2SingleLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntityLvl2SingleLink`.
   */
  static customField(fieldName) {
    return core_1.EntityV4.customFieldSelector(
      fieldName,
      TestEntityLvl2SingleLink
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
exports.TestEntityLvl2SingleLink = TestEntityLvl2SingleLink;
/**
 * Technical entity name for TestEntityLvl2SingleLink.
 */
TestEntityLvl2SingleLink._entityName = 'A_TestEntityLvl2SingleLink';
/**
 * Default url path for the according service.
 */
TestEntityLvl2SingleLink._defaultServicePath =
  '/sap/opu/odata/sap/API_TEST_SRV';
(function (TestEntityLvl2SingleLink) {
  const _fieldBuilder = new core_1.FieldBuilder(TestEntityLvl2SingleLink);
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2SingleLink.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2SingleLink.BOOLEAN_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
    true
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2SingleLink.GUID_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'GuidProperty',
    'Edm.Guid',
    true
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2SingleLink.INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int16Property',
    'Edm.Int16',
    true
  );
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntityLvl2SingleLink.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * All fields of the TestEntityLvl2SingleLink entity.
   */
  TestEntityLvl2SingleLink._allFields = [
    TestEntityLvl2SingleLink.STRING_PROPERTY,
    TestEntityLvl2SingleLink.BOOLEAN_PROPERTY,
    TestEntityLvl2SingleLink.GUID_PROPERTY,
    TestEntityLvl2SingleLink.INT_16_PROPERTY,
    TestEntityLvl2SingleLink.KEY_PROPERTY
  ];
  /**
   * All fields selector.
   */
  TestEntityLvl2SingleLink.ALL_FIELDS = new core_1.AllFields(
    '*',
    TestEntityLvl2SingleLink
  );
  /**
   * All key fields of the TestEntityLvl2SingleLink entity.
   */
  TestEntityLvl2SingleLink._keyFields = [TestEntityLvl2SingleLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntityLvl2SingleLink.
   */
  TestEntityLvl2SingleLink._keys = TestEntityLvl2SingleLink._keyFields.reduce(
    (acc, field) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (TestEntityLvl2SingleLink =
    exports.TestEntityLvl2SingleLink || (exports.TestEntityLvl2SingleLink = {}))
);
//# sourceMappingURL=TestEntityLvl2SingleLink.js.map
