/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { transformReturnValueForEdmTypeV4, edmToTsV4, FunctionImportRequestBuilderV4, FunctionImportParameter } from '@sap-cloud-sdk/core';

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

  return new FunctionImportRequestBuilderV4('/admin', 'returnSapCloudSdk', (data) => transformReturnValueForEdmTypeV4(data, (val) => edmToTsV4(val.value, 'Edm.String')), params);
}

export const functionImports = {
  returnSapCloudSdk
};
