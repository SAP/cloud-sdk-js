'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.functionImports =
  exports.testFunctionImportWithDifferentName =
  exports.testFunctionImportMultipleParams =
  exports.testFunctionImportComplexReturnTypeCollection =
  exports.testFunctionImportComplexReturnType =
  exports.testFunctionImportSharedEntityReturnTypeCollection =
  exports.testFunctionImportSharedEntityReturnType =
  exports.testFunctionImportEntityReturnTypeCollection =
  exports.testFunctionImportEntityReturnType =
  exports.testFunctionImportNullableTest =
  exports.testFunctionImportEdmReturnTypeCollection =
  exports.testFunctionImportEdmReturnType =
    void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const core_1 = require('@sap-cloud-sdk/core');
const TestEntity_1 = require('./TestEntity');
const TestComplexType_1 = require('./TestComplexType');
/**
 * Test Function Import Edm Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEdmReturnType(parameters) {
  const params = {};
  return new core_1.FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnType',
    data =>
      (0, core_1.transformReturnValueForEdmTypeV4)(data, val =>
        (0, core_1.edmToTsV4)(val.value, 'Edm.Boolean')
      ),
    params
  );
}
exports.testFunctionImportEdmReturnType = testFunctionImportEdmReturnType;
/**
 * Test Function Import Edm Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEdmReturnTypeCollection(parameters) {
  const params = {};
  return new core_1.FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnTypeCollection',
    data =>
      (0, core_1.transformReturnValueForEdmTypeListV4)(data, val =>
        (0, core_1.edmToTsV4)(val, 'Edm.String')
      ),
    params
  );
}
exports.testFunctionImportEdmReturnTypeCollection =
  testFunctionImportEdmReturnTypeCollection;
/**
 * Test Function Import Nullable Test.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportNullableTest(parameters) {
  const params = {
    nullablePerDefault: new core_1.FunctionImportParameter(
      'NullablePerDefault',
      'Edm.String',
      parameters.nullablePerDefault
    ),
    nullableExplicit: new core_1.FunctionImportParameter(
      'NullableExplicit',
      'Edm.String',
      parameters.nullableExplicit
    ),
    nonNullable: new core_1.FunctionImportParameter(
      'NonNullable',
      'Edm.String',
      parameters.nonNullable
    )
  };
  return new core_1.FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportNullableTest',
    data =>
      (0, core_1.transformReturnValueForEdmTypeListV4)(data, val =>
        (0, core_1.edmToTsV4)(val, 'Edm.String')
      ),
    params
  );
}
exports.testFunctionImportNullableTest = testFunctionImportNullableTest;
/**
 * Test Function Import Entity Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnType(parameters) {
  const params = {};
  return new core_1.FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnType',
    data =>
      (0, core_1.transformReturnValueForEntityV4)(
        data,
        TestEntity_1.TestEntity
      ),
    params
  );
}
exports.testFunctionImportEntityReturnType = testFunctionImportEntityReturnType;
/**
 * Test Function Import Entity Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnTypeCollection(parameters) {
  const params = {};
  return new core_1.FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnTypeCollection',
    data =>
      (0, core_1.transformReturnValueForEntityListV4)(
        data,
        TestEntity_1.TestEntity
      ),
    params
  );
}
exports.testFunctionImportEntityReturnTypeCollection =
  testFunctionImportEntityReturnTypeCollection;
/**
 * Test Function Import Shared Entity Return Type. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportSharedEntityReturnType(parameters) {
  const params = {};
  return new core_1.FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportSharedEntityReturnType',
    data =>
      (0, core_1.throwErrorWhenReturnTypeIsUnionType)(
        data,
        'TestFunctionImportSharedEntityReturnType'
      ),
    params
  );
}
exports.testFunctionImportSharedEntityReturnType =
  testFunctionImportSharedEntityReturnType;
/**
 * Test Function Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportSharedEntityReturnTypeCollection(parameters) {
  const params = {};
  return new core_1.FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportSharedEntityReturnTypeCollection',
    data =>
      (0, core_1.throwErrorWhenReturnTypeIsUnionType)(
        data,
        'TestFunctionImportSharedEntityReturnTypeCollection'
      ),
    params
  );
}
exports.testFunctionImportSharedEntityReturnTypeCollection =
  testFunctionImportSharedEntityReturnTypeCollection;
/**
 * Test Function Import Complex Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportComplexReturnType(parameters) {
  const params = {};
  return new core_1.FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnType',
    data =>
      (0, core_1.transformReturnValueForComplexTypeV4)(data, data =>
        (0, core_1.deserializeComplexTypeV4)(
          data,
          TestComplexType_1.TestComplexType
        )
      ),
    params
  );
}
exports.testFunctionImportComplexReturnType =
  testFunctionImportComplexReturnType;
/**
 * Test Function Import Complex Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportComplexReturnTypeCollection(parameters) {
  const params = {};
  return new core_1.FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnTypeCollection',
    data =>
      (0, core_1.transformReturnValueForComplexTypeListV4)(data, data =>
        (0, core_1.deserializeComplexTypeV4)(
          data,
          TestComplexType_1.TestComplexType
        )
      ),
    params
  );
}
exports.testFunctionImportComplexReturnTypeCollection =
  testFunctionImportComplexReturnTypeCollection;
/**
 * Test Function Import Multiple Params.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportMultipleParams(parameters) {
  const params = {
    stringParam: new core_1.FunctionImportParameter(
      'StringParam',
      'Edm.String',
      parameters.stringParam
    ),
    nonNullableStringParam: new core_1.FunctionImportParameter(
      'NonNullableStringParam',
      'Edm.String',
      parameters.nonNullableStringParam
    ),
    nullableBooleanParam: new core_1.FunctionImportParameter(
      'NullableBooleanParam',
      'Edm.Boolean',
      parameters.nullableBooleanParam
    ),
    nullableGeographyPointParam: new core_1.FunctionImportParameter(
      'NullableGeographyPointParam',
      'Edm.Any',
      parameters.nullableGeographyPointParam
    )
  };
  return new core_1.FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportMultipleParams',
    data =>
      (0, core_1.transformReturnValueForEdmTypeV4)(data, val =>
        (0, core_1.edmToTsV4)(val.value, 'Edm.Boolean')
      ),
    params
  );
}
exports.testFunctionImportMultipleParams = testFunctionImportMultipleParams;
/**
 * Test Function Import With Different Name.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportWithDifferentName(parameters) {
  const params = {};
  return new core_1.FunctionImportRequestBuilderV4(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportWithDifferentName',
    data =>
      (0, core_1.transformReturnValueForUndefinedV4)(data, val => undefined),
    params
  );
}
exports.testFunctionImportWithDifferentName =
  testFunctionImportWithDifferentName;
exports.functionImports = {
  testFunctionImportEdmReturnType,
  testFunctionImportEdmReturnTypeCollection,
  testFunctionImportNullableTest,
  testFunctionImportEntityReturnType,
  testFunctionImportEntityReturnTypeCollection,
  testFunctionImportSharedEntityReturnType,
  testFunctionImportSharedEntityReturnTypeCollection,
  testFunctionImportComplexReturnType,
  testFunctionImportComplexReturnTypeCollection,
  testFunctionImportMultipleParams,
  testFunctionImportWithDifferentName
};
//# sourceMappingURL=function-imports.js.map
