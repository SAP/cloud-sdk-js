'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.AirportsApi = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const Airports_1 = require('./Airports');
const AirportsRequestBuilder_1 = require('./AirportsRequestBuilder');
const AirportLocation_1 = require('./AirportLocation');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
class AirportsApi {
  constructor(deSerializers = odata_v4_1.defaultDeSerializers) {
    this.entityConstructor = Airports_1.Airports;
    this.deSerializers = deSerializers;
  }
  _addNavigationProperties(linkedApis) {
    this.navigationPropertyFields = {};
    return this;
  }
  requestBuilder() {
    return new AirportsRequestBuilder_1.AirportsRequestBuilder(this);
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
        Airports_1.Airports,
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
         * Static representation of the [[icaoCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        ICAO_CODE: fieldBuilder.buildEdmTypeField(
          'IcaoCode',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the [[name]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        NAME: fieldBuilder.buildEdmTypeField('Name', 'Edm.String', false),
        /**
         * Static representation of the [[iataCode]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        IATA_CODE: fieldBuilder.buildEdmTypeField(
          'IataCode',
          'Edm.String',
          false
        ),
        /**
         * Static representation of the [[location]] property for query construction.
         * Use to reference this property in query operations such as 'select' in the fluent request API.
         */
        LOCATION: fieldBuilder.buildComplexTypeField(
          'Location',
          AirportLocation_1.AirportLocationField,
          false
        ),
        ...this.navigationPropertyFields,
        /**
         *
         * All fields selector.
         */
        ALL_FIELDS: new odata_v4_1.AllFields('*', Airports_1.Airports)
      };
    }
    return this._schema;
  }
}
exports.AirportsApi = AirportsApi;
//# sourceMappingURL=AirportsApi.js.map
