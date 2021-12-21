'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.TestEntityEndsWithSomethingElseApi = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const TestEntityEndsWithSomethingElse_1 = require('./TestEntityEndsWithSomethingElse');
const TestEntityEndsWithSomethingElseRequestBuilder_1 = require('./TestEntityEndsWithSomethingElseRequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
class TestEntityEndsWithSomethingElseApi {
  constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
    this.entityConstructor =
      TestEntityEndsWithSomethingElse_1.TestEntityEndsWithSomethingElse;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {};
    return this;
  }
  requestBuilder() {
    return new TestEntityEndsWithSomethingElseRequestBuilder_1.TestEntityEndsWithSomethingElseRequestBuilder(
      this
    );
  }
  entityBuilder() {
    return (0, internal_1.entityBuilder)(this);
  }
  customField(fieldName, isNullable = false) {
    return new odata_v4_1.CustomField(
      fieldName,
      this.entityConstructor,
      this.deSerializers,
      isNullable
    );
  }
  get schema() {
    const fieldBuilder = new internal_1.FieldBuilder(
      TestEntityEndsWithSomethingElse_1.TestEntityEndsWithSomethingElse,
      this.deSerializers
    );
    return {
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
      ALL_FIELDS: new internal_1.AllFields(
        '*',
        TestEntityEndsWithSomethingElse_1.TestEntityEndsWithSomethingElse
      )
    };
  }
}
exports.TestEntityEndsWithSomethingElseApi = TestEntityEndsWithSomethingElseApi;
//# sourceMappingURL=TestEntityEndsWithSomethingElseApi.js.map
