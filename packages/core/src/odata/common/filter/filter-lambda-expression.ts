import { EntityBase } from '../entity';
import { FieldType } from '../selectable';
import { Filter } from './filter';
import { Filterable } from './filterable';

export type FilterLambdaOperator = 'any' | 'all';

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export class FilterLambdaExpression<EntityT extends EntityBase, FieldT extends FieldType, LinkedEntityT extends EntityBase = any>{
  constructor(public navigationPropertyName: string, public innerFilter: Filter<LinkedEntityT, FieldT>, public lambdaOperator: FilterLambdaOperator){
  }
}

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function isFilterLambdaExpression<EntityT extends EntityBase, FieldT extends FieldType>(filterable: Filterable<EntityT>): filterable is FilterLambdaExpression<EntityT, FieldT>{
  return (
    typeof filterable['navigationPropertyName'] !== 'undefined' &&
    typeof filterable['innerFilter'] !== 'undefined' &&
    typeof filterable['lambdaOperator'] !== 'undefined'
  );
}
