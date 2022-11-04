import {
  ActionFunctionImportRequestBuilderBase,
  EntityApi,
  EntityBase,
  FunctionImportParameters // fixme(fwilhe): clarify if it is an issue to re-use this type or do we need a separate type for ActionImportParameter? Seems no issue so far.
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import { ODataBoundActionImportRequestConfig } from '../request';
import { createODataUri } from '../uri-conversion';

export class BoundActionImportRequestBuilder<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  ParametersT,
  ReturnT
> extends ActionFunctionImportRequestBuilderBase<
  ReturnT,
  ODataBoundActionImportRequestConfig<EntityT, DeSerializersT, ParametersT>
> {
  constructor(
    entityApi: EntityApi<EntityT, DeSerializersT>,
    entity: EntityT,
    actionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: FunctionImportParameters<ParametersT>,
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
      )
    );

    this.requestConfig.keys = this.requestConfig.oDataUri.getEntityKeys(
      entity,
      entityApi
    );
  }
}
