import {
  Constructable,
  CreateRequestBuilderBase,
  EntityIdentifiable
} from '../../odata-common';
import { EntityV4 } from '../entity';
import {
  DestinationOptions,
  Destination,
  DestinationNameAndJwt
} from '../../connectivity/scp-cf';
import { oDataUriV4 } from '../uri-conversion';
import { entitySerializerV4 } from '../entity-serializer';
import { entityDeserializerV4 } from '../entity-deserializer';
import { responseDataAccessorV4 } from './response-data-accessor';
/**
 * Create OData request to create an entity.
 *
 * @typeparam EntityT - Type of the entity to be created
 */
export class CreateRequestBuilderV4<EntityT extends EntityV4>
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
      oDataUriV4,
      entitySerializerV4,
      entityDeserializerV4,
      responseDataAccessorV4
    );
  }

  /**
   * @deprecated Since v1.29.0. This method should never be called, it has severe side effects.   * Builds the payload of the query.
   * @returns the builder itself
   */
  prepare(): this {
    this.requestConfig.payload = this.serializer.serializeEntity(
      this._entity,
      this._entityConstructor
    );
    return this;
  }

  /**
   * Execute query.
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to the created entity
   */
  async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<EntityT> {
    this.prepare();
    return super.execute(destination, options);
  }
}
