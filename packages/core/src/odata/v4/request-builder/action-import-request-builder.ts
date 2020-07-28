/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { oDataUri } from '../uri-conversion';
import { ActionImportParameters } from '../request/action-import-parameter';
import { ActionAndFunctionImportRequestBuilderBase } from '../../common/request-builder/action-and-function-import-request-builder-base';

/**
 * Create OData request to execute a action import.
 * @typeparam ParametersT - Type of the function import parameters
 * @typeparam ReturnT - Type of the function import return value
 */
export class ActionImportRequestBuilder<
  ParametersT,
  ReturnT
> extends ActionAndFunctionImportRequestBuilderBase<ParametersT, ReturnT> {
  /**
   * Creates an instance of ActionImportRequestBuilder.
   * @param defaultServicePath - Default path for the service the action belongs to
   * @param actionImportName - The name of the function import.
   * @param responseTransformer - Transformation function for the response
   * @param parameters - Parameters to be set in the action
   */
  constructor(
    defaultServicePath: string,
    actionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: ActionImportParameters<ParametersT>
  ) {
    super(
      'post',
      defaultServicePath,
      actionImportName,
      responseTransformer,
      parameters,
      oDataUri
    );
  }
}
