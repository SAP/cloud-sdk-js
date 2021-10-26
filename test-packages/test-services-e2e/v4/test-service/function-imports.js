'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.functionImports =
  exports.returnSapCloudSdk =
  exports.returnInt =
  exports.returnCollection =
  exports.getByKey =
  exports.getAll =
  exports.concatStrings =
    void 0;
/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
var odata_common_1 = require('@sap-cloud-sdk/odata-common');
var odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
var TestEntity_1 = require('./TestEntity');
/**
 * Concat Strings.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function concatStrings(parameters) {
  var params = {
    str1: new odata_common_1.FunctionImportParameter(
      'Str1',
      'Edm.String',
      parameters.str1
    ),
    str2: new odata_common_1.FunctionImportParameter(
      'Str2',
      'Edm.String',
      parameters.str2
    )
  };
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/odata/test-service',
    'concatStrings',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForEdmType)(
        data,
        function (val) {
          return (0, odata_v4_1.edmToTsV4)(val.value, 'Edm.String');
        }
      );
    },
    params
  );
}
exports.concatStrings = concatStrings;
/**
 * Get All.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function getAll(parameters) {
  var params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/odata/test-service',
    'getAll',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForEntityList)(
        data,
        TestEntity_1.TestEntity
      );
    },
    params
  );
}
exports.getAll = getAll;
/**
 * Get By Key.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function getByKey(parameters) {
  var params = {
    param: new odata_common_1.FunctionImportParameter(
      'param',
      'Edm.Int32',
      parameters.param
    )
  };
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/odata/test-service',
    'getByKey',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForEntity)(
        data,
        TestEntity_1.TestEntity
      );
    },
    params
  );
}
exports.getByKey = getByKey;
/**
 * Return Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function returnCollection(parameters) {
  var params = {
    param: new odata_common_1.FunctionImportParameter(
      'param',
      'Edm.Int32',
      parameters.param
    )
  };
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/odata/test-service',
    'returnCollection',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForEdmTypeList)(
        data,
        function (val) {
          return (0, odata_v4_1.edmToTsV4)(val, 'Edm.Int32');
        }
      );
    },
    params
  );
}
exports.returnCollection = returnCollection;
/**
 * Return Int.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function returnInt(parameters) {
  var params = {
    param: new odata_common_1.FunctionImportParameter(
      'param',
      'Edm.Int32',
      parameters.param
    )
  };
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/odata/test-service',
    'returnInt',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForEdmType)(
        data,
        function (val) {
          return (0, odata_v4_1.edmToTsV4)(val.value, 'Edm.Int32');
        }
      );
    },
    params
  );
}
exports.returnInt = returnInt;
/**
 * Return Sap Cloud Sdk.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function returnSapCloudSdk(parameters) {
  var params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/odata/test-service',
    'returnSapCloudSdk',
    function (data) {
      return (0, odata_v4_1.transformReturnValueForEdmType)(
        data,
        function (val) {
          return (0, odata_v4_1.edmToTsV4)(val.value, 'Edm.String');
        }
      );
    },
    params
  );
}
exports.returnSapCloudSdk = returnSapCloudSdk;
exports.functionImports = {
  concatStrings: concatStrings,
  getAll: getAll,
  getByKey: getByKey,
  returnCollection: returnCollection,
  returnInt: returnInt,
  returnSapCloudSdk: returnSapCloudSdk
};
//# sourceMappingURL=function-imports.js.map
