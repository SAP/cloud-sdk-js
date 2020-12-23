import { Entity } from '../entity';
import { Selectable } from '../../odata-common';
import { getSelectV2 } from './get-select';
import { getExpandV2 } from './get-expand';

/**
 * @deprecated Since v1.21.0. Use [[oDataUriV2.getSelect]] and [[oDataUriV2.getExpand]] instead.
 *
 * Get an object containing the given Selectables as query parameter, or an empty object if none were given.
 * This retrieves where in addition to the selection (`select`) there is also an expansion (`expand`) needed.
 *
 * @typeparam EntityT - Type of the entity to get the selection for
 * @param selects - The list of selectables to be transformed to query parameters
 * @returns An object containing the query parameters or an empty object
 */
export function getQueryParametersForSelection<EntityT extends Entity>(
  selects: Selectable<EntityT>[] = []
): Partial<{ select: string; expand: string }> {
  return {
    ...getSelectV2(selects),
    ...getExpandV2(selects)
  };
}
