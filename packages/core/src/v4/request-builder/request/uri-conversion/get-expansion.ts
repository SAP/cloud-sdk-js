/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity } from '../../../entity';
import { OneToManyLink, AllFields } from '../../../selectable';
import { Expandable } from '../../../selectable/expandable';
import { Constructable } from '../../../constructable';
import { getQueryParametersForSelection } from './get-selection';
import { getQueryParametersForFilter } from './get-filters';

function prependDollar(param: string): string {
  return `$${param}`;
}

export function getQueryParametersForExpansion<EntityT extends Entity>(
  expands: Expandable<EntityT>[],
  entityConstructor: Constructable<EntityT>
): Partial<{ expand: string }> {
  return {
    expand: expands
      .map(expand => getExpand(expand, entityConstructor))
      .join(',')
  };
}

function getExpand<EntityT extends Entity>(
  expand: Expandable<EntityT>,
  entityConstructor: Constructable<EntityT>
): string {
  if (expand instanceof AllFields) {
    return '*';
  }

  let params = {
    ...getQueryParametersForSelection(expand._selects),
    ...getQueryParametersForExpansion(expand._expand, expand._linkedEntity)
  };

  if (expand instanceof OneToManyLink) {
    params = {
      ...params,
      ...getQueryParametersForFilter(expand._filters, entityConstructor),
      ...(expand._skip && { skip: expand._skip }),
      ...(expand._top && { top: expand._top })
    };
  }
  const subQuery = Object.entries(params)
    .map(([key, value]) => `${prependDollar(key)}=${value}`)
    .join(',');

  return `${expand._linkedEntity._entityName}(${subQuery})`;
}
