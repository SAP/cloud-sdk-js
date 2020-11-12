import {
  ODataUri,
  FunctionImportParameter,
  FunctionImportParameters,
  ODataFunctionImportRequestConfig,
  RequestMethodType
} from '../../odata-common';

export class ODataFunctionImportRequestConfigV4<
  ParametersT
> extends ODataFunctionImportRequestConfig<ParametersT> {
  /**
   * Creates an instance of ODataFunctionImportRequestConfig.
   *
   * @param method - HTTP method for the request
   * @param defaultServicePath - Default path of the service
   * @param functionImportName - The name of the function import.
   * @param parameters - Object containing the parameters with a value and additional meta information
   * @param oDataUri - ???
   */
  constructor(
    method: RequestMethodType,
    defaultServicePath: string,
    functionImportName: string,
    parameters: FunctionImportParameters<ParametersT>,
    oDataUri: ODataUri
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
    return this.prependDollarToQueryParameters({
      format: 'json'
    });
  }
}
