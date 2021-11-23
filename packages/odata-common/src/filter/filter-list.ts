import { Constructable, EntityBase, EntityIdentifiable } from '../entity-base';
import { OneToManyLink } from '../internal';
import type { Filterable } from './filterable';

/**
 * Data structure to combine [[Filterable]]s conjunctively and / or disjunctively. A FilterList matches when all filterables within the `andFilters` match and when at least one filterable within the `orFilters` matches. Should not be used directly.
 * @typeparam EntityT -
 * @internal
 */
export class FilterList<EntityT extends EntityBase>
  implements EntityIdentifiable<EntityT>
{
  /**
   * Constructor type of the entity to be filtered.
   */
  readonly _entityConstructor: Constructable<EntityT>;
  /**
   * Entity type of the entity tp be filtered.
   */
  readonly _entity: EntityT;

  /**
   * Creates an instance of FilterList.
   * @param andFilters - Filters to be combined by logical conjunction (`and`)
   * @param orFilters - Filters to be combined by logical disjunction (`or`)
   */
  constructor(
    public andFilters: Filterable<EntityT>[] = [],
    public orFilters: Filterable<EntityT>[] = []
  ) {}
}

/**
 * Type guard for the FilterList.
 * @param filterable - Variable to be checked.
 * @returns boolean
 * @internal
 */
export function isFilterList<T extends EntityBase>(
  filterable: Filterable<T>
): filterable is FilterList<T> {
  return (
    typeof filterable['field'] === 'undefined' &&
    typeof filterable['operator'] === 'undefined' &&
    typeof filterable['value'] === 'undefined' &&
    typeof filterable['functionName'] === 'undefined' &&
    typeof filterable['link'] === 'undefined' &&
    typeof filterable['lambdaOperator'] === 'undefined' &&
    !(filterable instanceof OneToManyLink)
  );
}
