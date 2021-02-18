import {
  ODataUri,
  FunctionImportParameter,
  FunctionImportParameters,
  ODataFunctionImportRequestConfig as ODataFunctionImportRequestConfigBase,
  RequestMethodType
} from '../../odata-common';

export class ODataFunctionImportRequestConfig<
  ParametersT
> extends ODataFunctionImportRequestConfigBase<ParametersT> {
  /**
   * Creates an instance of ODataFunctionImportRequestConfig.
   *
   * @param method - HTTP method for the request
   * @param defaultServicePath - Default path of the service
   * @param functionImportName - The name of the function import.
   * @param parameters - Object containing the parameters with a value and additional meta information
   * @param oDataUri - ODataUri conversion interface at runtime either v2 or v4
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

export { ODataFunctionImportRequestConfig as ODataFunctionImportRequestConfigV4 };
