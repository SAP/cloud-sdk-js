import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { Constructable, Entity } from '../entity';
import { Selectable } from '../selectable/selectable';
import { Orderable } from '../order/orderable';
import { ODataGetAllRequestConfig } from '../request/odata-get-all-request-config';
import {
  DestinationOptions,
  Destination,
  DestinationNameAndJwt
} from '../../connectivity/scp-cf';
import { CountRequestBuilder } from '../request-builder/count-request-builder';
import { EntityDeserializer } from '../entity-deserializer';
import { ResponseDataAccessor } from '../response-data-accessor';
import { HttpRequestAndResponse } from '../../http-client';
import { GetRequestBuilder } from './get-request-builder-base';

/**
 * Base class for the get all request builders [[GetAllRequestBuilderV2]] and [[GetAllRequestBuilderV4]]
 *
 * @typeparam EntityT - Type of the entity to be requested
 */
export abstract class GetAllRequestBuilder<
  EntityT extends Entity
> extends GetRequestBuilder<EntityT, ODataGetAllRequestConfig<EntityT>> {
  /**
   * Creates an instance of GetAllRequestBuilder.
   *
   * @param entityConstructor - Constructor of the entity to create the request for
   * @param getAllRequestConfig - Request config of the get all request.
   */
  constructor(
    entityConstructor: Constructable<EntityT>,
    getAllRequestConfig: ODataGetAllRequestConfig<EntityT>,
    readonly entityDeserializer: EntityDeserializer,
    readonly dataAccessor: ResponseDataAccessor
  ) {
    super(entityConstructor, getAllRequestConfig);
  }
  /**
   * Restrict the response to the given selection of properties in the request.
   *
   * @param selects - Fields to select in the request
   * @returns The request builder itself, to facilitate method chaining
   */
  select(...selects: Selectable<EntityT>[]): this;
  select(selects: Selectable<EntityT>[]): this;
  select(
    first: undefined | Selectable<EntityT> | Selectable<EntityT>[],
    ...rest: Selectable<EntityT>[]
  ): this {
    this.requestConfig.selects = variadicArgumentToArray(first, rest);
    return this;
  }

  /**
   * Add order-by statements to the request.
   *
   * @param orderBy - OrderBy statements to order the response by
   * @returns The request builder itself, to facilitate method chaining
   */
  orderBy(orderBy: Orderable<EntityT>[]): this;
  orderBy(...orderBy: Orderable<EntityT>[]): this;
  orderBy(
    first: undefined | Orderable<EntityT> | Orderable<EntityT>[],
    ...rest: Orderable<EntityT>[]
  ): this {
    this.requestConfig.orderBy = variadicArgumentToArray(first, rest);
    return this;
  }

  /**
   * Limit number of returned entities.
   *
   * @param top - Maximum number of entities to return in the response. Can be less, if less entities match the request
   * @returns The request builder itself, to facilitate method chaining
   */
  top(top: number): this {
    this.requestConfig.top = top;
    return this;
  }

  /**
   * Skip number of entities.
   *
   * @param skip - Number of matching entities to skip. Useful for paging
   * @returns The request builder itself, to facilitate method chaining
   */
  skip(skip: number): this {
    this.requestConfig.skip = skip;
    return this;
  }

  /**
   * Count the number of entities.
   *
   * @returns A count request builder for execution
   */
  count(): CountRequestBuilder<EntityT> {
    return new CountRequestBuilder(this);
  }

  /**
   * Execute request.
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to the requested entities
   */
  async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<EntityT[]> {
    return this.executeRaw(destination, options)
      .then(({ response }) =>
        this.dataAccessor
          .getCollectionResult(response.data)
          .map(json =>
            this.entityDeserializer.deserializeEntity(
              json,
              this._entityConstructor,
              response.headers
            )
          )
      );
  }

  /**
   * Execute request and return the request and the raw response.
   *
   * @param destination - Destination to execute the request against
   * @param options - Options to employ when fetching destinations
   * @returns A promise resolving to an [[HttpRequestAndResponse]].
   */
  async executeRaw(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  ): Promise<HttpRequestAndResponse>{
    return this.build(destination, options)
      .then(request => request.executeRaw());
  }
}

export { GetAllRequestBuilder as GetAllRequestBuilderBase };
