import { ErrorWithCause } from '@sap-cloud-sdk/util';
import { DestinationOrFetchOptions } from '@sap-cloud-sdk/connectivity';
import { HttpResponse } from '@sap-cloud-sdk/http-client';
import { v4 as uuid } from 'uuid';
import type { EntitySerializer } from '../entity-serializer';
import type { ODataUri } from '../uri-conversion';
import type { EntityBase, EntityIdentifiable } from '../entity-base';
import type { EntityDeserializer } from '../entity-deserializer';
import type { ResponseDataAccessor } from '../response-data-accessor';
import { ODataCreateRequestConfig } from '../request/odata-create-request-config';
import { Link } from '../selectable';
import { DeSerializers } from '../de-serializers/de-serializers';
import { EntityApi } from '../entity-api';
import {
  BatchReference,
  WithBatchReference
} from '../request/odata-request-traits';
import { MethodRequestBuilder } from './request-builder-base';

/**
 * Abstract create request class holding the parts shared in OData v2 and v4.
 * @typeParam EntityT - Type of the entity to be created
 */
export abstract class CreateRequestBuilderBase<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers
  >
  extends MethodRequestBuilder<
    ODataCreateRequestConfig<EntityT, DeSerializersT>
  >
  implements EntityIdentifiable<EntityT, DeSerializersT>, WithBatchReference
{
  readonly _deSerializers: DeSerializersT;
  private _batchReference: BatchReference;

  /**
   * Creates an instance of CreateRequestBuilder.
   * @param _entityApi - Entity API for building and executing the request.
   * @param _entity - Entity to be created.
   * @param oDataUri - URI conversion functions.
   * @param serializer - Entity serializer.
   * @param deserializer - Entity deserializer.
   * @param responseDataAccessor - Object access functions for get requests.
   */
  constructor(
    readonly _entityApi: EntityApi<EntityT, DeSerializersT>,
    readonly _entity: EntityT,
    readonly oDataUri: ODataUri<DeSerializersT>,
    readonly serializer: EntitySerializer,
    readonly deserializer: EntityDeserializer,
    readonly responseDataAccessor: ResponseDataAccessor
  ) {
    super(new ODataCreateRequestConfig(_entityApi, oDataUri));
    this.requestConfig.payload = serializer.serializeEntity(
      this._entity,
      this._entityApi
    );
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
   * Specifies the parent of the entity to create.
   * @param parentEntity - Parent of the entity to create.
   * @param linkField - Static representation of the navigation property that navigates from the parent entity to the child entity.
   * @returns The entity itself, to facilitate method chaining.
   */
  asChildOf<ParentEntityT extends EntityBase>(
    parentEntity: ParentEntityT,
    linkField: Link<ParentEntityT, DeSerializersT, EntityApi<EntityT, any>>
  ): this {
    this.requestConfig.parentKeys = this.oDataUri.getEntityKeys(
      parentEntity,
      linkField._entityApi
    );
    this.requestConfig.childField = linkField;
    return this;
  }

  /**
   * Execute query.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving to the created entity.
   */
  async execute(destination: DestinationOrFetchOptions): Promise<EntityT> {
    return this.executeRaw(destination)
      .then(response =>
        this.deserializer.deserializeEntity(
          this.responseDataAccessor.getSingleResult(response.data),
          this._entityApi,
          response.headers
        )
      )
      .catch(error => {
        throw new ErrorWithCause('Create request failed!', error);
      });
  }

  /**
   * Execute request and return an {@link @sap-cloud-sdk/http-client!HttpResponse}.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving to an {@link @sap-cloud-sdk/http-client!HttpResponse}.
   */
  async executeRaw(
    destination: DestinationOrFetchOptions
  ): Promise<HttpResponse> {
    return this.build(destination).then(request => request.execute());
  }
}
