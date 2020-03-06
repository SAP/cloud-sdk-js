/*!
 * Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved.
 */

import { Entity } from '../../entity';
import { Link, Selectable } from '../../selectable';

interface SelectionQueryParameters {
  select: string;
  expand: string;
}

/**
 * Get an object containing the given Selectables as query parameter, or an empty object if none were given.
 * This retrieves where in addition to the selection (`select`) there is also an expansion (`expand`) needed.
 *
 * @typeparam EntityT Type of the entity to get the selection for
 * @param selects The list of selectables to be transformed to query parameters
 * @returns {Partial<SelectionQueryParameters>} An object containing the query parameters or an empty object
 */
export function getQueryParametersForSelection<EntityT extends Entity>(selects: Selectable<EntityT>[]): Partial<{ select: string; expand: string }> {
  const queryParameters: Partial<SelectionQueryParameters> = {};

  if (selects && selects.length) {
    const selection = combineSelection(selects);
    if (selection.selects.length) {
      queryParameters.select = filterSelects(selection.selects).join(',');
    }

    if (selection.expands.length) {
      queryParameters.expand = selection.expands.join(',');
    }
  }

  return queryParameters;
}

function selectionLevel(select: string): string {
  return select
    .split('/')
    .slice(0, -1)
    .join('/');
}

function filterSelects(selects: string[]): string[] {
  const allFieldSelects = selects.filter(select => select.endsWith('*'));
  const selectionLevels = allFieldSelects.map(select => selectionLevel(select));

  return [...allFieldSelects, ...selects.filter(select => !selectionLevels.includes(selectionLevel(select)))];
}

function combineSelection<EntityT extends Entity>(
  selects: Selectable<EntityT>[],
  initialCombination: SelectionCombination = {
    selects: [],
    expands: []
  },
  parent = ''
): SelectionCombination {
  return selects.reduce((combination: SelectionCombination, select) => {
    const fullFieldName = getPath(parent, select._fieldName);
    if (select instanceof Link) {
      combination.expands.push(fullFieldName);
      if (select.selects.length) {
        return combineSelection(select.selects, combination, fullFieldName);
      } else {
        combination.selects.push(`${fullFieldName}/*`);
      }
    } else {
      combination.selects.push(fullFieldName);
    }
    return combination;
  }, initialCombination);
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
