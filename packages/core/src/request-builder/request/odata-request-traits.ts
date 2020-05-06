/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Entity } from '../../entity';
import { Filterable } from '../../filter';
import { Orderable } from '../../order';
import { FieldType, Selectable } from '../../selectable';
import { ODataV2 } from '../../odata-v2';

/**
 * @hidden
 */
export interface WithKeys {
  keys: MapType<FieldType>;
}

/**
 * @hidden
 */
export interface WithSelection<EntityT extends Entity<Version>,Version=ODataV2> {
  selects: Selectable<EntityT,Version>[];
}

/**
 * @hidden
 */
export interface WithGetAllRestrictions<EntityT extends Entity<Version>,Version=ODataV2>
  extends WithSelection<EntityT,Version> {
  top: number;
  skip: number;
  filter: Filterable<EntityT,Version>;
  orderBy: Orderable<EntityT,Version>[];
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
