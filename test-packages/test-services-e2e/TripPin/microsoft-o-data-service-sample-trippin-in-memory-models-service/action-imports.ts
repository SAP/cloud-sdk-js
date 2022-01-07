/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import '@sap-cloud-sdk/odata-common/internal';
import {
  ActionImportRequestBuilder,
  ActionImportParameter,
  transformReturnValueForUndefined,
  DeSerializers,
  DefaultDeSerializers,
  defaultDeSerializers
} from '@sap-cloud-sdk/odata-v4';
import { microsoftODataServiceSampleTrippinInMemoryModelsService } from './service';

/**
 * Type of the parameters to be passed to [[resetDataSource]].
 */
export interface ResetDataSourceParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Reset Data Source.
 *
 * @param parameters - Object containing all parameters for the action import.
 * @returns A request builder that allows to overwrite some of the values and execute the resulting request.
 */
export function resetDataSource<
  DeSerializersT extends DeSerializers = DefaultDeSerializers
>(
  parameters: ResetDataSourceParameters<DeSerializersT>,
  deSerializers: DeSerializersT = defaultDeSerializers as any
): ActionImportRequestBuilder<
  DeSerializersT,
  ResetDataSourceParameters<DeSerializersT>,
  undefined
> {
  const params = {};

  return new ActionImportRequestBuilder(
    'V4/(S(duh2c3dgb1c5lzc0bqwgyekc))/TripPinServiceRW/',
    'ResetDataSource',
    data => transformReturnValueForUndefined(data, val => undefined),
    params,
    deSerializers
  );
}

export const actionImports = {
  resetDataSource
};
