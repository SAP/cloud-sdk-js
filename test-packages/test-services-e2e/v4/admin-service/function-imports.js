"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionImports = exports.returnSapCloudSdk = exports.returnInt = exports.getByKey = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var TestEntity_1 = require("./TestEntity");
/**
 * Get By Key.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function getByKey(parameters) {
    var params = {
        param: new core_1.FunctionImportParameter('param', 'Edm.Int32', parameters.param)
    };
    return new core_1.FunctionImportRequestBuilderV4('/admin', 'getByKey', function (data) { return core_1.transformReturnValueForEntityV4(data, TestEntity_1.TestEntity); }, params);
}
exports.getByKey = getByKey;
/**
 * Return Int.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function returnInt(parameters) {
    var params = {
        param: new core_1.FunctionImportParameter('param', 'Edm.Int32', parameters.param)
    };
    return new core_1.FunctionImportRequestBuilderV4('/admin', 'returnInt', function (data) { return core_1.transformReturnValueForEdmTypeV4(data, function (val) { return core_1.edmToTsV4(val.value, 'Edm.Int32'); }); }, params);
}
exports.returnInt = returnInt;
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
    getByKey: getByKey,
    returnInt: returnInt,
    returnSapCloudSdk: returnSapCloudSdk
};
//# sourceMappingURL=function-imports.js.map