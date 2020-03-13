/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Constructable } from '../../constructable';
import { Entity } from '../../entity';
import { FieldType, Selectable } from '../../selectable';
import { getResourcePathForKeys } from './get-resource-path';
import { getQueryParametersForSelection } from './get-selection';
import { ODataRequestConfig } from './odata-request-config';
import { WithKeys, WithSelection } from './odata-request-traits';

/**
 * OData getByKey request configuration for an entity type.
 *
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataGetByKeyRequestConfig<EntityT extends Entity> extends ODataRequestConfig implements WithKeys, WithSelection<EntityT> {
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
