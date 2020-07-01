/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import {
  FilterFunctionParameterType,
  BooleanFilterFunction,
  NumberFilterFunction,
  StringFilterFunction
} from '../common/filter';
import {
  FilterFunctionReturnType,
  createFilterFunction
} from '../common/filter/filter-function';
import { Entity } from './entity';
import { DateFilterFunction } from './date-filter-function';

export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: 'boolean' | 'bool',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): BooleanFilterFunction<EntityT>;

export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: 'int' | 'double' | 'decimal',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): NumberFilterFunction<EntityT>;

export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: 'string',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): StringFilterFunction<EntityT>;

export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: 'datetimeoffset',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): DateFilterFunction<EntityT>;

/**
 * Build a custom filter function.
 * @param functionName - the name of the function, e.g., `substring`
 * @param returnType - the return type of the filter function
 * @param parameters - the parameter(s) used in the function
 * @returns An instance of filter function suited for the given return type
 */
export function filterFunction<EntityT extends Entity>(
  functionName: string,
  returnType: FilterFunctionReturnType | 'datetimeoffset',
  ...parameters: FilterFunctionParameterType<EntityT>[]
):
  | BooleanFilterFunction<EntityT>
  | NumberFilterFunction<EntityT>
  | StringFilterFunction<EntityT>
  | DateFilterFunction<EntityT> {
  if (returnType === 'datetimeoffset') {
    return new DateFilterFunction(functionName, parameters);
  }
  return createFilterFunction(functionName, returnType, ...parameters);
}
