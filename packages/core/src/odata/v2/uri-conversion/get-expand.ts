/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity } from '../entity';
import { Selectable, Link } from '../../common';

/**
 * Get an object containing the given Selectables as query parameter, or an empty object if none were given.
 * This retrieves where in addition to the selection (`select`) there is also an expansion (`expand`) needed.
 *
 * @typeparam EntityT - Type of the entity to get the selection for
 * @param selects - The list of selectables to be transformed to query parameters
 * @returns An object containing the query parameters or an empty object
 */
export function getExpand<EntityT extends Entity>(
  selects: Selectable<EntityT>[] = []
): Partial<{ expand: string }> {
  const expand = getExpandsAsString(selects);
  return expand.length ? { expand: expand.join(',') } : {};
}

function getExpandsAsString<EntityT extends Entity>(
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

interface SelectionCombination {
  expands: string[];
  selects: string[];
}
