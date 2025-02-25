import { ODataRequestConfig } from './odata-request-config';
import type { DeSerializers } from '../de-serializers';
import type { ODataUri } from '../uri-conversion';
import type { OperationParameters } from './operation-parameter';
import type { RequestMethodType } from './odata-request-config';

/**
 * Function request configuration for an entity type.
 * @typeParam DeSerializersT - Type of the deserializer use on the request
 * @typeParam ParametersT - Type of the parameter to setup a request with
 */
export abstract class ODataFunctionRequestConfig<
  DeSerializersT extends DeSerializers,
  ParametersT
> extends ODataRequestConfig {
  /**
   * Creates an instance of ODataFunctionRequestConfig.
   * @param method - HTTP method for the request.
   * @param defaultBasePath - Default path of the service.
   * @param functionName - The name of the function.
   * @param parameters - Object containing the parameters with a value and additional meta information.
   * @param oDataUri - URI conversion functions.
   */
  constructor(
    method: RequestMethodType,
    defaultBasePath: string,
    readonly functionName: string,
    public parameters: OperationParameters<ParametersT>,
    protected oDataUri: ODataUri<DeSerializersT>
  ) {
    super(method, defaultBasePath);
  }

  abstract resourcePath(): string;

  abstract queryParameters(): Record<string, any>;
}
