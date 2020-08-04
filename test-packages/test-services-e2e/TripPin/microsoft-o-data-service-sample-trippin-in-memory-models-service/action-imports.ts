/*
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import { transformReturnValueForUndefined, ActionImportRequestBuilder, ActionImportPayloadElement } from '@sap-cloud-sdk/core/v4';

/**
 * Type of the parameters to be passed to [[resetDataSource]].
 */
export interface ResetDataSourceParameters {
}

/**
 * Reset Data Source.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resultng request.
 */
export function resetDataSource(parameters: ResetDataSourceParameters): ActionImportRequestBuilder<ResetDataSourceParameters, undefined> {
  const payload = {

  }

  return new ActionImportRequestBuilder('TripPinRESTierService/(S(duh2c3dgb1c5lzc0bqwgyekc))/', 'ResetDataSource', (data) => transformReturnValueForUndefined(data, (val) => undefined), payload);
}

export const actionImports = {
  resetDataSource
};
