/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity } from '../entity';
import { Selectable, Link } from '../../common';

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
