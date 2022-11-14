/*
 * Copyright (c) 2022 SAP SE or an SAP affiliate company. All rights reserved.
 *
 * This is a generated file powered by the SAP Cloud SDK for JavaScript.
 */
import {
  transformReturnValueForUndefined,
  DeSerializers,
  DefaultDeSerializers,
  defaultDeSerializers,
  ActionImportRequestBuilder
} from '@sap-cloud-sdk/odata-v4';
import { microsoftODataServiceSampleTrippinInMemoryModelsService } from './service';

/**
 * Type of the parameters to be passed to {@link resetDataSource}.
 */
export interface ResetDataSourceParameters<
  DeSerializersT extends DeSerializers
> {}

/**
 * Reset Data Source.
 * @param parameters - Object containing all parameters for the action.
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
