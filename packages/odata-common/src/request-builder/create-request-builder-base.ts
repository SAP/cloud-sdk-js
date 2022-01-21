import { ErrorWithCause } from '@sap-cloud-sdk/util';
import {
  Destination,
  DestinationFetchOptions
} from '@sap-cloud-sdk/connectivity';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import type { EntitySerializer } from '../entity-serializer';
import type { ODataUri } from '../uri-conversion';
import type { EntityBase, EntityIdentifiable } from '../entity-base';
import type { EntityDeserializer } from '../entity-deserializer';
import type { ResponseDataAccessor } from '../response-data-accessor';
import { ODataCreateRequestConfig } from '../request';
import { Link } from '../selectable';
import { DeSerializers } from '../de-serializers';
import { MethodRequestBuilder } from './request-builder-base';
import {EntityApi} from "../entity-api";

/**
 * Abstract create request class holding the parts shared in OData v2 and v4.
 * @typeparam EntityT - Type of the entity to be created
 * @internal
 */
export abstract class CreateRequestBuilderBase<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers
  >
  extends MethodRequestBuilder<
    ODataCreateRequestConfig<EntityT, DeSerializersT>
  >
  implements EntityIdentifiable<EntityT, DeSerializersT>
{
  readonly _deSerializers: DeSerializersT;

  /**
   * Creates an instance of CreateRequestBuilder.
   * @param _entityApi - Entity API for building and executing the request.
   * @param _entity - Entity to be created.
   * @param oDataUri - URI conversion functions.
   * @param serializer - Entity serializer.
   * @param deserializer - Entity deserializer.
   * @param responseDataAccessor - Object access functions for get requests.
   */
  constructor(
    readonly _entityApi: EntityApi<EntityT, DeSerializersT>,
    readonly _entity: EntityT,
    readonly oDataUri: ODataUri<DeSerializersT>,
    readonly serializer: EntitySerializer,
    readonly deserializer: EntityDeserializer,
    readonly responseDataAccessor: ResponseDataAccessor
  ) {
    super(new ODataCreateRequestConfig(_entityApi, oDataUri));
    this.requestConfig.payload = serializer.serializeEntity(
      this._entity,
      this._entityApi
    );
  }

  get entity(): EntityT {
    return this._entity;
  }

  /**
   * Specifies the parent of the entity to create.
   * @param parentEntity - Parent of the entity to create
   * @param linkField - Static representation of the navigation property that navigates from the parent entity to the child entity
   * @returns The entity itself, to facilitate method chaining
   */
  asChildOf<ParentEntityT extends EntityBase>(
    parentEntity: ParentEntityT,
    linkField: Link<ParentEntityT, DeSerializersT, EntityApi<EntityT, any>>
  ): this {
    this.requestConfig.parentKeys = this.oDataUri.getEntityKeys(
      parentEntity,
      linkField._entityApi
    );
    this.requestConfig.childField = linkField;
    return this;
  }

  /**
   * Execute query.
   * @param destination - Destination or DestinationFetchOptions to execute the request against
   * @returns A promise resolving to the created entity
   */
  async execute(
    destination: Destination | DestinationFetchOptions
  ): Promise<EntityT> {
    return this.executeRaw(destination)
      .then(response =>
        this.deserializer.deserializeEntity(
          this.responseDataAccessor.getSingleResult(response.data),
          this._entityApi,
          response.headers
        )
      )
      .catch(error => {
        throw new ErrorWithCause('Create request failed!', error);
      });
  }

  /**
   * Execute request and return an [[HttpResponse]].
   * @param destination - Destination or DestinationFetchOptions to execute the request against
   * @returns A promise resolving to an [[HttpResponse]].
   */
  async executeRaw(
    destination: Destination | DestinationFetchOptions
  ): Promise<HttpResponse> {
    return this.build(destination).then(request => request.execute());
  }
}
