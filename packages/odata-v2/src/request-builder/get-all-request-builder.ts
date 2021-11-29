import {
  EntityIdentifiable,
  GetAllRequestBuilderBase,
  ODataGetAllRequestConfig,
  entityDeserializer,
  Filterable,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
import { Entity } from '../entity';
import { edmToTs } from '../de-serializers/payload-value-converter';
import { extractODataEtag } from '../extract-odata-etag';
import { DefaultDeSerializers, DeSerializers } from '../de-serializers';
import { createODataUri } from '../uri-conversion';
import {
  getLinkedCollectionResult,
  responseDataAccessor
} from './response-data-accessor';

export class GetAllRequestBuilder<
    EntityT extends Entity,
    T extends DeSerializers = DefaultDeSerializers
  >
  extends GetAllRequestBuilderBase<EntityT>
  implements EntityIdentifiable<EntityT>
{
  /**
   * Creates an instance of GetAllRequestBuilder.
   * @param entityApi - Constructor of the entity to create the request for, the (de-)serializers, and the schema.
   */
  constructor({
    entityConstructor,
    deSerializers,
    schema
  }: EntityApi<EntityT, T>) {
    super(
      entityConstructor,
      new ODataGetAllRequestConfig(
        entityConstructor,
        createODataUri(deSerializers)
      ),
      entityDeserializer(
        schema,
        edmToTs,
        extractODataEtag,
        getLinkedCollectionResult,
        deSerializers
      ),
      responseDataAccessor
    );
  }

  /**
   * Add filter statements to the request.
   * @param expressions - Filter expressions to restrict the response
   * @returns The request builder itself, to facilitate method chaining
   */
  // filter(expressions: Filterable<EntityT>[]): this;
  // filter(...expressions: Filterable<EntityT>[]): this;
  // filter(
  //   first: undefined | Filterable<EntityT> | Filterable<EntityT>[],
  //   ...rest: Filterable<EntityT>[]
  // ): this {
  //   this.requestConfig.filter = and(variadicArgumentToArray(first, rest));
  //   return this;
  // }

  filter(expressions: Filterable<EntityT>): this {
    this.requestConfig.filter = expressions;
    return this;
  }
}
