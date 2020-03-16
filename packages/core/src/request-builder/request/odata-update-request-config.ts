/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Constructable } from '../../constructable';
import { Entity } from '../../entity';
import { FieldType } from '../../selectable';
import { getResourcePathForKeys } from './get-resource-path';
import { ODataRequestConfig } from './odata-request-config';
import { WithKeys } from './odata-request-traits';

/**
 * OData update request configuration for an entity type.
 *
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataUpdateRequestConfig<EntityT extends Entity> extends ODataRequestConfig implements WithKeys {
  keys: MapType<FieldType>;
  eTag: string;
  versionIdentifierIgnored = false;

  /**
   * Creates an instance of ODataUpdateRequestConfig.
   *
   * @param _entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(readonly _entityConstructor: Constructable<EntityT>) {
    super(UpdateStrategy.MODIFY_WITH_PATCH, _entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return getResourcePathForKeys(this.keys, this._entityConstructor);
  }

  queryParameters(): MapType<any> {
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
