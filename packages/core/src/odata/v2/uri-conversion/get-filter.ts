import { EntityV2 } from '../entity';
import { Constructable, Filterable } from '../../common';
import { oDataUriV2 } from './odata-uri';

/**
 * @deprecated Since v1.21.0. Use [[oDataUriV2.getFilter]] instead.
 * Get an object containing the given filter as query parameter, or an empty object if none was given.
 *
 * @typeparam EntityT - Type of the entity to filter on
 * @param filter - The filter to transform to a query parameter
 * @param entityConstructor - Constructor type of the entity to filter on
 * @returns An object containing the query parameter or an empty object
 */
export function getQueryParametersForFilter<EntityT extends EntityV2>(
  filter: Filterable<EntityT>,
  entityConstructor: Constructable<EntityT>
): Partial<{ filter: string }> {
  return oDataUriV2.getFilter(filter, entityConstructor);
}
