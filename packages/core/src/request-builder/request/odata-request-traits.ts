/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Entity, EntityODataV4 } from '../../entity';
import { Filterable, FilterableODataV4 } from '../../filter';
import { Orderable, OrderableODataV4 } from '../../order';
import { FieldType, Selectable, SelectableODataV4 } from '../../selectable';

/**
 * @hidden
 */
export interface WithKeys {
  keys: MapType<FieldType>;
}

/**
 * @hidden
 */
export interface WithSelection<EntityT extends Entity> {
  selects: Selectable<EntityT>[];
}

export interface WithSelectionODataV4<EntityT extends EntityODataV4> {
  selects: SelectableODataV4<EntityT>[];
}

/**
 * @hidden
 */
export interface WithGetAllRestrictions<EntityT extends Entity>
  extends WithSelection<EntityT> {
  top: number;
  skip: number;
  filter: Filterable<EntityT>;
  orderBy: Orderable<EntityT>[];
}

export interface WithGetAllRestrictionsODataV4<EntityT extends EntityODataV4>
  extends WithSelectionODataV4<EntityT> {
  top: number;
  skip: number;
  filter: FilterableODataV4<EntityT>;
  orderBy: OrderableODataV4<EntityT>[];
}

/**
 * @hidden
 */
export interface WithETag {
  eTag: string;
  versionIdentifierIgnored: boolean;
}

export function isWithETag(config: any): config is WithETag {
  return 'eTag' in config || 'versionIdentifierIgnored' in config;
}
