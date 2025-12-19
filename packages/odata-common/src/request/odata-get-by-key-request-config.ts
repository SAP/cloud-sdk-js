import { ODataRequestConfig } from './odata-request-config';
import type { EntityBase } from '../entity-base';
import type { Expandable } from '../expandable';
import type { Selectable } from '../selectable';
import type { ODataUri } from '../uri-conversion';
import type { DeSerializers } from '../de-serializers';
import type { EntityApi } from '../entity-api';
import type { WithKeys, WithSelection } from './odata-request-traits';

/**
 * OData getByKey request configuration for an entity type.
 * @typeParam EntityT - Type of the entity to setup a request for
 */
export class ODataGetByKeyRequestConfig<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>
  extends ODataRequestConfig
  implements WithKeys, WithSelection<EntityT, DeSerializersT>
{
  keys: Record<string, any>;
  selects: Selectable<EntityT, DeSerializersT>[] = [];
  expands: Expandable<
    EntityT,
    DeSerializersT,
    EntityApi<EntityBase, DeSerializersT>
  >[];

  /**
   * Creates an instance of ODataGetByKeyRequestConfig.
   * @param entityApi - Entity API for building and executing the request.
   * @param oDataUri - URI conversion functions.
   */
  constructor(
    readonly entityApi: EntityApi<EntityT, DeSerializersT>,
    private oDataUri: ODataUri<DeSerializersT>
  ) {
    super('get', entityApi.entityConstructor._defaultBasePath);
  }

  resourcePath(): string {
    return this.oDataUri.getResourcePathForKeys(this.keys, this.entityApi);
  }

  queryParameters(): Record<string, any> {
    return this.prependDollarToQueryParameters({
      ...this.oDataUri.getSelect(this.selects),
      ...this.oDataUri.getExpand(this.selects, this.expands, this.entityApi)
    });
  }
}
