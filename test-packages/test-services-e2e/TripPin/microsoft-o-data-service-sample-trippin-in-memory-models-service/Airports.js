'use strict';
var __extends =
  (this && this.__extends) ||
  (function () {
    var extendStatics = function (d, b) {
      extendStatics =
        Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array &&
          function (d, b) {
            d.__proto__ = b;
          }) ||
        function (d, b) {
          for (var p in b)
            if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
        };
      return extendStatics(d, b);
    };
    return function (d, b) {
      if (typeof b !== 'function' && b !== null)
        throw new TypeError(
          'Class extends value ' + String(b) + ' is not a constructor or null'
        );
      extendStatics(d, b);
      function __() {
        this.constructor = d;
      }
      d.prototype =
        b === null
          ? Object.create(b)
          : ((__.prototype = b.prototype), new __());
    };
  })();
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Airports = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var AirportsRequestBuilder_1 = require('./AirportsRequestBuilder');
var AirportLocation_1 = require('./AirportLocation');
var core_1 = require('@sap-cloud-sdk/core');
/**
 * This class represents the entity "Airports" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
var Airports = /** @class */ (function (_super) {
  __extends(Airports, _super);
  function Airports() {
    return (_super !== null && _super.apply(this, arguments)) || this;
  }
  /**
   * Returns an entity builder to construct instances of `Airports`.
   * @returns A builder that constructs instances of entity type `Airports`.
   */
  Airports.builder = function () {
    return core_1.EntityV4.entityBuilder(Airports);
  };
  /**
   * Returns a request builder to construct requests for operations on the `Airports` entity type.
   * @returns A `Airports` request builder.
   */
  Airports.requestBuilder = function () {
    return new AirportsRequestBuilder_1.AirportsRequestBuilder();
  };
  /**
   * Returns a selectable object that allows the selection of custom field in a get request for the entity `Airports`.
   * @param fieldName Name of the custom field to select
   * @returns A builder that constructs instances of entity type `Airports`.
   */
  Airports.customField = function (fieldName) {
    return core_1.EntityV4.customFieldSelector(fieldName, Airports);
  };
  /**
   * Overwrites the default toJSON method so that all instance variables as well as all custom fields of the entity are returned.
   * @returns An object containing all instance variables + custom fields.
   */
  Airports.prototype.toJSON = function () {
    return __assign(__assign({}, this), this._customFields);
  };
  /**
   * Technical entity name for Airports.
   */
  Airports._entityName = 'Airports';
  /**
   * Default url path for the according service.
   */
  Airports._defaultServicePath =
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/';
  return Airports;
})(core_1.EntityV4);
exports.Airports = Airports;
(function (Airports) {
  var _fieldBuilder = new core_1.FieldBuilder(Airports);
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
  Airports._keys = Airports._keyFields.reduce(function (acc, field) {
    acc[field._fieldName] = field;
    return acc;
  }, {});
})((Airports = exports.Airports || (exports.Airports = {})));
exports.Airports = Airports;
//# sourceMappingURL=Airports.js.map
