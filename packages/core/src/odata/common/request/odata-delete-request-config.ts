/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Constructable, EntityBase } from '../entity';
import { FieldType } from '../selectable';
import { ODataUri } from '../uri-conversion';
import { ODataRequestConfig } from './odata-request-config';
import { WithKeys, WithETag } from './odata-request-traits';

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 * OData delete request configuration for an entity type.
 *
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataDeleteRequestConfig<EntityT extends EntityBase>
  extends ODataRequestConfig
  implements WithKeys, WithETag {
  keys: MapType<FieldType>;
  eTag: string;
  versionIdentifierIgnored = false;

  /**
   * Creates an instance of ODataDeleteRequestConfig.
   *
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

  queryParameters(): MapType<any> {
    return this.prependDollarToQueryParameters({});
  }
}
