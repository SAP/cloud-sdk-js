"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionImports = exports.resetDataSource = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
require("@sap-cloud-sdk/odata-common");
var odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
/**
 * Reset Data Source.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function resetDataSource(parameters) {
    var params = {};
    return new odata_v4_1.ActionImportRequestBuilder('V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/', 'ResetDataSource', function (data) { return (0, odata_v4_1.transformReturnValueForUndefined)(data, function (val) { return undefined; }); }, params);
}
exports.resetDataSource = resetDataSource;
exports.actionImports = {
    resetDataSource: resetDataSource
};
//# sourceMappingURL=action-imports.js.map