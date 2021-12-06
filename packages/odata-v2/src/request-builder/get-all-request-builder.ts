import {
  EntityIdentifiable,
  GetAllRequestBuilderBase,
  ODataGetAllRequestConfig,
  entityDeserializer,
  Filterable,
  EntityApi,
  and
} from '@sap-cloud-sdk/odata-common/internal';
import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { Entity } from '../entity';
import { extractODataEtag } from '../extract-odata-etag';
import { DeSerializers } from '../de-serializers';
import { createODataUriV2 } from '../uri-conversion';
import {
  getLinkedCollectionResult,
  responseDataAccessor
} from './response-data-accessor';

export class GetAllRequestBuilder<
    EntityT extends Entity,
    DeSerializersT extends DeSerializers
  >
  extends GetAllRequestBuilderBase<EntityT, DeSerializersT>
  implements EntityIdentifiable<EntityT, DeSerializersT>
{
  /**
   * Creates an instance of GetAllRequestBuilder.
   * @param entityApi - Constructor of the entity to create the request for, the (de-)serializers, and the schema.
   */
  constructor({
    entityConstructor,
    deSerializers,
    schema
  }: EntityApi<EntityT, DeSerializersT>) {
    super(
      entityConstructor,
      new ODataGetAllRequestConfig(
        entityConstructor,
        schema,
        createODataUriV2(deSerializers)
      ),
      entityDeserializer(
        deSerializers,
        schema,
        extractODataEtag,
        getLinkedCollectionResult
      ),
      responseDataAccessor
    );
  }

  /**
   * Add filter statements to the request.
   * @param expressions - Filter expressions to restrict the response
   * @returns The request builder itself, to facilitate method chaining
   */
  filter(expressions: Filterable<EntityT, DeSerializersT>[]): this;
  filter(...expressions: Filterable<EntityT, DeSerializersT>[]): this;
  filter(
    first:
      | undefined
      | Filterable<EntityT, DeSerializersT>
      | Filterable<EntityT, DeSerializersT>[],
    ...rest: Filterable<EntityT, DeSerializersT>[]
  ): this {
    this.requestConfig.filter = and(variadicArgumentToArray(first, rest));
    return this;
  }
}
