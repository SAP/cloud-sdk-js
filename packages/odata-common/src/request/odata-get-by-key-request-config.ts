import { EntityBase, Constructable } from '../entity-base';
import { Expandable } from '../expandable';
import { Selectable } from '../selectable/selectable';
import { ODataUri } from '../uri-conversion/odata-uri';
import { WithKeys, WithSelection } from './odata-request-traits';
import { ODataRequestConfig } from './odata-request-config';

/**
 * OData getByKey request configuration for an entity type.
 * @typeparam EntityT - Type of the entity to setup a request for
 * @internal
 */
export class ODataGetByKeyRequestConfig<EntityT extends EntityBase>
  extends ODataRequestConfig
  implements WithKeys, WithSelection<EntityT>
{
  keys: Record<string, any>;
  selects: Selectable<EntityT>[] = [];
  expands: Expandable<EntityT>[];

  /**
   * Creates an instance of ODataGetByKeyRequestConfig.
   * @param entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(
    readonly entityConstructor: Constructable<EntityT>,
    private oDataUri: ODataUri
  ) {
    super('get', entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return this.oDataUri.getResourcePathForKeys(
      this.keys,
      this.entityConstructor
    );
  }

  queryParameters(): Record<string, any> {
    return this.prependDollarToQueryParameters({
      format: 'json',
      ...this.oDataUri.getSelect(this.selects),
      ...this.oDataUri.getExpand(
        this.selects,
        this.expands,
        this.entityConstructor
      )
    });
  }
}
