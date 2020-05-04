/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Constructable } from '../../constructable';
import { Entity } from '../../entity';
import { Filterable } from '../../filter';
import { Orderable } from '../../order';
import { Selectable } from '../../selectable';
import { getQueryParametersForFilter } from './get-filters';
import { getQueryParametersForOrderBy } from './get-orderby';
import { getQueryParametersForSelection } from './get-selection';
import { ODataRequestConfig } from './odata-request-config';
import { WithGetAllRestrictions } from './odata-request-traits';
import { ODataV2 } from '../../odata-v2';

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
