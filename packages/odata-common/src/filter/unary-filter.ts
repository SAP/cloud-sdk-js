import type { EntityBase } from '../entity-base';
import type { Filterable } from './filterable';

type UnaryFilterOperator = 'not';

/**
 * @internal
 */
export class UnaryFilter<EntityT extends EntityBase> {
  constructor(
    public singleOperand: Filterable<EntityT, any>,
    public operator: UnaryFilterOperator
  ) {}
}

/**
 * Typeguard for the UnaryFilter object.
 * @param filterable - Variable to be checked
 * @returns boolean
 * @internal
 */
export function isUnaryFilter<T extends EntityBase>(
  filterable: Filterable<T, any>
): filterable is UnaryFilter<T> {
  return (
    typeof filterable['singleOperand'] !== 'undefined' &&
    typeof filterable['operator'] !== 'undefined'
  );
}
