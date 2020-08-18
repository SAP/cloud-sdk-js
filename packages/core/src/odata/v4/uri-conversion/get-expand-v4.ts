/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityV4 } from '../entity-v4';
import { Expandable } from '../../common/expandable';
import {
  Constructable,
  AllFields,
  Link,
  and,
  createGetFilter
} from '../../common';
import { OneToManyLink } from '../../common/selectable/one-to-many-link';
import { getSelectV4 } from './get-select-v4';
import { uriConverterV4 } from './uri-value-converter-v4';

function prependDollar(param: string): string {
  return `$${param}`;
}

/**
 * Get an object containing the given expand as a query parameter, or an empty object if none was given.
 *
 * @typeparam EntityT - Type of the entity to expand on
 * @param expands - The expands to transform to a query parameter
 * @param entityConstructor - Constructor type of the entity to expand on
 * @returns An object containing the query parameter or an empty object
 */
export function getExpandV4<EntityT extends EntityV4>(
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

function getExpandAsString<EntityT extends EntityV4>(
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
      ...getSelectV4(expand._selects),
      ...getExpandV4(expand._expand, expand._linkedEntity)
    };

    if (expand instanceof OneToManyLink) {
      params = {
        ...params,
        ...createGetFilter(uriConverterV4).getFilter(
          and(...expand._filters?.filters),
          entityConstructor
        ),
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
