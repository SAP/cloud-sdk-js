import {
  ErrorWithCause,
  transformVariadicArgumentToArray
} from '@sap-cloud-sdk/util';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import { v4 as uuid } from 'uuid';
import { EntityBase, EntityIdentifiable } from '../entity-base';
import { extractEtagFromHeader } from '../entity-deserializer';
import { EntitySerializer } from '../entity-serializer';
import { ODataRequest } from '../request/odata-request';
import { ODataUpdateRequestConfig } from '../request/odata-update-request-config';
import { ODataUri } from '../uri-conversion';
import { Selectable } from '../selectable';
import { DeSerializers } from '../de-serializers/de-serializers';
import { EntityApi } from '../entity-api';
import {
  BatchReference,
  WithBatchReference
} from '../request/odata-request-traits';
import { MethodRequestBuilder } from './request-builder-base';

/**
 * Abstract class to create OData query to update an entity containing methods shared for OData v2 and v4.
 * @typeParam EntityT - Type of the entity to be updated
 */
export abstract class UpdateRequestBuilderBase<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers
  >
  extends MethodRequestBuilder<
    ODataUpdateRequestConfig<EntityT, DeSerializersT>
  >
  implements EntityIdentifiable<EntityT, DeSerializersT>, WithBatchReference
{
  readonly _deSerializers: DeSerializersT;
  private ignored: Set<string>;
  private required: Set<string>;
  private _batchReference: BatchReference;

  /**
   * Creates an instance of UpdateRequestBuilder.
   * @param _entityApi - Entity API for building and executing the request.
   * @param _entity - Entity to be updated.
   * @param oDataUri - URI conversion functions.
   * @param entitySerializer - Entity serializer.
   * @param extractODataEtag - Extractor for ETag from payload.
   * @param payloadManipulator - Manipulator for the payload.
   */
  constructor(
    readonly _entityApi: EntityApi<EntityT, DeSerializersT>,
    readonly _entity: EntityT,
    readonly oDataUri: ODataUri<DeSerializersT>,
    readonly entitySerializer: EntitySerializer,
    readonly extractODataEtag: (
      json: Record<string, any>
    ) => string | undefined,
    readonly payloadManipulator: (
      body: Record<string, any>
    ) => Record<string, any>
  ) {
    super(new ODataUpdateRequestConfig(_entityApi, oDataUri));
    this.requestConfig.eTag = _entity.versionIdentifier;
    this.required = new Set<string>();
    this.ignored = new Set<string>();

    this.requestConfig.keys = this.oDataUri.getEntityKeys(
      this._entity,
      this._entityApi
    );

    this.requestConfig.payload = this.getPayload();
  }

  get entity(): EntityT {
    return this._entity;
  }

  /**
   * Gets identifier for the batch request.
   * @returns Batch request identifier.
   */
  getBatchReference(): BatchReference {
    if (!this._batchReference) {
      this.setBatchId(uuid());
    }
    return this._batchReference;
  }

  /**
   * Sets user-defined identifier for the batch reference.
   * @param id - User-defined batch reuest identifier.
   */
  setBatchId(id: string): void {
    this._batchReference = { id };
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
   * Sets required entity keys for the update request.
   * @param fields - Enumeration of the fields to be required.
   * @returns The entity itself, to facilitate method chaining.
   */
  setRequiredFields(...fields: Selectable<EntityT, DeSerializersT>[]): this;
  setRequiredFields(fields: Selectable<EntityT, DeSerializersT>[]): this;
  setRequiredFields(
    first:
      | undefined
      | Selectable<EntityT, DeSerializersT>
      | Selectable<EntityT, DeSerializersT>[],
    ...rest: Selectable<EntityT, DeSerializersT>[]
  ): this {
    this.required = this.toSet(transformVariadicArgumentToArray(first, rest));
    this.requestConfig.payload = this.getPayload();
    return this;
  }

  /**
   * Sets entity fields to ignore by the update request.
   * @param fields - Enumeration of the fields to be ignored.
   * @returns The entity itself, to facilitate method chaining.
   */
  setIgnoredFields(...fields: Selectable<EntityT, DeSerializersT>[]): this;
  setIgnoredFields(fields: Selectable<EntityT, DeSerializersT>[]): this;
  setIgnoredFields(
    first:
      | undefined
      | Selectable<EntityT, DeSerializersT>
      | Selectable<EntityT, DeSerializersT>[],
    ...rest: Selectable<EntityT, DeSerializersT>[]
  ): this {
    this.ignored = this.toSet(transformVariadicArgumentToArray(first, rest));
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
    request: ODataRequest<ODataUpdateRequestConfig<EntityT, DeSerializersT>>
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
    request: ODataRequest<ODataUpdateRequestConfig<EntityT, DeSerializersT>>
  ): Promise<HttpResponse> {
    return request.execute();
  }

  protected getPayload(): Record<string, any> {
    const serializedBody = this.entitySerializer.serializeEntity(
      this._entity,
      this._entityApi
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
    return this._entityApi.entityConstructor._keys;
  }

  private toSet(fields: Selectable<EntityT, DeSerializersT>[]): Set<string> {
    const fieldNames = Object.values(fields).map(
      ({ _fieldName }) => _fieldName
    );
    return new Set(fieldNames);
  }

  private serializedDiff(): Record<string, any> {
    return {
      ...this.entitySerializer.serializeEntity(
        this._entity,
        this._entityApi,
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
