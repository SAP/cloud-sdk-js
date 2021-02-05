"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.functionImports = exports.testFunctionImportWithDifferentName = exports.testFunctionImportMultipleParams = exports.testFunctionImportComplexReturnTypeCollection = exports.testFunctionImportComplexReturnType = exports.testFunctionImportSharedEntityReturnTypeCollectionWithoutEntitySetInfo = exports.testFunctionImportSharedEntityReturnTypeCollectionWithEntitySetInfo = exports.testFunctionImportSharedEntityReturnTypeWithoutEntitySetInfo = exports.testFunctionImportSharedEntityReturnTypeWithEntitySetInfo = exports.testFunctionImportEntityReturnTypeCollection = exports.testFunctionImportEntityReturnType = exports.testFunctionImportEdmReturnTypeCollection = exports.testFunctionImportEdmReturnType = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var TestEntity_1 = require("./TestEntity");
var TestEntitySharesEntityType1_1 = require("./TestEntitySharesEntityType1");
var TestComplexType_1 = require("./TestComplexType");
/**
 * Test Function Import Edm Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportEdmReturnType(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilderV4('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEdmReturnType', function (data) { return core_1.transformReturnValueForEdmTypeV4(data, function (val) { return core_1.edmToTsV4(val.value, 'Edm.Boolean'); }); }, params);
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
    return new core_1.FunctionImportRequestBuilderV4('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEdmReturnTypeCollection', function (data) { return core_1.transformReturnValueForEdmTypeListV4(data, function (val) { return core_1.edmToTsV4(val, 'Edm.String'); }); }, params);
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
    return new core_1.FunctionImportRequestBuilderV4('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnType', function (data) { return core_1.transformReturnValueForEntityV4(data, TestEntity_1.TestEntity); }, params);
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
    return new core_1.FunctionImportRequestBuilderV4('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportEntityReturnTypeCollection', function (data) { return core_1.transformReturnValueForEntityListV4(data, TestEntity_1.TestEntity); }, params);
}
exports.testFunctionImportEntityReturnTypeCollection = testFunctionImportEntityReturnTypeCollection;
/**
 * Test Function Import Shared Entity Return Type With Entity Set Info.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportSharedEntityReturnTypeWithEntitySetInfo(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilderV4('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportSharedEntityReturnTypeWithEntitySetInfo', function (data) { return core_1.transformReturnValueForEntityV4(data, TestEntitySharesEntityType1_1.TestEntitySharesEntityType1); }, params);
}
exports.testFunctionImportSharedEntityReturnTypeWithEntitySetInfo = testFunctionImportSharedEntityReturnTypeWithEntitySetInfo;
/**
 * Test Function Import Shared Entity Return Type Without Entity Set Info.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportSharedEntityReturnTypeWithoutEntitySetInfo(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilderV4('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportSharedEntityReturnTypeWithoutEntitySetInfo', function (data) { return core_1.transformReturnValueForEntityV4(data, TestEntitySharesEntityType1_1.TestEntitySharesEntityType1); }, params);
}
exports.testFunctionImportSharedEntityReturnTypeWithoutEntitySetInfo = testFunctionImportSharedEntityReturnTypeWithoutEntitySetInfo;
/**
 * Test Function Import Shared Entity Return Type Collection With Entity Set Info.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportSharedEntityReturnTypeCollectionWithEntitySetInfo(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilderV4('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportSharedEntityReturnTypeCollectionWithEntitySetInfo', function (data) { return core_1.transformReturnValueForEntityListV4(data, TestEntitySharesEntityType1_1.TestEntitySharesEntityType1); }, params);
}
exports.testFunctionImportSharedEntityReturnTypeCollectionWithEntitySetInfo = testFunctionImportSharedEntityReturnTypeCollectionWithEntitySetInfo;
/**
 * Test Function Import Shared Entity Return Type Collection Without Entity Set Info.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportSharedEntityReturnTypeCollectionWithoutEntitySetInfo(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilderV4('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportSharedEntityReturnTypeCollectionWithoutEntitySetInfo', function (data) { return core_1.transformReturnValueForEntityListV4(data, TestEntitySharesEntityType1_1.TestEntitySharesEntityType1); }, params);
}
exports.testFunctionImportSharedEntityReturnTypeCollectionWithoutEntitySetInfo = testFunctionImportSharedEntityReturnTypeCollectionWithoutEntitySetInfo;
/**
 * Test Function Import Complex Return Type.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testFunctionImportComplexReturnType(parameters) {
    var params = {};
    return new core_1.FunctionImportRequestBuilderV4('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportComplexReturnType', function (data) { return core_1.transformReturnValueForComplexTypeV4(data, function (data) { return core_1.deserializeComplexTypeV4(data, TestComplexType_1.TestComplexType); }); }, params);
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
    return new core_1.FunctionImportRequestBuilderV4('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportComplexReturnTypeCollection', function (data) { return core_1.transformReturnValueForComplexTypeListV4(data, function (data) { return core_1.deserializeComplexTypeV4(data, TestComplexType_1.TestComplexType); }); }, params);
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
        stringParam: new core_1.FunctionImportParameter('StringParam', 'Edm.String', parameters.stringParam),
        nonNullableStringParam: new core_1.FunctionImportParameter('NonNullableStringParam', 'Edm.String', parameters.nonNullableStringParam),
        nullableBooleanParam: new core_1.FunctionImportParameter('NullableBooleanParam', 'Edm.Boolean', parameters.nullableBooleanParam),
        nullableGeographyPointParam: new core_1.FunctionImportParameter('NullableGeographyPointParam', 'Edm.Any', parameters.nullableGeographyPointParam)
    };
    return new core_1.FunctionImportRequestBuilderV4('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportMultipleParams', function (data) { return core_1.transformReturnValueForEdmTypeV4(data, function (val) { return core_1.edmToTsV4(val.value, 'Edm.Boolean'); }); }, params);
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
    return new core_1.FunctionImportRequestBuilderV4('/sap/opu/odata/sap/API_TEST_SRV', 'TestFunctionImportWithDifferentName', function (data) { return core_1.transformReturnValueForUndefinedV4(data, function (val) { return undefined; }); }, params);
}
exports.testFunctionImportWithDifferentName = testFunctionImportWithDifferentName;
exports.functionImports = {
    testFunctionImportEdmReturnType: testFunctionImportEdmReturnType,
    testFunctionImportEdmReturnTypeCollection: testFunctionImportEdmReturnTypeCollection,
    testFunctionImportEntityReturnType: testFunctionImportEntityReturnType,
    testFunctionImportEntityReturnTypeCollection: testFunctionImportEntityReturnTypeCollection,
    testFunctionImportSharedEntityReturnTypeWithEntitySetInfo: testFunctionImportSharedEntityReturnTypeWithEntitySetInfo,
    testFunctionImportSharedEntityReturnTypeWithoutEntitySetInfo: testFunctionImportSharedEntityReturnTypeWithoutEntitySetInfo,
    testFunctionImportSharedEntityReturnTypeCollectionWithEntitySetInfo: testFunctionImportSharedEntityReturnTypeCollectionWithEntitySetInfo,
    testFunctionImportSharedEntityReturnTypeCollectionWithoutEntitySetInfo: testFunctionImportSharedEntityReturnTypeCollectionWithoutEntitySetInfo,
    testFunctionImportComplexReturnType: testFunctionImportComplexReturnType,
    testFunctionImportComplexReturnTypeCollection: testFunctionImportComplexReturnTypeCollection,
    testFunctionImportMultipleParams: testFunctionImportMultipleParams,
    testFunctionImportWithDifferentName: testFunctionImportWithDifferentName
};
//# sourceMappingURL=function-imports.js.map