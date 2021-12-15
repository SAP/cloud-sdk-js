"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionImports = exports.testFunctionImportEntityReturnType2 = exports.testFunctionImportEntityReturnType1 = void 0;
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const TestEntity1Api_1 = require("./TestEntity1Api");
const TestEntity2Api_1 = require("./TestEntity2Api");
/**
 * Test Function Import Entity Return Type 1.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnType1(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType1', (data) => (0, odata_v4_1.transformReturnValueForEntity)(data, new TestEntity1Api_1.TestEntity1Api(deSerializers)), params, deSerializers);
}
exports.testFunctionImportEntityReturnType1 = testFunctionImportEntityReturnType1;
/**
 * Test Function Import Entity Return Type 2.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnType2(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType2', (data) => (0, odata_v4_1.transformReturnValueForEntity)(data, new TestEntity2Api_1.TestEntity2Api(deSerializers)), params, deSerializers);
}
exports.testFunctionImportEntityReturnType2 = testFunctionImportEntityReturnType2;
exports.functionImports = {
    testFunctionImportEntityReturnType1,
    testFunctionImportEntityReturnType2
};
//# sourceMappingURL=function-imports.js.map