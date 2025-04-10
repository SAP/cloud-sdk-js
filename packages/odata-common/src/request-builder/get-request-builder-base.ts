import { transformVariadicArgumentToArray } from '@sap-cloud-sdk/util';
import { MethodRequestBuilder } from './request-builder-base';
import type { HttpDestinationOrFetchOptions } from '@sap-cloud-sdk/connectivity';
import type { HttpResponse } from '@sap-cloud-sdk/http-client';
import type {
  Constructable,
  EntityIdentifiable,
  EntityBase
} from '../entity-base';
import type { Selectable } from '../selectable';
import type {
  ODataGetAllRequestConfig,
  ODataGetByKeyRequestConfig
} from '../request';
import type { DeSerializers } from '../de-serializers';
import type { EntityApi } from '../entity-api';

/**
 * @internal
 */
export abstract class GetRequestBuilderBase<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers,
    RequestConfigT extends
      | ODataGetAllRequestConfig<EntityT, DeSerializersT>
      | ODataGetByKeyRequestConfig<EntityT, DeSerializersT>
  >
  extends MethodRequestBuilder<RequestConfigT>
  implements EntityIdentifiable<EntityT, DeSerializersT>
{
  readonly _entity: EntityT;
  readonly _entityConstructor: Constructable<EntityT>;
  readonly _deSerializers: DeSerializersT;

  /**
   * Creates an instance of GetAllRequestBuilder.
   * @param _entityApi - Entity API for building and executing the request.
   * @param requestConfig - Request config of the get all or get by key request.
   */
  constructor(
    readonly _entityApi: EntityApi<EntityT, DeSerializersT>,
    requestConfig: RequestConfigT
  ) {
    super(requestConfig);
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
   * Execute request and return an {@link @sap-cloud-sdk/http-client!HttpResponse}.
   * @param destination - Destination or DestinationFetchOptions to execute the request against.
   * @returns A promise resolving to an {@link @sap-cloud-sdk/http-client!HttpResponse}.
   */
  async executeRaw(
    destination: HttpDestinationOrFetchOptions
  ): Promise<HttpResponse> {
    return this.build(destination).then(request => request.execute());
  }
}
