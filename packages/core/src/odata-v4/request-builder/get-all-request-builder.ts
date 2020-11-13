import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { EntityV4 } from '../entity';
import { entityDeserializerV4 } from '../entity-deserializer';
import {
  EntityIdentifiable,
  Constructable,
  Filterable,
  and,
  FilterList,
  ODataGetAllRequestConfig,
  Expandable,
  GetAllRequestBuilderBase,
  OneToManyLink
} from '../../odata-common';
import { oDataUriV4 } from '../uri-conversion';
export class GetAllRequestBuilderV4<EntityT extends EntityV4>
  extends GetAllRequestBuilderBase<EntityT>
  implements EntityIdentifiable<EntityT> {
  readonly _entity: EntityT;

  /**
   * Creates an instance of GetAllRequestBuilder.
   *
   * @param entityConstructor - Constructor of the entity to create the request for
   */
  constructor(entityConstructor: Constructable<EntityT>) {
    super(
      entityConstructor,
      new ODataGetAllRequestConfig(entityConstructor, oDataUriV4),
      entityDeserializerV4
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

  // TODO: Reconsider the OneToManyLink here
  /**
   * Add filter statements to the request.
   *
   * @param expressions - Filter expressions to restrict the response
   * @returns The request builder itself, to facilitate method chaining
   */
  filter(
    ...expressions: (Filterable<EntityT> | OneToManyLink<EntityT, any>)[]
  ): this {
    this.requestConfig.filter = toFilterList(expressions);
    return this;
  }
}

// TODO: remove this code duplication
function toFilterList<EntityT extends EntityV4, LinkedEntityT extends EntityV4>(
  filters: (Filterable<EntityT> | OneToManyLink<EntityT, LinkedEntityT>)[]
): FilterList<EntityT> {
  return and(
    ...filters.map(f => (f instanceof OneToManyLink ? f._filters : f))
  );
}
