/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { getOrderBy, Orderable } from '../../common';
import { Entity } from '../entity';

/**
 * @deprecated Use [[getOrderBy]] instead
 * Get an object containing the given order bys as query parameter, or an empty object if none was given.
 *
 * @typeparam EntityT - Type of the entity to order
 * @param orderBy - A list of orderables to get the query parameters for
 * @returns An object containing the query parameter or an empty object
 */
export function getQueryParametersForOrderBy<EntityT extends Entity>(
  orderBy: Orderable<EntityT>[]
): Partial<{ orderby: string }> {
  return getOrderBy(orderBy);
}
