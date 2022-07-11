'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Casetest_1Api = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const Casetest_1_1 = require('./Casetest_1');
const Casetest_1RequestBuilder_1 = require('./Casetest_1RequestBuilder');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
class Casetest_1Api {
  constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
    this.entityConstructor = Casetest_1_1.Casetest_1;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {};
    return this;
  }
  requestBuilder() {
    return new Casetest_1RequestBuilder_1.Casetest_1RequestBuilder(this);
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
        Casetest_1_1.Casetest_1,
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
        ALL_FIELDS: new odata_v2_1.AllFields('*', Casetest_1_1.Casetest_1)
      };
    }
    return this._schema;
  }
}
exports.Casetest_1Api = Casetest_1Api;
//# sourceMappingURL=Casetest_1Api.js.map
