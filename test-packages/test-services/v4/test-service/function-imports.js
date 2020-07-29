"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionImports = exports.testFunctionImportWithDifferentName = exports.testFunctionImportMultipleParams = exports.testFunctionImportComplexReturnTypeCollection = exports.testFunctionImportComplexReturnType = exports.testFunctionImportEntityReturnTypeCollection = exports.testFunctionImportEntityReturnType = exports.testFunctionImportEdmReturnTypeCollection = exports.testFunctionImportEdmReturnType = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var v4_1 = require("@sap-cloud-sdk/core/v4");
var TestEntity_1 = require("./TestEntity");
var TestComplexType_1 = require("./TestComplexType");
/**
 * Test Function Import Edm Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportEdmReturnType(parameters) {
    var params = {};
    return new v4_1.FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEdmReturnType', function (data) { return v4_1.transformReturnValueForEdmType(data, function (val) { return v4_1.edmToTs(val, 'Edm.Boolean'); }); }, params);
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
    return new v4_1.FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEdmReturnTypeCollection', function (data) { return v4_1.transformReturnValueForEdmTypeList(data, function (val) { return v4_1.edmToTs(val, 'Edm.String'); }); }, params);
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
    return new v4_1.FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType', function (data) { return v4_1.transformReturnValueForEntity(data, TestEntity_1.TestEntity); }, params);
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
    return new v4_1.FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnTypeCollection', function (data) { return v4_1.transformReturnValueForEntityList(data, TestEntity_1.TestEntity); }, params);
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
    return new v4_1.FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportComplexReturnType', function (data) { return v4_1.transformReturnValueForComplexType(data, TestComplexType_1.TestComplexType.build); }, params);
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
    return new v4_1.FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportComplexReturnTypeCollection', function (data) { return v4_1.transformReturnValueForComplexTypeList(data, TestComplexType_1.TestComplexType.build); }, params);
}
exports.testFunctionImportComplexReturnTypeCollection = testFunctionImportComplexReturnTypeCollection;
/**
 * Test Function Import Multiple Params.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportMultipleParams(parameters) {
    var params = {
        stringParam: new v4_1.FunctionImportParameter('StringParam', 'Edm.String', parameters.stringParam),
        nonNullableStringParam: new v4_1.FunctionImportParameter('NonNullableStringParam', 'Edm.String', parameters.nonNullableStringParam),
        nullableBooleanParam: new v4_1.FunctionImportParameter('NullableBooleanParam', 'Edm.Boolean', parameters.nullableBooleanParam)
    };
    return new v4_1.FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportMultipleParams', function (data) { return v4_1.transformReturnValueForEdmType(data, function (val) { return v4_1.edmToTs(val, 'Edm.Boolean'); }); }, params);
}
exports.testFunctionImportMultipleParams = testFunctionImportMultipleParams;
/**
 * Test Function Import With Different Name.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportWithDifferentName(parameters) {
    var params = {};
    return new v4_1.FunctionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportWithDifferentName', function (data) { return v4_1.transformReturnValueForUndefined(data, function (val) { return undefined; }); }, params);
}
exports.testFunctionImportWithDifferentName = testFunctionImportWithDifferentName;
exports.functionImports = {
    testFunctionImportEdmReturnType: testFunctionImportEdmReturnType,
    testFunctionImportEdmReturnTypeCollection: testFunctionImportEdmReturnTypeCollection,
    testFunctionImportEntityReturnType: testFunctionImportEntityReturnType,
    testFunctionImportEntityReturnTypeCollection: testFunctionImportEntityReturnTypeCollection,
    testFunctionImportComplexReturnType: testFunctionImportComplexReturnType,
    testFunctionImportComplexReturnTypeCollection: testFunctionImportComplexReturnTypeCollection,
    testFunctionImportMultipleParams: testFunctionImportMultipleParams,
    testFunctionImportWithDifferentName: testFunctionImportWithDifferentName
};
//# sourceMappingURL=function-imports.js.map