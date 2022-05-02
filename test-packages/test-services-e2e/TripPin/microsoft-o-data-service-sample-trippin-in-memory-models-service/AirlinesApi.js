'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AirlinesApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const Airlines_1 = require('./Airlines');
const AirlinesRequestBuilder_1 = require('./AirlinesRequestBuilder');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
class AirlinesApi {
  constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
    this.entityConstructor = Airlines_1.Airlines;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {};
    return this;
  }
  requestBuilder() {
    return new AirlinesRequestBuilder_1.AirlinesRequestBuilder(this);
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
        Airlines_1.Airlines,
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
         * Static representation of the [[airlineCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        AIRLINE_CODE: fieldBuilder.buildEdmTypeField(
          'AirlineCode',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the [[name]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        NAME: fieldBuilder.buildEdmTypeField('Name', 'Edm.String', false),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new odata_v4_1.AllFields('*', Airlines_1.Airlines)
      };
    }
    return this._schema;
  }
}
exports.AirlinesApi = AirlinesApi;
//# sourceMappingURL=AirlinesApi.js.map
