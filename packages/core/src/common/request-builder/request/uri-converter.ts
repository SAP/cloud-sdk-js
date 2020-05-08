/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { MapType } from '@sap-cloud-sdk/util';
import { Filterable } from '../../filter';
import { EntityBase } from '../../entity';
import { Constructable } from '../../constructable';
import { Orderable } from '../../order';
import { FieldType, Selectable } from '../../selectable';

export interface UriConverter {
  getQueryParametersForFilter<EntityT extends EntityBase>(
    filter: Filterable<EntityT>,
    entityConstructor: Constructable<EntityT>
  ): Partial<{ filter: string }>;

  getEntityKeys<EntityT extends EntityBase>(
    entity: EntityT,
    entityConstructor: Constructable<EntityT>
  ): MapType<any>;

  getQueryParametersForOrderBy<EntityT extends EntityBase>(
    orderBy: Orderable<EntityT>[]
  ): Partial<{ orderby: string }>;

  getResourcePathForKeys<EntityT extends EntityBase>(
    keys: MapType<FieldType>,
    entityConstructor: Constructable<EntityT>
  ): string;

  getQueryParametersForSelection<EntityT extends EntityBase>(
    selects: Selectable<EntityT>[]
  ): Partial<{ select: string; expand: string }>;

  getQueryParametersForExpansion?<EntityT extends EntityBase>(
    expands: any[], // Expandable<EntityT>[],
    entityConstructor: Constructable<EntityT>
  ): Partial<{ expand: string }>;

  // TODO: EdmType<EntityT>
  convertToUriFormat<EntityT extends EntityBase>(
    value: any,
    edmType: any // EdmType<EntityT>
  ): string;

  convertToUriForEdmString(value: any): string;
}
