import { oDataUri } from '../uri-conversion';
import {
  ActionFunctionImportRequestBuilder as ActionFunctionImportRequestBuilderBase,
  FunctionImportParameters
} from '../../odata-common';
import { ODataFunctionImportRequestConfig } from '../request';

/**
 * Create OData request to execute a function import.
 * @typeparam ParametersT - Type of the function import parameters
 * @typeparam ReturnT - Type of the function import return value
 */
export class FunctionImportRequestBuilder<
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
        oDataUri
      )
    );
  }
}

export { FunctionImportRequestBuilder as FunctionImportRequestBuilderV4 };
