import { errorWithCause, variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { Constructable, EntityIdentifiable, Selectable } from '../../common';
import { EntityV4 } from '../entity';
import { MethodRequestBuilderBase } from '../../common/request-builder/request-builder-base';
import { ODataUpdateRequestConfig } from '../../common/request/odata-update-request-config';
import {
  serializeEntityV4,
  serializeEntityNonCustomFieldsV4
} from '../entity-serializer';
import { DestinationOptions } from '../../../scp-cf';
import {
  Destination,
  DestinationNameAndJwt
} from '../../../scp-cf/destination/destination-service-types';
import { oDataUriV4 } from '../uri-conversion';
import { extractEtagFromHeader } from '../../common/entity-deserializer';
import { extractODataEtagV4 } from '../extract-odata-etag';

/**
 * Create OData query to update an entity.
 *
 * @typeparam EntityT - Type of the entity to be updated
 */
export class UpdateRequestBuilderV4<EntityT extends EntityV4>
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
    super(new ODataUpdateRequestConfig(_entityConstructor, oDataUriV4));
    this.requestConfig.eTag = _entity.versionIdentifier;
    this.required = new Set<string>();
    this.ignored = new Set<string>();

    this.requestConfig.keys = oDataUriV4.getEntityKeys(
      this._entity,
      this._entityConstructor
    );

    this.requestConfig.payload = this.getPayload();
  }

  get entity(): EntityT {
    return this._entity;
  }

  /**
   * @deprecated Since v1.29.0. This method should never be called, it has severe side effects.
   * Builds the payload and the entity keys of the query.
   * @returns the builder itself
   */
  prepare(): this {
    this.requestConfig.keys = oDataUriV4.getEntityKeys(
      this._entity,
      this._entityConstructor
    );

    this.requestConfig.payload = this.getPayload();

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
    if (this.isEmptyObject(this.requestConfig.payload)) {
      return this._entity;
    }

    return (
      this.build(destination, options)
        .then(request => request.execute())

        // Update returns 204 hence the data from the request is used to build entity for return
        .then(response => {
          const eTag =
            extractEtagFromHeader(response.headers) ||
            extractODataEtagV4(response.data) ||
            this.requestConfig.eTag;
          return this._entity
            .setOrInitializeRemoteState()
            .setVersionIdentifier(this.requestConfig.eTag);
        })
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
    this.requestConfig.payload = this.getPayload();
    return this;
  }

  /**
   * Specifies required entity keys for the update request.
   *
   * @param fields - Enumeration of the fields to be required
   * @returns The entity itself, to facilitate method chaining
   */
  requiredFields(...fields: Selectable<EntityT>[]): this;
  requiredFields(fields: Selectable<EntityT>[]): this;
  requiredFields(
    first: undefined | Selectable<EntityT> | Selectable<EntityT>[],
    ...rest: Selectable<EntityT>[]
  ): this {
    this.required = this.toSet(variadicArgumentToArray(first, rest));
    this.requestConfig.payload = this.getPayload();
    return this;
  }

  /**
   * Specifies entity fields to ignore by the update request.
   *
   * @param fields - Enumeration of the fields to be ignored
   * @returns The entity itself, to facilitate method chaining
   */
  ignoredFields(...fields: Selectable<EntityT>[]): this;
  ignoredFields(fields: Selectable<EntityT>[]): this;
  ignoredFields(
    first: undefined | Selectable<EntityT> | Selectable<EntityT>[],
    ...rest: Selectable<EntityT>[]
  ): this {
    this.ignored = this.toSet(variadicArgumentToArray(first, rest));
    this.requestConfig.payload = this.getPayload();
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

  private getPayload(): Record<string, any> {
    const serializedBody = serializeEntityV4(
      this._entity,
      this._entityConstructor
    );

    if (this.requestConfig.method === 'patch') {
      let body = this.serializedDiff();
      body = this.removeKeyFields(body);
      body = this.addRequiredFields(serializedBody, body);
      body = this.removeIgnoredFields(body);
      return body;
    }
    return serializedBody;
  }

  private serializedDiff(): Record<string, any> {
    return {
      ...serializeEntityNonCustomFieldsV4(
        this._entity.getUpdatedProperties(),
        this._entityConstructor
      ),
      ...this._entity.getUpdatedCustomFields()
    };
  }

  private removeKeyFields(body: Record<string, any>): Record<string, any> {
    return removePropertyOnCondition(([key, val]) =>
      this.getKeyFieldNames().includes(key)
    )(body);
  }

  private removeIgnoredFields(body: Record<string, any>): Record<string, any> {
    return removePropertyOnCondition(([key, val]) => this.ignored.has(key))(
      body
    );
  }

  private addRequiredFields(
    completeBody: Record<string, any>,
    body: Record<string, any>
  ): Record<string, any> {
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

  private toSet(fields: Selectable<EntityT>[]) {
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
) => (body: Record<string, any>): Record<string, any> =>
  Object.entries(body).reduce((resultBody, [key, val]) => {
    if (condition([key, val])) {
      return resultBody;
    }
    return { ...resultBody, [key]: val };
  }, {});
