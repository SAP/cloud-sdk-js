'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityWithEnumKeyApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityWithEnumKey_1 = require('./TestEntityWithEnumKey');
const TestEntityWithEnumKeyRequestBuilder_1 = require('./TestEntityWithEnumKeyRequestBuilder');
const TestEnumType_1 = require('./TestEnumType');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
class TestEntityWithEnumKeyApi {
  constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
    this.entityConstructor = TestEntityWithEnumKey_1.TestEntityWithEnumKey;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {};
    return this;
  }
  requestBuilder() {
    return new TestEntityWithEnumKeyRequestBuilder_1.TestEntityWithEnumKeyRequestBuilder(
      this
    );
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
        TestEntityWithEnumKey_1.TestEntityWithEnumKey,
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
         * Static representation of the [[keyPropertyEnum1]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY_ENUM_1: fieldBuilder.buildEnumField(
          'KeyPropertyEnum1',
          TestEnumType_1.TestEnumType,
          false
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new odata_v4_1.AllFields(
          '*',
          TestEntityWithEnumKey_1.TestEntityWithEnumKey
        )
      };
    }
    return this._schema;
  }
}
exports.TestEntityWithEnumKeyApi = TestEntityWithEnumKeyApi;
//# sourceMappingURL=TestEntityWithEnumKeyApi.js.map
