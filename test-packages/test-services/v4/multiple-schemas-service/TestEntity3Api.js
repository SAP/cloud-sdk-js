'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntity3Api = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntity3_1 = require('./TestEntity3');
const TestEntity3RequestBuilder_1 = require('./TestEntity3RequestBuilder');
const TestComplexType2_1 = require('./TestComplexType2');
const TestEnumType2_1 = require('./TestEnumType2');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
class TestEntity3Api {
  constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
    this.entityConstructor = TestEntity3_1.TestEntity3;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {};
    return this;
  }
  requestBuilder() {
    return new TestEntity3RequestBuilder_1.TestEntity3RequestBuilder(this);
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
        TestEntity3_1.TestEntity3,
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
         * Static representation of the [[enumProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ENUM_PROPERTY: fieldBuilder.buildEnumField(
          'EnumProperty',
          TestEnumType2_1.TestEnumType2,
          true
        ),
        /**
         * Static representation of the [[complexTypeProperty]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        COMPLEX_TYPE_PROPERTY: fieldBuilder.buildComplexTypeField(
          'ComplexTypeProperty',
          TestComplexType2_1.TestComplexType2Field,
          true
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new odata_v4_1.AllFields('*', TestEntity3_1.TestEntity3)
      };
    }
    return this._schema;
  }
}
exports.TestEntity3Api = TestEntity3Api;
//# sourceMappingURL=TestEntity3Api.js.map
