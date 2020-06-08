/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { errorWithCause, MapType } from '@sap-cloud-sdk/util';
import { Constructable, EntityIdentifiable, Link } from '../../common';
import { MethodRequestBuilderBase } from '../../common/request-builder/request-builder-base';
import { ODataCreateRequestConfig } from '../../common/request/odata-create-request-config';
import { Entity } from '../entity';
import { deserializeEntity } from '../entity-deserializer';
import { serializeEntity } from '../entity-serializer';
import { DestinationOptions } from '../../../scp-cf';
import {
  Destination,
  DestinationNameAndJwt
} from '../../../scp-cf/destination-service-types';
import { oDataUri } from '../uri-conversion';
import { HttpReponse } from '../../../http-client';
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
   * @param _entity - Entity to be created
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _entity: EntityT
  ) {
    super(new ODataCreateRequestConfig(_entityConstructor, oDataUri));
  }

  get entity(): EntityT {
    return this._entity;
  }

  /**
   * Builds the payload of the query.
   *
   * @returns the builder itself
   */
  prepare(): this {
    this.requestConfig.payload = serializeEntity(
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
    this.requestConfig.parentKeys = oDataUri.getEntityKeys(
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
          extractData(response),
          this._entityConstructor,
          response.headers
        )
      )
      .catch(error =>
        Promise.reject(errorWithCause('Create request failed!', error))
      );
  }
}

function extractData(response: HttpReponse): MapType<any> {
  return response.data;
}
