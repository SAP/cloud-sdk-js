/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { Selectable, FieldType } from '../selectable';
import { Expandable } from '../expandable';
import { EntityBase, Constructable } from '../entity';
import { Filterable } from '../filter';
import { Orderable } from '../order';
import { EdmTypeShared } from '../edm-types';

/**
 * Union of necessary methods for the OData URI conversion.
 * In v2/uri-conversion/odata-uri.ts and v4/uri-conversion/odata-uri.ts the instance for v2 and v4 are created.
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
  convertToUriFormat(
    value: any,
    edmType: EdmTypeShared<'v2'> | EdmTypeShared<'v4'>
  ): string;
}

export function prependDollar(param: string): string {
  return `$${param}`;
}
