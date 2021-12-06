import { DeSerializers } from '../de-serializers';
import { EntityBase, Constructable } from '../entity-base';
import { ODataUri } from '../uri-conversion';
import { ODataRequestConfig } from './odata-request-config';
import { WithKeys, WithETag } from './odata-request-traits';

/**
 * OData update request configuration for an entity type.
 * @typeparam EntityT - Type of the entity to setup a request for
 * @internal
 */
export class ODataUpdateRequestConfig<
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
   * Creates an instance of ODataUpdateRequestConfig.
   * @param _entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    readonly _entitySchema: Record<string, any>,
    private oDataUri: ODataUri<DeSerializersT>
  ) {
    super(
      UpdateStrategy.MODIFY_WITH_PATCH,
      _entityConstructor._defaultServicePath
    );
  }

  resourcePath(): string {
    return this.oDataUri.getResourcePathForKeys(
      this.keys,
      this._entityConstructor,
      this._entitySchema
    );
  }

  queryParameters(): Record<string, any> {
    return this.prependDollarToQueryParameters({});
  }

  updateWithPut(): void {
    this.method = UpdateStrategy.REPLACE_WITH_PUT;
  }
}

enum UpdateStrategy {
  MODIFY_WITH_PATCH = 'patch',
  REPLACE_WITH_PUT = 'put'
}
