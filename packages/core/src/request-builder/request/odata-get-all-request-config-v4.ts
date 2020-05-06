/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Constructable } from '../../constructable';
import { Entity } from '../../entity';
import { Filterable } from '../../filter';
import { Orderable } from '../../order';
import { Selectable } from '../../selectable';
import { ODataV4 } from '../../odata-v4';
import { getQueryParametersForOrderBy } from './get-orderby';
import { getQueryParametersForSelection } from './get-selection';
import { ODataRequestConfig } from './odata-request-config';
import { WithGetAllRestrictions } from './odata-request-traits';

/**
 * OData getAll request configuration for an entity type.
 *
 * @typeparam EntityT - Type of the entity to setup a request for
 */
export class ODataGetAllRequestConfigV4<EntityT extends Entity<ODataV4>>
  extends ODataRequestConfig
  implements WithGetAllRestrictions<EntityT,ODataV4> {
  top: number;
  skip: number;
  filter: Filterable<EntityT,ODataV4>;
  orderBy: Orderable<EntityT,ODataV4>[];
  selects: Selectable<EntityT,ODataV4>[];

  /**
   * Creates an instance of ODataGetAllRequestConfig.
   *
   * @param entityConstructor - Constructor type of the entity to create a configuration for
   */
  constructor(readonly entityConstructor: Constructable<EntityT, {}, ODataV4>) {
    super('get', entityConstructor._defaultServicePath);
  }

  resourcePath(): string {
    return this.entityConstructor._entityName;
  }

  queryParameters(): MapType<any> {
    const params: MapType<any> = {
      format: 'json',
      ...getQueryParametersForSelection(this.selects),
      // STOP here for PoC
      // ...getQueryParametersForFilter(this.filter, this.entityConstructor),
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
