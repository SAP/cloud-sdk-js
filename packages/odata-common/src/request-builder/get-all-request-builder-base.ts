import { transformVariadicArgumentToArray } from '@sap-cloud-sdk/util';
import { DestinationOrFetchOptions } from '@sap-cloud-sdk/connectivity';
import { EntityBase } from '../entity-base';
import { Selectable } from '../selectable';
import { OrderableAndOrderableInput, isOrderable, asc } from '../order';
import { ODataGetAllRequestConfig } from '../request/odata-get-all-request-config';
import { EntityDeserializer } from '../entity-deserializer';
import { ResponseDataAccessor } from '../response-data-accessor';
import { DeSerializers } from '../de-serializers/de-serializers';
import { EntityApi } from '../entity-api';
import { CountRequestBuilder } from './count-request-builder';
import { GetRequestBuilderBase } from './get-request-builder-base';

/**
 * Base class for the get all request builders {@link @sap-cloud-sdk/odata-v2!GetAllRequestBuilder | GetAllRequestBuilderV2} and {@link @sap-cloud-sdk/odata-v4!GetAllRequestBuilder | GetAllRequestBuilderV4}.
 * @typeParam EntityT - Type of the entity to be requested
 */
export abstract class GetAllRequestBuilderBase<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> extends GetRequestBuilderBase<
  EntityT,
  DeSerializersT,
  ODataGetAllRequestConfig<EntityT, DeSerializersT>
> {
  /**
   * Creates an instance of GetAllRequestBuilder.
   * @param entityApi - Entity API for building and executing the request.
   * @param getAllRequestConfig - Request config of the get all request.
   * @param entityDeserializer - Entity deserializer.
   * @param dataAccessor - Object access functions for get requests.
   */
  constructor(
    entityApi: EntityApi<EntityT, DeSerializersT>,
    getAllRequestConfig: ODataGetAllRequestConfig<EntityT, DeSerializersT>,
    readonly entityDeserializer: EntityDeserializer,
    readonly dataAccessor: ResponseDataAccessor
  ) {
    super(entityApi, getAllRequestConfig);
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
   * Add order-by statements to the request.
   * @param orderBy - OrderBy statements to order the response by.
   * @returns The request builder itself, to facilitate method chaining.
   */
  orderBy(
    orderBy: OrderableAndOrderableInput<
      EntityT,
      DeSerializersT,
      EntityApi<EntityBase, DeSerializersT>
    >[]
  ): this;
  orderBy(
    ...orderBy: OrderableAndOrderableInput<
      EntityT,
      DeSerializersT,
      EntityApi<EntityBase, DeSerializersT>
    >[]
  ): this;
  orderBy(
    first:
      | undefined
      | OrderableAndOrderableInput<
          EntityT,
          DeSerializersT,
          EntityApi<EntityBase, DeSerializersT>
        >
      | OrderableAndOrderableInput<
          EntityT,
          DeSerializersT,
          EntityApi<EntityBase, DeSerializersT>
        >[],
    ...rest: OrderableAndOrderableInput<
      EntityT,
      DeSerializersT,
      EntityApi<EntityBase, DeSerializersT>
    >[]
  ): this {
    this.requestConfig.orderBy = transformVariadicArgumentToArray(
      first,
      rest
    ).map(element => {
      if (!isOrderable<EntityT, DeSerializersT>(element)) {
        return asc(element);
      }
      return element;
    });
    return this;
  }

  /**
   * Limit number of returned entities.
   * @param top - Maximum number of entities to return in the response. Can be less, if less entities match the request.
   * @returns The request builder itself, to facilitate method chaining.
   */
  top(top: number): this {
    this.requestConfig.top = top;
    return this;
  }

  /**
   * Skip number of entities.
   * @param skip - Number of matching entities to skip. Useful for paging.
   * @returns The request builder itself, to facilitate method chaining.
   */
  skip(skip: number): this {
    this.requestConfig.skip = skip;
    return this;
  }

  /**
   * Count the number of entities.
   * @returns A count request builder for execution.
   */
  count(): CountRequestBuilder<EntityT, DeSerializersT> {
    return new CountRequestBuilder(this);
  }

  /**
   * Execute request.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving to the requested entities.
   */
  async execute(destination: DestinationOrFetchOptions): Promise<EntityT[]> {
    return this.executeRaw(destination).then(response =>
      this.dataAccessor
        .getCollectionResult(response.data)
        .map(json =>
          this.entityDeserializer.deserializeEntity(
            json,
            this._entityApi,
            response.headers
          )
        )
    );
  }
}
