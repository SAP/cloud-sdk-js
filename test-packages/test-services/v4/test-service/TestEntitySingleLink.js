'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntitySingleLink = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntitySingleLinkRequestBuilder_1 = require('./TestEntitySingleLinkRequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
/**
 * This class represents the entity "A_TestEntitySingleLink" of service "API_TEST_SRV".
 */
class TestEntitySingleLink extends odata_v4_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntitySingleLink`.
   * @returns A builder that constructs instances of entity type `TestEntitySingleLink`.
   */
  static builder() {
    return odata_v4_1.Entity.entityBuilder(TestEntitySingleLink);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntitySingleLink` entity type.
   * @returns A `TestEntitySingleLink` request builder.
   */
  static requestBuilder() {
    return new TestEntitySingleLinkRequestBuilder_1.TestEntitySingleLinkRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntitySingleLink`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntitySingleLink`.
   */
  static customField(fieldName) {
    return odata_v4_1.Entity.customFieldSelector(
      fieldName,
      TestEntitySingleLink
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
exports.TestEntitySingleLink = TestEntitySingleLink;
/**
 * Technical entity name for TestEntitySingleLink.
 */
TestEntitySingleLink._entityName = 'A_TestEntitySingleLink';
/**
 * Default url path for the according service.
 */
TestEntitySingleLink._defaultServicePath = '/sap/opu/odata/sap/API_TEST_SRV';
const TestEntityLvl2MultiLink_1 = require('./TestEntityLvl2MultiLink');
const TestEntityLvl2SingleLink_1 = require('./TestEntityLvl2SingleLink');
(function (TestEntitySingleLink) {
  const _fieldBuilder = new internal_1.FieldBuilder(TestEntitySingleLink);
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntitySingleLink.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntitySingleLink.BOOLEAN_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
    true
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntitySingleLink.GUID_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'GuidProperty',
    'Edm.Guid',
    true
  );
  /**
   * Static representation of the [[int16Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntitySingleLink.INT_16_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int16Property',
    'Edm.Int16',
    true
  );
  /**
   * Static representation of the [[keyProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntitySingleLink.KEY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'KeyProperty',
    'Edm.String',
    false
  );
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntitySingleLink.TO_MULTI_LINK = new internal_1.OneToManyLink(
    'to_MultiLink',
    TestEntitySingleLink,
    TestEntityLvl2MultiLink_1.TestEntityLvl2MultiLink
  );
  /**
   * Static representation of the one-to-one navigation property [[toSingleLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntitySingleLink.TO_SINGLE_LINK = new internal_1.OneToOneLink(
    'to_SingleLink',
    TestEntitySingleLink,
    TestEntityLvl2SingleLink_1.TestEntityLvl2SingleLink
  );
  /**
   * All fields of the TestEntitySingleLink entity.
   */
  TestEntitySingleLink._allFields = [
    TestEntitySingleLink.STRING_PROPERTY,
    TestEntitySingleLink.BOOLEAN_PROPERTY,
    TestEntitySingleLink.GUID_PROPERTY,
    TestEntitySingleLink.INT_16_PROPERTY,
    TestEntitySingleLink.KEY_PROPERTY,
    TestEntitySingleLink.TO_MULTI_LINK,
    TestEntitySingleLink.TO_SINGLE_LINK
  ];
  /**
   * All fields selector.
   */
  TestEntitySingleLink.ALL_FIELDS = new internal_1.AllFields(
    '*',
    TestEntitySingleLink
  );
  /**
   * All key fields of the TestEntitySingleLink entity.
   */
  TestEntitySingleLink._keyFields = [TestEntitySingleLink.KEY_PROPERTY];
  /**
   * Mapping of all key field names to the respective static field property TestEntitySingleLink.
   */
  TestEntitySingleLink._keys = TestEntitySingleLink._keyFields.reduce(
    (acc, field) => {
      acc[field._fieldName] = field;
      return acc;
    },
    {}
  );
})(
  (TestEntitySingleLink =
    exports.TestEntitySingleLink || (exports.TestEntitySingleLink = {}))
);
//# sourceMappingURL=TestEntitySingleLink.js.map
