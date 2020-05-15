/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Entity } from '../entity';
import { Constructable, Filterable } from '../../common';
import { oDataUri } from './odata-uri';

/**
 * @deprecated Use [[getFilter]] instead
 * Get an object containing the given filter as query parameter, or an empty object if none was given.
 *
 * @typeparam EntityT - Type of the entity to filter on
 * @param filter - The filter to transform to a query parameter
 * @param entityConstructor - Constructor type of the entity to filter on
 * @returns An object containing the query parameter or an empty object
 */
export function getQueryParametersForFilter<EntityT extends Entity>(
  filter: Filterable<EntityT>,
  entityConstructor: Constructable<EntityT>
): Partial<{ filter: string }> {
  return oDataUri.getFilter(filter, entityConstructor);
}
