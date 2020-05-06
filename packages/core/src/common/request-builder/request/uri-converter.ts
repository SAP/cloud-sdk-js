/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { MapType } from '@sap-cloud-sdk/util';
import { Filterable } from '../../filter';
import { Entity } from '../../entity';
import { Constructable } from '../../constructable';
import { Orderable } from '../../order';
import { FieldType, Selectable } from '../../selectable';

export interface UriConverter {
  getQueryParametersForFilter<EntityT extends Entity>(
    filter: Filterable<EntityT>,
    entityConstructor: Constructable<EntityT>
  ): Partial<{ filter: string }>;

  getEntityKeys<EntityT extends Entity>(
    entity: EntityT,
    entityConstructor: Constructable<EntityT>
  ): MapType<any>;

  getQueryParametersForOrderBy<EntityT extends Entity>(
    orderBy: Orderable<EntityT>[]
  ): Partial<{ orderby: string }>;

  getResourcePathForKeys<EntityT extends Entity>(
    keys: MapType<FieldType>,
    entityConstructor: Constructable<EntityT>
  ): string;

  getQueryParametersForSelection<EntityT extends Entity>(
    selects: Selectable<EntityT>[]
  ): Partial<{ select: string; expand: string }>;

  getQueryParametersForExpansion?<EntityT extends Entity>(
    expands: any[], // Expandable<EntityT>[],
    entityConstructor: Constructable<EntityT>
  ): Partial<{ expand: string }>;
}
