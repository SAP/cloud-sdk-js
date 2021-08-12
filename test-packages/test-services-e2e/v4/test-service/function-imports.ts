/*
 * Copyright (c) 2021 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  transformReturnValueForEdmTypeV4,
  transformReturnValueForEntityListV4,
  transformReturnValueForEntityV4,
  transformReturnValueForEdmTypeListV4,
  edmToTsV4,
  FunctionImportRequestBuilderV4,
  FunctionImportParameter
} from '@sap-cloud-sdk/core';
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
): FunctionImportRequestBuilderV4<ConcatStringsParameters, string> {
  const params = {
    str1: new FunctionImportParameter('Str1', 'Edm.String', parameters.str1),
    str2: new FunctionImportParameter('Str2', 'Edm.String', parameters.str2)
  };

  return new FunctionImportRequestBuilderV4(
    '/odata/test-service',
    'concatStrings',
    data =>
      transformReturnValueForEdmTypeV4(data, val =>
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
): FunctionImportRequestBuilderV4<GetAllParameters, TestEntity[]> {
  const params = {};

  return new FunctionImportRequestBuilderV4(
    '/odata/test-service',
    'getAll',
    data => transformReturnValueForEntityListV4(data, TestEntity),
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
): FunctionImportRequestBuilderV4<GetByKeyParameters, TestEntity> {
  const params = {
    param: new FunctionImportParameter('param', 'Edm.Int32', parameters.param)
  };

  return new FunctionImportRequestBuilderV4(
    '/odata/test-service',
    'getByKey',
    data => transformReturnValueForEntityV4(data, TestEntity),
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
): FunctionImportRequestBuilderV4<ReturnCollectionParameters, number[]> {
  const params = {
    param: new FunctionImportParameter('param', 'Edm.Int32', parameters.param)
  };

  return new FunctionImportRequestBuilderV4(
    '/odata/test-service',
    'returnCollection',
    data =>
      transformReturnValueForEdmTypeListV4(data, val =>
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
): FunctionImportRequestBuilderV4<ReturnIntParameters, number> {
  const params = {
    param: new FunctionImportParameter('param', 'Edm.Int32', parameters.param)
  };

  return new FunctionImportRequestBuilderV4(
    '/odata/test-service',
    'returnInt',
    data =>
      transformReturnValueForEdmTypeV4(data, val =>
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
): FunctionImportRequestBuilderV4<ReturnSapCloudSdkParameters, string> {
  const params = {};

  return new FunctionImportRequestBuilderV4(
    '/odata/test-service',
    'returnSapCloudSdk',
    data =>
      transformReturnValueForEdmTypeV4(data, val =>
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
