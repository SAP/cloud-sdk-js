/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Constructable, ConstructableODataV4 } from '../../constructable';
import { Entity, EntityODataV4 } from '../../entity';
import { Filterable, FilterableODataV4 } from '../../filter';
import { Orderable, OrderableODataV4 } from '../../order';
import { Selectable, SelectableODataV4 } from '../../selectable';
import { getQueryParametersForFilter, getQueryParametersForFilterODataV4 } from './get-filters';
import { getQueryParametersForOrderBy, getQueryParametersForOrderByODataV4 } from './get-orderby';
import { getQueryParametersForSelection, getQueryParametersForSelectionODataV4 } from './get-selection';
import { ODataRequestConfig } from './odata-request-config';
import { WithGetAllRestrictions, WithGetAllRestrictionsODataV4 } from './odata-request-traits';

/**
 * OData getAll request configuration for an entity type.
 *
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataGetAllRequestConfig<EntityT extends Entity>
  extends ODataRequestConfig
  implements WithGetAllRestrictions<EntityT> {
  top: number;
  skip: number;
  filter: Filterable<EntityT>;
  orderBy: Orderable<EntityT>[];
  selects: Selectable<EntityT>[];

  /**
   * Creates an instance of ODataGetAllRequestConfig.
   *
   * @param entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(readonly entityConstructor: Constructable<EntityT>) {
    super('get', entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return this.entityConstructor._entityName;
  }

  queryParameters(): MapType<any> {
    const params: MapType<any> = {
      format: 'json',
      ...getQueryParametersForSelection(this.selects),
      ...getQueryParametersForFilter(this.filter, this.entityConstructor),
      ...getQueryParametersForOrderBy(this.orderBy)
    };
    if (typeof this.top !== 'undefined') {
      params.top = this.top;
    }
    if (typeof this.skip !== 'undefined') {
      params.skip = this.skip;
    }
    return this.prependDollarToQueryParameters(params);
  }
}

export class ODataGetAllRequestConfigODataV4<EntityT extends EntityODataV4>
  extends ODataRequestConfig
  implements WithGetAllRestrictionsODataV4<EntityT> {
  top: number;
  skip: number;
  filter: FilterableODataV4<EntityT>;
  orderBy: OrderableODataV4<EntityT>[];
  selects: SelectableODataV4<EntityT>[];

  /**
   * Creates an instance of ODataGetAllRequestConfig.
   *
   * @param entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(readonly entityConstructor: ConstructableODataV4<EntityT>) {
    super('get', entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return this.entityConstructor._entityName;
  }

  queryParameters(): MapType<any> {
    const params: MapType<any> = {
      format: 'json',
      ...getQueryParametersForSelectionODataV4(this.selects),
      ...getQueryParametersForFilterODataV4(this.filter, this.entityConstructor),
      ...getQueryParametersForOrderByODataV4(this.orderBy)
    };
    if (typeof this.top !== 'undefined') {
      params.top = this.top;
    }
    if (typeof this.skip !== 'undefined') {
      params.skip = this.skip;
    }
    return this.prependDollarToQueryParameters(params);
  }
}
