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
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
class TestEntityApi {
  constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
    this.entityConstructor = TestEntity_1.TestEntity;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {
      TO_MULTI_LINK: new odata_v2_1.Link('to_MultiLink', this, linkedApis[0]),
      TO_SINGLE_LINK: new odata_v2_1.OneToOneLink(
        'to_SingleLink',
        this,
        linkedApis[1]
      )
    };
    return this;
  }
  requestBuilder() {
    return new TestEntityRequestBuilder_1.TestEntityRequestBuilder(this);
  }
  entityBuilder() {
    return (0, odata_v2_1.entityBuilder)(this);
  }
  customField(fieldName, isNullable = false) {
    return new odata_v2_1.CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    );
  }
  get fieldBuilder() {
    if (!this._fieldBuilder) {
      this._fieldBuilder = new odata_v2_1.FieldBuilder(
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
         * Static representation of the [[keyPropertyGuid]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY_GUID: fieldBuilder.buildEdmTypeField(
          'KeyPropertyGuid',
          'Edm.Guid',
          false
        ),
        /**
         * Static representation of the [[keyPropertyString]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY_STRING: fieldBuilder.buildEdmTypeField(
          'KeyPropertyString',
          'Edm.String',
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
         * Static representation of the [[booleanProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        BOOLEAN_PROPERTY: fieldBuilder.buildEdmTypeField(
          'BooleanProperty',
          'Edm.Boolean',
          true
        ),
        /**
         * Static representation of the [[int16Property]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        INT_16_PROPERTY: fieldBuilder.buildEdmTypeField(
          'Int16Property',
          'Edm.Int16',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new odata_v2_1.AllFields('*', TestEntity_1.TestEntity)
      };
    }
    return this._schema;
  }
}
exports.TestEntityApi = TestEntityApi;
//# sourceMappingURL=TestEntityApi.js.map
