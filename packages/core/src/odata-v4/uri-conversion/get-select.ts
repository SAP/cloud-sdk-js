import { Entity } from '../entity';
import { Selectable } from '../../odata-common';

/**
 * Get an object containing the given Selectables as query parameter, or an empty object if none were given.
 * In OData v4 selected properties are not automatically expanded anymore and a manual expand needs to be performed.
 *
 * @typeparam EntityT - Type of the entity to get the selection for
 * @param selects - The list of selectables to be transformed to query parameters
 * @returns An object containing the query parameters or an empty object
 */
export function getSelect<EntityT extends Entity>(
  selects: Selectable<EntityT>[] = []
): Partial<{ select: string }> {
  const selection = selects.map(select => select._fieldName);
  if (selection.length) {
    if (selection.find(select => select.endsWith('*'))) {
      return { select: '*' };
    }
    return { select: selection.join(',') };
  }

  return {};
}

export { getSelect as getSelectV4 };
