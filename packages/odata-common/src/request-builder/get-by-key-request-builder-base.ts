import {
  ErrorWithCause,
  transformVariadicArgumentToArray
} from '@sap-cloud-sdk/util';
import { v4 as uuid } from 'uuid';
import { ODataGetByKeyRequestConfig } from '../request';
import { GetRequestBuilderBase } from './get-request-builder-base';
import type { HttpDestinationOrFetchOptions } from '@sap-cloud-sdk/connectivity';
import type { EntityBase } from '../entity-base';
import type { EntityDeserializer } from '../entity-deserializer';
import type { ResponseDataAccessor } from '../response-data-accessor';
import type { Selectable } from '../selectable';
import type { ODataUri } from '../uri-conversion';
import type { DeSerializers } from '../de-serializers';
import type { EntityApi } from '../entity-api';
import type { BatchReference, WithBatchReference } from '../request';
/**
 * Abstract class to create a get by key request containing the shared functionality for OData v2 and v4.
 * @typeParam EntityT - Type of the entity to be requested
 */
export abstract class GetByKeyRequestBuilderBase<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers
  >
  extends GetRequestBuilderBase<
    EntityT,
    DeSerializersT,
    ODataGetByKeyRequestConfig<EntityT, DeSerializersT>
  >
  implements WithBatchReference
{
  private _batchReference: BatchReference;

  /**
   * Creates an instance of GetByKeyRequestBuilder.
   * @param entityApi - Entity API for building and executing the request.
   * @param keys - Key-value pairs where the key is the name of a key property of the given entity and the value is the respective value.
   * @param oDataUri - URI conversion functions.
   * @param entityDeserializer - Entity deserializer.
   * @param dataAccessor - Object access functions for get requests.
   */
  constructor(
    entityApi: EntityApi<EntityT, DeSerializersT>,
    keys: Record<string, any>,
    oDataUri: ODataUri<DeSerializersT>,
    readonly entityDeserializer: EntityDeserializer,
    readonly dataAccessor: ResponseDataAccessor
  ) {
    super(entityApi, new ODataGetByKeyRequestConfig(entityApi, oDataUri));
    this.requestConfig.keys = keys;
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
   * @param id - User-defined batch request identifier.
   */
  setBatchId(id: string): void {
    this._batchReference = { id };
  }

  /**
   * Restrict the response to the given selection of properties in the request.
   * @param selects - Fields to select in the request.
   * @returns The request builder itself, to facilitate method chaining.
   */
  select(...selects: Selectable<EntityT, DeSerializersT>[]): this;
  select(selects: Selectable<EntityT, DeSerializersT>[]): this;
  select(
    first:
      | undefined
      | Selectable<EntityT, DeSerializersT>
      | Selectable<EntityT, DeSerializersT>[],
    ...rest: Selectable<EntityT, DeSerializersT>[]
  ): this {
    this.requestConfig.selects = transformVariadicArgumentToArray(first, rest);
    return this;
  }

  /**
   * Execute request.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving to the requested entity.
   */
  async execute(destination: HttpDestinationOrFetchOptions): Promise<EntityT> {
    return this.executeRaw(destination)
      .then(response =>
        this.entityDeserializer.deserializeEntity(
          this.dataAccessor.getSingleResult(response.data),
          this._entityApi,
          response.headers
        )
      )
      .catch(error => {
        throw new ErrorWithCause('OData get by key request failed!', error);
      });
  }
}
