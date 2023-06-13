import {
  ActionFunctionImportRequestBuilderBase,
  EntityApi,
  EntityBase,
  OperationParameters
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import {
  ODataBoundActionImportRequestConfig,
  OdataBoundFunctionImportRequestConfig
} from '../request';
import { createODataUri } from '../uri-conversion';

/**
 * Create bound OData request to execute an operation.
 * @typeParam ParametersT - Type of the operation parameters.
 * @typeParam ReturnT - Type of the operation return value.
 */
export class BoundOperationRequestBuilder<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  ParametersT,
  ReturnT
> extends ActionFunctionImportRequestBuilderBase<
  DeSerializersT,
  ReturnT,
  | OdataBoundFunctionImportRequestConfig<EntityT, DeSerializersT, ParametersT>
  | ODataBoundActionImportRequestConfig<EntityT, DeSerializersT, ParametersT>
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
        ? new OdataBoundFunctionImportRequestConfig(
            'get',
            entityApi,
            operationName,
            parameters,
            createODataUri(deSerializers)
          )
        : new ODataBoundActionImportRequestConfig(
            'get',
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
