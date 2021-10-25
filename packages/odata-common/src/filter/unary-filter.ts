import { Entity } from '../entity';
import {Filterable} from "./filterable";

type UnaryFilterOperator = 'not';

export class UnaryFilter<EntityT extends Entity> {
  constructor(
    public singleOperand: Filterable<EntityT>,
    public operator: UnaryFilterOperator
  ) {}
}

export function isUnaryFilter<T extends Entity>(
  filterable: Filterable<T>
): filterable is UnaryFilter<T> {
  return (
    typeof filterable['singleOperand'] !== 'undefined' &&
    typeof filterable['operator'] !== 'undefined'
  );
}
