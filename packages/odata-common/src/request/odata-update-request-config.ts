import { Entity, Constructable } from '../entity';

import { ODataRequestConfig } from './odata-request-config';
import { WithKeys, WithETag } from './odata-request-traits';
import {ODataUri} from "../uri-conversion/odata-uri";
import {FieldType} from "../selectable/field";

/**
 * OData update request configuration for an entity type.
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataUpdateRequestConfig<EntityT extends Entity>
  extends ODataRequestConfig
  implements WithKeys, WithETag
{
  keys: Record<string, FieldType>;
  eTag: string;
  versionIdentifierIgnored = false;

  /**
   * Creates an instance of ODataUpdateRequestConfig.
   * @param _entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(
    readonly _entityConstructor: Constructable<EntityT>,
    private oDataUri: ODataUri
  ) {
    super(
      UpdateStrategy.MODIFY_WITH_PATCH,
      _entityConstructor._defaultServicePath
    );
  }

  resourcePath(): string {
    return this.oDataUri.getResourcePathForKeys(
      this.keys,
      this._entityConstructor
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
