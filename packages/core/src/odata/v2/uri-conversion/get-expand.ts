/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { EntityV2 } from '../entity';
import { Selectable, Link } from '../../common';

/**
 * Get an object containing the given expand as a query parameter, or an empty object if none was given.
 * In this OData v2 expand, selected properties are automatically added to the expand.
 *
 * @typeparam EntityT - Type of the entity to expand on
 * @param selects - The selects which are expanded if necessary
 * @param entityConstructor - Constructor type of the entity to expand on
 * @returns An object containing the query parameter or an empty object
 */
export function getExpandV2<EntityT extends EntityV2>(
  selects: Selectable<EntityT>[] = []
): Partial<{ expand: string }> {
  const expand = getExpandsAsString(selects);
  return expand.length ? { expand: expand.join(',') } : {};
}

function getExpandsAsString<EntityT extends EntityV2>(
  selectables: Selectable<EntityT>[],
  initialExpand: string[] = [],
  parent = ''
): string[] {
  return selectables.reduce((combination: string[], selectable) => {
    const fullFieldName = getPath(parent, selectable._fieldName);
    if (selectable instanceof Link) {
      combination = [...combination, fullFieldName];
      if (selectable._selects.length) {
        return getExpandsAsString(
          selectable._selects,
          combination,
          fullFieldName
        );
      }
    }
    return combination;
  }, initialExpand);
}

function getPath(parent: string, fieldName: string): string {
  if (parent) {
    return `${parent}/${fieldName}`;
  }
  return fieldName;
}

export { getExpandV2 as getExpand };
