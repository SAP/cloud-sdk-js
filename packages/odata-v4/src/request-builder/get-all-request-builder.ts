import {
  EntityIdentifiable,
  GetAllRequestBuilderBase,
  ODataGetAllRequestConfig,
  Filterable,
  Expandable,
  EntityApi,
  toFilterableList,
  and
} from '@sap-cloud-sdk/odata-common/internal';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { Entity } from '../entity';
import { DeSerializers, entityDeserializer } from '../de-serializers';
import { createODataUri } from '../uri-conversion';
import { responseDataAccessor } from './response-data-accessor';

export class GetAllRequestBuilder<
    EntityT extends Entity,
    DeSerializersT extends DeSerializers
  >
  extends GetAllRequestBuilderBase<EntityT, DeSerializersT>
  implements EntityIdentifiable<EntityT, DeSerializersT>
{
  readonly _entity: EntityT;

  /**
   * Creates an instance of GetAllRequestBuilder.
   * @param entityApi - Entity API for building and executing the request.
   */
  constructor(entityApi: EntityApi<EntityT, DeSerializersT>) {
    super(
      entityApi,
      new ODataGetAllRequestConfig(
        entityApi,
        createODataUri(entityApi.deSerializers)
      ),
      entityDeserializer(entityApi.deSerializers),
      responseDataAccessor
    );
  }

  expand(expands: Expandable<EntityT, DeSerializersT>[]): this;
  expand(...expands: Expandable<EntityT, DeSerializersT>[]): this;
  expand(
    first:
      | undefined
      | Expandable<EntityT, DeSerializersT>
      | Expandable<EntityT, DeSerializersT>[],
    ...rest: Expandable<EntityT, DeSerializersT>[]
  ): this {
    this.requestConfig.expands = variadicArgumentToArray(first, rest);
    return this;
  }

  // TODO: Reconsider the OneToManyLink here
  /**
   * Add filter statements to the request.
   * @param expressions - Filter expressions to restrict the response
   * @returns The request builder itself, to facilitate method chaining
   */
  filter(...expressions: Filterable<EntityT, DeSerializersT>[]): this {
    this.requestConfig.filter = and(toFilterableList(expressions)) as any;
    return this;
  }
}
