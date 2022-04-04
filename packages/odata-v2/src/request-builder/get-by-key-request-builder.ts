import {
  EntityApi,
  EntityIdentifiable,
  GetByKeyRequestBuilderBase
} from '@sap-cloud-sdk/odata-common/internal';
import {
  DefaultDeSerializers,
  DeSerializers,
  entityDeserializer
} from '../de-serializers';
import { Entity } from '../entity';
import { createODataUri } from '../uri-conversion';
import { responseDataAccessor } from './response-data-accessor';
import { DestinationOrFetchOptions } from '@sap-cloud-sdk/connectivity';
import { ErrorWithCause } from '@sap-cloud-sdk/util';
var memwatch = require('node-memwatch-new');

/**
 * Create an OData request to get a single entity based on its key properties.
 * The properties available in the response can be restricted by creating a [[GetAllRequestBuilder.select selection]], where no selection is equal to selecting all fields.
 * Note that navigational properties are automatically expanded if they included in a  select.
 * @typeparam EntityT - Type of the entity to be requested.
 */
export class GetByKeyRequestBuilder<
    EntityT extends Entity,
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >
  extends GetByKeyRequestBuilderBase<EntityT, DeSerializersT>
  implements EntityIdentifiable<EntityT, DeSerializersT>
{
  readonly _entity: EntityT;

  /**
   * Creates an instance of GetByKeyRequestBuilder.
   * @param entityApi - Entity API for building and executing the request.
   * @param keys - Key-value pairs where the key is the name of a key property of the given entity and the value is the respective value.
   */
  constructor(
    entityApi: EntityApi<EntityT, DeSerializersT>,
    keys: Record<string, any>
  ) {
    super(
      entityApi,
      keys,
      createODataUri(entityApi.deSerializers),
      entityDeserializer(entityApi.deSerializers),
      responseDataAccessor
    );
  }

  async execute(destination: DestinationOrFetchOptions): Promise<EntityT> {
    return this.executeRaw(destination)
      .then(response => {
          // execute test 1
          // var hd = new memwatch.HeapDiff();
          const ret =  this.entityDeserializer.deserializeEntity(
            this.dataAccessor.getSingleResult(response.data),
            this._entityApi,
            response.headers
          )
          // var diff = hd.end();
          // console.log(diff);
          return ret;
        }
      )
      .catch(error => {
        throw new ErrorWithCause('OData get by key request failed!', error);
      });
  }
}
