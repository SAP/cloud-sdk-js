"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var TestEntity_1 = require("./TestEntity");
var TestComplexType_1 = require("./TestComplexType");
/**
 * Test Function Import No Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportNoReturnType(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilder('post', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportNoReturnType', function (data) { return core_1.transformReturnValueForPromiseVoid(data, function (val) { return undefined; }); }, params);
}
exports.testFunctionImportNoReturnType = testFunctionImportNoReturnType;
/**
 * Test Function Import Edm Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportEdmReturnType(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEdmReturnType', function (data) { return core_1.transformReturnValueForEdmType(data, function (val) { return core_1.edmToTs(val, 'Edm.Boolean'); }); }, params);
}
exports.testFunctionImportEdmReturnType = testFunctionImportEdmReturnType;
/**
 * Test Function Import Edm Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportEdmReturnTypeCollection(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEdmReturnTypeCollection', function (data) { return core_1.transformReturnValueForEdmTypeList(data, function (val) { return core_1.edmToTs(val, 'Edm.String'); }); }, params);
}
exports.testFunctionImportEdmReturnTypeCollection = testFunctionImportEdmReturnTypeCollection;
/**
 * Test Function Import Entity Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportEntityReturnType(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType', function (data) { return core_1.transformReturnValueForEntity(data, TestEntity_1.TestEntity); }, params);
}
exports.testFunctionImportEntityReturnType = testFunctionImportEntityReturnType;
/**
 * Test Function Import Entity Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportEntityReturnTypeCollection(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnTypeCollection', function (data) { return core_1.transformReturnValueForEntityList(data, TestEntity_1.TestEntity); }, params);
}
exports.testFunctionImportEntityReturnTypeCollection = testFunctionImportEntityReturnTypeCollection;
/**
 * Test Function Import Complex Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportComplexReturnType(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportComplexReturnType', function (data) { return core_1.transformReturnValueForComplexType(data, TestComplexType_1.TestComplexType.build); }, params);
}
exports.testFunctionImportComplexReturnType = testFunctionImportComplexReturnType;
/**
 * Test Function Import Complex Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportComplexReturnTypeCollection(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportComplexReturnTypeCollection', function (data) { return core_1.transformReturnValueForComplexTypeList(data, TestComplexType_1.TestComplexType.build); }, params);
}
exports.testFunctionImportComplexReturnTypeCollection = testFunctionImportComplexReturnTypeCollection;
/**
 * Test Function Import Get.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportGet(parameters) {
    var params = {
        simpleParam: new core_1.FunctionImportParameter('SimpleParam', 'Edm.String', parameters.simpleParam)
    };
    return new core_1.FunctionImportRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportGET', function (data) { return core_1.transformReturnValueForEdmType(data, function (val) { return core_1.edmToTs(val, 'Edm.Boolean'); }); }, params);
}
exports.testFunctionImportGet = testFunctionImportGet;
/**
 * Test Function Import Post.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportPost(parameters) {
    var params = {
        simpleParam: new core_1.FunctionImportParameter('SimpleParam', 'Edm.String', parameters.simpleParam)
    };
    return new core_1.FunctionImportRequestBuilder('post', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportPOST', function (data) { return core_1.transformReturnValueForEdmType(data, function (val) { return core_1.edmToTs(val, 'Edm.Boolean'); }); }, params);
}
exports.testFunctionImportPost = testFunctionImportPost;
/**
 * Test Function Import Multiple Params.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportMultipleParams(parameters) {
    var params = {
        stringParam: new core_1.FunctionImportParameter('StringParam', 'Edm.String', parameters.stringParam),
        booleanParam: new core_1.FunctionImportParameter('BooleanParam', 'Edm.Boolean', parameters.booleanParam)
    };
    return new core_1.FunctionImportRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportMultipleParams', function (data) { return core_1.transformReturnValueForEdmType(data, function (val) { return core_1.edmToTs(val, 'Edm.Boolean'); }); }, params);
}
exports.testFunctionImportMultipleParams = testFunctionImportMultipleParams;
/**
 * Create Test Complex Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function createTestComplexType(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'CreateTestComplexType', function (data) { return core_1.transformReturnValueForComplexType(data, TestComplexType_1.TestComplexType.build); }, params);
}
exports.createTestComplexType = createTestComplexType;
/**
 * Continue.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function fContinue(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilder('get', '/sap/opu/odata/sap/API_TEST_SRV', 'Continue', function (data) { return core_1.transformReturnValueForEdmType(data, function (val) { return core_1.edmToTs(val, 'Edm.Boolean'); }); }, params);
}
exports.fContinue = fContinue;
exports.functionImports = {
    testFunctionImportNoReturnType: testFunctionImportNoReturnType,
    testFunctionImportEdmReturnType: testFunctionImportEdmReturnType,
    testFunctionImportEdmReturnTypeCollection: testFunctionImportEdmReturnTypeCollection,
    testFunctionImportEntityReturnType: testFunctionImportEntityReturnType,
    testFunctionImportEntityReturnTypeCollection: testFunctionImportEntityReturnTypeCollection,
    testFunctionImportComplexReturnType: testFunctionImportComplexReturnType,
    testFunctionImportComplexReturnTypeCollection: testFunctionImportComplexReturnTypeCollection,
    testFunctionImportGet: testFunctionImportGet,
    testFunctionImportPost: testFunctionImportPost,
    testFunctionImportMultipleParams: testFunctionImportMultipleParams,
    createTestComplexType: createTestComplexType,
    fContinue: fContinue
};
//# sourceMappingURL=function-imports.js.map