import { DeSerializers } from '../de-serializers';
import { EntityApi, EntityBase, EntityIdentifiable } from '../entity-base';
import { OneToManyLink } from '../selectable';
import type { Filterable } from './filterable';

/**
 * Data structure to combine [[Filterable]]s conjunctively and / or disjunctively. A FilterList matches when all filterables within the `andFilters` match and when at least one filterable within the `orFilters` matches. Should not be used directly.
 * @typeparam EntityT -
 * @internal
 */
export class FilterList<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
> implements EntityIdentifiable<EntityT, DeSerializersT>
{
  /**
   * Entity type of the entity tp be filtered.
   */
  readonly _entity: EntityT;
  _deSerializers: DeSerializersT;

  /**
   * Creates an instance of FilterList.
   * @param andFilters - Filters to be combined by logical conjunction (`and`)
   * @param orFilters - Filters to be combined by logical disjunction (`or`)
   */
  constructor(
    public andFilters: Filterable<EntityT, DeSerializersT>[] = [],
    public orFilters: Filterable<EntityT, DeSerializersT>[] = []
  ) {}
}

/**
 * Type guard for the FilterList.
 * @param filterable - Variable to be checked.
 * @returns boolean
 * @internal
 */
export function isFilterList<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers,
  LinkedEntityApiT extends EntityApi<EntityBase, DeSerializersT>
>(
  filterable: Filterable<EntityT, DeSerializersT, LinkedEntityApiT>
): filterable is FilterList<EntityT, DeSerializersT, LinkedEntityApiT> {
  return (
    typeof filterable['field'] === 'undefined' &&
    typeof filterable['operator'] === 'undefined' &&
    typeof filterable['value'] === 'undefined' &&
    typeof filterable['functionName'] === 'undefined' &&
    typeof filterable['link'] === 'undefined' &&
    !('lambdaOperator' in filterable) &&
    !(filterable instanceof OneToManyLink)
  );
}
