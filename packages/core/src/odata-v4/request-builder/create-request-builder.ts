import {
  Constructable,
  CreateRequestBuilder as CreateRequestBuilderBase,
  EntityIdentifiable
} from '../../odata-common';
import { Entity } from '../entity';
import { oDataUri } from '../uri-conversion';
import { entitySerializer } from '../entity-serializer';
import { entityDeserializer } from '../entity-deserializer';
import { responseDataAccessorV4 } from './response-data-accessor';
/**
 * Create OData request to create an entity.
 *
 * @typeparam EntityT - Type of the entity to be created
 */
export class CreateRequestBuilderV4<EntityT extends Entity>
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
      oDataUri,
      entitySerializer,
      entityDeserializer,
      responseDataAccessorV4
    );
  }
}
