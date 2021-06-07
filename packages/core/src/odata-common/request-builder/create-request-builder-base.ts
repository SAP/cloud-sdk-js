import { ErrorWithCause } from '@sap-cloud-sdk/util';
import {
  DestinationOptions,
  Destination,
  DestinationNameAndJwt
} from '../../connectivity/scp-cf';
import { ODataCreateRequestConfig } from '../request';
import { HttpResponse } from '../../http-client';
import { MethodRequestBuilder } from './request-builder-base';
import type { EntitySerializer } from '../entity-serializer';
import type { ODataUri } from '../uri-conversion/odata-uri';
import type { Constructable, Entity, EntityIdentifiable } from '../entity';
import type { EntityDeserializer } from '../entity-deserializer';
import type { ResponseDataAccessor } from '../response-data-accessor';
import type { Link } from '../selectable';

/**
 * Abstract create request class holding the parts shared in OData v2 and v4.
 *
 * @typeparam EntityT - Type of the entity to be created
 */
export abstract class CreateRequestBuilder<EntityT extends Entity>
  extends MethodRequestBuilder<ODataCreateRequestConfig<EntityT>>
  implements EntityIdentifiable<EntityT>
{
  /**
   * Creates an instance of CreateRequestBuilder.
   *
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
   *
   * @param parentEntity - Parent of the entity to create
   * @param linkField - Static representation of the navigation property that navigates from the parent entity to the child entity
   * @returns The entity itself, to facilitate method chaining
   */
  asChildOf<ParentEntityT extends Entity>(
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
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to the created entity
   */
  async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<EntityT> {
    return this.executeRaw(destination, options)
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
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to an [[HttpResponse]].
   */
  async executeRaw(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<HttpResponse> {
    return this.build(destination, options).then(request => request.execute());
  }
}

export { CreateRequestBuilder as CreateRequestBuilderBase };
