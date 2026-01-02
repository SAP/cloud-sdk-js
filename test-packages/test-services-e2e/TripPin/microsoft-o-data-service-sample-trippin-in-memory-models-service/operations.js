"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operations = void 0;
exports.getNearestAirport = getNearestAirport;
exports.resetDataSource = resetDataSource;
/*
 * Copyright (c) 2026 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const service_1 = require("./service");
/**
 * Get Nearest Airport.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function getNearestAirport(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {
        lat: new odata_v4_1.OperationParameter('lat', 'Edm.Double', parameters.lat),
        lon: new odata_v4_1.OperationParameter('lon', 'Edm.Double', parameters.lon)
    };
    return new odata_v4_1.OperationRequestBuilder('V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/', 'GetNearestAirport', data => (0, odata_v4_1.transformReturnValueForEntity)(data, (0, service_1.microsoftODataServiceSampleTrippinInMemoryModelsService)(deSerializers)
        .airportsApi), params, deSerializers, 'function');
}
/**
 * Reset Data Source.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function resetDataSource(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/', 'ResetDataSource', data => (0, odata_v4_1.transformReturnValueForUndefined)(data, val => undefined), params, deSerializers, 'action');
}
exports.operations = {
    getNearestAirport,
    resetDataSource
};
//# sourceMappingURL=operations.js.map