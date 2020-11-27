import {
  Constructable,
  EntityIdentifiable,
  FieldType,
  GetByKeyRequestBuilderBase
} from '../../odata-common';
import { EntityV2 } from '../entity';
import { entityDeserializerV2 } from '../entity-deserializer';
import { oDataUriV2 } from '../uri-conversion';
import { responseDataAccessorV2 } from './response-data-accessor';
/**
 * Create an OData request to get a single entity based on its key properties.
 * The properties available in the response can be restricted by creating a [[GetAllRequestBuilderV2.select selection]], where no selection is equal to selecting all fields.
 * Note that navigational properties are automatically expanded if they included in a  select.
 *
 * @typeparam EntityT - Type of the entity to be requested
 */
export class GetByKeyRequestBuilderV2<EntityT extends EntityV2>
  extends GetByKeyRequestBuilderBase<EntityT>
  implements EntityIdentifiable<EntityT> {
  readonly _entity: EntityT;

  /**
   * Creates an instance of GetByKeyRequestBuilder.
   *
   * @param _entityConstructor - Constructor of the entity to create the request for
   * @param keys - Key-value pairs where the key is the name of a key property of the given entity and the value is the respective value
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    keys: Record<string, FieldType>
  ) {
    super(
      _entityConstructor,
      keys,
      oDataUriV2,
      entityDeserializerV2,
      responseDataAccessorV2
    );
  }
}

export { GetByKeyRequestBuilderV2 as GetByKeyRequestBuilder };
