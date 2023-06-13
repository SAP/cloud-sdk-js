import {
  OperationParameters,
  RequestMethodType,
  ActionFunctionImportRequestBuilderBase
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import { ODataFunctionImportRequestConfig } from '../request';
import { createODataUri } from '../uri-conversion';

/**
 * Create OData request to execute an operation.
 * For v2, only function, but not action, is supported.
 * @typeParam ParametersT - Type of the function import parameters.
 * @typeParam ReturnT - Type of the function import return value.
 */
export class OperationRequestBuilder<
  DeSerializersT extends DeSerializers,
  ParametersT,
  ReturnT
> extends ActionFunctionImportRequestBuilderBase<
  DeSerializersT,
  ReturnT,
  ODataFunctionImportRequestConfig<DeSerializersT, ParametersT>
> {
  /**
   * Creates an instance of OperationRequestBuilder.
   * @param method - HTTP method to be used for the request.
   * @param defaultBasePath - Default base path for the service the operation belongs to.
   * @param operationName - The name of the operation.
   * @param responseTransformer - Transformation function for the response.
   * @param parameters - Parameters to be set in the operation.
   * @param deSerializers - (De-)serializers used for transformation.
   */
  constructor(
    method: RequestMethodType,
    defaultBasePath: string,
    operationName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: OperationParameters<ParametersT>,
    deSerializers: DeSerializersT
  ) {
    super(
      responseTransformer,
      new ODataFunctionImportRequestConfig(
        method,
        defaultBasePath,
        operationName,
        parameters,
        createODataUri(deSerializers)
      ),
      deSerializers
    );
  }
}
