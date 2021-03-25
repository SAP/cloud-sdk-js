/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  transformReturnValueForUndefinedV4,
  ActionImportRequestBuilder,
  ActionImportParameter
} from '@sap-cloud-sdk/core';

/**
 * Type of the parameters to be passed to [[resetDataSource]].
 */
export interface ResetDataSourceParameters {}

/**
 * Reset Data Source.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function resetDataSource(
  parameters: ResetDataSourceParameters
): ActionImportRequestBuilder<ResetDataSourceParameters, undefined> {
  const params = {};

  return new ActionImportRequestBuilder(
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/',
    'ResetDataSource',
    data => transformReturnValueForUndefinedV4(data, val => undefined),
    params
  );
}

export const actionImports = {
  resetDataSource
};
