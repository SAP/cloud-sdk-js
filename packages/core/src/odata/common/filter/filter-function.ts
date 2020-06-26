/* Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. */

import { MapType } from '@sap-cloud-sdk/util';
import { EntityBase } from '../entity';
import { BooleanFilterFunction } from './boolean-filter-function';
import { NumberFilterFunction } from './number-filter-function';
import { StringFilterFunction } from './string-filter-function';
import { FilterFunctionParameterType } from './filter-function-base';

export function filterFunction<EntityT extends EntityBase>(
  functionName: string,
  returnType: 'boolean' | 'bool',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): BooleanFilterFunction<EntityT>;

export function filterFunction<EntityT extends EntityBase>(
  functionName: string,
  returnType: 'int' | 'double' | 'decimal',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): NumberFilterFunction<EntityT>;

export function filterFunction<EntityT extends EntityBase>(
  functionName: string,
  returnType: 'string',
  ...parameters: FilterFunctionParameterType<EntityT>[]
): StringFilterFunction<EntityT>;

/**
 * Build a custom filter function.
 * @param functionName - the name of the function, e.g., `substring`
 * @param returnType - the return type of the filter function
 * @param parameters - the parameter(s) used in the function
 * @returns An instance of filter function suited for the given return type
 */
export function filterFunction<EntityT extends EntityBase>(
  functionName: string,
  returnType: 'boolean' | 'bool' | 'int' | 'double' | 'decimal' | 'string',
  ...parameters: FilterFunctionParameterType<EntityT>[]
):
  | BooleanFilterFunction<EntityT>
  | NumberFilterFunction<EntityT>
  | StringFilterFunction<EntityT> {
  if (returnType === 'boolean' || returnType === 'bool') {
    return new BooleanFilterFunction(functionName, parameters);
  }
  if (returnType === 'string') {
    return new StringFilterFunction(functionName, parameters);
  }
  return new NumberFilterFunction(
    functionName,
    parameters,
    returnTypeToEdmType[returnType]
  );
}

const returnTypeToEdmType: MapType<
  'Edm.Int32' | 'Edm.Double' | 'Edm.Decimal'
> = {
  int: 'Edm.Int32',
  double: 'Edm.Double',
  decimal: 'Edm.Decimal'
};
