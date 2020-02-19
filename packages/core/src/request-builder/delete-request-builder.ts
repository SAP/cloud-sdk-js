/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { errorWithCause, MapType } from '@sap-cloud-sdk/util';
import { Constructable } from '../constructable';
import { Entity, EntityIdentifiable } from '../entity';
import { DestinationOptions } from '../scp-cf';
import { Destination, DestinationNameAndJwt } from '../scp-cf/destination-service-types';
import { FieldType } from '../selectable/field';
import { MethodRequestBuilderBase } from './request-builder-base';
import { getEntityKeys } from './request/get-keys';
import { ODataDeleteRequestConfig } from './request/odata-delete-request-config';

/**
 * Create OData query to delete an entity.
 *
 * @typeparam EntityT Type of the entity to be deleted
 */
export class DeleteRequestBuilder<EntityT extends Entity> extends MethodRequestBuilderBase<ODataDeleteRequestConfig<EntityT>>
  implements EntityIdentifiable<EntityT> {
  readonly _entityConstructor: Constructable<EntityT>;

  /**
   * Creates an instance of DeleteRequestBuilder. If the entity is passed, version identifier will also be added.
   *
   * @param entityConstructor Constructor type of the entity to be deleted
   * @param keysOrEntity Entity or Key-value pairs of key properties for the given entity
   */
  constructor(entityConstructor: Constructable<EntityT>, keysOrEntity: MapType<FieldType> | Entity) {
    super(new ODataDeleteRequestConfig(entityConstructor));
    this._entityConstructor = entityConstructor;

    if (keysOrEntity instanceof Entity) {
      this.requestConfig.keys = getEntityKeys(keysOrEntity, entityConstructor);
      this.setVersionIdentifier(keysOrEntity.versionIdentifier);
    } else {
      this.requestConfig.keys = keysOrEntity;
    }
  }

  /**
   * Add ETag version identifier in the delete request header.
   *
   * @param etag The version identifier of the entity
   * @returns {this} The builder itself, to facilitate method chaining
   */
  setVersionIdentifier(etag: string): this {
    if (etag) {
      this.requestConfig.addCustomHeaders({ 'if-match': etag });
    }
    return this;
  }

  /**
   * Instructs the request to force an overwrite of the entity by sending an 'If-Match: *' header instead of sending the ETag version identifier.
   *
   * @returns {this} this The request itself to ease chaining while executing the request
   */
  ignoreVersionIdentifier(): this {
    this.requestConfig.versionIdentifierIgnored = true;
    return this;
  }

  /**
   * Execute query.
   *
   * @param destination Destination to execute the request against
   * @param options Options to employ when fetching destinations
   * @returns A promise resolving once the entity was deleted
   */
  async execute(destination: Destination | DestinationNameAndJwt, options?: DestinationOptions): Promise<void> {
    return this.build(destination, options)
      .then(request => request.execute())
      .then(() => Promise.resolve())
      .catch(error => Promise.reject(errorWithCause('OData delete request failed!', error)));
  }
}
