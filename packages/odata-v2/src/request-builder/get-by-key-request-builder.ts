import {
  Constructable,
  EntityIdentifiable,
  FieldType,
  GetByKeyRequestBuilderBase
} from '@sap-cloud-sdk/odata-common/internal';
import { Entity } from '../entity';
import { entityDeserializer } from '../entity-deserializer';
import { oDataUri } from '../uri-conversion/odata-uri';
import { responseDataAccessor } from './response-data-accessor';

/**
 * Create an OData request to get a single entity based on its key properties.
 * The properties available in the response can be restricted by creating a [[GetAllRequestBuilder.select selection]], where no selection is equal to selecting all fields.
 * Note that navigational properties are automatically expanded if they included in a  select.
 * @typeparam EntityT - Type of the entity to be requested
 */
export class GetByKeyRequestBuilder<EntityT extends Entity>
  extends GetByKeyRequestBuilderBase<EntityT>
  implements EntityIdentifiable<EntityT>
{
  readonly _entity: EntityT;

  /**
   * Creates an instance of GetByKeyRequestBuilder.
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
      oDataUri,
      entityDeserializer,
      responseDataAccessor
    );
  }
}
