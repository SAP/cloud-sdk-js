"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionImports = exports.concatStrings = exports.returnSapCloudSdk = exports.returnInt = exports.getByKey = void 0;
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
    return new core_1.FunctionImportRequestBuilder('/odata/test-service', 'getByKey', function (data) { return core_1.transformReturnValueForEntity(data, TestEntity_1.TestEntity); }, params);
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
    return new core_1.FunctionImportRequestBuilder('/odata/test-service', 'returnInt', function (data) { return core_1.transformReturnValueForEdmType(data, function (val) { return core_1.edmToTs(val.value, 'Edm.Int32'); }); }, params);
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
    return new core_1.FunctionImportRequestBuilder('/odata/test-service', 'returnSapCloudSdk', function (data) { return core_1.transformReturnValueForEdmType(data, function (val) { return core_1.edmToTs(val.value, 'Edm.String'); }); }, params);
}
exports.returnSapCloudSdk = returnSapCloudSdk;
/**
 * Concat Strings.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function concatStrings(parameters) {
    var params = {
        str1: new core_1.FunctionImportParameter('Str1', 'Edm.String', parameters.str1),
        str2: new core_1.FunctionImportParameter('Str2', 'Edm.String', parameters.str2)
    };
    return new core_1.FunctionImportRequestBuilder('/odata/test-service', 'concatStrings', function (data) { return core_1.transformReturnValueForEdmType(data, function (val) { return core_1.edmToTs(val.value, 'Edm.String'); }); }, params);
}
exports.concatStrings = concatStrings;
exports.functionImports = {
    getByKey: getByKey,
    returnInt: returnInt,
    returnSapCloudSdk: returnSapCloudSdk,
    concatStrings: concatStrings
};
//# sourceMappingURL=function-imports.js.map