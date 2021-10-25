import { Constructable, Entity } from '../entity';

import { ODataRequestConfig } from './odata-request-config';
import { WithKeys, WithETag } from './odata-request-traits';
import {ODataUri} from "../uri-conversion/odata-uri";
import {FieldType} from "../selectable/field";

/**
 * OData delete request configuration for an entity type.
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataDeleteRequestConfig<EntityT extends Entity>
  extends ODataRequestConfig
  implements WithKeys, WithETag
{
  keys: Record<string, FieldType>;
  eTag: string;
  versionIdentifierIgnored = false;

  /**
   * Creates an instance of ODataDeleteRequestConfig.
   * @param entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(
    readonly entityConstructor: Constructable<EntityT>,
    private oDataUri: ODataUri
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
