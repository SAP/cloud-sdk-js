import {
  ActionFunctionImportRequestBuilderBase,
  ODataRequestConfig,
  OperationParameters
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import {
  ODataFunctionImportRequestConfig,
  ODataActionImportRequestConfig
} from '../request';
import { createODataUri } from '../uri-conversion';

/**
 * Create OData request to execute an operation.
 * @typeParam ParametersT - Type of the operation parameters.
 * @typeParam ReturnT - Type of the operation return value.
 */
export class OperationRequestBuilder<
  DeSerializersT extends DeSerializers,
  ParametersT,
  ReturnT
> extends ActionFunctionImportRequestBuilderBase<
  DeSerializersT,
  ReturnT,
  ODataRequestConfig
> {
  /**
   * Creates an instance of OperationRequestBuilder.
   * @param defaultBasePath - Default base path for the service the operation belongs to.
   * @param operationName - The name of the operation.
   * @param responseTransformer - Transformation function for the response.
   * @param parameters - Parameters to be set in the operation.
   * @param deSerializers - (De-)serializers used for transformation.
   * @param type - Type of operation, whether it is a function or an action.
   */
  constructor(
    defaultBasePath: string,
    operationName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: OperationParameters<ParametersT>,
    deSerializers: DeSerializersT,
    type: 'function' | 'action'
  ) {
    const requestConfig =
      type === 'function'
        ? new ODataFunctionImportRequestConfig(
            'get',
            defaultBasePath,
            operationName,
            parameters,
            createODataUri(deSerializers)
          )
        : new ODataActionImportRequestConfig(
            defaultBasePath,
            operationName,
            parameters,
            createODataUri(deSerializers)
          );
    super(responseTransformer, requestConfig, deSerializers);
  }
}
