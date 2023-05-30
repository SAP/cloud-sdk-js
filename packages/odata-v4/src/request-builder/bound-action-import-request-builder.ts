import {
  ActionFunctionImportRequestBuilderBase,
  EntityApi,
  EntityBase,
  OperationParameters
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import {
  ODataBoundActionImportRequestConfig
} from '../request';
import { createODataUri } from '../uri-conversion';

export class BoundActionImportRequestBuilder<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  ParametersT,
  ReturnT
> extends ActionFunctionImportRequestBuilderBase<
  DeSerializersT,
  ReturnT,
  ODataBoundActionImportRequestConfig<EntityT, DeSerializersT, ParametersT>
> {
  constructor(
    entityApi: EntityApi<EntityT, DeSerializersT>,
    entity: EntityT,
    actionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: OperationParameters<ParametersT>,
    deSerializers: DeSerializersT
  ) {
    super(
      responseTransformer,
      new ODataBoundActionImportRequestConfig(
        'get',
        entityApi,
        actionImportName,
        parameters,
        createODataUri(deSerializers)
      ),
      deSerializers
    );

    this.requestConfig.keys = this.requestConfig.oDataUri.getEntityKeys(
      entity,
      entityApi
    );
  }
}
