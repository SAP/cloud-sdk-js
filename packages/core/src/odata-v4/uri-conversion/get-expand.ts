import { Entity } from '../entity';
import {
  Expandable,
  OneToManyLink,
  Constructable,
  AllFields,
  Link,
  and,
  createGetFilter,
  getOrderBy
} from '@sap-cloud-sdk/odata-common';
import { getSelect } from './get-select';
import { uriConverter } from './uri-value-converter';

function prependDollar(param: string): string {
  return `$${param}`;
}

/**
 * Get an object containing the given expand as a query parameter, or an empty object if none was given.
 * @typeparam EntityT - Type of the entity to expand on
 * @param expands - The expands to transform to a query parameter
 * @param entityConstructor - Constructor type of the entity to expand on
 * @returns An object containing the query parameter or an empty object
 */
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
        ...createGetFilter(uriConverter).getFilter(
          and(...expand._filters?.filters),
          entityConstructor
        ),
        ...(expand._skip && { skip: expand._skip }),
        ...(expand._top && { top: expand._top }),
        ...(expand._orderBy && getOrderBy(expand._orderBy))
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

export { getExpand as getExpandV4 };
