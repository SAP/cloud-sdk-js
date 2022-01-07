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
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
const internal_1 = require('@sap-cloud-sdk/odata-common/internal');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const service_1 = require('./service');
const TestComplexType_1 = require('./TestComplexType');
/**
 * Test Function Import Edm Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEdmReturnType(
  parameters,
  deSerializers = odata_v4_1.defaultDeSerializers
) {
  const params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnType',
    data =>
      (0, odata_v4_1.transformReturnValueForEdmType)(data, val =>
        (0, odata_v4_1.edmToTs)(val.value, 'Edm.Boolean', deSerializers)
      ),
    params,
    deSerializers
  );
}
exports.testFunctionImportEdmReturnType = testFunctionImportEdmReturnType;
/**
 * Test Function Import Edm Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEdmReturnTypeCollection(
  parameters,
  deSerializers = odata_v4_1.defaultDeSerializers
) {
  const params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnTypeCollection',
    data =>
      (0, odata_v4_1.transformReturnValueForEdmTypeList)(data, val =>
        (0, odata_v4_1.edmToTs)(val, 'Edm.String', deSerializers)
      ),
    params,
    deSerializers
  );
}
exports.testFunctionImportEdmReturnTypeCollection =
  testFunctionImportEdmReturnTypeCollection;
/**
 * Test Function Import Nullable Test.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportNullableTest(
  parameters,
  deSerializers = odata_v4_1.defaultDeSerializers
) {
  const params = {
    nullablePerDefault: new internal_1.FunctionImportParameter(
      'NullablePerDefault',
      'Edm.String',
      parameters.nullablePerDefault
    ),
    nullableExplicit: new internal_1.FunctionImportParameter(
      'NullableExplicit',
      'Edm.String',
      parameters.nullableExplicit
    ),
    nonNullable: new internal_1.FunctionImportParameter(
      'NonNullable',
      'Edm.String',
      parameters.nonNullable
    )
  };
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportNullableTest',
    data =>
      (0, odata_v4_1.transformReturnValueForEdmTypeList)(data, val =>
        (0, odata_v4_1.edmToTs)(val, 'Edm.String', deSerializers)
      ),
    params,
    deSerializers
  );
}
exports.testFunctionImportNullableTest = testFunctionImportNullableTest;
/**
 * Test Function Import Entity Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnType(
  parameters,
  deSerializers = odata_v4_1.defaultDeSerializers
) {
  const params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnType',
    data =>
      (0, odata_v4_1.transformReturnValueForEntity)(
        data,
        (0, service_1.testService)(deSerializers).testEntityApi
      ),
    params,
    deSerializers
  );
}
exports.testFunctionImportEntityReturnType = testFunctionImportEntityReturnType;
/**
 * Test Function Import Entity Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEntityReturnTypeCollection(
  parameters,
  deSerializers = odata_v4_1.defaultDeSerializers
) {
  const params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnTypeCollection',
    data =>
      (0, odata_v4_1.transformReturnValueForEntityList)(
        data,
        (0, service_1.testService)(deSerializers).testEntityApi
      ),
    params,
    deSerializers
  );
}
exports.testFunctionImportEntityReturnTypeCollection =
  testFunctionImportEntityReturnTypeCollection;
/**
 * Test Function Import Shared Entity Return Type. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportSharedEntityReturnType(
  parameters,
  deSerializers = odata_v4_1.defaultDeSerializers
) {
  const params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportSharedEntityReturnType',
    data =>
      (0, internal_1.throwErrorWhenReturnTypeIsUnionType)(
        data,
        'TestFunctionImportSharedEntityReturnType'
      ),
    params,
    deSerializers
  );
}
exports.testFunctionImportSharedEntityReturnType =
  testFunctionImportSharedEntityReturnType;
/**
 * Test Function Import Shared Entity Return Type Collection. The 'execute' method does not exist when using this function/action import. Please use the 'executeRaw' for getting the raw response.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportSharedEntityReturnTypeCollection(
  parameters,
  deSerializers = odata_v4_1.defaultDeSerializers
) {
  const params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportSharedEntityReturnTypeCollection',
    data =>
      (0, internal_1.throwErrorWhenReturnTypeIsUnionType)(
        data,
        'TestFunctionImportSharedEntityReturnTypeCollection'
      ),
    params,
    deSerializers
  );
}
exports.testFunctionImportSharedEntityReturnTypeCollection =
  testFunctionImportSharedEntityReturnTypeCollection;
/**
 * Test Function Import Complex Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportComplexReturnType(
  parameters,
  deSerializers = odata_v4_1.defaultDeSerializers
) {
  const params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnType',
    data =>
      (0, odata_v4_1.transformReturnValueForComplexType)(data, data =>
        (0, odata_v4_1.entityDeserializer)(
          deSerializers
        ).deserializeComplexType(data, TestComplexType_1.TestComplexType)
      ),
    params,
    deSerializers
  );
}
exports.testFunctionImportComplexReturnType =
  testFunctionImportComplexReturnType;
/**
 * Test Function Import Complex Return Type Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportComplexReturnTypeCollection(
  parameters,
  deSerializers = odata_v4_1.defaultDeSerializers
) {
  const params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnTypeCollection',
    data =>
      (0, odata_v4_1.transformReturnValueForComplexTypeList)(data, data =>
        (0, odata_v4_1.entityDeserializer)(
          deSerializers
        ).deserializeComplexType(data, TestComplexType_1.TestComplexType)
      ),
    params,
    deSerializers
  );
}
exports.testFunctionImportComplexReturnTypeCollection =
  testFunctionImportComplexReturnTypeCollection;
/**
 * Test Function Import Multiple Params.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportMultipleParams(
  parameters,
  deSerializers = odata_v4_1.defaultDeSerializers
) {
  const params = {
    stringParam: new internal_1.FunctionImportParameter(
      'StringParam',
      'Edm.String',
      parameters.stringParam
    ),
    nonNullableStringParam: new internal_1.FunctionImportParameter(
      'NonNullableStringParam',
      'Edm.String',
      parameters.nonNullableStringParam
    ),
    nullableBooleanParam: new internal_1.FunctionImportParameter(
      'NullableBooleanParam',
      'Edm.Boolean',
      parameters.nullableBooleanParam
    ),
    nullableGeographyPointParam: new internal_1.FunctionImportParameter(
      'NullableGeographyPointParam',
      'Edm.Any',
      parameters.nullableGeographyPointParam
    )
  };
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportMultipleParams',
    data =>
      (0, odata_v4_1.transformReturnValueForEdmType)(data, val =>
        (0, odata_v4_1.edmToTs)(val.value, 'Edm.Boolean', deSerializers)
      ),
    params,
    deSerializers
  );
}
exports.testFunctionImportMultipleParams = testFunctionImportMultipleParams;
/**
 * Test Function Import With Different Name.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportWithDifferentName(
  parameters,
  deSerializers = odata_v4_1.defaultDeSerializers
) {
  const params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportWithDifferentName',
    data =>
      (0, odata_v4_1.transformReturnValueForUndefined)(data, val => undefined),
    params,
    deSerializers
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
