/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { FunctionImportParameter } from '@sap-cloud-sdk/odata-common';
import {
  edmToTsV4,
  FunctionImportRequestBuilder,
  transformReturnValueForEdmType,
  transformReturnValueForEntityList,
  transformReturnValueForEntity,
  transformReturnValueForEdmTypeList
} from '@sap-cloud-sdk/odata-v4';
import { TestEntity } from './TestEntity';

/**
 * Type of the parameters to be passed to [[concatStrings]].
 */
export interface ConcatStringsParameters {
  /**
   * Str 1.
   */
  str1: string;
  /**
   * Str 2.
   */
  str2: string;
}

/**
 * Concat Strings.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function concatStrings(
  parameters: ConcatStringsParameters
): FunctionImportRequestBuilder<ConcatStringsParameters, string> {
  const params = {
    str1: new FunctionImportParameter('Str1', 'Edm.String', parameters.str1),
    str2: new FunctionImportParameter('Str2', 'Edm.String', parameters.str2)
  };

  return new FunctionImportRequestBuilder(
    '/odata/test-service',
    'concatStrings',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTsV4(val.value, 'Edm.String')
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[getAll]].
 */
export interface GetAllParameters {}

/**
 * Get All.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function getAll(
  parameters: GetAllParameters
): FunctionImportRequestBuilder<GetAllParameters, TestEntity[]> {
  const params = {};

  return new FunctionImportRequestBuilder(
    '/odata/test-service',
    'getAll',
    data => transformReturnValueForEntityList(data, TestEntity),
    params
  );
}

/**
 * Type of the parameters to be passed to [[getByKey]].
 */
export interface GetByKeyParameters {
  /**
   * Param.
   */
  param: number;
}

/**
 * Get By Key.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function getByKey(
  parameters: GetByKeyParameters
): FunctionImportRequestBuilder<GetByKeyParameters, TestEntity> {
  const params = {
    param: new FunctionImportParameter('param', 'Edm.Int32', parameters.param)
  };

  return new FunctionImportRequestBuilder(
    '/odata/test-service',
    'getByKey',
    data => transformReturnValueForEntity(data, TestEntity),
    params
  );
}

/**
 * Type of the parameters to be passed to [[returnCollection]].
 */
export interface ReturnCollectionParameters {
  /**
   * Param.
   */
  param: number;
}

/**
 * Return Collection.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function returnCollection(
  parameters: ReturnCollectionParameters
): FunctionImportRequestBuilder<ReturnCollectionParameters, number[]> {
  const params = {
    param: new FunctionImportParameter('param', 'Edm.Int32', parameters.param)
  };

  return new FunctionImportRequestBuilder(
    '/odata/test-service',
    'returnCollection',
    data =>
      transformReturnValueForEdmTypeList(data, val =>
        edmToTsV4(val, 'Edm.Int32')
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[returnInt]].
 */
export interface ReturnIntParameters {
  /**
   * Param.
   */
  param: number;
}

/**
 * Return Int.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function returnInt(
  parameters: ReturnIntParameters
): FunctionImportRequestBuilder<ReturnIntParameters, number> {
  const params = {
    param: new FunctionImportParameter('param', 'Edm.Int32', parameters.param)
  };

  return new FunctionImportRequestBuilder(
    '/odata/test-service',
    'returnInt',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTsV4(val.value, 'Edm.Int32')
      ),
    params
  );
}

/**
 * Type of the parameters to be passed to [[returnSapCloudSdk]].
 */
export interface ReturnSapCloudSdkParameters {}

/**
 * Return Sap Cloud Sdk.
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function returnSapCloudSdk(
  parameters: ReturnSapCloudSdkParameters
): FunctionImportRequestBuilder<ReturnSapCloudSdkParameters, string> {
  const params = {};

  return new FunctionImportRequestBuilder(
    '/odata/test-service',
    'returnSapCloudSdk',
    data =>
      transformReturnValueForEdmType(data, val =>
        edmToTsV4(val.value, 'Edm.String')
      ),
    params
  );
}

export const functionImports = {
  concatStrings,
  getAll,
  getByKey,
  returnCollection,
  returnInt,
  returnSapCloudSdk
};
