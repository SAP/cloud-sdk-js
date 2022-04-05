'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.CaseTestApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const CaseTest_1 = require('./CaseTest');
const CaseTestRequestBuilder_1 = require('./CaseTestRequestBuilder');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
class CaseTestApi {
  constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
    this.entityConstructor = CaseTest_1.CaseTest;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {};
    return this;
  }
  requestBuilder() {
    return new CaseTestRequestBuilder_1.CaseTestRequestBuilder(this);
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
        CaseTest_1.CaseTest,
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
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new odata_v2_1.AllFields('*', CaseTest_1.CaseTest)
      };
    }
    return this._schema;
  }
}
exports.CaseTestApi = CaseTestApi;
//# sourceMappingURL=CaseTestApi.js.map
