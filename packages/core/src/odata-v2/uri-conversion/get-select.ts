import { Entity } from '../entity';
import { Selectable, Link } from '@sap-cloud-sdk/odata-common';

/**
 * Get an object containing the given Selectables as query parameter, or an empty object if none were given.
 * This retrieves where in addition to the selection (`select`) there is also an expansion (`expand`) needed.
 * @typeparam EntityT - Type of the entity to get the selection for
 * @param selects - The list of selectables to be transformed to query parameters
 * @returns An object containing the query parameters or an empty object
 */
export function getSelect<EntityT extends Entity>(
  selects: Selectable<EntityT>[] = []
): Partial<{ select: string }> {
  const select = getSelectsAsStrings(selects);
  return select.length ? { select: filterSelects(select).join(',') } : {};
}

function selectionLevel(select: string): string {
  return select.split('/').slice(0, -1).join('/');
}

function filterSelects(selects: string[]): string[] {
  const allFieldSelects = selects.filter(select => select.endsWith('*'));
  const selectionLevels = allFieldSelects.map(select => selectionLevel(select));

  return [
    ...allFieldSelects,
    ...selects.filter(
      select => !selectionLevels.includes(selectionLevel(select))
    )
  ];
}

function getSelectsAsStrings<EntityT extends Entity>(
  selectables: Selectable<EntityT>[],
  initialSelect: string[] = [],
  parent = ''
): string[] {
  return selectables.reduce((select: string[], selectable) => {
    const fullFieldName = getPath(parent, selectable._fieldName);
    if (selectable instanceof Link) {
      if (selectable._selects.length) {
        return getSelectsAsStrings(selectable._selects, select, fullFieldName);
      }
      return [...select, `${fullFieldName}/*`];
    }
    return [...select, fullFieldName];
  }, initialSelect);
}

function getPath(parent: string, fieldName: string): string {
  if (parent) {
    return `${parent}/${fieldName}`;
  }
  return fieldName;
}

export { getSelect as getSelectV2 };
