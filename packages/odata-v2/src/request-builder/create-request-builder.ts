import {
  Constructable,
  EntityIdentifiable,
  CreateRequestBuilderBase
} from '@sap-cloud-sdk/odata-common/internal';
import { Entity } from '../entity';
import { entityDeserializer } from '../entity-deserializer';
import { entitySerializer } from '../entity-serializer';
import { oDataUri } from '../uri-conversion/odata-uri';
import { responseDataAccessor } from './response-data-accessor';
/**
 * Create OData request to create an entity.
 * @typeparam EntityT - Type of the entity to be created
 */
export class CreateRequestBuilder<EntityT extends Entity>
  extends CreateRequestBuilderBase<EntityT>
  implements EntityIdentifiable<EntityT>
{
  /**
   * Creates an instance of CreateRequestBuilder.
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
      responseDataAccessor
    );
  }
}
