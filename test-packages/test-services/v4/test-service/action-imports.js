<<<<<<< HEAD
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.actionImports = exports.testActionImportSharedEntityReturnTypeCollection = exports.testActionImportSharedEntityReturnType = exports.testActionImportNoParameterEntityReturnType = exports.testActionImportUnsupportedEdmTypes = exports.testActionImportMultipleParameterComplexReturnType = exports.testActionImportNoParameterNoReturnType = void 0;
=======
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.actionImports = exports.testActionImportNoParameterEntityReturnType = exports.testActionImportUnsupportedEdmTypes = exports.testActionImportMultipleParameterComplexReturnType = exports.testActionImportNoParameterNoReturnType = void 0;
>>>>>>> main
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestComplexType_1 = require('./TestComplexType');
var TestEntity_1 = require('./TestEntity');
/**
 * Test Action Import No Parameter No Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportNoParameterNoReturnType(parameters) {
  var params = {};
  return new core_1.ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNoParameterNoReturnType',
    function (data) {
      return core_1.transformReturnValueForUndefinedV4(data, function (val) {
        return undefined;
      });
    },
    params
  );
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
    stringParam: new core_1.ActionImportParameter(
      'StringParam',
      'Edm.String',
      parameters.stringParam
    ),
    nonNullableStringParam: new core_1.ActionImportParameter(
      'NonNullableStringParam',
      'Edm.String',
      parameters.nonNullableStringParam
    ),
    nullableBooleanParam: new core_1.ActionImportParameter(
      'NullableBooleanParam',
      'Edm.Boolean',
      parameters.nullableBooleanParam
    ),
    nullableGeographyPointParam: new core_1.ActionImportParameter(
      'NullableGeographyPointParam',
      'Edm.Any',
      parameters.nullableGeographyPointParam
    )
  };
  return new core_1.ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportMultipleParameterComplexReturnType',
    function (data) {
      return core_1.transformReturnValueForComplexTypeV4(data, function (data) {
        return core_1.deserializeComplexTypeV4(
          data,
          TestComplexType_1.TestComplexType
        );
      });
    },
    params
  );
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
    simpleParam: new core_1.ActionImportParameter(
      'SimpleParam',
      'Edm.Any',
      parameters.simpleParam
    )
  };
  return new core_1.ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportUnsupportedEdmTypes',
    function (data) {
      return core_1.transformReturnValueForEdmTypeV4(data, function (val) {
        return core_1.edmToTsV4(val.value, 'Edm.Any');
      });
    },
    params
  );
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
  return new core_1.ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNoParameterEntityReturnType',
    function (data) {
      return core_1.transformReturnValueForEntityV4(
        data,
        TestEntity_1.TestEntity
      );
    },
    params
  );
}
exports.testActionImportNoParameterEntityReturnType = testActionImportNoParameterEntityReturnType;
/**
 * Test Action Import Shared Entity Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportSharedEntityReturnType(parameters) {
    var params = {};
    return new core_1.ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportSharedEntityReturnType', function (data) { return core_1.throwErrorWhenReturnTypeIsUnionType(data, 'TestActionImportSharedEntityReturnType'); }, params);
}
exports.testActionImportSharedEntityReturnType = testActionImportSharedEntityReturnType;
/**
 * Test Action Import Shared Entity Return Type Collection.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportSharedEntityReturnTypeCollection(parameters) {
    var params = {};
    return new core_1.ActionImportRequestBuilder('/sap/opu/odata/sap/API_TEST_SRV', 'TestActionImportSharedEntityReturnTypeCollection', function (data) { return core_1.throwErrorWhenReturnTypeIsUnionType(data, 'TestActionImportSharedEntityReturnTypeCollection'); }, params);
}
exports.testActionImportSharedEntityReturnTypeCollection = testActionImportSharedEntityReturnTypeCollection;
exports.actionImports = {
<<<<<<< HEAD
    testActionImportNoParameterNoReturnType: testActionImportNoParameterNoReturnType,
    testActionImportMultipleParameterComplexReturnType: testActionImportMultipleParameterComplexReturnType,
    testActionImportUnsupportedEdmTypes: testActionImportUnsupportedEdmTypes,
    testActionImportNoParameterEntityReturnType: testActionImportNoParameterEntityReturnType,
    testActionImportSharedEntityReturnType: testActionImportSharedEntityReturnType,
    testActionImportSharedEntityReturnTypeCollection: testActionImportSharedEntityReturnTypeCollection
=======
  testActionImportNoParameterNoReturnType: testActionImportNoParameterNoReturnType,
  testActionImportMultipleParameterComplexReturnType: testActionImportMultipleParameterComplexReturnType,
  testActionImportUnsupportedEdmTypes: testActionImportUnsupportedEdmTypes,
  testActionImportNoParameterEntityReturnType: testActionImportNoParameterEntityReturnType
>>>>>>> main
};
//# sourceMappingURL=action-imports.js.map
