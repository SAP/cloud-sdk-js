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
var odata_common_1 = require('@sap-cloud-sdk/odata-common');
var odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
var TestEntity_1 = require('./TestEntity');
var TestComplexType_1 = require('./TestComplexType');
/**
 * Test Function Import Edm Return Type.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function testFunctionImportEdmReturnType(parameters) {
  var params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnType',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForEdmType)(
        data,
        function (val) {
          return (0, odata_v4_1.edmToTs)(val.value, 'Edm.Boolean');
        }
      );
    },
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
  var params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEdmReturnTypeCollection',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForEdmTypeList)(
        data,
        function (val) {
          return (0, odata_v4_1.edmToTs)(val, 'Edm.String');
        }
      );
    },
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
  var params = {
    nullablePerDefault: new odata_common_1.FunctionImportParameter(
      'NullablePerDefault',
      'Edm.String',
      parameters.nullablePerDefault
    ),
    nullableExplicit: new odata_common_1.FunctionImportParameter(
      'NullableExplicit',
      'Edm.String',
      parameters.nullableExplicit
    ),
    nonNullable: new odata_common_1.FunctionImportParameter(
      'NonNullable',
      'Edm.String',
      parameters.nonNullable
    )
  };
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportNullableTest',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForEdmTypeList)(
        data,
        function (val) {
          return (0, odata_v4_1.edmToTs)(val, 'Edm.String');
        }
      );
    },
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
  var params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnType',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForEntity)(
        data,
        TestEntity_1.TestEntity
      );
    },
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
  var params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportEntityReturnTypeCollection',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForEntityList)(
        data,
        TestEntity_1.TestEntity
      );
    },
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
  var params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportSharedEntityReturnType',
    function (data) {
      return (0, odata_common_1.throwErrorWhenReturnTypeIsUnionType)(
        data,
        'TestFunctionImportSharedEntityReturnType'
      );
    },
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
  var params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportSharedEntityReturnTypeCollection',
    function (data) {
      return (0, odata_common_1.throwErrorWhenReturnTypeIsUnionType)(
        data,
        'TestFunctionImportSharedEntityReturnTypeCollection'
      );
    },
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
  var params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnType',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForComplexType)(
        data,
        function (data) {
          return (0, odata_v4_1.deserializeComplexType)(
            data,
            TestComplexType_1.TestComplexType
          );
        }
      );
    },
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
  var params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportComplexReturnTypeCollection',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForComplexTypeList)(
        data,
        function (data) {
          return (0, odata_v4_1.deserializeComplexType)(
            data,
            TestComplexType_1.TestComplexType
          );
        }
      );
    },
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
  var params = {
    stringParam: new odata_common_1.FunctionImportParameter(
      'StringParam',
      'Edm.String',
      parameters.stringParam
    ),
    nonNullableStringParam: new odata_common_1.FunctionImportParameter(
      'NonNullableStringParam',
      'Edm.String',
      parameters.nonNullableStringParam
    ),
    nullableBooleanParam: new odata_common_1.FunctionImportParameter(
      'NullableBooleanParam',
      'Edm.Boolean',
      parameters.nullableBooleanParam
    ),
    nullableGeographyPointParam: new odata_common_1.FunctionImportParameter(
      'NullableGeographyPointParam',
      'Edm.Any',
      parameters.nullableGeographyPointParam
    )
  };
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportMultipleParams',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForEdmType)(
        data,
        function (val) {
          return (0, odata_v4_1.edmToTs)(val.value, 'Edm.Boolean');
        }
      );
    },
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
  var params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/sap/opu/odata/sap/API_TEST_SRV',
    'TestFunctionImportWithDifferentName',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForUndefined)(
        data,
        function (val) {
          return undefined;
        }
      );
    },
    params
  );
}
exports.testFunctionImportWithDifferentName =
  testFunctionImportWithDifferentName;
exports.functionImports = {
  testFunctionImportEdmReturnType: testFunctionImportEdmReturnType,
  testFunctionImportEdmReturnTypeCollection:
    testFunctionImportEdmReturnTypeCollection,
  testFunctionImportNullableTest: testFunctionImportNullableTest,
  testFunctionImportEntityReturnType: testFunctionImportEntityReturnType,
  testFunctionImportEntityReturnTypeCollection:
    testFunctionImportEntityReturnTypeCollection,
  testFunctionImportSharedEntityReturnType:
    testFunctionImportSharedEntityReturnType,
  testFunctionImportSharedEntityReturnTypeCollection:
    testFunctionImportSharedEntityReturnTypeCollection,
  testFunctionImportComplexReturnType: testFunctionImportComplexReturnType,
  testFunctionImportComplexReturnTypeCollection:
    testFunctionImportComplexReturnTypeCollection,
  testFunctionImportMultipleParams: testFunctionImportMultipleParams,
  testFunctionImportWithDifferentName: testFunctionImportWithDifferentName
};
//# sourceMappingURL=function-imports.js.map
