"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionImports = exports.testFunctionImportEntityReturnType2 = exports.testFunctionImportEntityReturnType1 = void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const service_1 = require("./service");
/**
 * Test Function Import Entity Return Type 1.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnType1(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType1', (data) => (0, odata_v4_1.transformReturnValueForEntity)(data, (0, service_1.multipleSchemasService)(deSerializers).testEntity1Api), params, deSerializers);
}
exports.testFunctionImportEntityReturnType1 = testFunctionImportEntityReturnType1;
/**
 * Test Function Import Entity Return Type 2.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnType2(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType2', (data) => (0, odata_v4_1.transformReturnValueForEntity)(data, (0, service_1.multipleSchemasService)(deSerializers).testEntity2Api), params, deSerializers);
}
exports.testFunctionImportEntityReturnType2 = testFunctionImportEntityReturnType2;
exports.functionImports = {
    testFunctionImportEntityReturnType1,
    testFunctionImportEntityReturnType2
};
//# sourceMappingURL=function-imports.js.map