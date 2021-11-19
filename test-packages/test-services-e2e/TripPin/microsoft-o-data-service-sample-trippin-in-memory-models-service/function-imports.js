'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.functionImports = exports.getNearestAirport = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const Airports_1 = require('./Airports');
/**
 * Get Nearest Airport.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function getNearestAirport(parameters) {
  const params = {
    lat: new internal_1.FunctionImportParameter(
      'lat',
      'Edm.Double',
      parameters.lat
    ),
    lon: new internal_1.FunctionImportParameter(
      'lon',
      'Edm.Double',
      parameters.lon
    )
  };
  return new odata_v4_1.FunctionImportRequestBuilder(
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/',
    'GetNearestAirport',
    data =>
      (0, odata_v4_1.transformReturnValueForEntity)(data, Airports_1.Airports),
    params
  );
}
exports.getNearestAirport = getNearestAirport;
exports.functionImports = {
  getNearestAirport
};
//# sourceMappingURL=function-imports.js.map
