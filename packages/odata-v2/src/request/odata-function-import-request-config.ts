import {
  ODataUri,
  FunctionImportParameter,
  FunctionImportParameters,
  RequestMethodType,
  ODataFunctionImportRequestConfig as ODataFunctionImportRequestConfigBase
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';

/**
 * Function import request configuration for an entity type.
 * @typeParam DeSerializersT - Type of the deserializer use on the request
 * @typeParam ParametersT - Type of the parameter to setup a request with
 */
export class ODataFunctionImportRequestConfig<
  DeSerializersT extends DeSerializers,
  ParametersT
> extends ODataFunctionImportRequestConfigBase<DeSerializersT, ParametersT> {
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
    functionImportName: string,
    parameters: FunctionImportParameters<ParametersT>,
    oDataUri: ODataUri<DeSerializersT>
  ) {
    super(method, defaultServicePath, functionImportName, parameters, oDataUri);
  }

  resourcePath(): string {
    return this.functionImportName;
  }

  queryParameters(): Record<string, any> {
    return {
      ...(Object.values(this.parameters)
        .filter(
          (parameter: FunctionImportParameter<ParametersT>) =>
            typeof parameter.value !== 'undefined'
        )
        .reduce(
          (
            queryParams: Record<string, any>,
            parameter: FunctionImportParameter<ParametersT>
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
