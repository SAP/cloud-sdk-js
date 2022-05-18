'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.MultiSchemaTestEntityApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const MultiSchemaTestEntity_1 = require('./MultiSchemaTestEntity');
const MultiSchemaTestEntityRequestBuilder_1 = require('./MultiSchemaTestEntityRequestBuilder');
const odata_v2_1 = require('@sap-cloud-sdk/odata-v2');
class MultiSchemaTestEntityApi {
  constructor(deSerializers = odata_v2_1.defaultDeSerializers) {
    this.entityConstructor = MultiSchemaTestEntity_1.MultiSchemaTestEntity;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {};
    return this;
  }
  requestBuilder() {
    return new MultiSchemaTestEntityRequestBuilder_1.MultiSchemaTestEntityRequestBuilder(
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
        MultiSchemaTestEntity_1.MultiSchemaTestEntity,
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
          MultiSchemaTestEntity_1.MultiSchemaTestEntity
        )
      };
    }
    return this._schema;
  }
}
exports.MultiSchemaTestEntityApi = MultiSchemaTestEntityApi;
//# sourceMappingURL=MultiSchemaTestEntityApi.js.map
