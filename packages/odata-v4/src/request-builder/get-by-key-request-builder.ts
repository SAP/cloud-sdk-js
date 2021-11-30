import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import {
  Constructable,
  EntityIdentifiable,
  Expandable,
  GetByKeyRequestBuilderBase,
  FieldType
} from '@sap-cloud-sdk/odata-common/internal';
import { Entity } from '../entity';
import { entityDeserializer } from '../entity-deserializer';
import { oDataUri } from '../uri-conversion';
import { responseDataAccessor } from './response-data-accessor';
/**
 * Create an OData request to get a single entity based on its key properties.
 * The properties available in the response can be restricted by creating a [[GetByKeyRequestBuilderV4.select selection]], where no selection is equal to selecting all fields of the entity.
 * Navigational properties need to expanded explicitly by [[GetAllRequestBuilderV4.expand]].
 * where no selection is equal to selecting all fields.
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

  expand(expands: Expandable<EntityT>[]): this;
  expand(...expands: Expandable<EntityT>[]): this;
  expand(
    first: undefined | Expandable<EntityT> | Expandable<EntityT>[],
    ...rest: Expandable<EntityT>[]
  ): this {
    this.requestConfig.expands = variadicArgumentToArray(first, rest);
    return this;
  }
}
