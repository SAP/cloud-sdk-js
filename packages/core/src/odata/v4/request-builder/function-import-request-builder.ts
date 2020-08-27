/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { FunctionImportParameters } from '../../common';
import { oDataUriV4 } from '../uri-conversion';
import { ActionFunctionImportRequestBuilderBase } from '../../common/request-builder/action-function-import-request-builder-base';
import { ODataFunctionImportRequestConfig } from '../../common/request/odata-function-import-request-config';

/**
 * Create OData request to execute a function import.
 *
 * @typeparam ParametersT - Type of the function import parameters
 * @typeparam ReturnT - Type of the function import return value
 */
export class FunctionImportRequestBuilderV4<
  ParametersT,
  ReturnT
> extends ActionFunctionImportRequestBuilderBase<ParametersT, ReturnT> {
  /**
   * Creates an instance of FunctionImportRequestBuilder.
   * @param defaultServicePath - Default path for the service the function belongs to
   * @param functionImportName - The name of the function import.
   * @param responseTransformer - Transformation function for the response
   * @param parameters - Parameters to be set in the function
   */
  constructor(
    defaultServicePath: string,
    functionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: FunctionImportParameters<ParametersT>
  ) {
    super(
      responseTransformer,
      new ODataFunctionImportRequestConfig(
        'get',
        defaultServicePath,
        functionImportName,
        parameters,
        oDataUriV4
      )
    );
  }
}
