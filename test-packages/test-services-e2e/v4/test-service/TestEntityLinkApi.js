'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityLinkApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityLink_1 = require('./TestEntityLink');
const TestEntityLinkRequestBuilder_1 = require('./TestEntityLinkRequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
class TestEntityLinkApi {
  constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
    this.entityConstructor = TestEntityLink_1.TestEntityLink;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {};
    return this;
  }
  requestBuilder() {
    return new TestEntityLinkRequestBuilder_1.TestEntityLinkRequestBuilder(
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
        TestEntityLink_1.TestEntityLink,
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
         * Static representation of the [[keyTestEntityLink]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_TEST_ENTITY_LINK: fieldBuilder.buildEdmTypeField(
          'KeyTestEntityLink',
          'Edm.Int32',
          false
        ),
        /**
         * Static representation of the [[keyToTestEntity]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        KEY_TO_TEST_ENTITY: fieldBuilder.buildEdmTypeField(
          'KeyToTestEntity',
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
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new odata_v4_1.AllFields(
          '*',
          TestEntityLink_1.TestEntityLink
        )
      };
    }
    return this._schema;
  }
}
exports.TestEntityLinkApi = TestEntityLinkApi;
//# sourceMappingURL=TestEntityLinkApi.js.map
