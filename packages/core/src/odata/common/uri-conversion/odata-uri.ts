/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Selectable, FieldType } from '../selectable';
import { Expandable } from '../expandable';
import { EntityBase, Constructable } from '../entity';
import { Filterable } from '../filter';
import { Orderable } from '../order';
import { EdmTypeShared } from '../edm-types';

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export interface ODataUri {
  getExpand<EntityT extends EntityBase>(
    selects: Selectable<EntityT>[],
    expands: Expandable<EntityT>[],
    entityConstructor: Constructable<EntityT>
  ): Partial<{ expand: string }>;
  getFilter<EntityT extends EntityBase>(
    filter: Filterable<EntityT>,
    entityConstructor: Constructable<EntityT>
  ): Partial<{ filter: string }>;
  getEntityKeys<EntityT extends EntityBase>(
    entity: EntityT,
    entityConstructor: Constructable<EntityT>
  ): MapType<any>;
  getOrderBy<EntityT extends EntityBase>(
    orderBy: Orderable<EntityT>[]
  ): Partial<{ orderby: string }>;
  getResourcePathForKeys<EntityT extends EntityBase>(
    keys: MapType<FieldType>,
    entityConstructor: Constructable<EntityT>
  ): string;
  getSelect<EntityT extends EntityBase>(
    selects: Selectable<EntityT>[]
  ): Partial<{ select: string }>;
  convertToUriFormat(value: any, edmType: EdmTypeShared<'any'>): string;
}

export function prependDollar(param: string): string {
  return `$${param}`;
}
