import { EntityBase } from '../entity-base';
import { ODataUri } from '../uri-conversion';
import { Link } from '../selectable';
import { DeSerializers } from '../de-serializers';
import { EntityApi } from '../entity-api';
import { ODataRequestConfig } from './odata-request-config';

/**
 * OData create request configuration for an entity type.
 * @typeParam EntityT - Type of the entity to setup a request for
 */
export class ODataCreateRequestConfig<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> extends ODataRequestConfig {
  /**
   * Keys of the parent of the entity to create. Defined only when attempting to create child entities.
   */
  parentKeys: Record<string, any>;

  /**
   * Field that links the parent entity class to the child entity class.
   */
  childField: Link<EntityBase, DeSerializersT, EntityApi<EntityT, any>>;

  /**
   * Creates an instance of ODataRequest.
   * @param entityApi - Entity API for building and executing the request.
   * @param oDataUri - URI conversion functions.
   */
  constructor(
    readonly entityApi: EntityApi<EntityT, DeSerializersT>,
    private oDataUri: ODataUri<DeSerializersT>
  ) {
    super('post', entityApi.entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return this.parentKeys === undefined
      ? this.entityApi.entityConstructor._entityName
      : this.resourcePathAsChild();
  }

  queryParameters(): Record<string, any> {
    return this.prependDollarToQueryParameters({});
  }

  protected resourcePathAsChild(): string {
    return (
      this.oDataUri.getResourcePathForKeys(
        this.parentKeys,
        this.childField._entityApi
      ) +
      '/' +
      this.childField._fieldName
    );
  }
}
