import { ErrorWithCause, variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import { Constructable, EntityBase, EntityIdentifiable } from '../entity-base';
import { extractEtagFromHeader } from '../entity-deserializer';
import { EntitySerializer } from '../entity-serializer';
import { ODataUpdateRequestConfig } from '../request/odata-update-request-config';
import { ODataUri } from '../uri-conversion/odata-uri';
import { Selectable } from '../selectable/selectable';
import { ODataRequest } from '../request/odata-request';
import { MethodRequestBuilder } from './request-builder-base';

/**
 * Abstract class to create OData query to update an entity containing methods shared for OData v2 and v4.
 * @typeparam EntityT - Type of the entity to be updated
 * @internal
 */
export abstract class UpdateRequestBuilderBase<EntityT extends EntityBase>
  extends MethodRequestBuilder<ODataUpdateRequestConfig<EntityT>>
  implements EntityIdentifiable<EntityT>
{
  private ignored: Set<string>;
  private required: Set<string>;

  /**
   * Creates an instance of UpdateRequestBuilder.
   * @param _entityConstructor - Constructor type of the entity to be updated
   * @param _entity - Entity to be updated
   * @param oDataUri - Collection of URI conversion methods
   * @param entitySerializer - Entity serializer
   * @param extractODataEtag - Extractor for ETag from payload
   * @param payloadManipulator - Manipulator for the payload.
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _entity: EntityT,
    readonly oDataUri: ODataUri,
    readonly entitySerializer: EntitySerializer,
    readonly extractODataEtag: (
      json: Record<string, any>
    ) => string | undefined,
    readonly payloadManipulator: (
      body: Record<string, any>
    ) => Record<string, any>
  ) {
    super(new ODataUpdateRequestConfig(_entityConstructor, oDataUri));
    this.requestConfig.eTag = _entity.versionIdentifier;
    this.required = new Set<string>();
    this.ignored = new Set<string>();

    this.requestConfig.keys = this.oDataUri.getEntityKeys(
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
    this.requestConfig.keys = this.oDataUri.getEntityKeys(
      this._entity,
      this._entityConstructor
    );

    this.requestConfig.payload = this.getPayload();

    return this;
  }

  /**
   * Explicitly configure 'PUT' as the method of the update request. By default, only the properties that have changed compared to the last known remote state are sent using 'PATCH', while with 'PUT', the whole entity is sent.
   * @returns The entity itself, to facilitate method chaining.
   */
  replaceWholeEntityWithPut(): this {
    this.requestConfig.updateWithPut();
    this.requestConfig.payload = this.getPayload();
    return this;
  }

  /**
   * @deprecated Since version 1.34.0 Use [[setRequiredFields]] instead.
   * Specifies required entity keys for the update request.
   * @param fields - Enumeration of the fields to be required.
   * @returns The entity itself, to facilitate method chaining.
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
   * Sets required entity keys for the update request.
   * @param fields - Enumeration of the fields to be required.
   * @returns The entity itself, to facilitate method chaining.
   */
  setRequiredFields(...fields: Selectable<EntityT>[]): this;
  setRequiredFields(fields: Selectable<EntityT>[]): this;
  setRequiredFields(
    first: undefined | Selectable<EntityT> | Selectable<EntityT>[],
    ...rest: Selectable<EntityT>[]
  ): this {
    this.required = this.toSet(variadicArgumentToArray(first, rest));
    this.requestConfig.payload = this.getPayload();
    return this;
  }

  /**
   * @deprecated Since version 1.34.0 Use [[setIgnoredFields]] instead.
   * Specifies entity fields to ignore by the update request.
   * @param fields - Enumeration of the fields to be ignored.
   * @returns The entity itself, to facilitate method chaining.
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
   * Sets entity fields to ignore by the update request.
   * @param fields - Enumeration of the fields to be ignored.
   * @returns The entity itself, to facilitate method chaining.
   */
  setIgnoredFields(...fields: Selectable<EntityT>[]): this;
  setIgnoredFields(fields: Selectable<EntityT>[]): this;
  setIgnoredFields(
    first: undefined | Selectable<EntityT> | Selectable<EntityT>[],
    ...rest: Selectable<EntityT>[]
  ): this {
    this.ignored = this.toSet(variadicArgumentToArray(first, rest));
    this.requestConfig.payload = this.getPayload();
    return this;
  }

  /**
   * Instructs the request to force an overwrite of the entity by sending an 'If-Match: *' header instead of sending the ETag version identifier.
   * @returns The request itself to ease chaining while executing the request.
   */
  ignoreVersionIdentifier(): this {
    this.requestConfig.versionIdentifierIgnored = true;
    return this;
  }

  /**
   * @deprecated Since version 1.34.0 Use [[setVersionIdentifier]] instead.
   * Specifies a custom ETag version identifier of the entity to update.
   * @param etag - Custom ETag version identifier to be sent in the header of the request.
   * @returns The request itself to ease chaining while executing the request.
   */
  withCustomVersionIdentifier(etag: string): this {
    this.requestConfig.eTag = etag;
    return this;
  }

  /**
   * Sets ETag version identifier of the entity to update.
   * @param etag - Custom ETag version identifier to be sent in the header of the request.
   * @returns The request itself to ease chaining while executing the request.
   */
  setVersionIdentifier(etag: string): this {
    this.requestConfig.eTag = etag;
    return this;
  }

  /**
   * Executes the query.
   * @param request - Request object to be executed.
   * @returns A promise resolving to the entity once it was updated.
   */
  protected async executeRequest(
    request: ODataRequest<ODataUpdateRequestConfig<EntityT>>
  ): Promise<EntityT> {
    return (
      this.executeRequestRaw(request)
        // Update returns 204 hence the data from the request is used to build entity for return
        .then(response => {
          const eTag =
            extractEtagFromHeader(response.headers) ||
            this.extractODataEtag(response.data) ||
            this.requestConfig.eTag;
          return this._entity
            .setOrInitializeRemoteState()
            .setVersionIdentifier(eTag);
        })
        .catch(error => {
          throw new ErrorWithCause('OData update request failed!', error);
        })
    );
  }

  protected async executeRequestRaw(
    request: ODataRequest<ODataUpdateRequestConfig<EntityT>>
  ): Promise<HttpResponse> {
    return request.execute();
  }

  protected getPayload(): Record<string, any> {
    const serializedBody = this.entitySerializer.serializeEntity(
      this._entity,
      this._entityConstructor
    );

    if (this.requestConfig.method === 'patch') {
      let body = this.serializedDiff();
      body = this.payloadManipulator(body);
      body = this.removeKeyFields(body);
      body = this.addRequiredFields(serializedBody, body);
      body = this.removeIgnoredFields(body);
      return body;
    }
    return serializedBody;
  }

  protected isEmptyObject(obj: any): boolean {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
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

  private serializedDiff(): Record<string, any> {
    return {
      ...this.entitySerializer.serializeEntity(
        this._entity,
        this._entityConstructor,
        true
      )
    };
  }

  private removeKeyFields(body: Record<string, any>): Record<string, any> {
    return removePropertyOnCondition(
      ([key]) => this.getKeyFieldNames().includes(key),
      body
    );
  }

  private removeIgnoredFields(body: Record<string, any>): Record<string, any> {
    return removePropertyOnCondition(([key]) => this.ignored.has(key), body);
  }
}

/**
 * @param condition - condition to remove
 * @param body - body
 * @returns body without condition
 * @internal
 */
export function removePropertyOnCondition(
  condition: (objectEntry: [string, any]) => boolean,
  body: Record<string, any>
): Record<string, any> {
  return Object.entries(body).reduce((resultBody, [key, val]) => {
    if (condition([key, val])) {
      return resultBody;
    }
    return { ...resultBody, [key]: val };
  }, {});
}
