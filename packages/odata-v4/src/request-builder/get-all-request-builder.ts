import {
  GetAllRequestBuilderBase,
  ODataGetAllRequestConfig,
  toFilterableList,
  and
} from '@sap-cloud-sdk/odata-common/internal';
import { transformVariadicArgumentToArray } from '@sap-cloud-sdk/util';
import { entityDeserializer } from '../de-serializers';
import { createODataUri } from '../uri-conversion';
import { responseDataAccessor } from './response-data-accessor';
import type { DefaultDeSerializers, DeSerializers } from '../de-serializers';
import type { Entity } from '../entity';
import type {
  EntityIdentifiable,
  Filterable,
  Expandable,
  EntityApi,
  EntityBase
} from '@sap-cloud-sdk/odata-common/internal';

export class GetAllRequestBuilder<
    EntityT extends Entity,
    DeSerializersT extends DeSerializers = DefaultDeSerializers
  >
  extends GetAllRequestBuilderBase<EntityT, DeSerializersT>
  implements EntityIdentifiable<EntityT, DeSerializersT>
{
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

  expand(
    expands: Expandable<
      EntityT,
      DeSerializersT,
      EntityApi<EntityBase, DeSerializersT>
    >[]
  ): this;
  expand(
    ...expands: Expandable<
      EntityT,
      DeSerializersT,
      EntityApi<EntityBase, DeSerializersT>
    >[]
  ): this;
  expand(
    first:
      | undefined
      | Expandable<
          EntityT,
          DeSerializersT,
          EntityApi<EntityBase, DeSerializersT>
        >
      | Expandable<
          EntityT,
          DeSerializersT,
          EntityApi<EntityBase, DeSerializersT>
        >[],
    ...rest: Expandable<
      EntityT,
      DeSerializersT,
      EntityApi<EntityBase, DeSerializersT>
    >[]
  ): this {
    this.requestConfig.expands = transformVariadicArgumentToArray(first, rest);
    return this;
  }

  // TODO: Reconsider the OneToManyLink here
  /**
   * Add filter statements to the request.
   * @param expressions - Filter expressions to restrict the response.
   * @returns The request builder itself, to facilitate method chaining.
   */
  filter(...expressions: Filterable<EntityT, DeSerializersT>[]): this {
    this.requestConfig.filter = and(toFilterableList(expressions)) as any;
    return this;
  }
}
