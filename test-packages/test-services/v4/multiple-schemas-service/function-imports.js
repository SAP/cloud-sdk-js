"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionImports = exports.testFunctionImportEntityReturnType2 = exports.testFunctionImportEntityReturnType1 = void 0;
var odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
var TestEntity1_1 = require("./TestEntity1");
var TestEntity2_1 = require("./TestEntity2");
/**
 * Test Function Import Entity Return Type 1.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnType1(parameters) {
    var params = {};
    return new odata_v4_1.FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType1', function (data) { return (0, odata_v4_1.transformReturnValueForEntity)(data, TestEntity1_1.TestEntity1); }, params);
}
exports.testFunctionImportEntityReturnType1 = testFunctionImportEntityReturnType1;
/**
 * Test Function Import Entity Return Type 2.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnType2(parameters) {
    var params = {};
    return new odata_v4_1.FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType2', function (data) { return (0, odata_v4_1.transformReturnValueForEntity)(data, TestEntity2_1.TestEntity2); }, params);
}
exports.testFunctionImportEntityReturnType2 = testFunctionImportEntityReturnType2;
exports.functionImports = {
    testFunctionImportEntityReturnType1: testFunctionImportEntityReturnType1,
    testFunctionImportEntityReturnType2: testFunctionImportEntityReturnType2
};
//# sourceMappingURL=function-imports.js.map