import { DeSerializers } from '../de-serializers';
import { Constructable, EntityBase } from '../entity-base';
import { ODataUri } from '../uri-conversion';
import { ODataRequestConfig } from './odata-request-config';
import { WithKeys, WithETag } from './odata-request-traits';

/**
 * OData delete request configuration for an entity type.
 * @typeparam EntityT - Type of the entity to setup a request for
 * @internal
 */
export class ODataDeleteRequestConfig<
    EntityT extends EntityBase,
    DeSerializersT extends DeSerializers
  >
  extends ODataRequestConfig
  implements WithKeys, WithETag
{
  keys: Record<string, any>;
  eTag: string;
  versionIdentifierIgnored = false;

  /**
   * Creates an instance of ODataDeleteRequestConfig.
   * @param entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(
    readonly entityConstructor: Constructable<EntityT>,
    private oDataUri: ODataUri<DeSerializersT>
  ) {
    super('delete', entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return this.oDataUri.getResourcePathForKeys(
      this.keys,
      this.entityConstructor
    );
  }

  queryParameters(): Record<string, any> {
    return this.prependDollarToQueryParameters({});
  }
}
