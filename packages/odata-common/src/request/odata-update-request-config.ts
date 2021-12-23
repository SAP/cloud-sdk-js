import { DeSerializers } from '../de-serializers';
import { EntityBase, EntityApi } from '../entity-base';
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
   * @param entityApi - Entity API for building and executing the request.
   * @param oDataUri - TODO MM
   */
  constructor(
    readonly entityApi: EntityApi<EntityT, DeSerializersT>,
    private oDataUri: ODataUri<DeSerializersT>
  ) {
    super(
      UpdateStrategy.MODIFY_WITH_PATCH,
      entityApi.entityConstructor._defaultServicePath
    );
  }

  resourcePath(): string {
    return this.oDataUri.getResourcePathForKeys(this.keys, this.entityApi);
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
