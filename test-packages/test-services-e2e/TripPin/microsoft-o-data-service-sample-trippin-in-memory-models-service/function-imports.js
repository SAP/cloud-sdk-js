"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionImports = exports.getNearestAirport = exports.getPersonWithMostFriends = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var People_1 = require("./People");
var Airports_1 = require("./Airports");
/**
 * Get Person With Most Friends.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function getPersonWithMostFriends(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilderV4('TripPinRESTierService/(S(duh2c3dgb1c5lzc0bqwgyekc))/', 'GetPersonWithMostFriends', function (data) { return core_1.transformReturnValueForEntityV4(data, People_1.People); }, params);
}
exports.getPersonWithMostFriends = getPersonWithMostFriends;
/**
 * Get Nearest Airport.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function getNearestAirport(parameters) {
    var params = {
        lat: new core_1.FunctionImportParameter('lat', 'Edm.Double', parameters.lat),
        lon: new core_1.FunctionImportParameter('lon', 'Edm.Double', parameters.lon)
    };
    return new core_1.FunctionImportRequestBuilderV4('TripPinRESTierService/(S(duh2c3dgb1c5lzc0bqwgyekc))/', 'GetNearestAirport', function (data) { return core_1.transformReturnValueForEntityV4(data, Airports_1.Airports); }, params);
}
exports.getNearestAirport = getNearestAirport;
exports.functionImports = {
    getPersonWithMostFriends: getPersonWithMostFriends,
    getNearestAirport: getNearestAirport
};
//# sourceMappingURL=function-imports.js.map