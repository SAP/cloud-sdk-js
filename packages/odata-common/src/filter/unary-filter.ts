import type { EntityBase } from '../entity-base';
import { DeSerializers } from '../de-serializers';
import type { Filterable } from './filterable';

type UnaryFilterOperator = 'not';

/**
 * @internal
 */
export class UnaryFilter<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
> {
  constructor(
    public singleOperand: Filterable<EntityT, DeSerializersT>,
    public operator: UnaryFilterOperator
  ) {}
}

/**
 * Typeguard for the UnaryFilter object.
 * @param filterable - Variable to be checked
 * @returns boolean
 * @internal
 */
export function isUnaryFilter<
  EntityT extends EntityBase,
  DeSerializersT extends DeSerializers
>(
  filterable: Filterable<EntityT, DeSerializersT>
): filterable is UnaryFilter<EntityT, DeSerializersT> {
  return (
    typeof filterable['singleOperand'] !== 'undefined' &&
    typeof filterable['operator'] !== 'undefined'
  );
}
