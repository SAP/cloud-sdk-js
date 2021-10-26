'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Airports = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const AirportsRequestBuilder_1 = require('./AirportsRequestBuilder');
const AirportLocation_1 = require('./AirportLocation');
const core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "Airports" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
class Airports extends core_1.EntityV4 {
  /**
   * Returns an entity builder to construct instances of `Airports`.
   * @returns A builder that constructs instances of entity type `Airports`.
   */
  static builder() {
    return core_1.EntityV4.entityBuilder(Airports);
  }
  /**
   * Returns a request builder to construct requests for operations on the `Airports` entity type.
   * @returns A `Airports` request builder.
   */
  static requestBuilder() {
    return new AirportsRequestBuilder_1.AirportsRequestBuilder();
  }
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Airports`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Airports`.
   */
  static customField(fieldName) {
    return core_1.EntityV4.customFieldSelector(fieldName, Airports);
  }
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  toJSON() {
    return { ...this, ...this._customFields };
  }
}
exports.Airports = Airports;
/**
 * Technical entity name for Airports.
 */
Airports._entityName = 'Airports';
/**
 * Default url path for the according service.
 */
Airports._defaultServicePath =
  'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
(function (Airports) {
  const _fieldBuilder = new core_1.FieldBuilder(Airports);
  /**
   * Static representation of the [[icaoCode]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Airports.ICAO_CODE = _fieldBuilder.buildEdmTypeField(
    'IcaoCode',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[name]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Airports.NAME = _fieldBuilder.buildEdmTypeField('Name', 'Edm.String', false);
  /**
   * Static representation of the [[iataCode]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Airports.IATA_CODE = _fieldBuilder.buildEdmTypeField(
    'IataCode',
    'Edm.String',
    false
  );
  /**
   * Static representation of the [[location]] property for query construction.
   * Use to reference this property in query operations such as 'select' in the fluent request API.
   */
  Airports.LOCATION = _fieldBuilder.buildComplexTypeField(
    'Location',
    AirportLocation_1.AirportLocationField,
    false
  );
  /**
   * All fields of the Airports entity.
   */
  Airports._allFields = [
    Airports.ICAO_CODE,
    Airports.NAME,
    Airports.IATA_CODE,
    Airports.LOCATION
  ];
  /**
   * All fields selector.
   */
  Airports.ALL_FIELDS = new core_1.AllFields('*', Airports);
  /**
   * All key fields of the Airports entity.
   */
  Airports._keyFields = [Airports.ICAO_CODE];
  /**
   * Mapping of all key field names to the respective static field property Airports.
   */
  Airports._keys = Airports._keyFields.reduce((acc, field) => {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((Airports = exports.Airports || (exports.Airports = {})));
//# sourceMappingURL=Airports.js.map
