import {
  FunctionImportParameters,
  RequestMethodType,
  ActionFunctionImportRequestBuilderBase
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializationMiddlewareBASE } from '@sap-cloud-sdk/odata-common/src/de-serializers/de-serialization-middleware';
import { DeSerializationMiddleware } from '../de-serializers/de-serialization-middleware';
import { CustomDeSerializer } from '../de-serializers/get-de-serializers';
import { ODataFunctionImportRequestConfig } from '../request/odata-function-import-request-config';
import { createODataUri } from '../uri-conversion/odata-uri';

/**
 * Create OData request to execute a function import.
 * @typeparam ParametersT - Type of the function import parameters
 * @typeparam ReturnT - Type of the function import return value
 */
export class FunctionImportRequestBuilder<
  // reuse
  ParametersT,
  ReturnT,
  T extends DeSerializationMiddlewareBASE = DeSerializationMiddleware
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
    deSerializers: CustomDeSerializer<T>
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
