import { Constructable, Entity } from '../entity';
import { Link } from '../selectable';
import { ODataUri } from '../uri-conversion';
import { ODataRequestConfig } from './odata-request-config';

/**
 * OData create request configuration for an entity type.
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataCreateRequestConfig<
  EntityT extends Entity
> extends ODataRequestConfig {
  /**
   * Keys of the parent of the entity to create. Defined only when attempting to create child entities.
   */
  parentKeys: Record<string, any>;

  /**
   * Field that links the parent entity class to the child entity class.
   */
  childField: Link<Entity, EntityT>;

  /**
   * Creates an instance of ODataRequest.
   * @param _entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    private oDataUri: ODataUri
  ) {
    super('post', _entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return this.parentKeys === undefined
      ? this._entityConstructor._entityName
      : this.resourcePathAsChild();
  }

  queryParameters(): Record<string, any> {
    return this.prependDollarToQueryParameters({});
  }

  protected resourcePathAsChild(): string {
    return (
      this.oDataUri.getResourcePathForKeys(
        this.parentKeys,
        this.childField._entityConstructor
      ) +
      '/' +
      this.childField._fieldName
    );
  }
}
