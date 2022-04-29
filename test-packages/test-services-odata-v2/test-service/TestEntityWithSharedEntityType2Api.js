'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityWithSharedEntityType2Api = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityWithSharedEntityType2_1 = require('./TestEntityWithSharedEntityType2');
const TestEntityWithSharedEntityType2RequestBuilder_1 = require('./TestEntityWithSharedEntityType2RequestBuilder');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
class TestEntityWithSharedEntityType2Api {
  constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
    this.entityConstructor =
      TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {};
    return this;
  }
  requestBuilder() {
    return new TestEntityWithSharedEntityType2RequestBuilder_1.TestEntityWithSharedEntityType2RequestBuilder(
      this
    );
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
        TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2,
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
         * Static representation of the [[keyProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_PROPERTY: fieldBuilder.buildEdmTypeField(
          'KeyProperty',
          'Edm.String',
          false
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new odata_v2_1.AllFields(
          '*',
          TestEntityWithSharedEntityType2_1.TestEntityWithSharedEntityType2
        )
      };
    }
    return this._schema;
  }
}
exports.TestEntityWithSharedEntityType2Api = TestEntityWithSharedEntityType2Api;
//# sourceMappingURL=TestEntityWithSharedEntityType2Api.js.map
