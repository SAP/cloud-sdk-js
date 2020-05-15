/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { Filterable, Constructable, createGetFilter } from '../../../../common';
import { Entity } from '../../../entity';
import * as uriConverter from './uri-value-converter';

/**
 * Get an object containing the given filter as query parameter, or an empty object if none was given.
 *
 * @typeparam EntityT - Type of the entity to filter on
 * @param filter - The filter to transform to a query parameter
 * @param entityConstructor - Constructor type of the entity to filter on
 * @returns An object containing the query parameter or an empty object
 */
export function getFilter<EntityT extends Entity>(
  filter: Filterable<EntityT>,
  entityConstructor: Constructable<EntityT>
): Partial<{ filter: string }> {
  return createGetFilter(uriConverter).getFilter(filter, entityConstructor);
}
