import {
  EntityIdentifiable,
  GetAllRequestBuilderBase,
  ODataGetAllRequestConfig,
  Filterable,
  EntityApi,
  and, EntityBase
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

  /**
   * Add filter statements to the request.
   * @param expressions - Filter expressions to restrict the response
   * @returns The request builder itself, to facilitate method chaining
   */
  filter(expressions: Filterable<EntityT, DeSerializersT,EntityApi<EntityBase,DeSerializersT>>[]): this;
  filter(...expressions: Filterable<EntityT, DeSerializersT,EntityApi<EntityBase,DeSerializersT>>[]): this;
  filter(
    first:
      | undefined
      | Filterable<EntityT, DeSerializersT,EntityApi<EntityBase,DeSerializersT>>
      | Filterable<EntityT, DeSerializersT,EntityApi<EntityBase,DeSerializersT>>[],
    ...rest: Filterable<EntityT, DeSerializersT,EntityApi<EntityBase,DeSerializersT>>[]
  ): this {
    this.requestConfig.filter = and(variadicArgumentToArray(first, rest));
    return this;
  }
}
