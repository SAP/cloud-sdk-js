"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionImports = exports.returnSapCloudSdk = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
/**
 * Return Sap Cloud Sdk.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function returnSapCloudSdk(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilderV4('/admin', 'returnSapCloudSdk', function (data) { return core_1.transformReturnValueForEdmTypeV4(data, function (val) { return core_1.edmToTsV4(val.value, 'Edm.String'); }); }, params);
}
exports.returnSapCloudSdk = returnSapCloudSdk;
exports.functionImports = {
    returnSapCloudSdk: returnSapCloudSdk
};
//# sourceMappingURL=function-imports.js.map