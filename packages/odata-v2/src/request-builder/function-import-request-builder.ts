import {
  FunctionImportParameters,
  RequestMethodType,
  ActionFunctionImportRequestBuilderBase
} from '@sap-cloud-sdk/odata-common/internal';
import {
  DefaultDeSerializers,
  DeSerializers,
  CustomDeSerializers
} from '../de-serializers';
import { ODataFunctionImportRequestConfig } from '../request';
import { createODataUri } from '../uri-conversion';

/**
 * Create OData request to execute a function import.
 * @typeparam ParametersT - Type of the function import parameters
 * @typeparam ReturnT - Type of the function import return value
 */
export class FunctionImportRequestBuilder<
  ParametersT,
  ReturnT,
  DeSerializersT extends DeSerializers = DefaultDeSerializers
> extends ActionFunctionImportRequestBuilderBase<
  ReturnT,
  ODataFunctionImportRequestConfig<ParametersT>
> {
  /**
   * Creates an instance of FunctionImportRequestBuilder.
   * @param method - HTTP method to be used for the request
   * @param defaultServicePath - Default path for the service the function belongs to
   * @param functionImportName - The name of the function import.
   * @param responseTransformer - Transformation function for the response
   * @param parameters - Parameters to be set in the function
   * @param deSerializers - TODO
   */
  constructor(
    method: RequestMethodType,
    defaultServicePath: string,
    functionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: FunctionImportParameters<ParametersT>,
    deSerializers: CustomDeSerializers<DeSerializersT>
  ) {
    super(
      responseTransformer,
      new ODataFunctionImportRequestConfig(
        method,
        defaultServicePath,
        functionImportName,
        parameters,
        createODataUri(deSerializers)
      )
    );
  }
}
