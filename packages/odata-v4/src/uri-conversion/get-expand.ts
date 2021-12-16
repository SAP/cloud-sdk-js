import {
  Expandable,
  OneToManyLink,
  AllFields,
  Link,
  and,
  createGetFilter,
  getOrderBy,
  EntityApi
} from '@sap-cloud-sdk/odata-common/internal';
import { DeSerializers } from '../de-serializers';
import { Entity } from '../entity';
import { getSelect } from './get-select';
import { uriConverter } from './uri-value-converter';

function prependDollar(param: string): string {
  return `$${param}`;
}

/**
 * Get an object containing the given expand as a query parameter, or an empty object if none was given.
 * @typeparam EntityT - Type of the entity to expand on
 * @param expands - The expands to transform to a query parameter
 * @param entityApi - EntityApi object on which the expand is constructed
 * @returns An object containing the query parameter or an empty object
 * @internal
 */
export function getExpand<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers
>(
  expands: Expandable<EntityT, DeSerializersT>[] = [],
  entityApi: EntityApi<EntityT, DeSerializersT>
): Partial<{ expand: string }> {
  return expands.length
    ? {
        expand: expands
          .map(expand => getExpandAsString(expand, entityApi))
          .join(',')
      }
    : {};
}

function getExpandAsString<
  EntityT extends Entity,
  DeSerializersT extends DeSerializers
>(
  expand: Expandable<EntityT, DeSerializersT>,
  entityApi: EntityApi<EntityT, DeSerializersT>
): string {
  if (expand instanceof AllFields) {
    return '*';
  }

  let params = {};

  if (expand instanceof Link) {
    params = {
      ...params,
      ...getSelect(expand._selects),
      ...getExpand(expand._expand, expand._linkedEntityApi)
    };

    if (expand instanceof OneToManyLink) {
      params = {
        ...params,
        ...createGetFilter(uriConverter).getFilter(
          and(expand._filters?.filters || []),
          entityApi
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
