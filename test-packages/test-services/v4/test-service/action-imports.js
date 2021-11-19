'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.actionImports =
  exports.testActionImportNullableTest =
  exports.testActionImportSharedEntityReturnTypeCollection =
  exports.testActionImportSharedEntityReturnType =
  exports.testActionImportNoParameterEntityReturnType =
  exports.testActionImportUnsupportedEdmTypes =
  exports.testActionImportMultipleParameterComplexReturnType =
  exports.testActionImportNoParameterNoReturnType =
    void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const TestComplexType_1 = require('./TestComplexType');
const TestEntity_1 = require('./TestEntity');
/**
 * Test Action Import No Parameter No Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportNoParameterNoReturnType(parameters) {
  const params = {};
  return new odata_v4_1.ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNoParameterNoReturnType',
    data =>
      (0, odata_v4_1.transformReturnValueForUndefined)(data, val => undefined),
    params
  );
}
exports.testActionImportNoParameterNoReturnType =
  testActionImportNoParameterNoReturnType;
/**
 * Test Action Import Multiple Parameter Complex Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportMultipleParameterComplexReturnType(parameters) {
  const params = {
    stringParam: new odata_v4_1.ActionImportParameter(
      'StringParam',
      'Edm.String',
      parameters.stringParam
    ),
    nonNullableStringParam: new odata_v4_1.ActionImportParameter(
      'NonNullableStringParam',
      'Edm.String',
      parameters.nonNullableStringParam
    ),
    nullableBooleanParam: new odata_v4_1.ActionImportParameter(
      'NullableBooleanParam',
      'Edm.Boolean',
      parameters.nullableBooleanParam
    ),
    nullableGeographyPointParam: new odata_v4_1.ActionImportParameter(
      'NullableGeographyPointParam',
      'Edm.Any',
      parameters.nullableGeographyPointParam
    )
  };
  return new odata_v4_1.ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportMultipleParameterComplexReturnType',
    data =>
      (0, odata_v4_1.transformReturnValueForComplexType)(data, data =>
        (0, odata_v4_1.deserializeComplexType)(
          data,
          TestComplexType_1.TestComplexType
        )
      ),
    params
  );
}
exports.testActionImportMultipleParameterComplexReturnType =
  testActionImportMultipleParameterComplexReturnType;
/**
 * Test Action Import Unsupported Edm Types.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportUnsupportedEdmTypes(parameters) {
  const params = {
    simpleParam: new odata_v4_1.ActionImportParameter(
      'SimpleParam',
      'Edm.Any',
      parameters.simpleParam
    )
  };
  return new odata_v4_1.ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportUnsupportedEdmTypes',
    data =>
      (0, odata_v4_1.transformReturnValueForEdmType)(data, val =>
        (0, odata_v4_1.edmToTs)(val.value, 'Edm.Any')
      ),
    params
  );
}
exports.testActionImportUnsupportedEdmTypes =
  testActionImportUnsupportedEdmTypes;
/**
 * Test Action Import No Parameter Entity Return Type.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportNoParameterEntityReturnType(parameters) {
  const params = {};
  return new odata_v4_1.ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNoParameterEntityReturnType',
    data =>
      (0, odata_v4_1.transformReturnValueForEntity)(
        data,
        TestEntity_1.TestEntity
      ),
    params
  );
}
exports.testActionImportNoParameterEntityReturnType =
  testActionImportNoParameterEntityReturnType;
/**
 * Test Action Import Shared Entity Return Type. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportSharedEntityReturnType(parameters) {
  const params = {};
  return new odata_v4_1.ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportSharedEntityReturnType',
    data =>
      (0, internal_1.throwErrorWhenReturnTypeIsUnionType)(
        data,
        'TestActionImportSharedEntityReturnType'
      ),
    params
  );
}
exports.testActionImportSharedEntityReturnType =
  testActionImportSharedEntityReturnType;
/**
 * Test Action Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportSharedEntityReturnTypeCollection(parameters) {
  const params = {};
  return new odata_v4_1.ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportSharedEntityReturnTypeCollection',
    data =>
      (0, internal_1.throwErrorWhenReturnTypeIsUnionType)(
        data,
        'TestActionImportSharedEntityReturnTypeCollection'
      ),
    params
  );
}
exports.testActionImportSharedEntityReturnTypeCollection =
  testActionImportSharedEntityReturnTypeCollection;
/**
 * Test Action Import Nullable Test.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testActionImportNullableTest(parameters) {
  const params = {
    nullablePerDefault: new odata_v4_1.ActionImportParameter(
      'NullablePerDefault',
      'Edm.String',
      parameters.nullablePerDefault
    ),
    nullableExplicit: new odata_v4_1.ActionImportParameter(
      'NullableExplicit',
      'Edm.String',
      parameters.nullableExplicit
    ),
    nonNullable: new odata_v4_1.ActionImportParameter(
      'NonNullable',
      'Edm.String',
      parameters.nonNullable
    )
  };
  return new odata_v4_1.ActionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestActionImportNullableTest',
    data =>
      (0, odata_v4_1.transformReturnValueForComplexType)(data, data =>
        (0, odata_v4_1.deserializeComplexType)(
          data,
          TestComplexType_1.TestComplexType
        )
      ),
    params
  );
}
exports.testActionImportNullableTest = testActionImportNullableTest;
exports.actionImports = {
  testActionImportNoParameterNoReturnType,
  testActionImportMultipleParameterComplexReturnType,
  testActionImportUnsupportedEdmTypes,
  testActionImportNoParameterEntityReturnType,
  testActionImportSharedEntityReturnType,
  testActionImportSharedEntityReturnTypeCollection,
  testActionImportNullableTest
};
//# sourceMappingURL=action-imports.js.map
