import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import {
  Constructable,
  EntityIdentifiable,
  Filterable,
  GetAllRequestBuilder,
  and,
  ODataGetAllRequestConfig
} from '../../odata-common';
import { EntityV2 } from '../entity';
import { entityDeserializerV2 } from '../entity-deserializer';
import { oDataUriV2 } from '../uri-conversion';
import { responseDataAccessorV2 } from './response-data-accessor';
export class GetAllRequestBuilderV2<EntityT extends EntityV2>
  extends GetAllRequestBuilder<EntityT>
  implements EntityIdentifiable<EntityT> {
  /**
   * Creates an instance of GetAllRequestBuilder.
   *
   * @param entityConstructor - Constructor of the entity to create the request for
   */
  constructor(entityConstructor: Constructable<EntityT>) {
    super(
      entityConstructor,
      new ODataGetAllRequestConfig(entityConstructor, oDataUriV2),
      entityDeserializerV2,
      responseDataAccessorV2
    );
  }

  /**
   * Add filter statements to the request.
   *
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

export { GetAllRequestBuilderV2 as GetAllRequestBuilder };
