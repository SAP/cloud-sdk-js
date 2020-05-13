/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity } from '../../../entity';
import { Selectable } from '../../../../common';

/**
 * Get an object containing the given Selectables as query parameter, or an empty object if none were given.
 * This retrieves where in addition to the selection (`select`) there is also an expansion (`expand`) needed.
 *
 * @typeparam EntityT - Type of the entity to get the selection for
 * @param selects - The list of selectables to be transformed to query parameters
 * @returns An object containing the query parameters or an empty object
 */
export function getQueryParametersForSelection<EntityT extends Entity>(
  selects: Selectable<EntityT>[]
): Partial<{ select: string }> {
  if (selects && selects.length) {
    const selection = selects.map(select => select._fieldName);
    if (selection.length) {
      if (selection.find(select => select.endsWith('*'))) {
        return { select: '*' };
      }
      return { select: selection.join(',') };
    }
  }

  return {};
}
