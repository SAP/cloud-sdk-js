"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionImports = exports.getAll = exports.getByKey = exports.returnCollection = exports.returnInt = exports.concatStrings = exports.returnSapCloudSdk = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var TestEntity_1 = require("./TestEntity");
/**
 * Return Sap Cloud Sdk.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function returnSapCloudSdk(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilderV4('/odata/test-service', 'returnSapCloudSdk', function (data) { return (0, core_1.transformReturnValueForEdmTypeV4)(data, function (val) { return (0, core_1.edmToTsV4)(val.value, 'Edm.String'); }); }, params);
}
exports.returnSapCloudSdk = returnSapCloudSdk;
/**
 * Concat Strings.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function concatStrings(parameters) {
    var params = {
        str1: new core_1.FunctionImportParameter('Str1', 'Edm.String', parameters.str1),
        str2: new core_1.FunctionImportParameter('Str2', 'Edm.String', parameters.str2)
    };
    return new core_1.FunctionImportRequestBuilderV4('/odata/test-service', 'concatStrings', function (data) { return (0, core_1.transformReturnValueForEdmTypeV4)(data, function (val) { return (0, core_1.edmToTsV4)(val.value, 'Edm.String'); }); }, params);
}
exports.concatStrings = concatStrings;
/**
 * Return Int.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function returnInt(parameters) {
    var params = {
        param: new core_1.FunctionImportParameter('param', 'Edm.Int32', parameters.param)
    };
    return new core_1.FunctionImportRequestBuilderV4('/odata/test-service', 'returnInt', function (data) { return (0, core_1.transformReturnValueForEdmTypeV4)(data, function (val) { return (0, core_1.edmToTsV4)(val.value, 'Edm.Int32'); }); }, params);
}
exports.returnInt = returnInt;
/**
 * Return Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function returnCollection(parameters) {
    var params = {
        param: new core_1.FunctionImportParameter('param', 'Edm.Int32', parameters.param)
    };
    return new core_1.FunctionImportRequestBuilderV4('/odata/test-service', 'returnCollection', function (data) { return (0, core_1.transformReturnValueForEdmTypeListV4)(data, function (val) { return (0, core_1.edmToTsV4)(val, 'Edm.Int32'); }); }, params);
}
exports.returnCollection = returnCollection;
/**
 * Get By Key.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function getByKey(parameters) {
    var params = {
        param: new core_1.FunctionImportParameter('param', 'Edm.Int32', parameters.param)
    };
    return new core_1.FunctionImportRequestBuilderV4('/odata/test-service', 'getByKey', function (data) { return (0, core_1.transformReturnValueForEntityV4)(data, TestEntity_1.TestEntity); }, params);
}
exports.getByKey = getByKey;
/**
 * Get All.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function getAll(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilderV4('/odata/test-service', 'getAll', function (data) { return (0, core_1.transformReturnValueForEntityListV4)(data, TestEntity_1.TestEntity); }, params);
}
exports.getAll = getAll;
exports.functionImports = {
    returnSapCloudSdk: returnSapCloudSdk,
    concatStrings: concatStrings,
    returnInt: returnInt,
    returnCollection: returnCollection,
    getByKey: getByKey,
    getAll: getAll
};
//# sourceMappingURL=function-imports.js.map