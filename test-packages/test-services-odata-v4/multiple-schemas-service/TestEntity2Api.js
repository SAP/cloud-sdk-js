'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntity2Api = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntity2_1 = require('./TestEntity2');
const TestEntity2RequestBuilder_1 = require('./TestEntity2RequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
class TestEntity2Api {
  constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
    this.entityConstructor = TestEntity2_1.TestEntity2;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {};
    return this;
  }
  requestBuilder() {
    return new TestEntity2RequestBuilder_1.TestEntity2RequestBuilder(this);
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
        TestEntity2_1.TestEntity2,
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
         * Static representation of the [[keyPropertyString]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY_STRING: fieldBuilder.buildEdmTypeField(
          'KeyPropertyString',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the [[singleProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        SINGLE_PROPERTY: fieldBuilder.buildEdmTypeField(
          'SingleProperty',
          'Edm.Single',
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new odata_v4_1.AllFields('*', TestEntity2_1.TestEntity2)
      };
    }
    return this._schema;
  }
}
exports.TestEntity2Api = TestEntity2Api;
//# sourceMappingURL=TestEntity2Api.js.map
