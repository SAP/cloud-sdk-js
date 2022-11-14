import {
  ActionFunctionImportRequestBuilderBase,
  EntityApi,
  EntityBase,
  BatchReference,
  WithBatchReference
} from '@sap-cloud-sdk/odata-common/internal';
import { v4 as uuid } from 'uuid';
import { DeSerializers } from '../de-serializers';
import {
  ActionImportParameters,
  ODataBoundActionImportRequestConfig
} from '../request';
import { createODataUri } from '../uri-conversion';

export class BoundActionImportRequestBuilder<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers,
    ParametersT,
    ReturnT
  >
  extends ActionFunctionImportRequestBuilderBase<
    ReturnT,
    ODataBoundActionImportRequestConfig<EntityT, DeSerializersT, ParametersT>
  >
  implements WithBatchReference
{
  private _batchReference: BatchReference = { id: uuid() };
  constructor(
    entityApi: EntityApi<EntityT, DeSerializersT>,
    entity: EntityT,
    actionImportName: string,
    readonly responseTransformer: (data: any) => ReturnT,
    parameters: ActionImportParameters<ParametersT>,
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

  /**
   * Gets identifier for the batch request.
   * @returns Batch request identifier.
   */
  getBatchReference(): BatchReference {
    return this._batchReference;
  }

  /**
   * Sets user-defined identifier for the batch reference.
   * @param id - User-defined batch reuest identifier.
   */
  setBatchId(id: string): void {
    this._batchReference = { id };
  }
}
