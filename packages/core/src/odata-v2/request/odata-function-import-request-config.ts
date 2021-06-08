import {
  ODataUri,
  FunctionImportParameter,
  FunctionImportParameters,
  RequestMethodType,
  ODataFunctionImportRequestConfig as ODataFunctionImportRequestConfigBase
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
    return this.functionImportName;
  }

  queryParameters(): Record<string, any> {
    return {
      ...this.prependDollarToQueryParameters({
        format: 'json'
      }),
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

export { ODataFunctionImportRequestConfig as ODataFunctionImportRequestConfigV2 };
