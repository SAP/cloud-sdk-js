'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntity = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityRequestBuilder_1 = require('./TestEntityRequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const odata_common_1 = require('@sap-cloud-sdk/odata-common');
/**
 * This class represents the entity "TestEntity" of service "TestService".
 */
class TestEntity extends odata_v4_1.Entity {
  /**
   * Returns an entity builder to construct instances of `TestEntity`.
   * @returns A builder that constructs instances of entity type `TestEntity`.
   */
  static builder() {
    return odata_v4_1.Entity.entityBuilder(TestEntity);
  }
  /**
   * Returns a request builder to construct requests for operations on the `TestEntity` entity type.
   * @returns A `TestEntity` request builder.
   */
  static requestBuilder() {
    return new TestEntityRequestBuilder_1.TestEntityRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `TestEntity`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `TestEntity`.
   */
  static customField(fieldName) {
    return odata_v4_1.Entity.customFieldSelector(fieldName, TestEntity);
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.TestEntity = TestEntity;
/**
 * Technical entity name for TestEntity.
 */
TestEntity._entityName = 'TestEntity';
/**
 * Default url path for the according service.
 */
TestEntity._defaultServicePath = '/odata/test-service';
const TestEntityLink_1 = require('./TestEntityLink');
(function (TestEntity) {
  const _fieldBuilder = new odata_common_1.FieldBuilder(TestEntity);
  /**
   * Static representation of the [[keyTestEntity]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.KEY_TEST_ENTITY = _fieldBuilder.buildEdmTypeField(
    'KeyTestEntity',
    'Edm.Int32',
    false
  );
  /**
   * Static representation of the [[stringProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.STRING_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'StringProperty',
    'Edm.String',
    true
  );
  /**
   * Static representation of the [[guidProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.GUID_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'GuidProperty',
    'Edm.Guid',
    true
  );
  /**
   * Static representation of the [[booleanProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.BOOLEAN_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'BooleanProperty',
    'Edm.Boolean',
    true
  );
  /**
   * Static representation of the [[int64Property]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.INT_64_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'Int64Property',
    'Edm.Int64',
    true
  );
  /**
   * Static representation of the [[doubleProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.DOUBLE_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'DoubleProperty',
    'Edm.Double',
    true
  );
  /**
   * Static representation of the [[decimalProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.DECIMAL_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'DecimalProperty',
    'Edm.Decimal',
    true
  );
  /**
   * Static representation of the [[dateProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.DATE_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'DateProperty',
    'Edm.Date',
    true
  );
  /**
   * Static representation of the [[timeOfDayProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.TIME_OF_DAY_PROPERTY = _fieldBuilder.buildEdmTypeField(
    'TimeOfDayProperty',
    'Edm.TimeOfDay',
    true
  );
  /**
   * Static representation of the [[dataTimeOffsetDataTimeProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.DATA_TIME_OFFSET_DATA_TIME_PROPERTY =
    _fieldBuilder.buildEdmTypeField(
      'DataTimeOffsetDataTimeProperty',
      'Edm.DateTimeOffset',
      true
    );
  /**
   * Static representation of the [[dataTimeOffsetTimestampProperty]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY =
    _fieldBuilder.buildEdmTypeField(
      'DataTimeOffsetTimestampProperty',
      'Edm.DateTimeOffset',
      true
    );
  /**
   * Static representation of the one-to-many navigation property [[toMultiLink]] for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  TestEntity.TO_MULTI_LINK = new odata_common_1.OneToManyLink(
    'ToMultiLink',
    TestEntity,
    TestEntityLink_1.TestEntityLink
  );
  /**
   * All fields of the TestEntity entity.
   */
  TestEntity._allFields = [
    TestEntity.KEY_TEST_ENTITY,
    TestEntity.STRING_PROPERTY,
    TestEntity.GUID_PROPERTY,
    TestEntity.BOOLEAN_PROPERTY,
    TestEntity.INT_64_PROPERTY,
    TestEntity.DOUBLE_PROPERTY,
    TestEntity.DECIMAL_PROPERTY,
    TestEntity.DATE_PROPERTY,
    TestEntity.TIME_OF_DAY_PROPERTY,
    TestEntity.DATA_TIME_OFFSET_DATA_TIME_PROPERTY,
    TestEntity.DATA_TIME_OFFSET_TIMESTAMP_PROPERTY,
    TestEntity.TO_MULTI_LINK
  ];
  /**
   * All fields selector.
   */
  TestEntity.ALL_FIELDS = new odata_common_1.AllFields('*', TestEntity);
  /**
   * All key fields of the TestEntity entity.
   */
  TestEntity._keyFields = [TestEntity.KEY_TEST_ENTITY];
  /**
   * Mapping of all key field names to the respective static field property TestEntity.
   */
  TestEntity._keys = TestEntity._keyFields.reduce((acc, field) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((TestEntity = exports.TestEntity || (exports.TestEntity = {})));
//# sourceMappingURL=TestEntity.js.map
