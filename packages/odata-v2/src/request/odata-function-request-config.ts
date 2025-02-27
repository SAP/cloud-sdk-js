import { ODataFunctionRequestConfig as ODataFunctionRequestConfigBase } from '@sap-cloud-sdk/odata-common/internal';
import type {
  ODataUri,
  OperationParameter,
  OperationParameters,
  RequestMethodType
} from '@sap-cloud-sdk/odata-common/internal';
import type { DeSerializers } from '../de-serializers';

/**
 * Function request configuration for an entity type.
 * @typeParam DeSerializersT - Type of the deserializer use on the request
 * @typeParam ParametersT - Type of the parameter to setup a request with
 */
export class ODataFunctionRequestConfig<
  DeSerializersT extends DeSerializers,
  ParametersT
> extends ODataFunctionRequestConfigBase<DeSerializersT, ParametersT> {
  /**
   * Creates an instance of ODataFunctionRequestConfig.
   * @param method - HTTP method for the request.
   * @param defaultBasePath - Default base path of the service.
   * @param functionName - The name of the function.
   * @param parameters - Object containing the parameters with a value and additional meta information.
   * @param oDataUri - URI conversion functions.
   */
  constructor(
    method: RequestMethodType,
    defaultBasePath: string,
    functionName: string,
    parameters: OperationParameters<ParametersT>,
    oDataUri: ODataUri<DeSerializersT>
  ) {
    super(method, defaultBasePath, functionName, parameters, oDataUri);
  }

  resourcePath(): string {
    return this.functionName;
  }

  queryParameters(): Record<string, any> {
    return {
      ...(Object.values(this.parameters)
        .filter(
          (parameter: OperationParameter<ParametersT>) =>
            typeof parameter.value !== 'undefined'
        )
        .reduce(
          (
            queryParams: Record<string, any>,
            parameter: OperationParameter<ParametersT>
          ) => {
            queryParams[parameter.originalName] =
              this.oDataUri.convertToUriFormat(
                parameter.value,
                parameter.edmType
              );
            return queryParams;
          },
          {}
        ) as Record<string, any>)
    };
  }
}

/**
 * @deprecated Since 3.3.0. Use {@link ODataFunctionRequestConfig} instead.
 */
export const ODataFunctionImportRequestConfig = ODataFunctionRequestConfig;
