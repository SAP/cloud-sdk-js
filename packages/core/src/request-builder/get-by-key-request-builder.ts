/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { errorWithCause, MapType } from '@sap-cloud-sdk/util';
import { AxiosResponse } from 'axios';
import { Constructable } from '../constructable';
import { Entity, EntityIdentifiable } from '../entity';
import { deserializeEntity } from '../entity-deserializer';
import { DestinationOptions } from '../scp-cf';
import { Destination, DestinationNameAndJwt } from '../scp-cf/destination-service-types';
import { Selectable } from '../selectable';
import { FieldType } from '../selectable/field';
import { MethodRequestBuilderBase } from './request-builder-base';
import { ODataGetByKeyRequestConfig } from './request/odata-get-by-key-request-config';

/**
 * Create OData request to get a single entity based on its key properties. A `GetByKeyRequestBuilder` allows to restrict the response to a selection of fields,
 * where no selection is equal to selecting all fields.
 *
 * @typeparam EntityT - Type of the entity to be requested
 */
export class GetByKeyRequestBuilder<EntityT extends Entity> extends MethodRequestBuilderBase<ODataGetByKeyRequestConfig<EntityT>>
  implements EntityIdentifiable<EntityT> {
  /**
   * Creates an instance of GetByKeyRequestBuilder.
   *
   * @param _entityConstructor - Constructor of the entity to create the request for
   * @param keys - Key-value pairs where the key is the name of a key property of the given entity and the value is the respective value
   */
  constructor(readonly _entityConstructor: Constructable<EntityT>, keys: MapType<FieldType>) {
    super(new ODataGetByKeyRequestConfig(_entityConstructor));
    this.requestConfig.keys = keys;
  }

  /**
   * Restrict the response to the given selection of properties in the request.
   *
   * @param selects - Fields to select in the request
   * @returns The request builder itself, to facilitate method chaining
   */
  select(...selects: Selectable<EntityT>[]): this {
    this.requestConfig.selects = selects;
    return this;
  }

  /**
   * Execute request.
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to the requested entity
   */
  async execute(destination: Destination | DestinationNameAndJwt, options?: DestinationOptions): Promise<EntityT> {
    return this.build(destination, options)
      .then(request => request.execute())
      .then(response => deserializeEntity(extractData(response), this._entityConstructor, response.headers))
      .catch(error => Promise.reject(errorWithCause('OData get by key request failed!', error)));
  }
}

/*
C4C response to getByKey requests with the collection response format instead of the single element one
To account for this, we test for this and use the normal format if `.result` return undefined.
*/
function extractData(response: AxiosResponse): MapType<any> {
  return response.data.d.results || response.data.d;
}
