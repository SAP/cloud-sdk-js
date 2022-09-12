import { DeSerializers } from '../de-serializers';
import { ODataUri } from '../uri-conversion';
import { FunctionImportParameters } from './function-import-parameter';
import { ODataRequestConfig, RequestMethodType } from './odata-request-config';

/**
 * Function import request configuration for an entity type.
 * @typeParam DeSerializersT - Type of the deserializer use on the request
 * @typeParam ParametersT - Type of the parameter to setup a request with
 */
export abstract class ODataFunctionImportRequestConfig<
  DeSerializersT extends DeSerializers,
  ParametersT
> extends ODataRequestConfig {
  /**
   * Creates an instance of ODataFunctionImportRequestConfig.
   * @param method - HTTP method for the request.
   * @param defaultServicePath - Default path of the service.
   * @param functionImportName - The name of the function import.
   * @param parameters - Object containing the parameters with a value and additional meta information.
   * @param oDataUri - URI conversion functions.
   */
  constructor(
    method: RequestMethodType,
    defaultServicePath: string,
    readonly functionImportName: string,
    public parameters: FunctionImportParameters<ParametersT>,
    protected oDataUri: ODataUri<DeSerializersT>
  ) {
    super(method, defaultServicePath);
  }

  abstract resourcePath(): string;

  abstract queryParameters(): Record<string, any>;
}
