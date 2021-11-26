import { ODataUri } from '../uri-conversion';
import { FunctionImportParameters } from './function-import-parameter';
import { ODataRequestConfig, RequestMethodType } from './odata-request-config';

/**
 * @internal
 */
export abstract class ODataFunctionImportRequestConfig<
  ParametersT
> extends ODataRequestConfig {
  /**
   * Creates an instance of ODataFunctionImportRequestConfig.
   * @param method - HTTP method for the request
   * @param defaultServicePath - Default path of the service
   * @param functionImportName - The name of the function import.
   * @param parameters - Object containing the parameters with a value and additional meta information
   */
  constructor(
    method: RequestMethodType,
    defaultServicePath: string,
    readonly functionImportName: string,
    public parameters: FunctionImportParameters<ParametersT>,
    protected oDataUri: ODataUri
  ) {
    super(method, defaultServicePath);
  }

  abstract resourcePath(): string;

  abstract queryParameters(): Record<string, any>;
}
