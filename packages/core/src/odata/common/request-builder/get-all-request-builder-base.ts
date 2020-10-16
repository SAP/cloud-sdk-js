import {
  Constructable,
  EntityIdentifiable,
  Selectable,
  Orderable,
  EntityBase
} from '../../common';
import { MethodRequestBuilderBase } from '../../common/request-builder/request-builder-base';
import { ODataGetAllRequestConfig } from '../../common/request/odata-get-all-request-config';
import { DestinationOptions } from '../../../scp-cf';
import {
  Destination,
  DestinationNameAndJwt
} from '../../../scp-cf/destination/destination-service-types';
import { CountRequestBuilder } from '../../common/request-builder/count-request-builder';

/**
 * Base class for the get all request builders [[GetAllRequestBuilderV2]] and [[GetAllRequestBuilderV4]]
 *
 * @typeparam EntityT - Type of the entity to be requested
 */
export abstract class GetAllRequestBuilderBase<EntityT extends EntityBase>
  extends MethodRequestBuilderBase<ODataGetAllRequestConfig<EntityT>>
  implements EntityIdentifiable<EntityT> {
  readonly _entity: EntityT;

  /**
   * Creates an instance of GetAllRequestBuilder.
   *
   * @param _entityConstructor - Constructor of the entity to create the request for
   * @param getAllRequestConfig - Request config of the get all request.
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    getAllRequestConfig: ODataGetAllRequestConfig<EntityT>
  ) {
    super(getAllRequestConfig);
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
   * Add order-by statements to the request.
   *
   * @param orderBy - OrderBy statements to order the response by
   * @returns The request builder itself, to facilitate method chaining
   */
  orderBy(...orderBy: Orderable<EntityT>[]): this {
    this.requestConfig.orderBy = orderBy;
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
  abstract async execute(
    destination: Destination | DestinationNameAndJwt,
    options?: DestinationOptions
  );
}
