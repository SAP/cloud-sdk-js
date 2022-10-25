'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Airports = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
/**
 * This class represents the entity "Airports" of service "Microsoft.OData.SampleService.Models.TripPin".
 */
class Airports extends odata_v4_1.Entity {
  constructor(_entityApi) {
    super(_entityApi);
    this._entityApi = _entityApi;
  }
  getNearestAirport(lat, lon) {
    const params = {
      lat: new odata_v4_1.FunctionImportParameter('lat', 'Edm.Double', lat),
      lon: new odata_v4_1.FunctionImportParameter('lon', 'Edm.Double', lon)
    };
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundFunctionRequestBuilder(
      this._entityApi,
      this,
      'Microsoft.OData.SampleService.Models.TripPin.GetNearestAirport',
      data => data,
      params,
      deSerializers
    );
  }
  resetDataSource() {
    const params = {};
    const deSerializers = odata_v4_1.defaultDeSerializers;
    return new odata_v4_1.BoundActionRequestBuilder(
      this._entityApi,
      this,
      'Microsoft.OData.SampleService.Models.TripPin.ResetDataSource',
      data => data,
      params,
      deSerializers
    );
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
/**
 * All key fields of the Airports entity
 */
Airports._keys = ['IcaoCode'];
//# sourceMappingURL=Airports.js.map
