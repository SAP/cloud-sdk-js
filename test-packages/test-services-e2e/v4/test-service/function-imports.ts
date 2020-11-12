/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { transformReturnValueForEntityV4, transformReturnValueForEdmTypeV4, edmToTsV4, FunctionImportRequestBuilderV4, FunctionImportParameter } from '@sap-cloud-sdk/core';
import { TestEntity } from './TestEntity';

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
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function getByKey(parameters: GetByKeyParameters): FunctionImportRequestBuilderV4<GetByKeyParameters, TestEntity> {
  const params = {
    param: new FunctionImportParameter('param', 'Edm.Int32', parameters.param)
  }

  return new FunctionImportRequestBuilderV4('/test-service', 'getByKey', (data) => transformReturnValueForEntityV4(data, TestEntity), params);
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
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function returnInt(parameters: ReturnIntParameters): FunctionImportRequestBuilderV4<ReturnIntParameters, number> {
  const params = {
    param: new FunctionImportParameter('param', 'Edm.Int32', parameters.param)
  }

  return new FunctionImportRequestBuilderV4('/test-service', 'returnInt', (data) => transformReturnValueForEdmTypeV4(data, (val) => edmToTsV4(val.value, 'Edm.Int32')), params);
}

/**
 * Type of the parameters to be passed to [[returnSapCloudSdk]].
 */
export interface ReturnSapCloudSdkParameters {
}

/**
 * Return Sap Cloud Sdk.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function returnSapCloudSdk(parameters: ReturnSapCloudSdkParameters): FunctionImportRequestBuilderV4<ReturnSapCloudSdkParameters, string> {
  const params = {

  }

  return new FunctionImportRequestBuilderV4('/test-service', 'returnSapCloudSdk', (data) => transformReturnValueForEdmTypeV4(data, (val) => edmToTsV4(val.value, 'Edm.String')), params);
}

/**
 * Type of the parameters to be passed to [[returnSapCloudSdk2]].
 */
export interface ReturnSapCloudSdk2Parameters {
  /**
   * Str.
   */
  str: string;
  /**
   * Int.
   */
  int: number;
}

/**
 * Return Sap Cloud Sdk 2.
 *
 * @param parameters - Object containing all parameters for the function import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function returnSapCloudSdk2(parameters: ReturnSapCloudSdk2Parameters): FunctionImportRequestBuilderV4<ReturnSapCloudSdk2Parameters, string> {
  const params = {
    str: new FunctionImportParameter('Str', 'Edm.String', parameters.str),
    int: new FunctionImportParameter('Int', 'Edm.Int32', parameters.int)
  }

  return new FunctionImportRequestBuilderV4('/test-service', 'returnSapCloudSdk2', (data) => transformReturnValueForEdmTypeV4(data, (val) => edmToTsV4(val.value, 'Edm.String')), params);
}

export const functionImports = {
  getByKey,
  returnInt,
  returnSapCloudSdk,
  returnSapCloudSdk2
};
