/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Constructable, ConstructableODataV4 } from '../../constructable';
import { Entity, EntityODataV4 } from '../../entity';
import { FieldType, Selectable, SelectableODataV4 } from '../../selectable';
import { getResourcePathForKeys, getResourcePathForKeysODataV4 } from './get-resource-path';
import { getQueryParametersForSelection, getQueryParametersForSelectionODataV4 } from './get-selection';
import { ODataRequestConfig } from './odata-request-config';
import { WithKeys, WithSelection, WithSelectionODataV4 } from './odata-request-traits';

/**
 * OData getByKey request configuration for an entity type.
 *
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataGetByKeyRequestConfig<EntityT extends Entity>
  extends ODataRequestConfig
  implements WithKeys, WithSelection<EntityT> {
  keys: MapType<FieldType>;
  selects: Selectable<EntityT>[] = [];

  /**
   * Creates an instance of ODataGetByKeyRequestConfig.
   *
   * @param entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(readonly entityConstructor: Constructable<EntityT>) {
    super('get', entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return getResourcePathForKeys(this.keys, this.entityConstructor);
  }

  queryParameters(): MapType<any> {
    return this.prependDollarToQueryParameters({
      format: 'json',
      ...getQueryParametersForSelection(this.selects)
    });
  }
}

export class ODataGetByKeyRequestConfigODataV4<EntityT extends EntityODataV4>
  extends ODataRequestConfig
  implements WithKeys, WithSelectionODataV4<EntityT> {
  keys: MapType<FieldType>;
  selects: SelectableODataV4<EntityT>[] = [];

  /**
   * Creates an instance of ODataGetByKeyRequestConfig.
   *
   * @param entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(readonly entityConstructor: ConstructableODataV4<EntityT>) {
    super('get', entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return getResourcePathForKeysODataV4(this.keys, this.entityConstructor);
  }

  queryParameters(): MapType<any> {
    return this.prependDollarToQueryParameters({
      format: 'json',
      ...getQueryParametersForSelectionODataV4(this.selects)
    });
  }
}
