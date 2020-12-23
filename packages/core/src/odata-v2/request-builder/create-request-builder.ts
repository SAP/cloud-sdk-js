import {
  Constructable,
  EntityIdentifiable,
  CreateRequestBuilder as CreateRequestBuilderBase
} from '../../odata-common';
import { EntityV2 } from '../entity';
import { entityDeserializerV2 } from '../entity-deserializer';
import { entitySerializerV2 } from '../entity-serializer';
import { oDataUriV2 } from '../uri-conversion';
import { responseDataAccessorV2 } from './response-data-accessor';
/**
 * Create OData request to create an entity.
 *
 * @typeparam EntityT - Type of the entity to be created
 */
export class CreateRequestBuilderV2<EntityT extends EntityV2>
  extends CreateRequestBuilderBase<EntityT>
  implements EntityIdentifiable<EntityT> {
  /**
   * Creates an instance of CreateRequestBuilder.
   *
   * @param _entityConstructor - Constructor type of the entity to be created
   * @param _entity - Entity to be created
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _entity: EntityT
  ) {
    super(
      _entityConstructor,
      _entity,
      oDataUriV2,
      entitySerializerV2,
      entityDeserializerV2,
      responseDataAccessorV2
    );
  }
}

export { CreateRequestBuilderV2 as CreateRequestBuilder };
