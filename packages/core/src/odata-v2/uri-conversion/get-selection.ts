import { Entity } from '../entity';
import { Selectable } from '@sap-cloud-sdk/odata-common';
import { getSelect } from './get-select';
import { getExpand } from './get-expand';

/**
 * @deprecated Since v1.21.0. Use [[ODataUri.getSelect]] and [[ODataUri.getExpand]] instead.
 *
 * Get an object containing the given Selectables as query parameter, or an empty object if none were given.
 * This retrieves where in addition to the selection (`select`) there is also an expansion (`expand`) needed.
 * @typeparam EntityT - Type of the entity to get the selection for
 * @param selects - The list of selectables to be transformed to query parameters
 * @returns An object containing the query parameters or an empty object
 */
export function getQueryParametersForSelection<EntityT extends Entity>(
  selects: Selectable<EntityT>[] = []
): Partial<{ select: string; expand: string }> {
  return {
    ...getSelect(selects),
    ...getExpand(selects)
  };
}
