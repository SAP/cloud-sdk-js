import {
  ActionFunctionImportRequestBuilderBase,
  EntityApi,
  EntityBase,
  FunctionImportParameters
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import { OdataBoundFunctionImportRequestConfig } from '../request';
import { createODataUri } from '../uri-conversion';

export class BoundFunctionImportRequestBuilder<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  ParametersT,
  ReturnT
> extends ActionFunctionImportRequestBuilderBase<
  ReturnT,
  OdataBoundFunctionImportRequestConfig<EntityT, DeSerializersT, ParametersT>
> {
  constructor(
    entityApi: EntityApi<EntityT, DeSerializersT>,
    entity: EntityT,
    functionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: FunctionImportParameters<ParametersT>,
    deSerializers: DeSerializersT
  ) {
    super(
      responseTransformer,
      new OdataBoundFunctionImportRequestConfig(
        'get',
        entityApi,
        functionImportName,
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
