"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.operations = exports.testActionImportNoParameterComplexReturnType2 = exports.testActionImportNoParameterComplexReturnType1 = exports.testFunctionImportEntityReturnType2 = exports.testFunctionImportEntityReturnType1 = void 0;
/*
 * Copyright (c) 2023 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const odata_v4_1 = require("@sap-cloud-sdk/odata-v4");
const service_1 = require("./service");
const TestComplexType1_1 = require("./TestComplexType1");
const TestComplexType2_1 = require("./TestComplexType2");
/**
 * Test Function Import Entity Return Type 1.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnType1(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType1', data => (0, odata_v4_1.transformReturnValueForEntity)(data, (0, service_1.multipleSchemasService)(deSerializers).testEntity1Api), params, deSerializers, 'function');
}
exports.testFunctionImportEntityReturnType1 = testFunctionImportEntityReturnType1;
/**
 * Test Function Import Entity Return Type 2.
 * @param parameters - Object containing all parameters for the function.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnType2(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType2', data => (0, odata_v4_1.transformReturnValueForEntity)(data, (0, service_1.multipleSchemasService)(deSerializers).testEntity2Api), params, deSerializers, 'function');
}
exports.testFunctionImportEntityReturnType2 = testFunctionImportEntityReturnType2;
/**
 * Test Action Import No Parameter Complex Return Type 1.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportNoParameterComplexReturnType1(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportNoParameterComplexReturnType1', data => (0, odata_v4_1.transformReturnValueForComplexType)(data, data => (0, odata_v4_1.entityDeserializer)(deSerializers || odata_v4_1.defaultDeSerializers).deserializeComplexType(data, TestComplexType1_1.TestComplexType1)), params, deSerializers, 'action');
}
exports.testActionImportNoParameterComplexReturnType1 = testActionImportNoParameterComplexReturnType1;
/**
 * Test Action Import No Parameter Complex Return Type 2.
 * @param parameters - Object containing all parameters for the action.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportNoParameterComplexReturnType2(parameters, deSerializers = odata_v4_1.defaultDeSerializers) {
    const params = {};
    return new odata_v4_1.OperationRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportNoParameterComplexReturnType2', data => (0, odata_v4_1.transformReturnValueForComplexType)(data, data => (0, odata_v4_1.entityDeserializer)(deSerializers || odata_v4_1.defaultDeSerializers).deserializeComplexType(data, TestComplexType2_1.TestComplexType2)), params, deSerializers, 'action');
}
exports.testActionImportNoParameterComplexReturnType2 = testActionImportNoParameterComplexReturnType2;
exports.operations = {
    testFunctionImportEntityReturnType1,
    testFunctionImportEntityReturnType2,
    testActionImportNoParameterComplexReturnType1,
    testActionImportNoParameterComplexReturnType2
};
//# sourceMappingURL=operations.js.map