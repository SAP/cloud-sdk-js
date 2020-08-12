"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionImports = exports.testActionImportUnsupportedEdmTypes = exports.testActionImportMultipleParameterComplexReturnType = exports.testActionImportNoParameterNoReturnType = void 0;
/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var v4_1 = require("@sap-cloud-sdk/core/v4");
var TestComplexType_1 = require("./TestComplexType");
/**
 * Test Action Import No Parameter No Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testActionImportNoParameterNoReturnType(parameters) {
    var params = {};
    return new v4_1.ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportNoParameterNoReturnType', function (data) { return v4_1.transformReturnValueForUndefined(data, function (val) { return undefined; }); }, params);
}
exports.testActionImportNoParameterNoReturnType = testActionImportNoParameterNoReturnType;
/**
 * Test Action Import Multiple Parameter Complex Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testActionImportMultipleParameterComplexReturnType(parameters) {
    var params = {
        stringParam: new v4_1.ActionImportParameter('StringParam', 'Edm.String', parameters.stringParam),
        nonNullableStringParam: new v4_1.ActionImportParameter('NonNullableStringParam', 'Edm.String', parameters.nonNullableStringParam),
        nullableBooleanParam: new v4_1.ActionImportParameter('NullableBooleanParam', 'Edm.Boolean', parameters.nullableBooleanParam),
        nullableGeographyPointParam: new v4_1.ActionImportParameter('NullableGeographyPointParam', 'Edm.Any', parameters.nullableGeographyPointParam)
    };
    return new v4_1.ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportMultipleParameterComplexReturnType', function (data) { return v4_1.transformReturnValueForComplexType(data, function (data) { return v4_1.deserializeComplexType(data, TestComplexType_1.TestComplexType); }); }, params);
}
exports.testActionImportMultipleParameterComplexReturnType = testActionImportMultipleParameterComplexReturnType;
/**
 * Test Action Import Unsupported Edm Types.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
function testActionImportUnsupportedEdmTypes(parameters) {
    var params = {
        simpleParam: new v4_1.ActionImportParameter('SimpleParam', 'Edm.Any', parameters.simpleParam)
    };
    return new v4_1.ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportUnsupportedEdmTypes', function (data) { return v4_1.transformReturnValueForEdmType(data, function (val) { return v4_1.edmToTs(val, 'Edm.Any'); }); }, params);
}
exports.testActionImportUnsupportedEdmTypes = testActionImportUnsupportedEdmTypes;
exports.actionImports = {
    testActionImportNoParameterNoReturnType: testActionImportNoParameterNoReturnType,
    testActionImportMultipleParameterComplexReturnType: testActionImportMultipleParameterComplexReturnType,
    testActionImportUnsupportedEdmTypes: testActionImportUnsupportedEdmTypes
};
//# sourceMappingURL=action-imports.js.map