"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionImports = exports.resetDataSource = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var v4_1 = require("@sap-cloud-sdk/core/v4");
/**
 * Reset Data Source.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function resetDataSource(parameters) {
    var params = {};
    return new v4_1.ActionImportRequestBuilder('TripPinRESTierService/(S(duh2c3dgb1c5lzc0bqwgyekc))/', 'ResetDataSource', function (data) { return v4_1.transformReturnValueForUndefined(data, function (val) { return undefined; }); }, params);
}
exports.resetDataSource = resetDataSource;
exports.actionImports = {
    resetDataSource: resetDataSource
};
//# sourceMappingURL=action-imports.js.map