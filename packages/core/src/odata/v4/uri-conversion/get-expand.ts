/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity } from '../entity';
import { Expandable } from '../../common/expandable';
import { Constructable, AllFields, Link, and } from '../../common';
import { OneToManyLink } from '../../common/selectable/one-to-many-link';
import { getFilter } from './get-filter';
import { getSelect } from './get-select';

function prependDollar(param: string): string {
  return `$${param}`;
}

export function getExpand<EntityT extends Entity>(
  expands: Expandable<EntityT>[] = [],
  entityConstructor: Constructable<EntityT>
): Partial<{ expand: string }> {
  return expands.length
    ? {
        expand: expands
          .map(expand => getExpandAsString(expand, entityConstructor))
          .join(',')
      }
    : {};
}

function getExpandAsString<EntityT extends Entity>(
  expand: Expandable<EntityT>,
  entityConstructor: Constructable<EntityT>
): string {
  if (expand instanceof AllFields) {
    return '*';
  }

  let params = {};

  if (expand instanceof Link) {
    params = {
      ...params,
      ...getSelect(expand._selects),
      ...getExpand(expand._expand, expand._linkedEntity)
    };

    if (expand instanceof OneToManyLink) {
      params = {
        ...params,
        ...getFilter(and(...expand._filters?.filters), entityConstructor),
        ...(expand._skip && { skip: expand._skip }),
        ...(expand._top && { top: expand._top })
      };
    }
    const subQuery = Object.entries(params)
      .map(([key, value]) => `${prependDollar(key)}=${value}`)
      .join(';');
    const subQueryWithBrackets = subQuery ? `(${subQuery})` : '';

    return `${expand._fieldName}${subQueryWithBrackets}`;
  }

  return '';
}
