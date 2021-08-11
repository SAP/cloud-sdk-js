import { Constructable, Entity, EntityIdentifiable } from '../entity';
import type { Filterable } from './filterable';

/**
 * Data structure to combine [[Filterable]]s conjunctively and / or disjunctively. A FilterList matches when all filterables within the `andFilters` match and when at least one filterable within the `orFilters` matches. Should not be used directly.
 * @typeparam EntityT -
 */
export class FilterList<EntityT extends Entity>
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

  /**
   * @deprecated Since v1.28.1. This function should not be used, since some OData Services might not support the flattened filter expression.
   * Flattens `andFilters` and `orFilters` as far as possible while staying logically equivalent.
   * @returns Flattened filter list.
   */
  flatten(): FilterList<EntityT> {
    this._flatten('andFilters');
    this._flatten('orFilters');
    return this;
  }

  private canFlatten(property: 'andFilters' | 'orFilters'): boolean {
    const otherProperty =
      property === 'andFilters' ? 'orFilters' : 'andFilters';
    return this[property].some(
      filter =>
        filter instanceof FilterList &&
        (!filter.isEmpty(property) || filter.isEmpty(otherProperty))
    );
  }

  private isEmpty(property: 'andFilters' | 'orFilters'): boolean {
    return !this[property].length;
  }

  private _flatten(property: 'andFilters' | 'orFilters'): void {
    const otherProperty =
      property === 'andFilters' ? 'orFilters' : 'andFilters';
    while (this.canFlatten(property)) {
      this[property] = this[property].reduce((flatList, current) => {
        if (current instanceof FilterList) {
          const flattendFilters = [...flatList, ...current[property]];
          if (current[otherProperty].length) {
            current[property] = [];
            flattendFilters.push(current.flatten());
          }
          return flattendFilters;
        }
        return [...flatList, current];
      }, []);
    }
  }
}

export function isFilterList<T extends Entity>(
  filterable: Filterable<T>
): filterable is FilterList<T> {
  return (
    typeof filterable['field'] === 'undefined' &&
    typeof filterable['operator'] === 'undefined' &&
    typeof filterable['value'] === 'undefined' &&
    typeof filterable['flatten'] === 'function'
  );
}
