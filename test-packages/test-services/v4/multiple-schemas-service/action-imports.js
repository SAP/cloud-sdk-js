'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.actionImports =
  exports.testActionImportNoParameterComplexReturnType2 =
  exports.testActionImportNoParameterComplexReturnType1 =
    void 0;
/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var core_1 = require('@sap-cloud-sdk/core');
var TestComplexType1_1 = require('./TestComplexType1');
var TestComplexType2_1 = require('./TestComplexType2');
/**
 * Test Action Import No Parameter Complex Return Type 1.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportNoParameterComplexReturnType1(parameters) {
  var params = {};
  return new core_1.ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNoParameterComplexReturnType1',
    function (data) {
      return (0, core_1.transformReturnValueForComplexTypeV4)(
        data,
        function (data) {
          return (0, core_1.deserializeComplexTypeV4)(
            data,
            TestComplexType1_1.TestComplexType1
          );
        }
      );
    },
    params
  );
}
exports.testActionImportNoParameterComplexReturnType1 =
  testActionImportNoParameterComplexReturnType1;
/**
 * Test Action Import No Parameter Complex Return Type 2.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportNoParameterComplexReturnType2(parameters) {
  var params = {};
  return new core_1.ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNoParameterComplexReturnType2',
    function (data) {
      return (0, core_1.transformReturnValueForComplexTypeV4)(
        data,
        function (data) {
          return (0, core_1.deserializeComplexTypeV4)(
            data,
            TestComplexType2_1.TestComplexType2
          );
        }
      );
    },
    params
  );
}
exports.testActionImportNoParameterComplexReturnType2 =
  testActionImportNoParameterComplexReturnType2;
exports.actionImports = {
  testActionImportNoParameterComplexReturnType1:
    testActionImportNoParameterComplexReturnType1,
  testActionImportNoParameterComplexReturnType2:
    testActionImportNoParameterComplexReturnType2
};
//# sourceMappingURL=action-imports.js.map
