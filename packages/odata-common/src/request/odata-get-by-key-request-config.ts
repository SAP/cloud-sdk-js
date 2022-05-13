import { EntityBase } from '../entity-base';
import { Expandable } from '../expandable';
import { Selectable } from '../selectable';
import { ODataUri } from '../uri-conversion';
import { DeSerializers } from '../de-serializers';
import { EntityApi } from '../entity-api';
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
    super('get', entityApi.entityConstructor._defaultServicePath);
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
