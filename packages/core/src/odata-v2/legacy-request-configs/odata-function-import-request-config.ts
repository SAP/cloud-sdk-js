import { oDataUriV2 } from '../uri-conversion';
import {
  RequestMethodType,
  FunctionImportParameters
} from '../../odata-common';
import { ODataFunctionImportRequestConfigV2 } from '../request';

/**
 * @deprecated Since v1.21.0. Use superclass instead.
 * OData function import request configuration for a set of parameters.
 *
 * @typeparam ParametersT - Type of the original parameters object
 */
class ODataFunctionImportRequestConfig<
  ParametersT
> extends ODataFunctionImportRequestConfigV2<ParametersT> {
  /**
   * Creates an instance of ODataFunctionImportRequestConfig.
   *
   * @param method - HTTP method for the request
   * @param defaultServicePath - Default path of the service
   * @param functionImportName - The name of the function import.
   * @param parameters - Object containing the parameters with a value and additional meta information
   */
  constructor(
    method: RequestMethodType,
    defaultServicePath: string,
    functionImportName: string,
    parameters: FunctionImportParameters<ParametersT>
  ) {
    super(
      method,
      defaultServicePath,
      functionImportName,
      parameters,
      oDataUriV2
    );
  }
}

export { ODataFunctionImportRequestConfig as ODataFunctionImportRequestConfigLegacy };
