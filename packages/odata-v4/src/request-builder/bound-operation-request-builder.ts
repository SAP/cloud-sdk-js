// eslint-disable-next-line max-classes-per-file
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
 * @typeParam ParametersT - Type of the operation parameters.
 * @typeParam ReturnT - Type of the operation return value.
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

/**
 * @deprecated Since 3.3.0. Use {@link OperationRequestBuilder} instead.
 */
export class BoundFunctionImportRequestBuilder<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  ParametersT,
  ReturnT
> extends BoundOperationRequestBuilder<
  EntityT,
  DeSerializersT,
  ParametersT,
  ReturnT
> {
  constructor(
    entityApi: EntityApi<EntityT, DeSerializersT>,
    entity: EntityT,
    operationName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: OperationParameters<ParametersT>,
    deSerializers: DeSerializersT
  ) {
    super(
      entityApi,
      entity,
      operationName,
      responseTransformer,
      parameters,
      deSerializers,
      'function'
    );
  }
}

/**
 * @deprecated Since 3.3.0. Use {@link OperationRequestBuilder} instead.
 */
export class BoundActionImportRequestBuilder<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  ParametersT,
  ReturnT
> extends BoundOperationRequestBuilder<
  EntityT,
  DeSerializersT,
  ParametersT,
  ReturnT
> {
  constructor(
    entityApi: EntityApi<EntityT, DeSerializersT>,
    entity: EntityT,
    operationName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: OperationParameters<ParametersT>,
    deSerializers: DeSerializersT
  ) {
    super(
      entityApi,
      entity,
      operationName,
      responseTransformer,
      parameters,
      deSerializers,
      'action'
    );
  }
}
