import { ErrorWithCause } from '@sap-cloud-sdk/util';
import {
  Destination,
  DestinationFetchOptions
} from '@sap-cloud-sdk/connectivity';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import type { EntitySerializer } from '../entity-serializer';
import type { ODataUri } from '../uri-conversion/odata-uri';
import type {
  Constructable,
  EntityBase,
  EntityIdentifiable
} from '../entity-base';
import type { EntityDeserializer } from '../entity-deserializer';
import type { ResponseDataAccessor } from '../response-data-accessor';
import { ODataCreateRequestConfig } from '../request/odata-create-request-config';
import { Link } from '../selectable/link';
import { MethodRequestBuilder } from './request-builder-base';

/**
 * Abstract create request class holding the parts shared in OData v2 and v4.
 * @typeparam EntityT - Type of the entity to be created
 */
export abstract class CreateRequestBuilderBase<EntityT extends EntityBase>
  extends MethodRequestBuilder<ODataCreateRequestConfig<EntityT>>
  implements EntityIdentifiable<EntityT>
{
  /**
   * Creates an instance of CreateRequestBuilder.
   * @param _entityConstructor - Constructor type of the entity to be created
   * @param _entity - Entity to be created
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _entity: EntityT,
    readonly odataUri: ODataUri,
    readonly serializer: EntitySerializer,
    readonly deserializer: EntityDeserializer,
    readonly responseDataAccessor: ResponseDataAccessor
  ) {
    super(new ODataCreateRequestConfig(_entityConstructor, odataUri));
    this.requestConfig.payload = serializer.serializeEntity(
      this._entity,
      this._entityConstructor
    );
  }

  get entity(): EntityT {
    return this._entity;
  }

  /**
   * @deprecated Since v1.29.0. This method should never be called, it has severe side effects.   * Builds the payload of the query.
   * @returns the builder itself
   */
  prepare(): this {
    this.requestConfig.payload = this.serializer.serializeEntity(
      this._entity,
      this._entityConstructor
    );
    return this;
  }

  /**
   * Specifies the parent of the entity to create.
   * @param parentEntity - Parent of the entity to create
   * @param linkField - Static representation of the navigation property that navigates from the parent entity to the child entity
   * @returns The entity itself, to facilitate method chaining
   */
  asChildOf<ParentEntityT extends EntityBase>(
    parentEntity: ParentEntityT,
    linkField: Link<ParentEntityT, EntityT>
  ): this {
    this.requestConfig.parentKeys = this.odataUri.getEntityKeys(
      parentEntity,
      linkField._entityConstructor
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
          this._entityConstructor,
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
