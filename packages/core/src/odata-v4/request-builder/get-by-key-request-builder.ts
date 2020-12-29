import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import {
  Constructable,
  EntityIdentifiable,
  FieldType,
  Expandable,
  GetByKeyRequestBuilder as GetByKeyRequestBuilderBase
} from '../../odata-common';
import { EntityV4 } from '../entity';
import { entityDeserializerV4 } from '../entity-deserializer';
import { oDataUriV4 } from '../uri-conversion';
import { responseDataAccessorV4 } from './response-data-accessor';
/**
 * Create an OData request to get a single entity based on its key properties.
 * The properties available in the response can be restricted by creating a [[GetByKeyRequestBuilderV4.select selection]], where no selection is equal to selecting all fields of the entity.
 * Navigational properties need to expanded explicitly by [[GetAllRequestBuilderV4.expand]].
 * where no selection is equal to selecting all fields.
 *
 * @typeparam EntityT - Type of the entity to be requested
 */
export class GetByKeyRequestBuilderV4<EntityT extends EntityV4>
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
      oDataUriV4,
      entityDeserializerV4,
      responseDataAccessorV4
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
