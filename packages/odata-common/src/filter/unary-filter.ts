import { EntityBase } from '../entity-base';
import { Filterable } from './filterable';

type UnaryFilterOperator = 'not';

/**
 * @internal
 */
export class UnaryFilter<EntityT extends EntityBase> {
  constructor(
    public singleOperand: Filterable<EntityT>,
    public operator: UnaryFilterOperator
  ) {}
}

/**
 * @internal
 */
export function isUnaryFilter<T extends EntityBase>(
  filterable: Filterable<T>
): filterable is UnaryFilter<T> {
  return (
    typeof filterable['singleOperand'] !== 'undefined' &&
    typeof filterable['operator'] !== 'undefined'
  );
}
