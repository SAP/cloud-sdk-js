import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { Entity } from '../entity';
import { entityDeserializer } from '../entity-deserializer';
import {
  EntityIdentifiable,
  Constructable,
  Filterable,
  and,
  ODataGetAllRequestConfig,
  Expandable,
  GetAllRequestBuilder as GetAllRequestBuilderBase,
  toFilterableList
} from '../../odata-common';
import { oDataUri } from '../uri-conversion';
import { responseDataAccessor } from './response-data-accessor';
export class GetAllRequestBuilder<EntityT extends Entity>
  extends GetAllRequestBuilderBase<EntityT>
  implements EntityIdentifiable<EntityT>
{
  readonly _entity: EntityT;

  /**
   * Creates an instance of GetAllRequestBuilder.
   *
   * @param entityConstructor - Constructor of the entity to create the request for
   */
  constructor(entityConstructor: Constructable<EntityT>) {
    super(
      entityConstructor,
      new ODataGetAllRequestConfig(entityConstructor, oDataUri),
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

  // TODO: Reconsider the OneToManyLink here
  /**
   * Add filter statements to the request.
   *
   * @param expressions - Filter expressions to restrict the response
   * @returns The request builder itself, to facilitate method chaining
   */
  filter(...expressions: Filterable<EntityT>[]): this {
    this.requestConfig.filter = and(toFilterableList(expressions));
    return this;
  }
}

export { GetAllRequestBuilder as GetAllRequestBuilderV4 };
