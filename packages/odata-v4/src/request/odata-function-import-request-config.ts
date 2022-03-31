import {
  ODataUri,
  FunctionImportParameter,
  FunctionImportParameters,
  ODataFunctionImportRequestConfig as ODataFunctionImportRequestConfigBase,
  RequestMethodType
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';

/**
 * @internal
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
    return `${this.functionImportName}(${Object.values(this.parameters)
      .map(
        (parameter: FunctionImportParameter<ParametersT>) =>
          `${parameter.originalName}=${this.oDataUri.convertToUriFormat(
            parameter.value,
            parameter.edmType
          )}`
      )
      .join(',')})`;
  }

  queryParameters(): Record<string, any> {
    return {};
  }
}
