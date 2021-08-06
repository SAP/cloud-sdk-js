import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import {
  Constructable,
  EntityIdentifiable,
  Filterable,
  GetAllRequestBuilder as GetAllRequestBuilderBase,
  and,
  ODataGetAllRequestConfig
} from '../../odata-common';
import { Entity } from '../entity';
import { entityDeserializer } from '../entity-deserializer';
import { oDataUri } from '../uri-conversion';
import { responseDataAccessor } from './response-data-accessor';
export class GetAllRequestBuilder<EntityT extends Entity>
  extends GetAllRequestBuilderBase<EntityT>
  implements EntityIdentifiable<EntityT>
{
  /**
   * Creates an instance of GetAllRequestBuilder.
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

  /**
   * Add filter statements to the request.
   * @param expressions - Filter expressions to restrict the response
   * @returns The request builder itself, to facilitate method chaining
   */
  filter(expressions: Filterable<EntityT>[]): this;
  filter(...expressions: Filterable<EntityT>[]): this;
  filter(
    first: undefined | Filterable<EntityT> | Filterable<EntityT>[],
    ...rest: Filterable<EntityT>[]
  ): this {
    this.requestConfig.filter = and(variadicArgumentToArray(first, rest));
    return this;
  }
}

export { GetAllRequestBuilder as GetAllRequestBuilderV2 };
