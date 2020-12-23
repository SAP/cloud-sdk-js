import { oDataUri } from '../uri-conversion';
import {
  FunctionImportParameters,
  RequestMethodType,
  ActionFunctionImportRequestBuilder as ActionFunctionImportRequestBuilderBase
} from '../../odata-common';
import { ODataFunctionImportRequestConfigV2 } from '../request';

/**
 * Create OData request to execute a function import.
 * @typeparam ParametersT - Type of the function import parameters
 * @typeparam ReturnT - Type of the function import return value
 */
export class FunctionImportRequestBuilderV2<
  // reuse
  ParametersT,
  ReturnT
> extends ActionFunctionImportRequestBuilderBase<ParametersT, ReturnT> {
  /**
   * Creates an instance of FunctionImportRequestBuilder.
   * @param method - HTTP method to be used for the request
   * @param defaultServicePath - Default path for the service the function belongs to
   * @param functionImportName - The name of the function import.
   * @param responseTransformer - Transformation function for the response
   * @param parameters - Parameters to be set in the function
   */
  constructor(
    method: RequestMethodType,
    defaultServicePath: string,
    functionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: FunctionImportParameters<ParametersT>
  ) {
    super(
      responseTransformer,
      new ODataFunctionImportRequestConfigV2(
        method,
        defaultServicePath,
        functionImportName,
        parameters,
        oDataUri
      )
    );
  }
}

export { FunctionImportRequestBuilderV2 as FunctionImportRequestBuilder };
