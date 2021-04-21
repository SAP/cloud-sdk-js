"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionImports = exports.testFunctionImportEntityReturnType2 = exports.testFunctionImportEntityReturnType1 = void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var TestEntity1_1 = require("./TestEntity1");
var TestEntity2_1 = require("./TestEntity2");
/**
 * Test Function Import Entity Return Type 1.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportEntityReturnType1(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilderV4('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType1', function (data) { return core_1.transformReturnValueForEntityV4(data, TestEntity1_1.TestEntity1); }, params);
}
exports.testFunctionImportEntityReturnType1 = testFunctionImportEntityReturnType1;
/**
 * Test Function Import Entity Return Type 2.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportEntityReturnType2(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilderV4('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType2', function (data) { return core_1.transformReturnValueForEntityV4(data, TestEntity2_1.TestEntity2); }, params);
}
exports.testFunctionImportEntityReturnType2 = testFunctionImportEntityReturnType2;
exports.functionImports = {
    testFunctionImportEntityReturnType1: testFunctionImportEntityReturnType1,
    testFunctionImportEntityReturnType2: testFunctionImportEntityReturnType2
};
//# sourceMappingURL=function-imports.js.map