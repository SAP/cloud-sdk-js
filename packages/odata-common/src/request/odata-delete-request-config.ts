import type { DeSerializers } from '../de-serializers';
import type { EntityBase } from '../entity-base';
import type { ODataUri } from '../uri-conversion';
import type { EntityApi } from '../entity-api';
import { ODataRequestConfig } from './odata-request-config';
import type { WithKeys, WithETag } from './odata-request-traits';

/**
 * OData delete request configuration for an entity type.
 * @typeParam EntityT - Type of the entity to setup a request for
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
   * @param entityApi - Entity API for building and executing the request.
   * @param oDataUri - URI conversion functions.
   */
  constructor(
    readonly entityApi: EntityApi<EntityT, DeSerializersT>,
    private oDataUri: ODataUri<DeSerializersT>
  ) {
    super('delete', entityApi.entityConstructor._defaultBasePath);
  }

  resourcePath(): string {
    return this.oDataUri.getResourcePathForKeys(this.keys, this.entityApi);
  }

  queryParameters(): Record<string, any> {
    return this.prependDollarToQueryParameters({});
  }
}
