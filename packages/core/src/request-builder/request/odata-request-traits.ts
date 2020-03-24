/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Entity } from '../../entity';
import { Filterable } from '../../filter';
import { Orderable } from '../../order';
import { FieldType, Selectable } from '../../selectable';

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
