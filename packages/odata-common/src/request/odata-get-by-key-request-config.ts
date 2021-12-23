import { EntityBase, EntityApi } from '../entity-base';
import { Expandable } from '../expandable';
import { Selectable } from '../selectable';
import { ODataUri } from '../uri-conversion';
import { DeSerializers } from '../de-serializers';
import { WithKeys, WithSelection } from './odata-request-traits';
import { ODataRequestConfig } from './odata-request-config';

/**
 * OData getByKey request configuration for an entity type.
 * @typeparam EntityT - Type of the entity to setup a request for
 * @internal
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
  expands: Expandable<EntityT, DeSerializersT>[];

  /**
   * Creates an instance of ODataGetByKeyRequestConfig.
   * @param _entityApi - TODO MM
   * @param oDataUri - TODO MM
   */
  constructor(
    readonly _entityApi: EntityApi<EntityT, DeSerializersT>,
    private oDataUri: ODataUri<DeSerializersT>
  ) {
    super('get', _entityApi.entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return this.oDataUri.getResourcePathForKeys(this.keys, this._entityApi);
  }

  queryParameters(): Record<string, any> {
    return this.prependDollarToQueryParameters({
      format: 'json',
      ...this.oDataUri.getSelect(this.selects),
      ...this.oDataUri.getExpand(this.selects, this.expands, this._entityApi)
    });
  }
}
