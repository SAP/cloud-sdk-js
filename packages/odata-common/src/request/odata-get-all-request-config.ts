import { EntityBase } from '../entity-base';
import { Selectable } from '../selectable';
import { Filterable } from '../filter';
import { Expandable } from '../expandable';
import { Orderable } from '../order';
import { ODataUri } from '../uri-conversion';
import { DeSerializers } from '../de-serializers';
import { EntityApi } from '../entity-api';
import { ODataRequestConfig } from './odata-request-config';
import { WithGetAllRestrictions } from './odata-request-traits';

/**
 * OData getAll request configuration for an entity type.
 * @typeparam EntityT - Type of the entity to setup a request for
 * @internal
 */
export class ODataGetAllRequestConfig<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers
  >
  extends ODataRequestConfig
  implements WithGetAllRestrictions<EntityT, DeSerializersT>
{
  top: number;
  skip: number;
  filter: Filterable<EntityT, DeSerializersT>;
  orderBy: Orderable<EntityT>[];
  selects: Selectable<EntityT, DeSerializersT>[];
  expands: Expandable<
    EntityT,
    DeSerializersT,
    EntityApi<EntityBase, DeSerializersT>
  >[];

  /**
   * Creates an instance of ODataGetAllRequestConfig.
   * @param entityApi - Entity API for building and executing the request.
   * @param oDataUri - URI conversion functions.
   */
  constructor(
    readonly entityApi: EntityApi<EntityT, DeSerializersT>,
    private oDataUri: ODataUri<DeSerializersT>
  ) {
    super('get', entityApi.entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return this.entityApi.entityConstructor._entityName;
  }

  queryParameters(): Record<string, any> {
    const params: Record<string, any> = {
      ...this.oDataUri.getSelect(this.selects),
      ...this.oDataUri.getExpand(this.selects, this.expands, this.entityApi),
      ...this.oDataUri.getFilter(this.filter, this.entityApi),
      ...this.oDataUri.getOrderBy(this.orderBy)
    };
    if (typeof this.top !== 'undefined') {
      params.top = this.top;
    }
    if (typeof this.skip !== 'undefined') {
      params.skip = this.skip;
    }
    return this.prependDollarToQueryParameters(params);
  }
}
