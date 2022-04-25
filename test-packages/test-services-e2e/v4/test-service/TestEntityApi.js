'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntity_1 = require('./TestEntity');
const TestEntityRequestBuilder_1 = require('./TestEntityRequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
class TestEntityApi {
  constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
    this.entityConstructor = TestEntity_1.TestEntity;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {
      TO_MULTI_LINK: new odata_v4_1.OneToManyLink(
        'ToMultiLink',
        this,
        linkedApis[0]
      )
    };
    return this;
  }
  requestBuilder() {
    return new TestEntityRequestBuilder_1.TestEntityRequestBuilder(this);
  }
  entityBuilder() {
    return (0, odata_v4_1.entityBuilder)(this);
  }
  customField(fieldName, isNullable = false) {
    return new odata_v4_1.CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    );
  }
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new odata_v4_1.FieldBuilder(
        TestEntity_1.TestEntity,
        this.deSerializers
      );
    }
    return this._fieldBuilder;
  }
  get schema() {
    if (!this._schema) {
      const fieldBuilder = this.fieldBuilder;
      this._schema = {
        /**
         * Static representation of the [[keyTestEntity]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_TEST_ENTITY: fieldBuilder.buildEdmTypeField(
          'KeyTestEntity',
          'Edm.Int32',
          false
        ),
        /**
         * Static representation of the [[stringProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        STRING_PROPERTY: fieldBuilder.buildEdmTypeField(
          'StringProperty',
          'Edm.String',
          true
        ),
        /**
         * Static representation of the [[guidProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        GUID_PROPERTY: fieldBuilder.buildEdmTypeField(
          'GuidProperty',
          'Edm.Guid',
          true
        ),
        /**
         * Static representation of the [[booleanProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY: fieldBuilder.buildEdmTypeField(
          'BooleanProperty',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the [[int64Property]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_64_PROPERTY: fieldBuilder.buildEdmTypeField(
          'Int64Property',
          'Edm.Int64',
          true
        ),
        /**
         * Static representation of the [[doubleProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DOUBLE_PROPERTY: fieldBuilder.buildEdmTypeField(
          'DoubleProperty',
          'Edm.Double',
          true
        ),
        /**
         * Static representation of the [[decimalProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DECIMAL_PROPERTY: fieldBuilder.buildEdmTypeField(
          'DecimalProperty',
          'Edm.Decimal',
          true
        ),
        /**
         * Static representation of the [[dateProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATE_PROPERTY: fieldBuilder.buildEdmTypeField(
          'DateProperty',
          'Edm.Date',
          true
        ),
        /**
         * Static representation of the [[timeOfDayProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        TIME_OF_DAY_PROPERTY: fieldBuilder.buildEdmTypeField(
          'TimeOfDayProperty',
          'Edm.TimeOfDay',
          true
        ),
        /**
         * Static representation of the [[dataTimeOffsetDataTimeProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_DATA_TIME_PROPERTY: fieldBuilder.buildEdmTypeField(
          'DataTimeOffsetDataTimeProperty',
          'Edm.DateTimeOffset',
          true
        ),
        /**
         * Static representation of the [[dataTimeOffsetTimestampProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        DATA_TIME_OFFSET_TIMESTAMP_PROPERTY: fieldBuilder.buildEdmTypeField(
          'DataTimeOffsetTimestampProperty',
          'Edm.DateTimeOffset',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new odata_v4_1.AllFields('*', TestEntity_1.TestEntity)
      };
    }
    return this._schema;
  }
}
exports.TestEntityApi = TestEntityApi;
//# sourceMappingURL=TestEntityApi.js.map
