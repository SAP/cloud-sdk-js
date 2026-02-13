import { OperationRequestBuilderBase } from '@sap-cloud-sdk/odata-common/internal';
import {
  ODataBoundActionRequestConfig,
  ODataBoundFunctionRequestConfig
} from '../request';
import { createODataUri } from '../uri-conversion';
import type { DeSerializers } from '../de-serializers';
import type {
  EntityApi,
  EntityBase,
  OperationParameters
} from '@sap-cloud-sdk/odata-common/internal';

/**
 * Create bound OData request to execute an operation.
 * @template ParametersT - Type of the operation parameters.
 * @template ReturnT - Type of the operation return value.
 */
export class BoundOperationRequestBuilder<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  ParametersT,
  ReturnT
> extends OperationRequestBuilderBase<
  DeSerializersT,
  ReturnT,
  | ODataBoundFunctionRequestConfig<EntityT, DeSerializersT, ParametersT>
  | ODataBoundActionRequestConfig<EntityT, DeSerializersT, ParametersT>
> {
  constructor(
    entityApi: EntityApi<EntityT, DeSerializersT>,
    entity: EntityT,
    operationName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: OperationParameters<ParametersT>,
    deSerializers: DeSerializersT,
    type: 'function' | 'action'
  ) {
    const requestConfig =
      type === 'function'
        ? new ODataBoundFunctionRequestConfig(
            'get',
            entityApi,
            operationName,
            parameters,
            createODataUri(deSerializers)
          )
        : new ODataBoundActionRequestConfig(
            entityApi,
            operationName,
            parameters,
            createODataUri(deSerializers)
          );
    super(responseTransformer, requestConfig, deSerializers);

    this.requestConfig.keys = this.requestConfig.oDataUri.getEntityKeys(
      entity,
      entityApi
    );
  }
}
