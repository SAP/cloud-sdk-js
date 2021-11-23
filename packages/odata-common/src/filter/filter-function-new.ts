import { EntityBase } from '../entity-base';
import { NewFilterFunctionParameterType } from './filter-function-base-new';
import { NewBooleanFilterFunction } from './boolean-filter-function-new';

/**
 * Build a custom filter function.
 * @param functionName - the name of the function, e.g., `substring`
 * @param returnType - the return type of the filter function
 * @param parameters - the parameter(s) used in the function
 * @returns An instance of filter function suited for the given return type
 */
export function newFilterFunction<EntityT extends EntityBase>(
  functionName: string,
  returnType: FilterFunctionReturnType,
  ...parameters: NewFilterFunctionParameterType<EntityT>[]
): NewBooleanFilterFunction<EntityT> {
  return createFilterFunction(functionName, returnType, ...parameters);
}

export function createFilterFunction<EntityT extends EntityBase>(
  functionName: string,
  returnType: FilterFunctionReturnType,
  ...parameters: NewFilterFunctionParameterType<EntityT>[]
): NewBooleanFilterFunction<EntityT> {
  return new NewBooleanFilterFunction(functionName, parameters);
}

export const numberReturnTypeMapping: Record<
  string,
  'Edm.Int32' | 'Edm.Double' | 'Edm.Decimal'
> = {
  int: 'Edm.Int32',
  double: 'Edm.Double',
  decimal: 'Edm.Decimal'
};

export type FilterFunctionReturnType =
  | 'boolean'
  | 'int'
  | 'double'
  | 'decimal'
  | 'string';
