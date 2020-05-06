/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { errorWithCause, MapType } from '@sap-cloud-sdk/util';
import { pipe } from 'rambda';
import {
  serializeEntity,
  serializeEntityNonCustomFields
} from '../entity-serializer';
import { DestinationOptions } from '../../scp-cf';
import {
  Destination,
  DestinationNameAndJwt
} from '../../scp-cf/destination-service-types';
import {
  MethodRequestBuilderBase,
  ODataUpdateRequestConfig,
  EntityIdentifiable,
  Constructable,
  Selectable
} from '../../common';
import { Entity } from '../entity';
import * as uriConversion from './request/uri-conversion';
/**
 * Create OData query to update an entity.
 *
 * @typeparam EntityT - Type of the entity to be updated
 */
export class UpdateRequestBuilder<EntityT extends Entity>
  extends MethodRequestBuilderBase<ODataUpdateRequestConfig<EntityT>>
  implements EntityIdentifiable<EntityT> {
  private ignored: Set<string>;
  private required: Set<string>;

  /**
   * Creates an instance of UpdateRequestBuilder.
   *
   * @param _entityConstructor - Constructor type of the entity to be updated
   * @param _entity - Entity to be updated
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _entity: EntityT
  ) {
    super(new ODataUpdateRequestConfig(_entityConstructor, uriConversion));
    this.requestConfig.eTag = _entity.versionIdentifier;
    this.required = new Set<string>();
    this.ignored = new Set<string>();
  }

  /**
   * Builds the payload and the entity keys of the query.
   *
   * @returns the builder itself
   */
  prepare(): this {
    this.requestConfig.keys = uriConversion.getEntityKeys(
      this._entity,
      this._entityConstructor
    );

    let updateBody;
    switch (this.requestConfig.method) {
      case 'put':
        updateBody = serializeEntity(this._entity, this._entityConstructor);
        break;
      case 'patch':
        updateBody = this.getUpdateBody();
        break;
      default:
        throw new Error(
          `${this.requestConfig.method} is not a valid method of the update request.`
        );
    }
    this.requestConfig.payload = updateBody;

    return this;
  }

  /**
   * Executes the query.
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to the entity once it was updated
   */
  async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<EntityT> {
    this.prepare();
    if (this.isEmptyObject(this.requestConfig.payload)) {
      return this._entity;
    }

    return (
      this.build(destination, options)
        .then(request => request.execute())

        // Update returns 204 hence the data from the request is used to build entity for return
        .then(response =>
          this._entity
            .setOrInitializeRemoteState()
            .setVersionIdentifier(this.requestConfig.eTag)
        )
        .catch(error =>
          Promise.reject(errorWithCause('OData update request failed!', error))
        )
    );
  }

  /**
   * Explicitly configure 'PUT' as the method of the update request. By default, only the properties that have changed compared to the last known remote state are sent using 'PATCH', while with 'PUT', the whole entity is sent.
   *
   * @returns The entity itself, to facilitate method chaining
   */
  replaceWholeEntityWithPut(): this {
    this.requestConfig.updateWithPut();
    return this;
  }

  /**
   * Specifies required entity keys for the update request.
   *
   * @param fields - Enumeration of the fields to be required
   * @returns The entity itself, to facilitate method chaining
   */
  requiredFields(...fields: Selectable<EntityT>[]): this {
    this.required = this.toSet(...fields);
    return this;
  }

  /**
   * Specifies entity fields to ignore by the update request.
   *
   * @param fields - Enumeration of the fields to be ignored
   * @returns The entity itself, to facilitate method chaining
   */
  ignoredFields(...fields: Selectable<EntityT>[]): this {
    this.ignored = this.toSet(...fields);
    return this;
  }

  /**
   * Instructs the request to force an overwrite of the entity by sending an 'If-Match: *' header instead of sending the ETag version identifier.
   *
   * @returns this The request itself to ease chaining while executing the request
   */
  ignoreVersionIdentifier(): this {
    this.requestConfig.versionIdentifierIgnored = true;
    return this;
  }

  /**
   * Specifies a custom ETag version identifier of the entity to update.
   *
   * @param etag - Custom ETag version identifier to be sent in the header of the request
   * @returns The request itself to ease chaining while executing the request
   */
  withCustomVersionIdentifier(etag: string): this {
    this.requestConfig.eTag = etag;
    return this;
  }

  private getUpdateBody(): MapType<any> {
    const serializedBody = serializeEntity(
      this._entity,
      this._entityConstructor
    );

    return pipe(
      () => this.serializedDiff(),
      body => this.removeNavPropsAndComplexTypes(body),
      body => this.removeKeyFields(body),
      body => this.addRequiredFields(serializedBody, body),
      body => this.removeIgnoredFields(body)
    )();
  }

  private serializedDiff(): MapType<any> {
    return {
      ...serializeEntityNonCustomFields(
        this._entity.getUpdatedProperties(),
        this._entityConstructor
      ),
      ...this._entity.getUpdatedCustomFields()
    };
  }

  private removeNavPropsAndComplexTypes(body: MapType<any>): MapType<any> {
    return removePropertyOnCondition(([key, val]) => typeof val === 'object')(
      body
    );
  }

  private removeKeyFields(body: MapType<any>): MapType<any> {
    return removePropertyOnCondition(([key, val]) =>
      this.getKeyFieldNames().includes(key)
    )(body);
  }

  private removeIgnoredFields(body: MapType<any>): MapType<any> {
    return removePropertyOnCondition(([key, val]) => this.ignored.has(key))(
      body
    );
  }

  private addRequiredFields(
    completeBody: MapType<any>,
    body: MapType<any>
  ): MapType<any> {
    return Array.from(this.required).reduce((resultBody, requiredField) => {
      if (Object.keys(resultBody).includes(requiredField)) {
        return resultBody;
      }
      return { ...resultBody, [requiredField]: completeBody[requiredField] };
    }, body);
  }

  private getKeyFieldNames(): string[] {
    return Object.keys(this._entityConstructor._keys);
  }

  private toSet(...fields: Selectable<EntityT>[]) {
    const set = new Set<string>();
    Object.values(fields).forEach(field => {
      set.add(field._fieldName);
    });
    return set;
  }

  private isEmptyObject(obj: any): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
}

const removePropertyOnCondition = (
  condition: (objectEntry: [string, any]) => boolean
) => (body: MapType<any>): MapType<any> =>
  Object.entries(body).reduce((resultBody, [key, val]) => {
    if (condition([key, val])) {
      return resultBody;
    }
    return { ...resultBody, [key]: val };
  }, {});
