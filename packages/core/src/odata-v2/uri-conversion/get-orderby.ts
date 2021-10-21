import { getOrderBy, Orderable } from '@sap-cloud-sdk/odata-common';
import { Entity } from '../entity';

/**
 * @deprecated Since v1.21.0. Use [[ODataUri.getOrderBy]] instead.
 * Get an object containing the given order bys as query parameter, or an empty object if none was given.
 * @typeparam EntityT - Type of the entity to order
 * @param orderBy - A list of orderables to get the query parameters for
 * @returns An object containing the query parameter or an empty object
 */
export function getQueryParametersForOrderBy<EntityT extends Entity>(
  orderBy: Orderable<EntityT>[]
): Partial<{ orderby: string }> {
  return getOrderBy(orderBy);
}
