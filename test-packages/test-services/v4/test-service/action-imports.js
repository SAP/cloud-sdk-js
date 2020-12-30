"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionImports = exports.testActionImportNoParameterEntityReturnType = exports.testActionImportUnsupportedEdmTypes = exports.testActionImportMultipleParameterComplexReturnType = exports.testActionImportNoParameterNoReturnType = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require("@sap-cloud-sdk/core");
var TestComplexType_1 = require("./TestComplexType");
var TestEntity_1 = require("./TestEntity");
/**
 * Test Action Import No Parameter No Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportNoParameterNoReturnType(parameters) {
    var params = {};
    return new core_1.ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportNoParameterNoReturnType', function (data) { return core_1.transformReturnValueForUndefinedV4(data, function (val) { return undefined; }); }, params);
}
exports.testActionImportNoParameterNoReturnType = testActionImportNoParameterNoReturnType;
/**
 * Test Action Import Multiple Parameter Complex Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportMultipleParameterComplexReturnType(parameters) {
    var params = {
        stringParam: new core_1.ActionImportParameter('StringParam', 'Edm.String', parameters.stringParam),
        nonNullableStringParam: new core_1.ActionImportParameter('NonNullableStringParam', 'Edm.String', parameters.nonNullableStringParam),
        nullableBooleanParam: new core_1.ActionImportParameter('NullableBooleanParam', 'Edm.Boolean', parameters.nullableBooleanParam),
        nullableGeographyPointParam: new core_1.ActionImportParameter('NullableGeographyPointParam', 'Edm.Any', parameters.nullableGeographyPointParam)
    };
    return new core_1.ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportMultipleParameterComplexReturnType', function (data) { return core_1.transformReturnValueForComplexTypeV4(data, function (data) { return core_1.deserializeComplexTypeV4(data, TestComplexType_1.TestComplexType); }); }, params);
}
exports.testActionImportMultipleParameterComplexReturnType = testActionImportMultipleParameterComplexReturnType;
/**
 * Test Action Import Unsupported Edm Types.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportUnsupportedEdmTypes(parameters) {
    var params = {
        simpleParam: new core_1.ActionImportParameter('SimpleParam', 'Edm.Any', parameters.simpleParam)
    };
    return new core_1.ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportUnsupportedEdmTypes', function (data) { return core_1.transformReturnValueForEdmTypeV4(data, function (val) { return core_1.edmToTsV4(val.value, 'Edm.Any'); }); }, params);
}
exports.testActionImportUnsupportedEdmTypes = testActionImportUnsupportedEdmTypes;
/**
 * Test Action Import No Parameter Entity Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportNoParameterEntityReturnType(parameters) {
    var params = {};
    return new core_1.ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportNoParameterEntityReturnType', function (data) { return core_1.transformReturnValueForEntityV4(data, TestEntity_1.TestEntity); }, params);
}
exports.testActionImportNoParameterEntityReturnType = testActionImportNoParameterEntityReturnType;
exports.actionImports = {
    testActionImportNoParameterNoReturnType: testActionImportNoParameterNoReturnType,
    testActionImportMultipleParameterComplexReturnType: testActionImportMultipleParameterComplexReturnType,
    testActionImportUnsupportedEdmTypes: testActionImportUnsupportedEdmTypes,
    testActionImportNoParameterEntityReturnType: testActionImportNoParameterEntityReturnType
};
//# sourceMappingURL=action-imports.js.map