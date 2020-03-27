/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { errorWithCause } from '@sap-cloud-sdk/util';
import { Constructable } from '../constructable';
import { Entity, EntityIdentifiable } from '../entity';
import { deserializeEntity } from '../entity-deserializer';
import { serializeEntity } from '../entity-serializer';
import { DestinationOptions } from '../scp-cf';
import {
  Destination,
  DestinationNameAndJwt
} from '../scp-cf/destination-service-types';
import { Link } from '../selectable';
import { MethodRequestBuilderBase } from './request-builder-base';
import { getEntityKeys } from './request/get-keys';
import { ODataCreateRequestConfig } from './request/odata-create-request-config';

/**
 * Create OData request to create an entity.
 *
 * @typeparam EntityT - Type of the entity to be created
 */
export class CreateRequestBuilder<EntityT extends Entity>
  extends MethodRequestBuilderBase<ODataCreateRequestConfig<EntityT>>
  implements EntityIdentifiable<EntityT> {
  /**
   * Creates an instance of CreateRequestBuilder.
   *
   * @param _entityConstructor - Constructor type of the entity to be created
   * @param entity - Entity to be created
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    readonly entity: EntityT
  ) {
    super(new ODataCreateRequestConfig(_entityConstructor));
  }

  /**
   * Builds the payload of the query.
   *
   * @returns the builder itself
   */
  prepare(): this {
    this.requestConfig.payload = serializeEntity(
      this.entity,
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
    this.requestConfig.parentKeys = getEntityKeys(
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
    this.prepare();
    return this.build(destination, options)
      .then(request => request.execute())
      .then(response =>
        deserializeEntity(
          response.data.d,
          this._entityConstructor,
          response.headers
        )
      )
      .catch(error =>
        Promise.reject(errorWithCause('Create request failed!', error))
      );
  }
}
