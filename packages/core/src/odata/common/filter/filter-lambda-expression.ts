/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */
import { EntityBase } from '../entity';
import { FieldType } from '../selectable';
import { OneToManyLink } from '../selectable/one-to-many-link';
import { Filter } from './filter';
import { Filterable } from './filterable';

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export type FilterLambdaOperator = 'any' | 'all';

/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export class FilterLambdaExpression<
  FieldT extends FieldType,
  LinkedEntityT extends EntityBase = any
> {
  constructor(
    public rootFiledName: string,
    public innerFilter: Filter<LinkedEntityT, FieldT>,
    public lambdaOperator: FilterLambdaOperator
  ) {}
}

// eslint-disable-next-line valid-jsdoc
/**
 * @experimental This is experimental and is subject to change. Use with caution.
 */
export function isFilterLambdaExpression<
  EntityT extends EntityBase,
  FieldT extends FieldType
>(
  filterable: Filterable<EntityT>
): filterable is FilterLambdaExpression<FieldT> {
  return (
    typeof filterable['rootFiledName'] !== 'undefined' &&
    typeof filterable['innerFilter'] !== 'undefined' &&
    typeof filterable['lambdaOperator'] !== 'undefined'
  );
}
