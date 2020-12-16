import { variadicArgumentToArray } from '@sap-cloud-sdk/util';
import { Constructable, EntityIdentifiable, EntityBase } from '../entity';
import { Selectable } from '../selectable/selectable';
import { ODataGetAllRequestConfig } from '../request/odata-get-all-request-config';
import { MethodRequestBuilderBase } from '../request-builder/request-builder-base';
import { ODataGetByKeyRequestConfig } from '../request';

/**
 * Base class for the get all and get by key request builders.
 *
 * @typeparam EntityT - Type of the entity to be requested.
 */
export abstract class GetRequestBuilderBase<
    EntityT extends EntityBase,
    RequestConfigT extends
      | ODataGetAllRequestConfig<EntityT>
      | ODataGetByKeyRequestConfig<EntityT>
  >
  extends MethodRequestBuilderBase<RequestConfigT>
  implements EntityIdentifiable<EntityT> {
  readonly _entity: EntityT;

  /**
   * Creates an instance of GetAllRequestBuilder.
   *
   * @param _entityConstructor - Constructor of the entity to create the request for
   * @param requestConfig - Request config of the get all or get by key request.
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    requestConfig: RequestConfigT
  ) {
    super(requestConfig);
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
}
