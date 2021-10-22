"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionImports = exports.getNearestAirport = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var odata_common_1 = require("@sap-cloud-sdk/odata-common");
var odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
var Airports_1 = require("./Airports");
/**
 * Get Nearest Airport.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function getNearestAirport(parameters) {
    var params = {
        lat: new odata_common_1.FunctionImportParameter('lat', 'Edm.Double', parameters.lat),
        lon: new odata_common_1.FunctionImportParameter('lon', 'Edm.Double', parameters.lon)
    };
    return new odata_v4_1.FunctionImportRequestBuilder('V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/', 'GetNearestAirport', function (data) { return (0, odata_v4_1.transformReturnValueForEntity)(data, Airports_1.Airports); }, params);
}
exports.getNearestAirport = getNearestAirport;
exports.functionImports = {
    getNearestAirport: getNearestAirport
};
//# sourceMappingURL=function-imports.js.map