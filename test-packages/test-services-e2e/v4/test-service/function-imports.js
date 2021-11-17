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
const odata_common_1 = require('@sap-cloud-sdk/odata-common/internal');
const odata_v4_1 = require('@sap-cloud-sdk/odata-v4');
const TestEntity_1 = require('./TestEntity');
/**
 * Concat Strings.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
function concatStrings(parameters) {
  const params = {
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
    data =>
      (0, odata_v4_1.transformReturnValueForEdmType)(data, val =>
        (0, odata_v4_1.edmToTs)(val.value, 'Edm.String')
      ),
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
  const params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/odata/test-service',
    'getAll',
    data =>
      (0, odata_v4_1.transformReturnValueForEntityList)(
        data,
        TestEntity_1.TestEntity
      ),
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
  const params = {
    param: new odata_common_1.FunctionImportParameter(
      'param',
      'Edm.Int32',
      parameters.param
    )
  };
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/odata/test-service',
    'getByKey',
    data =>
      (0, odata_v4_1.transformReturnValueForEntity)(
        data,
        TestEntity_1.TestEntity
      ),
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
  const params = {
    param: new odata_common_1.FunctionImportParameter(
      'param',
      'Edm.Int32',
      parameters.param
    )
  };
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/odata/test-service',
    'returnCollection',
    data =>
      (0, odata_v4_1.transformReturnValueForEdmTypeList)(data, val =>
        (0, odata_v4_1.edmToTs)(val, 'Edm.Int32')
      ),
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
  const params = {
    param: new odata_common_1.FunctionImportParameter(
      'param',
      'Edm.Int32',
      parameters.param
    )
  };
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/odata/test-service',
    'returnInt',
    data =>
      (0, odata_v4_1.transformReturnValueForEdmType)(data, val =>
        (0, odata_v4_1.edmToTs)(val.value, 'Edm.Int32')
      ),
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
  const params = {};
  return new odata_v4_1.FunctionImportRequestBuilder(
    '/odata/test-service',
    'returnSapCloudSdk',
    data =>
      (0, odata_v4_1.transformReturnValueForEdmType)(data, val =>
        (0, odata_v4_1.edmToTs)(val.value, 'Edm.String')
      ),
    params
  );
}
exports.returnSapCloudSdk = returnSapCloudSdk;
exports.functionImports = {
  concatStrings,
  getAll,
  getByKey,
  returnCollection,
  returnInt,
  returnSapCloudSdk
};
//# sourceMappingURL=function-imports.js.map
